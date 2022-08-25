<template>
  <div class="detail">
    <Header :tabId="tabId"></Header>
    <Crumb name="商品详情" :list="goodsInfo.goodClasses"></Crumb>
    <div class="content">
      <div class="box">
        <el-carousel trigger="click" height="500px" :interval="5000">
          <el-carousel-item v-for="(item, index) in goodsInfo.introducePics" :key="index">
            <img :src="item">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sp_detail">
        <p class="title">{{goodsInfo.name}}</p>
        <p class="subtitle">{{goodsInfo.specification}}</p>
        <div class="clear" style="background: #f1f1f1;">
          <ul>
            <li>超值购物券</li>
            <li>价格</li>
            <li>当前库存</li>
          </ul>
          <ul>
            <li>全网站实物商品通用</li>
            <li class="money" v-if="goodsInfo.price == 0">￥<span>时价</span></li>
            <li class="money" v-else>￥<span>{{goodsInfo.price}}</span></li>
            <li style="color: #006DB8;"><span>{{goodsInfo.inventoryNum}} {{goodsInfo.unit}}</span></li>
          </ul>
        </div>
        <div class="clear">
          <ul>
            <li>承诺</li>
            <li>数量</li>
          </ul>
          <ul>
            <li>本店郑重承诺三个工作日内到货</li>
            <li class="numOut">
              <span @click="decrementNum">-</span>
              <input type="text" v-model="goodsNum">
              <span @click="incrementNum">+</span>
            </li>
          </ul>
        </div>
        <div class="operateBtn">
          <!-- <div class="buyNow" @click="buyNow(goodsInfo.id)">立即购买</div> -->
          <div class="addCart" @click="addCart(goodsInfo.homePic, goodsInfo.id, $event)">加入购物车</div>
        </div>
      </div>
    </div>
    <div class="subcontent">
      <el-tabs>
        <el-tab-pane label="商品介绍">
          <div v-if="goodsInfo.content" v-html="goodsInfo.content"></div>
          <el-empty v-else description="暂无商品介绍"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="规格与包装">{{goodsInfo.specification}}</el-tab-pane>
      </el-tabs>
    </div>
    <div class="subcontent" v-if="recommentList != ''">
      <el-tabs>
        <el-tab-pane label="相关推荐">
          <div class="recommend">
            <div class="recommendBox" v-for="(item, index) in recommentList" :key="item.id" v-if="index < 6">
              <router-link :to="'/detail?id=' + item.id">
                <div class="img">
                  <img :src="item.homePic" alt="">
                  <div class="name">{{item.name}}</div>
                </div>
                <div class="price" v-if="item.price == 0">￥时价</div>
                <div class="price" v-else>￥{{item.price}}</div>
              </router-link>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Footer></Footer>
    <FixedMenu></FixedMenu>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  import FixedMenu from '../components/FixedMenu';
  import Crumb from '../components/Crumb';

  import '../assets/js/jquery-1.4.4.min';
  import '../assets/js/jquery.fly.min';

  export default {
    name: "detail",
    components: {
      Header,
      Footer,
      FixedMenu,
      Crumb
    },
    data() {
      return {
        goodsInfo: {},
        goodsNum: 1,
        recommentList: [],
        tabId: ''
      }
    },
    methods: {
      loadData(id) {
        this.$post('good/getGoodById', {
          id: id
        }).then(res => {
          if (res.code == 0) {
            this.goodsInfo = res.data
            this.tabId = this.goodsInfo.goodClasses[0].id
          } else {
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 1000,
              onClose: () => {
                window.opener = null;
                window.open('','_self');
                window.close();
              }
            })
          }
        })
      },
      imgFly(img, top, left) {
        const width = window.innerWidth
        const height = window.innerHeight
        let flyer = $('<img width="80" height="80" class="u-flyer" src="' + img + '">');
        flyer.fly({
          start: {
            top: top - 200,
            left: left - 600
          },
          end: {
            left: width - 55,
            top: height - 110,
            width: 20,
            height: 20
          },
          onEnd: function () {
            this.destory();
          }
        });
      },
      addCart(img, id, event) {
        const personalInfo = localStorage.getItem('personalInfo')
        if (personalInfo) {
          this.imgFly(img, event.clientY, event.clientX)
          this.$post('my/addShoppingCart', {
            goodId: id,
            goodNum: this.goodsNum
          }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: '成功加入购物车',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$store.commit('updateGoodsNum', res.data)
                }
              })
            } else {
              this.$message.error(res.msg)
            }
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
      decrementNum() {
        let goodsNum = this.goodsNum
        if (goodsNum > 1) {
          goodsNum = (goodsNum * 10000 - 10000) / 10000
          this.goodsNum = goodsNum
        }
      },
      incrementNum() {
        let goodsNum = this.goodsNum
        goodsNum = (goodsNum * 10000 + 10000) / 10000
        this.goodsNum = goodsNum
      },
      buyNow(id) {
        const personalInfo = localStorage.getItem('personalInfo')
        if (personalInfo) {
          let totalArr = [{
            goodId: id,
            goodNum: this.goodsNum
          }]
          this.$post('order/add', totalArr).then(res => {
            if (res.code == 0) {
              this.$router.replace({
                path: '/order?orderId=' + res.data
              })
            } else {
              this.$message.error(res.msg)
            }
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
      loadRecommend(id) {
        this.$post('good/getRecommendGoods', {
          id: id
        }).then(res => {
          if (res.code == 0) {
            this.recommentList = res.data
          }
        })
      }
    },
    mounted() {
      const id = this.$route.query.id
      this.loadData(id)
      this.loadRecommend(id)
    }
  }
</script>

<style lang="less" scoped>
  .detail{background: #fff;min-height: 100vh;
    .content{width: 1200px;height: 500px;margin: 0 auto 30px;
      .box{width: 500px;height: 500px;float: left;border: 1px solid #eee;position: relative;overflow: hidden;
        img{width: 100%;position: absolute;top: 0;left: 0;}
      }
      .sp_detail{width: 670px;float: right;padding: 15px 0;
        .title{font-size:20px;font-weight:bold;letter-spacing:1px;color: #4a4a4a;padding-left: 10px;}
        .subtitle{font-size: 12px;color: #006DB8;margin: 10px 0;padding-left: 10px;}
        div{padding: 10px 0;
          ul{float:left;
            li{line-height:37px;box-sizing:border-box;padding:0 10px;color:#666;margin: 5px 0;
              button{width:25px;height:25px;cursor:pointer;}
              #province,#city{height:25px;width:100px;margin-right:15px;}
            }
            .money{color: #e74c3c;font-size: 16px;font-weight: bold;line-height: normal;
              span{font-size: 28px;}
            }
            .numOut{overflow: hidden;padding: 6px 10px;
              span{width: 25px;height: 25px;background: #EFEFEF;text-align: center;line-height: 25px;cursor: pointer;font-size: 20px;float: left;user-select: none;}
              input{text-align: center;width: 60px;height: 25px;border: 1px solid #EFEFEF;float: left;}
            }
          }
          ul:first-child{width:17%;
            li{padding-left: 20px;}
          }
          ul:last-child{width:82%;}
        }
        .operateBtn{overflow: hidden;
          div{width: 200px;line-height: 45px;text-align: center;float: left;padding: 0;border: 1px solid transparent;cursor: pointer;}
          .addCart{background: #006DB8;color: #fff;margin-right: 25px;}
          //.addCart{border: 1px solid #006DB8;color: #006DB8;}
        }
      }
    }
    .subcontent{width: 1200px;margin: 0 auto 30px;min-height: 200px;
      .recommend{width: 100%;padding-top: 15px;overflow: hidden;
        .recommendBox{width: 180px;cursor: pointer;float: left;margin-right: 24px;
          .img{width: 100%;height: 180px;overflow: hidden;position: relative;
            img{width: 100%;height: 100%;}
            .name{width: 100%;height: 32px;font-size: 12px;background: rgba(0, 0, 0, .7);position: absolute;bottom: 0;left: 0;color: #fff;padding: 0 5px;display: none;}
          }
          .price{text-align: center;color: #e74c3c;margin-top: 10px;font-weight: bold;font-size: 16px;}
        }
        .recommendBox:last-child{margin-right: 0;}
        .recommendBox:hover{
          .name{display: block;}
        }
      }
    }
  }
</style>

<style lang="less">
  .el-tabs__nav-scroll{background: #F7F7F7;
    .el-tabs__item{padding: 0 20px !important;}
    .el-tabs__item.is-active{background: #409eff;color: #fff;}
  }
  .el-tabs__nav-wrap::after{height: 1px;background-color: #409eff;}
  .el-tabs__active-bar{height: 0;}
</style>