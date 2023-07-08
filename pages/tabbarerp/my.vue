<template>
	<view class="my-box">
		<image src="../../static/beifen.png" mode="" class="background"></image>
		<view class="head-box" style="padding: 0 13px 50px;">
			<!--标题栏-->
			<!--小程序端不显示-->
			<!-- #ifndef MP -->
			<bar-title :isBack="false" :fixed="false" bgColor="bg-2222">
				<!-- <block slot="right">
					<text class="cuIcon-settings" @tap="setupTap"/>
				</block> -->
				<block slot="right">
					<button class="cu-btn sm bg-white" @tap="goToShop">
						<text class="cuIcon-forwardfill margin-right-xs"></text>
						用户模式
					</button>
				</block>
			</bar-title>

			<!-- #endif -->

			<!--用户信息-->
			<view class="user-info-box">
				<!--已登陆-->
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<image :src="$httpImage + storeInfo.avatar" class="cu-avatar round lg"></image>
						<!-- <view class="cu-avatar round lg" style="background-image: url(/static/images/avatar/1.jpg)" /> -->
						<view class="content text-xl">
							<view class="text-white">
								<text class="margin-right">{{storeInfo.nickName}}</text>
							</view>
							<view class="text-white-bg text-sm">
								<text class="text-border-x">{{storeInfo.storename}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="view-content">
			<!--用户数据-->
			<view class="padding-xs bg-white user-info-order-box">
				<view class="text-black text-lg text-bold padding-top-xl"></view>
				<view class="cu-title" style="padding-left: 22rpx;">
					商城代办
				</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item" @tap="payment">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>代付款</text>
					</view>
					<view class="cu-item" @tap="delivery">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>代发货</text>
					</view>
					<view class="cu-item" @tap="receipt">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>代收货</text>
					</view>
					<view class="cu-item" @tap="refund">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>退款/售后</text>
					</view>
				</view>
				<view class="cu-title" style="padding-left: 22rpx;margin-top: 18rpx">
					回收待办
				</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item" @tap="goRecycleList(1)">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>待处理</text>
					</view>
					<view class="cu-item" @tap="goRecycleList(2)">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>已处理</text>
					</view>
					<view class="cu-item" @tap="goRecycleList(3)">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>待退回</text>
					</view>
					<view class="cu-item" @tap="goRecycleList(4)">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>已退回</text>
					</view>
				</view>
				<view class="cu-title" style="padding-left: 22rpx;margin-top: 18rpx">
					门店待办
				</view>
				<view class="cu-list grid col-5 no-border">
					<view class="cu-item" @tap="taskPriceTap">
						<view class="iconfont icon-cashorange text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>待调价</text>
					</view>
					<view class="cu-item" @tap="transferlistTap">
						<view class="iconfont icon-myselect text-red">
							<view class="cu-tag badge" v-if="loginfo.transnum!=0">{{loginfo.transnum || 0}}</view>
						</view>
						<text>待调拨</text>
					</view>
					<view class="cu-item" @tap="shenheTap">
						<view class="iconfont icon-checktouploadorange text-red">
							<view class="cu-tag badge" v-if="loginfo.shenhenum!=0">{{loginfo.shenhenum || 2}}</view>
						</view>
						<text>审上架</text>
					</view>
					<view class="cu-item" @tap="qualityTaskTap">
						<view class="iconfont icon-selectandcheck text-red">
							<view class="cu-tag badge" v-if="loginfo.qualitynum!=0">{{loginfo.qualitynum || 0}}</view>
						</view>
						<text>待分拣</text>
					</view>
					<view class="cu-item" @tap="taskattrPriceTap">
						<view class="iconfont icon-recyclepricecheck text-red">
							<view class="cu-tag badge" v-if="loginfo.qualitynum!=0">{{loginfo.qualitynum || 0}}</view>
						</view>
						<text>审收价</text>
					</view>
					<view class="cu-item" @tap="attrPriceTap">
						<view class="iconfont icon-tubiao-64 text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>改收价</text>
					</view>
					<!-- <view class="cu-item" @tap="localTap">
						<view class="iconfont icon-tubiao-64 text-red">
							<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
						</view>
						<text>待上门</text>
					</view> -->
				</view>
			</view>

			<!--推荐工具-->
			<view class="cu-list menu sm-border margin-top">
				<view class="cu-item arrow" @tap="useryejiTap">
					<view class="content">我的业绩</view>
				</view>
				<view class="cu-item arrow" @tap="mywages">
					<view class="content">我的工资</view>
				</view>
				<view class="cu-item arrow" @tap="userrecycleTap">
					<view class="content">我的回收</view>
				</view>
				<view class="cu-item arrow" @tap="usersellTap">
					<view class="content">我的销售</view>
				</view>
				<view class="cu-item arrow" @tap="kefujdTap">
					<view class="content">我的接待</view>
				</view>
			</view>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height"></view>
		<!--切换工作台-->
		<!--<view class="add-btn-view-box" @tap="goToShop">
			<button class="cu-btn cuIcon-shake bg-red"></button>
		</view>-->
		<!--底部导航-->
		<footer-tabbar :tabID="4" :msgDot="true" />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';
	import barTitle from '@/components/common/basics/bar-title';
	import {
		erpuserbacklog
	} from '@/api/erpapi.js';
	import {
		getKefuUserList
	} from '@/api/user.js';
	import _my_data from '@/static/data/my.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		name: 'my',
		components: {
			barTitle,
			footerTabbar,
		},
		data() {
			return {
				login: false,
				storeInfo: {},
				loginfo: '',
			};
		},
		onLoad() {
			//加载虚拟数据
			this.toolsList = _my_data.toolsListData();
			this.storeInfo = uni.getStorageSync('userinfo');
			console.log(this.storeInfo)
		},
		onShow() {
			// this.erpuserbacklogFuc();
		},
		methods: {
			// 回收
			goRecycleList(e) {
				uni.navigateTo({
					url: '/pages/erp/recycleList/index?type=' + e,
				});
			},
			// 获取待办数据
			erpuserbacklogFuc() {
				erpuserbacklog({}).then((res) => {
					this.loginfo = res.data;
				});
			},
			// 代付款
			payment() {
				uni.navigateTo({
					url: '/pages/erp/commodity/payment',
				});
			},
			// 代发货
			delivery() {
				uni.navigateTo({
					url: '/pages/erp/commodity/delivery',
				});
			},
			// 代收货
			receipt() {
				uni.navigateTo({
					url: '/pages/erp/commodity/receipt',
				});
			},
			// 退款
			refund() {
				uni.navigateTo({
					url: '/pages/erp/commodity/refund',
				});
			},
			// 我的工资
			mywages() {
				uni.navigateTo({
					url: '/pages/erp/user/salary',
				});
				console.log('我的工资');
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			useryejiTap() {
				uni.navigateTo({
					url: '/pages/erp/user/yeji',
				});
			},
			userrecycleTap() {
				uni.navigateTo({
					url: '/pages/erp/user/recyclelist',
				});
			},
			usersellTap() {
				uni.navigateTo({
					url: '/pages/erp/user/selllist',
				});
			},
			goToShop() {
				uni.switchTab({
					url: '/pages/tabbar/my',
				});
			},
			// 待发货
			fahuoTap() {
				uni.navigateTo({
					url: '/pages/erp/order/list',
				});
			},
			// 预警调价
			taskPriceTap() {
				uni.navigateTo({
					url: '/pages/erp/task/product_list',
				});
			},
			//改收价
			attrPriceTap() {
				uni.navigateTo({
					url: '/pages/erp/user/attrlist',
				});
			},
			//审核收价
			taskattrPriceTap() {
				uni.navigateTo({
					url: '/pages/erp/user/auditlist',
				});
			},
			//待调拨
			transferlistTap() {
				uni.navigateTo({
					url: '/pages/erp/stores/transferlist',
				});
			},
			//待付款
			financeTap() {
				uni.navigateTo({
					url: '/pages/erp/finance/fukuan',
				});
			},
			//待审核
			shenheTap() {
				uni.navigateTo({
					url: '/pages/erp/purchase/shangjia',
					//url: "/pages/erp/purchase/list?status=0"
				});
			},
			//待分拣
			qualityTaskTap() {
				uni.navigateTo({
					url: '/pages/erp/task/quality',
				});
			},
			//待上门
			localTap() {
				uni.navigateTo({
					url: '/pages/erp/purchase/tasklocal',
				});
			},
			//我的接待
			kefujdTap() {
				uni.navigateTo({
					url: '/pages/erp/stores/kefurece',
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.background {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0px;
		left: 0px;
	}

	.cu-title {
		color: rgba(16, 16, 16, 1);
		font-size: 18px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 25px;
		margin-right: 250px;
	}

	.my-box {
		width: 100%;

		// display: none;
		.head-box {
			padding-top: 0;
			padding-bottom: 72.72rpx;

			.user-info-box {
				/* #ifdef MP */
				padding-top: calc(var(--status-bar-height) + 50rpx);

				/* #endif */
				.login-user-view {
					position: relative;
					text-align: center;

					.login-user-avatar-view {
						position: relative;
						margin-bottom: 18.18rpx;
					}
				}

				.cu-list.menu-avatar>.cu-item {
					background-color: inherit;

					.content {
						width: calc(100% - 94.54rpx - 59.99rpx - 20rpx);

						.text-white-bg {
							color: #e8e8e8;

							.text-border-x {
								margin-right: 25.45rpx;
								position: relative;

								&:after {
									position: absolute;
									background: #dddddd;
									top: 5.45rpx;
									width: 1.81rpx;
									right: -12.72rpx;
									height: 16.36rpx;
									content: ' ';
								}
							}
						}
					}

					&:after {
						width: 0;
						height: 0;
						border-bottom: 0;
					}
				}

				.cu-list.menu-avatar>.cu-item .content>view:first-child {
					font-size: 34.54rpx;
				}
			}

			.user-info-num-box {
				.cu-list.grid.no-border {
					padding: 0;
				}

				.cu-list.grid.no-border>.cu-item {
					padding-top: 27.27rpx;
					padding-bottom: 9.09rpx;
				}

				.cu-list.grid {
					background-color: inherit;
				}

				.cu-list.grid>.cu-item text {
					color: #e8e8e8;
					font-size: 20rpx;
					line-height: 27.27rpx;
				}
			}

			.user-info-tip-box {
				position: relative;
				margin: 18.18rpx 27.27rpx;
				border-radius: 9.09rpx;
				padding: 18.18rpx 27.27rpx;
				background: #ea8d8d;
				background-image: linear-gradient(45deg, #f7615f, #f553b3);

				.text-cut {
					padding-right: 45.45rpx;
				}

				.icon {
					position: absolute;
					right: 27.27rpx;
					top: 23.63rpx;
				}
			}
		}

		.view-content {
			padding: 0 27.27rpx 100rpx;
			margin-top: -63.63rpx;

			.user-info-order-box {
				position: relative;
				background-color: white;
				border-radius: 18.18rpx;
				box-shadow: 0px 0px 4px 0px rgba(159, 159, 159, 0.5);

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

			.user-info-money-box {
				border-radius: 18.18rpx;

				.money-col {
					padding: 0 9.09rpx 9.09rpx;

					.money-item {
						position: relative;
						padding: 9.09rpx;

						.money-item-view {
							border: 1.81rpx solid #f3f2f3;
							border-radius: 18.18rpx;
							position: relative;
							padding: 9.09rpx;

							.cu-avatar {
								position: absolute;
								left: 9.09rpx;
							}

							.money-content {
								position: relative;
								margin-left: 109.09rpx;
								margin-bottom: 27.27rpx;
								top: 12.72rpx;
							}
						}
					}
				}
			}

			.user-info-tools-box {
				border-radius: 18.18rpx;

				.tools-view {
					position: relative;

					.tools-title {
						padding-right: 81.81rpx;
					}

					.tools-right {
						position: absolute;
						right: 9.09rpx;
						bottom: 23.63rpx;
					}
				}
			}
		}
	}

	.my-box.show {
		display: block;
	}

	.grid.col-6>uni-view {
		width: 16.666%;
	}
</style>