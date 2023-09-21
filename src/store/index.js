import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topBarTitle: "我的卡片",
    topMsgState: false,
  },
  getters: {},
  mutations: {
    CHANGE_PAGE_TITLE(state, v) {
      state.topBarTitle = v;
    },
    CHANGE_TOP_BAR_MSG(state, v) {
      state.topMsgState = v;
    },
  },
  actions: {},
  modules: { user },
});
