<template>
  <div class="hello">
    <b-container>
      <!-- Svg -->
      <b-row>
        <b-col>
          <center>
            <img src="@/assets/auth/home.svg" id="home-svg" />
          </center>
        </b-col>
      </b-row>
      <!-- End Svg -->
      <!-- ################################################ -->
      <!-- Title home -->
      <b-row>
        <b-col id="home-fill" class="non-copy">HomeFill</b-col>
      </b-row>
      <!-- title End -->
      <br />
      <br />
      <b-row>
        <!-- login -->
        <b-col>
          <center>
            <form>
              <b-button
                variant="success"
                type="submit"
                @click="buttonManager(1)"
                size="lg"
                >Login</b-button
              >
            </form>
          </center>
        </b-col>
        <!-- end login -->
        <!-- ################################################ -->
        <!-- Sign-Up -->
        <b-col>
          <center>
            <form action="/signup">
              <b-button
                variant="primary"
                type="submit"
                @click="buttonManager(2)"
                size="lg"
                >Register</b-button
              >
            </form>
          </center>
        </b-col>
        <!-- End sign up -->
      </b-row>
      <br />
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonStatus: true
    };
  },

  methods: {
    buttonManager: function(value) {
      this.buttonStatus = !this.buttonStatus;
      this.$emit("clicked", value);
    }
  }
};
</script>

<style>
#home-svg {
  margin-top: 10vh;
  width: 350px;
  height: 350px;
}
#home-fill {
  text-align: center;
  margin-top: -100px;
  font-size: 80px;
  font-family: sans-serif;
  font-weight: 400;
}
</style>
