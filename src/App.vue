<template>
  <div id="app" :style="Style">
    <router-view :slideStyle="slideStyle" name="AppSlide"></router-view>
    <div class="app-view-cont">
      <router-view :topBarStyle="topBarStyle" name="AppTopBar"></router-view>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      slideWidth: "280px",
      topBarHeight: "68px",
    };
  },
  computed: {
    slideStyle() {
      return {
        width: this.slideWidth,
      };
    },
    topBarStyle() {
      return {
        height: this.topBarHeight,
      };
    },
    Style() {
      return {
        paddingTop: this.topBarHeight,
        paddingLeft: this.slideWidth,
      };
    },
  },
};
</script>
<style lang="less">
.app-view-cont {
  padding: 28px;
}
</style>
