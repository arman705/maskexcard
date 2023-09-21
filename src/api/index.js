import request from "@/plugins/request";
export default {
  indexRequest() {
    return request({
      url: "/index/orderInfo",
    });
  },
  tradingAmountTrend() {
    return request({
      url: "/index/tradingAmountTrend",
    });
  },
  platformInfo() {
    return request({
      url: "/index/platformInfo",
    });
  },
};
