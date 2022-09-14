import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  // 状态属性：所有组件需要共享的数据
  state: {
  },
  // 定义获取数据的属性（方法，使用时是属性写法，定义时是方法的写法）
  getters: {
  },
  // 改变共享数据的值的方法（只能同步修改）
  mutations: {
  },
  // 改变共享数据的方法（支持异步修改）
  actions: {
  },
  modules: {
  }
})
