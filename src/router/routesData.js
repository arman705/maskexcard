import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
import CustomIcon from "@/assets/img/sjfx.svg";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "数据分析",
    hidden: false, //是否隐藏侧边栏
    icon: CustomIcon,
    children: [
      {
        path: "/analysis/load",
        name: "load",
        text: "商户充值排行",
        components: {
          default: () => import("@/views/analysis/load.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      // {
      //   path: "/analysis/share",
      //   name: "share",
      //   text: "代理商分润排行",
      //   components: {
      //     default: () => import("@/views/analysis/share.vue"),
      //     AppSlide: AppSlide,
      //     AppTopBar: AppTopBar,
      //   },
      // },
      // {
      //   path: "/analysis/product",
      //   name: "product",
      //   text: "支付产品统计",
      //   components: {
      //     default: () => import("@/views/analysis/product.vue"),
      //     AppSlide: AppSlide,
      //     AppTopBar: AppTopBar,
      //   },
      // },
      {
        path: "/analysis/rates",
        name: "rates",
        text: "成功率统计",
        components: {
          default: () => import("@/views/analysis/rates.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
