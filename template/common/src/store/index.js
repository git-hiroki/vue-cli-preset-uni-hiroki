import Vue from "vue";
import Vuex from "vuex";

import navbar from "@/store/modules/navbar";

Vue.use(Vuex);

/**
 * 🚨 新增 store 后, 请务必前往 @/store/manifest 处同步更新配置
*/

const store = new Vuex.Store({
  state: {
    version: "1.0.0"
  },
  modules: {
    navbar
  },
  getters: {},
  // 同步修改
  mutations: {
    inject(state, payload){
      uni.$utils.reactive(state, {
        ... state,
        ... payload
      });
    }
  },
  // 异步修改, 用于提交mutation
  actions: {}
});

export default store;