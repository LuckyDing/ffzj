<template>
	<view class="my-card">
		<view class="card-title">个人名片</view>
		<view class="list">
			<view class="list-item">
				<text class="title">姓名</text>
				<text class="info">{{info.nickname}}</text>
			</view>
			<view class="list-item">
				<text class="title">电话</text>
				<text class="info">{{info.phone}}</text>
			</view>
		</view>
		<view class="more">
			<view class="more-title">更多名片</view>
			<view class="no-more">暂无更多信息</view>
		</view>
	</view>
</template>
	
<script>
	import {
		getUserInfo
	} from '@/api/index.js'
	export default{
		data() {
			return {
				info: {},
				id: 0
			}
		},
		onLoad(opthion) {
			this.id = opthion.id
			this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				getUserInfo({
					id: this.id
				}).then(res => {
					this.info = res.data.user
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-title{
		padding: $theme-margin $theme-margin 14rpx $theme-margin;
		background-color: #fff;
		font-weight: bold;
	}
	.list{
		background-color: #fff;
		padding: $theme-margin;
		.list-item{
			height: 88rpx;
			line-height: 88rpx;
			position: relative;
			&:not(:last-child):after {
				@include after-line()
			}
			.title {
				margin-right: 48rpx;
			}
		}
	}
	.more {
		margin-top: 20rpx;
		background-color: #fff;
		padding-bottom: 36rpx;
		.more-title{
			padding: $theme-margin;
		}
		.no-more{
			padding: $theme-margin;
			padding-top: 0;
			color: $uni-text-color-grey
		}
	}
</style>
