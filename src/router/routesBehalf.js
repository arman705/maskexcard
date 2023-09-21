import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
import CustomIcon from "@/assets/img/dfgl.svg";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "代付管理",
    hidden: false, //是否隐藏侧边栏
    icon: CustomIcon,
    children: [
      {
        path: "/agent/order",
        name: "order",
        text: "代付订单",
        components: {
          default: () => import("@/views/agent/order.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/agent/tunnel",
        name: "tunnel",
        text: "代付通道",
        components: {
          default: () => import("@/views/agent/tunnel.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
