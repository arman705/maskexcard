import request from "@/plugins/request";
export default {
  payTypeList(params) {
    return request({
      url: "/mgr/pay_type/list",
      method: "get",
      params,
    });
  },
  payTypeAdd(data) {
    return request({
      url: "/mgr/pay_type/add",
      method: "post",
      data,
    });
  },
  payTypeUpdate(data) {
    return request({
      url: "/mgr/pay_type/update",
      method: "post",
      data,
    });
  },
  payApiTypeList(params) {
    return request({
      url: "/mgr/pay_api_type/list",
      method: "get",
      params,
    });
  },
  payApiTypeAdd(data) {
    return request({
      url: "/mgr/pay_api_type/add",
      method: "post",
      data,
    });
  },
  payApiTypeUpdate(data) {
    return request({
      url: "/mgr/pay_api_type/update",
      method: "post",
      data,
    });
  },
  payApiList(params) {
    return request({
      url: "/mgr/pay_api/list",
      method: "get",
      params,
    });
  },
  payApiAdd(data) {
    return request({
      url: "/mgr/pay_api/add",
      method: "post",
      data,
    });
  },
  payApiUpdate(data) {
    return request({
      url: "/mgr/pay_api/update",
      method: "post",
      data,
    });
  },
  payChannelList(params) {
    return request({
      url: "/mgr/pay_channel/list",
      method: "get",
      params,
    });
  },
  payChannelAdd(data) {
    return request({
      url: "/mgr/pay_channel/add",
      method: "post",
      data,
    });
  },
  payChannelUpdate(data) {
    return request({
      url: "/mgr/pay_channel/update",
      method: "post",
      data,
    });
  },
  payChannelSettingFee(data) {
    return request({
      url: "/mgr/pay_channel/setting/fee",
      method: "post",
      data,
    });
  },
  payChannelSettingRisk(data) {
    return request({
      url: "/mgr/pay_channel/setting/risk",
      method: "post",
      data,
    });
  },
  payProductList(params) {
    return request({
      url: "/mgr/pay_product/list",
      method: "get",
      params,
    });
  },
  payProductAdd(data) {
    return request({
      url: "/mgr/pay_product/add",
      method: "post",
      data,
    });
  },
  payProductDetail(id) {
    return request({
      url: `/mgr/pay_product/detail/${id}`,
      method: "get",
      params: { productId: id },
    });
  },
  payProductUpdate(data) {
    return request({
      url: "/mgr/pay_product/update",
      method: "post",
      data,
    });
  },
  cardBinList(params) {
    return request({
      url: "/mgr/card_bin/list",
      method: "get",
      params,
    });
  },
  cardBinAdd(data) {
    return request({
      url: "/mgr/card_bin/add",
      method: "post",
      data,
    });
  },
  cardBinUpdate(data) {
    return request({
      url: "/mgr/card_bin/update",
      method: "post",
      data,
    });
  },
  cardBinImport(data) {
    const fd = new FormData();
    Object.keys(data).forEach((key) => {
      fd.append(key, data[key]);
    });
    return request({
      url: "/mgr/card_bin/import",
      method: "post",
      data: fd,
    });
  },
};
