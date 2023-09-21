import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
import CustomIcon from "@/assets/img/dzgl.svg";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "对账管理",
    hidden: false, //是否隐藏侧边栏
    icon: CustomIcon,
    children: [
      {
        path: "/analysis/list",
        name: "rates",
        text: "商户对账单",
        components: {
          default: () => import("@/views/analysis/list.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
