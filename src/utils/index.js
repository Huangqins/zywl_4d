import { getMenu } from '@/utils/auth'
/**
 * 节流
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;
  
    const later = function () {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp;
  
      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
  
    return function (...args) {
      context = this;
      timestamp = +new Date();
      const callNow = immediate && !timeout;
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
  
      return result;
    };
  }
  
  /**
   * 深拷贝
   */
  
  export function deepClone(source) {
    if (!source && typeof source !== "object") {
      throw new Error("error arguments", "shallowClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === "object") {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    });
  
    return targetObj;
  }
  //年月日 时分秒
  export function fomatterTime(date) {
    let year, month, day, hours,min,sec ;
    year = date.getFullYear();
    month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) :  (date.getMonth() + 1);
    day = date.getDate() < 10 ? '0' + date.getDate() :  date.getDate();
    hours = date.getHours() < 10 ? '0' + date.getHours() :  date.getHours();
    min = date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes();
    sec = date.getSeconds() < 10 ? '0' + date.getSeconds() :  date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`
  }
   //年月日
  export function fomatterYearTime(date) {
    let year, month, day, hours,min,sec ;
    year = date.getFullYear();
    month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) :  (date.getMonth() + 1);
    day = date.getDate() < 10 ? '0' + date.getDate() :  date.getDate();
    // hours = date.getHours() < 10 ? '0' + date.getHours() :  date.getHours();
    // min = date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes();
    // sec = date.getSeconds() < 10 ? '0' + date.getSeconds() :  date.getSeconds();
    return `${year}-${month}-${day}`
  }
  
  export function formatTime(timestamp) {
    let sec = 1000, // 秒
      min = sec * 60, // 分
      hour = min * 60, // 时
      day = hour * 24, // 天
      days = Math.floor(timestamp / day),
      hours = Math.floor((timestamp - days * day) / hour),
      mins = Math.floor((timestamp - (days * day + hours * hour)) / min),
      secs = Math.floor(
        (timestamp - (days * day + hours * hour + mins * min)) / sec
      );
    return `${days}天${hours}小时${mins}分钟${secs}秒`;
  }
  //创建下载
  export function createDownload(blob = new Blob(),filename,type = '.pdf') {
    let url = window.URL.createObjectURL(new Blob([blob])),
    link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", filename + type);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  //自定义格式化时间
  export function customFormat(obj,fmt = new Date()) {
      let o = {
      "M+": obj.getMonth() + 1, //月份
      "d+": obj.getDate(), //日
      "h+": obj.getHours(), //小时
      "m+": obj.getMinutes(), //分
      "s+": obj.getSeconds(), //秒
      "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
      "S": obj.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }

  // 判断是否存在于当前权限中
  export function authJudge(string = '') {
    let authList = JSON.parse(getMenu()).map(item => item.menu_code),
        res = authList.includes(string);
        return res
  }
