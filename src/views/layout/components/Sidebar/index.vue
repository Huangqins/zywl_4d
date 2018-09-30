<template>
    <div class="side-bar-container">
        <!-- 侧边栏 -->
        <el-scrollbar style="height: 100%">
            <el-menu class="side-bar-menu" background-color="#2b3544" text-color="#18BB9A" active-text-color="#D1FFFF" :collapse="isCollapse">
                <sideitem-bar v-for="(item, index) in menuCodeList" :key="index" :item="item" :base-path="item.path"></sideitem-bar>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import sideitemBar from "./SidebarItem";
import { getMenu } from "@/utils/auth";
import { deepClone } from "@/utils";

export default {
  computed: {
    ...mapGetters(["isCollapse"])
  },
  components: {
    sideitemBar
  },
  created() {
    this.menuCode = JSON.parse(getMenu()).map(item => item.menu_code);
    this.menuGernerator()
  },
  data() {
    return {
      menuCode: [],
      menuCodeList: [],
      menuList: [
        {
          path: "/dashboard",
          title: "首页",
          icon: "home",
          menuCode: '01'
        },
        {
          // 资产管理
          path: "/assetsManage",
          title: "资产管理",
          icon: "assetsManage",
          menuCode: '02',
          children: [
            {
              path: "assetsInfo",
              title: "资产信息",
              menuCode: '02-01'
            },
            {
              path: "assetsCount",
              title: "资产统计",
              menuCode: '02-02'
            }
          ]
        },
        {
          // 任务管理
          path: "/taskManage",
          title: "任务管理",
          icon: "taskManage",
          menuCode: '03',
          children: [
            {
              path: "customTestGroup",
              title: "自定义测试组",
              menuCode: '03-03'
            },
            {
              path: "taskInfo",
              title: "任务信息",
              menuCode: '03-01'
            }
          ]
        },
        {
          // 风险管理
          path: "/holeManage",
          title: "风险管理",
          icon: "holeManage",
          menuCode: '04',
          children: [
            {
              path: "holeInfo",
              title: "风险信息",
              menuCode: '04-01'
            },
            {
              path: "holeFollow",
              title: "风险跟踪",
              menuCode: '04-02'
            },
            {
              path: "holeCount",
              title: "风险统计",
              menuCode: '04-03'
            }
          ]
        },
        {
          // 工单管理
          path: "/workManage",
          title: "工单管理",
          icon: "workManage",
          menuCode: '05',
          children: [
            {
              path: "workInfo",
              title: "工单信息",
              menuCode: '05-01',
            },
            {
              path: "workPending",
              title: "待办工单",
              menuCode: '05-02'
            }
          ]
        },
        {
          // 统计分析
          path: "/statisticalAnalysis",
          title: "统计分析",
          icon: "statisticalAnalysis",
          menuCode: '06',
          children: [
            {
              path: "LoopholeRatioReport",
              title: "漏洞环比统计报表",
              menuCode: '06-01'
            },
            {
              path: "NetworkSecurityReport",
              title: "网络安全整改报表",
              menuCode: '06-02'
            }
          ]
        },
        {
          path: "/knowledgeManagement",
          title: "知识管理",
          icon: "knowledgeManagement",
          menuCode: '07',
          children: [
            {
              path: "vulnDatabase",
              title: "漏洞库信息",
              menuCode: '07-01'
            },
            {
              path: "ComplianceLibrary",
              title: "合规库信息",
              menuCode: '07-02'
            },
            {
              path: "information",
              title: "资讯信息",
              menuCode: '07-03'
            }
          ]
        },
        {
          path: "/reportManagement",
          title: "报告管理",
          icon: "reportManagement",
          menuCode: '08'
        },
        {
          path: "/userManagement",
          title: "用户管理",
          icon: "userManagement",
          menuCode: '09',
          children: [
            {
              path: "propertyManagement",
              title: "权限管理",
              menuCode: '09-01'
            },
            {
              path: "userLists",
              title: "用户列表",
              menuCode: '09-02'
            }
          ]
        },
        {
          path: "/systemManagement",
          title: "系统管理",
          icon: "systemManagement",
          menuCode: '10',
          children: [
            {
              path: "interfaces",
              title: "接口配置",
              menuCode: '10-01'
            },
            {
              path: "configurations",
              title: "参数配置",
              menuCode: '10-02'
            },
            {
              path: "logsManagement",
              title: "日志管理",
              menuCode: '10-03'
            },
            {
              path: "systemState",
              title: "系统状态",
              menuCode: '10-04'
            },
            {
              path: "dataDictionary",
              title: "数据字典配置",
              menuCode: '10-05'
            },
            {
              path: "PolicySettings",
              title: "策略配置",
              menuCode: '10-06'
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 菜单生成
    menuGernerator() {
      let ret = this.menuList.filter(item => {
        return this.menuCode.some(it => {
          return item.menuCode === (it.length > 2 ? it.slice(0, 2) : it);
        });
      });
      let copy = deepClone(ret);
      copy.forEach(item => {
        if (item.children) {
          item.children = [];
        }
      });
      ret.forEach((item, index) => {
        this.menuCode.forEach(its => {
          if (item.children) {
            item.children.forEach(it => {
              if (its === it.menuCode) {
                copy[index].children.push(it);
              }
            });
          }
        });
      });
      this.menuCodeList = copy;
    }
  }
};
</script>
<style lang="scss" scoped>
.side-bar-container {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  box-shadow: 1px 1px 4px 1px #202731;
  z-index: 9999;
  overflow: hidden;
}

.el-menu {
  border-right: none;
  // width: 100% !important;
  overflow-x: hidden;
}

// .el-submenu .el-menu-item {
//     width: 152px;
// }
.side-bar-menu:not(.el-menu--collapse) {
  width: 150px;
  min-height: 100%;
}

.el-menu--collapse {
  width: 50px;
  // transition: width 0.2s;
  min-height: 100%;
}
</style>


