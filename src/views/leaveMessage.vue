<template>
  <div class="leaveMessage">
    <Header></Header>
    <div class="main">
      <div class="describe">
        <img class="img" src="../assets/img/leaveMessage.jpg" alt="">
        <div class="txt">为了能够及时发现、纠正和修改万家寨水控易购网站存在的信息发布不准确、客服电话无人应、功能设置不完善等问题，特邀请广大客户在使用水控易购网站时及时反馈网站问题，从而帮助推进水控易购网站建设工作，提高水控易购网站信息发布、客服交流、网站体验水平。</div>
      </div>
      <div class="form">
        <el-form label-width="51px" :model="form" :rules="rules" ref="form">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select placeholder="请选择类型" v-model="form.type">
              <el-option label="留言" value="留言"></el-option>
              <el-option label="建议" value="建议"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="content">
            <el-input type="textarea" placeholder="请输入描述" rows="8" v-model="form.content"></el-input>
          </el-form-item>
<!--          <el-form-item>-->
<!--            <el-button type="primary" @click="submit">提交</el-button>-->
<!--            <el-button @click="reset">重新填写</el-button>-->
<!--          </el-form-item>-->
        </el-form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Footer from '../components/Footer';

  export default {
    name: "leaveMessage",
    components: {
      Header,
      Footer
    },
    data() {
      return {
        form: {
          title: '',
          type: '',
          content: ''
        },
        formEmpty: {},
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ]
        },
        personalInfo: ''
      }
    },
    methods: {
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.personalInfo == null) {
              this.$confirm('您还没有登录，是否前往登录?', '提示', {
                confirmButtonText: '现在就去',
                cancelButtonText: '我再想想',
                type: 'warning'
              }).then(() => {
                this.$router.push({
                  path: '/login'
                })
              }).catch(() => {

              });
            } else {
              this.$post('my/addLeaveWord', this.form).then(res => {
                if (res.code == 0) {
                  this.$message({
                    message: res.msg,
                    type: 'success',
                    duration: 1000,
                    onClose: () => {
                      this.reset()
                    }
                  })
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      reset() {
        Object.assign(this.form, this.formEmpty)
      }
    },
    mounted() {
      Object.assign(this.formEmpty, this.form)
      this.personalInfo = localStorage.getItem('personalInfo')
      if (this.personalInfo == null) {
        this.$confirm('您还没有登录，是否前往登录?', '提示', {
          confirmButtonText: '现在就去',
          cancelButtonText: '我再想想',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/login'
          })
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .leaveMessage{background: #fff;
    .main{width: 960px;margin: 0 auto;padding: 50px 0;
      .describe{display: flex;justify-content: space-around;
        .txt{margin-left: 50px;line-height: 28px;text-indent: 28px;}
      }
      .form{border: 1px solid #DCDFE6;padding: 50px 50px 30px;margin-top: 40px;box-shadow: 0 2px 8px 1px rgba(0, 109, 184, .2);}
    }
  }
</style>

<style lang="less">
  .el-select{width: 100%;}
</style>