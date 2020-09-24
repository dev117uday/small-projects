<template>
  <div>
    <br />
    <br />
    <center>
      <div>
        <input
          @change="captureImg"
          type="file"
          v-bind:id="capture"
          accept="image/*, video/*, audio/*"
          capture
          multiple
        />
        <p>
          <img
            v-bind:src="img"
            style="width : 80vw; height : 70vh"
            alt="from phone"
          />
        </p>
      </div>
      <br />
      <br />
      <b-container>
        <b-row>
          <b-col>
            <b-button
              variant="success"
              size="lg"
              id="nav-buttons"
              @click="goback"
              >Go Back</b-button
            >
          </b-col>
          <b-col>
            <b-button
              variant="primary"
              size="lg"
              id="nav-buttons"
              @click="goback"
              >Submit</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      capture: null,
      img: null
    };
  },
  methods: {
    captureImg: function(event) {
      console.log(event);
      console.log(event.target);
      console.dir(event.target.files[0]);
      if (event.target.files[0].type.indexOf("image/") > -1) {
        this.img = window.URL.createObjectURL(event.target.files[0]);
      }
    },
    goback: function() {
      this.$emit("clicked", "0");
    }
  }
};
</script>
