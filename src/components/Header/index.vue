<template>
  <div class="header" style="background: #fff;">
    <div class="topNav clear">
      <div class="topNavMain">
        <ul class="leftNav"></ul>
        <ul class="rightNav">
          <li v-if="JSON.stringify(personalInfo) != '{}'">
            <span>欢迎您：{{personalInfo.showName}}<i class="fa fa-angle-down fa-fw"></i></span>
            <dl>
              <dd><router-link to="/myOrder">我的订单</router-link></dd>
<!--              <dd><router-link to="/myTicket">我的发票</router-link></dd>-->
              <dd><router-link to="/myAccount">账号管理</router-link></dd>
              <dd><router-link to="/myAddress">地址管理</router-link></dd>
              <!-- <dd><router-link to="/adminIndex" target="_blank">后台管理</router-link></dd> -->
            </dl>
          </li>
          <li @click="logot" v-if="JSON.stringify(personalInfo) != '{}'">退出登录</li>
          <li v-if="JSON.stringify(personalInfo) == '{}'"><router-link to="/login">登录</router-link></li>
          <li><a href="https://admin.wjzsc.cn/" target="_blank">供应商登录</a></li>
          <li v-if="JSON.stringify(personalInfo) == '{}'"><router-link to="/register">注册</router-link></li>
          <li style="background: #00A2E9;" @click="jumpToCart">
            <i class="fa fa-shopping-cart fa-fw"></i>
            企业购物车<span v-if="$store.state.goodsNum > 0">({{$store.state.goodsNum}})</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="logoSearchOut">
      <div class="logoSearch">
        <div class="logo">
          <router-link to="/index">
            <div class="logoImg">
              <img src="../../assets/img/logo.png" alt="">
            </div>
          </router-link>
        </div>
        <div class="searchOut">
          <div class="search" v-if="!step">
            <div class="searchInput">
              <input type="text" placeholder="搜索全站商品" v-model="kw" @keyup.enter="jumpToSearch">
            </div>
            <div class="searchBtn" @click="jumpToSearch"><i class="fa fa-search fa-fw"></i></div>
          </div>
        </div>
        <div class="contact" v-if="!step">
          <div class="img">
            <img src="../../assets/img/contact.png" alt="">
          </div>
          <div class="txt">
            <h1>0351-3070226</h1>
            <h2>工作日: 9:00-17:00</h2>
          </div>
        </div>
        <div class="step" v-if="step">
          <el-steps :active="active" align-center>
            <el-step title="购物车结算"></el-step>
            <el-step title="填写订单信息"></el-step>
            <el-step title="等待签收"></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <ul class="category" v-if="!step">
      <li :class="type == '' ? 'active' : ''">
        <router-link to="/index">首页</router-link>
      </li>
      <li v-for="item in typeList" :key="item.id" :class="type == item.id ? 'active' : ''">
        <router-link :to="'/search?type=' + item.id">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      step: {
        type: Boolean,
        default: false
      },
      active: {
        type: Number,
        default: 0
      },
      tabId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        kw: '',
        personalInfo: {},
        typeList: [],
        type: ''
      }
    },
    methods: {
      jumpToCart() {
        const personalInfo = localStorage.getItem('personalInfo')
        if (personalInfo) {
          this.$router.push({
            path: '/cart'
          })
        } else {
          this.$confirm('您还没有登录，是否前往登录?', '提示', {
            confirmButtonText: '现在就去',
            cancelButtonText: '我再想想',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/login'
            })
          }).catch(() => {

          });
        }
      },
      jumpToSearch() {
        if (this.kw == '') {
          this.$router.push({
            path: '/search'
          })
        } else {
          this.$router.push({
            path: '/search?kw=' + this.kw
          })
        }
        this.$emit('searchSuccess', this.kw)
      },
      logot() {
        localStorage.removeItem('personalInfo')
        localStorage.removeItem('saveAuthorization')
        this.$store.commit('updateGoodsNum', 0)
        location.reload()
      }
    },
    mounted() {
      const kw = this.$route.query.kw
      if (kw) {
        this.kw = kw
      }
      let personalInfo = localStorage.getItem('personalInfo')
      if (personalInfo) {
        this.personalInfo = JSON.parse(personalInfo)
        this.$post('common/getUserPublicData').then(res => {
          if (res.code == 0) {
            this.$store.commit('updateGoodsNum', res.data.shoppingCartCount)
          }
        })
      }
      if (this.$route.query.type) {
        this.type = this.$route.query.type.slice(0, 1)
      }
      this.$post('good/getGoodClassRoot').then(res => {
        if (res.code == 0) {
          this.typeList = res.data
        }
      })
    },
    watch: {
      tabId(newVal) {
        this.type = newVal
      }
    }
  }
</script>

<style lang="less" scoped>
  .topNav{width: 100%;background: #006DB8;
    .topNavMain{width: 1200px;margin: 0 auto;
      .leftNav{float: left;}
      .rightNav{float: right;}
      ul{
        li{color: rgba(255, 255, 255, .8);float: left;font-size: 12px;position: relative;padding: 15px;cursor: pointer;
          a{color: rgba(255, 255, 255, .8);}
          dl{position: absolute;top: 46px;left: 0;z-index: 9;background: #006DB8;width: 100%;display: none;
            dd{line-height: 40px;text-align: center;border-bottom: 1px solid rgba(0, 162, 233, .3);}
            dd:last-child{border-bottom: none;}
            dd:hover{
              a{color: #fff;}
            }
          }
        }
        li:not(:last-child)::after{content: '';position: absolute;top: 50%;right: 0;width: 1px;height: 25%;background: #00A2E9;transform: translateY(-50%);}
        li:hover{color: #fff;
          &>a{color: #fff;text-decoration: none;}
          dl{display: block;}
        }
        li:first-child{padding-left: 0;}
        li:nth-last-child(2)::after{display: none;}
      }
    }
  }
  .logoSearchOut{background: #fff;
    .logoSearch{width: 1200px;margin: 0 auto;padding: 20px 0 10px;overflow: hidden;
      .logo{float: left;width: 197.5px;
        .logoImg{float: left;height: 60px;
          img{height: 100%;}
        }
      }
    }
    .searchOut{float: left;width: calc(100% - 395px);padding: 11px 200px;
      .search{padding: 2px;border: 1px solid #006DB8;overflow: hidden;
        .searchInput{float: left;position: relative;
          input{width: 300px;height: 34px;border-radius: 4px 0 0 4px;padding: 0 10px;}
          i{position: absolute;top: 50%;left: 6px;transform: translateY(-50%);color: #999;}
        }
        .searchBtn{float: right;background: #006DB8;width: 34px;line-height: 34px;color: #fff;text-align: center;cursor: pointer;}
      }
    }
    .contact{height: 62px;float: right;overflow: hidden;width: 197.5px;padding: 11px 0 11px 19.5px;
      .img{height: 40px;float: left;margin-right: 10px;
        img{height: 100%;}
      }
      .txt{text-align: center;
        h1{font-size: 16px;font-weight: bold;}
        h2{font-size: 12px;}
      }
    }
    .step{float: right;overflow: hidden;width: 450px;}
  }
  .category{width: 1200px;margin: 0 auto;background: #E3E3E3;display: flex;
    li{line-height: 36px;text-align: center;position: relative;cursor: pointer;flex: 1;
      a{color: #606060;display: block;}
    }
    li:not(:last-child)::after{content: '';position: absolute;width: 1px;height: 40%;background: #606060;top: 50%;right: 0;transform: translateY(-50%);}
    .active{
      a{color: var(--themeColor);}
    }
    li:hover{
      a{color: var(--themeColor);}
    }
  }
</style>

<style lang="less">
  .el-step__title{font-size: 14px !important;}
</style>