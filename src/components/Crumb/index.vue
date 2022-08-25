<template>
  <div class="crumbOut">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/index">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="list == ''">{{name}}</el-breadcrumb-item>
      <template v-else>
        <el-breadcrumb-item :to="'/search?type=' + item.id" v-for="item in list" :key="item.id">{{item.name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      name: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
   .crumbOut{width: 1200px;margin: 0 auto;overflow: hidden;padding: 13px 0;}
</style>