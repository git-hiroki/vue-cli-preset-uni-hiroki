export const login = {
  token: ""
};

export const archive = JSON.parse(
  JSON.stringify(login)
);

export default {
  namespaced: true,
  state: login,
  getters: {},
  mutations: {
    SET_USER(state, payload){
      uni.$utils.reactive(state, {
        ... state,
        ... payload
      });
    }
  },
  actions: {
    reset({ commit }){
      commit("SET_USER", archive);
    }
  }
};