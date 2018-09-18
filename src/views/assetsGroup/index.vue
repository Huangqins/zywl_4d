
<template>
  <div style="height:100%;">
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="value4"
      :titles="['Source', 'Target']"
      :button-texts="['移除', '添加到资产组']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data">
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      <div slot="left-footer" class="left-footer">
          <div class="options">
             <el-select v-model="areaVa"  placeholder="区域名称" filterable  @change="areaChange">
                <el-option
                v-for="(item,index) in area"
                :key="index"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
              <el-select v-model="etDataVa" filterable placeholder="设备类型"  @change="areaChange">
            <el-option
              v-for="(item,index) in etData"
              :key="index+'a'"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>

            <el-input placeholder="请输入端口" :clearable="true"></el-input> 
          </div>
           <!-- <div class="header"><ul><li>资产名称</li><li>资产URL</li><li>资产IP</li></ul></div> -->
      </div>
      <div slot="right-footer" class="right-footer">
          <div class="name">
              项目测试组名称:<el-input placeholder="请输入项目测试组名称" style="width:60%;padding-left:10px;margin-right:10px;"></el-input>
              <el-button type="text">确定</el-button>
          </div>
      </div>
    </el-transfer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [],
        area: [],
        areaVa: '',
        etDataVa: '',
        etData: [],
        value3: [],
        value4: [],
         options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      };
    },
    created() {
        this.getArea();
        this.assetsType();
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      areaChange(value) {

      },
      async getArea() {
          let res = await this.$api.getArea();
          if (res.data.result === 0 ) {
              this.area = res.data.areas.map(item => {
                  return {label:item.area_name,value: item.area_id}
              })
              console.log(this.area)
          }
      },
      async assetsType() {
          let res = await this.$api.assetsType();
          if (res.data.result === 0) {
              this.etData = res.data.assetsType.map(item => {
                  return {label: item.name, value: item.id}
              })
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
    margin-top: 40px;
    padding-bottom: 0;
}
.el-transfer-panel .el-transfer-panel__footer {
    z-index: 0;
}
.el-transfer-panel .el-transfer-panel__header,.el-transfer-panel, .el-transfer-panel .el-transfer-panel__footer{
    background: rgb(43, 53, 68);
    border:none;
}

.el-transfer-panel__list {
    height: 770px;
    background: rgb(43, 53, 68);
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
  .name  {
      padding-left: 20px;
  }
  .el-transfer-panel__item.el-checkbox {
      color: #fff;
  }
</style>