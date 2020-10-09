<template>
	<view class="my-cell">
		<view class="my-cell-header"></view>
		<view class="my-cell-content">
			<slot name="content-left">
				<slot name="checkbox"></slot>
				<view class="content-left">
					<image mode="aspectFill" :src="info.logo || require('@/static/icon/rice.svg')"></image>
				</view>
			</slot>
			<slot name="content-right">
				<view class="content-right" @click="goPlayer">
					<view class="title">{{info.nickname}}</view>
					<view class="desc">{{statusText}}</view>
					<uni-icons class="icon" type="arrowright" size="14"></uni-icons>
				</view>
			</slot>
		</view>
		<view class="my-cell-footer"></view>
	</view>
</template>

<script>
	export default {
		name: 'myCell',
		props: {
			info: {
				type: Object,
				default: () => ({})
			},
			masterId: {
				type: Number,
				default: 0
			}
		},
		computed: {
			statusText() {
				if (this.info.id === this.masterId) {
					return '发起人'
				}
				const status = this.info.join_status
				let statusStr = ''
				switch (status) {
					case 'pass':
						statusStr = '未支付';
						break;
					case 'pay':
						statusStr = '已支付';
						break;
					default:
						break;
				}
				return statusStr;
			}
		},
		data() {
			return {};
		},
		created() {
			console.log(this.info)
		},
		methods:{
			goPlayer(){
				uni.navigateTo({
					url: '/pages/party/card?id=' + this.info.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-cell {
		background-color: #fff;
		padding: 28rpx;
		position: relative;
		&:after {
			@include after-line()
		}

		.my-cell-content {
			display: flex;
			align-items: center;
			position: relative;

			.content-left {
				width: 84rpx;
				height: 84rpx;
				margin-right: 20rpx;
				overflow: hidden;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.content-right {
				flex: 1;

				.title {
					font-weight: blod;
				}

				.desc {
					margin-top: 10rpx;
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}

				.icon {
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
