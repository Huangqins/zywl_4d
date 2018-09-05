"use strict";
import axios from "axios";
import CryptoJs from 'crypto-js';
import { getToken, getUserName } from '@/utils/auth'
// import { mapGetters } from 'vuex'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(config => {
    let menuCode = vm._route.meta.menuCode,
      token = getToken(),
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
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default _axios;