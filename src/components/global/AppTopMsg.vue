<template>
  <div class="msg-yips align-center">
    <i class="el-icon-chat-line-round"></i>
    商户:测试商户(id:10000000)有一笔结算申请待审核中
  </div>
</template>

<script>
export default {
  name: "AppTopMsg",
  showMsg: {
    type: Boolean,
    default: false,
  },
  props: {
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
@import "@/assets/style/mixins/ellipsis.less";
.msg-yips {
  max-width: 412px;
  height: 29px;
  padding: 0 16px;
  border-radius: 29px;
  border: 1px solid #00bda1;
  color: @primary;
  line-height: 1;
  .ellipsis();
  .el-icon-chat-line-round {
    font-size: 24px;
    margin-right: 8px;
  }
}
</style>
