export default {
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
  }
};