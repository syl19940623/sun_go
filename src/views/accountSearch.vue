<template>
  <div class="accountSearch">
    <div class="top">
      <div class="logo">
        <router-link to="/index"><img src="../assets/img/logo.png" alt=""></router-link>
        <router-link to="/index" class="fr">返回首页</router-link>
      </div>
    </div>
    <div class="mid">
      <div class="stepContent">
        <div class="form">
          <div class="title">{{type == 'store' ? '供应商' : '客户'}}账号审批查询</div>
          <el-form label-width="150px">
            <el-form-item label="登录账号">
              <el-input v-model="form.id" placeholder="请输入登录账号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="operate">
          <el-button type="primary" @click="submit">查询</el-button>
        </div>
      </div>
    </div>
    <Dialog :show.sync="show" :content="content"></Dialog>
  </div>
</template>

<script>
  import Dialog from "../components/Dialog/Dialog";

  export default {
    name: "accountSearch",
    components: {
      Dialog
    },
    data() {
      return {
        form: {
          id: ''
        },
        type: 'customer',
        show: false,
        content: ''
      }
    },
    methods: {
      submit() {
        if (this.form.id == '') {
          this.$message.error('登录账号不能为空')
        } else {
          let sendData = {}
          Object.assign(sendData, this.form)
          let url = ''
          if (this.type == 'store') {
            url = 'reg/searchSupplierState'
          } else {
            url = 'reg/searchCustomerState'
          }
          this.$post(url, sendData).then(res => {
            if (res.code == 0) {
              this.content = res.data.examineOpinion
            } else {
              this.content = res.msg
            }
            this.show = true
          })
        }
      }
    },
    mounted() {
      this.type = this.$route.query.type
    }
  }
</script>

<style lang="less">
  .accountSearch{
    .top{background: #fff;padding: 20px 0;box-shadow: 0 0 40px -10px rgb(64, 158, 255, .01);
      .logo{width: 1200px;height: 50px;margin: 0 auto;
        img{height: 100%;}
        a{font-size: 18px;font-weight: bold;line-height: 50px;color: #333;}
      }
    }
    .mid{width: 1200px;margin: 30px auto;background: #fff;padding: 30px 50px;
      .step{width: 100%;height: 66px;background: #f1f1f1;color: #999;overflow: hidden;
        li{width: 25%;float: left;text-align: center;line-height: 66px;position: relative;
          span{display: inline-block;width: 36px;height: 36px;line-height: 34px;border: 1px solid #999;text-align: center;border-radius: 50%;margin-right: 8px;}
          b{font-weight: normal;font-size: 16px;}
        }
        .active{
          span{background: #006DB8;color: #fff;border: 1px solid #006DB8;}
          b{color: #333;}
        }
        li:not(:last-child)::after{content: '';position: absolute;top: 50%;right: 0;transform: rotate(45deg) translateY(-50%);border: 1px solid #999;width: 12px;height: 12px;border-left: none;border-bottom: none;}
      }
      p{text-align: right;
        a{color: #006DB8;text-decoration: underline;}
      }
      .form{border: 1px solid #f1f1f1;margin: 30px 0;padding: 30px;
        .title{font-size: 18px;font-weight: bold;margin-bottom: 30px;}
        .el-form-item{margin-bottom: 30px;}
      }
      .operate{overflow: hidden;
        button{float: right;}
      }
    }
  }
</style>