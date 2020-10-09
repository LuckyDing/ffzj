<template>
	<view class="my-panel">
		<view class="my-panel-header"></view>
		<view class="my-panel-content">
			<slot name="content-left">
				<view class="content-left">
					<image class="image" mode="aspectFill" :src="info.pic_addr || require('@/static/icon/rice.svg')"></image>
				</view>
			</slot>
			<slot name="content-right">
				<view class="content-right">
					<view class="title">{{info.name}}</view>
					<view class="desc">地址: {{info.addr}}</view>
					<view class="more">
						<view class="price">人均：￥{{info.ev_price}}</view>
						<view class="btn" @click="goPartyEdit">发起饭局</view>
					</view>
				</view>
			</slot>
		</view>
		<view class="my-panel-footer"></view>
	</view>
</template>

<script>
	export default {
		name: 'myPanel',
		props:{
			info: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
			};
		},
		options: {
			addGlobalClass: true,
			multipleSlots: true
		},
		methods: {
			goPartyEdit(){
				this.$store.commit('shop/setDetail', this.info)
				uni.navigateTo({
					url:'/pages/party/edit?sid=' + this.info.Id
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-panel{
		background-color: #fff;
		.my-panel-content {
			display: flex;
			align-items: center;
			padding: 28rpx;
			.content-left{
				width:200rpx;
				height: 200rpx;
				margin-right: 20rpx;
				overflow: hidden;
				border-radius: 8rpx;
				.image{
					width: 100%;
					height: 100%;
					background-color: #EEEEEE;
				}
			}
			.content-right{
				flex: 1;
				.title{
					font-weight: blod;
				}
				.desc{
					margin-top: 20rpx;
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
				.more{
					font-size: 24rpx;
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.price{
						color:$theme-color;
					}
					.btn{
						width: 128rpx;
						height: 48rpx;
						line-height: 48rpx;
						text-align: center;
						color:#fff;
						border-radius: 4rpx;
						background: linear-gradient(90deg, rgba(249, 199, 170, 1) 4%, rgba(255, 142, 72, 1) 100%);
					}
				}
			}
		}
	}
</style>
