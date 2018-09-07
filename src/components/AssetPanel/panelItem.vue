<template>
    <div class="panel-item" @mouseover="more = true" @mouseout="more = false">
        <svg-icon icon-class="more" :style="morePos" @click.native="openMenu" v-if="more"></svg-icon>
        <div class="content">
           <div class="text">
               <p>资产数量:{{item.value}}</p>
               <p>任务名称:{{item.name}}</p>
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
            <li>
                <svg-icon icon-class="edit" style="margin-right:5px;"></svg-icon>
                编辑
            </li>
        </ul>
        <!--  弹框 -->
        <el-dialog title="添加任务测试" :visible.sync="dialogTableVisible" width="28%">
            <el-form :model="form" label-width="100px" ref="form">
                <el-form-item label="任务名称" prop="target_name">
                    <el-input v-model="form.target_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务策略" prop="target_teststra">
                    <el-select v-model="form.target_teststra" placeholder="请选择任务测试" style="width:100%">
                        <el-option v-for="(item,index) in strageArr" :key="index + 'e'" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务周期" prop="target_cycle">
                    <el-select v-model="form.target_cycle" placeholder="请选择任务周期" style="width:100%">
                        <el-option v-for="(item, index) in cycleArr" :key="index + 'd'" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="测试类型" prop="type_name">
                    <el-select v-model="form.type_name" placeholder="请选择测试类型" style="width:100%">
                        <el-option v-for="(item,index) in typeArr" :key="index + 'a'" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="target_starttime">
                    <el-date-picker v-model="form.target_starttime" type="datetime" placeholder="选择开始时间" style="width:100%">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button >取 消</el-button>
                <el-button type="primary">添加任务</el-button>
            </div>
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
                },
                form: {
                    target_name: "渗透测试+",
                    target_teststra: "",
                    target_starttime: new Date(),
                    target_cycle: "",
                    target_url: "",
                    asset_ids: "",
                    target_ip: "",
                    type_id: 1,
                    type_name: "",
                    task_type_id: "",
                    userName: ''
                },
            }
        },
        methods: {
            openMenu() {
                this.menu = true;
            },
            closeMenu() {
                this.menu = false;
            },
            deleteItem() {
                console.log('删除')
            },
            addTask() {
                this.dialogTableVisible = true;
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