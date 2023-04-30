import Vue from "vue";
import {
  RouterMount, createRouter
} from "uni-simple-router";
import store from "@/store";

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [... ROUTES],
  routerErrorEach: (err, router) => {
    router.$lockStatus = false;
    if(3 === err.type){
      return uni.$go.toTab("pages/home/index");
    }
  }
});

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  const { reload } = store?.state?.navbar;
  if(
    [
      from?.fullPath != to?.fullPath,
      reload
    ].every(item => !!item)
  ){
    store.dispatch("navbar/reset");
  }
  else {
    store.commit("navbar/SET_NAVBAR", {
      reload: true
    });
  }

  // 页面跳转时关闭全局弹窗
  Vue.prototype.modalStore.commit("close");
  Vue.prototype.popupStore.commit("close");

  return next();
});

// 全局路由后置守卫
router.afterEach((to, from) => {
  // 跳转结束
});

export {
  router,
  RouterMount
};