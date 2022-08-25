<template>
  <div class="order">
    <Header :step="true" :active="1"></Header>
    <div class="main">
      <el-timeline>
        <el-timeline-item timestamp="收货人信息" placement="top">
          <div class="address">
            <div v-for="item in addressList" :key="item.id" :class="['addressBox', item.id == postId ? 'default' : '']" @click="selectAddress(item.id)">
              <div class="name">
                <span style="margin-right: 5px;">{{item.consignee}}</span>
                <span>{{item.mobile}}</span>
              </div>
              <div class="area">
                <span>{{item.regionName}}</span>
              </div>
              <div class="family">
                <span>{{item.address}}</span>
              </div>
            </div>
            <div class="addressBox">
              <router-link to="/myAddress"><b><i class="el-icon-location"></i> 管理收货地址</b></router-link>
            </div>
          </div>
        </el-timeline-item>
        <el-timeline-item timestamp="发票信息" placement="top">
          <el-select placeholder="请选择发票类型" style="margin-top: 1.33%;" v-model="invoiceType">
            <el-option value="纸质专票" label="纸质专票" key="纸质专票"></el-option>
            <el-option value="电子普票" label="电子普票" key="电子普票"></el-option>
          </el-select>
        </el-timeline-item>
        <el-timeline-item timestamp="订单留言" placement="top">
          <el-input
            style="margin-top: 1.33%;"
            type="textarea"
            placeholder="请输入内容"
            maxlength="200"
            rows="5"
            v-model="remark"
            show-word-limit>
          </el-input>
        </el-timeline-item>
      </el-timeline>
      <div class="operate" style="overflow:hidden;">
        <el-button type="danger" class="fr" @click="submit">提交订单信息</el-button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  export default {
    name: "order",
    components: {
      Header,
      Footer
    },
    data() {
      return {
        postId: '',
        invoiceType: '',
        remark: '',
        addressList: []
      }
    },
    methods: {
      loadAddress() {
        this.$post('my/getCustomerPostAll').then(res => {
          if (res.code == 0) {
            this.addressList = res.data
            for (let v of this.addressList) {
              if (v.flag == 1) {
                this.postId = v.id
              }
            }
          }
        })
      },
      selectAddress(id) {
        this.postId = id
      },
      submit() {
        if (this.postId == '' || this.invoiceType == '') {
          this.$message.error('请将订单信息填写完整')
        } else {
          let sendData = {
            postId: this.postId,
            invoiceFlag: 1,
            invoiceType: this.invoiceType,
            invoiceContent: '我要开票',
            remark: this.remark,
            totalNumber: this.$route.query.orderId
          }
          this.$post('order/addOrderAddress', sendData).then(res => {
            if (res.code == 0) {
              this.$post('order/addOrderPay', {
                payMode: '货到付款',
                totalNumber: this.$route.query.orderId
              }).then(res => {
                if (res.code == 0) {
                  this.$router.replace({
                    path: '/sign'
                  })
                }
              })
            }
          })
        }
      }
    },
    mounted() {
      this.loadAddress()
    }
  }
</script>

<style lang="less" scoped>
  .order{background: #fff;height: 100vh;
    .main{width: 800px;margin: 30px auto;
      .address{overflow: hidden;font-size: 12px;color: #666;
        .addressBox{width: 32%;padding: 10px 15px;border: 1px solid #ddd;cursor: pointer;float: left;margin-right: 1.33%;margin-top: 1.33%;height: 96px;
          .name{font-weight: bold;}
          .area{margin: 5px 0;}
          a{color: #006DB8;
            b{line-height: 76px;text-align: center;display: block;}
          }
        }
        .default{border: 1px solid #006DB8;position: relative;
          .name{color: #006DB8;}
        }
        .default::after{content: '';border: 8px solid transparent;border-right: 8px solid #006DB8;border-bottom: 8px solid #006DB8;position: absolute;bottom: 0;right: 0;}
      }
    }
  }
</style>