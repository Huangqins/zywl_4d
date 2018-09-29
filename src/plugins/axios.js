"use strict";
import axios from "axios";
import CryptoJs from 'crypto-js';
import { getToken, getUserName, removeAll } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '../router'
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
_axios.interceptors.request.use(config => {
    let menuCode = config.menuCode ? config.menuCode : vm._route.meta.menuCode;
    console.log(menuCode)
    let token = getToken(),
      userName = getUserName(),
      _key = `${menuCode};${token};${userName}`,
      _sis = 'c1cc0f3684aa06f64846cca29fcab0524621D373CADE4E83',
      result = CryptoJs.TripleDES.encrypt(_key, CryptoJs.enc.Utf8.parse(_sis), {
        iv: CryptoJs.enc.Utf8.parse('23039817'),
        mode: CryptoJs.mode.CBC,
        padding: CryptoJs.pad.Pkcs7
      });
    config.headers['session'] = result
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(response => {
  if (vm._route.fullPath === '/login') {
    return response
  } else {
    if (response.data.result !== 0) {
      switch (response.data.result) {
        case  3 :
         Message.error(`已在其他点登陆,请重新登录`)
         removeAll()
         router.push({ path: '/login' })
         break;
        case  1 :
         Message.error(`登录已过期请重新登录`)
         removeAll()
         router.push({ path: '/login' })
         break;
         case  -1 :
         Message.error(`${response.config.title}操作失败`)
         break;
        case -2:
         Message.error(`${response.config.title}尚无访问权限`)
         break;
        case 5:
         Message.error(`授权文件丢失,请重新导入授权文件`)
         removeAll()
         router.push({ path: '/login' })
         break;
        case 6:
         Message.error(`授权文件已过期,请导入授权文件`)
         removeAll()
         router.push({ path: '/login' })
         break;
        default:
          return response
         break;
      }
    }
  }
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios;