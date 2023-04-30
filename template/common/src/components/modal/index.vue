<template>
  <view
    class="modal-container"
    :class="{show: showValue}"
    @touchmove.stop
    @click.stop="cancel(2)"
  >
    <view
      class="modal-content"
      v-if="showValue"
      @click.stop
    >
      <slot name="title">
        <view
          class="modal-title"
          :class="{'modal-title-padding': !content}"
          v-if="title"
        >
          {{title}}
        </view>
      </slot>
      <slot name="content">
        <view
          class="modal-article"
          v-html="content"
          v-if="content"
        >
        </view>
      </slot>
      <view class="modal-row">
        <view
          class="modal-col"
          :style="cancelStyle"
          hover-class="modal-hover"
          v-if="cancelText"
          @click="cancel(1)"
        >
          {{cancelText}}
        </view>
        <view
          class="modal-col modal-confirm"
          :style="confirmStyle"
          hover-class="modal-hover"
          @click="confirm"
        >
          {{confirmText}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Modal",
  computed: {
    value(){
      return this.modalStore.state.value;
    },
    content(){
      return this.modalStore.state.content;
    },
    cancelText(){
      return this.modalStore.state.cancelText;
    },
    confirmText(){
      return this.modalStore.state.confirmText;
    },
    title(){
      return this.modalStore.state.title;
    },
    maskClosable(){
      return this.modalStore.state.maskClosable;
    }
  },
  props: {
    cancelStyle: {
      type: [String, Object]
    },
    confirmStyle: {
      type: [String, Object]
    }
  },
  data(){
    return {
      showValue: this.value
    };
  },
  watch: {
    value(n, o){
      this.showValue = n;
    },
    showValue(n, o){
      this.$emit("input", n);
    }
  },
  methods: {
    handleCancel(){
      this.modalStore.commit("cancel");
    },
    handleConfirm(){
      this.modalStore.commit("confirm");
    },
    confirm(){
      this.showValue = false;
      const msg = {
        from: "ok",
        confirm: true
      };
      this.handleConfirm(msg);
      this.$emit("confirm", msg);
      this.$emit("event", msg);
    },
    cancel(type){
      if(!this.maskClosable && 2 === type){
        return;
      }
      else {
        this.showValue = false;
      }
      const msg = {
        from: 1 === type ? "cancel" : "mask"
      };
      1 === type ? msg.cancel = true : msg.mask = true;
      this.handleCancel(msg);
      this.$emit("cancel", msg);
      this.$emit("event", msg);
    }
  }
};
</script>

<style lang="less">
  @fontSizeLg: 30rpx;
  @fontSizeSm: 28rpx;

  .modal-container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1008;
    background: rgba(0, 0, 0, .6);
    visibility: hidden;
    opacity: 0;
    transition: all .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    .modal-content{
      width: 80%;border-radius: 32rpx;background: #fff;overflow: hidden;animation: fadeZoom .15s linear;
      .modal-title{
        padding: 30rpx 30rpx 0;text-align: center;color: #404040;font-size: @fontSizeLg;
      }
      .modal-title-padding{padding-bottom: 30rpx;}
      .modal-article{
        padding: 70.99rpx 30rpx 69rpx;font-size: @fontSizeSm;color: #444747; text-align: center;
      }
      .modal-row{
        display: flex;text-align: center;font-size: @fontSizeLg;line-height: 100rpx;position: relative;color: #404040;
        .modal-col{
          flex: 1;width: 100%; position: relative; color: @primary-color; font-size: 28rpx;
        }
        .modal-col:first-child::after{
          content: "";position: absolute;top: 0;bottom: 0;right: 0;border-right: 1px solid #ccc;transform: scaleX(.36);
        }
        .modal-hover{background: #f2f2f2;}
      }
      .modal-row::after{
        content: "";position: absolute;left: 0;right: 0;top: 0;border-top: 1px solid #ccc;transform: scaleY(.36);
      }
    }
    @keyframes fadeZoom {
      0%{transform: scale(.7);opacity: .6;}
      80%{transform: scale(1.2);opacity: .3;}
      100%{transform: scale(1);opacity: 1;}
    }
  }
  .modal-container.show{
    visibility: visible;opacity: 1;
  }
</style>