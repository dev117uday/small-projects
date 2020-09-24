<template>
  <div>
    <!-- Nav bar -->
    <nav class="mobile-bottom-nav">
      <div class="mobile-bottom-nav__item">
        <div
          v-bind:class="{ active: mainPageBool[0] }"
          @click="mainPageManager(0)"
          class="mobile-bottom-nav__item-content"
        >
          <b-icon-card-list class="icon"></b-icon-card-list>
        </div>
      </div>
      <div class="mobile-bottom-nav__item">
        <div
          v-bind:class="{ active: mainPageBool[1] }"
          @click="mainPageManager(1)"
          class="mobile-bottom-nav__item-content"
        >
          <b-icon-camera-video class="icon"></b-icon-camera-video>
        </div>
      </div>
      <div class="mobile-bottom-nav__item">
        <div
          v-bind:class="{ active: mainPageBool[2] }"
          @click="mainPageManager(2)"
          class="mobile-bottom-nav__item-content"
        >
          <b-icon-chat-square-dots class="icon"></b-icon-chat-square-dots>
        </div>
      </div>

      <div class="mobile-bottom-nav__item">
        <div
          v-bind:class="{ active: mainPageBool[3] }"
          @click="mainPageManager(3)"
          class="mobile-bottom-nav__item-content"
        >
          <b-icon-app class="icon"></b-icon-app>
        </div>
      </div>
    </nav>
    <!--  nav bar end   -->
    <div>
      <userprofile v-if="mainPageBool[3]" />

      <captureprofile v-if="mainPageBool[1]" />
    </div>
  </div>
</template>
<script>
import userProfile from "./app/UserProfile.vue";
import captureProfile from "./app/Capture.vue";

export default {
  components: {
    userprofile: userProfile,
    captureprofile: captureProfile
  },
  data() {
    return {
      mainPageBool: [false, true, false, false]
    };
  },
  methods: {
    mainPageManager: function(index) {
      this.mainPageBool = [false, false, false, false];
      this.mainPageBool[index] = true;
    }
  }
};
</script>

<style lang="scss">
.icon {
  height: 27px;
  width: 27px;
}
.active {
  color: red;
}
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  will-change: transform;
  transform: translateZ(0);
  display: flex;
  height: 50px;
  box-shadow: 0 -2px 5px -2px #333;
  background-color: #fff;

  &__item {
    flex-grow: 1;
    text-align: center;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__item-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.camera-viewport {
  width: 100vw;
  height: 80vh;
}
.heading {
  color: #252423;
}
</style>
