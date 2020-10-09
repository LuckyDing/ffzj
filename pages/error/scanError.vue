<template>
	<view class="scan-error">
		<view class="scan-error-content">
			<image mode="aspectFill" src="../../static/icon/search_page.png"></image>
			<view>核销码错误</view>
		</view>
		<view class="btn">
			<button class="confirm-btn" @click="goBack()">返回上一页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scan-error-content{
		padding-top: 200rpx;
		text-align: center;
		color: $uni-text-color-grey;
		image {
			width: 150rpx;
			height: 150rpx;
			margin-bottom: 28rpx;
			margin-left: 20rpx;
		}
	}
	.btn{
		margin-top: 150rpx;
		padding: 48rpx;
		.confirm-btn {
			background-color: $theme-color;
			color: #fff;
		}
	}
</style>
