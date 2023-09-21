<template>
  <div class="layout-section" :style="headStyle">
    <div
      v-if="head"
      class="layout-title border-bottom justify-between align-center"
    >
      <div class="title-left">
        <p v-if="title" class="align-center title-left-p align-center">
          <i class="line"></i> {{ title }}
        </p>
        <p class="align-center align-center"><slot name="title"></slot></p>
      </div>
      <div class="title-rit"><slot name="title-right"></slot></div>
    </div>
    <div class="layout-section-cont">
      <slot name="cont"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSction",
  props: {
    head: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    headStyle() {
      if (!this.head) {
        return {
          "padding-top": 0,
        };
      }
      return {};
    },
  },
};
</script>
<style scoped lang="less">
.layout-section {
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(76, 103, 100, 0.1);
  border-radius: 8px 8px 8px 8px;
  padding-top: 20px;
  color: #606060;
  .border-bottom {
    border-bottom: 1px solid #f1f1f1;
  }
  .blod {
    font-weight: bold;
  }
  .layout-title {
    margin: 0 18px 0;
    padding-bottom: 8px;
  }
  .title-left-p {
    font-size: 16px;
    color: #15192a;
  }
  .line {
    width: 2px;
    height: 16px;
    background: @primary;
    margin: 0 5px;
  }
  .layout-section-cont {
    padding: 22px;
  }
}
</style>
