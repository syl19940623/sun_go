<template>
  <div class="footerContainer" :style="fixed ? {position: 'fixed'} : {}">
    <div class="footerOut">
      <div class="footer">
        <div class="left">
          <ul>
            <li><i class="fa fa-file-text fa-fw"></i>新手上路</li>
            <li><router-link to="/explain?id=0101" target="_blank">订购流程</router-link></li>
          </ul>
          <ul>
            <li><i class="fa fa-shopping-cart fa-fw"></i>配送与支付</li>
            <li><router-link to="/explain?id=0201" target="_blank">支付方式</router-link></li>
            <li><router-link to="/explain?id=0202" target="_blank">配送说明</router-link></li>
          </ul>
          <ul>
            <li><i class="fa fa-shield fa-fw"></i>服务保证</li>
            <li><router-link to="/explain?id=0301" target="_blank">质量保证</router-link></li>
            <li><router-link to="/explain?id=0302" target="_blank">售后服务</router-link></li>
          </ul>
          <ul>
            <li><i class="fa fa-phone fa-fw"></i>联系我们</li>
            <li><router-link to="/explain?id=0401" target="_blank">联系方式</router-link></li>
<!--            <li><router-link to="/leaveMessage" target="_blank">留言建议</router-link></li>-->
          </ul>
          <ul>
            <li><i class="fa fa-user fa-fw"></i>商城资讯</li>
            <li><router-link to="/explain?id=0501" target="_blank">促销信息</router-link></li>
            <li><router-link to="/explain?id=0502" target="_blank">办公百科</router-link></li>
          </ul>
        </div>
        <div class="right">
          <img src="../../assets/img/promise.png" alt="">
        </div>
      </div>
      <div class="copyright">
        <h1>Copyright © 2022 - 2032 万家寨水务控股集团有限公司 版权所有</h1>
        <h1>
          <a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备13001390号-8</a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=14010602060952" target="_blank">晋公网安备 14010602060952号</a>
        </h1>
        <h1>技术支持 山西黄河智创科技有限公司</h1>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      fixed: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scoped>
  .footerContainer{z-index: 9999;bottom: 0;left: 0;width: 100%;
    .footerOut{background: #fff;width: 100%;padding-top: 40px;
      .footer{width: 1200px;margin: 0 auto;padding: 20px 0 20px;overflow: hidden;border-top: 1px solid #727071;
        .left{width: 700px;float: left;display: flex;justify-content: space-between;
          ul{
            li{line-height: 30px;cursor: pointer;}
            li:first-child{color: #727071;font-size: 14px;margin-bottom: 15px;
              i{color: #006DB8;margin-right: 5px;}
            }
            li:not(:first-child){text-align: center;
              a{color: #727071;font-size: 12px;}
            }
            li:hover{color: #006DB8;
              a{text-decoration: underline;color: #006DB8;}
            }
          }
        }
        .right{width: 500px;float: left;text-align: right;position: relative;overflow: hidden;padding-top: 30px;
          img{height: 34px;float: right;margin-right: 30px;}
        }
      }
      .copyright{padding-bottom: 10px;
        h1{text-align: center;font-size: 12px;margin-bottom: 10px;display: flex;justify-content: center;
          a{text-align: center;font-size: 12px;display: block;color: #606060;padding: 0 5px;}
        }
      }
    }
  }
</style>