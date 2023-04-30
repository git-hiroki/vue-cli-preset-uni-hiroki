<script>
// APP 和 小程序平台
// #ifdef  APP-PLUS || MP-WEIXIN
import TIMWxSDK from "tim-wx-sdk";
import COS from "cos-wx-sdk-v5";
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";
// #endif
// #ifdef H5
import TIMJsSDK from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";
logger.error(" TUIKit 暂不支持 H5 / web ，请使用者自己完成兼容哦，页面刷新可能会导致报错，需要重新登录 ");
// #endif

import logger from "@/utils/logger"; // app.js
import { SDKAppID } from "@/configs";

const TIM = "undefined" == typeof TIMJsSDK ? TIMWxSDK : TIMJsSDK;

// #ifdef APP-PLUS

// eslint-disable-next-line
const TUICallKit = uni.requireNativePlugin("TencentCloud-TUICallKit");
logger.log(`| app |  TencentCloud-TUICallKit | TUICalling: ${TUICallKit}`);
if("undefined" == typeof TUICallKit){
  logger.error("如果需要音视频功能，请集成原生插件，使用真机运行并且自定义基座调试哦～ 插件地址：https://ext.dcloud.net.cn/plugin?id=9035 , 调试地址：https://nativesupport.dcloud.net.cn/NativePlugin/use/use");
}
// #endif

export default {
  onLaunch(){
    uni.$app = this;
    uni.$systemInfo = uni.getSystemInfoSync();
    uni.$statusBarHeight = uni?.$systemInfo?.statusBarHeight;

    // #ifdef APP-PLUS
    /* 5+环境锁定屏幕方向 */
    plus.screen.lockOrientation("portrait-primary");

    /* 5+环境升级提示 */
    // app检测更新
    const platform = plus.os.name.toLocaleLowerCase();
    // eslint-disable-next-line no-empty-function
    plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
    });

    // #endif

    // #ifdef MP-WEIXIN
    // eslint-disable-next-line no-empty
    if(wx.canIUse("getUpdateManager")){}
    // #endif

    // 以下为集成腾讯云TIM所需代码
    uni.setStorageSync(`TIM_${SDKAppID}_isTUIKit`, true);
    // 重点注意： 为了 uni-app 更好地接入使用 tim，快速定位和解决问题，请勿修改 uni.$TUIKit 命名。
    // 如果您已经接入 tim ，请将 uni.tim 修改为 uni.$TUIKit。
    uni.$TUIKit = TIM.create({
      SDKAppID
    });
    // #ifndef H5
    uni.$TUIKit.registerPlugin({
      "cos-wx-sdk": COS,
      "tim-profanity-filter-plugin": TIMProfanityFilterPlugin
    });
    // #endif
    // #ifdef H5
    uni.$TUIKit.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
    // #endif
    // 将原生插件挂载在 uni 上
    // #ifdef APP-PLUS
    uni.$TUICallKit = TUICallKit;
    // #endif
    // 如果您已创建了 tim，请将 tim 实例挂载在 wx 上，且不可以修改 wx.$TIM（修改变量可能导致 TUICallKit 组件无法正常使用）, 完成 TUICallKit 初始化，
    // 如果您没有创建，可以不传
    // #ifdef MP-WEIXIN
    wx.$TIM = uni.$TUIKit;
    // #endif
    uni.$TUIKitTIM = TIM;
    uni.$TUIKitEvent = TIM.EVENT;
    uni.$TUIKitVersion = TIM.VERSION;
    uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件
    uni.$resetLoginData = this.resetLoginData();
    uni.$TUIKit.on(uni.$TUIKitEvent.SDK_READY, this.onSDKReady);
    uni.$TUIKit.on(uni.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady);
    uni.$TUIKit.on(uni.$TUIKitEvent.KICKED_OUT, this.onKickedOut);
    uni.$TUIKit.on(uni.$TUIKitEvent.ERROR, this.onTIMError);
    uni.$TUIKit.on(uni.$TUIKitEvent.NET_STATE_CHANGE, this.onNetStateChange);
    uni.$TUIKit.on(uni.$TUIKitEvent.SDK_RELOAD, this.onSDKReload);
    // 以上为集成腾讯云TIM所需代码
  },
  onHide(){
    // console.log("App Hide")
  },
  onError(err){
    if("devtools" == uni?.$systemInfo?.platform){
      uni.showToast({
        icon: "none",
        title: `${err}`
      });
    }
    // 全局错误监听
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
      const res = uni.getSystemInfoSync(),
        errMsg = `手机品牌:${res.brand}; 手机型号:${res.model}; 操作系统版本:${res.system}; 客户端平台:${res.platform}; 错误描述:${err}`;
      /* eslint-disable no-console */
      console.log(`发生错误:${errMsg}`);
    });
    // #endif
  },
  onUnload(){
    this.clearTimer();
  },
  onSaveExitState(){
    // 页面销毁前保留状态
  },
  methods: {
    // TODO:
    resetLoginData(){
      this.globalData.expiresIn = "";
      this.globalData.sessionID = "";
      this.globalData.userInfo = {
        userID: "",
        userSig: "",
        token: "",
        phone: ""
      };
      this.globalData.userProfile = null;
      logger.log(`| app |  resetLoginData | globalData: ${this.globalData}`);
    },
    // eslint-disable-next-line no-empty-function
    onTIMError(){},
    onSDKReady({ name }){
      const isSDKReady = name === uni.$TUIKitEvent.SDK_READY;
      uni.$emit("isSDKReady", {
        isSDKReady: true
      });
      this.globalData.isSDKReady = true;
      console.warn("SDK Ready");
    },
    // eslint-disable-next-line no-empty-function
    onNetStateChange(){},
    // eslint-disable-next-line no-empty-function
    onSDKReload(){},
    // eslint-disable-next-line no-empty-function
    onSdkNotReady(){},
    onKickedOut(){
      uni.showToast({
        title: "您被踢下线",
        icon: "error"
      });
      uni.navigateTo({
        url: "/tim-pages/login/login"
      });
    }
  },
  globalData: {
    query: {},
    isSDKReady: false
  }
};
</script>

<style>
/* #ifndef APP-NVUE */
@import "@/components/uni/uParse/src/wxParse.css";
/* #endif */
page {
  --safe-area-inset-top: 0;
  --safe-area-inset-right: 0;
  --safe-area-inset-bottom: 0;
  --safe-area-inset-left: 0;
}

@supports (top: constant(safe-area-inset-top)) {
  page {
    --safe-area-inset-top: constant(safe-area-inset-top);
    --safe-area-inset-right: constant(safe-area-inset-right);
    --safe-area-inset-bottom: constant(safe-area-inset-bottom);
    --safe-area-inset-left: constant(safe-area-inset-left);
  }
}

@supports (top: env(safe-area-inset-top)) {
  page {
    --safe-area-inset-top: env(safe-area-inset-top);
    --safe-area-inset-right: env(safe-area-inset-right);
    --safe-area-inset-bottom: env(safe-area-inset-bottom);
    --safe-area-inset-left: env(safe-area-inset-left);
  }
}
</style>
<style lang="less">
@import "@/static/common";
</style>