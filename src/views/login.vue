<template>
  <div class="loginOut">
    <div class="loginBox" :style="calcLoginBoxPosition()">
      <div class="loginLeft">
        <div class="hbLogo">
          <router-link to="/index"><img class="logo" src="@/assets/img/hblogo_white.png" alt=""/></router-link>
          <h1>万家寨水控集团</h1>
          <h2>水控易购</h2>
          <img class="promise" src="../assets/img/promise_white.png" alt="">
        </div>
      </div>
      <div class="loginRight">
        <h1>会员登录</h1>
        <img src="../assets/img/loginLine.jpg" alt="" class="loginLine">
        <div class="accountLoginOut">
          <form>
            <div class="formRow">
              <div class="formIcon">
                <i class="el-icon-user"></i>
              </div>
              <div class="form">
                <input type="text" placeholder="请输入登录账号" autocomplete="off" v-model="account" @keyup.enter="openVerify"/>
              </div>
            </div>
            <div class="formRow">
              <div class="formIcon">
                <i class="el-icon-lock"></i>
              </div>
              <div class="form">
                <input type="password" placeholder="请输入登录密码" autocomplete="off" v-model="password" @keyup.enter="openVerify"/>
              </div>
            </div>
            <el-button @click="openVerify" type="primary" style="width: 100%; margin-top: 15px;background: #0068B7;border: none;border-radius: 15px;letter-spacing: 15px;">立即登录</el-button>
            <div class="otherOperate" style="padding-top: 15px;">
              <el-checkbox v-model="rememberAccount">记住账号</el-checkbox>
              <span>|</span>
              <el-link href="forgetPassword">忘记密码</el-link>
              <span>|</span>
              <el-link href="index">返回首页</el-link>
            </div>
          </form>
        </div>
        <p class="browserTips">
          还没有账号？马上<router-link to="/register">注册</router-link>一个吧
        </p>
      </div>
    </div>
    <SliderVerify 
      ref="sliderVerifyOut"
      :show="sliderVerify.verifyShow" 
      :sliderBlockTop="sliderVerify.sliderBlockTop" 
      :sliderBg="sliderVerify.sliderBg" 
      :sliderCut="sliderVerify.sliderCut"
      @sliderClose="sliderClose"
      @sliderRefresh="sliderRefresh"
      @sliderComplete="sliderComplete"
    />
  </div>
</template>

<script>
  import md5 from 'js-md5';

  import SliderVerify from '../components/SliderVerify/SliderVerify';

  import { util } from "../utils/util";

  export default {
    name: "Login",
    components: {
      SliderVerify
    },
    data() {
      return {
        account: "",
        password: "",
        sliderVerify: {
          sliderBlockTop: 0,
          sliderBg: '',
          sliderCut: '',
          ranNum: '',
          verifyShow: false
        },
        rememberAccount: false
      };
    },
    methods: {
      sliderClose() {
        this.sliderVerify.verifyShow = false
      },
      sliderRefresh() {
        this.$post('getSliderImg').then(res => {
          this.sliderVerify.ranNum = res.data.ranNum
          this.sliderVerify.sliderBlockTop = res.data.y
          this.sliderVerify.sliderBg = 'data:image/png;base64,' + res.data.shadeImage
          this.sliderVerify.sliderCut = 'data:image/png;base64,' + res.data.cutoutImage
          this.$refs.sliderVerifyOut.sliderReset()
          this.sliderVerify.verifyShow = true
        })
      },
      sliderComplete(left) {
        this.$post('verSliderImg', {
          ranNum: this.sliderVerify.ranNum,
          x: left,
          y: this.sliderVerify.sliderBlockTop
        }).then(res => {
          if (res.code == 0) {
            this.$refs.sliderVerifyOut.sliderSuccess()
            setTimeout(() => {
              this.sliderVerify.verifyShow = false
              this.login(res.data)
            }, 500)
          } else {
            this.$refs.sliderVerifyOut.sliderFail()
            setTimeout(() => {
              this.sliderRefresh()
            }, 500)
          }
        })
      },
      openVerify() {
        if (this.account == "") {
          this.$message.error("登录账号不能为空");
        } else if (this.password == "") {
          this.$message.error("登录密码不能为空");
        } else {
          this.sliderRefresh()
        }
      },
      login(random) {
        let sendData = {
          name: this.account,
          imgCodeRandom: random,
          pass: md5(this.password)
        }
        this.$post("login", sendData).then(res => {
          if (res.code == 0) {
            localStorage.setItem('saveAuthorization', res.data)
            if (this.rememberAccount) {
              localStorage.setItem('rememberAccount', this.account)
            } else {
              localStorage.removeItem('rememberAccount')
            }
            this.$post('common/getUserPublicData').then(res => {
              if (res.code == 0) {
                localStorage.setItem('personalInfo', JSON.stringify(res.data))
                this.$router.push({
                  path: '/index'
                })
              }
            })
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      calcLoginBoxPosition() {
        let positionObj = {
          position: 'fixed',
          top: '50%',
          left: '50%'
        }
        return positionObj;
      }
    },
    mounted() {
      const rememberAccount = localStorage.getItem('rememberAccount')
      if (rememberAccount) {
        this.rememberAccount = true
        this.account = rememberAccount
      }
    }
  };
</script>

<style lang="less" scoped>
  .loginOut{width: 100vw;height: 100vh;background: url("../assets/img/loginBg.jpg") no-repeat;background-size: 100% 100%;
    .loginBox{width: 880px;height: 380px;transform: translate(-50%, -65%);overflow: hidden;
      .loginLeft{width: 50%;height: 100%;float: left;background: #0068B7;position: relative;
        .hbLogo{position: absolute;top: 50%;left: 0;width: 100%;transform: translateY(-50%);
          img{width: 100px;display: block;margin: 0 auto;}
          h1{font-size: 24px;text-align: center;color: #fff;margin-top: 5px;}
          h2{text-align: center;color: #fff;margin-top: 15px;letter-spacing: 1px;font-size: 32px;}
          .promise{width: 90%;margin-top: 30px;}
        }
      }
      .loginRight{width: 50%;height: 100%;float: left;background: #fff;padding: 15px 0;position: relative;
        .changeLoginTypeOut{width: 0;height: 0;border-right: 60px solid #409eff;border-left: 60px solid transparent;border-bottom: 60px solid transparent;position: absolute;top: 0;right: 0;cursor: pointer;
          img{width: 40px;position: absolute;top: 9px;right: -53px;}
        }
        h1{font-size: 20px;font-weight: bold;text-align: center;letter-spacing: 10px;}
        .loginLine{width: 100%;margin-top: 15px;}
        .accountLoginOut{
          form{margin: 30px 50px;
            .formRow{margin-bottom: 15px;overflow: hidden;border-bottom: 1px solid #dcdfe6;position: relative;
              .formIcon{width: 40px;height: 40px;float: left;text-align: center;
                i{line-height: 38px;font-size: 18px;color: var(--themeColor);}
              }
              .form{width: calc(100% - 40px);float: left;
                input{height: 40px;}
                img{width: 100px;position: absolute;top: 0;right: 0;cursor: pointer;}
              }
            }
            .otherOperate{display: flex;justify-content: space-between;}
          }
        }
        .browserTips{color: #666;text-align: center;
          a{color: #409EFF;}
          a:hover{text-decoration: underline;}
        }
      }
    }
  }
</style>
