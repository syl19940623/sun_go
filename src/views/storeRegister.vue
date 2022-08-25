<template>
  <div class="storeRegister">
    <div class="top">
      <div class="logo">
        <router-link to="/index"><img src="../assets/img/logo.png" alt=""></router-link>
        <router-link to="/accountSearch?type=store" class="fr">账号审批查询</router-link>
      </div>
    </div>
    <div class="mid">
      <ul class="step">
        <li v-for="(item, index) in stepList" :class="index == stepIndex ? 'active' : ''" :key="index"><span>{{index + 1}}</span><b>{{item}}</b></li>
      </ul>
      <div class="content">
        <div v-show="stepIndex == 0 || stepIndex == 4" class="stepContent">
          <div class="form">
            <div class="title">联系人信息</div>
            <el-form label-width="150px">
              <el-form-item label="联系人姓名">
                <el-input v-model="form.contactPerson" placeholder="请输入联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话">
                <el-input v-model="form.contactMobile" placeholder="请输入联系人电话"></el-input>
              </el-form-item>
              <el-form-item label="联系人电子邮箱">
                <el-input v-model="form.email" placeholder="请输入联系人电子邮箱"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="form">
            <div class="title">法人信息</div>
            <el-form label-width="150px">
              <el-form-item label="法人姓名">
                <el-input v-model="form.legalPerson" placeholder="请输入法人姓名"></el-input>
              </el-form-item>
              <el-form-item label="法人身份证号">
                <el-input v-model="form.idNumber" placeholder="请输入法人身份证号"></el-input>
              </el-form-item>
              <el-form-item label="法人身份证照片" class="clear">
                <div class="uploadImg">
                  <h1><i class="el-icon-upload"></i>正面</h1>
                  <input type="file" @change="uploadImg('idNumberFrontImg', $event)" accept="image/*">
                  <img v-show="form.idNumberFrontImg != ''" :src="form.idNumberFrontImg" alt="">
                  <span v-show="form.idNumberFrontImg != ''" class="el-icon-error" @click="uploadImgEmpty('idNumberFrontImg')"></span>
                </div>
                <div class="uploadImg">
                  <h1><i class="el-icon-upload"></i>反面</h1>
                  <input type="file" @change="uploadImg('idNumberReverseImg', $event)" accept="image/*">
                  <img v-show="form.idNumberReverseImg != ''" :src="form.idNumberReverseImg" alt="">
                  <span v-show="form.idNumberReverseImg != ''" class="el-icon-error" @click="uploadImgEmpty('idNumberReverseImg')"></span>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="operate" v-show="stepIndex != 4">
            <el-button type="primary" @click="jumpTwo">下一步，完善主体信息</el-button>
          </div>
        </div>
        <div v-show="stepIndex == 1 || stepIndex == 4" class="stepContent">
          <div class="form">
            <div class="title">供应商信息</div>
            <el-form label-width="150px">
              <el-form-item label="供应商名称">
                <el-input v-model="form.name" placeholder="请输入供应商名称"></el-input>
              </el-form-item>
              <el-form-item label="供应商类型">
                <el-select v-model="form.type" placeholder="请选择供应商类型">
                  <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="供应商分类">
                <el-cascader
                  placeholder="请选择供应商分类"
                  v-model="form.classifys"
                  :options="classifyList"
                  :props="{multiple: true}"
                  collapse-tags
                  clearable>
                </el-cascader>
              </el-form-item>
              <el-form-item label="供应商介绍">
                <el-input type="textarea" v-model="form.introduction" placeholder="请输入供应商介绍"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="form">
            <div class="title">供应商证件信息</div>
            <el-form label-width="150px">
              <el-form-item label="供应商营业执照" class="clear">
                <div class="uploadImg" style="width: 200px;height: 144px;">
                  <h1><i class="el-icon-upload"></i>营业执照</h1>
                  <input type="file" @change="uploadImg('businessLicenseImg', $event)" accept="image/*">
                  <img v-show="form.businessLicenseImg != ''" :src="form.businessLicenseImg" alt="">
                  <span v-show="form.businessLicenseImg != ''" class="el-icon-error" @click="uploadImgEmpty('businessLicenseImg')"></span>
                </div>
              </el-form-item>
              <el-form-item label="统一社会信用代码">
                <el-input v-model="form.businessLicense" placeholder="请输入统一社会信用代码"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="operate" v-show="stepIndex != 4">
            <el-button type="primary" @click="jumpThree">下一步，完善开户行信息</el-button>
          </div>
        </div>
        <div v-show="stepIndex == 2 || stepIndex == 4" class="stepContent">
          <div class="form">
            <div class="title">开户行信息</div>
            <el-form label-width="150px">
              <el-form-item label="开户行名称">
                <el-input v-model="form.openingBankName" placeholder="请输入开户行名称"></el-input>
              </el-form-item>
              <el-form-item label="开户行行号">
                <el-input v-model="form.openingBankNo" placeholder="请输入开户行行号"></el-input>
              </el-form-item>
              <el-form-item label="开户行账号">
                <el-input v-model="form.openingBankAccount" placeholder="请输入开户行账号"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="operate" v-show="stepIndex != 4">
            <el-button type="primary" @click="jumpFour">下一步，完善账号信息</el-button>
          </div>
        </div>
        <div v-show="stepIndex == 3 || stepIndex == 4" class="stepContent">
          <div class="form">
            <div class="title">账号信息</div>
            <el-form label-width="150px">
              <el-form-item label="登录账号">
                <el-input v-model="form.loginAccount" placeholder="请输入登录账号"></el-input>
              </el-form-item>
              <el-form-item label="登录密码">
                <el-input type="password" v-model="form.loginPass" placeholder="请输入登录密码"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="operate" v-show="stepIndex != 4">
            <el-button type="primary" @click="jumpFive">下一步，提交审核</el-button>
          </div>
        </div>
        <div v-show="stepIndex == 4" class="stepContent operate">
          <el-form>
            <el-form-item>
              <el-checkbox v-model="agreeRegister">我已阅读并同意<a href="javascript:;" @click="show = true" style="color: #409eff;">《供应商注册协议》</a></el-checkbox>
            </el-form-item>
          </el-form>
          <el-button type="danger" @click="submit">确认信息，提交审核</el-button>
        </div>
      </div>
    </div>
    <!-- 供应商注册协议 -->
    <Dialog :show.sync="show" title="供应商注册协议" :btns="['确定', '取消']" height="80%" @dialogOperate="dialogOperate">
      <div slot="vNode" style="padding: 25px;">
        <p style="text-align:center;line-height:40px">
          <span style="font-size:29px;font-family:黑体">万家寨水控集团——水控易购商城</span>
        </p>
        <p style="text-align:center;line-height:40px">
          <span style="font-size:29px;font-family:黑体">供应商公约</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">为了更好的提供服务，本着互信沟通、诚信合作的原则，特制定商城供应商公约，请认真阅读以下条款：</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第一条：供应商入驻商城过程中上传资料必须真实有效，如发现资料作假，由此产生的问题将由商户自己承担。</span>
        </p>
        <p style="text-align:justify;text-justify:inter-ideograph;text-indent:43px;line-height:40px;background:white">
          <span style="font-size:21px;font-family:仿宋">第二条：供应商所上传的文字、声音、相片、录像、图表、广告及为用户提供的其他信息，应符合国家相关法律法规要求，因供应商所上传内容产生的任何法律纠纷，供应商须自行承担，与本网站无关。本网站享有供应商所上传内容的使用权。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第三条：供应商入驻商城正式为客户提供服务，关于佣金、发票、款项支付等合作条款均在商户合作合同中约定，请仔细阅读相关条款内容。除非获得加盖公章的书面证明文件（或扫描件），任何以口头形式约定的佣金、发票、款项支付等调整均无效，商城将不予确认。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第四条：服务过程中因配送超时、配送商品与订单不符等导致的赔付条款双方在商户合作合同中以合同附件方式约定，请仔细阅读相关条款。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第五条：商城要求供应商严禁使用过期商品或不符合国家规定没有检验标志、相关机构检验证明的商品。一经发现，商城将在第一时间永久下线，且商城有权依照商户合作合同约定对违规供应商进行处罚，并保留追诉的权利。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第六条：供应商一旦确认提供服务，即代表供应商须在整个服务周期中履行服务义务，如出现供应商未完整履行服务义务或在服务期间因供应商原因产生纠纷的，商城有权对其进行处罚，处罚措施包括但不限于罚款、供应商下线等。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第七条：如因供应商不能及时开具合法有效发票而导致客户回款延迟的，商城有权延迟向供应商支付款项。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第八条：商城杜绝供应商为获取不正当合作利益而采取的任何违法腐败方式，为保障供应商权益，商城将和所有供应商签订《诚信暨反商业贿赂协议书》，请各供应商认真阅读协议内容并严格恪守。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第九条：入驻商城的供应商，商城有权对其进行履约能力检查，供应商有义务配合检查并提供各类检查所需资料，检查后如有不合格项，应积极配合平台要求进行整改，如供应商未在规定期限内完成整改，商城有权对供应商做下线处理。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第十条：所有入驻商城的供应商，商城将安排专人与其对接，如商城的工作人员对合作事务不回复、怠慢，甚至出现辱骂等情形，供应商可通过电话进行投诉，商城将尽快调查核实并安排妥当处理。</span>
        </p>
        <p style="text-indent:43px;line-height:40px">
          <span style="font-size:21px;font-family:仿宋">第十一条：未尽事宜，经双方协商同意后，另行签订补充协议，补充协议一经签订，将作为合同不可分割的一部分。</span>
        </p>
        <p>
          <br/>
        </p>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import { util } from '../utils/util.js';
  import { Base64 } from 'js-base64';
  import Dialog from "../components/Dialog/Dialog";

  export default {
    name: "storeRegister",
    components: {
      Dialog
    },
    data() {
      return {
        stepList: ['身份信息', '主体信息', '开户行信息', '账号信息', '提交审核'],
        stepIndex: 0,
        agreeRegister: false,
        typeList: [],
        classifyList: [],
        form: {
          contactPerson: '',
          contactMobile: '',
          email: '',
          idNumber: '',
          idNumberFrontImg: '',
          idNumberReverseImg: '',
          legalPerson: '',
          name: '',
          type: '',
          classifys: '',
          introduction: '',
          businessLicenseImg: '',
          businessLicense: '',
          openingBankName: '',
          openingBankNo: '',
          openingBankAccount: '',
          loginAccount: '',
          loginPass: ''
        },
        show: false
      }
    },
    methods: {
      loadType() {
        this.$post('reg/getSupplierType').then(res => {
          if (res.code == 0) {
            this.typeList = res.data
          }
        })
      },
      loadClassify() {
        this.$post('reg/getGoodClassTreeData').then(res => {
          if (res.code == 0) {
            this.classifyList = res.data
          }
        })
      },
      jumpTwo() {
        if (this.form.contactPerson == '' || this.form.contactMobile == '' || this.form.email == '' || this.form.idNumber == '' || this.form.idNumberFrontImg == '' || this.form.idNumberReverseImg == '') {
          this.$message.error('请将身份信息填写完整')
        } else {
          this.stepIndex = 1
        }
      },
      jumpThree() {
        if (this.form.name == '' || this.form.legalPerson == '' || this.form.type == '' || this.form.classify == '' || this.form.introduction == '' || this.form.businessLicense == '' || this.form.businessLicenseImg == '') {
          this.$message.error('请将主体信息填写完整')
        } else {
          this.stepIndex = 2
        }
      },
      jumpFour() {
        if (this.form.openingBankName == '' || this.form.openingBankNo == '' || this.form.openingBankAccount == '') {
          this.$message.error('请将开户行信息填写完整')
        } else {
          this.stepIndex = 3
        }
      },
      jumpFive() {
        if (this.form.loginAccount == '' || this.form.loginPass == '') {
          this.$message.error('请将账号信息填写完整')
        } else {
          this.stepIndex = 4
        }
      },
      submitEmpty() {
        let bool = true
        for (let v of Object.keys(this.form)) {
          if (this.form[v] == '') {
            bool = false
          }
        }
        return bool;
      },
      submit() {
        if (!this.submitEmpty()) {
          this.$message.error('请将注册信息填写完整')
        } else if (!this.agreeRegister) {
          this.$message.error('请同意协议并勾选')
        } else {
          this.show = true
        }
      },
      dialogOperate(index) {
        if (index == 0) {
          if (this.agreeRegister) {
            const loading = this.$loading({
              lock: true,
              text: '信息提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            let sendData = {}
            Object.assign(sendData, this.form)
            let classifysArr = []
            if (this.form.classifys.length > 1) {
              for (let v of this.form.classifys) {
                classifysArr = classifysArr.concat(v)
              }
            }
            sendData.classify = this.form.classifys[0][0]
            sendData.classifys = util.arrayRemoveRepeat(classifysArr)
            sendData.code = '123456'
            sendData.loginPass = Base64.encode(sendData.loginPass)
            this.$post('reg/supplierReg', sendData).then(res => {
              this.$message({
                message: res.msg,
                type: 'info',
                duration: 1000,
                onClose: () => {
                  loading.close();
                  this.show = false
                  if (res.code == 0) {
                    this.$router.push({
                      path: '/index'
                    })
                  }
                }
              })
            })
          } else {
            this.agreeRegister = true
            this.show = false
          }
        }
      },
      uploadImg(prop, event) {
        const file = event.target.files[0]
        if (file.size < (1024 * 1000 * 3)) {
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            this.form[prop] = e.target.result
          }
        } else {
          this.$message.error('上传的图片大小不能超过3MB')
        }
      },
      uploadImgEmpty(prop) {
        this.form[prop] = ''
      }
    },
    mounted() {
      this.loadType()
      this.loadClassify()
    }
  }
</script>

<style lang="less" scoped>
  .storeRegister{
    .top{background: #fff;padding: 20px 0;box-shadow: 0 0 40px -10px rgb(64, 158, 255, .01);
      .logo{width: 1200px;height: 50px;margin: 0 auto;
        img{height: 100%;}
        a{font-size: 18px;font-weight: bold;line-height: 50px;color: #333;}
      }
    }
    .mid{width: 1200px;margin: 30px auto;background: #fff;padding: 30px 50px;
      .step{width: 100%;height: 66px;background: #f1f1f1;color: #999;overflow: hidden;
        li{width: 20%;float: left;text-align: center;line-height: 66px;position: relative;
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
      .form{border: 1px solid #f1f1f1;margin: 30px 0 0;padding: 30px;
        .title{font-size: 18px;font-weight: bold;margin-bottom: 30px;}
        .el-form-item{margin-bottom: 30px;
          .el-select{width: 100%;}
          .uploadImg{width: 100px;height: 100px;border: 1px dashed #ddd;position: relative;float: left;margin-right: 30px;
            h1{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);width: 100%;text-align: center;
              i{margin-right: 5px;}
            }
            input{width: 100%;height: 100%;position: absolute;top: 0;left: 0;opacity: 0;cursor: pointer;z-index: 10;}
            img{position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 9;}
            span{position: absolute;top: 5px;right: 5px;z-index: 10;color: #F56C6C;font-size: 18px;cursor: pointer;}
          }
        }
      }
      .operate{overflow: hidden;margin-top: 30px;
        button{float: right;}
      }
    }
  }
</style>

<style lang="less">
  .el-cascader{width: 100%;}
  .el-checkbox__input.is-checked+.el-checkbox__label{color: #606266;}
  .el-checkbox__label{
    a:hover{text-decoration: underline;}
  }
</style>