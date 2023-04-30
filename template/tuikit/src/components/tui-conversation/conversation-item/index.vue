<template>
  <!--TODO: 默认图片在 cos 上添加 -->
  <movable-area
    v-if="conversation.conversationID"
    class="t-conversation-item-container"
  >
    <movable-view
      class="t-conversation-item"
      direction="horizontal"
      @change="handleTouchMove"
      damping="100"
      :x="xScale"
    >
      <view class="avatar-box">
        <image
          class="t-conversation-item-avatar"
          :src="setConversationAvatar"
          @error="handleImageError"
        ></image>
        <view
          class="unread"
          v-if="conversation.unreadCount !== 0"
        >
          <view
            class="read-text"
            v-if="conversation.unreadCount > 99"
          >
            99+
          </view>
          <view
            class="read-text"
            v-else
          >
            {{conversation.unreadCount}}
          </view>
        </view>
      </view>
      <view class="t-conversation-item-content">
        <label class="tui-conversation-item-name">{{conversationName}}</label>
        <view class="tui-conversation-lastMessage">
          <text>{{conversation.lastMessage.messageForShow}}</text>
        </view>
      </view>
      <view class="t-conversation-item-info">
        {{timeago}}
      </view>
      <!--    <view class="t-conversation-delete" @tap.stop="deleteConversation">删除</view>-->
    </movable-view>
  </movable-area>
</template>

<script>
import { caculateTimeago } from "@/components/base/common";

export default {
  data(){
    return {
      xScale: 0,
      conversationName: "",
      conversationAvatar: "",
      setConversationAvatar: "",
      timeago: ""
    };
  },

  components: {},
  props: {
    conversation: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    conversation: {
      handler(conversation){
        // 计算时间戳
        this.setData({
          conversationName: this.getConversationName(conversation),
          setConversationAvatar: this.setConversationAvatarHandler(conversation),
          timeago: caculateTimeago(conversation.lastMessage.lastTime * 1000)
        });
        this.$updateTimeago(conversation);
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    // 先查 remark；无 remark 查 (c2c)nick/(group)name；最后查 (c2c)userID/(group)groupID
    getConversationName(conversation){
      if("@TIM#SYSTEM" === conversation.type){
        return "系统通知";
      }

      if("C2C" === conversation.type){
        return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
      }

      if("GROUP" === conversation.type){
        return conversation.groupProfile.name || conversation.groupProfile.groupID;
      }
    },

    setConversationAvatarHandler(conversation){
      if("@TIM#SYSTEM" === conversation.type){
        return "https://web.sdk.qcloud.com/component/TUIKit/assets/system.png";
      }

      if("C2C" === conversation.type){
        return conversation.userProfile.avatar || "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png";
      }

      if("GROUP" === conversation.type){
        return conversation.groupProfile.avatar || "/static/assets/tim//gruopavatar.svg";
      }
    },

    deleteConversation(){
      uni.showModal({
        content: "确认删除会话？",
        success: res => {
          if(res.confirm){
            uni.$TUIKit.deleteConversation(this.conversation.conversationID);
            this.setData({
              conversation: {},
              xScale: 0
            });
          }
        }
      });
    },

    handleTouchMove(e){
      if(!this.lock){
        this.last = e.detail.x;
        this.lock = true;
      }

      if(this.lock && e.detail.x - this.last < -5){
        this.setData({
          xScale: -75
        });
        setTimeout(() => {
          this.lock = false;
        }, 2000);
      }
      else if(this.lock && e.detail.x - this.last > 5){
        this.setData({
          xScale: 0
        });
        setTimeout(() => {
          this.lock = false;
        }, 2000);
      }
    },

    $updateTimeago(conversation){
      if(conversation.conversationID){
        // conversation.lastMessage.timeago = caculateTimeago(conversation.lastMessage.lastTime * 1000);
        conversation.lastMessage.messageForShow = conversation.lastMessage.messageForShow.slice(0, 15);
      }
      this.setData({
        conversation
      });
    },

    handleImageError(){
      this.setData({
        setConversationAvatar: "/static/assets/tim//gruopavatar.svg"
      });
    }
  }
};
</script>
<style>
@import "./index.css";
.t-conversation-item-info {
  position: absolute;
  right: 0;
}
</style>