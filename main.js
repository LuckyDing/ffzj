import Vue from 'vue'
import App from './App'
import store from 'store/index.js'
import {
	Mixins
} from 'mixins/base.js'

// #ifndef MP-WEIXIN
// 小程序中会报错
import VConsole from 'vconsole'
if (process.env.NODE_ENV === 'development') {
	new VConsole()
}
// #endif

Vue.config.productionTip = false
Vue.mixin(Mixins)

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
