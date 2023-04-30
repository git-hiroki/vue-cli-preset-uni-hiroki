<template>
  <view class="category-wrapper">
    <scroll-view
      class="category-scroll-view"
      scroll-y
    >
      <view class="category-list">
        <view
          class="category-item"
          :class="{ active: activeIndex === i }"
          v-for="(item, i) in data"
          :key="i"
          @click="() => handleClick(i)"
        >
          {{item.title}}
        </view>
      </view>
    </scroll-view>
    <view class="category-panel">
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

.category {
  &-wrapper {
    display: flex;
    flex-direction: row;
  }
  &-scroll-view {
    width: 200rpx;
    height: 100vh;
  }
  &-list {
    width: 200rpx;
    display: flex;
    flex-direction: column;
    border-right: thin solid #dedede80;
    box-sizing: border-box;
  }

  &-item {
    font-size: 32rpx;
    line-height: 44rpx;
    color: #999999;
    padding: 20rpx 0 30rpx 0;
    text-align: center;
    &.active {
      color: #FFFFFF;
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: bold;
      background: <%= options.primaryColor %>;
    }
  }
  &-panel {
    flex: 1;
  }
}
</style>