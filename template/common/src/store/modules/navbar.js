export const navbar = {
  back: true,
  title: false,
  reload: false,
  show: true
};

export const archive = JSON.parse(
  JSON.stringify(navbar)
);

export default {
  namespaced: true,
  state: navbar,
  getters: {},
  mutations: {
    SET_NAVBAR(state, payload){
      /*
        🚨
        该方法负责设置navbar, 一般放在页面组件的onLoad生命周期中,
        但也有例外, 如果当前页作为一个 tabbar 页面, 则改放入onShow内,
        否则页面缓存后将不走onLoad钩子, 致使navbar不再被更新
      */
      uni.$utils.reactive(state, {
        ... state,
        ... payload
      });
    }
  },
  actions: {
    reset({ commit }){
      commit("SET_NAVBAR", archive);
    }
  }
};