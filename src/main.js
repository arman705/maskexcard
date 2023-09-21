import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入element-ui
import ElementUI from "element-ui";
import i18n from "./locale";
import "@/assets/style/element-variables.scss";
import globalComponents from "@/components/global";
import permission from "@/mixins/permission";
import topBar from "@/mixins/topBar";
// 公共样式
import "@/assets/style/base.less";
Vue.use(ElementUI);
Vue.use(globalComponents);
Vue.mixin(topBar);
Vue.mixin(permission);
Vue.config.productionTip = false;

const appVue = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
export default appVue;
