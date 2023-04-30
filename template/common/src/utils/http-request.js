/**
 * 常用方法封装 请求, 文件上传等
 * @author echo.
 **/
import { baseUrl } from "@/configs";
import store from "@/store";

const http = {
  baseUrl(){
    let result = baseUrl;
    result = result.replace(/\/{0,}$/g, "");
    return result;
  },
  getToken(){
    return uni.getStorageSync("sys-token") || "";
  },
  toast(text, duration, success){
    uni.showToast({
      title: text || "出错啦~",
      icon: success ? "success" : "none",
      duration: duration || 2000
    });
  },
  isAndroid(){
    const res = uni.getSystemInfoSync();
    return "android" == res.platform.toLocaleLowerCase();
  },
  isPhoneX(){
    const
      res = uni.getSystemInfoSync(),
      models = ["iphonex", "iphonexr", "iphonexsmax", "iphone11", "iphone11pro", "iphone11promax"],
      model = res.model.replace(/\s/g, "").toLowerCase();
    let iphonex = false;
    if(models.includes(model)){
      iphonex = true;
    }
    return iphonex;
  },
  constNum(){
    let time = 0;
    // #ifdef APP-PLUS
    time = this.isAndroid() ? 300 : 0;
    // #endif
    return time;
  },
  delayed: null,
  showLoading(title, mask = true){
    uni.showLoading({
      mask,
      title: title || "请稍候..."
    });
  },
  downloadFile({ url }){
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        header: {
          token: http.getToken()
        },
        url: `${http.baseUrl()}/${url}`,
        success: res => {
          const fs = uni.getFileSystemManager(),

            { tempFilePath, header } = res,
            { USER_DATA_PATH } = wx.env,
            ContentDisposition = header["Content-Disposition"];
          let fileName = (ContentDisposition ?? []).split("filename=");
          fileName = fileName[fileName.length - 1];
          fileName = decodeURIComponent(fileName);
          const filePath = `${USER_DATA_PATH}/${fileName}`;
          fs.saveFile({
            filePath,
            tempFilePath,
            success: res => {
              if("saveFile:ok" == res.errMsg){
                resolve(res);
              }
              else {
                reject(res);
              }
            },
            fail: res => {
              reject(res);
            }
          });
        },
        fail: res => {
          reject(res);
        }
      });
    });
  },
  saveImageToPhotosAlbum({ url }){
    http.showLoading("图片保存中…");
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        header: {
          token: http.getToken()
        },
        url: `${http.baseUrl()}/${url}`,
        success: res => {
          const contentType = res.header?.["Content-Type"] || res.header?.["content-type"];
          if(/^image/.test(contentType)){
            uni.saveImageToPhotosAlbum({
              filePath: res?.tempFilePath,
              success: () => {
                resolve(res);
              },
              fail: res => {
                reject(res);
              }
            });
          }
          else {
            reject(res);
          }
        },
        fail: res => {
          reject(res);
        }
      });
    }).finally(res => {
      uni.hideLoading();
      return res;
    });
  },
  writeFile({ url }){
    return new Promise((resolve, reject) => {
      uni.request({
        header: {
          token: http.getToken()
        },
        url: `${http.baseUrl()}/${url}`,
        method: "GET",
        responseType: "arraybuffer",
        success: ({ statusCode, header, data }) => {
          if(200 == statusCode){
            const fs = uni.getFileSystemManager(),
              { USER_DATA_PATH } = wx.env,
              ContentDisposition = header["Content-Disposition"];
            let fileName = (ContentDisposition ?? []).split("filename=");
            fileName = fileName[fileName.length - 1];
            fileName = decodeURIComponent(fileName);
            const filePath = `${USER_DATA_PATH}/${fileName}`;
            fs.writeFile({
              filePath,
              data,
              encoding: "binary",
              success: res => {
                if("writeFile:ok" == res.errMsg){
                  resolve(res);
                }
                else {
                  reject(res);
                }
              },
              fail: res => {
                reject(res);
              }
            });
          }
        },
        fail: res => {
          reject(res);
        }
      });
    });
  },
  /**
   * 请求数据处理
   * @param {String} url 请求地址
   * @param {String} method 请求方式
   *  GET or POST
   * @param {*} params 请求参数
   * @param {Boolean} isDelay 是否延迟显示loading
   * @param {Boolean} isForm 数据格式
   *  true: "application/x-www-form-urlencoded"
   *  false:"application/json"
   * @param {Boolean} hideLoading 是否隐藏loading
   *  true: 隐藏
   *  false:显示
   * @returns {Promise} Promise对象
   */
  // eslint-disable-next-line max-lines-per-function
  upload({ url, name, fileDir, fileType, extension, sourceType, count }){
    if(!sourceType){
      sourceType = ["camera", "album"];
    }
    return new Promise((resolve, reject) => {
      uni.chooseImage({
        count: count || 1,
        sizeType: ["compressed"],
        sourceType,
        extension,
        success: async ({ tempFilePaths }) => {
          uni.showToast({
            icon: "loading",
            title: "正在上传…"
          });
          const tasks = await Promise.all(tempFilePaths.map(filePath => new Promise((resolve, reject) => uni.uploadFile({
            url: `${http.baseUrl()}/${url}`,
            name: name || "file",
            fileType: fileType || "image",
            extension: extension || [],
            formData: {
              filedir: fileDir || ""
            },
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "token": http.getToken()
            },
            filePath,
            success: ({ data }) => {
              data = JSON.parse(data);
              resolve(data);
            },
            fail: e => {
              reject(e);
            }
          }))));
          resolve({
            code: 200,
            data: count > 1 ? tasks : tasks[0]
          });
        },
        fail: e => {
          reject(e);
        },
        complete: () => {
          uni.hideToast();
        }
      });
    });
  },
  // eslint-disable-next-line max-lines-per-function
  //
  request({ url, params, method = "GET", isDelay, isForm, mute }){
    // 接口请求
    let loading = false;
    http.delayed && uni.hideLoading();
    clearTimeout(http.delayed);
    http.delayed = null;
    if(!mute){
      if(isDelay){
        http.delayed = setTimeout(() => {
          loading = true;
          http.showLoading();
        }, 1000);
      }
      else {
        loading = true;
        http.showLoading();
      }
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url: `${http.baseUrl()}/${url}`,
        data: params,
        header: {
          "content-type": isForm ? "application/x-www-form-urlencoded" : "application/json",
          "token": http.getToken()
        },
        method,
        dataType: "json",
        success: res => {
          clearTimeout(http.delayed);
          http.delayed = null;
          if(loading && !mute){
            uni.hideLoading();
          }
          resolve({
            ... res.data,
            $respond: true
          });
        },
        fail: res => {
          clearTimeout(http.delayed);
          http.delayed = null;
          http.toast("网络不给力, 请稍后再试~");
          reject({
            ... res,
            $respond: true
          });
        }
      });
    });
  },
  /**
   * 上传文件
   * @param {String} url 请求地址
   * @param {String} src 文件路径
   * @returns {Promise} Promise对象
   */
  uploadFile(url, src){
    http.showLoading();
    return new Promise((resolve, reject) => {
      const uploadTask = uni.uploadFile({
        url: `${baseUrl}/${url}`,
        filePath: src,
        name: "imageFile",
        formData: {},
        header: {
          token: http.getToken()
        },
        success(res){
          uni.hideLoading();
          const d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}");
          if(0 == d.code % 100){
            // 返回图片地址
            const fileObj = d.data;
            resolve(fileObj);
          }
          else {
            http.toast(res.msg);
          }
        },
        fail(res){
          reject(res);
          http.toast(res.msg);
        }
      });
    });
  },
  // token超时注入

  timeoutLogout(data){
    http.timeoutLogout(data);
    if(data.code > 70000 && data.code < 80000){
      uni.showToast({
        icon: "none",
        title: "登录超时,请重新登录"
      });
      setTimeout(
        () => {
          uni.clearStorage();
          uni.$go.reLaunch("pages/login/index");
        },
        1000
      );
    }
  }
};

export default http;