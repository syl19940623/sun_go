<template>
  <div class="myAccount">
    <Header></Header>
    <div class="mid">
      <div class="stepContent">
        <p>想要修改登录密码？<a href="javascript:;" @click="show = true">点击这里</a></p>
        <div class="form">
          <div class="title">账号信息</div>
          <el-form label-width="150px">
            <el-form-item label="联系人姓名">
              <el-input v-model="form.contactPerson"></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input v-model="form.contactMobile"></el-input>
            </el-form-item>
            <el-form-item label="联系人电子邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="资料审核" class="clear">
              <div class="uploadImg">
                <h1><i class="el-icon-upload"></i>资料审核</h1>
                <input type="file" @change="uploadImg('authorizationImg', $event)" accept="image/*">
                <img v-show="form.authorizationImg != ''" :src="form.authorizationImg" alt="">
                <span v-show="form.authorizationImg != ''" class="el-icon-error" @click="uploadImgEmpty('authorizationImg')"></span>
              </div>
              <div class="uploadImg">
                <h1><i class="el-icon-upload"></i>营业执照</h1>
                <input type="file" @change="uploadImg('businessLicenseImg', $event)" accept="image/*">
                <img v-show="form.businessLicenseImg != ''" :src="form.businessLicenseImg" alt="">
                <span v-show="form.businessLicenseImg != ''" class="el-icon-error" @click="uploadImgEmpty('businessLicenseImg')"></span>
              </div>
              <div class="uploadImg">
                <h1><i class="el-icon-upload"></i>开户许可证</h1>
                <input type="file" @change="uploadImg('accountOpenImg', $event)" accept="image/*">
                <img v-show="form.accountOpenImg != ''" :src="form.accountOpenImg" alt="">
                <span v-show="form.accountOpenImg != ''" class="el-icon-error" @click="uploadImgEmpty('accountOpenImg')"></span>
              </div>
              <a href="./file/资料审核模板.docx" download="资料审核模板" style="line-height: 100px;color: #409eff;"><i class="el-icon-download" style="margin-right: 5px;"></i>资料审核模板下载</a>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <el-button type="primary" @click="submit">提交并修改账号信息</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <Dialog :show.sync="show" :btns="['提交', '取消']" width="500px" @dialogOperate="dialogOperate" :is-show-close="false">
      <div slot="vNode" style="padding: 25px 25px 9px;">
        <el-form label-width="68px">
          <el-form-item label="旧密码">
            <el-input type="password" show-password placeholder="请输入旧密码" v-model="newForm.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" show-password placeholder="请输入新密码" v-model="newForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" show-password placeholder="请输入确认密码" v-model="newForm.surePassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import Header from '../components/Header';
  import Dialog from "../components/Dialog/Dialog";

  export default {
    name: "myAccount",
    components: {
      Header,
      Dialog
    },
    data() {
      return {
        form: {
          contactPerson: '',
          contactMobile: '',
          email: '',
          authorizationImg: '',
          businessLicenseImg: '',
          accountOpenImg: ''
        },
        show: false,
        newForm: {
          oldPassword: '',
          newPassword: '',
          surePassword: ''
        },
        newFormEmpty: {}
      }
    },
    methods: {
      loadCustomerInfo() {
        this.$post('my/getCustomerInfo').then(res => {
          if (res.code == 0) {
            this.form = res.data
            this.$set(this.form, 'authorizationImg', '')
            this.$set(this.form, 'businessLicenseImg', '')
            this.$set(this.form, 'accountOpenImg', '')
          }
        })
      },
      dialogOperate(index) {
        if (index == 0) {
          const oldPassword = this.newForm.oldPassword
          const newPassword = this.newForm.newPassword
          const surePassword = this.newForm.surePassword
          if (oldPassword == '' || newPassword == '' || surePassword == '') {
            this.$message.error('请将密码信息填写完整')
          } else if (newPassword != surePassword) {
            this.$message.error('两次密码不一致')
          } else {
            this.$post('my/setMyPass', {
              oldPass: md5(oldPassword),
              newPass: md5(newPassword),
              newPassConfirm: md5(surePassword)
            }).then(res => {
              this.$message({
                message: res.msg,
                type: 'info',
                onClose: () => {
                  if (res.code == 0) {
                    this.show = false
                    Object.assign(this.newForm, this.newFormEmpty)
                  }
                }
              })
            })
          }
        } else {
          Object.assign(this.newForm, this.newFormEmpty)
        }
      },
      uploadImg(prop, event) {
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (e) => {
          this.form[prop] = e.target.result
        }
      },
      uploadImgEmpty(prop) {
        this.form[prop] = ''
      },
      submit() {
        if (this.form.contactPerson == '' || this.form.contactMobile == '' || this.form.email == '' || this.form.authorizationImg == '' || this.form.businessLicenseImg == '' || this.form.accountOpenImg == '') {
          this.$message.error('请将账号信息填写完整')
        } else {
          this.$confirm('提交修改信息后,账号会进入审核阶段,在此过程中您将不能登录系统,是否确定提交?', '温馨提示', {
            type: 'warning'
          }).then(() => {
            const loading = this.$loading({
              lock: true,
              text: '信息提交中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$post('my/setMyContactInfo', {
              contactPerson: this.form.contactPerson,
              contactMobile: this.form.contactMobile,
              email: this.form.email,
              authorizationImg: this.form.authorizationImg,
              businessLicenseImg: this.form.businessLicenseImg,
              accountOpenImg: this.form.accountOpenImg
            }).then(res => {
              loading.close();
              if (res.code == 0) {
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    localStorage.removeItem('personalInfo')
                    localStorage.removeItem('saveAuthorization')
                    this.$store.commit('updateGoodsNum', 0)
                    this.$router.replace('/index')
                  }
                })
              } else {
                this.$message.error(res.msg)
              }
            })
          }).catch(() => {

          });
        }
      }
    },
    mounted() {
      Object.assign(this.newFormEmpty, this.newForm)
      this.loadCustomerInfo()
    }
  }
</script>

<style lang="less">
  .myAccount{
    .top{background: #fff;padding: 20px 0;box-shadow: 0 0 40px -10px rgb(64, 158, 255, .01);
      .logo{width: 1200px;height: 50px;margin: 0 auto;
        img{height: 100%;}
      }
    }
    .mid{width: 1200px;margin: 15px auto;background: #fff;padding: 30px 50px;
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
        .el-form-item{margin-bottom: 30px;
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
      .operate{overflow: hidden;
        button{float: right;}
      }
    }
  }
</style>