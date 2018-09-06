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
    getInformation: {
        url: `${path}kb/getInformation`,
        method: 'post',
        keys: ['']
    },
    assetsInfo: {
        url: `${path}asset/assetsInfo`,
        method: 'post',
        keys: ['is_page']
    },
    targetInfo: {
        url: `${path}task/targetInfo`,
        method: 'post',
        keys: ['target_struts']
    },
    vulnrepair: {
        url: `${path}vuln/repairRate`,
        method: 'post',
        keys: ['target_id']
    },
    vulnTotal: {
        url: `${path}vuln/vulnTotal`,
        method: 'post',
        keys: ['target_id']
    },
    serviceTotal: {
        url: `${path}asset/serviceTotal`,
        method: 'post',
        keys: ['target_id']
    },
    vulnTypeTotal: {
        url: `${path}vuln/vulnTypeTotal`,
        method: 'post',
        keys: ['target_id']
    },
    //任务周期
    getRule: {
        url: `${path}task/getRule`,
        method: 'post',
        keys: ['flag']
    },
    //任务类型
    getTargetType: {
        url: `${path}task/getTargetType`,
        method: 'post',
        keys: ['']
    },
    //资产url/ip
    getAssetURL: {
        url: `${path}asset/getAssetURL`,
        method: 'post',
        keys: ''
    },
    //任务列表
    targetInfo: {
        url: `${path}task/targetInfo`,
        method: 'post',
        keys: ['target_name', 'rule_id', 'assrts_url', "target_struts"]
    },
    //检测资产是否存在在执行任务
    checkAsset: {
        url: `${path}task/checkAsset`,
        method: 'post',
        keys: ['target_url']
    },
    //添加任务
    addTarget: {
        url: `${path}task/addTarget`,
        method: 'post',
        keys: ['target_name', 'target_teststra', 'target_cycle', 'type_id', 'userName', 'target_starttime', 'target_url', 'target_ip']
    },
    
    // 资产列表
    assetsInfo: {
        url: `${path}asset/assetsInfo`,
        method: 'post',
        keys: ['is_page', 'assets_url', 'assets_ip', 'area_name', 'assets_zone', "assets_type", "port", "os_type", 'rows', 'page', "isPage", "assets_name"]
    },
    // (添加)更新资产
    assetsUpdate: {
        url: `${path}asset/updateAssets`,
        method: 'post',
        keys: [
            'assets_id', 'assets_name','assets_url', 'assets_ip','assets_network_ports','assets_network_type','assets_type','assets_important',
            'assets_os_type', 'assets_manger','assets_creatuser','assets_desc','assets_detail','assets_hostname','assets_numbering',
            'assets_zone'
        ]
    },
    // (添加)资产
    assetsAdd: {
        url: `${path}asset/addAssets`,
        method: 'post',
        keys: [ 'assets_name','assets_url', 'assets_ip','assets_network_ports','assets_network_type','assets_type','assets_important',
            'assets_os_type', 'assets_manger','assets_creatuser','assets_desc','assets_detail','assets_hostname','assets_numbering',
            'assets_zone'
        ]
    },
}
// filter keys
const filterKey = (obj, keys) => {
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