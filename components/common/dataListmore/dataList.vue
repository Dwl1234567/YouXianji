<template>
	<view>
		<view class="group_2 flex-col" v-for="(item,index) in dataList" :key="index">
			<view class="text-wrapper_1 flex-row justify-between">
				<text class="text_7">时间:{{item.createTime}}</text>
			</view>
			<view class="section_1 flex-row" v-for="(items, index) in item.returnRegistrationItemList" :key="index">
				<view class="" v-if="items.itemType == 0" style="display: flex;">
					<image :src="$httpImage + items.photo" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
					</image>
					<view class="text-wrapper_2 flex-col">
						<text class="text_8">{{items.modelName}}</text>
						<text class="text_9">{{items.basePriceLabel}}</text>
						<text class="text_10">序列号:{{items.deviceNo}}</text>
						<text class="text_11">销售价:{{items.sellPrice}}元</text>
					</view>
				</view>

			</view>
			<text class="text_13" v-if="item.recyclePeopleName">回收人：{{item.recyclePeopleName}}元</text>
			<text class="text_13" v-if="item.sellPeopleName">销售人：{{item.sellPeopleName}}元</text>
			<text class="text_13" v-if="item.returnPrice">退款金额：{{item.returnPrice}}元</text>
		</view>
	</view>

</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'activity-list',
		props: {
			dataList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	@import './common.css';
	@import './index.rpx.css';

	.group_2 {
		padding: 30rpx;
		background: #FFFFFF;
		border-radius: 11rpx;
	}
</style>