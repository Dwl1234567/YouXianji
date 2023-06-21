<template>
	<view class="" style="padding: 20rpx;">
		<view class="group_2 flex-col" v-for="item in dataList" @tap="goDetail(item)">
			<view class="text-wrapper_2 flex-row justify-between" v-if="item.createTime">
				<text class="text_8">时间:{{item.createTime}}</text>
			</view>
			<view class="group_3 flex-row justify-between">
				<view class="image-text_1 flex-row">
					<view class="box_2 flex-col">
						<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
					</view>
					<view class="text-group_1 flex-col">
						<text class="text_9">{{item.modelName}}</text>
						<text class="text_10">{{item.label}}</text>
						<text class="text_10">{{item.basePriceLabel}}</text>
						<text class="text_11">序列号:{{item.deviceNo}}</text>
						<text class="text_11">成本价:{{item.costPrice}}</text>
						<text class="text_12" v-if="item.recycleGuidePrice">预估回收价:{{item.recycleGuidePrice}}元</text>
					</view>
					<view class="tag_1 flex-col"></view>
				</view>

				<view class="group_4 flex-col">
					<button class="tag_2 flex-col" v-if="item.nodeName">
						<text class="text_14">{{item.nodeName}}</text>
					</button>
					<!-- <button class="tag_2 flex-col" v-if="item.postType == 0">
						<text class="text_14">顺丰上门</text>
					</button>
					<view class="button_1 flex-col" v-if="item.postType == 1">
						<text class="text_13">自行邮寄</text>
					</view>
					<view class="tag_3 flex-col" v-if="item.postType == 2">
						<text class="text_15">同城上门</text>
					</view> -->
				</view>
			</view>
			<text class="text_13" v-if="item.recyclePrice">回收价:{{item.recyclePrice}}元</text>
			<text class="text_13" v-if="item.recyclePeople">回收人:{{item.recyclePeople}}</text>
			<text class="text_13" v-if="item.sellPrice">销售价：{{item.sellPrice}}元</text>
			<text class="text_13" v-if="item.sellPeople">销售人：{{item.sellPeople}}</text>
			<text class="text_13" v-if="item.operationCenterName">运营中心：{{item.operationCenterName}}元</text>
			<text class="text_13" v-if="item.logisticsNo">物流单号：{{item.logisticsNo}}元</text>
			<text class="text_13" v-if="item.sortingPeople">分拣人：{{item.sortingPeople}}元</text>
			<text class="text_13" v-if="item.undersellChannel">销售渠道：{{item.undersellChannel}}元</text>
			<text class="text_13" v-if="item.undersellPrice">销售价格：{{item.undersellPrice}}元</text>
			<text class="text_13" v-if="item.maintainChannel">维修渠道：{{item.maintainChannel}}元</text>
			<text class="text_13" v-if="item.maintainPrice">维修价格：{{item.maintainPrice}}元</text>
			<text class="text_13" v-if="item.maintainContext">维修内容：{{item.maintainContext}}元</text>
			<text class="text_13" v-if="item.oldRecyclePrice">旧回收价格：{{item.oldRecyclePrice}}元</text>
			<text class="text_13" v-if="item.oldAllotPrice">旧调拨价：{{item.oldAllotPrice}}元</text>
			<text class="text_13" v-if="item.oldSellPrice">旧销售价：{{item.oldSellPrice}}元</text>
			<text class="text_13" v-if="item.newAllotPrice">新回收价格：{{item.newAllotPrice}}元</text>
			<text class="text_13" v-if="item.newAllotPrice">新调拨价：{{item.newAllotPrice}}元</text>
			<text class="text_13" v-if="item.newSellPrice">新销售价：{{item.newSellPrice}}元</text>
			<text class="text_13" v-if="item.sellPeople">销售人：{{item.sellPeople}}元</text>
			<text class="text_13" v-if="item.returnPrice">退款价：{{item.returnPrice}}元</text>
			<view class="group_5 flex-row justify-between" v-if="isSn == 1">
				<button class="button_3 flex-col" @tap.stop="goSn(item)">
					<text class="text_17">串码追踪</text>
				</button>
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
			},
			isSn: {
				type: Number,
				default: () => {
					return 0
				}
			}
		},
		methods: {
			goDetail(e) {
				this.$emit('goDetail', e)
			},
			goSn(e) {
				this.$emit('goSn', e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './common.css';
	@import './index.rpx.css';
</style>