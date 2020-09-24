<template>
  <div class="hello">
    <b-container>
      <!-- svg -->
      <b-row>
        <b-col>
          <center>
            <img src="@/assets/auth/signup.svg" class="form-svg" />
          </center>
        </b-col>
      </b-row>
      <!-- end svg -->
      <!-- ########### -->
      <!-- sign title -->
      <b-row>
        <b-col class="form-title non-copy">SignUp</b-col>
      </b-row>
      <br />
      <!-- end title -->
      <!-- ########### -->
      <!-- form sign in -->
      <b-row>
        <b-col>
          <form action>
            <h4 class="form-headings">Name :</h4>
            <center>
              <b-form-input v-model="userDetails[0]" type="text" /> <br />
            </center>
            <h4 class="form-headings">Email :</h4>
            <center>
              <b-form-input v-model="userDetails[1]" type="email" /> <br />
            </center>
            <h4 class="form-headings">Password :</h4>
            <center>
              <b-form-input v-model="userDetails[2]" type="password" /> <br />
            </center>

            <h4 class="form-headings">Confirm Password :</h4>
            <center>
              <b-form-input v-model="userDetails[3]" type="password" /> <br />
            </center>
          </form>
        </b-col>
      </b-row>
      <!-- end form  -->
      <br />
      <b-row>
        <!-- login button -->
        <b-col>
          <center>
            <b-button
              variant="success"
              type="submit"
              @click="buttonManagerBack()"
              size="lg"
              >Back</b-button
            >
          </center>
        </b-col>
        <!-- end login button-->
        <!-- ################################################ -->
        <!-- back button-->
        <b-col>
          <center>
            <form @submit="signupForm($event)">
              <b-button variant="primary" type="submit" size="lg"
                >Register</b-button
              >
            </form>
          </center>
        </b-col>
        <!-- End back button -->
      </b-row>
    </b-container>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
require("../firebase-config");
import { auth } from "firebase";
import localforage from "localforage";
var store = localforage.createInstance({
  name: "users"
});

export default {
  data() {
    return {
      userDetails: ["", "", "", ""]
    };
  },
  methods: {
    buttonManagerBack: function() {
      this.$emit("clicked", 0);
    },
    signupForm: function(event) {
      event.preventDefault();
      if (!this.userDetails[0]) {
        alert("Enter User Name");
      } else if (!this.userDetails[1]) {
        alert("Please Enter email ID");
      } else if (!this.userDetails[2]) {
        alert("Please enter password");
      } else if (!this.userDetails[3]) {
        alert("Enter confirm password");
      } else if (this.userDetails[2] != this.userDetails[3]) {
        alert("Password doesnt match");
      } else if (this.userDetails[2].length < 8) {
        alert("Password should be 8 character long");
      } else {
        alert("Please wait");
        auth()
          .createUserWithEmailAndPassword(
            this.userDetails[1],
            this.userDetails[2]
          )
          .then(() => {
            auth()
              .signInWithEmailAndPassword(
                this.userDetails[1],
                this.userDetails[2]
              )
              .then(response => {
                auth()
                  .currentUser.updateProfile({
                    displayName: this.userDetails[0]
                  })
                  .then(() => {
                    let item = {
                      uid: response.user.uid,
                      email: response.user.email,
                      name: this.userDetails[0]
                    };
                    store
                      .setItem("user", JSON.stringify(item))
                      .then(() => {
                        this.$store.dispatch("changeAuthStatus");
                        alert("SignUp and LogIn Success");
                        window.location.href = "app";
                      })
                      .catch(err => {
                        alert(`Code : ${err.code} :: ${err.message}`);
                      });
                  })
                  .catch(function(err) {
                    alert(`Code : ${err.code} :: ${err.message}`);
                  });
              })
              .catch(err => {
                alert(`Code : ${err.code} :: ${err.message}`);
              });
          })
          .catch(err => {
            alert(`Code : ${err.code} :: ${err.message}`);
          });
      }
    }
  }
};
</script>
