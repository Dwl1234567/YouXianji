<template>
	<view class="my-box">
		<!-- #ifdef APP-PLUS -->
		<!-- <view class="status_bar">  
		        <view class="top_view">123</view>  
		    </view>  -->
		<!-- #endif -->
		<view
			class="background"
			style="width:100vw;290px; background-image:radial-gradient(circle at 50% -26%, rgba(37,209,249,0.66) 0%, rgba(255,255,255,0.66) 90%);"
		></view>
		<view class="head-box">
			<!-- #ifdef MP -->
			<!-- <image src="../../static/myBackground.png"></image> -->

			<!-- #endif -->
			<!--标题栏-->
			<!--小程序端不显示-->
			<!-- #ifndef MP -->
			<view class="status_bar">
				<image src="../../static/myBackground.png"></image>
			</view>
			<bar-title :isBack="false" :fixed="false" :bgColor="bgColor">
				<block slot="right">
					<button
						class="cu-btn sm text-color-yellow margin-right-lg text-white radius-12"
						@tap="goToErp"
						v-if="roles.store_admin || roles.store_employee || roles.sorting_leader"
						style="box-shadow: 0px 2px 4px 0px rgba(181, 181, 181, 0.5)"
					>
						工作模式
						<!-- <text class="iconfont icon-nextpageorange margin-lr-xs"></text> -->
					</button>
					<text class="iconfont icon-shezhi" @tap="setupTap" />
				</block>
			</bar-title>
			<!-- #endif -->
			<view class="my-content">
				<!--用户信息-->
				<view class="user-info-box">
					<!--未登陆-->
					<view class="login-user-view" v-if="login">
						<view class="login-user-avatar-view">
							<view class="cu-avatar round xl" style="background-image: url(/static/img/avatar/1.png)" />
						</view>
						<button class="cu-btn sm bg-red radius" @tap="loginUrlTap">立即登录</button>
					</view>

					<!--已登陆-->
					<view class="cu-list menu-avatar" v-else>
						<view class="cu-item">
							<view
								class="cu-avatar radius-1-5 lg"
								:style="{backgroundImage:'url('+ (userInfo.avatar ? userInfo.avatar : '/static/img/avatar/1.jpg') +')'}"
							/>
							<view class="content .text-xxl">
								<view class="">
									<text class="margin-right" v-if="userInfo.nickName">{{userInfo.nickName}}</text>
								</view>
								<view class="text-sm">账号:{{userInfo.userName}}</view>
							</view>
							<!-- <view class="right text-xl" @tap="baseTap('/pages/my/userdata/index')">
								<text class="margin-right cuIcon-right icon"></text>
							</view> -->
						</view>

						<!-- <view class="padding-lr-lg">
							<view class="text-sm flex justify-between"
								@tap="baseTap('/pages/my/userdata/edit-synopsis?bio='+userInfo.bio)">
								<view v-if="userInfo.bio" class="bio text-border-x text-gray"
									style="width: 80%;overflow: hidden;"
									:class="userInfo.bio.length<21 ? 'contents':'inline-grid'">简介：{{userInfo.bio}}</view>
								<view v-else class="bio text-border-x text-gray contents"
									style="width: 80%;overflow: hidden;">您还未填写个性签名！</view>
								<view class="">
									<view class="cu-tag line-red round">
										编辑
									</view>
								</view>
							</view>
						</view> -->
					</view>
				</view>
				<!--用户提示-->
				<view class="text-sm user-info-tip-box" v-if="userInfo && userInfo.verification != 1" @tap="realNameTap">
					<view class="text-cut text-gray">偷偷告诉你，实名认证后才能回收下单哦~</view>
					<text class="cuIcon-right icon" />
				</view>
				<!--用户数据-->
				<view class="user-info-num-box margin-tb-sm padding-bottom-sm">
					<view class="box margin-lr-sm">
						<view class="cu-list col-3 no-border">
							<view class="cu-item" @tap="cartTap">
								<view class="text-xxl" v-if="login">-</view>
								<view class="text-xxl text-color-black" v-else>{{userInfo.cartnum}}</view>
								<text class="text-sm text-color-black text-500">购物车</text>
							</view>
							<view class="cu-item" @tap="footmarkTap">
								<view class="text-xxl" v-if="login">-</view>
								<view class="text-xxl text-color-black" v-else>{{userInfo.visitnum}}</view>
								<text class="text-sm text-color-black text-500">足迹</text>
							</view>
							<view class="cu-item" @tap="sponsoredTap">
								<view class="text-xxl" v-if="login">-</view>
								<view class="text-xxl text-color-black" v-else>{{userInfo.hb_medal}}</view>
								<text class="text-sm text-color-black text-500">奖章</text>
							</view>
							<!--
							<view class="cu-item" @tap="feeTap">
								<view class="text-xxl" v-if="login">-</view>
								<view class="text-xxl text-red" v-else>{{userInfo.fee}}</view>
								<text class="text-sm">佣金</text>
							</view>
							<view class="cu-item" @tap="moneyTap">
								<view class="text-lg" v-if="login">-</view>
								<view class="text-lg text-red" v-else>{{userInfo.money}}</view>
								<text class="text-sm">余额</text>
							</view>
							-->
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="view-content">
			<!--用户数据-->
			<view class="padding-tb-sm bg-F9F9FB radius-6">
				<view class="text-black text-xl text-bold padding-sm">我的交易</view>
				<view class="margin-lr-sm bg-white nav-item">
					<scroll-view scroll-x class="nav text-center">
						<view
							style="display: inline-flex"
							class="cu-item flex text-center radius-6"
							:class="index==jiaoyicurrent?'text-color-yellow text-white cur':'bg-white'"
							v-for="(item,index) in jiaoyilist"
							:key="index"
							@tap="sectionChange"
							:data-id="index"
						>
							<!-- <view class="flex-sub iconfont" :class="item.icon"></view> -->
							<view class="flex-twice label text-center">{{item.label}}</view>
							<!--<view class="flex justify-start">
								<view class="flex-sub "><image class="img" :src="item.icon" mode="heightFix"></image></view>
								<view class="flex-sub ">{{item.label}}</view>
							</view>-->
						</view>
					</scroll-view>
				</view>
				<!--<u-subsection :list="jiaoyilist" :current="jiaoyicurrent" keyName="label" @change="sectionChange">
				</u-subsection>-->
				<!--我的订单-->
				<view class="margin-top-sm padding-tb-sm user-info-order-box" v-if="jiaoyicurrent == 1">
					<view class="text-black text-xl text-bold padding-sm">我买到的订单</view>
					<view class="allorder-tips text-sm text-929294" @click="goods_orderlist_tap(0)">全部订单</view>
					<view class="cu-list grid col-4 no-border">
						<view class="cu-item" @tap="goods_orderlist_tap(0)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-qr_code"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daifukuan text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.recyclenum!=0">{{userInfo.recyclenum|| 0}}</view>
								</view>
								<text class="text-101010">待付款</text>
							</view>
						</view>
						<view class="cu-item" @tap="goods_orderlist_tap(1)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-cartfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daifahuo text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.shopnum!=0">{{userInfo.shopnum|| 0}}</view>
								</view>
								<text>待发货</text>
							</view>
						</view>
						<view class="cu-item" @tap="goods_orderlist_tap(2)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-favorfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daishouhuo text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.favoritenum!=0">{{userInfo.favoritenum|| 0}}</view>
								</view>
								<text>待收货</text>
							</view>
						</view>
						<view class="cu-item" @tap="goods_orderlist_tap(3)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-favorfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daipingjia text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.favoritenum!=0">{{userInfo.favoritenum|| 0}}</view>
								</view>
								<text>待评价</text>
							</view>
						</view>
					</view>
				</view>
				<view class="margin-top-sm padding-tb-sm user-info-order-box" v-if="jiaoyicurrent == 0">
					<view class="text-black text-xl text-bold padding-sm">我卖出的订单</view>
					<view class="allorder-tips text-sm text-929294" @click="recycle_orderlist_tap(0)">全部订单</view>
					<view class="cu-list grid col-5 no-border">
						<view class="cu-item" @tap="recycle_orderlist_tap(0)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-sponsorfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daifukuan text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.recyclenum!=0">{{userInfo.recyclenum|| 0}}</view>
								</view>
								<text class="text-101010">发货</text>
							</view>
						</view>
						<view class="cu-item" @tap="recycle_orderlist_tap(1)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-cartfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daifahuo text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.shopnum!=0">{{userInfo.shopnum|| 0}}</view>
								</view>
								<text class="text-101010">质检</text>
							</view>
						</view>
						<view class="cu-item" @tap="recycle_orderlist_tap(2)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-favorfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daishouhuo text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.favoritenum!=0">{{userInfo.favoritenum|| 0}}</view>
								</view>
								<text class="text-101010">结算</text>
							</view>
						</view>
						<view class="cu-item" @tap="recycle_orderlist_tap(3)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-favorfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-daipingjia text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.favoritenum!=0">{{userInfo.favoritenum|| 0}}</view>
								</view>
								<text class="text-101010">退货</text>
							</view>
						</view>
						<view class="cu-item" @tap="recycle_orderlist_tap(4)">
							<view class="text-xxl text-red" v-if="login">
								<text class="cuIcon-favorfill"></text>
							</view>
							<view class="text-xxl text-black" v-else>
								<view class="iconfont icon-refund text-darkgrey">
									<view class="cu-tag badge" v-if="userInfo.favoritenum!=0">{{userInfo.favoritenum|| 0}}</view>
								</view>
								<text class="text-101010">待评价</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!--推荐工具-->
			<view class="padding-xs bg-F9F9FB margin-top-sm user-info-tools-box radius-4">
				<view class="tools-list-box">
					<view class="cu-list grid col-4 no-border">
						<block v-for="(item,index) in toolsList" :key="index">
							<view class="cu-item" v-if="index < 12" @tap="gridTap(item)">
								<view class="text-red" :class="['iconfont ' + item.icon]" />
								<text class="text-red">{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height"></view>
		<!--ERP-->
		<!--
		<view class="add-btn-view-box" @tap="goToErp" v-if="is_company==1">
			<button class="cu-btn cuIcon-shake bg-blue"></button>
		</view>
		-->
		<!--客服悬浮球-->
		<view class="kefu">
			<drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" />
		</view>
		<!--底部导航-->
		<footer-tabbar :tabID="4" :msgDot="true" />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';
	import { getUserInfo, kefuInitUser } from '@/api/user.js';
	import { erpuserislogin } from '@/api/erpapi.js';
	import barTitle from '@/components/common/basics/bar-title';

	import _my_data from '@/static/data/my.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数

	import Vue from 'vue';
	export default {
		name: 'my',
		components: {
			barTitle,
			footerTabbar,
		},
		data() {
			return {
				toolsList: [],
				bgColor: 'bg-111',
				login: false,
				is_company: 0,
				userInfo: '',
				index: 0,
				scrollLeft: 0,
				jiaoyilist: [
					{
						label: '我卖出的',
						icon: 'icon-whatisold',
						value: 1,
					},
					{
						label: '我买到的',
						icon: 'icon-whatibought',
						value: 0,
					},
				],
				roles: {},
				jiaoyicurrent: 0,
			};
		},
		onLoad() {
			this.roles = Vue.prototype.$store.state.roles;
			console.log(this.roles, '222222');
			//加载虚拟数据
			this.toolsList = _my_data.toolsListData();
		},
		onShow() {
			getUserInfo().then((res) => {
				this.userInfo = res.data;
			});
			this.erpuserislogin();
			this.$nextTick(() => {
				plus.navigator.setStatusBarStyle('dark');
				var ss = plus.navigator.getStatusBarStyle();
			});
		},
		mounted() {
			this.getIMEI();
			_tool.setBarColor(false);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0,
			});
			this.$nextTick(() => {
				plus.navigator.setStatusBarStyle('dark');
				var ss = plus.navigator.getStatusBarStyle();
			});
		},
		onReady() {},
		onPullDownRefresh() {
			getUserInfo()
				.then((res) => {
					this.userInfo = res.data;
				})
				.finally(() => {
					uni.stopPullDownRefresh();
				});
		},
		methods: {
			// 获取手机序列号
			getIMEI() {
				console.log('IMEI:' + plus.device.imei);
				console.log('IMSI:' + plus.device.imsi);
				console.log('设备型号:' + plus.device.model);
				console.log('UUID:' + plus.device.uuid);
				plus.device.getInfo({
					success: function (e) {
						console.log(JSON.stringify(e), 'IMEI');
					},
				});
			},
			// erp入口
			erpuserislogin() {
				let that = this;
				erpuserislogin().then((res) => {
					if (res.code == 1) {
						that.is_company = 1;
					}
				});
			},
			sectionChange(e) {
				//this.jiaoyicurrent = index;
				let index = e.currentTarget.dataset.id;
				this.jiaoyicurrent = index;
				console.log(this.jiaoyicurrent);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0,
				});
			},
			//通用跳转
			baseTap(url) {
				uni.navigateTo({
					url: url,
				});
			},
			//购物车
			cartTap() {
				// uni.navigateTo({
				// 	url: "/pages/goods/my_cart"
				// });
				uni.switchTab({
					url: '/pages/tabbar/cart',
				});
				/*
					uni.navigateTo({
						url: '/pages/goods/cart'
					})*/
			},
			//足迹
			footmarkTap() {
				uni.navigateTo({
					url: '/pages/my/footmark',
				});
			},
			//我买到的
			goods_orderlist_tap(type) {
				// 0 -全部 1 2 3 4
				uni.navigateTo({
					url: '/pages/order/goods/list?type=' + type,
				});
			},
			//我卖出的
			recycle_orderlist_tap(type) {
				// 0 -全部 1 2 3 4
				uni.navigateTo({
					url: '/pages/order/recycle/list?type=' + type,
				});
			},
			loginUrlTap() {
				uni.navigateTo({
					url: '/pages/common/login/login',
				});
			},
			realNameTap() {
				uni.navigateTo({
					url: '/pages/my/userdata/realname/form',
				});
			},
			setupTap() {
				uni.navigateTo({
					url: '/pages/my/set/set-up',
				});
			},
			gridTap(item) {
				// console.log(item);
				if (item.name == '设置') {
					this.setupTap();
				} else {
					uni.navigateTo({
						url: item.page,
					});
				}
			},
			sponsoredTap() {
				uni.navigateTo({
					url: '/pages/about/explain?type=1',
				});
			},
			moneyTap() {
				uni.navigateTo({
					url: '/pages/about/explain?type=3',
				});
			},
			feeTap() {
				uni.navigateTo({
					url: '/pages/about/explain?type=4',
				});
			},
			goToErp() {
				console.log('去ERP');
				uni.navigateTo({
					url: '/pages/tabbarerp/home',
				});
			},
			async kefuInitUser() {
				console.log(this.userInfo, '222222');
				const isNew = uni.getStorageSync('isNew');
				console.log(isNew);
				const res = await kefuInitUser({
					userId: this.userInfo.userId,
					isNew,
					isHome: 1,
				});
			},
			// 联系客服
			btnClick() {
				this.kefuInitUser();
				console.log('球被点击');
			},
		},
	};
</script>

<style lang="scss" scoped>
	.my-content {
		position: relative;
		z-index: 100;
	}
	.status_bar {
		// height: var(--status-bar-height);
		width: 100vw;
		position: fixed;
		top: var(--status-bar-height) + -50rpx;
		z-index: 100;
		pointer-events: none;
		// background-color: black;
		image {
			width: 100vw;
			height: 633px;
		}
	}
	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: black;
		top: 0;
		z-index: 999;
	}
	.my-box {
		width: 100%;
		.nav-item {
			height: 46px;
			display: flex;
			align-items: center;
			padding: 0 5px;
		}
		.cu-list.grid {
			background-color: #f9f9fb;
		}
		.cu-list.grid > .cu-item .icon {
			position: relative;
			height: 75rpx;
			height: 52rpx;
		}
		// display: none;
		.head-box {
			padding-top: 0;
			border-radius: 0 0 40rpx 40rpx;

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

				.cu-list.menu-avatar > .cu-item {
					background-color: inherit;
					padding-left: 17px;
					.cu-avatar {
						left: 17px;
						border-radius: 96upx;
					}
					.content {
						width: calc(100% - 94.54rpx - 59.99rpx - 100rpx);

						//width: calc(100% - 94.54rpx - 59.99rpx - 20rpx);
						.text-white-bg {
							color: #e8e8e8;

							.text-border-x {
								margin-right: 25.45rpx;
								position: relative;
								// &:after {
								// 	position: absolute;
								// 	background: #dddddd;
								//     top: 5.45rpx;
								//     width: 1.81rpx;
								// 	right: -12.72rpx;
								//     height: 16.36rpx;
								//     content: " ";
								// }
							}
						}
					}

					&:after {
						width: 0;
						height: 0;
						border-bottom: 0;
					}
				}

				.cu-list.menu-avatar > .cu-item .content > view:first-child {
					font-size: 40rpx;
				}
				.cu-list.menu-avatar > .cu-item .content .text-sm {
					font-size: 14px;
					margin-top: 3px;
					color: #929294;
					font-weight: 400;
				}
				//简介少
				.cu-list .bio.contents {
					line-height: 50rpx;
					height: 50rpx;
				}

				//简介多
				.cu-list .bio.inline-grid {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
			}

			.user-info-num-box {
				.box {
					// border-top: 1px solid #e3e3e3;
					.cu-list {
						padding-left: 21px;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						.cu-item {
							margin-left: 33px;
							display: flex;
							align-items: center;
							flex-direction: column;
						}
						.cu-item:first-child {
							margin-left: 0px;
						}
					}
					.cu-list.grid.no-border {
						padding: 0;
					}

					.cu-list.grid.no-border > .cu-item {
						padding-top: 27.27rpx;
						padding-bottom: 9.09rpx;
					}

					.cu-list.grid {
						background-color: inherit;
					}

					.cu-list.grid > .cu-item text {
						font-size: 20rpx;
						line-height: 27.27rpx;
					}
				}
			}

			.user-info-tip-box {
				position: relative;
				margin: 18.18rpx 27.27rpx;
				border-radius: 9.09rpx;
				padding: 18.18rpx 27.27rpx;

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
			position: relative;
			z-index: 100;
			padding: 0 20rpx 54.54rpx;
			.nav {
				.cu-item {
					margin: 0;
					width: 50%;
					padding: 0;
					height: 36px;
					line-height: 36px;
					.iconfont {
						//width:60rpx;
						font-size: 70rpx;
					}
					.label {
						font-size: 18px;
						color: #101010;
						font-weight: 500;
					}
				}
			}
			.user-info-order-box {
				border-radius: 18.18rpx;
				position: relative;

				.cu-list.grid.no-border {
					padding: 0;
					background-color: #f9f9fb;
				}

				.cu-list.grid.no-border > .cu-item {
					padding-bottom: 9.09rpx;
				}

				.allorder-tips {
					position: absolute;
					top: 40rpx;
					right: 20rpx;
				}
			}

			.cu-list.grid > .cu-item text {
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
</style>
