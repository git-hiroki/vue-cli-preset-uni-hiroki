import qs from "qs";
const go = {
  to(path, query, options){
    options = options || {};
    if(!path.startsWith("/")){
      path = `/${path}`;
    }
    if(query){
      uni.$app.globalData.query = query;
    }
    else {
      uni.$app.globalData.query = {};
    }
    query = go.encode(
      query
    );
    uni.$router.push({
      path,
      query,
      success: options.success
    });
  },
  toTab(path, query){
    if(!path.startsWith("/")){
      path = `/${path}`;
    }
    if(query){
      uni.$app.globalData.query = query;
    }
    else {
      uni.$app.globalData.query = {};
    }
    query = go.encode(
      query
    );
    uni.$router.pushTab({
      path
    });
  },
  redirect(path, query){
    if(!path.startsWith("/")){
      path = `/${path}`;
    }
    if(query){
      uni.$app.globalData.query = query;
    }
    else {
      uni.$app.globalData.query = {};
    }
    uni.$router.replace({
      path,
      query
    });
  },
  reLaunch(path){
    uni.reLaunch({
      url: path
    });
  },
  call(phoneNumber){
    uni.makePhoneCall({
      phoneNumber
    });
  },
  back(delta, options){
    delta = delta || 1;
    uni.$router.back(delta, options);
  },
  refreshBack(){
    uni.$router.back(1, {
      success(){
        const page = getCurrentPages()?.pop();
        if(page){
          page?.onLoad();
        }
      }
    });
  },
  encode(query){
    Object.entries(query || {}).forEach(
      ([key, val]) => {
        // 若为对象
        if("[object Object]" == Object.prototype.toString.call(val)){
          // 序列化一层
          query[key] = qs.stringify(val);
        }
      }
    );
    return query;
  },
  /*
    如果键值为JSON格式,
    则若使用 this.query() 获取参数, 拿到undefined, 或拿到被encodeURIComponent加密后的数据格式
    为解决此问题, 对所有使用go编程式导航传递的参数进行编码
    数据消费者可使用go.decode解码该数据为JSON对象使用
  */
  decode(obj){
    obj = decodeURIComponent(
      obj
    );
    obj = qs.parse(obj);
    return obj;
  }
};

export default go;