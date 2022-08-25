<template>
  <div class="myOrder">
    <Header></Header>
    <div class="main">
      <div class="title">收货地址</div>
      <div class="address">
        <div v-for="item in addressList" :key="item.id" :class="['addressBox', item.flag == 1 ? 'default' : '']">
          <div class="name">
            <span>{{item.consignee}}</span>
            <span>{{item.mobile}}</span>
          </div>
          <div class="area">
            <span>{{item.regionName}}</span>
          </div>
          <div class="family">
            <span>{{item.address}}</span>
          </div>
          <div class="operate">
            <el-link :underline="false" @click="edit(item.id)">编辑</el-link>
            <el-link :underline="false" @click="del(item.id)">删除</el-link>
          </div>
        </div>
        <div class="addressBox">
          <b @click="add">+ 添加收货地址</b>
        </div>
      </div>
    </div>

    <Dialog :show.sync="show" width="500px" :is-show-close="false" title="收货地址" :btns="['保存', '取消']" @dialogOperate="dialogOperate">
      <div slot="vNode" style="padding: 25px;">
        <el-form label-width="68px">
          <el-form-item label="收货人">
            <el-input placeholder="请输入收货人姓名" v-model="addressData.consignee"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input placeholder="请输入收货人手机号" v-model="addressData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-cascader
              v-model="addressData.region"
              placeholder="请选择所在地区"
              :options="areaList"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input placeholder="请输入详细地址(街道门牌)" v-model="addressData.address"></el-input>
          </el-form-item>
          <el-form-item label="设为默认">
            <el-switch
              v-model="addressData.flag">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import Dialog from "../components/Dialog/Dialog";

  import Header from '../components/Header';

  export default {
    name: "myAddress",
    components: {
      Dialog,
      Header
    },
    data() {
      return {
        addressId: 1,
        addressList: [],
        show: false,
        areaList: [],
        addressData: {
          consignee: '',
          mobile: '',
          region: '',
          address: '',
          flag: false
        },
        addressDataEmpty: {},
        source: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.source = from.path
      })
    },
    methods: {
      loadAddress() {
        this.$post('my/getCustomerPostAll').then(res => {
          if (res.code == 0) {
            this.addressList = res.data
          }
        })
      },
      add() {
        this.show = true
      },
      edit(id) {
        this.show = true
        this.$post('my/getCustomerPostById', {
          id: id
        }).then(res => {
          if (res.code == 0) {
            let sendData = {}
            Object.assign(sendData, res.data)
            sendData.flag = sendData.flag == 1 ? true : false
            this.addressData = sendData
          }
        })
      },
      del(id) {
        this.$post('my/removeCustomerPost', {
          id: id
        }).then(res => {
          if (res.code == 0) {
            this.loadAddress()
          }
        })
      },
      dialogOperate(index) {
        if (index == 0) {
          let sendData = {}
          Object.assign(sendData, this.addressData)
          sendData.flag = sendData.flag ? 1: 0
          let url = ''
          if (sendData.id) {
            url = 'my/setCustomerPost'
          } else {
            url = 'my/addCustomerPost'
          }
          if (typeof(sendData.region) == 'object') {
            sendData.region = sendData.region[sendData.region.length - 1]
          }
          this.$post(url, sendData).then(res => {
            if (res.code == 0) {
              this.loadAddress()
              this.show = false
              Object.assign(this.addressData, this.addressDataEmpty)
              if (this.source == '/order') {
                this.$router.back(-1)
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          this.addressData = JSON.parse(JSON.stringify(this.addressDataEmpty))
        }
      },
      loadArea() {
        this.$post('common/getXZQHAll').then(res => {
          if (res.code == 0) {
            this.areaList = res.data
          }
        })
      }
    },
    mounted() {
      Object.assign(this.addressDataEmpty, this.addressData)
      this.loadAddress()
      this.loadArea()
    }
  }
</script>

<style lang="less" scoped>
  .myOrder{background: #f1f1f1;
    .main{width: 1200px;margin: 15px auto;padding: 30px;background: #fff;
      .title{font-size: 20px;font-weight: bold;margin-bottom: calc(.133% + 30px);}
      .address{overflow: hidden;font-size: 12px;color: #666;
        .addressBox{width: 32%;padding: 20px;border: 1px solid #ddd;cursor: pointer;float: left;margin-right: 1.33%;margin-bottom: 1.33%;position: relative;height: 110px;
          .name{font-weight: bold;}
          .area{margin: 10px 0;}
          b{line-height: 70px;text-align: center;display: block;color: #006DB8;}
          .operate{position: absolute;bottom: 15px;right: 15px;
            a{margin-left: 15px;font-size: 12px;}
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

<style lang="less">
  .el-cascader{width: 100%;}
</style>