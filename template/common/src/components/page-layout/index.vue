<template>
  <view
    :class="[
      'page-layout',
      navbar.show ? '' : 'page-layout-navbar-hide'
    ]"
  >
    <navbar />
    <scroll-view
      class="scroll-view"
      :scroll-y="true"
      :enhanced="true"
      :bounces="false"
      @scroll.stop.prevent
    >
      <slot />
    </scroll-view>
    <modal />
    <popup>
      <slot name="popup" />
    </popup>
  </view>
</template>
<script>
import mixins from "@/mixins/components";
import Navbar from "@/components/navbar";
import { mapState } from "vuex";

export default {
  mixins: [mixins],
  components: {
    Navbar
  },
  data(){
    return {
      ... mapState("navbar", {
        navbar: state => state
      })
    };
  },
  methods: {

  }
};
</script>
<style lang="less">
.page-layout.with-space ::v-deep .uni-scroll-view-content {
  padding-top: 20rpx;
}
</style>
<style lang="less" scoped>
.page-layout {
  &, & > .scroll-view {
    width: 100vw;
    height: 100vh;
  }
  .scroll-view {
    max-height: ~"calc(100vh - 160rpx)";
  }
  &-navbar-hide .scroll-view {
    max-height: 100vh;
  }
}
</style>