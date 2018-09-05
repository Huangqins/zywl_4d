/*
* create by Mr.Huang
*  All api schema in this file
* */
import _axios from '../plugins/axios'
// define one map Obj
const Api = {};
const path = process.env.VUE_APP_DEV_PATH;
//
const ApiSchema = {
    login: {
        url: `${path}/user/userLogin`,
        method: 'post',
        keys: ''
    },
    getInformation:{
        url: `${path}kb/getInformation`,
        method: 'post',
        keys: ['']
    },
    assetsInfo:{
        url: `${path}asset/assetsInfo`,
        method: 'post',
        keys: ['is_page']
    },
    targetInfo:{
        url: `${path}task/targetInfo`,
        method: 'post',
        keys: ['target_struts']
    },
    vulnrepair:{
        url: `${path}vuln/repairRate`,
        method: 'post',
        keys: ['target_id']
    },
    vulnTotal:{
        url: `${path}vuln/vulnTotal`,
        method: 'post',
        keys: ['target_id']
    },
    serviceTotal:{
        url: `${path}asset/serviceTotal`,
        method: 'post',
        keys: ['target_id']
    },
    vulnTypeTotal:{
        url: `${path}vuln/vulnTypeTotal`,
        method: 'post',
        keys: ['target_id']
    },
}
// filter keys
const filterKey =  (obj, keys) => {
    let ret = {}
    if (!keys) return ret = obj || {}
    for (let key in obj) {
        if (keys.indexOf(key) > -1) {
            ret[key] = obj[key]
        }
    }
    return ret
}

// create api function
const gernerater = () => {
    for (let key in ApiSchema) {
        if (!ApiSchema[key].type) {
            Api[key] = (params) => {
                return _axios({
                    method: ApiSchema[key].method,
                    url: ApiSchema[key].url,
                    [ApiSchema[key].method === 'post' ? 'data' : 'params']: filterKey(params, ApiSchema[key].keys)
                })
            }
        } else {
            Api[key] = (url) => {
                return _axios({
                    method: 'get',
                    url: url,
                    baseURL: location.origin,
                    headers: {
                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
                    },
                    responseType: 'blob'
                })
            }
        }
    }
}
gernerater()

export default Api

