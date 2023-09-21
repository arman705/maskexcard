import axios from "axios";
import app from "@/main";
import { stringify } from "querystring";
import to from "await-to-js";

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API}`,
  timeout: 6000,
  responseType: "json", // Add this line to set the default responseType
});
instance.interceptors.request.use(
  (config) => {
    const token = app.$store.state.user.token;
    if (token) config.headers.iToken = token;
    if (config.method.toUpperCase() === "POST" && !config.noAutoFormData) {
      //noAutoFormData: false 将使用 form-data
      config.data = stringify(config.data);
      config.headers = Object.assign(config.headers, {
        "Content-Type": "application/x-www-form-urlencoded",
      });
    }
    return config;
  },
  (err) => Promise.reject(err)
);
const specialCode = [9991]; //9991 需要输入验证码
instance.interceptors.response.use(
  (res) => {
    const result = res.data || {};
    if (result.data && result.data.status === 401) {
      app.$store.commit("user/loginOut");
      app.$router.push({
        name: "loginSignIn",
        backUrl: app.$router.currentRoute.fullPath,
      });
      return;
    }
    const { code, msg } = result;
    if (code !== 0) {
      if (!specialCode.includes(code)) {
        app.$message.error(msg);
      }
      return Promise.reject(result);
    }
    return result;
  },
  async (err) => {
    //app.$message.error("网络错误，请稍后重试");
    return Promise.reject(err);
  }
);

// 2. 导出一个通过新axios实例调用接口的函数
export default ({
  url,
  method = "get",
  params,
  data,
  headers,
  responseType,
  noAutoFormData = true,
}) => {
  const promise = instance({
    url,
    method,
    params,
    data,
    responseType,
    headers,
    noAutoFormData,
  });
  return to(promise);
};
