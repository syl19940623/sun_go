<template>
  <div class="myTicket">
    <Header></Header>
    <div class="main">
      <div class="step">
        <el-steps :active="-1" simple>
          <el-step title="订单支付" icon="el-icon-s-finance"></el-step>
          <el-step title="填写发票信息" icon="el-icon-edit"></el-step>
          <el-step title="财务处理开票" icon="el-icon-s-ticket"></el-step>
          <el-step title="发票下载/邮寄" icon="el-icon-s-promotion"></el-step>
        </el-steps>
      </div>
      <BasicTable :table-data="tableData" :bar="true" :page="true" table-height="full-311">
        <template slot="bar" slot-scope="scope">
          <el-link type="primary" @click="look(scope.data)">查看</el-link>
        </template>
      </BasicTable>
    </div>
    <Dialog title="发票详情" content="这是发票内容" :show.sync="show"></Dialog>
  </div>
</template>

<script>
  import BasicTable from "../components/BasicTable/BasicTable";
  import Header from '../components/Header';
  import Dialog from "../components/Dialog/Dialog";

  export default {
    name: "myTicket",
    components: {
      BasicTable,
      Header,
      Dialog
    },
    data() {
      return {
        tableData: {
          headData: [
            {
              prop: 'name',
              label: '开票人姓名'
            },
            {
              prop: 'datetime',
              label: '开票时间'
            },
            {
              prop: 'orderId',
              label: '订单编号'
            },
            {
              prop: 'status',
              label: '状态'
            }
          ],
          bodyData: [
            {
              name: '史永亮',
              datetime: '2022-03-01 18:10:27',
              orderId: 'PC2022030118113928813570096',
              status: '已开票'
            }
          ]
        },
        show: false
      }
    },
    methods: {
      look(data) {
        this.show = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .myTicket{
    .crumbOut{background: #f1f1f1;
      .crumb{width: 1200px;margin: 0 auto;overflow: hidden;
        li{line-height: 40px;float: left;color: #666;margin-right: 25px;position: relative;
          a{color: #666;}
          a:hover{color: #006DB8;text-decoration: underline;}
        }
        li:not(:last-child)::after{content: '>';position: absolute;top: 50%;right: -18px;transform: translateY(-50%);}
      }
    }
    .main{width: 1200px;margin: 15px auto;background: #fff;
      .step{padding: 15px 15px 0;}
    }
  }
</style>

<style lang="less">
  .el-step.is-simple .el-step__icon{color: #333;}
  .el-step__title.is-wait{color: #333;}
</style>