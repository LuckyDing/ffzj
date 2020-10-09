<script>
	import { login } from '@/api/index';
	export default {
		onLaunch: function() {
			const _this = this;
			uni.login({
				provider: 'weixin',
				success(loginRes) {
					login({
						code: loginRes.code
					}).then(res => {
						if (res.err_code == "0") {
							console.log(res);
							_this.$store.commit('user/login', res.data);
						}
					})
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	body,page {
		min-height: 100%;
		font-size: 28rpx;
		background-color: #f8f8f8;
	}
</style>
