export default {
	namespaced: true,
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, data) {
			state.hasLogin = true
			state.userInfo = data.userinfo
			uni.setStorage({
				key: 'userId',
				data: data.userinfo.Id
			});
			uni.setStorage({
				key: 'token',
				data: data.token
			});
		},
		logout(state) {
			state.hasLogin = false
			state.userInfo = {}
		}
	}
}
