<template>
  <div class="explain">
    <Header></Header>
    <div class="main">
      <h1 class="title">{{explain.name}}</h1>
      <div class="content" v-html="explain.remark"></div>
    </div>
    <div style="height: 234px;"></div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  export default {
    name: "notice",
    components: {
      Header,
      Footer
    },
    data() {
      return {
        explain: {}
      }
    },
    mounted() {
      if (this.$route.query.id) {
        this.$post('notice/getExplainById', {
          id: this.$route.query.id
        }).then(res => {
          if (res.code == 0) {
            this.explain = res.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .explain{background: #fff;min-height: 100vh;position: relative;width: 100%;
    .main{width: 1200px;margin: 0 auto;padding: 50px 25px;
      .title{font-size: 24px;font-weight: bold;text-align: center;margin-bottom: 30px;}
    }
    .footer{position: absolute;bottom: 0;left: 0;width: 100%;}
  }
</style>