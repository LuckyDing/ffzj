export default {
	namespaced: true,
	state: {
		detail: {},
	},
	mutations: {
		setDetail(state, data) {
			state.detail = data
		}
	}
}
