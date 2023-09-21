import request from "@/plugins/request";
export default {
  dictSearch(params) {
    return request({
      url: "/dict/search",
      method: "get",
      params,
    });
  },
  dictList(params) {
    return request({
      url: "/dict/list",
      method: "get",
      params,
    });
  },
};
