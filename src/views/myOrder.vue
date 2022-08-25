<template>
  <div class="myOrder">
    <Header></Header>
    <div class="main">
      <ul class="tab">
        <li v-for="(item, index) in tabList" :key="item.id" :class="index == tabIndex ? 'active' : ''" @click="tabChange(index)">{{item.name}}</li>
      </ul>
      <div class="info">
        <el-date-picker
          v-model="orderDateRange"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange">
        </el-date-picker>
        <ul class="title">
          <li>订单详情</li>
          <li>商品总金额</li>
          <li>收货人</li>
          <li>订单状态</li>
          <li>操作</li>
        </ul>
        <div class="content">
          <template v-if="orderList != ''" >
            <div v-for="(item, index) in orderList" :key="index" class="contentRow">
              <div class="title" v-if="item.orders.length > 1">
                <span>{{item.date}}</span>
                <span>订单号： {{item.totalNumber}}</span>
                <p>您订单中的商品分属不同供应商，故拆分为以下订单分开配送，给您带来的不便敬请谅解</p>
              </div>
              <div v-for="(childItem, index) in item.orders" :key="index" class="contentSubRow">
                <div class="subtitle">
                  <span>{{childItem.date}}</span>
                  <span>订单号：{{childItem.id}}</span>
                  <span>订单金额：<b style="color: #e74c3c;">{{childItem.totalPrice}} 元</b></span>
                  <span v-if="childItem.courierMoney">邮费：<b style="color: #e74c3c;">{{childItem.courierMoney}} 元</b></span>
                  <span>合计金额：<b style="color: #e74c3c;">{{childItem.totalPrice + (childItem.courierMoney ? childItem.courierMoney : 0)}} 元</b></span>
                  <div class="fr" v-if="childItem.state == 30">
                    <span v-if="childItem.courierNumber" @click="flowInfo(childItem.courierNumber, childItem.courierNameName,childItem.courierAttr)">物流信息</span>
                    <span @click="confirmReceive(childItem.id)" style="color: #009B4C;">确认收货</span>
                  </div>
                  <div class="fr" v-if="childItem.state == 20">
                    <span @click="orderRevoke(childItem.id)" style="color: #F56C6C;">撤销订单</span>
                  </div>
                </div>
                <el-tooltip class="item" effect="dark" :content="childItem.remark" placement="top-start">
                  <div class="remarkRow ellipsis">备注：{{childItem.remark}}</div>
                </el-tooltip>
                <ul class="row" v-for="(grandItem, index) in childItem.details" :key="index">
                  <li>
                    <div class="img">
                      <img :src="grandItem.good.homePic" alt="">
                    </div>
                    <div class="txt">
                      <h1 @click="jumpToDetail(grandItem.goodId)">{{grandItem.good.name}}</h1>
                      <h2>{{grandItem.good.brand}} {{grandItem.good.specification}}</h2>
                      <h3>×{{grandItem.num}}<span style="margin-left: 10px;color: #e67e22;" v-if="grandItem.state != 0">{{grandItem.stateName}}</span></h3>
                    </div>
                  </li>
                  <li>￥{{grandItem.totalPrice}}</li>
                  <li>{{childItem.consignee ? childItem.consignee : '&nbsp;'}}</li>
                  <li>{{childItem.stateName}}</li>
                  <li><el-link v-if="childItem.state == 30 && grandItem.state == 0" type="danger" :underline="false" @click="refundGoods(grandItem.id)">退货</el-link></li>
                </ul>
              </div>
            </div>
            <ul class="statisticsOut">
              <li>合计：{{totalNum}} 个</li>
              <li>￥{{totalPrice}}</li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div class="pageOut" style="text-align: right;margin-top: 15px;">
              <el-pagination
                layout="total, prev, pager, next"
                @current-change="loadOrder"
                :current-page="page"
                :page-size="10"
                :total="orderListLength">
              </el-pagination>
            </div>
          </template>
          <template v-if="orderList == ''">
            <el-empty description="暂无订单"></el-empty>
          </template>
        </div>
      </div>
    </div>
    <!-- 退货说明 -->
    <Dialog :show.sync="show" title="退货信息" width="538px" :btns="['提交', '取消']" @dialogOperate="dialogOperate">
      <div slot="vNode" style="padding: 25px 15px 0;">
        <el-form label-width="68px">
          <el-form-item label="退货原因">
            <el-radio-group v-model="refundType">
              <el-radio label="物流运损">物流运损</el-radio>
              <el-radio label="商品质量问题">商品质量问题</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="退货说明">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入退货说明"
              v-model="refundRemark">
            </el-input>
          </el-form-item> -->
          <el-form-item label="图片上传" style="position: relative;">
            <el-button type="primary" size="small" icon="el-icon-upload2">选择图片</el-button>
            <input type="file" @change="uploadRefundImg" accept="image/*" style="position: absolute;top: 0;left: 0;width: 97px;height: 32px;opacity: 0;">
          </el-form-item>
          <el-form-item label="图片预览" class="clear" v-if="refundImgList != ''">
            <div class="refundImgPreview" v-for="(item, index) in refundImgList" :key="index">
              <img :src="item" alt="">
              <i class="el-icon-error" @click="removeRefundImg(index)"></i>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Dialog from "../components/Dialog/Dialog";

  export default {
    name: "myOrder",
    components: {
      Header,
      Dialog
    },
    data() {
      return {
        tabIndex: 0,
        tabList: [
          {
            id: '',
            name: '全部订单'
          },
          {
            id: 20,
            name: '待发货'
          },
          {
            id: 30,
            name: '待收货'
          },
          {
            id: 40,
            name: '已收货'
          },
          {
            id: 50,
            name: '已开票'
          },
          {
            id: 21,
            name: '撤销中'
          },
          {
            id: 22,
            name: '已撤销'
          }
        ],
        orderList: [],
        show: false,
        refundType: '',
        refundRemark: '',
        page: 1,
        orderListLength: 0,
        orderDateRange: [],
        totalNum: 0,
        totalPrice: 0,
        refundImgList: []
      }
    },
    methods: {
      tabChange(index) {
        this.tabIndex = index
        this.loadOrder(1)
      },
      dateChange(date) {
        this.orderDateRange = date
        this.loadOrder(1)
      },
      flowInfo(id, name, courierAttr) {
        if (courierAttr == 'ps') {
          this.$alert('商家正在给您配送商品，请耐心等待', '物流提示');
        } else {
          window.open('https://www.kuaidi100.com/chaxun?com=' + courierAttr + '&nu=' + id)
        }
      },
      loadOrder(page) {
        this.page = page
        this.$post('order/getPagingOrderData', {
          page: page,
          limit: 10,
          state: this.tabList[this.tabIndex].id,
          dateStart: this.orderDateRange[0],
          dateEnd: this.orderDateRange[1]
        }).then(res => {
          if (res.code == 0) {
            this.orderList = res.data
            this.orderListLength = res.count
            if (res.totalRow) {
              this.totalNum = res.totalRow.num
              this.totalPrice = res.totalRow.totalPrice
            }
          }
        })
      },
      confirmReceive(orderId) {
        this.$confirm('是否确定收货?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$post('order/confirmGoods', {
            id: orderId
          }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.loadOrder(1)
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      orderRevoke(orderId) {
        this.$confirm('是否确定撤销订单?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$post('order/unOrder', {
            id: orderId
          }).then(res => {
            if (res.code == 0) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.loadOrder(1)
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {

        });
      },
      refundGoods(id) {
        this.show = true
        this.refundGoodsId = id
      },
      uploadRefundImg(event) {
        const file = event.target.files[0]
        if (file.size < (1024 * 1000 * 3)) {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            this.refundImgList.push(e.target.result)
          }
        } else {
          this.$message.error('上传的图片大小不能超过3MB')
        }
      },
      removeRefundImg(index) {
        this.refundImgList.splice(index, 1)
      },
      dialogOperate(index) {
        if (index == 0) {
          if (this.refundType == '' || this.refundImgList == '') {
            this.$message.error('请将退货信息填写完整')
          } else {
            this.$post('order/salesReturn', {
              id: this.refundGoodsId,
              type: this.refundType,
              imgs: this.refundImgList
              // reason: this.refundRemark
            }).then(res => {
              if (res.code == 0) {
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.show = false
                    this.loadOrder(1)
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }
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
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      this.orderDateRange.push(new Date().getFullYear() + '-01-01')
      this.orderDateRange.push(new Date().getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day))
      this.loadOrder(1)
    }
  }
</script>

<style lang="less" scoped>
  .myOrder{background: #f1f1f1;
    .main{width: 1200px;margin: 15px auto;padding: 15px;background: #fff;
      .tab{overflow: hidden;border-bottom: 1px solid #ddd;
        li{line-height: 40px;float: left;margin-right: 30px;font-size: 16px;color: #333;cursor: pointer;}
        .active{color: #006DB8;border-bottom: 3px solid #006DB8;}
      }
      .info{margin: 15px 0;
        ul{overflow: hidden;font-size: 12px;border: 1px solid #ddd;margin-top: 15px;
          li{float: left;overflow: hidden;
            .img{float: left;width: 70px;height: 80px;overflow: hidden;margin-right: 15px;
              img{height: 100%;}
            }
            .txt{float: left;width: calc(100% - 85px);padding: 3px 0;
              h1{color: #333;max-height: 32px;overflow: hidden;cursor: pointer;}
              h1:hover{text-decoration: underline;}
              h2{color: #666;margin: 5px 0;}
              h3{color: #999;}
            }
            a{font-size: 12px;line-height: 79px;}
          }
          li:first-child{width: 50%;padding: 0 15px;}
          li:not(:first-child){width: calc(50% / 4);text-align: center;}
        }
        .title{background: #F2F2F2;
          li{line-height: 40px;}
        }
        .content{
          .contentRow{margin-top: 15px;font-size: 12px;
            .title{padding: 0 15px;line-height: 40px;border: 1px solid #ddd;background: #F2F2F2;
              span{margin-right: 30px;}
              p{float: right;color: #999;}
            }
            .contentSubRow{
              .subtitle{padding-left: 15px;line-height: 40px;border: 1px solid #ddd;border-bottom: none;background: #F2F2F2;
                span{margin-right: 30px;
                  i{margin-right: 5px;}
                }
                .fr{color: #006DB8;width: calc(50% / 4);text-align: center;margin-right: 0;cursor: pointer;display: flex;justify-content: space-around;
                  span{margin-right: 0;margin-left: 0;}
                  span:hover{text-decoration: underline;}
                }
              }
              .remarkRow{padding: 0 15px;line-height: 40px;border: 1px solid #ddd;border-bottom: none;background: #F2F2F2;cursor: pointer;}
              .row{padding: 15px 0;margin-top: 0;
                li:not(:first-child){line-height: 80px;}
              }
              .row:not(:first-child){border-top: none;}
            }
            .contentSubRow:not(:first-child){
              .subtitle{border-top: none;}
            }
          }
          .statisticsOut{background: #F2F2F2;border: 1px solid #ddd;margin-top: 15px;
            li{line-height: 40px;}
          }
        }
      }
    }
    .clear{
      .refundImgPreview{width: 100px;height: 100px;overflow: hidden;float: left;margin-right: 10px;margin-bottom: 10px;position: relative;
        img{width: 100%;height: 100%;}
        i{position: absolute;top: 5px;right: 5px;z-index: 10;color: #F56C6C;font-size: 18px;cursor: pointer;}
      }
    }
  }
</style>

<style lang="less">
  //.el-radio{display: block;margin-bottom: 10px;}
  .el-range-separator{width: auto !important;}
  .el-tooltip__popper{max-width: 400px;}
</style>