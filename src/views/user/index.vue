<template>
  <div>
    <AppSction class="mb-15" title="基本信息">
      <template v-slot:title-right>
        <i
          class="el-icon-question cursor-pointer color-blue"
          @click="dialogTips = true"
        ></i>
      </template>
      <template v-slot:cont>
        <div class="d-flex flex-wrap">
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              邮箱
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center">
                {{ pageUser.email }}
                <i class="el-icon-edit" @click="$refs.UpdateEmail.show()"></i>
              </p>
            </li>
          </ul>
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              昵称
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center" v-if="!edtName">
                {{ pageUser.loginUsername }}
                <i class="el-icon-edit" @click="edtName = true"></i>
              </p>
              <p class="align-center" v-else>
                <el-input
                  placeholder="请输入内容"
                  v-model.trim="pageUser.loginUsername"
                  size="small"
                ></el-input
                ><i
                  class="el-icon-check edt-icon"
                  @click="
                    edtUserBaseInfo({ loginUsername: pageUser.loginUsername });
                    edtName = false;
                  "
                ></i
                ><i
                  class="el-icon-close edt-icon"
                  @click="
                    pageUser.loginUsername = resetUser('loginUsername');
                    edtName = false;
                  "
                ></i>
              </p>
            </li>
          </ul>

          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              注册时间
            </li>
            <li class="flex-1 item-cont align-center">
              {{ pageUser.createdAt }}
            </li>
          </ul>
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              上次登录时间
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center">{{ pageUser.loginTime }}</p>
            </li>
          </ul>
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              上次登录IP
            </li>
            <li class="flex-1 item-cont align-center">
              {{ pageUser.loginIp }}
            </li>
          </ul>
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              状态
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center">
                <el-switch
                  :value="pageUser.state == 1 ? true : false"
                  disabled
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </p>
            </li>
          </ul>
          <ul style="width: 100%" class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              上次登录设备
            </li>
            <li class="flex-1 item-cont align-center">
              {{ pageUser.device }}
            </li>
          </ul>
        </div>
      </template>
    </AppSction>
    <AppSction class="mb-15" title="联系信息">
      <template v-slot:title-right>
        <p class="edt-user-info align-center">
          <i
            class="el-icon-edit"
            v-if="!edtBaseInfo"
            @click="edtBaseInfo = true"
          ></i>
          <span
            class="center-center"
            v-if="edtBaseInfo"
            @click="
              edtUserBaseInfo({
                telphone: pageUser.telphone,
                qq: pageUser.qq,
                vx: pageUser.vx,
                skypeId: pageUser.skypeId,
              });
              edtBaseInfo = false;
            "
            ><i class="el-icon-check center-center"></i
          ></span>
          <span
            class="center-center"
            v-if="edtBaseInfo"
            @click="
              Object.assign(
                pageUser,
                resetUser(['telphone', 'qq', 'vx', 'skypeId'])
              );
              edtBaseInfo = false;
            "
            ><i class="el-icon-close center-center"></i
          ></span>
        </p>
      </template>
      <template v-slot:cont>
        <div class="d-flex flex-wrap">
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              手机号
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center">
                <el-input
                  v-model.trim="pageUser.telphone"
                  :class="{ 'input-no-edt': !edtBaseInfo }"
                  size="small"
                  :disabled="!edtBaseInfo"
                  placeholder="手机号"
                ></el-input>
              </p>
            </li>
          </ul>
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              QQ
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center">
                <el-input
                  v-model.trim="pageUser.qq"
                  :class="{ 'input-no-edt': !edtBaseInfo }"
                  size="small"
                  :disabled="!edtBaseInfo"
                  :placeholder="pageUser.qq ? pageUser.qq : ''"
                ></el-input>
              </p>
            </li>
          </ul>

          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              微信
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center">
                <el-input
                  v-model.trim="pageUser.vx"
                  :class="{ 'input-no-edt': !edtBaseInfo }"
                  size="small"
                  :disabled="!edtBaseInfo"
                  :placeholder="pageUser.vx ? pageUser.vx : ''"
                ></el-input>
              </p>
            </li>
          </ul>
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              SkypeId
            </li>
            <li class="flex-1 item-cont align-center">
              <p class="align-center">
                <el-input
                  v-model.trim="pageUser.skypeId"
                  :class="{ 'input-no-edt': !edtBaseInfo }"
                  size="small"
                  :disabled="!edtBaseInfo"
                  :placeholder="pageUser.skypeId ? pageUser.skypeId : ''"
                ></el-input>
              </p>
            </li>
          </ul>
        </div>
      </template>
    </AppSction>
    <AppSction class="mb-15" title="首选项">
      <template v-slot:cont>
        <div class="d-flex flex-wrap">
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              所在时区设置
            </li>
            <li class="flex-1 item-cont align-center">
              <el-select
                size="small"
                :class="{ 'input-no-edt': !edtGtm }"
                :disabled="!edtGtm"
                v-model.trim="pageUser.timeZone"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in gmtList"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <i class="el-icon-edit" v-if="!edtGtm" @click="edtGtm = true"></i>
              <i
                class="el-icon-check edt-icon"
                v-if="edtGtm"
                @click="
                  edtUserBaseInfo({ timeZone: pageUser.timeZone });
                  edtGtm = false;
                "
              ></i
              ><i
                class="el-icon-close edt-icon"
                v-if="edtGtm"
                @click="
                  pageUser.timeZone = resetUser('timeZone');
                  edtGtm = false;
                "
              ></i>
            </li>
          </ul>
        </div>
      </template>
    </AppSction>
    <AppSction class="mb-15" title="安全信息">
      <template v-slot:cont>
        <div class="d-flex flex-wrap">
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              登录密码
            </li>
            <li class="flex-1 item-cont align-center">
              ******
              <i class="el-icon-edit" @click="$refs.UpdatePass.show()"></i>
            </li>
          </ul>
        </div>
        <div class="d-flex flex-wrap">
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              两步验证
            </li>
            <li class="flex-1 item-cont align-center">
              <img :src="require('@/assets/img/code.png')" @click="showCode" />
            </li>
          </ul>
        </div>
      </template>
    </AppSction>
    <AppSction class="mb-15" title="API信息">
      <template v-slot:title-right>
        <el-button
          type="primary"
          @click="openApi"
          size="small"
          icon="el-icon-tickets"
          >API文档</el-button
        >
      </template>
      <template v-slot:cont>
        <div class="d-flex flex-wrap">
          <ul class="doc-item d-flex over-hidden">
            <li class="lables no-grow no-shrink align-center color-black">
              商户号
            </li>
            <li class="flex-1 item-cont align-center">
              {{ pageUser.belongInfoId }}
            </li>
          </ul>
        </div>
        <div class="d-flex flex-wrap">
          <ul class="doc-item d-flex over-hidden" style="width: 100%">
            <li class="lables no-grow no-shrink align-center color-black">
              API秘钥
            </li>
            <li class="item-cont align-center" style="width: 270px">
              <el-input
                style="margin-right: 5px"
                :value="keyShow ? apikey : txt"
                class="input-no-edt"
                size="small"
                :disabled="true"
              ></el-input>
              <img
                width="16"
                v-if="keyShow"
                :src="require('@/assets/img/open.png')"
              />
              <img
                width="16"
                v-if="!keyShow"
                :src="require('@/assets/img/close.png')"
                @click="axjaGetKey"
              />
              <!-- <i class="el-icon-edit" @click="$refs.UpdateApiKey.show()"></i> -->
            </li>
          </ul>
        </div>
      </template>
    </AppSction>
    <btmWidget></btmWidget>
    <AuthenticatorCode
      @nextFn="nextFn"
      :showNext="true"
      :erCode="erCode"
      ref="AuthenticatorCode"
    />
    <VerificationCode
      :title="pageUser.isBand ? '重新绑定验证器' : '请输入你的2步认证验证码'"
      @updateCode="updateCode"
      ref="VerificationCode"
    />
    <el-dialog
      title="提示"
      class="g-dialog-component"
      :visible.sync="dialogTips"
      width="30%"
    >
      <p class="color-black">
        您在使用账户过程中遇到的任何问题， 都可以发送邮件到以下邮箱以寻求帮助！
      </p>
      <p class="center-center tips-box">
        <i class="el-icon-message"></i> support@maskexcard.com
      </p>
    </el-dialog>
    <UpdateEmail ref="UpdateEmail" />
    <UpdatePass ref="UpdatePass" />
    <UpdateApiKey ref="UpdateApiKey" @updateKey="getUserInfo" />
    <GetApiKey ref="GetApiKey" @geyApiKey="geyApiKey" />
  </div>
</template>

<script>
import btmWidget from "@/views/components/btmWidget";
import apiUser from "@/api/user";
import UpdatePass from "@/views/user/components/UpdatePass.vue";
import UpdateEmail from "@/views/user/components/UpdateEmail.vue";
import UpdateApiKey from "@/views/user/components/UpdateApiKey.vue";
import GetApiKey from "@/views/user/components/GetApiKey.vue";
import GTM from "@/plugins/GTM.json";
import { mapState } from "vuex";
export default {
  name: "UserCenter",
  data() {
    return {
      dialogTips: false,
      dialogEmail: false,
      edtName: false,
      edtBaseInfo: false,
      edtGtm: false,
      dialogPass: false,
      erCode: {},
      pageUser: {},
      gmtList: GTM,
      keyShow: false,
      apikey: "",
    };
  },
  components: { UpdatePass, UpdateEmail, UpdateApiKey, GetApiKey, btmWidget },
  computed: {
    ...mapState("user", ["user"]),
    txt() {
      let str = "";
      for (let index = 0; index < 20; index++) {
        str += "**";
      }
      return str;
    },
  },
  methods: {
    axjaGetKey() {
      this.$refs.GetApiKey.show();
    },
    geyApiKey(key) {
      this.apikey = key;
      this.keyShow = true;
    },
    openApi() {
      window.open("https://maskexcard.com/#/api-vcc-createCard");
    },
    showTips() {
      this.$message({
        message: "该功能暂未开放",
        type: "warning",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "提交成功",
            type: "success",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEmailClose() {
      this.$refs.emailCode.clearIntervalFn();
      this.dialogEmail = false;
    },
    resetUser(key) {
      if (Array.isArray(key)) {
        const obj = {};
        key.forEach((item) => {
          obj[item] = this.user[item];
        });
        return obj;
      }
      return this.user[key] || "";
    },
    async edtUserBaseInfo(params) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      await apiUser.edtUser(params);
      await this.getUserInfo();
      loading.close();
    },
    async showCode() {
      // const status = await this.open("确定修改Authenticator绑定吗？");
      // if (!status) return;
      this.$refs.VerificationCode.show();
    },
    open(txt) {
      return new Promise((resolve) => {
        this.$confirm(txt, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      });
    },
    async getCode() {
      const [error, res] = await apiUser.vercode();
      if (error) return;
      this.erCode = res.data;
    },
    async getBaseData() {
      await Promise.all([this.getUserInfo(), this.getCode()]);
    },
    async bindCode(code) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const [error] = await apiUser.bindCode({ code });
      if (error) {
        loading.close();
        this.$refs.VerificationCode.resCode();
        return;
      }
      this.$refs.VerificationCode.close();
      loading.close();
      this.$store.commit("user/loginOut");
      this.$message.success("修改成功");
      this.$router.push({ name: "loginSignIn" });
    },
    nextFn() {
      this.$refs.AuthenticatorCode.close();
      this.$refs.VerificationCode.resCode();
      this.$refs.VerificationCode.show();
    },
    async updateCode(code) {
      if (this.user.isBand === 0) {
        this.bindCode(code);
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const [error] = await apiUser.cancelBind({ code });
      if (error) {
        loading.close();
        this.$refs.VerificationCode.resCode();
        return;
      }
      await this.getBaseData();
      loading.close();
      this.$refs.AuthenticatorCode.show();
    },
    async getUserInfo() {
      const [, res] = await this.$store.dispatch("user/getInfo");
      if (res && res.data) {
        this.pageUser = res.data;
      }
    },
  },
  async created() {
    this.$store.commit("CHANGE_PAGE_TITLE", "账户设置");
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    this.getUserInfo();
    loading.close();
  },
};
</script>
<style lang="less" scoped>
.color-blue {
  color: #3b63c9;
}
.color-black {
  color: #15192a;
}
.tips-box {
  color: @primary;
  .el-icon-message {
    margin-top: 4px;
  }
}
.doc-item {
  width: 50%;
  margin-bottom: 10px;
  height: 32px;
}
.lables {
  width: 154px;
}
.item-cont {
  padding-right: 16px;
  .el-icon-edit {
    margin-left: 5px;
  }
  .el-icon-check {
    color: @primary;
  }
  .edt-icon {
    font-size: 20px;
    margin: 0 5px;
  }
}
.dialog-email-tips {
  padding: 0 18px;
  height: 36px;
  background: #f3fcfb;
  color: #3f62dc;
  border-radius: 4px 4px 4px 4px;
  line-height: 1;
  margin-bottom: 20px;
  i {
    margin-right: 5px;
  }
}
.edt-user-info {
  i {
    margin: 0 5px;
  }
  .el-icon-check,
  .el-icon-close {
    width: 22px;
    height: 22px;
    background: #00bda1;
    border-radius: 2px 2px 2px 2px;
    color: #fff;
    background-color: #878787;
  }
  .el-icon-check {
    background-color: @primary;
  }
}
.input-no-edt {
  outline: none;
  ::v-deep .el-input__suffix {
    display: none;
  }
  ::v-deep .el-input__inner {
    background-color: transparent !important;
    border: none !important;
    cursor: default !important;
    color: #606060 !important;
    padding-left: 0 !important;

    padding-right: 0;
  }
}
</style>
