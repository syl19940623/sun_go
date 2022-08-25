<template>
  <transition name="dialog-fade">
    <div class="sliderVerifyMask" v-if="show" @click="sliderClose">
      <div class="sliderVerify">
        <!-- 图片 -->
        <div class="sliderImg">
          <i class="refreshBtn el-icon-refresh" @click="sliderRefresh"></i>
          <img :src="sliderBg" alt="" class="sliderBg">
          <img :src="sliderCut" alt="" class="sliderCut" :style="{'position': 'absolute', 'top': sliderBlockTop + 'px', 'left': sliderRangeBlockLeft + 'px'}">
          <div class="verifyTxt" v-show="showVerifyTxt">
            <p class="successTxt" v-if="verifyStatus">验证成功</p>
            <p class="failTxt" v-else>验证失败</p>
          </div>
        </div>
        <!-- 滑块 -->
        <div class="sliderRangeOut">
          <p class="sliderRangeTxt">拖动滑块完成拼图</p>
          <div class="sliderRange" :style="{'width': sliderRangeWidth + 'px'}">
            <div class="sliderRangeBlock" :style="{'position': 'absolute', 'top': '0', 'left': sliderRangeBlockLeft + 'px'}" @mousedown="sliderMove">
              <i class="el-icon-s-unfold"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'SliderVerify',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      sliderBlockTop: {
        type: Number,
        default: 0
      },
      sliderBg: {
        type: String,
        default: ''
      },
      sliderCut: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        sliderRangeWidth: 50,
        sliderRangeBlockLeft: 0,
        showVerifyTxt: false,
        verifyStatus: false
      }
    },
    methods: {
      sliderMove(e) {
        let odiv = e.target;
        let disX = e.clientX - odiv.offsetLeft;
        document.onmousemove = (e) => {
          let left = e.clientX - disX;
          left = left <= 0 ? 0 : left <= 300 ? left : 300;
          this.sliderRangeWidth = 50 + left;
          this.sliderRangeBlockLeft = left;
        };
        document.onmouseup = (e) => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.$emit('sliderComplete', this.sliderRangeBlockLeft)
        };
      },
      sliderReset() {
        this.sliderRangeWidth = 50
        this.sliderRangeBlockLeft = 0
        this.showVerifyTxt = false
        this.verifyStatus = false
      },
      sliderRefresh() {
        this.sliderReset()
        this.$emit('sliderRefresh')
      },
      sliderSuccess() {
        this.showVerifyTxt = true
        this.verifyStatus = true
      },
      sliderFail() {
        this.showVerifyTxt = true
        this.verifyStatus = false
      },
      sliderClose(e) {
        if (e.target.className == 'sliderVerifyMask') {
          this.$emit('sliderClose')
        }
      }
    }
  }
</script>

<style lang="less">
  .sliderVerifyMask{width: 100%;height: 100%;background: rgba(0, 0, 0, .6);position: fixed;top: 0;left: 0;
    .sliderVerify{padding: 20px;background: #fff;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);
      .sliderImg{width: 350px;height: 200px;position: relative;
        .refreshBtn{width: 40px;height: 40px;position: absolute;top: 0;right: 0;color: #67C23A;text-align: center;line-height: 40px;cursor: pointer;font-size: 22px;transition: all .3s linear;font-weight: bold;}
        .refreshBtn:hover{transform: rotate(180deg);}
        img{width: 100%;height: 100%;display: block;user-select: none;}
        .sliderCut{width: 50px;height: 50px;}
        .verifyTxt{position: absolute;left: 0;bottom: 0;text-align: center;line-height: 30px;color: #fff;width: 100%;opacity: .8;
          .successTxt{background: #67C23A;}
          .failTxt{background: #F56C6C;}
        }
      }
      .sliderRangeOut{width: 100%;background: #EEF1F8;height: 50px;margin-top: 20px;position: relative;
        .sliderRangeTxt{color: #b7bcd1;line-height: 50px;text-align: center;user-select: none;}
        .sliderRange{height: 50px;position: absolute;top: 0;left: 0;background: rgba(106, 160, 255, .8);
          .sliderRangeBlock{width: 50px;height: 50px;text-align: center;background: #fff;box-shadow: 0 0 4px 2px rgba(0, 0, 0, .1);cursor: move;
            i{line-height: 50px;font-size: 22px;}
          }
        }
      }
    }
  }
</style>