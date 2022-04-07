import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aObj: {}, //单体对象
    GWCArr: [] //购物车总数据
  },
  mutations: {
    CCC(state, payload) {
      state.aObj = Object.assign({}, payload);
    },

    GWC(state, payload) {
      state.GWCArr = payload;
    },
  },
  actions: {
    lll({ commit }, payload) {
      commit("CCC", payload)
    },
    allArr({ commit }, payload) {
      commit("GWC", payload)
    },
  },
  modules: {
  }
})
