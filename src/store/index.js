import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsNum: 0
  },
  mutations: {
    updateGoodsNum(state, payload) {
      state.goodsNum = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
