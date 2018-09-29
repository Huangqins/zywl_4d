<template>
  <div class="login-container">
   <div class="login-banner">
     智刃安全技术平台
   </div>
    <div class="login-bg">
      <el-form class="login-form" auto-complete="off" :model="loginForm"  ref="loginForm" label-position="left">
        <el-form-item prop="userName" style="background: transparent;border:0">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input  v-model="loginForm.userName" placeholder="用户名" style="width:92%;border-bottom: 1px solid #fff;" ></el-input>
        </el-form-item>
        <el-form-item prop="password" style="background: transparent;border:0">
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input v-model="loginForm.password" placeholder="密码" style="width:92%;border-bottom: 1px solid #fff;"  type="password" name="password"></el-input>

        </el-form-item>
        <el-form-item  v-if="errorNum >= 3" style="background: transparent;border:0">
          <span class="svg-container">
            <svg-icon icon-class="verifyCode"></svg-icon>
          </span>
              <el-input v-model="loginForm.verifyCode" placeholder="验证码"  style="width: 65%; border-bottom: 1px solid #fff;" name="verifyCode"></el-input>
              <img width="100" height="42" class="fr pointer" style="margin-top:2px;" :src="codeSrc" @click="getIdentifyCode">
        </el-form-item>
        <el-form-item style="background: transparent;border:none;margin-top:56px;">
          <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin" style="width:100%;background:#05c1d2;height:46px;border-color:#05c1d2;">
            登录
          </el-button>

        </el-form-item>
      </el-form>
    </div>
    <!-- canvas背景 -->
      <canvas id="canvas" width="1349" height="404"></canvas>
  </div>
</template>

<script>
import saltedMd5  from 'md5-js'
import animationCircle from "components/animationCircle";
import { getUserName } from "@/utils/auth";
import { debounce } from "utils";
const host=process.env.NODE_ENV === "development" ? "http://192.168.10.104:8080//ZY" : "http://localhost:8080";
export default {
  name: "login",
  components: {
    animationCircle
  },
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        verifyCode: ""
      },
      loading: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      codeSrc: "",
      errorNum: 0
    };
  },
  beforeDestroy() {
    window.removeEventListener("resize", this._canvas);
  },
  mounted() {
    var o = document.getElementsByTagName("body")[0];
    var num = 200;
    var w = window.innerWidth;
    var h = o.offsetHeight;
    var max = 100;
    var _x = 0;
    var _y = 0;
    var _z = 150;
    var dtr = function(d) {
      return d * Math.PI / 180;
    };

    var rnd = function() {
      return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
    };
    var dist = function(p1, p2, p3) {
      return Math.sqrt(
        Math.pow(p2.x - p1.x, 2) +
          Math.pow(p2.y - p1.y, 2) +
          Math.pow(p2.z - p1.z, 2)
      );
    };

    var cam = {
      obj: {
        x: _x,
        y: _y,
        z: _z
      },
      dest: {
        x: 0,
        y: 0,
        z: 1
      },
      dist: {
        x: 0,
        y: 0,
        z: 200
      },
      ang: {
        cplane: 0,
        splane: 0,
        ctheta: 0,
        stheta: 0
      },
      zoom: 1,
      disp: {
        x: w / 2,
        y: h / 2,
        z: 0
      },
      upd: function() {
        cam.dist.x = cam.dest.x - cam.obj.x;
        cam.dist.y = cam.dest.y - cam.obj.y;
        cam.dist.z = cam.dest.z - cam.obj.z;
        cam.ang.cplane =
          -cam.dist.z /
          Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
        cam.ang.splane =
          cam.dist.x /
          Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
        cam.ang.ctheta =
          Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) /
          Math.sqrt(
            cam.dist.x * cam.dist.x +
              cam.dist.y * cam.dist.y +
              cam.dist.z * cam.dist.z
          );
        cam.ang.stheta =
          -cam.dist.y /
          Math.sqrt(
            cam.dist.x * cam.dist.x +
              cam.dist.y * cam.dist.y +
              cam.dist.z * cam.dist.z
          );
      }
    };

    var trans = {
      parts: {
        sz: function(p, sz) {
          return {
            x: p.x * sz.x,
            y: p.y * sz.y,
            z: p.z * sz.z
          };
        },
        rot: {
          x: function(p, rot) {
            return {
              x: p.x,
              y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
              z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
            };
          },
          y: function(p, rot) {
            return {
              x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
              y: p.y,
              z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
            };
          },
          z: function(p, rot) {
            return {
              x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
              y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
              z: p.z
            };
          }
        },
        pos: function(p, pos) {
          return {
            x: p.x + pos.x,
            y: p.y + pos.y,
            z: p.z + pos.z
          };
        }
      },
      pov: {
        plane: function(p) {
          return {
            x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
            y: p.y,
            z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
          };
        },
        theta: function(p) {
          return {
            x: p.x,
            y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
            z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
          };
        },
        set: function(p) {
          return {
            x: p.x - cam.obj.x,
            y: p.y - cam.obj.y,
            z: p.z - cam.obj.z
          };
        }
      },
      persp: function(p) {
        return {
          x: p.x * cam.dist.z / p.z * cam.zoom,
          y: p.y * cam.dist.z / p.z * cam.zoom,
          z: p.z * cam.zoom,
          p: cam.dist.z / p.z
        };
      },
      disp: function(p, disp) {
        return {
          x: p.x + disp.x,
          y: -p.y + disp.y,
          z: p.z + disp.z,
          p: p.p
        };
      },
      steps: function(_obj_, sz, rot, pos, disp) {
        var _args = trans.parts.sz(_obj_, sz);
        _args = trans.parts.rot.x(_args, rot);
        _args = trans.parts.rot.y(_args, rot);
        _args = trans.parts.rot.z(_args, rot);
        _args = trans.parts.pos(_args, pos);
        _args = trans.pov.plane(_args);
        _args = trans.pov.theta(_args);
        _args = trans.pov.set(_args);
        _args = trans.persp(_args);
        _args = trans.disp(_args, disp);
        return _args;
      }
    };

    (function() {
      "use strict";
      var threeD = function(param) {
        this.transIn = {};
        this.transOut = {};
        this.transIn.vtx = param.vtx;
        this.transIn.sz = param.sz;
        this.transIn.rot = param.rot;
        this.transIn.pos = param.pos;
      };

      threeD.prototype.vupd = function() {
        this.transOut = trans.steps(
          this.transIn.vtx,
          this.transIn.sz,
          this.transIn.rot,
          this.transIn.pos,
          cam.disp
        );
      };

      var Build = function() {
        this.vel = 0.04;
        this.lim = 360;
        this.diff = 200;
        this.initPos = 100;
        this.toX = _x;
        this.toY = _y;
        this.go();
      };

      Build.prototype.go = function() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = o.offsetHeight;
        this.$ = canvas.getContext("2d");
        this.$.globalCompositeOperation = "source-over";
        this.varr = [];
        this.dist = [];
        this.calc = [];

        for (var i = 0, len = num; i < len; i++) {
          this.add();
        }

        this.rotObj = {
          x: 0,
          y: 0,
          z: 0
        };
        this.objSz = {
          x: w / 5,
          y: h / 5,
          z: w / 5
        };
      };

      Build.prototype.add = function() {
        this.varr.push(
          new threeD({
            vtx: {
              x: rnd(),
              y: rnd(),
              z: rnd()
            },
            sz: {
              x: 0,
              y: 0,
              z: 0
            },
            rot: {
              x: 20,
              y: -20,
              z: 0
            },
            pos: {
              x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
              y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
              z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
            }
          })
        );
        this.calc.push({
          x: 360 * Math.random(),
          y: 360 * Math.random(),
          z: 360 * Math.random()
        });
      };

      Build.prototype.upd = function() {
        cam.obj.x += (this.toX - cam.obj.x) * 0.05;
        cam.obj.y += (this.toY - cam.obj.y) * 0.05;
      };

      Build.prototype.draw = function() {
        this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
        cam.upd();
        this.rotObj.x += 0.1;
        this.rotObj.y += 0.1;
        this.rotObj.z += 0.1;

        for (var i = 0; i < this.varr.length; i++) {
          for (var val in this.calc[i]) {
            if (this.calc[i].hasOwnProperty(val)) {
              this.calc[i][val] += this.vel;
              if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
            }
          }

          this.varr[i].transIn.pos = {
            x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
            y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
            z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
          };
          this.varr[i].transIn.rot = this.rotObj;
          this.varr[i].transIn.sz = this.objSz;
          this.varr[i].vupd();
          if (this.varr[i].transOut.p < 0) continue;
          var g = this.$.createRadialGradient(
            this.varr[i].transOut.x,
            this.varr[i].transOut.y,
            this.varr[i].transOut.p,
            this.varr[i].transOut.x,
            this.varr[i].transOut.y,
            this.varr[i].transOut.p * 2
          );
          this.$.globalCompositeOperation = "lighter";
          g.addColorStop(0, "hsla(255, 255%, 255%, 1)");
          g.addColorStop(0.5, "hsla(" + (i + 2) + ",85%, 40%,1)");
          g.addColorStop(1, "hsla(" + i + ",85%, 40%,.5)");
          this.$.fillStyle = g;
          this.$.beginPath();
          this.$.arc(
            this.varr[i].transOut.x,
            this.varr[i].transOut.y,
            this.varr[i].transOut.p * 2,
            0,
            Math.PI * 2,
            false
          );
          this.$.fill();
          this.$.closePath();
        }
      };
      Build.prototype.anim = function() {
        window.requestAnimationFrame = (function() {
          return (
            window.requestAnimationFrame ||
            function(callback, element) {
              window.setTimeout(callback, 1000 / 60);
            }
          );
        })();
        var anim = function() {
          this.upd();
          this.draw();
          window.requestAnimationFrame(anim);
        }.bind(this);
        window.requestAnimationFrame(anim);
      };

      Build.prototype.run = function() {
        this.anim();
      };
      var app = new Build();
      app.run();
    })();
    // 调整画布高度调整画布高度
    this._canvas = debounce(() => {
      canvas.width = w = window.innerWidth;
      canvas.height = h = window.innerHeight;
    }, false);

    window.addEventListener("resize", this._canvas);
  },
  methods: {
    async getIdentifyCode() {
      const res = await this.$api.getIdentifyCode({ phone: 0 });
      this.codeSrc = host + `${res.code}`;
      console.log(process.env.HOST_URL);
    },
    async handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let salt = 'zywl'
          this.loading = true;
          this.loginForm.password = saltedMd5(this.loginForm.password, salt)
          this.$store.dispatch("Login", this.loginForm).then(res => {
            this.loading = false;
            console.log(res.result)
            switch (res.result) {
              case 0:
                this.$message.success(`登录成功`);
                this.$router.push({ path: "/" });
                break;
              case 1:
                this.$message.error(`用户名不存在`);
                break;
              case 2:
                this.$message.error(`密码错误`);
                this.errorNum = res.errorNum;
                if (res.errorNum >= 3) this.getIdentifyCode();
                break;
              case 3:
                this.$message.error(`验证码错误`);
                break;
              case 4:
                this.$message.error(`验证码失效`);
                break;
              case -1:
                this.$message.error(`登录失败`);
                break;
              case -2:
                this.$message.error(`用户尚无权限,请 联系管理员分配`);
                this.$router.push('/login')
                break;
              default:
                this.$message.error(`用户尚未被授权或者授权文件过期`);
                this.$router.push({name: 'loginAuthorize',params: {status : res.result } });
                break;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  position: relative;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-image: -webkit-radial-gradient(
    ellipse farthest-corner at center top,
    #000d4d 0%,
    #000105 100%
  );
  background-image: radial-gradient(
    ellipse farthest-corner at center top,
    #000d4d 0%,
    #000105 100%
  );
  background: url("../../../public/img/png/loginBg.png") no-repeat;
  background-size: 100% 100%;
  .el-input__inner {
    border: none;
  }
  input {
    background: transparent;
    color: #fff;
  }
  .login-banner {
    color: #fff;
    width: 390px;
    height: 84px;
    line-height: 84px;
    padding-left: 84px;
    font-size: 30px;
    background: url(../../../public/img/png/logoS.png) left center no-repeat;
    background-size: 84px 84px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -358px;
    transform: translateX(-50%) translateY(-50%);
  }
  .login-bg {
    position: absolute;
    left: 50%;
    top: 50%;
    right: 0;
    width: 745px;
    height: 497px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(-50%) translateY(-50%);
    background: url("../../../public/img/png/login-bg.png") no-repeat;
    background-size: contain;
    overflow: hidden;
  }
  .login-form {
    width: 534px;
    height: 324px;
    padding: 51px;
    margin-top: -40px;
    border-radius: 12px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    text-align: center;
    font-size: 24px;
  }
}
</style>
