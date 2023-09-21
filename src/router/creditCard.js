import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "信用卡管理",
    hidden: false, //是否隐藏侧边栏
    icon: "el-icon-user",
    children: [
      {
        path: "/creditcard/all",
        name: "creditcardAll",
        text: "所有信用卡",
        components: {
          default: () => import("@/views/creditcard/all.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
