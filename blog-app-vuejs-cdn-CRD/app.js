const firebaseConfig = {
    apiKey: "AIzaSyAwsyb6zNI5AWhF7-X99r_4UVoE8H6kgkE",
    authDomain: "fir-try-9f586.firebaseapp.com",
    databaseURL: "https://fir-try-9f586.firebaseio.com",
    projectId: "fir-try-9f586",
    storageBucket: "fir-try-9f586.appspot.com",
    messagingSenderId: "348067655888",
    appId: "1:348067655888:web:aaf0ddf6f754e3709a6ed5",
    measurementId: "G-0RR0WNZPF3"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
var db = firebase.firestore();
var localStorage = ('localStorage' in window);

new Vue({
    el: '#vue-app',
    data: {

        title: 'Post It',
        PageBool: [],

        logStatus: false,
        mainPageBool: true,
        loginPageBool: false,
        readPageBool: false,
        writePageBool: false,
        registerPageBool: false,
        profilePageBool: false,
        state_manager: 0,
        errorMsgBanner: false,
        successMsgBanner: false,
        successMsg: '',
        error_message: [],

        firstName: '',
        lastName: '',
        name: '',
        user_email: '',
        user_password: '',
        user_conf_password: '',
        user_uid: '',
        titlex: '',
        content: '',
        user: {},
        article: {},
        readList: [],
    },

    methods: {
        funcOnLoad: function () {
            this.PageBool = [true, false, false, false, false, false]
            if (this.loadData()) {
                this.loadDataFromWS()
                this.logStatus = true
            }
            else {
                console.log('Not Logged in')
            }
        },

        ReadWriteAuth: function (i) {
            if (!this.logStatus)
                this.PageManager(1)
            else {
                if (i == 1) {
                    this.PageManager(3)
                }
                else if (i == 2) {
                    this.readPageData()
                }
            }
        },

        readPageData: function () {
            this.loadDataFromWS()
            this.PageManager(2)
            this.article = {}
            this.readList = []
            db.collection('content').orderBy('titlex', 'desc').get()
                .then(response => {
                    response.docs.forEach(doc => {
                        this.article = {
                            titlex: doc.data().titlex,
                            para: doc.data().data,
                            uid: doc.data().uid,
                            docId: doc.id
                        }
                        this.readList.push(this.article)
                    })
                })
        },

        deletedoc: function (docId) {
            db.collection('content').doc(docId).delete()
                .then(() => {
                    console.log("Document successfully deleted!");
                    this.successMsgDisplay('Post deleted successfully!', 0)
                })
                .catch((error) => {
                    console.error("Error removing document: ", error);
                });
        },

        writeToDB: function () {

            this.loadDataFromWS()
            if (!this.titlex) {
                this.errorMsgDisplay('Enter title')
            }
            else if (!this.content) {
                this.errorMsgDisplay('Enter some content')
            }
            else {
                this.loadDataFromWS()
                this.article = {
                    titlex: this.titlex,
                    data: this.content,
                    uid: this.user_uid
                }
                db.collection('content').add(this.article)
                    .then((docRef) => {
                        this.successMsgDisplay(`data written successfully with id : ${docRef.id}`, 0)
                    })
                    .catch((error) => {
                        this.errorMsgDisplay('Failed to write a post ' + error)
                    })
            }
        },

        logOut: function () {
            this.deleteData();
            this.firstName = '';
            this.lastName = '';
            this.name = '';
            this.user_email = '';
            this.user_password = '';
            this.user_conf_password = '';
            this.user_uid = '';
            this.titlex = '';
            this.content = '';
            this.user = {};
            this.article = {};
            this.readList = [];
            this.logStatus = false;
            this.errorMsgBanner = false;
            this.successMsgBanner = true;
            this.successMsg = 'Logout Success';
            this.PageManager(0, false)
        },

        checkFormLogin: function () {

            this.error_message = [];

            if (!this.user_email) {
                this.errorMsgDisplay('Email is required')
            }

            else if (!this.user_password) {
                this.errorMsgDisplay('Password is required')
            }

            else if (!this.validEmail(this.user_email)) {
                this.errorMsgDisplay('Valid Email is required')
            }
            else {
                this.firebaseLoginFunction()

                setTimeout(() => {
                    if (this.state_manager == 0) {
                        this.successMsgDisplay('Login Success!', 0)
                    }
                    else if (this.state_manager == 1) {
                        this.successMsgDisplay('Login Success! Please Update profile info ', 5)
                    }
                    else if (this.state_manager === 3) {
                        this.errorMsgDisplay('Invalid credentials')
                        this.PageManager(1, false)
                    }
                }, 1000)
            }
        },

        checkFormRegister: function () {
            this.error_message = [];
            this.hideError()
            if (!this.user_email) {
                this.errorMsgDisplay('Email is required')
            }
            else if (!this.user_password) {
                this.errorMsgDisplay('Password is required')
            }
            else if (!this.user_conf_password) {
                this.errorMsgDisplay('Please Re-enter your password')
            }
            else if (this.user_password.length < 8) {
                this.errorMsgDisplay('Password should be 8 character long')
            }
            else if (!(this.user_password == this.user_conf_password)) {
                this.errorMsgDisplay('Passwords do not match')
            }
            else if (!this.validEmail(this.user_email)) {
                this.errorMsgDisplay('Valid Email is required')
            }
            else {
                auth.createUserWithEmailAndPassword(this.user_email, this.user_password)
                    .then(response => {
                        localStorage.setItem('user', JSON.stringify(response))
                        this.state_manager = 1
                        this.successMsgDisplay('Registeration Success! Please login', 1)
                    })
                    .catch((err) => {
                        this.errorMsgDisplay(err.code)
                        this.state_manager = 3
                    })
                setTimeout(() => {
                    if (this.state_manager === 3) {
                        this.PageManager(4, false)
                    }
                }, 500)
            }
        },

        loadData: function () {
            let key = 'user'
            if (localStorage) {
                if (key in localStorage) {
                    return JSON.parse(localStorage.getItem(key))
                }
            } else {
                alert("Web storage not support")
            }
        },

        deleteData: function () {
            let key = 'user'
            if (localStorage) {
                localStorage.removeItem(key);
                console.log("Data delete")
            } else {
                alert("Web storage not support")
            }
        },

        firebaseLoginFunction: function () {
            auth.signInWithEmailAndPassword(this.user_email, this.user_password)
                .then(response => {
                    localStorage.setItem('user', JSON.stringify(response))
                    setTimeout(() => {
                        this.loadDataFromWS()
                    })
                })
                .catch((err) => {
                    console.log(err.code)
                    this.state_manager = 3
                    console.log('Wait complete')
                })
        },

        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        updateProfile: function () {

            this.error_message = [];

            if (!this.firstName) {
                this.errorMsgDisplay('First Name is required')
            }
            if (!this.lastName) {
                this.errorMsgDisplay('Last Name is required')
            }

            let xf = this.firstName.trim().toLowerCase()
            xf = xf.charAt(0).toUpperCase() + xf.slice(1)
            let xl = this.lastName.trim().toLowerCase()
            xl = xl.charAt(0).toUpperCase() + xl.slice(1)
            this.name = xf + ' ' + xl
            xf = xf + ' ' + xl
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    let userUpdate = firebase.auth().currentUser;
                    userUpdate.updateProfile({
                        displayName: xf,
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    console.log('false')
                }
            })

            this.user = this.loadData()
            this.deleteData()
            this.state_manager = 0
            this.user.user.displayName = this.name
            localStorage.setItem('user', JSON.stringify(this.user))
            this.successMsgDisplay('Profile Updated!', 0)

        },

        hideError: function () {
            this.errorMsgBanner = false
            this.successMsgBanner = false
            this.successMsg = ''
            this.error_message = []
        },

        PageManager: function (index, erx = true) {

            if (index > this.PageBool.length) {
                console.log("Exceeded the limit")
                this.hideError()
                this.PageBool = [true, false, false, false, false, false];
                this.PageManager(0)
            } else {
                if (erx)
                    this.hideError()

                this.PageBool = [false, false, false, false, false, false]
                this.PageBool[index] = true

                this.mainPageBool = this.PageBool[0]
                this.loginPageBool = this.PageBool[1]
                this.readPageBool = this.PageBool[2]
                this.writePageBool = this.PageBool[3]
                this.registerPageBool = this.PageBool[4]
                this.profilePageBool = this.PageBool[5]

            }
        },

        successMsgDisplay: function (msg, index) {
            this.logStatus = true
            this.errorMsgBanner = false;
            this.successMsgBanner = true;
            this.successMsg = msg;
            this.PageManager(index, false)
        },

        errorMsgDisplay: function (msg) {
            this.errorMsgBanner = true;
            this.error_message.push(msg)
        },

        loadDataFromWS: function () {
            this.user = this.loadData()
            this.name = this.user.user.displayName
            this.user_email = this.user.user.email
            this.user_uid = this.user.user.uid
        }
    },

    beforeMount: function () {
        this.funcOnLoad();
    }
})

