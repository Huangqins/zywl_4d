<template>
    <div class="authority">
        <div class="form">
          <div class="title" v-if="pageInfo.user_id">修改用户权限</div>
          <div class="title" v-else>{{pageInfo.role_id ? '修改角色': '添加角色'}}</div>
            <div class="form-content">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item :label="!pageInfo.user_id?'角色名称':'用户名'">
                    <el-input v-model="form.role_name"></el-input>
                </el-form-item>
                <el-form-item label="角色等级" v-if="!pageInfo.user_id">
                    <el-select v-model="form.role_level" placeholder="请选择角色等级">
                        <el-option label="一级" value="2"></el-option>
                        <el-option label="二级" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-top:50px;">
                    <el-button type="primary" @click="onSubmit">保存提交</el-button>
                    <el-button style="margin-left:129px;">取消</el-button>
                </el-form-item>
            </el-form>
            </div>
        </div>

        <div class="tree">
          <div class="title">权限选择</div>
            <el-scrollbar style="height:100%">
               <el-tree :data="treeList" show-checkbox node-key="id" :props="defaultProps" ref="tree">
            </el-tree>
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import route from 'mixins/route'

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
  mixins: [route],
  data() {
    return {
      form: {
        role_name: "",
        role_level: ""
      },
      treeList: [],
      rolePerList: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    let params = { role_id: "" };
    this.getPermissionByRole(params); // 获取所有权限列表
    if (this.pageInfo.role_id) { // 角色时候情况
      this.getPermissionByRole({ role_id: this.pageInfo.role_id })
      this.form.role_name = this.pageInfo.role_name
      this.form.role_level = this.pageInfo.role_level + ''
    } else if (this.pageInfo.user_id) { // 用户设置权限时候情况
      this.form.role_name = this.pageInfo.user_name;
      this.getPermission({user_id: this.pageInfo.user_id[0]})
    }
  },
  methods: {
    onSubmit() {
      let { role_name, role_level } = this.form;
       let params = {};
      if(this.pageInfo.user_id) {
          params = { user_ids: this.pageInfo.user_id,menu_ids: this.$refs.tree.getCheckedKeys()}
          this.addPermission(params)
      } else {
          params = {role_name, role_level,
          role_id: this.pageInfo.role_id ? this.pageInfo.role_id : '',
          menu_id: this.$refs.tree.getCheckedKeys()
        };
        this.addRolePermission(params);
      }
       
    },
    async addPermission(params) {
      let res = await this.$api.addPermission(params);
      if (res.data.result === 0) {
         this.$message.success(`操作成功`);
         this.$router.push('/userManagement/userLists');
      }
    },
    // 获取用户权限
    async getPermission(params) {
      let res = await this.$api.getPermission(params);
      if (res.data.result === 0) {
        let menus = res.data.menus.map(item => item.menu_id)
        this.$refs.tree.setCheckedKeys(menus);
      }
    },
    // 获取角色权限
    async getPermissionByRole(params) {
      let res = await this.$api.getPermissionByRole(params);
      if (res.data.result === 0) {
        if(!params.role_id) {
          this.treeList = setTree(res.data.menus);
        } else {
          this.rolePerList = res.data.role.map(item => item.menu_id)
          this.$refs.tree.setCheckedKeys(this.rolePerList);
        }
      }
    },
    async addRolePermission(params) {
      let res = await this.$api.addRolePermission(params);
      if (res.data.result === 0) {
        this.$message.success(`操作成功`);
        this.$router.push('/userManagement/propertyManagement');
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
  height: 100%;
  .title {
    text-align: center;
    margin: 0 0 21px 0;
    color: #D1FFFF;
  }
  .form {
    width: 492px;
    height: 454px;
    // margin-top: 43px;
    margin-right: 26px;
    
    
    // padding: 0 57px;
    .form-content {
      width: 492px;
      background: rgba(38, 49, 67, 1);
      box-shadow: 4px 0px 4px rgba(29, 36, 46, 1);
      height: 412px;
      padding: 50px 57px 0 57px;
    }
    .el-select {
      display: block;
    }
  }
  .tree {
    flex: 1;
    height:100%;
    box-shadow:4px 0px 4px rgba(29,36,46,1);
  }
  .el-tree {
    background-color: #171f2b;
    color: #cad5db;
  }
}
</style>

<style lang="scss">
.el-tree-node {
  background-color: #2d384a;
}
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



