<template>
  <uni-popup ref="popup" 
    :mask-click="maskClosable"
    @change="handleChange"
    :type="from"
    :class="[
      'hqs-popup',
      popupId ? `uni-popup-${popupId}` : ''
    ]"
    :class-list="classList"
  >
    <view :class="classList" 
      :style="conStyle" 
      @mousedown="handleTouch" @mousemove="handleTouch" @mouseup="handleTouch"
      @touchstart="handleTouch" @touchmove="handleTouch" @touchend="handleTouch">
      <block v-if="isVertical">
        <view class="qs-header" v-if="from == 'bottom' && showHeader">
          <view class="qs-side" :class="{'hidden': !showBack && !$slots.back}"
            @click="handleBack">
            <slot name="back">
              <text>返回</text>
            </slot>
          </view>
          <slot name="title">
            <text class="qs-title" v-if="title">{{title}}</text>
          </slot>
          <view class="qs-side ta-r" :class="{'hidden': !showClose}"
            @click="close">
            <slot name="close">
              <text v-if="closeText">{{closeText || "关闭"}}</text>
              <image v-else class="icon-close" src="~@/static/images/popup/icon-close.png"  />
            </slot>
          </view>
        </view>
        <slot name="sub-header"></slot>
        <scroll-view scroll-y :style="{ height }"
          @scroll="handleScroll">
          <view>
            <slot></slot>
          </view>
        </scroll-view>
        <slot name="bottom"></slot>
      </block>
      <block v-else-if="!isVertical">
        <scroll-view scroll-y class="qs-h-scroll" :style="{ width }">
          <slot></slot>
        </scroll-view>
      </block>
    </view>
  </uni-popup>
</template>

<script>
import UniPopup from "@/components/popup/uni-popup";

export default {
  components: {
    UniPopup,
  },
  data() {
    return {
      scrollTop: 0,
      panStyle: "",
      showPopup: false
    };
  },
  computed: {
    classList(){
      return ["qs-con"].concat(this.popupStore.state.class?.map(
        item => `uni-popup-${item}-content`
      ));
    },
    popupId(){
      return this.popupStore.state.id;
    },
    value(){
      return this.popupStore.state.value;
    },
    from(){
      return this.popupStore.state.from;
    },
    radius(){
      return this.popupStore.state.radius;
    },
    width(){
      return this.popupStore.state.width;
    },
    height(){
      return this.popupStore.state.height;
    },
    title(){
      return this.popupStore.state.title;
    },
    showBack(){
      return this.popupStore.state.showBack;
    },
    showClose(){
      return this.popupStore.state.showClose;
    },
    showHeader(){
      return this.title || this.showBack || this.showClose;
    },
    maskClosable(){
      return this.popupStore.state.maskClosable;
    },
    onOpen(){
      return this.popupStore.state.onOpen;
    },
    onClose(){
      return this.popupStore.state.onClose;
    },
    onScroll(){
      return this.popupStore.state.onScroll;
    },
    onTouch(){
      return this.popupStore.state.onOpen;
    },
    onChange(){
      return this.popupStore.state.onClose;
    },
    onBack(){
      return this.popupStore.state.onScroll;
    },
    closeText() {
      if(typeof this.showClose == "string") return "关闭";
      return false;
    },
    isVertical() {
      return ["bottom", "top"].includes(this.from);
    },
    conStyle() {
      let style = this.panStyle || "",
        r = this.radius;
      if(r > 0) {
        r += "px";
        if(this.from == "bottom") r = [r, r, 0, 0];
        else if(this.from == "left") r = [0, r, r, 0];
        else if(this.from == "right") r = [r, 0, 0, r];
        else r = [0, 0, r, r];
        style += `border-radius: ${r.join(" ")};`;
      }
      return style;
    },
  },
  watch: {
    value(val) {
      if(val == this.showPopup) return;
      if(val) this.open();
      else this.close();
    },
    showPopup(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    if(this.value) this.open();
  },
  methods: {
    handleScroll(e) {
      this.scrollTop = e.detail.scrollTop;
      if(this.onScroll instanceof Function){
        this.onScroll(e);
      }
    },
    handleTouch(ev) {
      // if(!this.maskClosable) return
      const { pageX, pageY } = ev.changedTouches[0] || ev;
      if(["touchstart", "mousedown"].includes(ev.type)) {
        this.startX = pageX;
        this.startY = pageY;
        this.startTime = ev.timeStamp;
      } else {
        if(!this.startTime) return;
        const orien = this.isVertical ? "Y" : "X";
        let moveDis = pageY - this.startY;
        if(this.from == "left") moveDis = this.startX - pageX;
        else if(this.from == "right") moveDis = pageX - this.startX;
        else if(this.from == "top") moveDis = -moveDis;
        if(!this.maskClosable) moveDis /= 3;
        const duration = (ev.timeStamp - this.startTime),
          speed = moveDis/duration;
        if(["touchend", "mouseup"].includes(ev.type)) {
          if(this.panStyle) {
            if(this.maskClosable && (moveDis > 120 || speed > 0.25)) {
              this.close();
            }
            else {
              this.panStyle = `transform: translate${orien}(0); transition: all ease 200ms;`;
            }
            setTimeout(() => {
              this.panStyle = "";
            }, 300);
          }
          // conScrollTop = 0
          this.startTime = 0;
          return;
        }
        // if(this.scrollTop > 0) return
        
        if(moveDis > 0) {
          if(this.from == "left" || this.from == "top") moveDis *= -1;
          this.panStyle = `transform: translate${orien}(${moveDis}px); transition: none;`;
        }
      }
      if(this.onTouch instanceof Function){
        this.onTouch(ev);
      }
    },
    handleChange({ show }) {
      this.showPopup = show;
      if(this.onChange instanceof Function){
        this.onChange({
          show
        });
      }
    },
    open() {
      this.$refs.popup.open();
      this.showPopup = true;
      if(this.onOpen instanceof Function){
        this.onOpen();
      }
    },
    close() {
      this.popupStore.commit("close");
      this.$refs.popup.close();
      this.showPopup = false;
      if(this.onClose instanceof Function){
        this.onClose();
      }
    },
    handleBack() {
      this.$emit("back");
      if(this.onBack instanceof Function){
        this.onBack();
      }
    },
  }
};
</script>
<style lang="less">
.hqs-popup {
  .qs-con {
    background: #fff;
  }
  .qs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .qs-title {
    font-size: 28rpx;
    line-height: 40rpx;
    color: #444747;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .hidden { visibility: hidden; }
  .qs-side {
    min-width: 120rpx;
    padding: 30rpx 40rpx;
    color: #888;
    flex-shrink: 0;
    &:active { opacity: .8; }
    .icon-close {
      border-radius: 32rpx;
      width: 48rpx;
      height: 48rpx;
    }
  }
  .qs-h-scroll {
    height: 100vh;
    // #ifdef H5
    margin-top: 88rpx;
    height: ~"calc(100vh - 88rpx)";
    // #endif
  }
  .ta-r { text-align: right; }
}
</style>