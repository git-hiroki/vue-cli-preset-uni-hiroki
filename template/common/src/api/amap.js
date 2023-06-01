import { aMapKey } from "@/configs";

export const getRegeo = params => uni.$http.request({
  url: "https://restapi.amap.com/v3/geocode/regeo",
  params: {
    key: aMapKey,
    ... params
  }
});