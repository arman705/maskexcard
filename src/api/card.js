import request from "@/plugins/request";
import blob from "@/plugins/blob";
//卡片列表
const cardList = (data) => {
  return request({
    url: "/card",
    params: data,
  });
};
//卡片记录导出
const cardExport = (data) => {
  return blob({
    url: "/card/export",
    responseType: "blob",
    params: data,
  });
};
//卡片记录导出
const taskExport = (data) => {
  return blob({
    url: "/card/task/export",
    responseType: "blob",
    params: data,
  });
};
const cardOpreate = (a1, a2) => {
  return request({
    url: "/card/lock/" + a1 + "/" + a2,
    method: "post",
  });
};
const cardUnlock = (a1) => {
  return request({
    url: "/card/unlock/" + a1,
    method: "post",
  });
};
//卡片任务列表
const cardTaskList = (data) => {
  return request({
    url: "/card/task/cardList",
    params: data,
  });
};
//充值任务详情
const rechargeDetail = (ccrId) => {
  return request({
    url: "/card/recharge/" + ccrId,
  });
};
//卡片列表
const getAddress = (data) => {
  return request({
    url: "/card/getAddress",
    method: "post",
    data: data,
  });
};
//卡充值
const payCard = (data) => {
  return request({
    url: "/card/cardPay",
    method: "post",
    data: data,
  });
};
//卡片字典列表
const carddictList = (data) => {
  return request({
    url: "/card/dict",
    params: data,
  });
};
//获取字典对账单
const getbillDict = (data) => {
  return request({
    url: "/card/statement/dict",
    params: data,
  });
};
//卡片充值字典列表
const cardrechargeDict = (data) => {
  return request({
    url: "/card/recharge/dict",
    params: data,
  });
};
//获得充值记录
const getRecharge = (data) => {
  return request({
    url: "/card/recharge",
    params: data,
  });
};
//我的对账单列表
const getStatement = (data) => {
  return request({
    url: "/card/statement",
    params: data,
  });
};
//我的对账单列表
const exportStatement = (data) => {
  return request({
    url: "/card/statement/export",
    params: data,
  });
};
//卡片列表
const cardtaskList = (data) => {
  return request({
    url: "/card/task",
    params: data,
  });
};
//卡片列表
const cardInfo = (data) => {
  return request({
    url: "/card/info",
    params: data,
  });
};
//卡任务详情
const taskDetail = (data) => {
  return request({
    url: "/card/" + data,
  });
};
//新建卡片
const newCard = (data) => {
  return request({
    url: "/card",
    method: "post",
    data,
  });
};
//操作卡片
const opreate = (data) => {
  return request({
    url: "/card/task/operate",
    method: "post",
    data,
  });
};
//新建卡片
const newCardTask = (data) => {
  return request({
    url: "/card/task/add",
    method: "post",
    data,
  });
};
//新建卡片
const createCard = (data) => {
  return request({
    url: "/card/create",
    method: "post",
    data,
  });
};
const cardDetail = (data) => {
  return request({
    url: "/card/" + data,
    data,
  });
};
const updateCard = (data) => {
  return request({
    url: "/card/" + data,
    method: "put",
    data,
  });
};
const deleteCard = (data) => {
  return request({
    url: "/card/" + data,
    method: "delete",
    data,
  });
};
const userHttp = {
  opreate,
  cardList,
  deleteCard,
  updateCard,
  cardDetail,
  newCard,
  carddictList,
  cardtaskList,
  newCardTask,
  getRecharge,
  getAddress,
  taskDetail,
  cardInfo,
  cardUnlock,
  cardrechargeDict,
  cardOpreate,
  cardExport,
  taskExport,
  getStatement,
  exportStatement,
  cardTaskList,
  getbillDict,
  payCard,
  rechargeDetail,
  createCard,
};
export default userHttp;
