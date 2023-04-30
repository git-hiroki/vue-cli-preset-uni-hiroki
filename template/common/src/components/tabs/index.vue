<template>
  <view class="tabs-wrapper">
    <scroll-view scroll-x>
      <view class="tabs-flex">
        <view class="tabs-list">
          <view
            class="tabs-item"
            :class="{ active: activeIndex === i }"
            v-for="(item, i) in data"
            :key="i"
            @click="() => handleClick(i)"
          >
            {{item.title}}
            <text
              class="tabs-badge"
              v-if="item.badge"
            >
              ({{item.badge}})
            </text>
          </view>
        </view>
        <view class="tabs-right">
          <slot name="right" />
        </view>
      </view>
    </scroll-view>
    <view
      :class="[
        'tabs-panel',
        `tabs-panel-${activeIndex}`
      ]"
    >
      <slot />
    </view>
  </view>
</template>

<script>
import mixins from "@/mixins/components";
export default {
  mixins: [mixins],
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      activeIndex: this.value
    };
  },
  watch: {
    value(newVal, oldVal){
      this.activeIndex = newVal;
    }
  },
  methods: {
    handleClick(i){
      this.activeIndex = i;
      this.$emit("input", i);
    }
  }
};
</script>

<style lang="less" scoped>
.tabs-wrapper {
  display: flex;
  flex-direction: column;
  .tabs-list {
    .tabs-badge {
      margin-left: 10rpx;
      color: #A71F1F;
    }
  }
  .tabs-flex {
    display: flex;
  }
  // 兼容 tabs 套 tabs 的情况
  .tabs-wrapper {
    padding: 0;
    .tabs-list,
    .tabs-right {
      flex: 1;
    }
    .tabs-right {
      text-align: right;
      justify-content: end;
    }
    .tabs-list {
      flex-basis: auto;
      justify-content: start;
      align-items: center;
      border: none;
      .tabs-item {
        padding: 0 20rpx;
        height: 40rpx;
        border-radius: 4rpx;
        font-size: 24rpx;
        line-height: 40rpx;
        text-align: center;
        margin-bottom: 24rpx;
        color: #999999;
        background-color: #EDEDED;
        &:last-child {
          padding-right: 20rpx;
        }
        &.active {
          color: #FFFFFF;
          background-color: <%= options.primaryColor %>;
          font-weight: bold;
        }
      }
    }
    .tabs-panel {
      padding: 0;
      .list {
        margin: 0;
      }
    }
  }
}

.tabs-list {
  flex-basis: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: thin solid #dedede80;
  padding: 0 70rpx;
  box-sizing: border-box;
}

.tabs-item {
  font-size: 32rpx;
  line-height: 44rpx;
  color: #999999;
  padding: 20rpx 0 30rpx 0;
}

.tabs-item.active {
  color: <%= options.primaryColor %>;
  font-weight: bold;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    display: block;
    background-color: <%= options.primaryColor %>;
    border-radius: 3rpx;
    width: 66rpx;
    height: 6rpx;
  }
}

.tabs-panel {
  flex: 1;
  padding: 20rpx;
}
</style>