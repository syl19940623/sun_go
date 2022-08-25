<template>
  <div class="cart">
    <Header :step="true" :active="0"></Header>
    <div class="main">
      <p class="totalCount">全部商品 ({{cartList.length}})</p>
      <ul class="title">
        <li>商品信息</li>
        <li>单价</li>
        <li>数量</li>
        <li>小计</li>
        <li>操作</li>
      </ul>
      <div class="content">
        <ul v-for="(item, index) in cartList" :key="item.id">
          <li>
            <el-checkbox v-model="checkboxArr" :label="index" :disabled="item.showState == 1 || item.inventoryNum == 0"></el-checkbox>
            <div class="img">
              <img :src="item.homePic" alt="">
            </div>
            <div class="txt">
              <h1 class="name ellipsis" @click="jumpToDetail(item.id)" :style="{'pointer-events': (item.showState == 1 || item.inventoryNum == 0) ? 'none' : ''}">{{item.name}}</h1>
              <p class="subname ellipsis">{{item.brand}} {{item.claId}} {{item.specification}}</p>
            </div>
          </li>
          <li>
            ￥{{item.price}}
          </li>
          <li>
            <div class="operateNum">
              <span @click="decrementNum(index)" :style="{'pointer-events': (item.showState == 1 || item.inventoryNum == 0) ? 'none' : ''}">-</span>
              <input type="number" v-model="item.num" :disabled="item.showState == 1 || item.inventoryNum == 0">
              <span @click="incrementNum(index)" :style="{'pointer-events': (item.showState == 1 || item.inventoryNum == 0) ? 'none' : ''}">+</span>
            </div>
          </li>
          <li>
            <b>￥{{(item.price * item.num).toFixed(2)}}</b>
          </li>
          <li>
            <el-link type="danger" :underline="false" @click="removeGoods(item.id, item.num, index)">移除</el-link>
          </li>
          <span class="goodsStatus" v-if="item.showState == 1 || item.inventoryNum == 0">{{item.state == 1 ? '已下架' : '已售罄'}}</span>
        </ul>
      </div>
      <p style="text-align: right;margin-bottom: 15px;">邮费8元，满89元包邮</p>
      <ul class="buy">
        <li><el-button type="danger" @click="submit">（合计：{{calcTotal}}元）结算</el-button></li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  export default {
    name: "cart",
    components: {
      Header,
      Footer
    },
    data() {
      return {
        checkboxArr: [],
        cartList: []
      }
    },
    computed: {
      calcTotal() {
        let totalPrice = 0
        for (let v of this.checkboxArr) {
          totalPrice += (this.cartList[v].price * this.cartList[v].num)
        }
        if (this.checkboxArr != '' && totalPrice < 89) {
          totalPrice = totalPrice + 8
        }
        return totalPrice.toFixed(2);
      }
    },
    methods: {
      loadCart() {
        this.$post('my/getShoppingCartData').then(res => {
          if (res.code == 0) {
            this.cartList = res.data
          }
        })
      },
      decrementNum(index) {
        let goodsNum = this.cartList[index].num
        if (goodsNum > 1) {
          goodsNum = (goodsNum * 10000 - 10000) / 10000
          this.cartList[index].num = goodsNum
        }
      },
      incrementNum(index) {
        let goodsNum = this.cartList[index].num
        goodsNum = (goodsNum * 10000 + 10000) / 10000
        this.cartList[index].num = goodsNum
      },
      removeGoods(id, num, index) {
        this.$post('my/removeShoppingCard', {
          goodId: id,
          goodNum: num
        }).then(res => {
          if (res.code == 0) {
            if (this.checkboxArr.includes(index)) {
              this.checkboxArr.splice(index, 1)
            }
            this.loadCart()
            this.$store.commit('updateGoodsNum', res.data)
          }
        })
      },
      submit() {
        let totalArr = []
        for (let v of this.checkboxArr) {
          let obj = {
            goodId: this.cartList[v].id,
            goodNum: this.cartList[v].num
          }
          totalArr.push(obj)
        }
        if (totalArr == '') {
          this.$message.error('请勾选要购买的商品')
        } else {
          this.$post('order/add', totalArr).then(res => {
            if (res.code == 0) {
              this.$router.replace({
                path: '/order?orderId=' + res.data
              })
            } else {
              this.$message.error(res.msg)
            }
          })
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
      this.loadCart()
    }
  }
</script>

<style lang="less" scoped>
  .cart{background: #fff;height: 100vh;
    .main{width: 1200px;margin: 30px auto;font-size: 12px;min-height: 500px;
      .totalCount{line-height: 40px;color: #333;font-weight: bold;}
      .title{overflow: hidden;width: 100%;
        li{float: left;background: #F5F5F5;line-height: 36px;color: #666;}
        li:first-child{width: 50%;padding: 0 15px;}
        li:not(:first-child){width: calc(50% / 4);text-align: center;}
      }
      .content{margin: 15px 0;
        ul{border: 1px solid #ddd;padding: 15px 0;overflow: hidden;margin-bottom: 15px;position: relative;
          li{float: left;color: #666;
            .operateNum{width: 110px;padding: 27.5px 0;margin: 0 auto;
              span{width: 25px;height: 25px;background: #EFEFEF;float: left;line-height: 25px;cursor: pointer;user-select: none;}
              input{width: 60px;height: 25px;float: left;border: 1px solid #EFEFEF;text-align: center;}
            }
          }
          li:first-child{width: 50%;padding: 0 15px;
            label{float: left;line-height: 80px;}
            .img{float: left;width: 60px;height: 80px;overflow: hidden;margin: 0 15px;
              img{width: 100%;}
            }
            .txt{float: left;padding: 15px 0;width: calc(100% - 104px);
              .name{font-size: 18px;font-weight: bold;color: #333;cursor: pointer;}
              .name:hover{text-decoration: underline;}
              .subname{color: #999;margin-top: 6px;}
            }
          }
          li:not(:first-child){width: calc(50% / 4);text-align: center;line-height: 80px;}
          .goodsStatus{position: absolute;top: -12px;left: -38px;width: 100px;height: 50px;background: #F57272;text-align: center;line-height: 70px;color: #fff;transform: rotate(-45deg)}
        }
      }
      .buy{overflow: hidden;
        li:first-child{float: left;}
        li:last-child{float: right;}
      }
    }
  }
</style>

<style lang="less">
  .el-checkbox__label{display: none;}
</style>