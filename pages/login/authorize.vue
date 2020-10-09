<template>
	<view>
		<view class="header">
			<image class="logo" mode="aspectFill" src="../../static/icon/rice.svg"></image>
			<view>申请获得以下权限</view>
			<view class="desc">获得你的公开信息(昵称，头像，手机等)</view>
		</view>
		<view class="btn-group">
			<button class="btn" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">授权登录</button>
		</view>
	</view>
</template>

<script>
	import {
		login,
		regist
	} from '@/api/index';
	export default {
		data() {
			return {
			};
		},
		methods:{
			wxRegist() {
				const _this = this;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    const code = loginRes.code;
					// 获取用户信息
					uni.getUserInfo({
						success(userRes) {
							// 注册
							regist({
								code: code,
								encryptedData: userRes.encryptedData,
								iv: userRes.iv
							}).then(res=> {
								_this.$store.commit('user/login', res.data);
								uni.navigateBack({
									delta:1
								})
							})
						},
						fail(err) {
							console.log(err)
						}
					})
				  }
				});
			},
			wxGetUserInfo() {
				const _this = this;
				uni.getSetting({
					success(res) {
						 if (res.authSetting['scope.userInfo']) {
							 _this.wxRegist()
						 }
					}
				})
			},
			wxGetPhoneNumber(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss">
.header {
	text-align: center;
	padding-top: 30%;
	.logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 48rpx;
		background-color: $theme-color;
	}
	.desc {
		margin-top: 32rpx;
		color: $uni-text-color-grey;
	}
}
.btn{
	background-color: $theme-color;
	color: #fff;
	margin: 32rpx;
}
</style>
