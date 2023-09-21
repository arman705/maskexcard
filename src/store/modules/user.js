// 用户模块共享数据管理
import auth from "@/plugins/auth";
import apiUser from "@/api/user";
export default {
  namespaced: true,
  // 状态
  state() {
    return {
      user: {},
      // 令牌  初始化从本地获取
      token: auth.getToken(),
      permission: [],
      menuTree: [],
    };
  },
  // 修改
  mutations: {
    setToken(state, { user, token }) {
      // 1. 修改vuex的数据
      state.token = token;
      state.user = user;
      // 2. 同步修改本地
      auth.setToken(token);
    },
    loginOut(state) {
      // 1. 修改vuex的数据
      state.token = "";
      state.user = {};
      state.permission = [];
      // 2. 同步修改本地
      auth.clearToken();
    },
    SET_PERMISSION: (state, data) => {
      state.permission = data;
    },
    SET_MENUTREE: (state, data) => {
      state.menuTree = data;
    },
  },
  actions: {
    async getInfo({ commit }) {
      const result = await apiUser.userInfo();
      const [error, res] = result;
      if (!error) {
        commit("setToken", {
          user: res.data,
          token: auth.getToken(),
        });
      }
      return JSON.parse(JSON.stringify(result));
    },
    async getUserPermission({ commit }) {
      const [error, res] = await apiUser.getPermissionList();
      if (error) return;
      commit("SET_PERMISSION", res.data);
    },
    async getPermissionTree({ commit }) {
      const [error, res] = await apiUser.getPermissionTree();
      if (error) return;
      commit("SET_MENUTREE", res.data);
    },
  },
  getters: {
    permissionAll(state) {
      return new Set(state.permission.map((v) => v.accreditName));
    },
    paramsKey() {
      return [
        "delete", //删除
        "frozen", //冻结
        "unfroze", //解冻
        "load", //充值
        "signout", //注销
        "query", //查看
        "check", //审核
        "add", // 添加
        "update", //修改
        "assignPerm", //分配权限(角色)
        "change", //更换
        "querySettlementType", //结算设置
        "payProductList", //支付通道
        "amountUpdate", //余额变更
        "audit", //审核
        "payChannelSettingFee", //费率调整
        "payChannelSettingRisk", //风控调整
        "import", //导入
        "download", //下载
      ];
    },
  },
};
