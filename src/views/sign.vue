<template>
  <div class="sign">
    <Header :step="true" :active="2"></Header>
    <div class="main">
      <el-result icon="success" title="购买成功" sub-title="您的订单信息可以在 个人中心->我的订单 中查看">
        <template slot="extra">
          <el-button type="primary" size="medium" @click="goIndex">返回首页</el-button>
        </template>
      </el-result>
    </div>
    <div style="height: 234px;"></div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  export default {
    name: "sign",
    components: {
      Header,
      Footer
    },
    methods: {
      goIndex() {
        this.$router.replace({
          path: '/index'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .sign{height: 100vh;
    .main{width: 1200px;margin: 0 auto;padding: 50px 0;}
  }
</style>