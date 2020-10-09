import Config from './config.js'
import uni_request from '@/utils/uni_request/uni_request.js'
let baseURL = Config.baseUrl
console.log(baseURL);
const request = uni_request({
	baseURL: baseURL,
	timeout: 10000, // 超时时间，单位毫秒。默认 60 秒
	statusCode: [200, 401]
})

request.interceptors.request.use(async (config, ...args) => { // 请求拦截器
	// ...
	// if (!$store.state.app.token) { // 如果没得 token
	// 	// await new Promise(resolve => ))
	// }
	// config.header.Authorization = 'Bearer ' + $store.state.app.token // 把 token 放在请求头
	// console.log(config);
	let token =  uni.getStorageSync('token')
	config.body.token = token
	// config.header.token = token
	config.header.ContentType = 'application/json'
	if (!config.header.hideLoading) {
		uni.showLoading({
			title: '加载中'
		})
	}
	return config
})

request.interceptors.response.use(async (response, ...args) => { // 响应拦截器
	// ...
	uni.hideLoading();
	return response
})

request.onerror = (...args) => console.log(args) // 错误监听

export default request
