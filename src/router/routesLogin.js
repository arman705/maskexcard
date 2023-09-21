import LoginSignIn from "@/views/login/LoginSignIn.vue";
import LoginRegister from "@/views/login/LoginRegister.vue";
import LoginForget from "@/views/login/LoginForget.vue";
const routes = [
  {
    path: "/login/SignIn",
    name: "loginSignIn",
    component: LoginSignIn,
  },
  {
    path: "/login/register",
    name: "LoginRegister",
    component: LoginRegister,
  },
  {
    path: "/login/forget",
    name: "LoginForget",
    component: LoginForget,
  },
];

export default routes;
