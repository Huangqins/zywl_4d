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
    //最新资讯
    getInformation: {
        url: `${path}kb/getInformation`,
        method: 'post',
        keys: ['is_page', 'page', 'rows']
    },
    vulnrepair: {
        url: `${path}vuln/repairRate`,
        method: 'post',
        title: '修复率',
        keys: ['target_id']
    },
    // 高中低风险状况/总览
    vulnTotal: {
        url: `${path}vuln/vulnTotal`,
        method: 'post',
        title: '高中低风险状况/总览',
        keys: ['target_id', 'assets_id']
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
        keys: ['group_code', 'assets_ids', 'group_name']
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
    // 终止任务
    stopTarget: {
        url: `${path}task/stopTarget`,
        method: 'post',
        title: '终止任务',
        keys: ['target_id', 'target_struts']
    },
    // 业务功能结构图
    getLogicList: {
        url: `${path}logic/getLogicList`,
        method: 'post',
        title: '业务功能结构图',
        keys: ['target_id']
    },
    // 业务功能
    getLogic: {
        url: `${path}logic/getLogic`,
        method: 'post',
        title: '业务功能',
        keys: ['target_id']
    },
    // 任务目标情况 
    // targetGoalSure: {
    //     url: `${path}task/targetProgress`,
    //     method: 'post',
    //     title: '任务目标情况/扫描次数和执行阶段',
    //     keys: ['target_id']
    // },
    //新发现资产 
    targetNewAsset: {
        url: `${path}task/targetNewAsset`,
        method: 'post',
        title: '新发现资产',
        keys: ['target_id']
    },
    // 扫描次数和执行阶段/任务目标情况 
    targetProgress: {
        url: `${path}task/targetProgress`,
        method: 'post',
        title: '任务目标情况/扫描次数和执行阶段',
        keys: ['target_id']
    },
    // 资产列表
    assetsInfo: {
        url: `${path}asset/assetsInfo`,
        method: 'post',
        menuCode: '02-01-04',
        title: '资产列表',
        keys: ['start_time', 'id', 'end_time', 'is_page', 'assets_url', 'assets_ip', 'area_name', 'assets_zone', "assets_type", "port", "os_type", 'rows', 'page', "isPage", "assets_name", "area_id"]
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
        title: '风险列表',
        keys: ['is_page', 'page', 'rows', 'target_id', 'vuln_level', 'vuln_type', 'assets_id', 'vuln_name', 'vuln_time', 'start_time', 'end_time']
    },
    // 风险top10
    vulnTopTen: {
        url: `${path}asset/vulnTopTen`,
        method: 'post',
        title: '风险top10',
        keys: ''
    },
    // 进展分析总体整改情况
    vulnCorrective: {
        url: `${path}vuln/vulnCorrective`,
        method: 'post',
        title: '风险top10',
        keys: ''
    },
    //资产类型风险分布
    getVulnLevel: {
        url: `${path}asset/getVulnLevel`,
        method: 'post',
        title: '资产类型风险分布',
        keys: ''
    },
    // 区域漏洞分布
    getAreaVuln: {
        url: `${path}asset/getAreaVuln`,
        method: 'post',
        title: '区域漏洞分布',
        keys: ''
    },
    // 风险变化趋势
    vulnTrend: {
        url: `${path}vuln/vulnTrend`,
        method: 'post',
        title: '风险变化趋势',
        keys: ['startTime', 'endTime', 'area_id', 'assets_id', 'target_id']
    },
    // 漏洞数量统计 /风险类型分布
    vulnNumTotal: {
        url: `${path}vuln/vulnNumTotal`,
        method: 'post',
        title: '漏洞数量统计/风险类型分布',
        keys: ''
    },
    // 工单信息--列表
    getOrderList: {
        url: `${path}order/getOrderList`,
        method: 'post',
        title: '工单信息--列表',
        keys: ['order_name', 'order_type', 'order_status']
    },
    // 工单 任务名称
    getTargetName: {
        url: `${path}order/getOrderList`,
        method: 'post',
        title: '工单信息--任务名称',

        keys: ''
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
    optLogSearch: {
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
        keys: ['vuln_vHigh', 'vuln_high', 'vuln_middle', 'vuln_low', 'vuln_vLow', 'is_email', 'work_vHigh', 'work_high', 'work_middle', 'work_low', 'work_vLow']
    },
    updateDataDict: {
        url: `${path}dataDict/updateDataDict`,
        method: 'post',
        keys: ['vuln_vHigh', 'vuln_high', 'vuln_middle', 'vuln_low', 'vuln_vLow', 'is_email', 'work_vHigh', 'work_high', 'work_middle', 'work_low', 'work_vLow']
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
        keys: ['area_name', 'area_id']
    },
    //添加资产区域
    addAssetsType: {
        url: `${path}asset/addAssetsType`,
        method: 'post',
        keys: ['name', 'desc']
    },
    //修改资产区域
    updateAssetsType: {
        url: `${path}asset/updateAssetsType`,
        method: 'post',
        keys: ['name', 'desc', 'id']
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
        keys: ['vuln_type_keyword', 'vuln_type_name']
    },
    //风险类型添加
    addVulnType: {
        url: `${path}vuln/addVulnType`,
        method: 'post',
        keys: ['vuln_type_keyword', 'vuln_type_name']
    },
    //风险类型修改
    updateVulnType: {
        url: `${path}vuln/updateVulnType`,
        method: 'post',
        keys: ['vuln_type_keyword', 'vuln_type_name']
    },
    //资产信息端口服务
    getServiceList: {
        url: `${path}asset/getServiceList`,
        method: 'post',
        keys: ['assets_id', 'is_new']
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
        keys: ['assets_id', 'page', 'rows']
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
    //区域资产数量统计
    getAssetsArea: {
        url: `${path}asset/getAssetsArea`,
        method: 'post',
        keys: ['']
    },       
    //新发现域名信息
    getNewAssets: {
        url: `${path}asset/getNewAssets`,
        method: 'post',
        keys: ['flag'],
        title: '新发现域名信息'
    },
    //资产增加趋势
    getAssetsTrend: {
        url: `${path}asset/getAssetsTrend`,
        method: 'post',
        keys: [''],
        title: '资产增加趋势'
    },
    //新发现应用信息
    getAssetsApplication: {
        url: `${path}asset/getAssetsApplication`,
        method: 'post',
        keys: ['flag', 'rows', 'page'],
        title: '新发现应用信息'
    },
    //用户认证配置查询
    getUserConfig: {
        url: `${path}user/getUserConfig`,
        method: 'post',
        keys: [],
        title: '用户认证配置查询'
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
            'error_number'
        ],
        title: '用户认证编辑'
    },
    //邮件配置查询
    getEmailConfig: {
        url: `${path}system/getEmailConfig`,
        method: 'post',
        keys: [],
        title: '邮件配置查询'
    },
    //邮件配置修改
    updateEmailConfig: {
        url: `${path}system/updateEmailConfig`,
        method: 'post',
        keys: [
            'mail_username',
            'mail_password',
            'mail_host',
            'mail_port',
            'is_ssl'
        ],
        title: '邮件配置修改'
    },
    //发邮件测试
    sendTestEmail: {
        url: `${path}system/sendTestEmail`,
        method: 'post',
        keys: [
            'to',
            'mail_username',
            'mail_password',
            'mail_host',
            'mail_port',
            'is_ssl'
        ],
        title: '发邮件测试'
    },
    //系统参数配置
    getSystemParam: {
        url: `${path}system/getSystemParam`,
        method: 'post',
        keys: [],
        title: '系统参数配置'
    },
    //系统参数配置修改
    updateSystemParam: {
        url: `${path}system/updateSystemParam`,
        method: 'post',
        keys: [
            'isCode',
            'isUpdate',
            'sessionTimeOut'
        ],
        title: '系统参数配置修改'
    },
    //api接口配置
    apiList: {
        url: `${path}api/apiList`,
        method: 'post',
        keys: ['page', 'rows'],
        title: 'api接口配置'
    },
    //api删除
    deleteSystemKey: {
        url: `${path}api/deleteSystemKey`,
        method: 'post',
        keys: ['api_id'],
        title: 'api删除'
    },
    //api生成
    setSystemKey: {
        url: `${path}api/setSystemKey`,
        method: 'post',
        keys: [''],
        title: 'api生成'
    },
    //报告管理
    reportList: {
        url: `${path}report/reportList`,
        method: 'post',
        keys: ['page', 'rows','start_time','end_time','reports_name'],
        title: '报告管理'
    },
    //删除报告
    deletePDF: {
        url: `${path}report/deletePDF`,
        method: 'post',
        keys: ['report_id', 'target_id', 'reports_name'],
        title: '删除报告'
    },
    //报告下载
    downloadReport: {
        url: `${path}report/downloadReport`,
        method: 'post',
        keys: ['reports_id', 'reports_name'],
        title: 'PDF报告下载'
    },
    //报告模板
    reportModel: {
        url: `${path}report/reportModel`,
        method: 'post',
        keys: [],
        title: '报告模板'
    },
    //PDF报告创建
    exportPDFFile: {
        url: `${path}report/exportPDFFile`,
        method: 'post',
        keys: ['reports_name', 'dept_name', 'target_id', 'model'],
        title: '删除报告'
    },
    //word报告创建
    exportWord: {
        url: `${path}report/exportWord`,
        method: 'post',
        keys: ['reports_name', 'dept_name', 'target_id', 'model'],
        title: 'word报告创建'
    },
    //漏洞库列表
    kbInfo: {
        url: `${path}kb/kbInfo`,
        method: 'post',
        keys: ['page', 'rows', 'isOrder', 'vuln_name', 'start_time', 'end_time'],
        title: '漏洞库列表'
    },
    //漏洞库删除
    deleteKb: {
        url: `${path}kb/deleteKb`,
        method: 'post',
        keys: ['kb_vuln_id', 'kb_vuln_name'],
        title: '漏洞库删除'
    },
    //漏洞库添加
    addKb: {
        url: `${path}kb/addKb`,
        method: 'post',
        keys: ['kb_vuln_name', 'kb_vuln_cve', 'kb_vuln_level', 'kb_vuln_port',
            'kb_vuln_type', 'kb_vuln_class', 'kb_vuln_tool', 'kb_vuln_atme', 'kb_vuln_veme', 'kb_vuln_payload', 'kb_vuln_des', 'kb_vuln_ref'
        ],
        title: '漏洞库删除'
    },
    //漏洞库编辑
    updateKb: {
        url: `${path}kb/updateKb`,
        method: 'post',
        keys: ['kb_vuln_id', 'kb_vuln_name', 'kb_vuln_cve', 'kb_vuln_level', 'kb_vuln_port',
            'kb_vuln_type', 'kb_vuln_class', 'kb_vuln_tool', 'kb_vuln_atme', 'kb_vuln_veme', 'kb_vuln_payload', 'kb_vuln_des', 'kb_vuln_ref'
        ],
        title: '漏洞库编辑'
    },
    //漏洞库导入
    importExcel: {
        url: `${path}kb/importExcel`,
        method: 'post',
        keys: ['excelFile'],
        title: '漏洞库导入'
    },
    //漏洞库导出
    exportExcel: {
        url: `${path}kb/exportExcel`,
        method: 'post',
        keys: [''],
        title: '漏洞库导出'
    },
    //风险添加
    addInfoVuln: {
        url: `${path}vuln/addInfoVuln`,
        method: 'post',
        keys: ['vuln_url', 'assets_id', 'vuln_name', 'vuln_cve', 'vuln_level', 'vuln_port',
            'vuln_type', 'vuln_use_type', 'vuln_useInfo', 'vuln_class', 'vuln_tool', 'vuln_atme', 'vuln_veme', 'vuln_payload', 'vuln_des', 'vuln_ref'
        ],
        title: '风险添加'
    },
    //风险修改
    updateVulnInfo: {
        url: `${path}vuln/updateVulnInfo`,
        method: 'post',
        keys: ['vuln_url', 'assets_id', 'vuln_name', 'vuln_cve', 'vuln_level', 'vuln_port',
            'vuln_type', 'vuln_use_type', 'vuln_useInfo', 'vuln_class', 'vuln_tool', 'vuln_atme', 'vuln_veme', 'vuln_payload', 'vuln_des', 'vuln_ref'
        ],
        title: '风险修改'
    },
    //风险导入
    importVuln: {
        url: `${path}vuln/importVuln`,
        method: 'post',
        keys: ['excelFile'],
        title: '风险导入'
    },
    //策略配置   
    strategyList: {
        url: `${path}strategy/strategyList`,
        method: 'post',
        keys: ['group_name', 'start_time', 'end_time', 'page', 'rows'],
        title: '策略配置'
    },
    //策略新增风险列表     
    getVulnList: {
        url: `${path}strategy/getVulnList`,
        method: 'post',
        keys: ['vuln_name', 'vuln_level'],
        title: '策略风险列表'
    },
    //新增策略保存
    addStrategyGroup: {
        url: `${path}strategy/addStrategyGroup`,
        method: 'post',
        keys: ['group_name', 'group_desc', 'group_content'],
        title: '新增策略保存'
    },
    //删除策略
    deleteStrategyGroup: {
        url: `${path}strategy/deleteStrategyGroup`,
        method: 'post',
        keys: ['group_name', 'group_id'],
        title: '删除策略'
    },
    //合并策略
    mergeStrategy: {
        url: `${path}strategy/mergeStrategy`,
        method: 'post',
        keys: ['group_name', 'group_desc', 'group_content'],
        title: '合并策略'
    },
    //修改策略
    updateStrategyGroup: {
        url: `${path}strategy/updateStrategyGroup`,
        method: 'post',
        keys: ['group_name', 'group_desc', 'group_content', 'group_id'],
        title: '修改策略'
    },
    getImg: {
        url: `${path}model`,
        method: 'get',
        type: 'img'
    },
    // 创建工单
    addOrder: {
        url: `${path}order/addOrder`,
        method: 'post',
        keys: ['order_name', 'order_type', 'order_content', 'audit_user', 'urgent_type', 'expire_time', 'flag'],
        title: '创建工单'
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
        } else if (ApiSchema[key].type === 'img') {
            Api[key] = (name) => {
                return _axios({
                    method: ApiSchema[key].method,
                    url: `${ApiSchema[key].url}/${name}`
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