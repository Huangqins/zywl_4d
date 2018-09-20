
<template>
  <div style="height:100%;">
    <el-transfer style="text-align: left; display: inline-block" v-model="transferValue" :titles="['全选', '全选']" :button-texts="['移除', '添加到资产组']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" @change="handleChange" :data="assetsdata">
      <div slot-scope="{ option }" class="option">
        <li>{{option.assetsName_ladel}}</li>
        <li>{{option.assetsUrl_ladel}}</li>
        <li>{{option.assetsIP_ladel}}</li>
      </div>
      <div slot="left-footer" class="left-footer">
        <div class="options">
          <el-select v-model="areaVa" placeholder="区域名称" filterable @change="areaChange" clearable >
            <el-option v-for="(item,index) in area" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="etDataVa" filterable placeholder="设备类型" @change="areaChange" clearable >
            <el-option v-for="(item,index) in etData" :key="index+'a'" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="osDataVa" filterable placeholder="操作系统" @change="areaChange" clearable >
            <el-option v-for="(item,index) in osData" :key="index+'b'" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入端口" :clearable="true"  v-model="port" @keyup.enter.native="areaChange"></el-input>
        </div>
        <div class="header">
          <ul>
            <li>资产名称</li>
            <li>资产URL</li>
            <li>资产IP</li>
          </ul>
        </div>
      </div>
      <div slot="right-footer" class="right-footer">
        <div class="name">
          项目测试组名称:
          <el-input placeholder="请输入项目测试组名称" style="width:60%;padding-left:10px;margin-right:10px;" v-model="group_name"></el-input>
          <el-button type="text" @click="setGroup">确定</el-button>
        </div>
      </div>
    </el-transfer>
  </div>
</template>
<script>
import { debounce } from "@/utils";
import route from "mixins/route";
export default {
  mixins: [route],
  data() {
    return {
      data: [],
      area: [],
      areaVa: "",
      etDataVa: "",
      etData: [],
      value3: [],
      transferValue: [],
      osDataVa: "",
      osData: [],
      assetsdata: [],
      group_name: "",
      port: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  created() {
    this.getArea();
    this.assetsType();
    this.getOSType();
    this.assetsInfo({ is_page: 1 });
    if (this.pageInfo.group_code) {
      this.getAssetsGroupList();
      this.group_name = this.pageInfo.group_name;
    }
  },
  methods: {
    // 编辑状态下获取已选中资产
    async getAssetsGroupList() {
      let res = await this.$api.getAssetsGroupList({
        group_code: this.pageInfo.group_code
      });
      if (res.data.result === 0) {
        this.transferValue = res.data.rows.map(item => {
          return item.assets_id;
        });
      }
    },
    setGroup() {
      console.log(this.pageInfo.group_code)
      if (this.pageInfo.group_code) {
        this.updateAssetsGroup();
      } else {
        // this.addGroup();
      }
    },
    async addGroup() {
      let params = {
        assets_ids: Array.from(new Set( this.transferValue)),
        group_name: this.group_name
      };
      let res = await this.$api.assetsGroup(params);
      if (res.data.result === 0) {
        this.$message.success("添加成功");
        this.$router.push("/taskManage/customTestGroup");
      }
    },
    // 修改测试组
    async updateAssetsGroup() {
      let params = {
        assets_ids: Array.from(new Set(this.transferValue)),
        group_name: this.group_name,
        group_code: this.pageInfo.group_code
      };
      let res = await this.$api.updateAssetsGroup(params);
      if (res.data.result === 0) {
        this.$message.success("修改成功");
      }
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    areaChange() {
      let params = {
         is_page: 1,
        area_id: this.areaVa,
        id: this.etDataVa,
        os_type: this.osDataVa,
        port: this.port
      }
      this.assetsInfo(params)
    },
    async assetsInfo(params) {
      let res = await this.$api.assetsInfo(params);
      if (res.data.result === 0) {
        let data = res.data.rows;
        this.assetsdata = data.map((item, index) => {
          return {
            key: item.assets_id,
            assetsIP_ladel: item.assets_ip,
            assetsUrl_ladel: item.assets_url,
            assetsName_ladel: item.assets_name
          };
        });
        // console.log(this.assetsdata)
      }
    },
    async getArea() {
      let res = await this.$api.getArea();
      if (res.data.result === 0) {
        this.area = res.data.areas.map(item => {
          return { label: item.area_name, value: item.area_id };
        });
        console.log(this.area);
      }
    },
    async assetsType() {
      let res = await this.$api.assetsType();
      if (res.data.result === 0) {
        this.etData = res.data.assetsType.map(item => {
          return { label: item.name, value: item.id };
        });
      }
    },
    async getOSType() {
      let res = await this.$api.getOSType();
      if (res.data.result === 0) {
        this.osData = res.data.assets.map(item => {
          return { label: item.assets_hostname, value: item.assets_os_type };
        });
      }
    }
  }
};
</script>
<style lang="scss">
.el-transfer {
  width: 100%;
  height: 100%;
}
.el-transfer-panel .el-transfer-panel__footer {
  top: 38px;
}
.el-transfer-panel {
  width: calc(50% - 92px);
  // height: calc(100% - 20px);
}
.el-transfer-panel__body {
  height: 770px;
}
.el-transfer-panel__body.is-with-footer {
  margin-top: 78px;
  padding-bottom: 0;
}
.el-transfer-panel .el-transfer-panel__footer {
  z-index: 0;
}
.el-transfer-panel .el-transfer-panel__header,
.el-transfer-panel,
.el-transfer-panel .el-transfer-panel__footer {
  background: rgb(43, 53, 68);
  border: none;
}

.el-transfer-panel__list {
  height: 770px;
  background: rgb(43, 53, 68);
}
.header {
  padding-left: 36px;
  ul {
    display: flex;
  }
  li {
    flex: 1;
    text-align: center;
  }
}
.option {
  display: flex;
  li {
    flex: 1;
    text-align: center;
  }
}
.options {
  display: flex;
  justify-content: center;
  & > div {
    flex: 1;
    margin: 5px;
  }
  background: rgb(43, 53, 68);
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.name {
  padding-left: 20px;
}
.el-transfer-panel__item.el-checkbox {
  color: #fff;
}
.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
  color: #fff;
}
</style>