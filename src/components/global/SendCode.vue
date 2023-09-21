<template>
  <el-button
    class="send-code"
    :disabled="isDisabled"
    size="small"
    type="text"
    @click="getIdentifyCodeBtn"
  >
    {{ isDisabled ? `重新发送 ${count}` : "发送验证码" }}
  </el-button>
</template>

<script>
export default {
  name: "SendCode",
  data() {
    return {
      count: "59",
      click: "获取短信验证码",
      isDisabled: false,
    };
  },
  props: {
    topBarStyle: {
      type: Object,
      default: () => {
        // height: 68px;
        return { height: "68px" };
      },
    },
    confirm: {
      type: Function,
      default: () => {
        return true;
      },
    },
  },
  methods: {
    async getIdentifyCodeBtn() {
      const status = await this.confirm();
      if (!status) return;
      this.countTime();
    },
    countTime() {
      const TIME_COUNT = 60; //倒计时60秒
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.isDisabled = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.clearIntervalFn();
          }
        }, 1000);
      }
    },
    clearIntervalFn() {
      this.isDisabled = false;
      if (!this.timer) return;
      clearInterval(this.timer);
      this.timer = null;
    },
  },
  beforeDestroy() {
    this.clearIntervalFn();
  },
};
</script>
<style scoped lang="less">
.send-code {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>
