// 全局组件
import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
import AppSction from "@/components/global/AppSction";
import VerificationCode from "@/components/global/VerificationCode";
import SendCode from "@/components/global/SendCode";
import AuthenticatorCode from "@/components/global/AuthenticatorCode";
import AppTopMsg from "@/components/global/AppTopMsg";
import ChangePassword from "@/components/global/ChangePassword";
export default {
  install(Vue) {
    Vue.component(AppSlide.name, AppSlide);
    Vue.component(AppTopBar.name, AppTopBar);
    Vue.component(AppSction.name, AppSction);
    Vue.component(VerificationCode.name, VerificationCode);
    Vue.component(SendCode.name, SendCode);
    Vue.component(AuthenticatorCode.name, AuthenticatorCode);
    Vue.component(AppTopMsg.name, AppTopMsg);
    Vue.component(ChangePassword.name, ChangePassword);
  },
};
