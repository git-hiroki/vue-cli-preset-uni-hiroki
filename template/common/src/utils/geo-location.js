import { getRegeo } from "@/api/amap";

export const authorize = () => new Promise(
  (resolve, reject) => {
    uni.getSystemInfo({
      async success({ locationEnabled, locationAuthorized }){
        if([locationEnabled, locationAuthorized].includes(false)){
          uni.showToast({
            icon: "none",
            title: "请打开设备位置信息功能"
          });
          reject({ code: -1 });
        }
        else {
          // #ifdef H5
          const { name, state } = await navigator.permissions.query({ name: "geolocation" });
          if(["PROMPT", "GRANTED"].includes(state.toUpperCase())){
            resolve({ code: 200 });
          }
          else {
            reject({ code: -1 });
          }
          // #endif

          // #ifdef MP-WEIXIN
          uni.authorize({
            scope: "scope.userLocation",
            success: ({ errMsg }) => {
              if("authorize:ok" == errMsg){
                resolve({ code: 200 });
              }
              else {
                uni.showToast({
                  icon: "none",
                  title: "请授权设备位置信息功能"
                });
                reject({
                  errMsg
                });
              }
            }
          });
          // #endif

          // #ifdef APP-PLUS
          resolve({ code: 200 });
          // #endif
        }
      }
    });
  }
);

export const getLocation = () => new Promise(
  // eslint-disable-next-line no-async-promise-executor
  async (resolve, reject) => {
    const { code } = await authorize();
    if(200 == code){
      const { platform } = uni?.$systemInfo;
      // #ifndef H5
      uni?.getLocation({
        isHighAccuracy: true,
        accuracy: "best",
        type: "wgs84", // gcj02 / wgs84, 使用 gcj02 时应判断平台
        // geocode: "ios" != platform,
        success: async ({ longitude, latitude }) => {
          if("ios" == platform){
            longitude = longitude.toFixed(6);
            latitude = latitude.toFixed(6);
          }
          const data = await getRegeo({
            location: `${longitude},${latitude}`
          });
          resolve(data?.regeocode?.addressComponent);
        }
      });
      // #endif
      // #ifdef H5
      navigator?.geolocation?.getCurrentPosition(
        async ({ coords: { longitude, latitude } }) => {
          const data = await getRegeo({
            location: `${longitude},${latitude}`
          });
          resolve(data?.regeocode?.addressComponent);
        }
      );
      // #endif
    }
  }
);