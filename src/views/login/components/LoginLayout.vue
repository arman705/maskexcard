<template>
  <div>
    <div class="login-sign-in d-flex" :class="className">
      <div class="login-item login-item-left">
        <slot></slot>
      </div>
      <div class="login-item login-item-rit d-flex">
        <div class="item-rit center-center flex1 flex-column">
          <p><img width="164" :src="require('@/assets/logo.png')" alt="" /></p>
          <ul>
            <li><i class="el-icon-circle-check"></i>简单</li>
            <li><i class="el-icon-circle-check"></i>快捷</li>
            <li><i class="el-icon-circle-check"></i>安全</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="center-center make-right">
      © 2023-2024 MaskEXCard.com 版权所有
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginLayout",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      classStr: "html-full-page",
    };
  },
  components: {},
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "我的卡片");
  },
  mounted() {
    document.querySelector("html").classList.add(this.classStr);
  },
  beforeDestroy() {
    document.querySelector("html").classList.remove(this.classStr);
  },
};
</script>
<style lang="less">
.html-full-page {
  &,
  body,
  #app,
  #app,
  .app-view-cont {
    width: 100%;
    height: 100%;
  }
  #app {
    padding: 0 !important;
  }
  .app-view-cont {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-rit {
    position: relative;
    z-index: 2;
    color: #fff;
    width: 100%;
    li {
      margin-top: 20px;
      i {
        margin-right: 12px;
      }
    }
  }
  .login-sign-in {
    border-radius: 20px;
    overflow: hidden;
  }
  .make-right {
    padding-top: 40px;
    color: #878787;
  }
  .vector {
    background: url("@/assets/img/login/vector.png") no-repeat center;
    height: 100%;
    display: flex;
    background-size: 12px 13px;
    transition: none;
  }
  .login-item-rit {
    width: 380px;
    background: url("@/assets/img/login/Rectangle14@2x.png") no-repeat center;
    background-size: cover;
    position: relative;
    &::after {
      content: "";
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(5, 22, 85, 0.5);
    }
  }
  .login-item-left {
    width: 380px;
    height: 460px;
    background: #ffffff;
    padding: 60px 30px 53px;
  }
  .sing-in-text {
    font-size: 36px;
    font-weight: 600;
    color: #15192a;
    line-height: 52px;
  }
  .wel {
    color: #878787;
    padding-bottom: 48px;
  }
  .login-sign-reset {
    .login-item-left {
      padding-top: 25px;
    }

    .wel {
      padding-bottom: 24px;
    }
  }
}
</style>
