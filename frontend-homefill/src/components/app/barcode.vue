<template>
  <div>
    <center v-if="!displayResult">
      <streambar
        v-if="cameraHide"
        @decode="onDecode"
        @loaded="onLoaded"
      ></streambar>
      <br />
      <b-container>
        <b-button variant="success" size="lg" id="nav-buttons" @click="goback"
          >Go Back</b-button
        >
      </b-container>
    </center>
    <br />
    <br />
    <center v-if="displayResult">
      <h3>Search result for : {{ msgx.barcode }}</h3>
      <h6>Number of results found : {{ msgx.no_of_results }}</h6>
      <b-list-group>
        <b-list-group-item v-for="item in msgx.results" :key="item">
          <h5>{{ item }}</h5>
        </b-list-group-item>
      </b-list-group>
    </center>
  </div>
</template>

<script>
require("node-fetch");
import { StreamBarcodeReader } from "vue-barcode-reader";

var bar = "";

export default {
  components: {
    streambar: StreamBarcodeReader
  },
  data() {
    return {
      product: null,
      cameraHide: true,
      displayResult: false,
      msgx: ""
    };
  },
  methods: {
    onDecode: function(result) {
      alert(result);
      let barcode = result;
      if (!this.isNumeric(barcode)) {
        alert("QRcode also detect,please hide it while scanning barcode");
      } else {
        bar = result;
        this.cameraHide = false;
        this.msgx = "Processing, Please wait ....";
        let url = `https://backend-homefill.herokuapp.com/api/barcode/${result}/`;
        let proxyUrl = "https://udayproxyserver.herokuapp.com/";
        let urlx = proxyUrl + url;
        fetch(urlx)
          .then(response => response.json())
          .then(data => {
            this.msgx = data;
            this.displayResult = true;
          })
          .catch(err => console.log(err));
      }
      // End
    },
    isNumeric: function(value) {
      return /^-{0,1}\d+$/.test(value);
    },
    resetView: function() {
      this.cameraHide = true;
      this.product = "";
      this.displayResult = false;
    },
    onLoaded: function() {
      console.log("Loaded");
    },
    goback: function() {
      this.$emit("clicked", "0");
    },

    sendthisdata: function(value) {
      this.$emit("getData", `${value}XXXX${bar}`);
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
