<template>
  <div class="hello">
    <b-container>
      <!-- svg -->
      <b-row>
        <b-col>
          <center>
            <img src="@/assets/auth/login.svg" class="form-svg" />
          </center>
        </b-col>
      </b-row>
      <!-- end svg -->
      <!-- ####################### -->
      <!-- end -->
      <b-row>
        <b-col class="form-title non-copy">Login</b-col>
      </b-row>
      <br />
      <!-- end login -->
      <!-- ################ -->
      <!-- login form -->
      <b-row>
        <b-col>
          <form>
            <h4>Email :</h4>
            <b-form-input v-model="userDetails[0]" type="email" />
            <br />
            <h4>Password :</h4>
            <b-form-input v-model="userDetails[1]" type="password" />
          </form>
        </b-col>
      </b-row>
      <!-- end login -->
      <br />

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
            <form @submit="loginForm($event)">
              <b-button variant="primary" type="submit" size="lg"
                >Login</b-button
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
      userDetails: ["", ""]
    };
  },
  methods: {
    buttonManagerBack: function() {
      this.$emit("clicked", 0);
    },
    loginForm: function(event) {
      event.preventDefault();
      if (!this.userDetails[0]) {
        alert("Please enter Email");
      } else if (!this.userDetails[1]) {
        alert("Please enter password");
      } else if (this.userDetails[1].length < 8) {
        alert("Password you entered is less than 8 character");
      } else {
        alert("Please wait");
        auth()
          .signInWithEmailAndPassword(this.userDetails[0], this.userDetails[1])
          .then(response => {
            let body = {
              uid: response.user.uid,
              email: response.user.email,
              name: response.user.displayName
            };
            store
              .setItem("user", JSON.stringify(body))
              .then(() => {
                this.$store.dispatch("changeAuthStatus");
                alert("LogIn Success");
                window.location.href = "app";
              })
              .catch(err => {
                console.log(err);
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
