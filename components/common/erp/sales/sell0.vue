<template>
	
	<view class="margin-top-xs cu-list card-menu">
		<view class="bg-white arrow margin-bottom-xs padding-tb-xs radius-4" v-for="(item,index) in list_data" :key="index">
			<view class="padding-sm flex justify-between text-sm">
				<view>
					<text class="text-bold text-red">{{item.name_0}}</text>
				</view>
				<view>
					<text class="text-deepblue text-bold">单号:</text>
					<text class="text-darkgrey">{{item.code}}</text>
				</view>
				<view>
					<text class="text-deepblue text-bold">时间:</text>
					<text class="text-darkgrey">{{item.createtime}}</text>
				</view>
			</view>
			<view class="margin-top-xs text-sm">
				<view class="flex"  v-for="(item1,index1) in item.goodslist" :key="index1"  @tap="listTap(item1.id)">
					<view class="flex-sub padding-lr-sm radius">
						<view class="goodsimg"
							:style="[{backgroundImage:'url('+item1.image+')'}]"></view>
					</view>
					<view class="flex-treble padding-lr-sm radius" style="padding-top:15px">
						<view class="flex justify-between">
							<view class="text-deepblue text-sm text-bold">{{item1.name}}</view>
							<view class="text-darkgrey">
								<view class="text-red" v-if="item1.channel == 1">新品</view>
								<view class="text-red" v-else>二手</view>
							</view>
						</view>
						<view class="text-xs">
							<view class="flex justify-between">
								<view class="" v-if="item1.sn">序列号:{{item1.sn}}</view>
							</view>
							
							<view class="grid col-3">
								<!-- <view class="">回收:<text class="text-red">100</text></view>
								<view class="">整备:<text class="text-red">100</text></view> -->
								<view class="">销售:<text class="text-red">{{item1.sales_price}}</text></view>
								<view class="">成本:<text class="text-red">{{item.cost_price}}</text></view>
							</view>
							<view class="grid col-3">
								<!-- <view class="">毛利:<text class="text-red">{{item1.}}</text></view> -->
								
							</view>
						
						</view>
					</view>
				</view>
			</view>
			<view class="padding-lr-sm margin-top-sm">
				<view class="grid col-3">
					
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">客户:</text>
						<text class="">{{item.username}}</text>
					</view>
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">销售员:</text>
						<text class="">{{item.name}}</text>
					</view>
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">回收人:</text>
						<text class="">{{item.recycle_name}}</text>
					</view>
				</view>
				
				<view class="grid col-3">
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">成本:</text>
						<text class="">{{item.cost_price}}元</text>
					</view>
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">实收:</text>
						<text class="">{{item.money}}元</text>
					</view>
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">毛利:</text>
						<text class="">{{item.maoli}}元</text>
					</view>
				</view>
				<!-- <view class="grid col-3">
					<view class="padding-bottom-xs">
						<text class="text-deepblue text-bold">分拣:</text>
						<text class="">100.00元</text>
					</view>
				</view> -->
				<view class="padding-bottom-sm">
					<text class="text-darkgrey">备注:</text>
					<text class="text-lightgrey">{{item.remark}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'sell0',
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
