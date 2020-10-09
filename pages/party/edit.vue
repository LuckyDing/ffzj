<template>
	<view class="content">
		<view class="party-image" :style="{'background-image': 'url(' + storeLogo +')'}">
			<view class="store-name">{{ storeName }}</view>
		</view>
		<view class="form">
			<view class="uni-form-item">
				<view class="title">饭局主题</view>
				<input class="uni-input" v-model="partyName" maxlength="10" placeholder="请填写饭局主题" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">饭局时间</view>
				<input class="uni-input" v-model="partyTime" readonly @click="showPicker" placeholder="请选择饭局开始时间" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">饭局人数</view>
				<input class="uni-input" v-model="partyNum" maxlength="10" placeholder="10" />
			</view>
		</view>
		<view class="party-warning">提示：报名截止至饭局开始前48小时</view>
		<view class="fix-btn">
			<view class="desc">若活动未能成功组织，会全款退回餐标</view>
			<view class="info">
				<view class="price">餐标：60/人</view>
				<view class="btn" @click="creatParty">支付餐标并发起活动</view>
			</view>
		</view>
		<e-picker-plus ref="picker" mode="YMDhm" @confirm="onConfirm" />
	</view>
</template>


<script>
	import {
		addParty
	} from '@/api/index';
	import { dateFormat } from '@/utils/index.js'
	export default {
		components: {},
		data() {
			return {
				storeName: '',
				storeLogo: '',
				defaultLogo: require('@/static/icon/rice.svg'),
				partyName: '',
				partyTime: '',
				partyNum: 6,
				sid: 0
			}
		},
		onLoad(options) {
			this.sid = options.sid
			this.checkIsRegist()
		},
		onShow(){
			const shop = this.$store.state.shop.detail
			this.storeName = shop.name
			this.storeLogo = shop.pic_addr ? shop.pic_addr : this.defaultLogo
		},
		methods: {
			async creatParty() {
				if(this.partyName === '') return this.showTest('请输入饭局名称')
				if(this.partyTime === '') return this.showTest('请选择饭局时间')
				if(this.partyNum < 2) return this.showTest('人数不足')
				this.partyTime = dateFormat('YYYY-mm-dd HH:MM:SS',this.partyTime)
				await addParty({
					name: this.partyName,
					shop_id: this.sid,
					begin_time: this.partyTime
				}).then(res => {
					console.log(res);
					if (res.err_code == "0") {
						uni.navigateTo({
							url: 'detail?id=' + res.data.action_id
						})
					}
				})
			},
			showPicker() {
				this.$refs.picker.show()
			},
			onConfirm(e){
				this.partyTime = e.result;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.party-image {
		height: 560rpx;
		width: 100%;
		background-color: #eee;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;

		.store-name {
			width: 100%;
			position: absolute;
			left: 0px;
			bottom: 0px;
			background-color: rgba(0, 0, 0, 0.5);
			color: #fff;
			height: 72rpx;
			line-height: 72rpx;
			padding-left: 28rpx;
		}
	}
	.party-warning {
		padding: 28rpx;
		color: $uni-text-color-grey;
		font-size: 24rpx;
		background-color: #fff;
		padding-bottom: 100rpx;
	}
	.fix-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		.desc {
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			background-color: rgb(245, 245, 245);
			color: $uni-text-color-grey;
			font-size: 24rpx;
		}
		.info {
			display: flex;
			align-items: center;
			height: 84rpx;
			line-height: 84rpx;
			text-align: center;
			.price {
				width: 256rpx;
				color: #FF8E48;
				font-weight: bold;
				background-color: rgba(255, 142, 72, 0.3);
			}
			.btn {
				color: #fff;
				flex: 1;
				background-color: $theme-color;
			}
		}
	}
</style>
