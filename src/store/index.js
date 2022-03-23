import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    CCC(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    ccc({ commit }, payload) {
      commit("CCC", payload)
    }
  },
  modules: {
  }
})
