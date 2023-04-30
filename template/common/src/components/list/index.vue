<template>
  <scroll-view
    class="list-scroll-view"
    :scroll-y="!disabled"
    @scroll="onScroll"
    :scroll-top="scrollTopValue"
    @scrolltolower="request"
    :scroll-with-animation="false"
    :scroll-anchoring="true"
    :enhanced="true"
    :bounces="false"
    :show-scrollbar="false"
    :refresher-enabled="refresherEnabled"
    :refresher-triggered="triggered"
    @refresherpulling="handleRefresherPulling"
    @refresherrefresh="handleRefresherRefresh"
  >
    <no-data v-if="dataless" />
    <block v-else>
      <slot />
      <view class="tip">
        <template v-if="hasMore">
          {{loadingTip}}
        </template>
        <template v-else>
          {{noMoreTip}}
        </template>
      </view>
    </block>
  </scroll-view>
</template>

<script>
/**
* @author 🌳·𝒉𝒊𝒓𝒐𝒌𝒊 <hiroki@email.com>
* @desc yedsn-list_1.1.2
* @see https://ext.dcloud.net.cn/plugin?id=1685
*/
import http from "@/utils/http-request";
import mixins from "@/mixins/components";
export default {
  mixins: [mixins],
  computed: {
    enableGoTop(){
      const { scrollTopValueOld } = this;
      return this?.goTop && scrollTopValueOld > 260;
    },
    dataless(){
      const { respond, list } = this;
      return respond && !list.length;
    }
  },
  props: {
    goTop: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    refresherEnabled: {
      type: Boolean,
      default: true
    },
    noMoreTip: {
      type: String,
      default: "我是有底线的"
    },
    // 正在加载提示
    loadingTip: {
      type: String,
      default: "加载中…"
    },
    // 数据格式转换器
    converter: {
      type: Function
    }
  },
  data(){
    return {
      list: [],
      hasMore: true,
      loadingMore: false,
      pageNum: 1,
      pageSize: 0,
      scrollTopValue: 0,
      scrollTopValueOld: 0,
      options: {},
      triggered: false,
      respond: false
    };
  },
  methods: {
    handleRefresherPulling(e){
      this.triggered = true;
      this.$emit("refresherpulling", e);
    },
    handleRefresherRefresh(e){
      this.init(this.options);
      setTimeout(
        () => {
          this.triggered = false;
        },
        500
      );
      this.$emit("refresherrefresh", e);
    },

    /**
     * 刷新
     * @param {Object} options 初始化参数
     * @param {Boolean} reset 列表是否重置
     */
    init(options, reset = true){
      this.options = options;
      if(reset){
        this.pageNum = 1;
        this.pageSize = 0;
        this.list = [];
        this.hasMore = true;
        this.loadingMore = false;
      }
      this.request();
    },
    /**
     * 获取数据
     * url: options配置中的url值
     * params: options中的params内容 + 当前页码 + 每页内容数
     * @returns {Promise} 数据
     */
    getData({ url, mute, params }){
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const
          { converter } = this,
          data = await http.request({
            url,
            mute,
            params: {
              ... params,
              pageSize: this.pageSize,
              pageNum: this.pageNum
            }
          });
        let result = [];
        /*
          //🚨 模拟分页数据
          if("taFavorites/page"== url){
            data = mock([null, null]);
          }
        */
        if(converter instanceof Function){
          result = converter.bind(this.$parent)(data);
        }
        else {
          result = data;
        }
        resolve(result);
      });
    },

    /**
     * 请求过程
     */
    request(){
      const { hasMore, loadingMore } = this;
      if(hasMore && !loadingMore){
        this.loadingMore = true;
        // 处理参数
        let { url, params, mute } = this.options;
        params = typeof params instanceof Function ? params() : params; // 如果params是个方法, 则调用方法获取值
        // 更新页数
        this.pageNum = params.pageNum || this.pageNum;
        // 判断是否第一页, 如果第一页, 自动归顶
        if(1 == this.pageNum){
          this.scrollTop();
        }
        this.getData({
          url,
          mute,
          params: {
            ... params,
            pageSize: this.pageSize
          }
        }).then(data => {
          this.respond = data?.$respond;
          const { records, pages } = data,
            list = records;
          this.list = this.list.concat(list); // 合并列表内容
          // 判断列表是否更多
          if(0 == list.length || parseInt(this.pi) + 1 > pages){
            this.hasMore = false;
          }
          else {
            this.pageNum++;
          }
          this.$emit("success", this.list);
          this.loadingMore = false;
        }).catch(e => {
          this.loadingMore = false;
          this.hasMore = false;
        });
      }
    },
    /**
     * 滚动事件
     * @param {Event} e ScrollEvent
     */
    onScroll(e){
      this.scrollTopValueOld = e.detail.scrollTop;
      this.$emit("scroll", e);
    },
    /**
     * 滚动到顶部
     */
    scrollTop(){
      this.scrollTopValue = this.scrollTopValueOld;
      this.scrollTopValueOld = 0;
      this.$nextTick(() => {
        this.scrollTopValueOld = 0;
        this.scrollTopValue = 0;
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .list-scroll-view {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }
  .tip {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
    font-size: 28rpx;
    padding-bottom: 60rpx;
  }
</style>