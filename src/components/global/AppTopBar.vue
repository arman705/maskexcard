<template>
  <div class="appp-top-bar align-center justify-between" :style="topBarStyle">
    <div class="appp-top-bar-title js-appp-top-bar-title">
      {{ topBarTitle }}
    </div>
    <div class="appp-top-bar-slot">
      <AppTopMsg v-if="topMsgState" />
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppTopBar",
  props: {
    showMsg: {
      type: Boolean,
      default: false,
    },
    topBarStyle: {
      type: Object,
      default: () => {
        // height: 68px;
        return { height: "68px" };
      },
    },
  },
};
</script>
<style scoped lang="less">
.appp-top-bar {
  position: fixed;
  z-index: 999;
  background-color: @bg-color;
  left: 280px;
  top: 0;
  right: 0;
  padding: 0 28px;
  border-bottom: 1px solid #e3e3e3;
  .appp-top-bar-title {
    font-size: 20px;
    font-weight: bold;
    color: #191919;
  }
}
</style>
