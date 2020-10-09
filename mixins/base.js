export const Mixins = {
	data() {
		return {}
	},
	methods: {
		showTest(message) {
			uni.showToast({
				title: message,
				icon: 'none',
				duration: 2000
			})
		},
		checkIsRegist() {
			const userInfo = this.$store.state.user.userInfo
			if (!userInfo) {
				uni.showModal({
					title: '请先注册',
					content: '为了保障您的权益，请先注册哦',
					showCancel: false,
					success: (e) => {
						if (e.confirm) {
							uni.navigateTo({
								url: '/pages/login/authorize'
							})
						}
					}
				})
				return false
			} else {
				return true
			}
		},
		checkPhoneNumberIsEmpty() {
			const userInfo = this.$store.state.user.userInfo
			if (!userInfo.phone) {
				uni.showModal({
					title: '手机号未设置',
					content: '为了保障您的权益，请先完善个人信息哦',
					showCancel: false,
					success: (e) => {
						if (e.confirm) {
							uni.navigateTo({
								url: '/pages/my/edit'
							})
						}
					}
				})
				return false
			} else {
				return true
			}
		},
		openLocation(latitude, longitude, name, address) {
			uni.openLocation({
				latitude: latitude,
				longitude: longitude,
				name: name,
				address: address,
				success: function() {
					console.log('success');
				}
			});
		}
	},
}
