<template>
  <div class="hello">
    <div v-if="!editSection">
      <b-container>
        <center>
          <div style="padding-top: 7vh"></div>
          <h1 class="heading">
            <b>User Profile</b>
          </h1>
          <div style="padding-top: 12vh"></div>
          <h3>
            <b>Name :</b>
          </h3>
          <h4 style="color : #11100f">{{ userName }}</h4>
          <h3>
            <b>User UID</b>
          </h3>
          <h4 style="color : #11100; font-size : 20px">{{ userUid }}</h4>
          <h3>
            <b>User Email :</b>
          </h3>
          <h4 style="color : #11100f">{{ userEmail }}</h4>
        </center>
        <br />
        <br />
        <br />
        <center>
          <b-row>
            <b-col>
              <b-button variant="success">About</b-button>
            </b-col>
            <b-col>
              <b-button size="large" variant="primary" @click="editProfile(1)">Update Profile</b-button>
            </b-col>
            <b-col>
              <b-button variant="dark">Github</b-button>
            </b-col>
          </b-row>
          <br />
        </center>
      </b-container>
    </div>
    <center v-if="editSection">
      <br />
      <br />
      <b-container>
        <b-row>
          <center>
            <b-img v-bind:src="img" style="width : 60vw; height : 40vh" />
            <input @change="captureImg" type="file" v-bind:id="capture" accept="image/*" capture />
          </center>
        </b-row>
      </b-container>
      <br />
      <br />
      <br />
      <b-container>
        <b-row>
          <br />
          <br />
          <b-container>
            <h3>Your Name :</h3>
            <b-form-input v-model="userName" placeholder="Enter your name"></b-form-input>
          </b-container>
        </b-row>
      </b-container>
      <br />
      <br />
      <b-button variant="primary" @click="editProfile(2)">Back</b-button>&nbsp;&nbsp; &nbsp;&nbsp;
      <b-button variant="success" @click="updateProfile()">Submit</b-button>
    </center>
  </div>
</template>

<script>
require("../firebase-config");
import { storage, auth } from "firebase";
import localforage from "localforage";
var store = localforage.createInstance({
  name: "users"
});
let userData = null;
export default {
  data() {
    return {
      userName: "",
      userUid: "",
      userEmail: "",
      editSection: false,
      capture: null,
      img: null,
      blob: null,
      imgurl: null
    };
  },
  methods: {
    editProfile: function(i) {
      if (i == 1) {
        this.editSection = true;
      } else if (i == 2) {
        this.editSection = false;
      }
    },
    captureImg: function(event) {
      if (event.target.files[0].type.indexOf("image/") > -1) {
        this.img = window.URL.createObjectURL(event.target.files[0]);
        this.blob = event.target.files[0];
      }
    },
    imageUpload : function(){
      var storageRef = storage().ref();
      var spaceRef = storageRef.child(`${this.userUid}/profile.jpg`);
      var metadata = {
        contentType: "image/jpeg"
      };
      var uploadTask = spaceRef.put(this.blob, metadata);
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(err) {
          alert(`Code : ${err.code} :: ${err.message}`);
        },
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log(typeof downloadURL);
            this.imgurl = downloadURL;
            auth()
              .currentUser.updateProfile({
                displayName: this.userName,
                photoURL: this.imgurl
              })
              .then(() => {
                this.editSection = false;
                alert("Done");
              })
              .catch(err => {
                alert(`Code : ${err.code} :: ${err.message}`);
              });
          });
        }
      );
    },
    updateProfile: function() {

    }
  },
  mounted: function() {
    store.getItem("user").then(data => {
      userData = JSON.parse(data);
      this.userName = userData.name;
      this.userUid = userData.uid;
      this.userEmail = userData.email;
    });
  }
};
</script>
