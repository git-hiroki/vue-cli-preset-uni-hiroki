<template>
  <view>
    <view
      v-if="message.payload.operationType === 1"
      class="card handle"
    >
      <view>
        <view class="time">
          {{messageTime}}
        </view>
        {{renderDom}}
      </view>
      <view class="choose">
        <view
          class="button"
          @tap="handleClick"
        >
          处理
        </view>
      </view>
    </view>
    <view
      class="card"
      v-else
    >
      <view class="time">
        {{messageTime}}
      </view>
      {{renderDom}}
    </view>
  </view>
</template>

<script>
import { parseGroupSystemNotice } from "@/components/base/message-facade";
import { caculateTimeago } from "@/components/base/common";

export default {
  data(){
    return {
      // message: {},
      messageTime: "",
      renderDom: ""
    };
  },

  components: {},
  props: {
    message: {
      type: Object
    }
  },
  watch: {
    message: {
      handler(newVal){
        this.setData({
          messageTime: caculateTimeago(newVal.time * 1000),
          renderDom: parseGroupSystemNotice(newVal)
        });
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    handleClick(){
      uni.showActionSheet({
        itemList: ["同意", "拒绝"],
        success: res => {
          const option = {
            handleAction: "Agree",
            handleMessage: "欢迎进群",
            message: this.message
          };

          if(1 === res.tapIndex){
            option.handleAction = "Reject";
            option.handleMessage = "拒绝申请";
          }

          uni.$TUIKit
            .handleGroupApplication(option)
            .then(() => {
              uni.showToast({
                title: "Agree" === option.handleAction ? "已同意申请" : "已拒绝申请"
              });
            })
            .catch(error => {
              uni.showToast({
                title: error.message || "处理失败",
                icon: "none"
              });
            });
        }
      });
    }
  }
};
</script>
<style scoped>
@import "./index.css";
</style>