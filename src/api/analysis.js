import request from "@/plugins/request";
export default {
  loadList(data) {
    return request({
      url: "/analysis/rankList",
      method: "post",
      data,
    });
  },
  merchList(data) {
    return request({
      url: "/analysis/successRateStatistics",
      method: "post",
      data,
    });
  },
  cardList(data) {
    return request({
      url: "/card/list",
      method: "post",
      data,
    });
  },
  closeCard(id) {
    return request({
      url: "/card/close/" + id,
      method: "post",
    });
  },
  getHistory(data) {
    return request({
      url: "/card/recentTransactionHistory",
      params: data,
    });
  },
  freezeCard(id) {
    return request({
      url: "/card/lock/" + id,
      method: "post",
    });
  },
  unfreezeCard(id) {
    return request({
      url: "/card/unlock/" + id,
      method: "post",
    });
  },
  successRates(data) {
    return request({
      url: "/analysis/successRateStatistics",
      method: "post",
      data,
    });
  },
  sevenDays(data) {
    return request({
      url: "/analysis/sevenDayTradingAmount",
      data,
    });
  },
  hourData(data) {
    return request({
      url: "/analysis/orderSuccessNear12Hours",
      data,
    });
  },
};
