<template>
  <ul class="fixedMenu">
    <li @click="jumpToCart">
      <el-badge :value="$store.state.goodsNum" class="item" v-if="$store.state.goodsNum > 0">
        <i class="fa fa-shopping-cart fa-fw"></i>
      </el-badge>
      <i class="fa fa-shopping-cart fa-fw" v-else></i>
    </li>
    <li @click="scrollTop"><i class="fa fa-angle-up fa-fw"></i></li>
  </ul>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        personalInfo: ''
      }
    },
    methods: {
      jumpToCart() {
        if (this.personalInfo != '') {
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
      scrollTop() {
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let step = distance / 30;
        (function jump() {
          if (distance > 0) {
            distance -= step;
            window.scrollTo(0, distance);
            setTimeout(jump, 10);
          }
        })();
      }
    },
    mounted() {
      this.personalInfo = localStorage.getItem('personalInfo')
      if (this.personalInfo != null) {
        this.$post('common/getUserPublicData').then(res => {
          if (res.code == 0) {
            this.$store.commit('updateGoodsNum', res.data.shoppingCartCount)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .fixedMenu{position: fixed;bottom: 50px;right: 15px;background: #fff;box-shadow: 0 0 4px 2px rgba(0, 109, 184, .1);cursor: pointer;width: 40px;
    li{height: 40px;text-align: center;border-bottom: 1px solid #f1f1f1;
      i{line-height: 38px;font-size: 24px;color: #333;}
    }
  }
</style>