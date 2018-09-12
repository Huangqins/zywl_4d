<template>
    <div class="authority">
        <div class="form">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.role_name"></el-input>
                </el-form-item>
                <el-form-item label="角色等级">
                    <el-select v-model="form.role_level" placeholder="请选择角色等级">
                        <el-option label="一级" value="2"></el-option>
                        <el-option label="二级" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-top:50px;">
                    <el-button type="primary" @click="onSubmit">保存提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="tree">
            <el-tree :data="treeList" show-checkbox node-key="id" :props="defaultProps" ref="tree">
            </el-tree>
        </div>
    </div>
</template>
<script>
function setTree(list) {
  let res = [];
  let firstFloor = [];
  list.forEach((item, index) => {
    if (item.father_id === 0) {
      firstFloor.push({
        id: item.menu_id,
        label: item.menu_name,
        children: findMenu(list, item.menu_id)
      });
    }
  });
  return firstFloor;
}
// 找出下级所属的菜单
function findMenu(list, menu_id) {
  let res = [];
  list.forEach(item => {
    if (item.father_id == menu_id) {
      res.push({
        id: item.menu_id,
        label: item.menu_name,
        children: findMenu(list, item.menu_id)
      });
    }
  });
  return res;
}

export default {
  data() {
    return {
      form: {
        role_name: "",
        role_level: ""
      },
      treeList: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    let params = { role_id: "" };
    this.getPermissionByRole(params);
  },
  methods: {
    onSubmit() {
      let { role_name, role_level } = this.form;
      let params = {
        role_name,
        role_level,
        role_id: "",
        menu_id: this.$refs.tree.getCheckedKeys()
      };
      this.addRolePermission(params);
    },
    async getPermissionByRole(params) {
      let res = await this.$api.getPermissionByRole(params);
      if (res.data.result === 0) {
        this.treeList = setTree(res.data.menus);
      }
    },
    async addRolePermission(params) {
      let res = await this.$api.addRolePermission(params);
      if (res.data.result === 0) {
        this.$message.success(`添加成功`);
      } else if (res.data.result === 4) {
        this.$message.error(`角色等级不能高于当前用户的角色等级`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.authority {
  display: flex;
  .form {
    width: 492px;
    height: 454px;
    margin-right: 26px;
    background: rgba(38, 49, 67, 1);
    box-shadow: 4px 0px 4px rgba(29, 36, 46, 1);
    padding: 17px 57px 0 57px;
    .el-select {
      display: block;
    }
  }
  .tree {
    flex: 1;
  }
  .el-tree {
    background-color: #171f2b;
    color: #cad5db;
  }
}
</style>

<style lang="scss">
.el-tree-node__content {
  padding: 15px 0;
}
.el-tree-node__content:hover {
  background-color: #2d384a;
}
.el-tree-node:focus > .el-tree-node__content {
  background-color: #2d384a;
}
</style>



