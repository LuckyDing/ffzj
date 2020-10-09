<template>
	<view class="content">
		<view class="search-box">
			<uni-search-bar v-model="name" placeholder="请输入餐厅名称" @confirm="search"></uni-search-bar>
		</view>
		<view class="store-list">
			<template v-for="(item, index) in list">
				<my-panel :info="item" :key="index"></my-panel>
			</template>
		</view>
	</view>
</template>


<script>
	import {
		getShopList
	} from '@/api/index.js'
	import myPanel from '@/components/my-panel'
	export default {
		components:{
			myPanel
		},
		data() {
			return {
				title: 'Hello',
				name: '',
				list: []
			}
		},
		onLoad() {
			this.getShopList();
		},
		methods: {
			async getShopList() {
				await getShopList({
					name: this.name
				}).then(res => {
					this.list = res.data.shop
				})
			},
			search(){}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box{
		/deep/ .uni-searchbar{
			background-color: #32B295;
		}
		/deep/ .uni-searchbar__cancel{
			color:#fff;
		}
	}
</style>
