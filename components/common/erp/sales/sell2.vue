<template>
	<view class="margin-top-xs cu-list card-menu">
		<view class="bg-white arrow margin-bottom-xs padding-lr-sm padding-tb-lg radius-4"  v-for="(item,index) in list_data" :key="index">
			<view class="margin-bottom-sm">
				<view class="text-red text-lg text-bold">{{item.username}}</view>
			</view>
			<view class="text-deepblue text-bold">
				<view class="grid col-3">
					<view class="">订单数:<text>{{item.order_num}}</text></view>
					<view class="">商品数:<text>{{item.nums}}</text></view>
				</view>
				<view class="grid col-3">
					<view class="">合计:<text>{{item.sales_money}}</text></view>
					<view class="">实收:<text>{{item.money}}</text></view>
				</view>
				<view class="grid col-3">
					<view class="">成本:<text>{{item.cost_price}}</text></view>
					<view class="">毛利:<text>{{item.lirun}}</text></view>
					<view class="">毛利润:<text>{{item.lilv}}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'sell2',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.cu-list.card-menu{
		margin-right: 0;
		margin-left: 0;
	}
	.card-menu .goodsimg{
		width:150rpx;
		height:150rpx;
		background-size: 100% 100%;
	}
</style>
