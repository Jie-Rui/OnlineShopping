// 入口文件

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

// 全局函数及变量
import Global from './Global'
Vue.use(Global)

//全局组件
import MyMenu from './components/MyMenu';
Vue.component(MyMenu.name ,MyMenu);
import MyList from './components/MyList';
Vue.component(MyList.name ,MyList);
import MyLogin from './components/MyLogin';
Vue.component(MyLogin);
import MyRegister from './components/MyRegister';
Vue.component(MyRegister);

// 定义全局时间过滤器
Vue.filter('dateFormat',function (originVal){
  const dt = new Date(originVal * 1000)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate()+ '').padStart(2,'0')

  const hh = (dt.getHours()+ '').padStart(2,'0')
  const mm = (dt.getMinutes()+ '').padStart(2,'0')
  const ss = (dt.getMilliseconds()+ '').padStart(2,'0')

  const DateStr = `${y}-${m}-${d} ${hh}:${mm}:${ss}`

  return DateStr
})

Vue.prototype.$http = Axios
Axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
