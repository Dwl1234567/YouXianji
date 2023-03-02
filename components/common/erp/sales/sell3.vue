<template>
	<view class="margin-top-xs cu-list card-menu">
		<view class="bg-white arrow margin-bottom-xs padding-lr-sm padding-tb-lg radius-4"  v-for="(item,index) in list_data" :key="index"  @tap="listTap(item.id)">
			<view class="margin-bottom-sm">
				<view class="text-red text-lg text-bold">{{item.name}}</view>
			</view>
			<view class="flex flex-wrap">
				<view class="basis-xs radius">
					<view class="goodsimg"
						:style="[{backgroundImage:'url('+item.image+')'}]"></view>
				</view>
				<view class="basis-xl">
					<view class="text-deepblue text-bold">
						<!-- <view>数量:<text>1</text></view> -->
						<view class="grid col-2">
							<view class="">商品数:<text>1</text></view>
							<view class="">销售均价:<text>{{item.money}}</text>元</view>
						</view>
						<view class="grid col-2">
							<view class="">销售额:<text>{{item.sales_price}}</text>元</view>
							<view class="">成本:<text>{{item.cost_price}}</text>元</view>
						</view>
						<view class="grid col-2">
							
							<view class="">毛利:<text>{{item.lirun}}</text>元</view>
							<view class="">毛利润:<text>{{item.lilv}}</text></view>
						</view>
					</view>
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'sell3',
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
		width:120rpx;
		height:120rpx;
		background-size: 100% 100%;
	}
</style>
