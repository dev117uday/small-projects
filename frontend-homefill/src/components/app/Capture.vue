<template>
  <div>
    <center>
      <br />
      <h1 class="heading">
        <b>Capture</b>
      </h1>
    </center>
    <center v-if="captureViewBool[0]">
      <b-container fluid="xl">
        <br />
        <br />
        <b-row>
          <b-col md="6">
            <div>
              <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                  <b-col md="6">
                    <img
                      src="@/assets/capture/barcode.png"
                      alt="Image"
                      class="button-image"
                    />
                  </b-col>
                  <b-col md="6">
                    <b-card-body title="Scan using Barcode">
                      <b-button
                        variant="primary"
                        @click="cameraViewManager(3)"
                        size="lg"
                        >Goto</b-button
                      >
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          <b-col md="6">
            <div>
              <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                  <b-col md="6">
                    <img
                      src="@/assets/capture/qrcode.png"
                      alt="Image"
                      class="button-image"
                    />
                  </b-col>
                  <b-col md="6">
                    <b-card-body title="Scan with QR Code">
                      <b-button
                        variant="primary"
                        @click="cameraViewManager(2)"
                        size="lg"
                        >Goto</b-button
                      >
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col md="6">
            <div>
              <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                  <b-col md="6">
                    <img
                      src="@/assets/capture/camera.svg"
                      alt="Image"
                      class="button-image"
                    />
                  </b-col>
                  <b-col md="6">
                    <br />
                    <b-card-body title="Capture with camera">
                      <b-button
                        variant="primary"
                        @click="cameraViewManager(1)"
                        size="lg"
                        >Goto</b-button
                      >
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
          <br />
          <b-col md="6">
            <div>
              <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                  <b-col md="6">
                    <img
                      src="@/assets/capture/manual.svg"
                      alt="Image"
                      class="button-image"
                    />
                  </b-col>
                  <b-col md="6">
                    <br />
                    <b-card-body title="Enter Product">
                      <b-button
                        variant="primary"
                        @click="cameraViewManager(4)"
                        size="lg"
                        >Goto</b-button
                      >
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
        </b-row>
        <br />
      </b-container>
    </center>

    <imageupload @clicked="cameraViewManager" v-if="captureViewBool[1]" />
    <qrcode @clicked="cameraViewManager" v-if="captureViewBool[2]" />
    <barcode @clicked="cameraViewManager" v-if="captureViewBool[3]" />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import ImageUpload from "./imageupload.vue";
import QrCode from "./qrcode.vue";
import BarCode from "./barcode.vue";

export default {
  components: {
    imageupload: ImageUpload,
    qrcode: QrCode,
    barcode: BarCode
  },
  data() {
    return {
      captureViewBool: [true, false, false, false, false]
    };
  },
  methods: {
    cameraViewManager: function(index) {
      console.log(index);
      this.captureViewBool = [false, false, false, false, false];
      this.captureViewBool[index] = true;
    }
  }
};
</script>

<style scoped>
.button-image {
  width: 200px;
  height: 200px;
}
</style>
