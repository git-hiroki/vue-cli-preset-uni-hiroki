export default {
  setStorageSync(key, data, expire){
    if(expire){
      const
        ts = Date.parse(new Date()),
        expires = ts + expire;
      uni.setStorageSync(key, {
        data,
        __expires: expires
      });
    }
    else {
      uni.setStorageSync(key, data);
    }
  },

  getStorageSync(key){
    const data = uni.getStorageSync(key);
    if("[object Object]" === Object.prototype.toString.call(data)){
      if("__expires" in data){
        const ts = Date.parse(new Date());
        if(ts > data.__expires){
          uni.removeStorageSync(key);
          return undefined;
        }
        else {
          return data.data;
        }
      }
      else {
        return data;
      }
    }
    else {
      return data;
    }
  }
};