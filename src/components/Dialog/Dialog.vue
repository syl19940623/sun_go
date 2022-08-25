<template>
  <transition name="dialog-fade">
    <div class="dialogMask" v-if="show">
      <div class="dialog" :style="{width: width, height: height}">
        <div class="dialogTop">
          <h1>{{title}}</h1>
          <i v-if="isShowClose" class="el-icon-close" @click="dialogClose"></i>
        </div>
        <div class="dialogMid" :style="{height: 'calc(' + (height.indexOf('%') ? '100%' : height) + ' - 105px)'}">
          <div v-if="content" class="dialogContent">
            {{content}}
          </div>
          <slot v-else name="vNode"></slot>
        </div>
        <div class="dialogBot" v-if="btns.length > 0">
          <div class="dialogBotBtn" v-for="(item, index) in btns" :key="index">
            <el-button :type="index == 0 ? 'primary' : ''" size="small" @click="dialogOperate(index)">{{item}}</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      show: Boolean,
      isShowClose: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: 'auto'
      },
      height: {
        type: String,
        default: 'auto'
      },
      btns: {
        type: Array,
        default() {
          return ['确定']
        }
      },
      title: {
        type: String,
        default: '提示'
      },
      content: {
        type: String
      }
    },
    methods: {
      dialogClose() {
        this.$emit('update:show', false)
        this.$emit('dialogClose')
      },
      dialogOperate(index) {
        if (index == this.btns.length - 1) {
          this.dialogClose()
        }
        this.$emit('dialogOperate', index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .dialogMask{width: 100%;height: 100%;background: rgba(0, 0, 0, .6);position: fixed;top: 0;left: 0;z-index: 1994;
    .dialog{background: #fff;border-radius: 3px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);min-width: 270px;
      .dialogTop{overflow: hidden;line-height: 45px;padding: 0 15px;border-bottom: 1px solid #DCDFE6;background: #f8f8f8;height: 46px;
        h1{float: left;font-weight: 500;color: rgba(0, 0, 0, .85);}
        i{float: right;line-height: 46px;font-size: 16px;font-weight: bold;cursor: pointer;}
        i:hover{color: #409EFF;}
      }
      .dialogMid{overflow-y: auto;
        .dialogContent{padding: 20px 15px 6px;color: #606266;}
      }
      .dialogBot{overflow: hidden;padding: 14px 15px 14px;
        .dialogBotBtn{float: right;margin-left: 15px;}
      }
    }
  }
</style>