<template>
  <div class="container">
    <BasicTable ref="basicTable" :toolbar="true" :loading="loading" firstColumnType="index" :table-data="tableData" @loadTable="loadTable">
      <div slot="toolbar">
        <el-form :inline="true">
          <el-form-item>
            <el-select placeholder="请选择数据日期" v-model="date">
              <el-option v-for="item in dateList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="loadTable">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="show = true">上传计划表</el-button>
          </el-form-item>
          <el-form-item>
            <a href="./file/月度物资集中采购计划表.xlsx" download="月度物资集中采购计划表" style="line-height: 36px;color: #E6A23C;">模板下载</a>
          </el-form-item>
        </el-form>
      </div>
    </BasicTable>

    <Dialog :show.sync="show" title="上传计划表" :btns="['保存', '取消']" @dialogOperate="dialogOperate" width="500px" height="400px">
      <div slot="vNode" style="padding: 30px 25px 0;">
        <el-form label-width="68px">
          <el-form-item label="文件日期">
            <el-date-picker
              v-model="uploadDate"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择文件日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择文件">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="sun_go_api/purchasePlan/uploadMonth"
              :headers="{'authorization': saveAuthorization}"
              :data="{'yearMonth': uploadDate}"
              :limit="1"
              :file-list="fileList"
              :auto-upload="false"
              :on-success="uploadSuccess"
              :on-error="uploadFail">
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import BasicTable from "../components/BasicTable/BasicTable";
  import Dialog from "../components/Dialog/Dialog";

  export default {
    name: "monthPlanTable",
    components: {
      BasicTable,
      Dialog
    },
    data() {
      return {
        show: false,
        date: '',
        dateList: [],
        loading: true,
        tableData: {
          headData: [
            {
              prop: 'yearMonth',
              label: '数据日期'
            },
            {
              prop: 'projectName',
              label: '项目名称',
              width: 120
            },
            {
              prop: 'contactPerson',
              label: '联系人'
            },
            {
              prop: 'contactMobile',
              label: '联系人电话',
              width: 100
            },
            {
              prop: 'claId',
              label: '目录编码'
            },
            {
              prop: 'name',
              label: '物资名称',
              width: 150
            },
            {
              prop: 'specification',
              label: '规格型号及技术参数',
              width: 180
            },
            {
              prop: 'unit',
              label: '单位'
            },
            {
              prop: 'num',
              label: '数量'
            },
            {
              prop: 'price',
              label: '单价(元)'
            },
            {
              prop: 'totalPrice',
              label: '合计(元)'
            },
            {
              prop: 'payMode',
              label: '支付方式'
            },
            {
              prop: 'payProportion',
              label: '付款比例(%)',
              width: 100
            },
            {
              prop: 'payDate',
              label: '付款时间',
              width: 100
            },
            {
              prop: 'deliveryDate',
              label: '交货时间',
              width: 100
            },
            {
              prop: 'deliveryAddress',
              label: '交货地点'
            },
            {
              prop: 'remark',
              label: '备注'
            },
          ],
          bodyData: []
        },
        fileList: [],
        uploadDate: '',
        uploadLoading: null,
        saveAuthorization: ''
      }
    },
    methods: {
      loadDate() {
        this.$post('purchasePlan/getMyMonthDate').then(res => {
          if (res.code == 0) {
            this.dateList = res.data
            this.$nextTick(() => {
              if (res.data != '') {
                this.date = res.data[0]
                this.loadTable()
              }
            })
          }
        })
      },
      loadTable() {
        this.$post('purchasePlan/getMyMonthData', {
          yearMonth: this.date
        }).then(res => {
          if (res.code == 0) {
            this.loading = false
            this.tableData.bodyData = res.data
          }
        })
      },
      dialogOperate(index) {
        if (index == 0) {
          if (this.uploadDate == '') {
            this.$message.error('请将计划表信息填写完整')
          } else {
            this.$refs.upload.submit();
            this.uploadLoading = this.$loading({
              lock: true,
              text: '数据上传中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
          }
        }
      },
      uploadSuccess() {
        if (this.uploadLoading) {
          this.uploadLoading.close();
        }
        this.$message({
          message: '上传月度采购计划成功',
          type: 'success',
          duration: 1000,
          onClose: () => {
            this.show = false
            this.loadDate()
          }
        })
      },
      uploadFail() {
        this.$message({
          message: '上传月度采购计划失败',
          type: 'error',
          duration: 1000
        })
      }
    },
    created() {
      this.saveAuthorization = localStorage.getItem('saveAuthorization')
    },
    mounted() {
      this.loadDate()
    }
  }
</script>

<style lang="less" scoped>
  .container{width: 100vw;height: 100vh;background: #fff;}
</style>