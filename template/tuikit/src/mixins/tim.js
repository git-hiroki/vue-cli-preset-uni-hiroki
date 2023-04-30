import { genTestUserSig } from "@/debug/GenerateTestUserSig.js";
import { setTokenStorage } from "@/utils/token";

export default {
  methods: {
    async TIMLogin(userID){
      // 登录操作执行前, 先将之前的 TIM 退出登录, 以避免重复登录导致问题
      uni.$TUIKit.logout();
      const
        { userSig } = await genTestUserSig(userID),
        data = await uni.$TUIKit.login(
          {
            userID,
            userSig
          }
        );
      if(data?.data?.repeatLogin){
        uni.showToast({
          icon: "none",
          title: "您已经登录, 请勿重复登录!"
        });
      }
      uni.$app.globalData.userInfo = {
        userSig,
        userID
      };
      setTokenStorage({
        userInfo: uni.$app.globalData.userInfo
      });
      return data;
    }
  }
};