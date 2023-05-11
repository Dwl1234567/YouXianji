<template>
	<view class="home-box">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false">
			<block slot="content">方物云</block>
			<block slot="right">
				<button class="cu-btn sm bg-deepblue margin-right-lg" @tap="goToShop">
					用户模式
					<text class="iconfont icon-nextpageorange margin-lr-xs"></text>
				</button>
			</block>
		</bar-title>
		<!-- 		<bar-title bgColor="bg-white" :isBack="false" @leftTap="showModal('DrawerModalL')">
			<block slot="content">首页</block>
			<block slot="left">
				<text class="cuIcon-shake" />
				<text class="margin-right-sm">默认门店</text>
				<text class="cuIcon-unfold" />
			</block>
		</bar-title> -->

		<!--侧边抽屉-->
		<!-- 	<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{'padding-top':TitleBar+'px'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in 10" :key="index">
						<view class="content">
							<view>门店 {{index +1}}</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<!--待办事项-->
		<view class="bg-white">
			<view class="cu-bar solid-bottom">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text>
					待办事项
				</view>
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
				<view class="cu-item" @tap="financeTap">
					<view class="iconfont icon-reward text-red">
						<view class="cu-tag badge" v-if="loginfo.fukuannum!=0">{{loginfo.fukuannum || 0}}</view>
					</view>
					<text>待付款</text>
				</view>
				<view class="cu-item" @tap="qualityTaskTap">
					<view class="iconfont icon-selectandcheck text-red">
						<view class="cu-tag badge" v-if="loginfo.qualitynum!=0">{{loginfo.qualitynum || 0}}</view>
					</view>
					<text>待分拣</text>
				</view>

				<view class="cu-item" @tap="fahuoTap">
					<view class="iconfont icon-goship text-red">
						<view class="cu-tag badge" v-if="loginfo.qualitynum!=0">{{loginfo.qualitynum || 0}}</view>
					</view>
					<text>待发货</text>
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
				<view class="cu-item" @tap="localTap">
					<view class="iconfont icon-tubiao-64 text-red">
						<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
					</view>
					<text>待上门</text>
				</view>
				<view class="cu-item" @tap="localTaps">
					<view class="iconfont icon-tubiao-64 text-red">
						<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
					</view>
					<text>回收列表</text>
				</view>
				<view class="cu-item" @tap="maintenance">
					<view class="iconfont icon-tubiao-64 text-red">
						<view class="cu-tag badge" v-if="loginfo.taskpricenum!=0">{{loginfo.taskpricenum || 0}}</view>
					</view>
					<text>整备仓</text>
				</view>
			</view>
		</view>

		<!--快捷功能-->
		<view class="bg-white padding-bottom-xl" style="margin-top: 1px">
			<view class="cu-bar solid-bottom padding-top-sm">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text>
					快捷入口
				</view>
				<!--
				<view class="action">
					<text class="cuIcon-right"></text>
				</view>
				-->
			</view>
			<view class="flex margin-top-xs" style="position: relative" v-for="(items,key) in entraMenu" :key="key">
				<view
					class="flex-wrap margin-left"
					style="
						position: absolute;
						bottom: 10rpx;
						text-align: center;
						width: 80rpx;
						height: 60rpx;
						line-height: 60rpx;
						padding: 5rpx 0;
						border-right: 2px solid #ec6e57;
					"
				>
					<text class="text-bold text-deepblue">{{items.name}}</text>
				</view>
				<view
					class="flex-wrap cu-list grid col-5 no-border"
					style="margin-left: 90rpx; margin-top: 0; padding: 5rpx 20rpx"
				>
					<view
						class="cu-item"
						v-for="(item,index) in items.children"
						:key="index"
						v-if="index<5"
						style="padding-bottom: 0"
					>
						<view @tap="goTap(key,index)">
							<!--
							<view class="text-xxl text-black">
								<image class="icon" :src="'/static/erp/icon/'+ item.cuIcon + '.png'" mode="heightFix"></image>
								<view class="cu-tag badge" v-if="item.badge!=0">{{item.badge}}</view>
							</view>
							-->
							<view :class="['iconfont ' + item.cuIcon,item.color?'text-' +item.color:'text-gray']">
								<view class="cu-tag badge" v-if="item.badge!=0">{{item.badge}}</view>
							</view>
							<text :class="[item.color?'text-' +item.color:'text-gray']">{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="bottom" animation @close="close">
			<view class="flex justify-between popup-item-label">
				<view @click="show = false">取消</view>
				<view @click="kefuQiangdan">完成</view>
			</view>
			<picker-view
				indicator-style="height: 40px;line-height: 40px;"
				style="height: 200px; text-align: center"
				class="mpvue-picker-view"
				:value="pickerValue"
				@change="pickerChange"
				indicator-class="itemadd"
			>
				<block>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in kefuList" :key="index">{{item.nickname}}</div>
					</picker-view-column>
				</block>
			</picker-view>
		</u-popup>
		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!--底部导航-->
		<footer-tabbar :tabID="0" :msgDot="true" />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';
	import barTitle from '@/components/common/basics/bar-title';

	import { erpUserAuth, getAccountData, erpuserbacklog } from '@/api/erpapi.js';
	import { addNowDay, gethoursInfo } from '@/utils/pub.js';
	import { getKefuUserList, kefuQiangdan } from '@/api/user.js';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		name: 'home',
		components: {
			barTitle,
			footerTabbar,
		},
		data() {
			return {
				pickerValue: [0],
				show: false,
				TitleBar: this.CustomBar,
				modalName: null,
				TabCur: 0,
				scrollLeft: 0,
				entraMenu: [],
				showdate: false,
				loginfo: '',
				kefuList: [],
				kefuListOne: [],
			};
		},
		onLoad() {
			this.erpUserAuth();
			//加载统计数据

			/*
			 * 加载快捷菜单
			 */
			this.entraMenu = [
				{
					name: '业务',
					children: [
						{
							cuIcon: 'icon-recyclelist',
							color: 'red',
							badge: 0,
							name: '回收列表',
						},
						{
							cuIcon: 'icon-salinglist',
							color: 'red',
							badge: 0,
							name: '销售列表',
						},
						{
							cuIcon: 'icon-myselect',
							color: 'red',
							badge: 0,
							name: '调拨入库',
						},
						{
							cuIcon: 'icon-myselect',
							color: 'red',
							badge: 0,
							name: '上门回收',
						},
						{
							cuIcon: 'icon-refund',
							color: 'red',
							badge: 0,
							name: '退款登记',
						},
					],
				},
				{
					name: '库存',
					children: [
						{
							cuIcon: 'icon-checksheet',
							color: 'red',
							badge: 0,
							name: '串码追踪',
						},
						{
							cuIcon: 'icon-storage',
							color: 'red',
							badge: 0,
							name: '查找库存',
						},
						{
							cuIcon: 'icon-addchekinglist',
							color: 'red',
							badge: 0,
							name: '添加盘点',
						},
						{
							cuIcon: 'icon-checksheet',
							color: 'red',
							badge: 0,
							name: '盘点记录',
						},
						{
							cuIcon: 'icon-checksheet',
							color: 'red',
							badge: 0,
							name: '仓库管理',
						},
					],
				},
				{
					name: '本店',
					children: [
						{
							cuIcon: 'icon-buyaccessory',
							color: 'red',
							badge: 0,
							name: '配件管理',
						},
						{
							cuIcon: 'icon-product',
							color: 'red',
							badge: 0,
							name: '本店商品',
						},
						{
							cuIcon: 'icon-statistic',
							color: 'red',
							badge: 0,
							name: '本店业绩',
						},
						{
							cuIcon: 'icon-announce',
							color: 'red',
							badge: 0,
							name: '聊天记录',
						},
						{
							cuIcon: 'icon-announce',
							color: 'red',
							badge: 0,
							name: '即时通话',
						},
					],
				},
				{
					name: '财务',
					children: [
						{
							cuIcon: 'icon-banlance',
							color: 'red',
							badge: 0,
							name: '流水账单',
						},
						{
							cuIcon: 'icon-outcome',
							color: 'red',
							badge: 0,
							name: '支出列表',
						},
						{
							cuIcon: 'icon-income',
							color: 'red',
							badge: 0,
							name: '收入列表',
						},
					],
				},
				{
					name: '客户',
					children: [
						// {
						// 	cuIcon: 'questionfill',
						// 	color: 'mauve',
						// 	badge: 0,
						// 	name: '客户公海'
						// },
						{
							cuIcon: 'icon-huishoufanglist',
							color: 'red',
							badge: 0,
							name: '客户列表',
						},
						{
							cuIcon: 'icon-addhuishoushang',
							color: 'red',
							badge: 0,
							name: '添加客户',
						},
						{
							cuIcon: 'icon-gongyingshanglist',
							color: 'red',
							badge: 0,
							name: '供商列表',
						},
						{
							cuIcon: 'icon-addgongyingshang',
							color: 'red',
							badge: 0,
							name: '添加供商',
						},
					],
				},
				{
					name: '分拣',
					children: [
						// {
						// 	cuIcon: 'questionfill',
						// 	color: 'mauve',
						// 	badge: 0,
						// 	name: '客户公海'
						// },
						{
							cuIcon: 'icon-selectandcheck',
							color: 'red',
							badge: 0,
							name: '分拣记录',
						},
						{
							cuIcon: 'icon-recyclelisting',
							color: 'red',
							badge: 0,
							name: '收方列表',
						},
						{
							cuIcon: 'icon-addrecycling',
							color: 'red',
							textsize: 'mini',
							badge: 0,
							name: '添加收方',
						},
					],
				},
			];
		},
		onPullDownRefresh() {},
		onShow() {
			this.erpuserbacklogFuc();
		},
		methods: {
			async kefuQiangdan() {
				const res = await kefuQiangdan({
					csr_id: uni.getStorageSync('userInfo').user_id + '|csr',
					user_id: this.kefuListOne.user_id_in + '|user',
				});
				if (res.code === 1) {
					uni.navigateTo({
						url: '/pages/erp/chat/chatAdmin',
					});
				}
			},
			maintenance() {
				uni.navigateTo({
					url: '/pages/erp/maintenance/list',
				});
			},
			gotokefu() {
				console.log(this.kefuListOne);
				// uni.navigateTo({
				// 	url: '/pages/erp/chat/chatAdmin?csr_id='+ uni.getStorageSync('userInfo').user_id + '&user_id=' + this.kefuListOne.user_id + '&token=' + this.kefuListOne.token,
				// });
			},
			pickerChange(e) {
				console.log(e.detail.value[0]);
				this.kefuListOne = this.kefuList[e.detail.value[0]];
			},
			close() {
				this.show = false;
			},
			async getKefuUserList() {
				const csr_id = uni.getStorageSync('userInfo').user_id;
				const res = await getKefuUserList({
					csr_id,
				});
				if (res.code === 1) {
					this.kefuList = res.data;
					this.kefuListOne = res.data[0];
				}
				console.log(res);
			},
			// 获取待办数据
			erpuserbacklogFuc() {
				erpuserbacklog({}).then((res) => {
					this.loginfo = res.data;
				});
			},
			// 获取权限
			erpUserAuth() {
				erpUserAuth({}).then((res) => {
					uni.setStorageSync('store_info', JSON.stringify(res.data.store_info));
				});
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},

			// 待发货
			fahuoTap() {
				uni.navigateTo({
					url: '/pages/erp/order/list',
					//url: "/pages/erp/stores/sales"
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
			//待上门
			localTaps() {
				uni.navigateTo({
					url: '/pages/erp/recycleList/index',
				});
			},
			goTap(key, index) {
				var pageurl = '/pages/erp/';
				if (key == 0) {
					if (index == 0) {
						var value = 'purchase/list';
					}
					if (index == 1) {
						var value = 'sell/list';
					}
					if (index == 2) {
						var value = 'allot/allot_push';
					}
					if (index == 3) {
						var value = 'purchase/local';
					}
					if (index == 4) {
						var value = 'sell/out';
					}
				}
				if (key == 1) {
					if (index == 0) {
						var value = 'sn/list';
					}
					if (index == 1) {
						var value = 'goods/list';
					}
					if (index == 2) {
						var value = 'inventory/check/add';
					}
					if (index == 3) {
						var value = 'inventory/check/list';
					}
					if (index == 4) {
						var value = 'warehouse/quality';
					}
				}
				if (key == 2) {
					if (index == 0) {
						var value = 'shop/list';
					}
					if (index == 1) {
						var value = 'stores/list';
					}
					if (index == 2) {
						var value = 'stores/sales';
					}

					if (index == 3) {
						var value = 'chat/list';
					}
					if (index == 4) {
						var value = 'chat/chatAdmin';
						// this.getKefuUserList();
						// this.show = true;
					}
				}
				if (key == 3) {
					if (index == 0) {
						var value = 'finance/list';
					}
					if (index == 1) {
						var value = 'finance/spending/list';
					}
					if (index == 2) {
						var value = 'finance/income/list';
					}
				}
				if (key == 4) {
					// if (index == 0) {
					// 	var value = "customer/list";
					// }
					if (index == 0) {
						var value = 'customer/customer?chooseStatus=1';
					}
					if (index == 1) {
						var value = 'customer/add';
					}
					if (index == 2) {
						var value = 'supplier/supplier?chooseStatus=1';
					}
					if (index == 3) {
						var value = 'supplier/add';
					}
				}
				if (key == 5) {
					if (index == 0) {
						var value = 'quality/list';
					}
					if (index == 1) {
						var value = 'third/list?chooseStatus=1';
					}
					if (index == 2) {
						var value = 'third/add';
					}
				}
				var url = pageurl + value;
				console.log('点击了' + url);
				// if
				uni.navigateTo({
					url: url,
				});
			},
			goToShop() {
				uni.switchTab({
					url: '/pages/tabbar/my',
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	/deep/ .picker-item {
		line-height: 40px;
	}
	.popup-item-label {
		padding-left: 10px;
		padding-right: 10px;
		height: 45px;
		line-height: 45px;
		view:nth-child(1) {
			color: #888;
			font-size: 17px;
		}
		view:nth-child(2) {
			color: #007aff;
			font-size: 17px;
		}
	}
	.home-box {
		// display: none;
		.cu-bar {
			min-height: 60rpx;
		}
		.cu-list.grid.no-border {
			padding: 10rpx;
			.cu-item {
				padding: 10rpx 0;
			}
		}
	}

	.home-box.show {
		display: block;
	}
	.grid.col-6 > uni-view {
		width: 16.666%;
	}
	.flex-wrap {
		.cu-item {
			width: auto;
			margin-left: 20rpx;
		}
	}
	.cu-list.grid > .cu-item {
		uni-text {
			margin-top: 0;
		}
		.icon {
			height: 60rpx;
			height: 60rpx;
		}
	}
</style>
