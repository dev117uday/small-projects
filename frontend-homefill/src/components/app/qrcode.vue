<template>
  <center>
    <qrcodestream class="camera-viewport" @decode="onDecode"></qrcodestream>
    <br />
    <b-container>
      <b-button variant="success" size="lg" id="nav-buttons" @click="goback"
        >Go Back</b-button
      >
    </b-container>
  </center>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  components: {
    qrcodestream: QrcodeStream
  },
  methods: {
    onDecode: function(result) {
      alert(result);
    },
    goback: function() {
      this.$emit("clicked", "0");
    },
    onLoaded: function() {
      console.log("Loaded");
    }
  },
  beforeMount: function() {
    navigator.permissions.query({ name: "camera" }).then(function(result) {
      if (result.state == "granted") {
        alert("Accessing Camera");
      } else if (result.state == "prompt") {
        alert("Please allow access");
      } else if (result.state == "denied") {
        alert("allow access");
      }
      result.onchange = function() {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;

        if (navigator.getUserMedia) {
          navigator.getUserMedia(
            { video: { width: 1280, height: 720 } },
            function() {
              console.log("Streaming");
            },
            function(err) {
              console.log("The following error occurred: " + err.name);
            }
          );
        } else {
          console.log("getUserMedia not supported");
        }
      };
    });
  }
};
</script>
