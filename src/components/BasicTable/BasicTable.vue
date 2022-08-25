<template>
  <div class="basicTable">
    <!-- 搜索条件 -->
    <div class="toolbar" ref="toolbar" v-if="toolbar">
      <slot name="toolbar"></slot>
    </div>

    <!-- 表格 -->
    <div class="table">
      <el-table
        border
        :size="size"
        :row-key="rowKey"
        :highlight-current-row="true"
        :v-loading="loading"
        :element-loading-text="loadingText"
        :data="tableData.bodyData"
        :height="calcTableHeight"
        :row-class-name="rowClassName"
        @row-click="rowClick"
        @cell-mouse-enter="cellHover"
        @selection-change="rowSelected">
        <!-- 第一列 -->
        <el-table-column
          v-if="firstColumnType"
          :type="firstColumnType"
          width="60"
          align="center"
          fixed="left"
          header-align="center">
        </el-table-column>
        <!-- 中间 -->
        <el-table-column
          v-for="(item, index) in tableData.headData"
          :width="getWidth(item.prop, item.width)"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="align ? align : item.align"
          :header-align="align ? align : item.align"
          :show-overflow-tooltip="true"
          :formatter="item.template">
        </el-table-column>
        <!-- 最后一列 -->
        <el-table-column
          v-if="bar"
          label="操作"
          ref="bar"
          :width="barWidth"
          align="center"
          header-align="center">
          <slot name="bar" :data="currentRow"></slot>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="page" ref="page" v-if="page">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageNumChange"
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="pageSizeArr"
        :total="tableData.count"
        :layout="pageLayout">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BasicTable',
    props: {
      toolbar: {
        type: Boolean,
        default: false
      },
      bar: {
        type: Boolean,
        default: false
      },
      page: {
        type: Boolean,
        default: false
      },
      pageLayout: {
        type: String,
        default: "total, sizes, prev, pager, next, jumper"
      },
      loading: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: 'center'
      },
      size: {
        type: String,
        default: 'small'
      },
      rowKey: String,
      loadingText: {
        type: String,
        default: '数据加载中'
      },
      tableHeight: {
        type: String,
        default: 'full'
      },
      firstColumnType: String,
      tableData: Object,
      widthAdapt: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 20,
        pageSizeArr: [10, 20, 30, 50, 100],
        calcTableHeight: null,
        barWidth: 0,
        currentRow: {},
        selectedRows: []
      }
    },
    methods: {
      rowClassName({row, rowIndex}) {
        if (rowIndex === this.tableData.defaultCurrentRow) {
          return 'current-row';
        }
        return '';
      },
      pageSizeChange(pageSize) {
        this.pageNum = 1
        this.pageSize = pageSize
        this.$emit('loadTable', this.pageNum, this.pageSize)
      },
      pageNumChange(pageNum) {
        this.pageNum = pageNum
        this.$emit('loadTable', this.pageNum, this.pageSize)
      },
      cellHover(row) {
        this.currentRow = row
      },
      rowClick(row) {
        // this.currentRow = row
        this.$emit('rowClick', row)
      },
      rowSelected(selection) {
        this.selectedRows = selection
      },
      getWidth(prop, width) {
        if (this.widthAdapt) {
          let valMaxLen = 0
          for (let v of this.tableData.bodyData) {
            valMaxLen = (v[prop] + '').length > valMaxLen ? (v[prop] + '').length: valMaxLen
          }
          return valMaxLen * 14 + 40
        } else if (width) {
          return width;
        }
      }
    },
    mounted() {
      if (this.tableHeight.indexOf('full') != -1) {
        let toolbarHeight = this.toolbar ? this.$refs.toolbar.clientHeight + 1 : 0
        let pageHeight = this.page ? this.$refs.page.clientHeight : 0
        let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        let calcTableHeight = height - toolbarHeight - pageHeight - 30
        if (this.tableHeight.indexOf('-') != -1) {
          calcTableHeight = calcTableHeight - this.tableHeight.split('-')[1]
        }
        this.calcTableHeight = calcTableHeight
      } else {
        this.calcTableHeight = this.tableHeight
      }

      if (this.bar) {
        let len = this.$refs.bar.$children.length
        if (this.bar) {
          this.barWidth = len * 48 + (len - 1) * 15 + 30
        }
      }
    }
  }
</script>

<style lang="less">
  .basicTable{
    .toolbar{padding: 15px 15px 0;border-bottom: 1px solid #EBEEF5;
      .el-form-item{margin-bottom: 15px;}
    }
    .table{padding: 15px;
      .el-table__body tr.current-row>td.el-table__cell{background-color: rgba(99, 176, 255, .2);}
    }
    .page{padding: 0 15px 15px;}
    .el-table thead{color: rgba(0, 0, 0, .65);}
    .el-table th.el-table__cell{background: #FAFAFA;}
    .el-link+.el-link,.el-link+span,span+.el-link,span+span{margin-left: 15px;}
    .el-table--small{
      .el-link{font-size: 12px;}
    }
  }
  .el-popconfirm__main{margin: 14px 0;}
</style>