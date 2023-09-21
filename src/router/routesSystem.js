import AppSlide from "@/components/global/AppSlide";
import AppTopBar from "@/components/global/AppTopBar";
//AppSlide 和 AppTopBar 是路由视图配置，AppTopBar 有些页面需要自定义
//hidden 该项是否在侧边栏隐藏 true 隐藏
const routes = [
  {
    text: "系统管理",
    hidden: false, //是否隐藏侧边栏
    icon: "el-icon-setting",
    children: [
      {
        path: "/system/users",
        name: "SystemUsers",
        text: "用户管理",
        components: {
          default: () => import("@/views/system/users.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/system/roles",
        name: "SystemRoles",
        text: "角色管理",
        components: {
          default: () => import("@/views/system/roles.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/system/resource",
        name: "SystemResource",
        text: "菜单管理",
        components: {
          default: () => import("@/views/system/resource.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/system/information",
        name: "SystemInformation",
        text: "消息管理",
        components: {
          default: () => import("@/views/system/information.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/system/security",
        name: "SystemSecurity",
        text: "安全中心",
        components: {
          default: () => import("@/views/system/security.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/system/operation",
        name: "SystemoOperation",
        text: "操作日志",
        components: {
          default: () => import("@/views/system/operation.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
      {
        path: "/system/dictionaries",
        name: "SystemDictionaries",
        text: "字典管理",
        components: {
          default: () => import("@/views/system/dictionaries.vue"),
          AppSlide: AppSlide,
          AppTopBar: AppTopBar,
        },
      },
    ],
  },
];

export default routes;
