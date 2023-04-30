import http from "@/utils/http-request";
import LibGenerateTestUserSig from "@/debug/lib-generate-test-usersig-es.min.js";
import { SDKAppID, expire, secretKey } from "@/configs";
export const getUserSig = params => new Promise(
  resolve => resolve(
    {
      data: new LibGenerateTestUserSig(SDKAppID, secretKey, expire).genTestUserSig(
        params?.userID
      )
    }
  )
);

/*
  // 生产环境请从 server 端获取 userSig
  // https://cloud.tencent.com/document/product/647/17275#Server

  export const getUserSig = params => http.request({
    url: "wx/getUserSig",
    params
  });
*/