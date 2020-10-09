import request from './request.js'

//登录
export function login(data) {
	return request.post('/applet/index/login', data)
}
// 注册
export function regist(data) {
	return request.post('/applet/index/regist', data)
}
// 获取用户信息
export function getUserInfo(data) {
	return request.get('/applet/user/info', data)
}
// 更新用户信息
export function updateUserInfo(data) {
	return request.post('/applet/index/update_user_info', data)
}
// 更新手机
export function updateUserPhone(data) {
	return request.post('/applet/index/update_user_phone', data)
}
// 获取用户手机
export function getUserPhone(data) {
	return request.post('/applet/index/get_user_phone', data)
}

/* 活动 */

// 添加活动 data: {name,shop_id,action_time}
export function addParty(data) {
	return request.post('/applet/action/add',data)
}
// 活动列表
export function getPartyList(data) {
	return request.get('/applet/action/my_action', data)
}
// 加入活动
export function joinParty(data) {
	return request.post('/applet/action/join', data)
}
// 活动详情
export function getPartyDetail(data) {
	return request.get('/applet/action/detail', data)
}
// 成员列表
export function getMembers(data) {
	return request.get('/applet/member/list', data)
}

// 付款
export function pay(data) {
	return request.post('/applet/bill/pay', data)
}
// 设置成员
export function setMember(data) {
	return request.post('/applet/member/setMember', data)
}

// 商家列表
export function getShopList(data) {
	return request.get('/applet/shop/list', data)
}
