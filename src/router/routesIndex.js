import AppSlide from "@/components/global/AppSlide";
import routesMerchant from "@/router/routesMerchant";
import creditCard from "@/router/creditCard";
// import routesAgent from "@/router/routesAgent";
import routesBill from "@/router/routesBill";
import routesPay from "@/router/routesPay";
// import routesPayment from "@/router/routesPayment";
import routesManage from "@/router/routesManage";
// import routesBehalf from "@/router/routesBehalf";
import routesData from "@/router/routesData";
import routesSystem from "@/router/routesSystem";
import icon from "@/assets/img/bind/overview.png";
import AppTopBar from "@/components/global/AppTopBar";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    path: "/",
    name: "HomeView",
    text: "运营首页",
    icon,
    components: {
      default: () => import("@/views/HomeView.vue"),
      AppSlide: AppSlide,
      AppTopBar: AppTopBar,
    },
  },
  ...routesMerchant,
  ...creditCard,
  // ...routesAgent,
  ...routesBill,
  ...routesPay,
  // ...routesPayment,
  // ...routesBehalf,
  ...routesData,
  ...routesManage,
  ...routesSystem,
];

export default routes;
