<template>
  <view
    class="navbar flex-row justify-start"
    v-if="navbar.show"
  >
    <view
      class="icon-back"
      @click="() => handleClick()"
    >
      后退
    </view>
    <view class="title">
      {{navbar.title}}
    </view>
  </view>
</template>

<script>
import { mapState } from "vuex";
import mixins from "@/mixins/components";
export default {
  mixins: [mixins],
  components: {},
  computed: {
    ... mapState("navbar", {
      navbar: state => state
    })
  },
  data(){
    return {
    };
  },

  methods: {
    handleClick(){
      uni.$go.back();
    }
  }
};
</script>

<style scoped lang="less">
.navbar {
  background: <%= options.primaryColor %>;
  height: ~"calc(100rpx + var(--status-bar-height))";
  line-height: ~"calc(100rpx + var(--status-bar-height))";
  .icon-back, .title {
    flex: 1;
  }
  .icon-back {
    flex-basis: 20%;
  }
  .title {
    text-align: center;
    flex-basis: 80%;
  }
  .title {
    text-align: center;
  }
}
</style>