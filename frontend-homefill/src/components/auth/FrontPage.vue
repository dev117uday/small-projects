<template>
  <div>
    <mainMenu v-if="viewManager[0]" @clicked="beforeAuthViewManager"></mainMenu>
    <login v-if="viewManager[1]" @clicked="beforeAuthViewManager"></login>
    <signup v-if="viewManager[2]" @clicked="beforeAuthViewManager"></signup>
  </div>
</template>

<script>
import login from "./Login";
import mainMenu from "./Menu";
import signup from "./Signup";

export default {
  components: {
    mainMenu: mainMenu,
    login: login,
    signup: signup
  },
  data() {
    return {
      viewManager: [true, false, false]
    };
  },
  methods: {
    beforeAuthViewManager: function(value) {
      this.viewManager = [false, false, false];
      this.viewManager[value] = true;
    }
  }
};
</script>
<style>
.non-copy {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.form-svg {
  height: 200px;
  width: 200px;
  margin-top: 5vh;
}
.form-title {
  text-align: center;
  font-family: sans-serif;
  font-size: 50px;
  font-weight: 400;
}
</style>
