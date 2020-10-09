<template>
	<view class="joiner">
		<view class="joiner-header">
			<image class="header-image" mode="aspectFill" :src="player.image"></image>
			<view class="info">
				<view class="name">{{player.name}}</view>
				<view class="mobile">{{player.mobile}}</view>
			</view>
		</view>
		<view class="btn-group">
			<button class="confirm-btn" type="default">确认核销</button>
			<button class="cancel-btn" type="default">取消操作</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				player: {
					image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1671867548,3494668475&fm=26&gp=0.jpg',
					name: '樱花树',
					mobile: '1866666666',
					id: 100
				}
			}
		},
		methods: {
		},
		onLoad() {
		}
	}
</script>

<style lang="scss" scoped>
	.joiner-header {
		margin-top: 48rpx;
		text-align: center;
		.header-image {
			width: 240rpx;
			height: 240rpx;
			background-color: #eee;
			border-radius: 50%;
			overflow: hidden;
		}
		.info {
			margin-top: 20rpx;
			.name {
				font-size: 32rpx;
				font-weight: bold;
			}
			.mobile {
				color: $uni-text-color-grey;
				margin-top: 10rpx;
			}
		}
	}
	.btn-group {
		margin-top: 100rpx;
		padding: 40rpx;
		.confirm-btn {
			background-color: $theme-color;
			color: #fff;
		}
		.cancel-btn {
			margin-top: 36rpx;
			background-color: #fff;
			color: $uni-text-color-grey;
		}
	}
</style>
