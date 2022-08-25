<template>
  <div class="asideBarOut">
    <div class="systemLogo">
      <img src="../../assets/img/hblogo.png" alt="">
      <h1 class="ellipsis" v-show="!showLogoName">{{systemName}}</h1>
    </div>
    <div class="asideBar hideScrollBar">
      <el-menu
        ref="elMenu"
        :default-active="asideBarActiveId"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#A5ACB3"
        active-text-color="#fff">
        <template v-for="item in asideBarList">
          <el-submenu v-if="item.type == 20" :index="item.id" :key="item.id">
            <template slot="title">
              <i :class="item.treeIcon"></i>
              <span>{{item.name}}</span>
            </template>
            <template v-for="childItem in item.children">
              <el-menu-item :index="childItem.id" :key="childItem.id" @click="itemClick(childItem.id, childItem.name, childItem.urlAddress)">{{childItem.name}}</el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item :index="item.id" :key="item.id" @click="itemClick(item.id, item.name, item.urlAddress)" v-else>
            <i :class="item.treeIcon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AsideBar",
    props: {
      asideBarList: {
        type: Array,
        default: []
      },
      asideBarActiveId: {
        type: String
      },
      systemName: String
    },
    data() {
      return {
        asideIcon: 'el-icon-s-fold',
        isCollapse: false,
        showLogoName: false
      }
    },
    methods: {
      asideChange() {
        let status = this.isCollapse
        this.isCollapse = !status
        if (status) {
          this.asideIcon = 'el-icon-s-fold'
          setTimeout(() => {
            this.showLogoName = false
          }, 300)
        } else {
          this.asideIcon = 'el-icon-s-unfold'
          this.showLogoName = true
        }
      },
      itemClick(value, label, path) {
        this.$emit('pathChange', value, label, path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .asideBarOut{
    .systemLogo{overflow: hidden;padding: 8px 12px;background: #002140;
      img{width: 40px;height: 40px;float: left;}
      h1{float: left;line-height: 40px;font-size: 18px;font-weight: bold;margin-left: 6px;color: #fefefe;width: calc(100% - 46px);}
    }
    .asideBar{
      .el-menu{border-right: none;
        .fa{vertical-align: middle;margin-right: 10px;width: 24px;text-align: center;font-size: 18px;}
      }
      .el-menu-vertical-demo:not(.el-menu--collapse){width: 240px;}
    }
  }
</style>

<style lang="less">
  .el-menu--inline{
    .el-menu-item{padding-left: 54px !important;padding-right: 20px !important;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .el-menu-item:hover{background-color: #000C17 !important;color: #fff !important;}
    .el-submenu{
      .el-submenu__title{padding-left: 54px !important;padding-right: 20px !important;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
      .el-menu--inline{
        .el-menu-item{padding-left: 74px !important;padding-right: 20px !important;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
      }
    }
  }
  .el-submenu__title:hover{background-color: #000C17 !important;color: #fff !important;
    i{color: #fff;}
  }
</style>