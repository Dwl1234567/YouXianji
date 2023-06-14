<template>
	<view class="my-box">
		<bar-title bgColor="bg-white" adress="/pages/tabbar/my">
			<block slot="content">我卖出的</block>
			<block slot="right"></block>
		</bar-title>
		<view class="view-content">
			<!--订单tab-->
			<view class="bg-white nav-tab-view">
				<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="tab_scroll">
					<block v-for="(item,index) in nav_list" :key="index">
						<view class="cu-item" :class="index == tab_cur?'select':''" @tap="tabSelect" :data-id="index">
							<view :class="index == tab_cur?'text-black':''">{{item}}</view>
							<view class="tab-dot bg-red" />
						</view>
					</block>
				</scroll-view>
			</view>
			<!--订单列表-->
			<!-- 质检 -->
			<view class="page flex-col" v-if="tab_cur == 1">
				<view class="box_1 flex-row">
					<view class="box_4 flex-col">
						<view class="list_1 flex-col">
							<view class="list-items_1 flex-col" v-for="(item, index) in receiptList" :key="index">
								<view class="text-wrapper_1 flex-row justify-between">
									<text class="text_3">订单编号 {{item.orderNo}}</text>
									<text class="text_4">时间 {{item.createTime}}</text>
								</view>
								<view class="block_1 flex-row">
									<view class="image-text_1 flex-row">
										<view class="box_5 flex-col">
											<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
										</view>
										<view class="text-group_1 flex-col">
											<text class="text_5">{{item.modelName}}</text>
											<text class="text_6">{{item.deviceLabel}}</text>
											<text class="text_7">序列号：{{item.deviceNo}}</text>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_8"><text>预估回收价: {{item.firstPrice}}</text></text>
												<text class="text_9">
													<view v-if="item.transactionPrice - item.firstPrice > 0">
														加价 {{item.transactionPrice - item.firstPrice}}
													</view>
												</text>
											</view>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_110"><text>回执回收价: {{item.transactionPrice}}</text></text>
												<text class="text_9"></text>
											</view>
										</view>
										<!-- <view class="tag_1 flex-col"></view> -->
										<view class="tag_2 flex-col">
											<text class="text_10">
												{{item.postType == 0 ? '顺丰上门' : item.postType == 1 ? '自行邮寄' : '同城上门'}}
											</text>
										</view>
									</view>
									<!-- <view class="tag_3 flex-col"></view> -->
								</view>
								<view class="block_3 flex-row">
									<button class="button_1 flex-col" @click="onClick_1(item.receiptId)">
										<text class="text_12">查看详情</text>
									</button>
									<button class="button_2 flex-col" @click="onClick_2(item.receiptId)">
										<text class="text_13">拒绝并退回</text>
									</button>
									<button class="button_3 flex-col" @click="onClick_3(item.receiptId)">
										<text class="text_14">同意并打款</text>
									</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 运送 -->
			<view class="page flex-col" v-if="tab_cur == 0">
				<view class="box_1 flex-row">
					<view class="box_4 flex-col">
						<view class="list_1 flex-col">
							<view class="list-items_1 flex-col" v-for="(item, index) in loopData0" :key="index">
								<view class="text-wrapper_1 flex-row justify-between">
									<text class="text_3">订单编号 {{item.orderNo}}</text>
									<text class="text_4">时间 {{item.createTime}}</text>
								</view>
								<view class="block_1 flex-row">
									<view class="image-text_1 flex-row">
										<view class="box_5 flex-col">
											<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
										</view>
										<view class="text-group_1 flex-col">
											<text class="text_5">{{item.modelName}}</text>
											<text class="text_6">{{item.deviceLabel}}</text>
											<text class="text_7">序列号：{{item.deviceNo}}</text>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_8">预估回收价: {{item.firstPrice}}</text>
												<text class="text_9"></text>
											</view>
										</view>
										<!-- <view class="tag_1 flex-col"></view> -->
										<view class="tag_2 flex-col">
											<text class="text_10">
												{{item.postType == 0 ? '顺丰上门' : item.postType == 1 ? '自行邮寄' : '同城上门'}}
											</text>
										</view>
									</view>
									<!-- <view class="tag_3 flex-col"></view> -->
								</view>
								<view class="block_3 flex-row">
									<!-- <button class="button_1 flex-col" @click="onClick_1(item.receiptId)">
										<text class="text_12">查看详情</text>
									</button>
									<button class="button_2 flex-col" @click="onClick_2(item.receiptId)">
										<text class="text_13">拒绝并退回</text>
									</button>
									<button class="button_3 flex-col" @click="onClick_3(item.receiptId)">
										<text class="text_14">同意并打款</text>
									</button> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 结算 -->
			<view class="page flex-col" v-if="tab_cur == 2">
				<view class="box_1 flex-row">
					<view class="box_4 flex-col">
						<view class="list_1 flex-col">
							<view class="list-items_1 flex-col" v-for="(item, index) in jeisuanList" :key="index">
								<view class="text-wrapper_1 flex-row justify-between">
									<text class="text_3">订单编号 {{item.orderNo}}</text>
									<text class="text_4">时间 {{item.createTime}}</text>
								</view>
								<view class="block_1 flex-row">
									<view class="image-text_1 flex-row">
										<view class="box_5 flex-col">
											<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
										</view>
										<view class="text-group_1 flex-col">
											<text class="text_5">{{item.modelName}}</text>
											<text class="text_6">{{item.deviceLabel}}</text>
											<text class="text_7">序列号：{{item.deviceNo}}</text>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_8"><text>预估回收价: {{item.firstPrice}}</text></text>
												<text class="text_9">
													<view v-if="item.transactionPrice - item.firstPrice > 0">
														加价 {{item.transactionPrice - item.firstPrice}}
													</view>
												</text>
											</view>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_110"><text>回执回收价: {{item.transactionPrice}}</text></text>
												<text class="text_9"></text>
											</view>
										</view>
										<!-- <view class="tag_1 flex-col"></view> -->
										<view class="tag_2 flex-col">
											<text class="text_10">
												{{item.postType == 0 ? '顺丰上门' : item.postType == 1 ? '自行邮寄' : '同城上门'}}
											</text>
										</view>
									</view>
									<!-- <view class="tag_3 flex-col"></view> -->
								</view>
								<!-- <view class="block_2 flex-row">
									<text class="text_11" v-html="">回收价{{item.transactionPrice}}</text>
									<view class="tag_4 flex-col"></view>
								</view> -->
								<view class="block_3 flex-row" style="justify-content: flex-end">
									<button class="button_1 flex-col">
										<text class="text_12">代付款</text>
									</button>
									<!-- <button class="button_2 flex-col" @click="onClick_2(item.receiptId)">
										<text class="text_13">拒绝并退回</text>
									</button>
									<button class="button_3 flex-col" @click="onClick_3(item.receiptId)">
										<text class="text_14">同意并打款</text>
									</button> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 退货 -->
			<view class="page flex-col" v-if="tab_cur == 3">
				<view class="box_1 flex-row">
					<view class="box_4 flex-col">
						<view class="list_1 flex-col">
							<view class="list-items_1 flex-col" v-for="(item, index) in tuihuoList" :key="index">
								<view class="text-wrapper_1 flex-row justify-between">
									<text class="text_3">订单编号 {{item.orderNo}}</text>
									<text class="text_4">时间 {{item.createTime}}</text>
								</view>
								<view class="block_1 flex-row">
									<view class="image-text_1 flex-row">
										<view class="box_5 flex-col">
											<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
										</view>
										<view class="text-group_1 flex-col">
											<text class="text_5">{{item.modelName}}</text>
											<text class="text_6">{{item.deviceLabel}}</text>
											<text class="text_7">序列号：{{item.deviceNo}}</text>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_8"><text>预估回收价: {{item.firstPrice}}</text></text>
												<text class="text_9">
													<view v-if="item.transactionPrice - item.firstPrice > 0">
														加价 {{item.transactionPrice - item.firstPrice}}
													</view>
												</text>
											</view>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_110"><text>回执回收价: {{item.transactionPrice}}</text></text>
												<text class="text_9"></text>
											</view>
										</view>
										<!-- <view class="tag_1 flex-col"></view> -->
										<view class="tag_2 flex-col">
											<text class="text_10">
												{{item.postType == 0 ? '顺丰上门' : item.postType == 1 ? '自行邮寄' : '同城上门'}}
											</text>
										</view>
									</view>
									<!-- <view class="tag_3 flex-col"></view> -->
								</view>
								<!-- <view class="block_2 flex-row">
									<text class="text_11" v-html="">回收价{{item.receiptPrice}}</text>
									<view class="tag_4 flex-col"></view>
								</view> -->
								<view class="block_3 flex-row" style="justify-content: flex-end">

									<button class="button_1 flex-col">
										<text class="text_12">查看物流</text>
									</button>
									<button class="button_1 flex-col" @tap="okShou(item)">
										<text class="text_12">确认收货</text>
									</button>
									<!-- <button class="button_2 flex-col" @click="onClick_2(item.receiptId)">
										<text class="text_13">拒绝并退回</text>
									</button>
									<button class="button_3 flex-col" @click="onClick_3(item.receiptId)">
										<text class="text_14">同意并打款</text>
									</button> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 退货 -->
			<view class="page flex-col" v-if="tab_cur == 4">
				<view class="box_1 flex-row">
					<view class="box_4 flex-col">
						<view class="list_1 flex-col">
							<view class="list-items_1 flex-col" v-for="(item, index) in pingjiaList" :key="index">
								<view class="text-wrapper_1 flex-row justify-between">
									<text class="text_3">订单编号 {{item.orderNo}}</text>
									<text class="text_4">时间 {{item.createTime}}</text>
								</view>
								<view class="block_1 flex-row">
									<view class="image-text_1 flex-row">
										<view class="box_5 flex-col">
											<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
										</view>
										<view class="text-group_1 flex-col">
											<text class="text_5">{{item.modelName}}</text>
											<text class="text_6">{{item.deviceLabel}}</text>
											<text class="text_7">序列号：{{item.deviceNo}}</text>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_8"><text>预估回收价: {{item.firstPrice}}</text></text>
												<text class="text_9">
													<view v-if="item.transactionPrice - item.firstPrice > 0">
														加价 {{item.transactionPrice - item.firstPrice}}
													</view>
												</text>
											</view>
											<view class="text-wrapper_2 flex-row justify-between">
												<text class="text_110"><text>回执回收价: {{item.transactionPrice}}</text></text>
												<text class="text_9"></text>
											</view>
										</view>
										<!-- <view class="tag_1 flex-col"></view> -->
										<view class="tag_2 flex-col">
											<text class="text_10">
												{{item.postType == 0 ? '顺丰上门' : item.postType == 1 ? '自行邮寄' : '同城上门'}}
											</text>
										</view>
									</view>
									<!-- <view class="tag_3 flex-col"></view> -->
								</view>
								<!-- <view class="block_2 flex-row">
									<text class="text_11" v-html="">回收价{{item.receiptPrice}}</text>
									<view class="tag_4 flex-col"></view>
								</view> -->
								<view class="block_3 flex-row" style="justify-content: flex-end">
									<button class="button_1 flex-col">
										<text class="text_12">查看物流</text>
									</button>
									<!-- <button class="button_1 flex-col">
										<text class="text_12">退回中</text>
									</button> -->
									<!-- <button class="button_2 flex-col" @click="onClick_2(item.receiptId)">
										<text class="text_13">拒绝并退回</text>
									</button>
									<button class="button_3 flex-col" @click="onClick_3(item.receiptId)">
										<text class="text_14">同意并打款</text>
									</button> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--占位底部距离-->
		<!-- <view class="cu-tabbar-height"></view> -->
		<!--用户手机号-->
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _order_data from '@/static/data/order_list.js'; //虚拟数据
	import {
		selectRecycleOrderList,
		selectReceiptList,
		refuseReceipt,
		agreeReceipt,
		selectRecycleOrderSellList,
		confirmReturnReceive
	} from '@/api/commons.js';
	export default {
		name: 'my',
		components: {
			barTitle,
		},
		data() {
			return {
				jeisuanList: [],
				tuihuoList: [],
				receiptList: [],
				pingjiaList: [],
				loopData0: [],
				nav_list: [],
				tab_cur: 0,
				tab_scroll: 0,
				order_list: [],
				userInfo: '',
				wxcode: '',
				sweixin: '',
				realstatus: '0',
				pageIndex: 1,
				pageLimit: 10,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
			};
		},
		// 下拉刷新
		onPullDownRefresh() {
			let that = this;
			let ordertype = '';
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
			// if (this.loadStatus[this.tab_cur] != 'noMore') {
			// 	this.loadStatus.splice(this.tab_cur, 1, 'loading');
			// 	this.getOrderListFuc(this.tab_cur);
			// }
		},
		onLoad(options) {
			let that = this;
			if (options.type) {
				this.tab_cur = Number(options.type);
			}
			// this.order_list = _order_data.orderListData();
			this.nav_list = ['发货', '质检', '结算', '退货', '待评价'];
			// that.getOrderListFuc(0);
			// 获取订单信息
			this.selectRecycleOrderList();
			this.selectReceiptList();
			this.selectRecycleOrderSellList();
			this.selectRecycleOrderSellList4();
			this.selectRecycleOrderSellList5()
		},
		onShow() {},
		methods: {
			// 确认收货
			okShou(item) {
				console.log(item)
				confirmReturnReceive(item.orderId).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '收货成功'
						})
						this.selectRecycleOrderSellList4()
					}
				})
			},
			// 同意并打款
			onClick_3(receiptId) {
				agreeReceipt(receiptId).then((res) => {
					if (res.code == 200) {
						this.selectReceiptList();
					}
				});
			},
			// 拒绝并退回
			onClick_2(receiptId) {
				refuseReceipt(receiptId).then((res) => {
					if (res.code == 200) {
						this.selectReceiptList();
					}
				});
			},
			// 查看详情
			onClick_1(receiptId) {
				uni.navigateTo({
					url: '/pages/order/comparisonChart/comparisonChart?receiptId=' + receiptId,
				});
			},
			// 获取运输列表订单
			selectRecycleOrderList() {
				selectRecycleOrderSellList({
					orderStatusList: ['0'],
				}).then((res) => {
					if (res.code === 200) {
						this.loopData0 = res.rows;
					}
				});
			},
			// 获取质检列表订单
			selectReceiptList() {
				selectRecycleOrderSellList({
					orderStatusList: ['1'],
				}).then((res) => {
					if (res.code === 200) {
						this.receiptList = res.rows;
					}
				});
			},
			// 结算列表
			selectRecycleOrderSellList() {
				selectRecycleOrderSellList({
					orderStatusList: ['2'],
				}).then((res) => {
					if (res.code === 200) {
						this.jeisuanList = res.rows;
					}
				});
			},
			// 退货
			selectRecycleOrderSellList4() {
				const data = {
					orderStatusList: ['4', '5'],
				};
				console.log(data);
				selectRecycleOrderSellList(data).then((res) => {
					if (res.code === 200) {
						this.tuihuoList = res.rows;
					}
				});
			},
			// 待评价
			selectRecycleOrderSellList5() {
				const data = {
					orderStatusList: ['3', '6', '7'],
				};
				console.log(data);
				selectRecycleOrderSellList(data).then((res) => {
					if (res.code === 200) {
						this.pingjiaList = res.rows;
					}
				});
			},
			// 页面数据加入
			// getDataList(idx, data) {
			// 	let that = this;
			// 	data.map((val) => {
			// 		val['itemId'] = this.$u.guid();
			// 		that.dataList[idx].list.push(val);
			// 	});
			// 	// console.log(that.dataList);
			// },
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				this.tab_scroll = (index - 1) * 60;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0,
				});
				// this.dataList[this.tab_cur].pageindex = 1;
				// this.dataList[this.tab_cur].list = [];
				// this.getOrderListFuc(index);
			},
			detailsTap(e) {
				let order_id = e.currentTarget.dataset.id;
				// console.log(order_id);
				uni.navigateTo({
					url: '/pages/order/recycle/details?orderId=' + order_id,
				});
			},
			whereaboutsTap(e) {
				let order_id = e.currentTarget.dataset.id;
				// console.log(order_id);
				uni.navigateTo({
					url: '/pages/mycenter/whereabouts?orderId=' + order_id,
				});
			},
			//通用跳转
			baseTap(url) {
				uni.navigateTo({
					url: url,
				});
			},
			// 订单系列操作方法
			// 取消订单
			cannelorder(id) {},
			// 联系客服
			callKefu() {
				// this.openQyKefu();
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			},
			// 去发货
			sendgoods(id) {
				let that = this;
				uni.navigateTo({
					url: '../recycling/go-delivery?orderId=' + id,
				});
			},
			// 物流信息
			openlogisticsview(id) {
				uni.navigateTo({
					url: 'logistics/logisticsview?id=' + id,
				});
			},
			// 质检报告
			goreport(id) {},
			// 催付款
			urgePayment(id) {},
			// 确认收款
			confirmoney(id) {},
			// 删除订单
			deleteorder(id) {},
		},
	};
</script>

<style lang="scss" scoped>
	@import './common.css';
	@import './index.rpx.css';

	.my-box {
		width: 100%;

		.view-content {
			.user-info-order-box {
				border-radius: 18.18rpx;

				.cu-list.grid.no-border {
					padding: 0;
				}

				.cu-list.grid.no-border>.cu-item {
					padding-bottom: 9.09rpx;
				}
			}

			.cu-list.grid>.cu-item text {
				color: inherit;
			}
		}
	}

	page {
		background-color: rgba(240, 240, 240, 1);
	}

	.my-box.show {
		display: block;
	}

	.cu-btn.sm {
		padding: 0 11.9rpx;
	}

	.img-view {
		text-align: center;
	}
</style>