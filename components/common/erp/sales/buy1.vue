<template>
	<view class="margin-top-xs cu-list card-menu">
		<view class="bg-white arrow margin-bottom-xs padding-lr-sm padding-tb-lg radius-4"  v-for="(item,index) in list_data" :key="index"  @tap="listTap(item.id)">
			<view class="margin-bottom-sm">
				<view class="text-red text-lg text-bold">{{item.name}}</view>
			</view>
			<view class="text-deepblue text-bold">
				<view class="grid col-3">
					<view class="">订单数:<text>{{item.order_num}}</text></view>
					<view class="">商品数:<text>{{item.nums}}</text></view>
					<view class="">回收额:<text>{{item.money}}</text>元</view>
				</view>
				<!-- <view class="grid col-3">
					<view class="">回收额:<text>10000</text>元</view>
					<view class="">均价:<text>100</text>元</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'buy1',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			listTap(data) {
				console.log(data)
				/*
				this.$emit('listTap', {
					data
				});*/
			}
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
