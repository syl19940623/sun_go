<template>
  <div class="index">
    <Header></Header>
    <div class="bannerOut">
      <div class="swiper">
        <img src="../assets/img/banner_1.jpg" alt="">
      </div>
      <div class="notice">
        <div class="icon"><i class="fa fa-volume-up fa-fw"></i></div>
        <div class="name">系统公告</div>
        <div class="content">
          <el-carousel height="38px" direction="vertical" :interval="5000">
            <el-carousel-item v-for="(item, index) in countData" :key="index">
              <ul>
                <li v-for="(childItem, index) in item" :key="index" class="ellipsis">
                  <router-link :to="'/notice?id_prikey=' + childItem.id_prikey" target="_blank">{{childItem.title}}</router-link>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="row" v-for="item in typeList" :key="item.id">
      <div class="title">
        <i class="lineLeft"></i>
        <h1>{{item.name}}</h1>
        <i class="lineRight"></i>
      </div>
      <div class="content">
        <div class="left">
          <router-link :to="'/search?type=' + item.id">
            <img v-lazy="item.remark" alt="">
          </router-link>
<!--          <div class="more">-->
<!--            <h1>{{item.name}}</h1>-->
<!--            <router-link :to="'/search?type=' + item.id">更多<i class="fa fa-chevron-circle-right fa-fw"></i></router-link>-->
<!--          </div>-->
        </div>
        <div class="right">
          <div class="box" v-for="childItem in item.goods" :key="childItem.id" @click="jumpToDetail(childItem.id)">
            <div class="img">
              <img v-lazy="childItem.homePic ? childItem.homePic : require('../assets/img/noImg.png')" alt="图片加载失败">
            </div>
            <div class="name">{{childItem.name}}</div>
            <div class="price" v-if="childItem.price == 0"><span class="symbol">￥</span>时价</div>
            <div class="price" v-else><span class="symbol">￥</span>{{childItem.price}}<span class="unit">元</span></div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <FixedMenu></FixedMenu>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  import FixedMenu from '../components/FixedMenu';

  export default {
    name: "index",
    components: {
      Header,
      Footer,
      FixedMenu
    },
    data() {
      return {
        typeList: [],
        noticeList: [],
        countData: []
      }
    },
    methods: {
      loadType() {
        this.$post('good/getHomeClassGoods').then(res => {
          if (res.code == 0) {
            this.typeList = res.data
          }
        })
      },
      jumpToDetail(id) {
        let detailPath = this.$router.resolve({
          path: '/detail?id=' + id
        })
        window.open(detailPath.href, '_blank')
      },
      loadNotice() {
        this.$post('notice/getNoticePagingData', {
          page: 1,
          limit: 40
        }).then(res => {
          if (res.code == 0) {
            this.noticeList = res.data
            let countData = []
            let len = this.noticeList.length;
            let data;
            for (let i = 0; i< len;i+=4) {
              data = []
              if(this.noticeList[i]!=undefined)
              data.push(this.noticeList[i]);
              if(this.noticeList[i+1]!=undefined)
              data.push(this.noticeList[i+1]);
              if(this.noticeList[i+2]!=undefined)
              data.push(this.noticeList[i+2]);
              if(this.noticeList[i+3]!=undefined)
              data.push(this.noticeList[i+3]);
              countData.push(data);
            }
            this.countData = countData;
          }
        })
      }
    },
    mounted() {
      this.loadType()
      this.loadNotice()
    }
  }
</script>

<style lang="less" scoped>
  .categoryOut{position: relative;width: 1200px;margin: 0 auto;
    .category{width: 230px;height: 460px;position: absolute;background: rgba(0, 0, 0, .7);z-index: 9;
      .categoryItem{text-align: center;line-height: calc(460px / 7);box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, .1);cursor: pointer;color: #fff;font-size: 18px;letter-spacing: 20px;text-indent: 20px;}
      .categoryItem:hover{background: rgba(255, 255, 255, .5);}
    }
    .subCategory{position: absolute;top: 0;left: 230px;width: 600px;height: 460px;overflow-y: auto;background: #fff;z-index: 9;box-shadow: 0 0 16px 2px rgba(0, 0, 0, .2) inset;padding: 30px 25px;
      .subCategoryRow{overflow: hidden;margin-bottom: 15px;
        .left{width: 110px;float: left;}
        .right{width: calc(100% - 110px);float: left;
          .el-link{margin-right: 25px;margin-bottom: 15px;}
        }
      }
    }
  }
  .bannerOut{width: 100%;background: #fff;padding-bottom: 30px;
    .swiper{width: 1200px;height: 460px;margin: 0 auto;
      img{display: block;width: 100%;height: 100%;object-fit: cover;}
    }
    .notice{width: 1200px;height: 40px;margin: 15px auto 0;border: 1px solid var(--themeColor);
      .icon{width: 38px;text-align: center;float: left;
        i{line-height: 38px;color: var(--themeColor);font-size: 18px;}
      }
      .name{float: left;line-height: 38px;color: var(--themeColor);font-weight: bold;}
      .content{float: left;width: calc(100% - 94px);
        ul{overflow: hidden;
          li{float: left;width: 25%;line-height: 38px;text-align: center;position: relative;
            a{color: var(--themeColor);}
          }
          li:not(:last-child)::after{content: '';width: 1px;height: 40%;background: var(--themeColor);position: absolute;top: 50%;right: 0;transform: translateY(-50%);}
        }
      }
    }
  }
  .row{width: 1200px;margin: 30px auto;
    .title{overflow: hidden;color: #727071;margin-bottom: 15px;
      i{width: 500px;height: 2px;background-size: 100%;float: left;margin-top: 12px;}
      .lineLeft{background: url('../assets/img/lineLeft.png') no-repeat;}
      h1{width: 200px;font-size: 20px;font-weight: bold;float: left;text-align: center;}
      .lineRight{background: url('../assets/img/lineRight.png') no-repeat;}
    }
    .content{overflow: hidden;
      .left{width: 251px;float: left;position: relative;
        img{width: 100%;display: block;}
        .more{position: absolute;z-index: 9;top: 25px;left: 0;width: 100%;padding: 0 15px;color: #fff;
          h1{float: left;font-size: 28px;font-weight: bold;letter-spacing: 10px;}
          a{float: right;line-height: 37px;color: #fff;}
        }
      }
      .right{width: calc(100% - 251px);float: left;
        .box{width: calc((100% / 3) - 15px);height: 250px;background: #fff;cursor: pointer;float: left;margin-left: 15px;margin-bottom: 15px;padding-top: 15px;
          .img{width: 150px;height: 150px;margin: 0 auto;overflow: hidden;
            img{width: 100%;transition: all .3s linear;}
          }
          .name{font-size: 12px;padding: 0 15px;height: 30px;text-align: center;margin: 15px 0 10px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
          .price{text-align: center;color: #e74c3c;
            .symbol{background: #e74c3c;color: #fff;display: inline-block;width: 16px;height: 16px;border-radius: 50%;font-size: 12px;line-height: 16px;margin-right: 5px;}
            .unit{font-size: 12px;margin-left: 5px;}
          }
        }
        .box:last-child{margin-right: 0;}
        .box:hover{
          img{transform: scale(1.1);}
        }
      }
    }
  }
</style>