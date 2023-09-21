import axios from "axios";
import app from "@/main";

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API}/api`,
  timeout: 6000,
  responseType: "blob", // Add this line to set the default responseType
});
instance.interceptors.request.use(
  (config) => {
    const token = app.$store.state.user.token;
    if (token) config.headers.iToken = token;
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
