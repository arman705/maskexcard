import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
import CustomIcon from "@/assets/img/jsgl.svg";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "结算管理",
    hidden: false, //是否隐藏侧边栏
    icon: CustomIcon,
    children: [
      {
        path: "/settlement/review",
        name: "review",
        text: "结算审核",
        components: {
          default: () => import("@/views/settlement/review.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/settlement/transaction",
        name: "transaction",
        text: "打款管理",
        components: {
          default: () => import("@/views/settlement/review.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/settlement/record",
        name: "record",
        text: "结算记录",
        components: {
          default: () => import("@/views/settlement/record.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/settlement/setting",
        name: "setting",
        text: "结算设置",
        components: {
          default: () => import("@/views/settlement/setting.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
