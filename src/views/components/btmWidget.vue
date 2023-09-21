<template>
  <div class="submit-box padding-huge">
    <div class="tips-head">
      <img
        src="@/assets/img/tips.svg"
        style="width: 16px; height: 16px; margin-right: 10px"
      />
      <span>Tips</span>
    </div>
    <div class="top-content">
      <div>
        Email是注册帐户登录管理后台的唯一标识，您可以用他来找回密码或者沟通账户敏感问题。
      </div>
      <div>
        为了防止帐户被非法使用，我们强制启用两步验证，最大限度保证客户的账户和资金安全。
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.submit-box {
  padding: 20px 0 20px 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  background: #fff;
  .item {
    display: inline-block;
  }
  .flex {
    display: flex;
  }
  img {
    width: 13px;
    height: 13px;
  }
  .left-top {
    border-top: 1px solid #f1f1f1;
    padding-top: 10px;
  }
  .info {
    padding-left: 10px;
    line-height: 36px;
    font-size: 12px;
    display: flex;
    align-items: center;
    background: #f3fcfb;
    color: #3f62dc;
  }
  .flex {
    display: flex;
  }
  .top-item {
    width: 24%;
    margin-right: 1%;
    display: inline-block;
    .left-right {
      justify-content: space-between;
    }
  }
}
.padding-huge {
  padding: 20px 15px;
}
.submit-list {
  display: flex;
  flex-wrap: wrap; /* 允许元素换行 */
  .name {
    margin-bottom: 5px;
  }
}

.submit-item {
  width: 23%;
  margin-right: 2%;
  margin-bottom: 10px; /* 添加下外边距以与其他行分开 */
}
.tips-head {
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
}
.top-content {
  margin-top: 20px;
  color: #878787;
  line-height: 28px;
}
.top-content div::before {
  content: "• "; /* 前缀点样式 */
  color: #878787; /* 前缀点颜色 */
  margin-right: 5px; /* 前缀点和文本之间的距离 */
}
.el-select {
  width: 100%;
}
.el-range-editor.el-input__inner {
  width: 100%;
}
/deep/.el-tabs__header {
  margin-bottom: 0;
  margin-top: 27px;
}
.no-bg {
  background: none;
}
.sub-content {
  display: flex;
  align-items: center;
  height: 70px;
  padding-left: 20px;
  margin-top: 10px;
  background: #fff;
  .right-data {
    color: #606060;
    .item {
      display: inline-block;
    }
    img {
      width: 13px;
      height: 13px;
    }
  }
  .amount {
    font-size: 20px;
    margin-right: 10px;
    color: #15192a;
  }
}
.unit {
  color: #bfbfbf;
  margin: 0 5px;
  font-size: 12px;
}
.btn-area {
  text-align: right;
  margin-bottom: 20px;
  .el-button {
    background: #00bda1;
    color: #fff;
  }
}
.opreate {
  .opreate-item {
    margin: 0 5px;
    display: inline-block;
    color: #606060;
  }
  img {
    width: 13px;
    height: 13px;
  }
}
.left-part {
  display: inline-block;
  width: 50%;
  margin-right: 5%;
}
.right-part {
  display: inline-block;
  width: 45%;
  .load-intro {
    line-height: 23px;
    padding: 20px 20px;
    border-radius: 8px;
    border: 1px solid #e3e3e3;
    .load-intro-item {
      margin-bottom: 10px;
    }
    .load-title {
      font-weight: bold;
    }
  }
}
.base-title {
  color: #15192a;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.stero {
  display: flex;
  margin: 20px 0 40px;
  .warning {
    margin-top: 10px;
    font-size: 14px;
    color: #606060;
    .warning-right {
      display: inline-block;
      margin-left: 30px;
    }
  }
  .left-choice {
    display: inline-block;
    width: 25%;
    padding-top: 10px;
    color: #15192a;
  }
  .right-choice {
    display: inline-block;
    width: 75%;
    .el-input {
      display: inline-block;
      width: 90%;
      margin-right: 10px;
    }
    .el-radio {
      display: block;
      line-height: 35px;
    }
  }
}
</style>
