/*
 * create by Mr.Huang
 *  All api schema in this file
 * */
import _axios from '../plugins/axios'
// define one map Obj
const Api = {};
const path = '/ZR/'; // 暂时写死
//
const ApiSchema = {
    login: {
        url: `${path}/user/userLogin`,
        method: 'post',
        keys: ''
    },
    userExit: {
        url: `${path}/user/userExit`,
        method: 'post',
        keys: ''
    },
    getInformation: {
        url: `${path}kb/getInformation`,
        method: 'post',
        keys: ['']
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
        keys: ['target_name', 'rule_id', 'assrts_url', "target_struts","rows", "page"]
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
        keys: ['type_name','task_type_id','target_name','asset_ids', 'target_teststra', 'target_cycle', 'type_id', 'userName', 'target_starttime', 'target_url', 'target_ip']
    },
    
    // 资产列表
    assetsInfo: {
        url: `${path}asset/assetsInfo`,
        method: 'post',
        menuCode:'02-01-04',
        keys: ['start_time','id','end_time','is_page', 'assets_url', 'assets_ip', 'area_name', 'assets_zone', "assets_type", "port", "os_type", 'rows', 'page', "isPage", "assets_name"]
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
    //资产删除
    deleteAssets: {
        url: `${path}asset/deleteAssets`,
        method: 'post',
        keys: 'assets_ids'
    },
    //端口号
    getPort: {
        url: `${path}asset/getPort`,
        method: 'post',
        keys: ''
    },
    //操作系统
    getOSType: {
        url: `${path}asset/getOSType`,
        method: 'post',
        keys: ''
    },
    //设备类型
    assetsType: {
        url: `${path}asset/assetsType`,
        method: 'post',
        keys: ''
    },
     //资产区域
     getArea: {
        url: `${path}asset/getArea`,
        method: 'post',
        keys: ''
    },
    //任务名称
    taskname: {
        url: `${path}task/getTargetName`,
        method: 'post',
        keys: ''
    },
    //风险类型
    vulnType: {
        url: `${path}vuln/vulnType`,
        method: 'post',
        keys: ''
    },
    //风险列表
    vulnSearch: {
        url: `${path}vuln/vulnSearch`,
        method: 'post',
        keys: ['is_page','page','rows','target_id','vuln_level','vuln_type','assets_id','vuln_name','vuln_time','start_time','end_time']
    },
    //资产
    getAssetURL: {
        url: `${path}asset/getAssetURL`,
        method: 'post',
        keys: ''
    },
    //风险处理
    vulnManage: {
        url: `${path}vuln/vulnManage`,
        method: 'post',
        keys: ['vuln_id']
    },
    // 用户列表
    userList: {
        url: `${path}user/userList`,
        method: 'post',
        menuCode:'09-02-08',
        keys: ['user_name','page','rows']
    },
    //添加用户
    addUser: {
        url: `${path}user/addUser`,
        method: 'post',
        menuCode: '09-02-01',
        keys: ['userName', 'trueName', 'email', 'phone', 'company', 'IDCard', 'roleId']
    },
    // 修改用户
    updateUser: {
        url: `${path}user/updateUser`,
        method: 'post',
        menuCode: '09-02-07',
        keys: ['userName', 'trueName', 'email', 'phone', 'company', 'IDCard', 'roleId', 'managerUser']
    },
    // 批量启用
    enabledBatchUser: {
        url: `${path}user/batchUpdateUser`,
        method: 'post',
        menuCode: '09-02-03',
        keys: ['user_id', 'user_name', 'enabled']
    },
    // 批量禁用
    disabledBatchUser: {
        url: `${path}user/batchUpdateUser`,
        method: 'post',
        menuCode: '09-02-04',
        keys: ['user_id', 'user_name', 'enabled']
    },
    // 批量删除用户
    batchDeleteUser: {
        url: `${path}user/batchDeleteUser`,
        method: 'post',
        menuCode: '09-02-05',
        keys: ['user_id', 'user_name']
    },
    //登录日志
    loginLogSearch: {
        url: `${path}log/loginLogSearch`,
        method: 'post',
        menuCode: '10-03-01',
        keys: ['username','rows','page']
    },
    //授权管理
    getSystemInfo: {
        url: `${path}system/getSystemInfo`,
        method: 'post',
        menuCode: '10-04',
        keys: []
    },
    //
   
    getRolePermission: {
        url: `${path}user/getRolePermission`,
        method: 'post',
        keys: ''
    },
    getPermissionByRole: {
        url: `${path}user/getPermissionByRole`,
        method: 'post',
        keys: ['role_id']
    },
    addRolePermission: {
        url: `${path}user/addRolePermission`,
        method: 'post',
        menuCode: '09-01-01',
        keys: ['role_name', 'role_level', 'role_id', 'menu_id']
    },
    // 获取角色名称
    getRoleName: {
        url: `${path}user/getRoleName`,
        method: 'post',
        keys: ''
    }
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
                    menuCode: ApiSchema[key].menuCode,
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