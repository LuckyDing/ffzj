<template>
	<view class="party-index">
		<ms-tabs :list="tabs" v-model="active"></ms-tabs>
		<view class="party-list" v-if="!empty">
			<view class="party-list-item" v-for="(item, index) in list" :key="index" @click="goDetail(item.id)">
				<view class="item-left">
					<image class="image" mode="aspectFill" :src="item.pic_addr"></image>
				</view>
				<view class="item-right">
					<view class="title">
						<view class="name">{{item.name}}</view>
						<view class="status">待审核</view>
					</view>
					<view class="desc">{{item.shop_name}}</view>
					<view class="desc">{{item.begin_time}}</view>
				</view>
			</view>
			<uni-load-more :status="loading"></uni-load-more>
		</view>
		<view v-if="empty" class="no-data">暂无数据</view>
	</view>
</template>

<script>
	import msTabs from '@/components/ms-tabs/ms-tabs'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		getPartyList
	} from '@/api/index.js'
	export default {
		components: {
			msTabs,
			uniLoadMore
		},
		data() {
			return {
				active: 0,
				loading: 'loading',
				empty: false,
				query: {
					num: 10,
					page: 0,
					role: 'builder'
				},
				list: [],
				tabs: [{
						title: '我组织的'
					},
					{
						title: '我报名的'
					}
				]
			}
		},
		watch: {
			active() {
				this.listInit()
				if (this.active === 0) {
					this.query.role = 'builder'
				} else {
					this.query.role = 'joiner'
				}
				this.getPartyList()
			}
		},
		onReachBottom() {
			console.log('onReachBottom')
			this.query.page += 1
			this.getPartyList()
		},
		methods: {
			getPartyList() {
				getPartyList(this.query).then(res => {
					this.list = [...this.list, ...res.data.action]
					const length = this.list.length
					this.loading = length < 10 ? 'more': 'noMore'
					if(length == 0) {
						this.empty = true
					}
				})
			},
			listInit() {
				this.list = []
				this.query.page = 0
				this.empty = false
			},
			goDetail(id) {
				uni.navigateTo({
					url: `detail?id=`+id
				})
			}
		},
		onLoad() {
			this.getPartyList()
		}
	}
</script>

<style lang="scss" scoped>
	.party-list-item {
		display: flex;
		padding: $theme-margin;
		background-color: #fff;
		margin-top: 20rpx;

		.item-left {
			$width: 120rpx;
			width: $width;
			height: $width;
			border-radius: 8rpx;
			overflow: hidden;
			margin-top: 6rpx;

			.image {
				width: 100%;
				height: 100%;
			}
		}

		.item-right {
			margin-left: 28rpx;
			flex: 1;

			.title {
				@extend .flex-center-between;

				.name {
					font-weight: bold;
				}

				.status {
					font-size: 24rpx;
				}
			}

			.desc {
				margin-top: 20rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
