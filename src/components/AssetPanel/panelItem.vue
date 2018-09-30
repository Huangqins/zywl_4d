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
            <li @click="deleteItem">
                <svg-icon icon-class="delete"></svg-icon>
                删除
            </li>
            <li @click="editItem">
                <svg-icon icon-class="edit" style="margin-right:5px;"></svg-icon>
                编辑
            </li>
        </ul>
       <!-- 确认删除 -->
        <el-dialog title="删除确认" :visible.sync="deleteVisible" width="30%">
        <p style="font-size:18px;overflow:hidden;">
            <i class="el-icon-warning" style="color:#FFCC33;font-size:30px;display:inline-block;vertical-align:middle;margin-right:5px;"></i>该操作不可撤回,是否确认删除该条数据?</p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="deletesure">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                deleteVisible:false,
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
            }
        },
        methods: {
            
            openMenu() {
                this.menu = true;
                
            },
            closeMenu() {
                this.menu = false;
            },
            editItem() {
              console.log(this.item)
              this.$router.push({
                  name: 'assetsGroup',
                  params: {
                      group_code: this.item.group_code,
                      group_name: this.item.group_name
                  }
              })  
            },
            deleteItem() {
                this.deleteVisible=true;
                // console.log(this.item)
            },
            deletesure(){
                
            },
            addTask() {
                // this.dialogTableVisible = true;
                this.$emit('add', this.item)
            }
        },
        mounted() {
            // 需要调整为捕获
            document.body.addEventListener("click", this.closeMenu,true);
        },
        beforeDestroy() {
            document.body.addEventListener("click", this.closeMenu,true);
        }
    }
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