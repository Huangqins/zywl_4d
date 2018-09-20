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
        keys: ['target_id','assets_id']
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
        keys: ['target_name', 'rule_id', 'assrts_url', "target_struts", "rows", "page"]
    },
    //测试组列表
    assetsGroupTotal: {
        url: `${path}asset/assetsGroupTotal`,
        method: 'post',
        title: '自定义测试组列表',
        keys: ''
    },
    // 查询测试组
    getAssetsGroupList: {
        url: `${path}asset/getAssetsGroupList`,
        method: 'post',
        title: '查询测试组',
        keys: ['group_code']
    },
    //  修改测试组
    updateAssetsGroup: {
        url: `${path}asset/updateAssetsGroup`,
        method: 'post',
        title: '修改测试组',
        keys: ['group_code','assets_ids','group_name']
    },
    //检测资产是否存在在执行任务
    checkAsset: {
        url: `${path}task/checkAsset`,
        method: 'post',
        keys: ['target_url']
    },
    // 添加自定义测试组
    assetsGroup: {
        url: `${path}asset/assetsGroup`,
        method: 'post',
        title: '添加自定义测试组',
        keys: ['assets_ids', 'group_name']
    },
    //添加任务
    addTarget: {
        url: `${path}task/addTarget`,
        method: 'post',
        title: '添加任务',
        keys: ['type_name', 'task_type_id', 'target_name', 'asset_ids', 'target_teststra', 'target_cycle', 'type_id', 'userName', 'target_starttime', 'target_url', 'target_ip']
    },

    // 资产列表
    assetsInfo: {
        url: `${path}asset/assetsInfo`,
        method: 'post',
        menuCode: '02-01-04',
        title: '资产列表',
        keys: ['start_time', 'id', 'end_time', 'is_page', 'assets_url', 'assets_ip', 'area_name', 'assets_zone', "assets_type", "port", "os_type", 'rows', 'page', "isPage", "assets_name"]
    },
    // (添加)更新资产
    assetsUpdate: {
        url: `${path}asset/updateAssets`,
        method: 'post',
        keys: [
            'assets_id', 'assets_name', 'assets_url', 'assets_ip', 'assets_network_ports', 'assets_network_type', 'assets_type', 'assets_important',
            'assets_os_type', 'assets_manger', 'assets_creatuser', 'assets_desc', 'assets_detail', 'assets_hostname', 'assets_numbering',
            'assets_zone'
        ]
    },
    // (添加)资产
    assetsAdd: {
        url: `${path}asset/addAssets`,
        method: 'post',
        keys: ['assets_name', 'assets_url', 'assets_ip', 'assets_network_ports', 'assets_network_type', 'assets_type', 'assets_important',
            'assets_os_type', 'assets_manger', 'assets_creatuser', 'assets_desc', 'assets_detail', 'assets_hostname', 'assets_numbering',
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
        keys: ['is_page', 'page', 'rows', 'target_id', 'vuln_level', 'vuln_type', 'assets_id', 'vuln_name', 'vuln_time', 'start_time', 'end_time']
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
        menuCode: '09-02-08',
        keys: ['user_name', 'page', 'rows', 'user_id']
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
        keys: ['userName', 'trueName', 'email', 'phone', 'company', 'IDCard', 'roleId']
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
        keys: ['username', 'rows', 'page']
    },
    //操作日志
    optLogSearch:{
        url: `${path}log/optLogSearch`,
        method: 'post',
        menuCode: '10-03-02',
        keys: ['username', 'rows', 'page']
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
    },
    // 用户修改权限
    addPermission: {
        url: `${path}user/addPermission`,
        method: 'post',
        keys: ['user_ids', 'menu_ids']
    },
    // 获取当前用户权限
    getPermission: {
        url: `${path}user/getPermission`,
        method: 'post',
        keys: ['user_id']
    },
    //资产区域列表
    getArea: {
        url: `${path}asset/getArea`,
        method: 'post',
        keys: ''
    },
    //资产类型列表
    assetsType: {
        url: `${path}asset/assetsType`,
        method: 'post',
        keys: ''
    },
    //风险类型列表
    vulnTypeSearch: {
        url: `${path}vuln/vulnTypeSearch`,
        method: 'post',
        keys: ''
    },
    //风险、工单数据配置
    getDataDict: {
        url: `${path}dataDict/getDataDict`,
        method: 'post',
        keys: ['vuln_vHigh','vuln_high','vuln_middle','vuln_low','vuln_vLow','is_email','work_vHigh','work_high','work_middle','work_low','work_vLow']
    },
    updateDataDict: {
        url: `${path}dataDict/updateDataDict`,
        method: 'post',
        keys: ['vuln_vHigh','vuln_high','vuln_middle','vuln_low','vuln_vLow','is_email','work_vHigh','work_high','work_middle','work_low','work_vLow']
    },
   
    //删除资产区域
    deleteArea: {
        url: `${path}asset/deleteArea`,
        method: 'post',
        keys: ['area_id']
    },
    //添加资产区域
    addArea: {
        url: `${path}asset/addArea`,
        method: 'post',
        keys: ['area_name']
    },
    //修改资产区域
    updateArea: {
        url: `${path}asset/updateArea`,
        method: 'post',
        keys: ['area_name','area_id']
    },
    //添加资产区域
    addAssetsType: {
        url: `${path}asset/addAssetsType`,
        method: 'post',
        keys: ['name','desc']
    },
    //修改资产区域
    updateAssetsType: {
        url: `${path}asset/updateAssetsType`,
        method: 'post',
        keys: ['name','desc','id']
    },
    //修改资产区域
    deleteAssetsType: {
        url: `${path}asset/deleteAssetsType`,
        method: 'post',
        keys: ['id']
    },
    //风险类型删除
    deleteVulnType: {
        url: `${path}vuln/deleteVulnType`,
        method: 'post',
        keys: ['vuln_type_keyword','vuln_type_name']
    },
    //风险类型添加
    addVulnType: {
        url: `${path}vuln/addVulnType`,
        method: 'post',
        keys: ['vuln_type_keyword','vuln_type_name']
    },
    //风险类型修改
    updateVulnType: {
        url: `${path}vuln/updateVulnType`,
        method: 'post',
        keys: ['vuln_type_keyword','vuln_type_name']
    },
    //资产信息端口服务
    getServiceList: {
        url: `${path}asset/getServiceList`,
        method: 'post',
        keys: ['assets_id','is_new']
    },
    // 文件下载
    exportFile: {
        type: 'file',
        method: 'get'
    },
    //资产导入
    assetsImport: {
        url: `${path}asset/assetsImport`,
        method: 'post',
        type: 'upload'
    },
    //资产导出
    exportExcel: {
        url: `${path}asset/exportExcel`,
        method: 'post',
        keys: ['']
    },
    //业务功能
    getLogicByAsset: {
        url: `${path}logic/getLogicByAsset`,
        method: 'post',
        keys: ['assets_id']
    },
    //资产总数
    getAssetsNum: {
        url: `${path}asset/getAssetsNum`,
        method: 'post',
        keys: ['target_id']
    },
    //设备类型统计
    getAssetsClass: {
        url: `${path}asset/getAssetsClass`,
        method: 'post',
        keys: ['flag']
    },
    //新发现域名信息
    getNewAssets: {
        url: `${path}asset/getNewAssets`,
        method: 'post',
        keys: ['flag'],
        title:'新发现域名信息'
    },
    //资产增加趋势
    getAssetsTrend: {
        url: `${path}asset/getAssetsTrend`,
        method: 'post',
        keys: [''],
        title:'资产增加趋势'
    },
    //新发现应用信息
    getAssetsApplication: {
        url: `${path}asset/getAssetsApplication`,
        method: 'post',
        keys: ['flag','rows','page'],
        title:'新发现应用信息'
    },
     //用户认证配置查询
     getUserConfig: {
        url: `${path}user/getUserConfig`,
        method: 'post',
        keys: [
        'config_id',
        'min_length',
        'max_length',
        'complex',
        'lowercase',
        'capital',
        'number',
        'cycle',
        'term',
        'remind',
        'handle',
        'error_number'],
        title:'用户认证配置查询'
    },
     //用户认证编辑
     updateUserConfig: {
        url: `${path}user/updateUserConfig`,
        method: 'post',
        keys: [
        'config_id',
        'min_length',
        'max_length',
        'complex',
        'lowercase',
        'capital',
        'number',
        'cycle',
        'term',
        'remind',
        'handle',
        'error_number'],
        title:'用户认证编辑'
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
// const gernerater = () => {
//     for (let key in ApiSchema) {
//         if (!ApiSchema[key].type) {
//             Api[key] = (params) => {
//                 return _axios({
//                     method: ApiSchema[key].method,
//                     url: ApiSchema[key].url,
//                     menuCode: ApiSchema[key].menuCode,
//                     title: ApiSchema[key].title,
//                     [ApiSchema[key].method === 'post' ? 'data' : 'params']: filterKey(params, ApiSchema[key].keys)
//                 })
//             }
//         } else {
//             Api[key] = (url) => {
//                 return _axios({
//                     method: 'get',
//                     url: url,
//                     baseURL: location.origin,
//                     headers: {
//                         accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
//                     },
//                     responseType: 'blob'
//                 })
//             }
//         }
//     }
// }

function gernerater() {
    for (let key in ApiSchema) {
      if (!ApiSchema[key].type) {
        Api[key] = (params) => {
            return _axios({
                method: ApiSchema[key].method,
                url: ApiSchema[key].url,
                menuCode: ApiSchema[key].menuCode,
                title: ApiSchema[key].title,
                [ApiSchema[key].method === 'post' ? 'data' : 'params']: filterKey(params, ApiSchema[key].keys)
            })
        }
      } else if (ApiSchema[key].type === 'file') {
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
      } else {
        Api[key] = (data) => {
          return _axios({
            method: ApiSchema[key].method,
            url: ApiSchema[key].url,
            data: data
          })
        }
      }
    }
  }

gernerater()

export default Api