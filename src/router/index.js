import Vue from "vue";
import VueRouter from "vue-router";
import routesIndex from "@/router/routesIndex";
import routesLogin from "@/router/routesLogin";
import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
import UserCenter from "@/views/user";
import auth from "@/plugins/auth";
import store from "@/store";
import Nprogress from "nprogress";
Vue.use(VueRouter);
const routes = [
  ...routesLogin,
  {
    path: "/user/center",
    name: "UserCenter",
    components: {
      default: UserCenter,
      AppSlide: AppSlide,
      AppTopBar: AppTopBar,
    },
  },
];
routesIndex.forEach((v) => {
  if (v.path) {
    routes.push({
      ...v,
      children: [],
    });
  }
  if (Array.isArray(v.children)) {
    v.children.forEach((doc) => {
      routes.push(doc);
    });
  }
});

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  Nprogress.start();
  store.commit("CHANGE_TOP_BAR_MSG", false);
  if (auth.getToken() && !store.state.user.user.loginUsername) {
    const [error] = await store.dispatch("user/getInfo");
    if (error) {
      store.commit("user/loginOut");
      next("/login/SignIn");
      return;
    }
  }
  if (auth.getToken()) {
    // toLowerCase 浏览器将大写字母改成小写
    if (to.path.includes("/login")) {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path.includes("/login")) {
      next();
    } else {
      next("/login/SignIn");
    }
  }
});
router.afterEach(() => {
  Nprogress.done();
});
export default router;
