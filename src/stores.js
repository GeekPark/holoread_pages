import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTranslate: false,
    source: ''
  },
  mutations: {
    SET_ITEM: (state, obj) => {
      state[obj.key] = obj.val
    }
  }
})
