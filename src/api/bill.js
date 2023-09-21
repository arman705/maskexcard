import request from "@/plugins/request";
export default {
  mgrRechargeList(params) {
    return request({
      url: "/mgr_recharge/list",
      method: "get",
      params,
    });
  },
};
