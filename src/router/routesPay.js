import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "支付配置",
    hidden: false, //是否隐藏侧边栏
    icon: "el-icon-document",
    children: [
      {
        path: "/pay/type",
        name: "PayType",
        text: "支付类型",
        components: {
          default: () => import("@/views/pay/type/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/pay/api-type",
        name: "PayApiType",
        text: "支付接口类型",
        components: {
          default: () => import("@/views/pay/api-type/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/pay/api",
        name: "PayApi",
        text: "支付接口",
        components: {
          default: () => import("@/views/pay/api/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/pay/channel",
        name: "PayChannel",
        text: "支付通道",
        components: {
          default: () => import("@/views/pay/channel/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/pay/product",
        name: "PayProduct",
        text: "支付产品",
        components: {
          default: () => import("@/views/pay/product/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/pay/card-bin",
        name: "PayCardBin",
        text: "卡Bin",
        components: {
          default: () => import("@/views/pay/card-bin/index.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
