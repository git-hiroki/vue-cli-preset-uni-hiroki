<script>
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
  methods: {},
  globalData: {
    query: {}
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