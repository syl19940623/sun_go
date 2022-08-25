<template>
  <div class="indexOut">
    <div class="leftOut">
      <AsideBar ref="AsideBar" :systemName="systemName" :asideBarActiveId="asideBarActiveId" :asideBarList="asideBarList" @pathChange="pathChangeClick"></AsideBar>
    </div>
    <div class="rightOut">
      <!-- 顶部导航栏 -->
      <ul class="topNavOut">
        <el-tooltip class="item" effect="dark" content="菜单伸缩" placement="bottom">
          <li class="fl" @click="asideBarCollapse">
            <i :class="asideIcon"></i>
          </li>
        </el-tooltip>
        <li class="fr">
          <span class="el-dropdown-link" style="font-size: 14px;">
            欢迎您: {{userShowName}}<i class="el-icon-arrow-down el-icon--right" style="font-size: 14px;"></i>
          </span>
        </li>
        <el-tooltip class="item" effect="dark" :content="fullScreenFlag ? '退出全屏' : '全屏'" placement="bottom">
          <li class="fr" @click="fullScreenOperate">
            <i class="el-icon-full-screen"></i>
          </li>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
          <li class="fr" @click="refreshIframe">
            <i class="el-icon-refresh"></i>
          </li>
        </el-tooltip>
      </ul>
      <!-- iframe -->
      <div class="iframeOut">
        <iframe v-for="(item, index) in crumbList" :key="item.value" :src="item.path" v-show="crumbActiveIndex == index" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  import AsideBar from '../components/AsideBar/AsideBar';

  import { util } from '../utils/util.js';

  export default {
    name: 'Index',
    components: {
      AsideBar
    },
    data() {
      return {
        userShowName: '管理员',
        systemName: '万家寨水控-水控易购',
        asideIcon: '',
        asideBarActiveId: '',
        asideBarList: [
          {
            id: '001',
            name: '物资采购计划表',
            treeIcon: 'fa fa-calendar fa-fw',
            type: 20,
            children: [
              {
                id: '001001',
                name: '月度计划表',
                urlAddress: '/monthPlanTable'
              },
              {
                id: '001002',
                name: '年度计划表',
                urlAddress: '/yearPlanTable'
              }
            ]
          }
        ],
        crumbList: [
          {
            value: '000',
            label: '首页',
            path: '/adminWelcome'
          }
        ],
        iframeActiveSrc: '',
        crumbActiveIndex: null,
        fullScreenFlag: false,
        isCollapse: false
      }
    },
    methods: {
      // 菜单伸缩
      asideBarCollapse() {
        this.$refs.AsideBar.asideChange()
        this.asideIcon = this.$refs.AsideBar.asideIcon
        this.isCollapse = this.$refs.AsideBar.isCollapse
      },
      // 全屏、退出全屏
      fullScreenOperate() {
        if (this.fullScreenFlag) {
          util.exitFullscreen()
        } else {
          util.fullScreen(document.documentElement)
        }
        this.fullScreenFlag = !this.fullScreenFlag
      },
      // 刷新当前页面
      refreshIframe() {
        let currentIframe = document.getElementsByTagName('iframe')[this.crumbActiveIndex]
        currentIframe.contentWindow.location.reload();
      },
      // 切换左侧菜单
      pathChangeClick(value, label, path) {
        let pushFlag = true
        for (let i in this.crumbList) {
          if (this.crumbList[i].value == value) {
            pushFlag = false
            this.crumbActiveIndex = i
          }
        }
        if (pushFlag) {
          this.crumbList.push({
            value,
            label,
            path
          })
          this.crumbActiveIndex = this.crumbList.length - 1
        }
        this.loadIframe(this.crumbActiveIndex)
      },
      loadIframe(index) {
        this.crumbActiveIndex = index
        this.iframeActiveSrc = this.crumbList[index].path
      }
    },
    created() {
      this.userShowName = JSON.parse(localStorage.getItem('personalInfo')).showName
    },
    mounted() {
      this.asideIcon = this.$refs.AsideBar.asideIcon
      this.loadIframe(0)
    }
  }
</script>

<style lang="less" scoped>
  .indexOut{width: 100vw;height: 100vh;display: flex;
    .leftOut{background: #001529;width: auto;}
    .rightOut{flex: 1;
      .topNavOut{width: 100%;height: 57px;background: #fff;border-bottom: 1px solid #EBEEF5;
        li{padding: 0 20px;cursor: pointer;
          i{font-size: 18px;line-height: 56px;}
        }
        li:hover{background: #F1F1F1;}
      }
      .iframeOut{width: 100%;height: calc(100vh - 57px);padding: 15px;background: #f1f1f1;
        iframe{width: 100%;height: 100%;}
      }
    }
  }
</style>