<template>
  <div class="panel-item" @mouseover="more = true" @mouseout="more = false">
    <svg-icon icon-class="more" :style="morePos" @click.native="openMenu" v-if="more"></svg-icon>
    <div class="content">
      <div class="text">
        <p>资产数量:{{item.asset_id}}</p>
        <p>测试组名称:{{item.group_name}}</p>
      </div>
      <div>
        <el-button @click="addTask">添加任务测试</el-button>
      </div>
    </div>
    <ul class="panel-menu" :style="{top: 16 + 'px', right: 6 + 'px'}" v-if="menu">
      <li @click="open">
        <svg-icon icon-class="delete"></svg-icon> 删除
      </li>
      <li @click="editItem">
        <svg-icon icon-class="edit" style="margin-right:5px;"></svg-icon>
        编辑
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      typeArr: [],
      cycleArr: [],
      strageArr: [],
      dialogTableVisible: false,
      menu: false,
      more: false,
      morePos: {
        position: "absolute",
        top: "16px",
        right: "6px",
        fontSize: "22px",
        zIndex: 99,
        cursor: "pointer"
      }
    };
  },
  methods: {
    open() {
      this.$confirm("此操作将永久删除, 是否继续?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteItem();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    openMenu() {
      this.menu = true;
    },
    closeMenu() {
      this.menu = false;
    },
    editItem() {
      console.log(this.item);
      this.$router.push({
        name: "assetsGroup",
        params: {
          group_code: this.item.group_code,
          group_name: this.item.group_name
        }
      });
    },
    deleteItem() {
      this.$emit("deletItem", this.item);
    },
    addTask() {
      // this.dialogTableVisible = true;
      this.$emit("add", this.item);
    }
  },
  mounted() {
    // 需要调整为捕获
    document.body.addEventListener("click", this.closeMenu, true);
  },
  beforeDestroy() {
    document.body.addEventListener("click", this.closeMenu, true);
  }
};
</script>

<style scoped lang="scss">
.panel-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  margin-top: 40px;
  font-size: 14px;
  letter-spacing: 1px;
  .text {
    text-align: left;
  }
  .option {
    text-align: center;
  }
}
</style>