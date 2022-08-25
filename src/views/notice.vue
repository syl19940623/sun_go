<template>
  <div class="notice">
    <Header></Header>
    <div class="main">
      <h1 class="title">{{notice.title}}</h1>
      <h2 class="subtitle">{{notice.sendDate}}</h2>
      <div class="content" v-html="notice.ncontent"></div>
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
        notice: {}
      }
    },
    mounted() {
      if (this.$route.query.id_prikey) {
        this.$post('notice/getNoticeById', {
          id_prikey: this.$route.query.id_prikey
        }).then(res => {
          if (res.code == 0) {
            this.notice = res.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .notice{background: #fff;min-height: 100vh;position: relative;
    .main{width: 1200px;margin: 0 auto;padding: 50px 25px;
      .title{font-size: 24px;font-weight: bold;text-align: center;}
      .subtitle{font-size: 12px;text-align: center;margin: 15px 0 30px;}
    }
    .footer{position: absolute;bottom: 0;left: 0;width: 100%;}
  }
</style>