import { getLocation } from "@/utils/geo-location.js";
export default {
  methods: {
    async getLocation(){
      const
        data = await getLocation(),
        location = uni?.getStorageSync("map_storage");

      if(!location){
        uni?.setStorageSync("map_storage", data);
      }

      return location ? location : data;
    }
  }
};