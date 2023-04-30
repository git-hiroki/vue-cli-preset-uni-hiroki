import App from "@/App";
import store from "@/store";
import http from "@/utils/http-request";
import { RouterMount, router } from "@/utils/router";
import utils from "@/utils";
import go from "@/utils/go";
import initModal from "@/store/modules/modal";
import initPopup from "@/store/modules/popup";

import Modal from "@/components/modal";
import Popup from "@/components/popup";

import Tabs from "@/components/tabs";
import Category from "@/components/category";
import List from "@/components/list";
import PageLayout from "@/components/page-layout";
import UniIcons from "@/components/uni-icons";
import "@/uni.promisify.adaptor";
<%_ if (options.TUIKit) { _%>
import Mixin from "@/polyfill/mixins";
<%_ } _%>
// #ifdef H5
window.QQmap = null;
// #endif

import Vue from "vue";

Vue.use(router);
<%_ if (options.TUIKit) { _%>
Vue.mixin(Mixin);
<%_ } _%>
initModal(Vue);
initPopup(Vue);
Vue.component("Modal", Modal);
Vue.component("Popup", Popup);
Vue.component("Tabs", Tabs);
Vue.component("Category", Category);
Vue.component("List", List);
Vue.component("PageLayout", PageLayout);
Vue.component("UniIcons", UniIcons);
Vue.config.productionTip = false;
Vue.prototype.$store = store;
uni.$go = go;
uni.$http = http;
uni.$router = router;
uni.$set = Vue.set;
uni.$utils = utils;
uni.$designWidth = 750;
uni.$px2upx = px => px / uni?.$systemInfo?.screenWidth * uni.$designWidth;
uni.$upx2px = uni.upx2px;
App.mpType = "app";

const app = new Vue({
  store,
  ... App
});
app.$mount();