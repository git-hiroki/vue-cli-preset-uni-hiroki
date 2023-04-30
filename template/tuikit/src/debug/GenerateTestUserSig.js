import { sdkAppID as TIMSDKAppId, expire } from "@/configs";
import { getUserSig } from "@/api/wx";
import storage from "@/utils/storage";
export async function genTestUserSig(userID){
  const userSig = storage.getStorageSync("userSig");
  if(userSig){
    return {
      sdkAppID,
      userSig
    };
  }
  else {
    const { data } = await getUserSig({ userID }, true);
    console.warn({ data });
    storage.setStorageSync("userSig", data, expire);
    return {
      sdkAppID,
      userSig: data
    };
  }
}
export const sdkAppID = TIMSDKAppId;