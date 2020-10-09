<template>
	<view class="content">
		<view class="my-header">
			<image class="logo" :src="userInfo.headimg || require('@/static/icon/me.png')"></image>
			<view class="name">{{userInfo.nickname}}</view>
			<button v-if="!hasLogin" size='mini' class="mini-btn" @click="goUserAuthorize">授权登录</button>
		</view>
		<view class="list">
			<template v-for="(item,index) in itemList">
				<view class="list-item" @click="goPages(item.path)" :key="index">
					<image mode="aspectFill" :src="item.icon" />
					<text class="title">{{item.title}}</text>
					<uni-icons class="icon" type="arrowright" size="14"></uni-icons>
				</view>
			</template>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				userInfo: {},
				hasLogin: false,
				itemList: [{
						title: '我的饭局',
						icon: require('@/static/icon/rice.svg'),
						path: '/pages/party/index'
					},
					{
						title: '我的名片',
						icon: require('@/static/icon/id_card.svg'),
						path: '/pages/my/edit'
					}
				]
			}
		},
		onShow() {
			this.userInfo = this.$store.state.user.userInfo
			this.hasLogin = this.$store.state.user.hasLogin
		},
		methods: {
			goPages(path) {
				uni.navigateTo({
					url: path
				})
			},
			goUserAuthorize() {
				uni.navigateTo({
					url: '/pages/login/authorize'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-header {
		background-color: $theme-color;
		padding: 90rpx 0;
		text-align: center;

		.logo {
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			background-color: #eee;
		}

		.name {
			color: #FFF;
			margin-top: 10rpx;
		}
	}

	.list {
		background-color: #fff;
		margin-top: 20rpx;

		.list-item {
			display: flex;
			align-items: center;
			position: relative;
			padding: 32rpx;

			&:not(:last-child):after {
				@include after-line()
			}

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.title {
				margin-left: 20rpx;
			}

			.icon {
				position: absolute;
				right: 32rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	
	.mini-btn {
		font-size: 24rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: $theme-sub-color;
		color:#fff;
	}
</style>
