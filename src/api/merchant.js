import request from "@/plugins/request";
export default {
  mchInfoList(params) {
    return request({
      url: "/mchInfo/list",
      method: "get",
      params,
    });
  },
  mchInfoDetail(params) {
    return request({
      url: "/mchInfo/detail",
      method: "get",
      params,
    });
  },
  mchInfoPayProductList(params) {
    return request({
      url: "/mchInfo/payProduct/list",
      method: "get",
      params,
    });
  },
  mchInfoAmountInfo(params) {
    return request({
      url: "/mchInfo/amountInfo",
      method: "get",
      params,
    });
  },
  mchInfoAmountUpdate(data) {
    return request({
      url: "/mchInfo/amount/update",
      method: "post",
      data,
    });
  },
  mchInfoQuerySettlementType(params) {
    return request({
      url: "/mchInfo/querySettlementType",
      method: "get",
      params,
    });
  },
  mchInfoAuditList(params) {
    return request({
      url: "/mchInfo/audit/list",
      method: "get",
      params,
    });
  },
  mchInfoAudit(data) {
    return request({
      url: "/mchInfo/audit",
      method: "post",
      data,
    });
  },
  mchInfoUpdate(data) {
    return request({
      url: "/mchInfo/update",
      method: "post",
      data,
    });
  },
  mchInfoSettlementTypeUpdate(data) {
    return request({
      url: "/mchInfo/settlementType/update",
      method: "post",
      data,
    });
  },
  mchInfoGetStatementList(params) {
    return request({
      url: "/mchInfo/getStatementList",
      method: "get",
      params,
    });
  },
  mchInfoPayChannelOptionList(params) {
    return request({
      url: "/mchInfo/payChannel/optionList",
      method: "get",
      params,
    });
  },
  mchInfoPayProductSave(data) {
    return request({
      url: "/mchInfo/payProduct/save",
      method: "post",
      data,
    });
  },
  mchInfoAuditDetail(params) {
    return request({
      url: "/mchInfo/audit/detail",
      method: "get",
      params,
    });
  },
};
