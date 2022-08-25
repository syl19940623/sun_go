<template>
  <div class="search">
    <Header @searchSuccess="searchSuccess"></Header>
    <Crumb name="列表"></Crumb>
    <div class="main">
      <div class="selectCategory">
<!--        <span class="more" @click="moreToggle"><i :class="showTypeIndex == 5 ? 'fa fa-angle-double-down fa-fw' : 'fa fa-angle-double-up fa-fw'"></i></span>-->
        <div class="title">
          共为您找到<span>{{goodsListLength}}</span>件符合条件的商品
          <div class="fr" v-if="typeName != ''">当前所选类别: <span>{{typeName}}</span></div>
        </div>
        <div class="row" v-for="(item, index) in typeList" :key="item.id" v-if="index <= showTypeIndex">
          <div class="left">
            <span :class="type == item.id ? 'active' : ''" @click="changeType(item.id)">{{item.name}}</span>
          </div>
          <div class="right">
            <span v-for="(childItem, index) in item.children" :key="index" :class="type == childItem.id ? 'active' : ''" @click="changeType(childItem.id)">{{childItem.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tab">
      <ul>
        <li v-for="(item, index) in tabList" :key="item.id" :class="index == tabIndex ? 'active' : ''" @click="tabChange(index, item.id)">
          <template v-if="index == 2 && order == 'price' && direction == 1">价格升序</template>
          <template v-else-if="index == 2 && order == 'price' && direction == -1">价格降序</template>
          <template v-else>{{item.name}}</template>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="contentCopy clear" v-if="goodsListLength > 0">
        <div class="contentBox" v-for="item in goodsList" :key="item.id" @click="jumpToDetail(item.id)">
          <img :src="item.homePic ? item.homePic : require('../assets/img/noImg.png')" alt="图片加载失败">
          <h1>{{item.name}}</h1>
          <h3 v-if="item.price == 0"><span>￥</span>时价</h3>
          <h3 v-else><span>￥</span>{{item.price}}</h3>
          <div class="addCart" @click="addCart(item.homePic, item.id, $event)">
            <span><i class="fa fa-shopping-cart fa-fw"></i></span>
          </div>
        </div>
      </div>
      <el-empty description="暂无数据" v-else></el-empty>
    </div>
    <div class="page" v-if="goodsListLength > 0">
      <el-pagination
        @current-change="jumpPage"
        :current-page="page"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="this.goodsListLength">
      </el-pagination>
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
  import {util} from "../utils/util";

  export default {
    name: "search",
    components: {
      Header,
      Footer,
      FixedMenu,
      Crumb
    },
    data() {
      return {
        kw: '',
        type: '',
        order: '',
        direction: -1,
        page: 1,
        limit: 20,
        typeList: [],
        showTypeIndex: 30,
        tabList: [
          {
            id: '',
            name: '综合排序'
          },
          {
            id: 'sale',
            name: '销量优先'
          },
          {
            id: 'price',
            name: '价格排序'
          }
        ],
        tabIndex: 0,
        goodsList: [],
        goodsListLength: 0,
        typeName: ''
      }
    },
    methods: {
      loadGoods() {
        let sendData = {
          page: this.page,
          limit: this.limit,
          order: this.order
        }
        if (this.kw) {
          sendData.kw = this.kw
        }
        if (this.type) {
          sendData.type = this.type
        }
        if (this.order == 'price') {
          sendData.direction = this.direction
        }
        this.$post('good/getPagingGoods', sendData).then(res => {
          if (res.code == 0) {
            this.goodsList = res.data
            this.goodsListLength = res.count
            this.$nextTick(() => {
              this.loadTypeName()
            })
          }
        })
      },
      searchSuccess(kw) {
        this.kw = kw
        this.type = ''
        this.loadGoods()
      },
      imgFly(img, top, left) {
        const width = window.innerWidth
        const height = window.innerHeight
        let flyer = $('<img width="80" height="80" class="u-flyer" src="' + img + '">');
        flyer.fly({
          start: {
            top: top + 80,
            left: left - 100
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
        event.stopPropagation()
        const personalInfo = localStorage.getItem('personalInfo')
        if (personalInfo) {
          this.imgFly(img, event.clientY, event.clientX)
          this.$post('my/addShoppingCart', {
            goodId: id,
            goodNum: 1
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
      jumpPage(page) {
        this.page = page
        this.loadGoods()
      },
      tabChange(index, id) {
        if (index == 2) {
          this.direction = this.direction * -1
        }
        this.tabIndex = index
        this.order = id
        this.page = 1
        this.loadGoods()
      },
      loadType() {
        let type = this.type
        type = type ? type.slice(0, 1) : ''
        this.$post('good/getGoodClassAll', {
          id: type
        }).then(res => {
          if (res.code == 0) {
            this.typeList = res.data
            this.$nextTick(() => {
              this.loadTypeName()
            })
          }
        })
      },
      loadTypeName() {
        if (this.type) {
          for (let u of this.typeList) {
            if (u.id == this.type) {
              this.typeName = u.name
            } else {
              for (let v of u.children) {
                if (v.id == this.type) {
                  this.typeName = v.name
                }
              }
            }
          }
        } else {
          this.typeName = ''
        }
      },
      changeType(type) {
        this.type = type
        if (this.kw == '') {
          this.$router.replace({
            path: '/search?type=' + type
          })
        } else {
          this.$router.replace({
            path: '/search?kw=' + this.kw + '&type=' + type
          })
        }
        this.loadGoods()
      },
      moreToggle() {
        if (this.showTypeIndex == this.typeList.length) {
          this.showTypeIndex = 5
        } else {
          this.showTypeIndex = this.typeList.length
        }
      },
      jumpToDetail(id) {
        let detailPath = this.$router.resolve({
          path: '/detail?id=' + id
        })
        window.open(detailPath.href, '_blank')
      }
    },
    mounted() {
      if (this.$route.query.kw) {
        this.kw = this.$route.query.kw
      }
      if (this.$route.query.type) {
        this.type = this.$route.query.type
      }
      this.loadType()
      this.loadGoods()
    }
  }
</script>

<style lang="less" scoped>
  .search{background: #fff;
    .main{padding: 0 calc(50% - 600px) 20px;
      .selectCategory{border: 1px solid #ddd;color: #666;font-size: 12px;position: relative;
        .title{background: #FAFAFA;padding: 10px 15px;
          span{color: #006DB8;margin: 0 5px;}
        }
        .row{border-top: 1px solid #eee;position: relative;overflow: hidden;;
          .left{width: 120px;background: #FAFAFA;padding: 0 15px;height: 100%;line-height: 40px;position: absolute;top: 0;left: 0;}
          .right{width: calc(100% - 120px);line-height: 40px;padding: 0 15px;float: right;}
          span{margin-right: 15px;cursor: pointer;white-space: nowrap;padding: 3px 8px;}
          span:hover{text-decoration: underline;}
          .active{background: #006DB8;color: #fff;}
        }
      }
      .more{position: absolute;bottom: -25px;left: 50%;transform: translateX(-50%);font-size: 18px;cursor: pointer;animation: moreMove linear 1.5s infinite;}
      @keyframes moreMove{0%{bottom: -25px;}50%{bottom: -35px;}100%{bottom: -25px;}}
    }
    .tab{width: 1200px;margin: 0 auto;overflow: hidden;border-bottom: 1px solid #f1f1f1;
      ul{float: left;overflow: hidden;
        li{line-height: 40px;padding: 0 15px;float: left;font-size: 12px;cursor: pointer;position: relative;}
        .active{color: #006DB8;font-weight: bold;}
        .active::after{content: '';width: 40%;height: 3px;background: #006DB8;position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);}
      }
    }
    .row{width: 1200px;margin: 0 auto;
      .contentCopy{padding: 12px 0;
        .contentBox{width: 291px;height: 279px;margin-right: 12px;margin-bottom: 12px;padding: 15px;float: left;cursor: pointer;background: #fff;position: relative;
          img{height: 65%;margin: 0 auto 15px;display: block;}
          h1{height: 42px;text-align: center;color: #4a4a4a;font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
          h2{text-align: center;color: #666;margin: 5px 0;}
          h3{font-size: 24px;font-weight: bold;text-align: center;color: #e74c3c;
            span{font-size: 14px;}
          }
          .addCart{width: 40px;height: 40px;position: absolute;top: 0;right: 15px;transition: all .3s linear;opacity: 0;
            span{background: rgba(0, 0, 0, .3);display: block;text-align: center;border-radius: 5px;
              i{line-height: 40px;color: #333;}
            }
          }
        }
        .contentBox:nth-child(4n){margin-right: 0;}
        .contentBox:hover{box-shadow: 0 0 4px 2px rgba(0, 109, 184, .1);
          .addCart{opacity: 1;top: 15px;}
        }
      }
    }
    .page{text-align: center;margin: 30px 0;}
  }
</style>