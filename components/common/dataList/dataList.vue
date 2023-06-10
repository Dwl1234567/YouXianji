<template>
	<view class="">
		<view class="group_2 flex-col" v-for="item in dataList">
			<view class="text-wrapper_2 flex-row justify-between">
				<text class="text_7">订单编号:{{item.orderNo}}</text>
				<text class="text_8">时间:{{item.createTime}}</text>
			</view>
			<view class="group_3 flex-row justify-between">
				<view class="image-text_1 flex-row">
					<view class="box_2 flex-col">
						<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
					</view>
					<view class="text-group_1 flex-col">
						<text class="text_9">{{item.modelName}}</text>
						<text class="text_10">{{item.deviceLabel}}</text>
						<text class="text_11">序列号:{{item.deviceNo}}</text>
						<text class="text_12">预估回收价:{{item.firstPrice}}元</text>
					</view>
					<view class="tag_1 flex-col"></view>
				</view>
				<view class="group_4 flex-col">
					<button class="tag_2 flex-col" v-if="item.postType == 0">
						<text class="text_14">顺丰上门</text>
					</button>
					<view class="button_1 flex-col" v-if="item.postType == 1">
						<text class="text_13">自行邮寄</text>
					</view>
					<view class="tag_3 flex-col" v-if="item.postType == 2">
						<text class="text_15">同城上门</text>
					</view>
				</view>
			</view>
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
</style>