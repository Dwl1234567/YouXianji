<template>
	<view class="my-box">
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
			<block v-for="(item,index) in dataList[tab_cur].list" :key="index"
				v-if="dataList[tab_cur].list.length != 0">
				<view class="bg-white order-tab-view">
					<!--订单主信息-->
					<view class="shop-title-view">
						<view class="cu-avatar sm round"
							:style="[{backgroundImage:'url('+ 'https://youxianji.zansuo.com/uploads/recying/goods/nopic.jpg' +')'}]" />
						<view class="text-black text-cut shop-name">{{item.order_number}}</view>
						<text v-if="item.order_status == 0" class="text-right text-gray text-sm">等待报价</text>
						<text v-if="item.order_status == 1" class="text-right text-gray text-sm">等待发货</text>
						<text v-if="item.order_status == 2" class="text-right text-gray text-sm">已发货</text>
						<text v-if="item.order_status == 3" class="text-right text-gray text-sm">等待机器质检</text>
						<text v-if="item.order_status == 4" class="text-right text-gray text-sm">待财务付款</text>
						<text v-if="item.order_status == 5" class="text-right text-gray text-sm">用户待收款</text>
						<text v-if="item.order_status == 6" class="text-right text-gray text-sm">交易完成</text>
						<text v-if="item.order_status == 7" class="text-right text-gray text-sm">交易取消</text>
					</view>
					<view class="shop-info-view">
						<!--商品信息-->
						<view class="goods-list-view" :data-id="item.id">
							<view class="cu-avatar lg radius"
								:style="[{backgroundImage:'url('+ item.goods_image +')'}]" />
							<view class="goods-info-view">
								<view class="text-black text-cut name">{{item.goods_name}}</view>
								<view class="tag-view">
									<block v-for="(item_s,index_s) in item.cart_info" :key="index_s">
										<text class="cu-tag sm line-red radius"
											:class="index_s == 0?'tag_1':''">{{item_s}}</text>
									</block>
								</view>
								<view class="text-price text-red">
									{{item.quoted_price}}
								</view>
							</view>
						</view>

						<!--按钮-->
						<view class="btn-view">
							<block v-if="item.order_status == 0">
								<button class="cu-btn line-black sm radius" @click="cannelorder(item.id)">取消订单</button>
								<button class="cu-btn bg-red sm radius" @click="callKefu()">联系客服</button>
							</block>
							<block v-if="item.order_status == 1">
								<button class="cu-btn line-black sm radius" @click="cannelorder(item.id)">取消订单</button>
								<button class="cu-btn bg-red sm radius" @click="sendgoods(item.id)">去发货</button>
							</block>
							<block v-if="item.order_status == 2">
								<button class="cu-btn line-red sm radius" @click="callKefu()">联系客服</button>
								<button class="cu-btn bg-red sm radius"
									@click="openlogisticsview(item.express_sn)">物流信息</button>
							</block>
							<block v-if="item.order_status == 3">
								<button class="cu-btn bg-red sm radius" @click="callKefu()">联系客服</button>
							</block>
							<block v-if="item.order_status == 4">
								<button class="cu-btn line-black sm radius" @click="goreport(item.id)">质检报告</button>
								<button class="cu-btn bg-red sm radius" @click="urgePayment(item.id)">催付款</button>
								<button class="cu-btn line-red sm radius" @click="callKefu()">联系客服</button>
							</block>
							<block v-if="item.order_status == 5">
								<button class="cu-btn line-black sm radius" @click="goreport(item.id)">质检报告</button>
								<button class="cu-btn line-black sm radius" @click="whereaboutsTap()"
									:data-id="item.id">钱款去向</button>
								<button class="cu-btn bg-red sm radius" @click="confirmoney(item.id)">确认收款</button>
								<button class="cu-btn line-red sm radius" @click="callKefu()">联系客服</button>
							</block>
							<block v-if="item.order_status == 6">
								<!-- <button class="cu-btn line-black sm radius" @click="deleteorder(item.id)">删除订单</button> -->
								<button class="cu-btn bg-red sm radius" @click="callKefu()">联系售后</button>
							</block>
							<block v-if="item.order_status == 7">
								<!-- <button class="cu-btn line-black sm radius" @click="deleteorder(item.id)">删除订单</button> -->
							</block>
							<button class="cu-btn line-red sm radius" @click="detailsTap"
								:data-id="item.id">查看详情</button>
						</view>
						<!--
						<view class="btn-view" v-if="item.type == 1">
							<button class="cu-btn line-black sm radius">删除订单</button>
							<button class="cu-btn line-black sm radius">质检报告</button>
							<button class="cu-btn line-black sm radius" @tap="whereaboutsTap"
								:data-id="item.id">钱款去向</button>
							<button class="cu-btn line-red sm radius" @tap="detailsTap" :data-id="item.id">查看详情</button>
						</view>
						<view class="btn-view" v-if="item.type == 0">
							<button class="cu-btn line-black sm radius">联系卖家</button>
							<button class="cu-btn line-red sm radius" @tap="detailsTap" :data-id="item.id">查看详情</button>
						</view>
						-->
					</view>
				</view>
			</block>

			<!--无数据-->
			<view class="bg-white" style="text-align: center;padding-top: 100rpx;padding-bottom: 100rpx;" v-if="dataList[tab_cur].list.length == 0">
				<view class="img-view">
					<image src="../../../static/emptyCart.jpg" style="width: 200px;" mode="widthFix"></image>
				</view>
				<view class="text-sm margin-top-sm">您还没有相关订单哦</view>
			</view>


			<!--到底了-->
			<view class="order-foot-tip-view" v-if="dataList[tab_cur].list.length != 0">
				<view class="text-gray">hi,到底啦~</view>
			</view>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height"></view>
		<!--用户手机号-->

	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';

	import _order_data from '@/static/data/order_list.js'; //虚拟数据
	import {
		getOrderList
	} from "@/api/common.js";
	export default {
		name: 'my',
		components: {
			barTitle
		},
		data() {
			return {
				nav_list: [],
				tab_cur: 0,
				tab_scroll: 0,
				order_list: [],
				userInfo: '',
				wxcode: '',
				sweixin: '',
				realstatus: '0',
				dataList: [{
					'pageindex': 1,
					'triggered': false,
					'list': []
				}, {
					'pageindex': 1,
					'triggered': false,
					'list': []
				}, {
					'pageindex': 1,
					'triggered': false,
					'list': []
				}, {
					'pageindex': 1,
					'triggered': false,
					'list': []
				}, {
					'pageindex': 1,
					'triggered': false,
					'list': []
				}],
				pageIndex: 1,
				pageLimit: 10,
				loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			let that = this;
			let ordertype = '';
			this.dataList[this.tab_cur].pageindex = 1;
			this.dataList[this.tab_cur].list = [];
			this.getOrderListFuc(this.tab_cur);
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
			console.log(this.loadStatus[this.tab_cur]);
			if (this.loadStatus[this.tab_cur] != 'noMore') {
				this.loadStatus.splice(this.tab_cur, 1, "loading");
				this.getOrderListFuc(this.tab_cur);
			}
		},
		onLoad(options) {
			let that = this;
			if(options.type){
				this.tab_cur = Number(options.type);
			}
			// this.order_list = _order_data.orderListData();
			this.nav_list =['全部','待付款','待发货','待收货','待评价'];
			// that.getOrderListFuc(0);
			// 获取订单信息
			this.dataList[this.tab_cur].pageindex = 1;
			this.dataList[this.tab_cur].list = [];
			this.getOrderListFuc(this.tab_cur);

		},
		onShow() {
			
		},
		methods: {
			// 获取订单信息
			getOrderListFuc(type) {
				let that = this;
				let ordertype = ''
				switch (that.tab_cur) {
					case 0:
						ordertype = 'all';
						break;
					case 1:
						ordertype = 0;
						break;
					case 2:
						ordertype = 1;
						break;
					case 3:
						ordertype = 5;
						break;
					case 4:
						ordertype = 6;
						break;
				}
				let params = {
					'page': that.dataList[type].pageindex,
					'limit': that.pageLimit,
					'order_status': ordertype
				}
				getOrderList(params).then(res => {
						if (res.code == 1) {

							let data = res.data.list;

							if (data.length > 0 && data.length == that.pageLimit) {
								that.dataList[type].pageindex = that.dataList[type].pageindex + 1;
							}
							if (data.length < that.pageLimit) {
								this.loadStatus.splice(type, 1, "noMore")
							} else {
								this.loadStatus.splice(type, 1, "loadmore")
							}
							this.getDataList(type, data);
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			// 页面数据加入
			getDataList(idx, data) {
				let that = this;
				data.map(val => {
					val['itemId'] = this.$u.guid();
					that.dataList[idx].list.push(val);
				})
				// console.log(that.dataList);
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				this.tab_scroll = (index - 1) * 60;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.dataList[this.tab_cur].pageindex = 1;
				this.dataList[this.tab_cur].list = [];
				this.getOrderListFuc(index);
			},
			detailsTap(e) {
				let order_id = e.currentTarget.dataset.id;
				// console.log(order_id);
				uni.navigateTo({
					url: '/pages/order/recycle/details?orderId=' + order_id
				});
			},
			whereaboutsTap(e) {
				let order_id = e.currentTarget.dataset.id;
				// console.log(order_id);
				uni.navigateTo({
					url: '/pages/mycenter/whereabouts?orderId=' + order_id
				});
			},
			//通用跳转
			baseTap(url) {
				uni.navigateTo({
					url: url
				});
			},
			// 订单系列操作方法
			// 取消订单
			cannelorder(id) {
				
			},
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
					url: '../recycling/go-delivery?orderId=' + id
				})
			},
			// 物流信息
			openlogisticsview(id) {
				uni.navigateTo({
					url: 'logistics/logisticsview?id=' + id
				})
			},
			// 质检报告
			goreport(id) {

			},
			// 催付款
			urgePayment(id) {
				
			},
			// 确认收款
			confirmoney(id) {
				
			},
			// 删除订单
			deleteorder(id) {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
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

	.my-box.show {
		display: block;
	}

	.cu-btn.sm {
		padding: 0 11.9rpx;
	}
	.img-view{
		text-align: center;
	}
</style>
