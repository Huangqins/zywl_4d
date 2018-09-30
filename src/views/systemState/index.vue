<template>
  <div>
    <div>
      <panel>
        <div class="serviceCondition">
          <section>
            <p>CPU使用率</p>
            <div>
              <charts :chartData="CPUoption" id="canvas" height="100%"></charts>
            </div>
          </section>
          <section>
            <p>内存使用率</p>
            <div>
              <charts :chartData="EMSoption" id="EMSoption" height="100%"></charts>
            </div>
          </section>
          <section>
            <p>硬盘使用率</p>
            <div>
              <charts :chartData="HDoption" id="HDoption" height="100%"></charts>
            </div>
          </section>
        </div>
      </panel>
    </div>
    <div>
      <panel title="授权管理">
        <div class="serviceCondition">
          <section>
            <p>授权信息</p>
            <div>
              <p>目前状态: <span>{{isTry}}</span></p>
              <p>到期时间:<span>{{endTime}}</span> </p>
              <h5><i class="el-icon-search" style="margin-right:5px;"></i>
                <el-button type="text" @click="dialogVisible=true">查看授权管理</el-button>
              </h5>
            </div>
          </section>
          <section>
            <p>授权说明</p>
            <div>
              <p>1.通过“授权”向导，导入授权文件，获得激活申请文件</p>
              <p>2.获得申请文件，发送到北京智与未来信息技术有限公司，获得激活文件</p>
              <p>3.将“激活文件”通过激活向导进行导入，即可完成导入</p>
            </div>
          </section>
          <section>
            <p>授权操作</p>
            <div class="authorization">
              <div>
                <p><span></span></p>
                <el-upload multiple :action="uploadUrl" :with-credentials="true" name="license" :headers="headers" :show-upload-list="false" style="display:inline-block;margin-bottom:5px" :on-success="Success">
                  <p>激活授权</p>
                  <h5>
                    <el-button type="text">适用于首次导入授权文件</el-button>
                  </h5>
                </el-upload>
              </div>
              <div>
                <p><span class="update"></span></p>
                <el-upload multiple :action="uploadUrl" :with-credentials="true" name="license" :headers="headers" :show-upload-list="false" style="display:inline-block" :on-success="loadFileSuccess">
                  <p>更新授权</p>
                  <h5>
                    <el-button type="text">适用于激活后更新授权</el-button>
                  </h5>
                </el-upload>
              </div>

            </div>
          </section>
        </div>
      </panel>
    </div>
    <div>
      <panel title="升级管理">
        <div class="updateManage">
          <p style="margin-left:20px">注意:<span>为了保证您在使用程序的稳定性和获得最新漏洞的扫描能力，请您及时升级！</span></p>
          <div class="updateManage-title">离线包</div>
          <div class="downloadBag">

            <ul>
              <li>离线包下载地址:</li>
              <li>漏洞版本号:</li>
              <li>漏洞版本日期:</li>
              <li>升级包管理:</li>
              <li>升级日志:</li>
            </ul>
            <ul>
              <li style="color:#A5FDD5">www.xxx.com</li>
              <li style="color:#CAD5DB">#无人8329744678</li>
              <li style="color:#CAD5DB">2018-09-24</li>
              <li style="color:#18BB9A">
                <el-button type="text" style="padding:0;">查看维护升级包文件</el-button>
              </li>
              <li style="color:#18BB9A">
                <el-button type="text" style="padding:0;">查看历史升级的版本于升级时间</el-button>
              </li>
            </ul>
          </div>
          <div class="updateManage-btn">
            <el-button type="primary" style="margin-right:20px">立即升级</el-button>
            <el-button type="primary">离线升级</el-button>
          </div>
        </div>
      </panel>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div>
        <el-form ref="detailform" :model="detailform" label-width="100px">
          <el-form-item label="授权类型">
            <span class="dialogVisible">{{detailform.isTry}}</span>
          </el-form-item>
          <el-form-item label="授权用户">
            <span class="dialogVisible">{{detailform.username}}</span>
          </el-form-item>
          <el-form-item label="授权设备码">
            <span style="word-break: break-all;" class="dialogVisible">{{detailform.device}}</span>
          </el-form-item>
          <el-form-item label="硬件码">
            <span style="word-break: break-all;" class="dialogVisible">{{detailform.hardware}}</span>
          </el-form-item>
          <el-form-item label="序列号">
            <span class="dialogVisible">{{detailform.version}}</span>
          </el-form-item>
          <el-form-item label="可管理资源数">
            <span class="dialogVisible">{{detailform.userNum}}</span>
          </el-form-item>
          <el-form-item label="授权截止时间">
            <span class="dialogVisible">{{detailform.endTime}}</span>
          </el-form-item>
          <el-form-item label="授权签发时间">
            <span class="dialogVisible">{{detailform.startTime}}</span>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="background:transparent">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Panel from "@/components/panel";
import Charts from "@/components/Charts";
import { getToken, getUserName } from "@/utils/auth";

export default {
  components: {
    Panel,
    Charts
  },
  data() {
    return {
      dialogVisible: false,
      isTry: "",
      endTime: "",
      detailform: {
        isTry: "",
        username: "",
        device: "",
        hardware: "",
        version: "",
        userNum: "",
        endTime: "",
        startTime: ""
      },
      uploadUrl: location.origin + "/ZR/system/loadFile",
      headers: {
        token: getToken(),
        userName: getUserName(),
        menuCode: vm._route.meta.menuCode
      },
      CPUoption: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        title: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: "bolder",
          fontSize: 10,
          textStyle: {
            color: "red"
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            center: ["50%", "55%"], // 默认全局居中
            radius: "95%",
            detail: { formatter: "{value}%", fontSize: "16" },
            data: [{ value: 0, name: "" }],
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 0 // 属性length控制线长
            },
            splitLine: {
              // 分隔线
              length: 13, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            }
          }
        ]
      },
      EMSoption: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        title: {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: "bolder",
          fontSize: 10,
          textStyle: {
            color: "red"
          }
        },
        series: [
          {
            type: "gauge",
            center: ["50%", "55%"], // 默认全局居中
            radius: "95%",
            detail: { formatter: "{value}%", fontSize: "16" },
            data: [{ value: 0, name: "" }],
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 0 // 属性length控制线长
            },
            splitLine: {
              // 分隔线
              length: 13, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: "auto"
              }
            }
          }
        ]
      },
      HDoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "3%",
          data: ["已使用", "未使用"],
          textStyle: {
            color: "#d8d8d8"
          }
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "65%",
            center: ["50%", "58%"],
            color: ["#95CC56", "#EFD663"],
            data: [{ value: 0, name: "已使用" }, { value: 0, name: "未使用" }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              show: false
            },
            labelLine: {
              show: false,
              length: 0,
              length2: "0"
            }
          }
        ]
      }
    };
  },
  created() {
    this.getSystemInfo();
  },
  methods: {
    getSystemInfo() {
      this.$api.getSystemInfo({}).then(res => {
        let data = res.data;
        this.detailform = data;
        this.isTry = this.detailform.isTry =
          data.isTry == 0 ? "试用授权" : "正式授权";
        this.endTime = data.endTime;
        this.HDoption.series[0].data[0].value = res.data.usableSpace;
        this.HDoption.series[0].data[1].value = res.data.freeSpace;
        this.EMSoption.series[0].data[0].value = res.data.memoryUse.toFixed(1);
        this.CPUoption.series[0].data[0].value = res.data.cpuUse.toFixed(1);
      });
    },
    Success(res) {
      if (res.data.result === 0) {
        this.$Message.info("文件上传成功");
      } else if (res.data.result === -1) {
        this.$Message.error("文件上传失败");
      } else {
        this.$Message.error(
          "上传文件已过期或者已达到限额，请获取最新证书后上传"
        );
      }
    },
    loadFileSuccess(res) {
      if (res.result === 0) {
        this.$Message.success("导入授权文件成功");
      } else {
        this.$Message.error("导入授权文件失败");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dialogVisible {
  color: #d8d8d8;
}
.serviceCondition {
  display: flex;
  section {
    flex: 1;

    div {
      height: 152px;
      p {
        margin-left: 120px;
        color: #cad5db;
        font-size: 14px;
        span {
          color: #ffffff;
          margin-left: 5px;
        }
      }
      h5 {
        color: #18bb9a;
        margin-left: 150px;
      }
    }
  }
  section:nth-child(2) {
    border-right: 1px solid #323f54;
    border-left: 1px solid #323f54;
    color: #cad5db;
  }
  section:nth-child(3) {
    p {
      text-align: center;
    }
  }
}
.authorization {
  display: flex;
  div {
    flex: 1;
    span {
      display: inline-block;
      width: 32px;
      height: 23px;
      background: url("../../../public/img/png/download.png") center center
        no-repeat;
    }
  }
  .update {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url("../../../public/img/png/sj.png") center center no-repeat;
  }
}
.serviceCondition section > p {
  background: #2d384a;
  font-size: 14px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  margin: 0;
}
.updateManage {
  &-title {
    background: #2d384a;
    height: 34px;
    line-height: 34px;
    padding-left: 10px;
    font-size: 14px;
    color: #cad5db;
  }
  p {
    color: #cad5db;
    font-size: 14px;
  }
  &-btn {
    padding: 40px;
  }
}
.updateManage p > span {
  color: #fbd67a;
  margin-left: 10px;
}
.downloadBag {
  padding: 20px;
  border-bottom: 1px solid #323f54;
  overflow: hidden;
}
.downloadBag ul:nth-child(1) {
  float: left;
  li {
    text-align: right;
    font-size: 14px;
    line-height: 30px;
  }
}
.downloadBag ul:nth-child(2) {
  float: left;
  margin-left: 10px;
  li {
    text-align: left;
    font-size: 14px;
    line-height: 30px;
  }
}
</style>
