import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "商户管理",
    hidden: false, //是否隐藏侧边栏
    icon: "el-icon-user",
    children: [
      {
        path: "/merchant/all",
        name: "MerchantAll",
        text: "所有商户",
        components: {
          default: () => import("@/views/merchant/all/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/merchant/not-reviewed",
        name: "MerchantNotReviewed",
        text: "待审商户",
        components: {
          default: () => import("@/views/merchant/not-reviewed/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/merchant/cash-flow",
        name: "MerchantCashFlow",
        text: "资金流水",
        components: {
          default: () => import("@/views/merchant/cash-flow/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
