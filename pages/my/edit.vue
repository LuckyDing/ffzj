<template>
	<view class="my-edit">
		<view class="edit-title">个人名片</view>
		<view class="form">
			<view class="uni-form-item">
				<view class="title">姓名</view>
				<input class="uni-input" :value="name" maxlength="10" placeholder="请输入姓名" />
			</view>
			<view class="uni-form-item">
				<view class="title">手机</view>
				<input class="uni-input" :value="mobile" maxlength="11" placeholder="请输入手机号" />
				<button class="mini-btn" open-type="getPhoneNumber" @getPhoneNumber="wxGetPhoneNumber">获取微信绑定手机</button>
			</view>
		</view>
		<view class="btn-box">
			<button class="my-btn" type="default" @click="save">保存修改</button>
		</view>
	</view>
</template>
	
<script>
	import {
		updateUserInfo
	} from '@/api/index.js'
	export default{
		data() {
			return {
				name: '',
				mobile: ''
			}
		},
		methods:{
			wxGetPhoneNumber(e) {
				console.log(e);
			},
			save(){
				updateUserInfo({
					name: this.name,
					mobile: this.mobile
				}).then(res => {
					console.log(res)
				})
			}
		},
		onLoad(){
			this.checkIsRegist()
			const userInfo = this.$store.state.user.userInfo
			this.name = userInfo.nickname
			this.mobile = userInfo.phone
		}
	}
</script>

<style lang="scss" scoped>
	.edit-title{
		padding: 28rpx 28rpx 14rpx 28rpx;
		background-color: #fff;
		font-weight: bold;
	}
	.uni-form-item {
		justify-content: start !important;
		.uni-input{
			text-align: left !important;
			margin-left: 40rpx;
		}
	}
	.btn-box{
		padding: 68rpx 48rpx;
	}
	.my-btn{
		background-color: $theme-color;
		color: #fff;
	}
	.mini-btn {
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		font-size: 24rpx;
		background-color: $theme-sub-color;
		color: #fff;
	}
</style>
