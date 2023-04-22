<template>
	<view class="page flex-col">
		<view class="group_1 flex-row">
			<view class="block_1 flex-col">
				<view class="tabs_1 flex-col">
					<view class="text-wrapper_1 flex-row justify-between">
						<text :class="tab === 1 ?'text_3':'text_4'" @tap="checkTab(1)">待处理</text>
						<text :class="tab === 2 ?'text_3':'text_4'" @tap="checkTab(2)">已处理</text>
						<text :class="tab === 3 ?'text_3':'text_4'" @tap="checkTab(3)">待退回</text>
						<text :class="tab === 4 ?'text_3':'text_4'" @tap="checkTab(4)">已退回</text>
					</view>
					<view class="section_1 flex-row">
						<view class="box_1 flex-col"></view>
					</view>
				</view>
			</view>
			<view class="block_3 flex-col">
				<view class="group_2 flex-col" v-for="item in recycleList">
					<view class="text-wrapper_2 flex-row justify-between">
						<text class="text_7">订单编号:{{item.orderNo}}</text>
						<text class="text_8">时间:{{item.createTime}}</text>
					</view>
					<view class="group_3 flex-row justify-between">
						<view class="image-text_1 flex-row">
							<view class="box_2 flex-col"></view>
							<view class="text-group_1 flex-col">
								<text class="text_9">{{item.modelName}}</text>
								<text class="text_10">{{item.deviceLabel}}</text>
								<text class="text_11">序列号:{{item.deviceNo}}</text>
								<text class="text_12">回收预估价:{{item.firstPrice}}元</text>
							</view>
							<view class="tag_1 flex-col"></view>
						</view>
						<view class="group_4 flex-col">
							<button class="button_1 flex-col" v-if="item.postType == 0">
								<text class="text_13">同城上门</text>
							</button>
							<view class="tag_2 flex-col" v-if="item.postType == 1">
								<text class="text_14">顺丰上门</text>
							</view>
							<view class="tag_3 flex-col" v-if="item.postType == 2">
								<text class="text_15">自行邮寄</text>
							</view>
						</view>
					</view>
					<view class="group_5 flex-row justify-between">
						<button class="button_2 flex-col" @click="onClick_2(item)" v-if="!item.receiver">
							<text class="text_16">接入</text>
						</button>
						<button class="button_3 flex-col" @tap="goDetail(item.recycleOrderId)">
							<text class="text_17">查看订单</text>
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { selectRecycleOrderList, empRobRecycleOrder } from '@/api/erp.js';
	export default {
		data() {
			return {
				constants: {},
				tab: 1,
				// 回收订单列表
				recycleList: [],
				queryPage:{
					pageNum:0,
					pageSize: 20
				}
			};
		},
		onLoad() {
			this.selectRecycleOrderList()
		},
		// 触底加载新页面
		onReachBottom(){
			if (this.queryPage.total > this.recycleList.length) {
				this.queryPage.pageNum = this.queryPage.pageNum + 1
				this.selectRecycleOrderList(true);
			}
		},
		methods: {
			// 获取回收订单列表
			selectRecycleOrderList(isReach = false) {
				selectRecycleOrderList(this.queryPage).then(res => {
					if (isReach) {
						this.recycleList = this.recycleList.concat(res.rows)
					} else {
						this.recycleList = res.rows
					}
					
				})
			},
			// 员工抢单
			empRobRecycleOrder(recycleOrderId) {
				empRobRecycleOrder(recycleOrderId).then(res => {
					if (res.code == 200) {
						this.queryPage.total = res.total;
						this.selectRecycleOrderList();
					}
				});
			},
			goDetail(item) {
				uni.navigateTo({
					url: '/pages/erp/recycleList/recycleListDetail/recycleListDetail?recycleOrderId='+ item,
				});
			},
			checkTab(e) {
				this.tab = e;
			},
			onClick_1() {
				alert(1);
			},
			onClick_2(item) {
				this.empRobRecycleOrder(item.recycleOrderId)
			},
			onClick_3() {
				alert(1);
			},
		},
	};
</script>
<style lang="css">
	@import './common.css';
	@import './index.rpx.css';
</style>
