import Vuex from "vuex";

export const archive = JSON.parse(
  JSON.stringify({
    value: false,
    content: "请输入弹窗内容",
    cancelText: "",
    confirmText: "确定",
    hideTabBar: false,
    title: "",
    maskClosable: true,
    onOk: null,
    onCancel: null,
    onClose: null
  })
);

// eslint-disable-next-line max-lines-per-function
export default v => {
  v.prototype.modalStore = new Vuex.Store({
    state: {
      value: false,
      content: "请输入弹窗内容",
      cancelText: "",
      confirmText: "确定",
      hideTabBar: false,
      title: "",
      maskClosable: true,
      onOk: null,
      onCancel: null,
      onClose: null
    },
    mutations: {
      confirmText(state, payload){
        state.confirmText = payload;
      },
      close(state){
        if(state.hideTabBar){
          uni.showTabBar();
        }
        state.value = false;
      },
      open(state, payload){
        v.prototype.modalStore.commit("reset");
        uni.$utils.reactive(state, {
          ... archive,
          ... payload,
          value: true
        });
      },
      cancel(state){
        const cb = state.onCancel,
          closeFn = state.onClose;
        state.value = false;
        if(cb instanceof Function){
          cb(state);
        }
        if(closeFn instanceof Function){
          closeFn(state);
        }
      },
      confirm(state){
        const cb = state.onOk,
          closeFn = state.onClose;
        state.value = false;
        if(cb instanceof Function){
          cb(state);
        }
        if(closeFn instanceof Function){
          closeFn(state);
        }
      },
      reset(state){
        if(state.close instanceof Function){
          state.close(state);
        }
        state = archive;
      }
    }
  });
  v.prototype.resetModal = () => {
    v.prototype.modalStore.commit("reset");
  };
  v.prototype.showModal = option => {
    if("object" == typeof option){
      if(option.hideTabBar){
        uni.hideTabBar();
      }
      v.prototype.modalStore.commit("open", option);
    }
    else {
      throw new Error(`配置项必须为对象, 目前为 ${typeof option}`);
    }
  };
  v.prototype.updateConfirmText = option => {
    v.prototype.modalStore.commit("confirmText", option);
  };
};