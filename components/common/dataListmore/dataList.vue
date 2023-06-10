<template>
	<view>
		<view class="group_2 flex-col" v-for="item in dataList">
			<view class="text-wrapper_1 flex-row justify-between">
				<text class="text_7">时间:{{item.updateTime}}</text>
			</view>
			<view class="section_1 flex-row">
				<view class=""></view>
				<image :src="$httpImage + item.modelPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
				</image>
				<view class="text-wrapper_2 flex-col">
					<text class="text_8">{{item.modelName}}</text>
					<text class="text_9">{{item.label}}</text>
					<text class="text_10">序列号:{{item.deviceNo}}</text>
					<text class="text_11">回收价:{{item.recyclePrice}}元</text>
				</view>
				<view class="tag_1 flex-col" v-if="item.sortStatus == 0">
					<text class="text_12">待送拣</text>
				</view>
				<view class="tag_33 flex-col" v-if="item.sortStatus == 1 && roles.sorting_leader">
					<text class="text_33">待分配</text>
				</view>
				<view class="tag_44 flex-col" v-if="(item.sortStatus == 2 || item.sortStatus == 1) && roles.store_admin">
					<text class="text_44">已送检</text>
				</view>
				<view class="tag_44 flex-col" v-if="item.sortStatus == 2 && (roles.sorting_people || roles.sorting_leader)">
					<text class="text_44">待分拣</text>
				</view>
				<view class="tag_44 flex-col" v-if="item.sortStatus == 2 && roles.sorting_leader && !roles.sorting_people">
					<text class="text_44">已分配</text>
				</view>

				<view class="tag_55 flex-col" v-if="item.sortStatus == 3 && roles.store_admin">
					<text class="text_55">待取回</text>
				</view>
				<view class="tag_55 flex-col" v-if="item.sortStatus == 3 && (roles.sorting_people || roles.sorting_leader)">
					<text class="text_55">已寄出</text>
				</view>
				<view class="tag_66 flex-col" v-if="item.sortStatus == 4 && roles.store_admin">
					<text class="text_66">已取回</text>
				</view>
				<view class="tag_66 flex-col" v-if="item.sortStatus == 4 && (roles.sorting_people || roles.sorting_leader)">
					<text class="text_66">已送达</text>
				</view>
				<view class="tag_77 flex-col"
					v-if="item.sortStatus == 5 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)">
					<text class="text_77">待抛售</text>
				</view>
				<view class="tag_77 flex-col"
					v-if="item.sortStatus == 6 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)">
					<text class="text_77">抛售中</text>
				</view>
				<view class="tag_77 flex-col"
					v-if="item.sortStatus == 7 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)">
					<text class="text_77">已抛售</text>
				</view>
				<view class="tag_88 flex-col"
					v-if="item.sortStatus == 8 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)">
					<text class="text_88">待维修</text>
				</view>
				<view class="tag_88 flex-col"
					v-if="item.sortStatus == 9 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)">
					<text class="text_88">维修中</text>
				</view>
				<view class="tag_88 flex-col"
					v-if="item.sortStatus == 10 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)">
					<text class="text_88">维修完成</text>
				</view>
				<view class="tag_88 flex-col"
					v-if="item.sortStatus == 11 && (roles.sorting_people || roles.sorting_leader || roles.store_admin)">
					<text class="text_88">维修失败</text>
				</view>
			</view>
			<text class="text_13" v-if="item.recyclePeopleName">回收人：{{item.recyclePeopleName}}</text>
			<text class="text_13" v-if="item.sortingPeopleName">分拣人：{{item.sortingPeopleName}}</text>
			<text class="text_13" v-if="item.storeName">门店名称：{{item.storeName}}</text>
			<text class="text_13" v-if="item.undersellApprove.channel">抛售渠道：{{item.undersellApprove.channel}}</text>
			<text class="text_13" v-if="item.undersellApprove.undersellPrice">
				抛售预估价：{{item.undersellApprove.undersellPrice}}
			</text>
			<text class="text_13" v-if="item.maintainApprove.channel">维修渠道：{{item.maintainApprove.channel}}</text>
			<text class="text_13" v-if="item.maintainApprove.maintainPrice">
				维修价：{{item.maintainApprove.maintainPrice}}
			</text>
			<text class="text_13" v-if="item.maintainApprove.context">维修内容：{{item.maintainApprove.context}}</text>
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