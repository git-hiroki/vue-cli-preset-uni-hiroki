import moment from "@/utils/moment";
/**
 * 数据处理
 * @author echo.
 * @version 1.5.0
 **/
const utils = {
  // 去空格
  trim(value){
    return value.replace(/(^\s*)|(\s*$)/g, "");
  },

  // 内容替换
  replaceAll(text, repstr, newstr){
    return text.replace(new RegExp(repstr, "gm"), newstr);
  },

  // 格式化手机号码
  formatNumber(num){
    return 11 === num.length ? num.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") : num;
  },

  // 金额格式化
  rmoney(money){
    return parseFloat(money).toFixed(2).toString().split("").reverse().join("").replace(/(\d{3})/g, "$1,").replace(/\,$/, "").split("").reverse().join("");
  },

  // 日期格式化
  // eslint-disable-next-line complexity
  formatDate(formatStr, fdate){
    if(fdate){
      // eslint-disable-next-line no-bitwise
      if(~fdate.indexOf(".")){
        fdate = fdate.substring(0, fdate.indexOf("."));
      }
      fdate = fdate.toString().replace("T", " ").replace(/\-/g, "/");
      const fStr = "ymdhis";
      let fTime;
      if(!formatStr){
        formatStr = "y-m-d h:i:s";
      }
      if(fdate){
        fTime = new Date(fdate);
      }
      else {
        fTime = new Date();
      }
      let month = fTime.getMonth() + 1,
        day = fTime.getDate(),
        hours = fTime.getHours(),
        minu = fTime.getMinutes(),
        second = fTime.getSeconds();
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      hours = hours < 10 ? `0${hours}` : hours;
      minu = minu < 10 ? `0${minu}` : minu;
      second = second < 10 ? `0${second}` : second;
      const formatArr = [
        fTime.getFullYear().toString(),
        month.toString(),
        day.toString(),
        hours.toString(),
        minu.toString(),
        second.toString()
      ];
      for(let i = 0; i < formatArr.length; i++){
        formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
      }
      return formatStr;
    }
    else {
      return "";
    }
  },
  timeDiff(startMilliseconds, endMilliseconds = new Date().getTime()){
    const
      diff = moment(endMilliseconds).diff(startMilliseconds),
      milliseconds = {
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
      };
    return {
      days: Math.floor(diff / milliseconds.day),
      hours: Math.floor(diff % milliseconds.day / milliseconds.hour),
      minutes: Math.floor(diff % milliseconds.day % milliseconds.hour / milliseconds.minute),
      seconds: Math.round(diff % milliseconds.day % milliseconds.hour / milliseconds.minute / milliseconds.second)
    };
  },

  rgbToHex(r, g, b){
    return `#${utils.toHex(r)}${utils.toHex(g)}${utils.toHex(b)}`;
  },
  toHex(n){
    n = parseInt(n, 10);
    if(isNaN(n)){
      return "00";
    }
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
      "0123456789ABCDEF".charAt(n % 16);
  },
  hexToRgb(hex){
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  isJSON(str){
    if("string" == typeof str){
      try {
        const obj = JSON.parse(str);
        return "[object Object]" == Object.prototype.toString.call(obj);
      }
      catch(e){
        return false;
      }
    }
    else {
      return "[object Object]" == Object.prototype.toString.call(str);
    }
  },
  reactive(source, obj){
    return Object.entries(obj).forEach(([key, val]) => uni.$set(source, key, val));
  },

  add(... args){
    if(1 == args.length){
      return args?.[0];
    }
    return (
      args.reduce((accumulator, currentValue) => Number(accumulator) * 100 + Number(currentValue) * 100) / 100
    ).toFixed(1);
  },

  sleep(ms){
    return new Promise(resolve => {
      const timer = setTimeout(
        () => resolve(timer),
        ms
      );
    });
  }
};

export default utils;