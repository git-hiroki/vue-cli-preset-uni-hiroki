import store from "@/store";
import manifest from "@/store/manifest";

/**
  🚨警告: 请确保各 Mixins 间命名无冲突
*/
import COMPONENTS_MIXINS from "@/mixins/components";
import LIST_MIXINS from "@/mixins/list";
<%_ if (options.TUIKit) { _%>
import TIM_MIXINS from "@/mixins/tim";
<%_ } _%>
<%_ if (options.aMap) { _%>
import LOCATION_MIXINS from "@/mixins/geo-location";
<%_ } _%>
export default {
  computed: {
    statusBarHeight(){
      return uni.$px2upx(uni.$statusBarHeight);
    }
  },
  data(){
    return {
      result: {},
      __query: {},
      ... COMPONENTS_MIXINS.data(),
      ... LIST_MIXINS.data()
    };
  },
  onLoad(query){
    const path = this?.$root?.$Router?.currentRoute?.path;
    this.__query = query;
    this.path = path;
  },
  onShow(){
    const path = this?.path;
    if(manifest?.[path]){
      // 合并默认配置与清单文件中的页面配置
      Object.keys(manifest?.["*"]).forEach(key => {
        this.result[path] = this.result?.[path] || {};
        const initState = manifest?.["*"]?.[key],
          { recovery } = initState,
          oldState = this.result?.[path]?.[key];
        this.$set(this?.result[path], key, {
          ... oldState && recovery ? oldState : initState,
          ... manifest?.[path]?.[key] || {}
        });
      });
      // 将合并后的配置注入页面
      store.commit("inject", this.result[path]);
    }
  },
  methods: {
    ... COMPONENTS_MIXINS.methods,
    ... LIST_MIXINS.methods,
<%_ if (options.TUIKit) { _%>
    ... TIM_MIXINS.methods,
<%_ } _%>
<%_ if (options.aMap) { _%>
    ... LOCATION_MIXINS.methods,
<%_ } _%>
    query(){
      const { query } = getApp().globalData,
        { __query } = this;
      if(Object.keys(__query ?? {}).length){
        return __query;
      }
      else {
        return query;
      }
    },
    handleBack(){
      uni.$go.refreshBack();
    }
  }
};