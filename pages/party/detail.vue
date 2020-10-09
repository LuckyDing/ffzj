<template>
	<view class="content">
		<view class="detail-store">
			<view class="store-header">
				<view class="my-panel-content">
					<view class="content-left">
						<image mode="aspectFill" :src="shop.pic_addr"></image>
					</view>
					<view class="content-right">
						<view class="title">{{party.name || ''}}</view>
						<view class="more">
							<view class="num">{{party.member_num || 0}}人局</view>
							<view class="price">人均：￥{{party.price || 0}}</view>
							<button class="btn" open-type="share">邀请好友</button>
						</view>
					</view>
				</view>
			</view>
			<view class="store-footer">
				<view class="footer-item">
					<image src="../../static/icon/shop.svg"></image>
					餐厅：{{shop.name || ''}}
				</view>
				<view class="footer-item" @click="showAddress">
					<image src="../../static/icon/address.svg"></image>
					地址：{{shop.addr || ''}}
				</view>
				<view class="footer-item">
					<image src="../../static/icon/time.svg"></image>
					时间：{{party.begin_time || ''}}
				</view>
			</view>
		</view>

		<view class="deadline">距报名截止还剩<text class="time">{{countDownTime || '0天0时0分'}}</text></view>
		<view v-if="!IsFailed" class="players-list">
			<view class="title">
				<view class="main">
					报名列表
				</view>
				<view class="desc">
					已报名{{num}}人 / 已选中{{selectNum}}人
				</view>
			</view>
			<view class="list">
				<checkbox-group @change="checkboxChange">
					<my-cell v-for="(item,index) in list" :info="item" :key="index" :masterId="party.uid">
						<template #checkbox>
							<view v-if="isEdit">
								<checkbox :value="item.id" :checked="item.checked" :disabled="item.join_status =='pass'" color="#32B295"/>
							</view>
						</template>
					</my-cell>
				</checkbox-group>
			</view>
		</view>
		<!-- 审核未通过 -->
		<view v-if="IsFailed" class="join-failed">
			<image mode="aspectFill" src="../../static/icon/failed.svg"></image>
			<view>您的报名审核未被通过</view>
			<view>点击下方按钮，可以自己选择发起饭局哦</view>
		</view>

		<view class="btn-field">
			<template v-if="!isOver">
				<template v-if="isMaster">
					<!-- 报名还未结束 -->
					<template v-if="status === 1">
						<view class="fixed-btn">报名还未结束，无法开始审核</view>
					</template>
					<!-- 报名结束 -->
					<template v-else-if="status === 2">
						<view class="fixed-btn color-success" @click="memberConfirm">确认参与人员</view>
					</template>
					<!-- 活动成功 -->
					<template v-else-if="status === 3">
						<view class="fixed-btn color-success" @click="scanQrcode">核销参与者</view>
					</template>
					<!-- 活动失败 -->
					<template v-else-if="status === 0">
						<view class="fixed-warning">已支付的餐标会在1个工作日内原款退回</view>
						<view class="fixed-btn">活动失败</view>
					</template>
				</template>
				<template v-else>
					<template v-if="!IsEnroll">
						<view class="fixed-btn color-success" @click="joinParty">报名活动</view>
					</template>
					<template v-else>
						<view v-if="IsFailed" class="fixed-btn color-success" @click="goEdit">
							发起饭局
						</view>
						<view v-else>
							<view v-if="isPay" class="fixed-btn" @click="openPop">已报名</view>
							<view v-else class="pay-btn fixed-btn">
								<view class="price">餐标：￥60/人</view>
								<view class="btn" @click="pay()">支付餐标</view>
							</view>
						</view>
					</template>
				</template>
			</template>
			<template v-else>
				<!-- 饭局结束 -->
				<view class="fixed-btn">饭局已束</view>
			</template>
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="center">
			<view>
				<canvas canvas-id="qrcode" style="width: 400rpx;height: 400rpx;" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import myPanel from '@/components/my-panel'
	import myCell from '@/components/my-cell'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		countDownTime
	} from '@/utils/index.js'
	import uQRCode from '@/utils/uqrcode.js'
	import {
		getPartyDetail,
		getMembers,
		joinParty,
		setMember
	} from '@/api/index.js'
	export default {
		components: {
			myPanel,
			myCell,
			uniPopup
		},
		data() {
			return {
				id: 0,
				uid: 0, // 当前人
				num: 0, // 报名人数
				selectNum: 0, //通过人数
				countDownTime: '', // 倒计时
				party: {}, // 饭局详情
				shop: {},
				list: [], // 报名人数
				selectedIds: [],
				status: 2, // 饭局当前状态
				isMaster: false, // 是否发起人
				isOver: false, // 饭局是否结束
				IsFailed: false, // 是否失败
				isPay: false
			}
		},
		computed: {
			// 是否报名
			IsEnroll() {
				const status = false
				this.list.forEach(item => {
					if (item.id === this.uid) {
						return true
					}
				})
			},
			//选择状态
			isEdit() {
				if (this.status == 2) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			checkboxChange(e) {
				this.selectedIds = e.detail.value
			},
			setMember() {
				setMember({
					action_id: this.id,
					member_id: this.selectedIds
				}).then(res => {
					this.getMembers()
				})
			},
			// 计算剩余时间
			getCountDownTime(str) {
				let time = countDownTime(str, 'minutes');
				if (time === 0) {
					this.status = 2;
				}
				this.countDownTime = time;
			},
			// 当前状态
			currentStatus() {
				let time = countDownTime(this.party.begin_time, 'minutes');
				if (this.party.status === 'end' || time == 0) {
					this.isOver = true
				}
				if (this.party.uid == this.uid) {
					this.isMaster = true
				}
			},
			// 获取详情
			getDetail() {
				getPartyDetail({
					action_id: this.id
				}).then(res => {
					const detail = res.data.action
					this.party = detail
					this.shop = res.data.shop
					this.getCountDownTime(detail.join_stop_time)
					this.currentStatus()
				});
			},
			// 获取参与人
			getMembers() {
				this.list = [];
				getMembers({
					action_id: this.id
				}).then(res => {
					this.list = res.data.member
					this.list.map(item => {
						if (item.join_status === 'pass') {
							item.checked = true
						} else {
							item.checked = false
						}
					})
					this.num = res.data.member.length
				});
			},
			// 报名活动
			joinParty() {
				this.checkIsRegist()
				joinParty({
					action_id: this.id
				}).then(res => {
					if (res.data.code == 0) {
						this.getMembers();
						uni.showModal({
							title: '报名成功',
							content: '请等待组织者审核',
							showCancel: false,
							success: () => {}
						})
					}
				})
			},
			memberConfirm() {
				uni.showModal({
					title: '确认参与人员',
					content: '确认参与者后无法更改，请无误后点击确认',
					success: (e) => {
						if (e.confirm) {
							this.setMember()
						}
					}
				})
			},
			showAddress(){
				this.openLocation(24.475041,118.160191,this.shop.name,this.shop.addr)
			},
			// 发起页面
			goEdit() {
				uni.navigateTo({
					url: '/pages/party/edit'
				})
			},
			// 支付
			pay() {},
			// 扫码
			scanQrcode() {
				uni.scanCode({
					scanType: ['qrCode'],
					onlyFromCamera: true,
					success: (res) => {
						console.log(res)
					}
				})
			},
			// 弹窗
			openPop() {
				this.$refs.popup.open()
				this.make()
			},
			// 二维码生成
			make() {
				uQRCode.make({
					canvasId: 'qrcode',
					text: '/pages/party/player?id=' + this.id,
					size: uni.upx2px(400),
					margin: 10,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					correctLevel: uQRCode.errorCorrectLevel.H,
					success: res => {
						console.log(res)
					}
				})
			}
		},
		onLoad(opthion) {
			this.id = opthion.id
			this.uid = uni.getStorageSync('userId')
		},
		onShow() {
			this.getDetail()
			this.getMembers()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target)
			}
			return {
				title: '发现饭局邀请您来参加',
				path: '/page/detail?id=' + this.id
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;
		height: 100%;
	}

	.store-header {
		.my-panel-content {
			display: flex;
			align-items: center;
			padding: 28rpx;
		}

		.content-left {
			width: 136rpx;
			height: 136rpx;
			margin-right: 20rpx;
			overflow: hidden;
			border-radius: 8rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.content-right {
			flex: 1;

			.title {
				font-size: 32rpx;
				font-weight: blod;
			}

			.more {
				font-size: 24rpx;
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				position: relative;

				.num {
					width: 100rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					border-radius: 4rpx;
					border: 1px solid $uni-text-color-disable
				}

				.price {
					margin-left: 20rpx;
					color: $theme-color;
				}

				.btn {
					width: 140rpx;
					height: 48rpx;
					line-height: 48rpx;
					text-align: center;
					color: #fff;
					border-radius: 40rpx 0 0 40rpx;
					background: rgb(131, 217, 197);
					position: absolute;
					right: -28rpx;
					top: 50%;
					transform: translateY(-50%);
					font-size: 20rpx;
				}
			}
		}
	}

	.store-footer {
		border-top: 1px solid #eee;
		padding: 28rpx;
		color: $uni-text-color-grey;

		.footer-item {
			margin-bottom: 20rpx;

			image {
				vertical-align: middle;
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	.deadline {
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		color: $uni-text-color-grey;
		background-color: $uni-bg-color-grey;
		font-size: 24rpx;

		.time {
			color: $theme-color;
		}
	}

	.players-list {
		.title {
			padding: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.main {
				font-weight: bold;
			}

			.desc {
				font-size: 24rpx;
				color: $uni-text-color-grey;
			}
		}

		.list {}
	}

	.fixed-btn {
		background-color: rgba(131, 217, 197, 1);
		@include fixed-box();
	}

	.fixed-warning {
		@include fixed-warning()
	}

	.color-success {
		background-color: $theme-color !important;
	}

	.join-failed {
		text-align: center;
		padding: 100rpx 0;

		image {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 50rpx;
		}

		view {
			font-size: 24rpx;
			color: $uni-text-color-grey;
			margin-bottom: 32rpx;
		}
	}

	.pay-btn {
		display: flex;
		align-items: center;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		background-color: #fff;

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
</style>
