import Vuex from "vuex";

export const archive = JSON.parse(
  JSON.stringify({
    value: false,
    from: "bottom",
    radius: 10,
    width: "60vw",
    height: "50vh",
    title: "",
    showBack: false,
    showClose: true,
    maskClosable: true,
    onOpen: null,
    onClose: null,
    onScroll: null,
    onTouch: null,
    onChange: null,
    onBack: null,
    hideTabBar: false,
    id: null,
    class: []
  })
);

// eslint-disable-next-line max-lines-per-function
export default v => {
  v.prototype.popupStore = new Vuex.Store({
    state: {
      // 弹窗显示可通过v-model控制
      value: false,
      // 弹窗打开开始方向
      from: "bottom",
      // 内容区边缘圆角大小
      radius: 10,
      // 弹窗内容宽度(当from=left或right时起作用)
      width: "60vw",
      // 弹窗内容高度(当from=top或bottom时起作用)
      height: "50vh",
      // 弹窗标题
      title: "",
      // 显示左侧(返回)按钮, 如果v-slot:back存在时, 也会显示此按钮
      showBack: false,
      // 显示关闭按钮, 如果是字符串, 将作为uView(需另外引入) 的 u-icon 组件的 name
      // 如 showClose == "close", 会显示 close 图标
      showClose: false,
      // 是否可点击模态背景关闭弹窗
      maskClosable: true,
      onOpen: null,
      onClose: null,
      onScroll: null,
      onTouch: null,
      onChange: null,
      onBack: null,
      hideTabBar: false,
      id: null,
      class: []
    },
    mutations: {
      close(state){
        if(state.hideTabBar){
          uni.showTabBar();
        }
        state.value = false;
      },
      open(state, payload){
        v.prototype.popupStore.commit("reset");
        uni.$utils.reactive(state, {
          ... archive,
          ... payload,
          value: true
        });
      },
      reset(state){
        const { height, ... rest } = archive;
        if(state.close instanceof Function){
          state.close(state);
        }
        uni.$set(state, "value", false);
        state = rest;
      }
    },
    getters: {
      classList: state => [
        ... state.class,
        "uni-popup"
      ]
    }
  });
  v.prototype.resetPopup = () => {
    v.prototype.popupStore.commit("reset");
  };
  v.prototype.showPopup = option => {
    if("object" == typeof option){
      if(option.hideTabBar){
        uni.hideTabBar();
      }
      v.prototype.popupStore.commit("open", option);
    }
    else {
      throw new Error(`配置项必须为对象, 目前为 ${typeof option}`);
    }
  };
};