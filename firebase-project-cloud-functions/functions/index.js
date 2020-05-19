const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const app = require('express')();

const config = {
    //  add firebase config here
}

const firebase = require('firebase');
firebase.initializeApp(config);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const isEmpty = (string) => {
    if (string.trim() === '')
        return true
    else
        return false
}

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx))
        return true
    else
        return false
}

const FBAuth = (request, response, next) => {

    let idToken;
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith('Bearer ')
    ) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            request.user = decodedToken;
            return db
                .collection('usersInfo')
                .where('userId', '==', request.user.uid)
                .limit(1)
                .get();
        })
        .then((data) => {
            request.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch((err) => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
        });
}

const reduceUserDetails = (data) => {
    let userDetails = {};
    if (!isEmpty(data.bio.trim()))
        userDetails.bio = data.bio;
    if (!isEmpty(data.website.trim()))
        if (data.website.trim().substring(0, 4) !== 'http')
            userDetails.website = `http://${data.website.trim()}`
        else userDetails.website = data.website;
    if (!isEmpty(data.location.trim()))
        userDetails.location = data.location;

    return userDetails;

}




exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello World!");
});

app.get('/getPost', (request, response) => {
    db.collection('posts').orderBy('createdAt', 'desc').get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                })
            })
            return response.json(posts)
        })
        .catch((err) => {
            console.error(err);
        })
})

app.post('/createPost', (request, response) => {

    if (request.body.body.trim() === '') {
        return response.status(400).json({
            body: 'Must not be empty'
        })
    }

    const newPost = {
        body: request.body.body,
        userHandle: request.body.userHandle,
        createdAt: new Date().toISOString()
    }

    db.collection('posts').add(newPost)
        .then(doc => {
            response.json(`Document ${doc.id} created successfully`)
        })
        .catch((err) => {
            response.status(500).json({
                error: "Something went wrong"
            })
            console.error(err);
        })
})

app.post('/signup', (request, response) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        handle: request.body.handle,
    }

    let errors = {}
    if (isEmpty(newUser.email))
        errors.email = "Must not be empty"
    if (!isEmail(newUser.email))
        errors.email = "Must be a valid email"
    if (isEmpty(newUser.password))
        errors.password = "Must not be empty"
    if (newUser.password !== newUser.confirmPassword)
        errors.confirmPassword = "Passwords must match"
    if (isEmpty(newUser.handle))
        errors.handle = "Must not be empty"
    if (Object.keys(errors).length > 0) {
        return response.status(400).json(errors)
    }

    const noImg = 'no-img.png'

    let token, userId;
    db.doc(`/usersInfo/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                return response.status(400).json({ handle: 'this handle is already taken' })
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then((data) => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then((idToken) => {
            token = idToken
            const userCrendentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                userId
            }
            db.doc(`/usersInfo/${newUser.handle}`).set(userCrendentials)
        }).then(() => {
            return response.status(201).json({ token })
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-user') {
                return response.status(400).json({ email: 'Email already in user' })
            }
            return response.status(500).json({
                error: err.code
            });
        })

});

app.post('/login', (request, response) => {

    const user = {
        email: request.body.email,
        password: request.body.password
    }

    let errors = {};

    if (isEmpty(user.password))
        errors.password = "Must not be empty"
    if (isEmpty(user.email))
        errors.email = "Must not be empty"
    if (Object.keys(errors).length > 0) {
        return response.status(400).json(errors)
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then(token => {
            return response.json({ token })
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                return response.status(403).json({ general: 'wrong credentials' })
            }
            else
                return response.status(500).json({ error: err.code })
        })

})

app.post('/user/image', FBAuth, (request, response) => {

    const BusBoy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs = require('fs')

    let imageFileName;
    let imageToBeUploaded = {};

    const busboy = new BusBoy({ headers: request.headers })

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {

        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        const imageFileName = `${Math.round(math.random() * 1000000000000).toString()}.${imageExtension}`
        const filepath = path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = { filepath, mimetype }
        file.pipe(fs.createWriteStream(filepath))
    })
    busboy.on('finish', () => {

        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return response.status(400).json({ error: 'wrong file type' })
        }

        admin.storage().bucket(`gs://${config.storageBucket}`).upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
                return db.doc(`usersInfo/${request.user.handle}`).update({ imageUrl });
            })
            .then(() => {
                return response.status(201).json({ message: 'Image Uploaded Successfully' })
            })
    })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        })
    busboy.end(request.rawBody);

})

app.post('/user', FBAuth, (request, response) => {

    let userDetails = reduceUserDetails(request.body)

    db.doc(`/userInfo/${request.user.handle}`).update(userDetails)
        .then(() => {
            return response.json({ message: 'Details added successfully' })
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ err: error.code })
        })

})


exports.api = functions.https.onRequest(app)

//https://us-central1-socialapp-ae465.cloudfunctions.net/api