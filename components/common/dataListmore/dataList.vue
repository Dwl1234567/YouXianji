<template>
	<view>
		<view class="group_2 flex-col" v-for="item in dataList">
			<view class="text-wrapper_1 flex-row justify-between">
				<text class="text_7">时间:{{item.createTime}}</text>
			</view>
			<view class="section_1 flex-row" v-for="items in item.returnRegistrationItemList">
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
			<!-- <text class="text_13" v-if="item.recyclePeopleName">回收人：{{item.recyclePeopleName}}</text> -->
			<!-- <text class="text_13" v-if="item.sortingPeopleName">分拣人：{{item.sortingPeopleName}}</text> -->
			<!-- <text class="text_13" v-if="item.storeName">门店名称：{{item.storeName}}</text> -->
			<!-- <text class="text_13" v-if="item.undersellApprove.channel">抛售渠道：{{item.undersellApprove.channel}}</text> -->
			<!-- <text class="text_13" v-if="item.undersellApprove.undersellPrice">
				抛售预估价：{{item.undersellApprove.undersellPrice}}
			</text> -->
			<!-- <text class="text_13" v-if="item.maintainApprove.channel">维修渠道：{{item.maintainApprove.channel}}</text> -->
			<!-- <text class="text_13" v-if="item.maintainApprove.maintainPrice">
				维修价：{{item.maintainApprove.maintainPrice}}
			</text> -->
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