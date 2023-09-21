<template>
  <div class="security-system-page">
    <AppSction class="mb-15" title="安全中心" v-loading="loading">
      <template v-slot:cont>
        <p class="title pl-8">谷歌认证</p>
        <div class="d-flex pl-8 security-cont">
          <div class="flex-1">
            <ul class="goole-code">
              <li>
                {{
                  forrm.isBand
                    ? "已绑定： 谷歌验证"
                    : "未绑定： 您未绑定谷歌验证"
                }}
              </li>
              <li class="vaid-goole" v-if="!forrm.isBand">
                <i class="el-icon-warning-outline"></i>
                提示：为了您的资金安全，请尽快绑定谷歌验证码！
              </li>
              <li>
                手机客户端下载地址：<a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh_CN&gl=US"
                  ><el-button type="text">Android</el-button></a
                >

                <el-button type="text"> /</el-button>
                <a
                  href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><el-button type="text">IOS</el-button></a
                >
              </li>
            </ul>
          </div>
          <div class="flex-1 goole-btn">
            <el-button
              size="small"
              type="primary"
              @click="bindCode(0)"
              v-if="forrm.isBand === 0 && hasPermi(perm.update)"
              >绑定</el-button
            >
            <el-button
              @click="bindCode(1)"
              size="small"
              type="primary"
              v-if="forrm.isBand && hasPermi(perm.update)"
              >解绑</el-button
            >
          </div>
        </div>
        <p class="title pl-8">登录设置</p>
        <div class="d-flex pl-8 security-cont">
          <div class="flex-1">
            <ul class="goole-code">
              <li>
                已设置：
                {{
                  forrm.loginType
                    ? "登录密码+谷歌组合验证(需绑定谷歌验证)"
                    : "仅登录密码验证"
                }}
              </li>
              <li class="vaid-goole">
                <i class="el-icon-warning-outline"></i>
                提示：建议绑定谷歌验证，若没有绑定谷歌验证，出现资金问题，本平台恕不负责！
              </li>
            </ul>
          </div>
          <div class="flex-1 goole-btn">
            <el-button
              size="small"
              type="primary"
              @click="$refs.OperationLogin.show(forrm)"
              v-if="hasPermi(perm.change)"
              >更换</el-button
            >
          </div>
        </div>
        <AuthenticatorCode
          @addSuccess="sysAuthInfo"
          :erCode="config"
          ref="AuthenticatorCode"
        />
        <OperationLogin ref="OperationLogin" />
      </template>
    </AppSction>
  </div>
</template>
<script>
import apiUser from "@/api/user";
import OperationLogin from "@/views/system/components/OperationLogin.vue";
export default {
  name: "SystemSecurity",
  data() {
    return {
      loading: false,
      forrm: {
        isBand: 0,
        loginType: 0,
      },
      config: {},
    };
  },
  components: { OperationLogin },
  methods: {
    bindCode(type) {
      this.$refs.AuthenticatorCode.show(type);
    },
    async sysAuthInfo() {
      this.loading = true;
      const [error, res] = await apiUser.sysAuthInfo();
      if (error) {
        this.loading = false;
        return;
      }
      this.forrm = res.data;
      if (this.forrm.isBand === 1) {
        this.loading = false;
        return;
      }
      const [errors, result] = await apiUser.getCodeAndSecret();
      this.loading = false;
      if (errors) return;
      this.config = result.data;
    },
  },
  created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "安全中心");
    this.sysAuthInfo();
  },
};
</script>
<style lang="less" scoped>
.security-system-page {
  .pl-8 {
    padding-left: 8px !important;
  }
  font-size: 16px;
  .title {
    border-bottom: 1px solid #f1f1f1;
    padding: 0 0 8px;
  }
  .goole-code {
    li:first-child {
      padding-top: 8px;
    }
    li {
      line-height: 34px;
      white-space: nowrap;
    }
  }
  .goole-btn {
    padding-top: 14px;
    padding-left: 120px;
  }
  .vaid-goole {
    background-color: #fff4f4;
    color: #e25e5e;
    font-size: 12px;
    padding: 0 8px;
    margin: 6px 0;
  }
  .security-cont {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
}
</style>
