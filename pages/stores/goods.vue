<template>
	<view>
		<!--商品列表-->
		<view class="padding-bottom-sm goods-list-view-box">
			<!--门店信息-->
			<view class="margin-lr-sm content radius-4 bg-white">
				<image :src="$httpImage + storeInfo.indexPhoto" mode="aspectFill"></image>
				<view class="desc">
					<view class="title margin-bottom-sm">
						<view class="text-cut">{{storeInfo.storeName}}</view>
					</view>
					<view class="flex justify-between">
						<view class="text-content text-sm">
							<view class="">营业时间：{{storeInfo.businessHours}}</view>
							<view class="">联系店长：{{storeInfo.linkPhonenumber}}</view>
							<view class="">{{storeInfo.location}}</view>
						</view>
						<view class="action">
							<view class="cu-btn sm flex align-center radius-2" @click="toNearbyStore"
								style="background: linear-gradient(90deg, #F3C81A 0%, #FFB629 100%);">
								<text class="cuIcon-location margin-right-xs"></text>
								导航
							</view>
							<view class="cu-btn bg-red sm margin-top-xs flex align-center radius-2"
								@click="toTel(storeInfo.linkPhonenumber)"
								style="background: linear-gradient(90deg, #F3C81A 0%, #FFB629 100%);">
								<text class="cuIcon-phone margin-right-xs"></text>
								致电
							</view>
						</view>
					</view>
					<view class="">
						<view class="action margin-tb-sm text-bold text-deepblue text-center">
							到店专享服务
						</view>
						<view class="bg-white" style="margin-bottom: 30rpx;">
							<view class="flex">
								<view class="flex-sub bg-red  light padding-xs margin-mini radius-1-5 text-center">
									<view class="">免费养护</view>
									<view class="text-xs">贴膜丨消毒|清洗</view>
								</view>
								<view class="flex-sub bg-red light padding-xs margin-mini radius-1-5 text-center">
									<view class="">以旧换新</view>
									<view class="text-xs">好机不用等</view>
								</view>
								<view class="flex-sub bg-red light padding-xs margin-mini radius-1-5 text-center">
									<view class="">快速维修</view>
									<view class="text-xs">立等可取品质保证</view>
								</view>
							</view>
							<view class="flex">
								<view class="flex-sub bg-red light padding-xs margin-mini radius-1-5 text-center">
									<view class="">到店选机</view>
									<view class="text-xs">现场试机丨现场取货</view>
								</view>
								<view class="flex-sub bg-red light padding-xs margin-mini radius-1-5 text-center">
									<view class="">高价回收</view>
									<view class="text-xs">极速到账丨保质保价</view>
								</view>
							</view>
							<view class="flex">
								<view class="flex-sub bg-red light padding-sm margin-mini radius-1-5 text-center">
									<view class="">店内在售{{storeInfo.nums}}台</view>
									<view class="text-xs">专业质检丨可看真机丨超长质保100天丨七天无理由</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--商品列表1-->
			<view class="margin-lr-sm radius-4">
				<goods-list :list_data="dataList" @listTap="goodsListTap"></goods-list>
			</view>
		</view>
		<view class="footer">
			<uni-load-more :status="loadmore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import goodsList from '@/components/common/list/goods-sort-list';

	import data from '@/static/data/shaixuan.js'; //筛选菜单数据
	import _sort_list_data from '@/static/data/sort_list.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {} from "@/api/mall.js"
	import {
		storeDetail,
		storegoodsAll
	} from "@/api/common.js";
	import {
		toMapAPP
	} from '@/utils/common.js';
	import {
		secondGoodsLists
	} from '@/api/malls';

	export default {
		components: {
			goodsList
		},
		data() {
			return {
				storeInfo: {},
				ifBottomRefresh: false,
				dataList: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				storeId: '',
				latitude: '',
				longitude: '',
				shop_latitide: '',
				shop_longtude: '',
			}
		},
		onLoad(options) {
			let that = this;
			this.storeId = options.id;
			this.storeInfo = uni.getStorageSync('storeItem')
			this.storeDetailFuc();
			this.getDataList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('进入下拉刷新');
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			goodsListTap(e) {
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + e.data.goodsId + '&isNew=false',
				});
			},
			// 导航-调用手机地图应用
			toNearbyStore() {
				console.log(this.storeInfo)
				toMapAPP(this.storeInfo.latitude, this.storeInfo.longitude, this.storeInfo.location, this.storeInfo.storeName,
					getApp()
					.globalData.appName)
			},

			storeDetailFuc() {
				let paramsData = {
					'store_id': this.storeId
				}
				storeDetail(paramsData).then(res => {
					this.storeInfo = res.data;
					this.shop_latitide = res.data.latitude;
					this.shop_longtude = res.data.longitude;
					uni.setNavigationBarTitle({
						title: res.data.name + '门店'
					})
				})
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData['storeId'] = that.storeId;
				secondGoodsLists(paramsData).then(res => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.total == that.dataList.length ? 'noMore' :
								'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			goodsSortListTap(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + e.data.id
				});
			},
			toTel(phone) {
				const res = uni.getSystemInfoSync();
				// ios系统默认有个模态框
				if (res.platform == 'ios') {
					uni.makePhoneCall({
						phoneNumber: phone,

						success() {
							console.log('拨打成功了');
						},
						fail() {
							console.log('拨打失败了');
						}
					})
				} else {
					//安卓手机手动设置一个showActionSheet
					uni.showActionSheet({
						itemList: [phone, '呼叫'],
						success: function(res) {
							console.log(res);
							if (res.tapIndex == 1) {
								uni.makePhoneCall({
									phoneNumber: phone,
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";

	/* #endif */
	// @import "@/uni_modules/mpb-ui/shop/sort_list.scss";

	.goods-list-view-box .content {
		position: relative;

		uni-image {
			width: 100%;
			border-radius: 40rpx;
		}

		.desc {
			background-color: #fff;
			width: 100%;
			border-radius: 40rpx;
			padding: 20rpx;

			.title {
				color: #111;
				font-size: 40rpx;
				font-weight: bold;
			}
		}
	}
</style>