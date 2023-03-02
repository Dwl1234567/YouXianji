<template>
	<view class="home-box">
		<!--欢迎-->
		<welcome-tip
			:content="appMode.tips+'，'+userInfo.nickname"
			:show="true"
			:c_s="3000"
			@closeFinish="welcomeClose"
		></welcome-tip>

		<!--营销块背景-->
		<view class="swiper-background-box show">
			<view class="swiper-background"></view>
		</view>
		<!--头部轮播背景-->
		<!-- <swiper-background :list_data="swiperInfo.list" :indexs="swiperInfo.index" :show="swiperInfo.show"
			:welcome="swiperInfo.welcome"></swiper-background> -->

		<view class="head-search-box" :class="headInfo.Class" :style="">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center margin-top-sm small-routine-title">首页</view>
			<!-- #endif -->

			<!--搜索框-->
			<view class="cu-bar search search-box">
				<view class="search-form round" @tap="searchTap">
					<text class="cuIcon-search"></text>
					<text>iPhone 13 Pro</text>
					<view class="sbtn cu-btn btn bg-red radius-4">搜索</view>
				</view>
				<text class="cuIcon-scan" @tap="snTap" />
			</view>

			<!--选项卡-->
			<view class="nav-box flex-tab show">
				<view class="flex">
					<view class="basis-xxl">
						<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="headTab.scrollLeft">
							<block v-for="(item,index) in headTab.list" :key="index">
								<view
									class="cu-item"
									:class="index==headTab.TabCur?'select':''"
									@tap="tabSelect"
									:data-index="index"
									:data-id="item.id"
								>
									<view>{{item.name}}</view>
									<view class="tab-dot bg-white"></view>
								</view>
							</block>
						</scroll-view>
					</view>
					<view class="basis-xs flex" @tap="sortVueTap">
						<view class="sort-icon">
							<text class="cuIcon-sort"></text>
						</view>
						<view style="line-height: 60rpx">分类</view>
					</view>
				</view>
			</view>
		</view>

		<!--中间内容区域-->
		<view class="view-content" :class="[viewContent.welcome?'welcome':'',headTab.TabCur==0?'show':'']">
			<!--滑动菜单-->
			<view class="padding-sm">
				<grid-menu-list :list_data="gridMenuData" @listTap="gridMenuTap" />
			</view>

			<!--轮播、报价条、短视频-->
			<view class="padding-lr-sm padding-bottom-sm" style="position: relative">
				<view class="flex block">
					<view class="flex-sub block-1 radius">
						<!--轮播-->
						<view class="swiper-box">
							<swiper
								class="screen-swiper square-dot c"
								autoplay
								circular
								indicator-dots
								:current="swiperInfo.index"
								@change="swiperChange"
							>
								<swiper-item v-for="(item,index) in swiperInfo.list" :key="index">
									<view class="swiper-padding">
										<image class="" :src="item.image" mode="widthFix" />
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
					<view class="flex-sub block-2">
						<view class="flex align-start">
							<view class="text-center video radius" @click="videoTap()">
								<!--短视频-->
								<image
									class=""
									src="https://storage.youxianji.cc/images/20221012172029634686dd87fb7.png"
									mode="widthFix"
								/>
							</view>
						</view>
						<view class="flex align-end">
							<view class="baojia-bar radius margin-top-xs">
								<!--回收报价条-->
								<view v-if="phoneModel" class="process-info">
									<view>当前机型</view>
									<view class="">
										<text class="model">{{phoneModel}}</text>
									</view>
									<view style="margin-top: 5rpx">
										<text class="margin-right-xs text-xs">最高可卖</text>
										<text class="text-sm text-red">￥</text>
										<text class="price">{{UserPhoneMoney}}</text>
									</view>
									<view class="text-center">
										<text
											class="padding-lr-xl cu-btn btn bg-deepblue radius-4"
											@click="goevaluation()"
										>
											立即估价
										</text>
									</view>
								</view>
								<!--回收报价条 end-->
							</view>
						</view>
					</view>
				</view>
			</view>

			<!--商品tab-->
			<!--
			<view class="goods-tab-box">
				<scroll-view scroll-x class="nav z margin-tb-sm">
					<view class="flex text-center">
						<block v-for="(item,index) in goodsTabData.list" :key="index">
							<view class="cu-item flex-sub nf" :class="index==goodsTabData.TabCur?'select':''"
								@tap="goodsTab" :data-id="index">
								<view class="cu-tag badge z bg-gradual-pink" v-if="item.tag">{{item.tag}}</view>
								<view :class="index == goodsTabData.TabCur?'text-red':''">{{item.title}}</view>
								<view class="tab-dot bg-red"></view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
			-->

			<view class="padding-lr-sm bg-gray">
				<image class="" src="/static/home/baozhang.png" mode="widthFix" style="width: 100%; height: auto" />
			</view>

			<view class="tab-list">
				<!--商品列表-->
				<goods-list
					:list_data="goodsData"
					@listTap="goodsListTap"
					:show="goodsTabData.TabCur!=3 && goodsTabData.TabCur!=4?true:false"
				></goods-list>
			</view>

			<!--占位底部距离-->
			<view class="cu-tabbar-height"></view>
		</view>
		<!--中间内容区域-分类-->

		<view class="view-content" :class="headTab.TabCur!=0?'show':''">
			<!--宫格分类-->
			<grid-sort-list
				v-if="headTab.list[0]"
				:list_data="headTab.list[headTab.TabCur].serieslist"
				@listTap="gridSortTap"
			></grid-sort-list>

			<!--广告-->
			<view class="margin">
				<image class="ad-img" :src="swiperInfo.list[0].image" mode="widthFix"></image>
			</view>

			<!--标题-->
			<view class="margin-bottom-sm tab-list-title">
				<view class="flex flex-wrap">
					<view class="basis-sm text-right">
						<image class="img-aau" src="/static/img/aau.png" lazy-load mode="widthFix"></image>
					</view>
					<view class="basis-xs text-center">
						<text class="text-black text-xl text-bold">为您推荐</text>
					</view>
					<view class="basis-sm text-left">
						<image class="img-aau" src="/static/img/aau.png" lazy-load mode="widthFix"></image>
					</view>
				</view>
			</view>

			<!--商品列表-->
			<!--<goods-list :list_data="goodsData" @listTap="goodsListTap"></goods-list>-->
			<goodsList :list_data="goodsData" @listTap="goodsListTap"></goodsList>

			<!-- 下拉加载提示 -->
			<!--占位底部距离-->
			<view class="cu-tabbar-height"></view>
		</view>
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		<!--弹出框-->
		<modal-img
			:show="modalShow"
			src="/static/delect_images/home/sundry/reward.png"
			@imgTap="imgTap"
			@closeTap="closeTap"
		></modal-img>

		<!--返回顶部-->
		<view class="add-btn-view-box">
			<!--返回顶部-->
			<button v-if="gotopstatus" class="cu-btn cuIcon-top bg-red" @tap="goToTap"></button>
		</view>
		<!--客服悬浮球-->
		<view class="kefu">
			<drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" />
		</view>
		<!--底部导航-->
		<footer-tabbar :tabID="0" :msgDot="true" />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';

	//加载组件
	import welcomeTip from '@/components/common/basics/welcome-tip';
	import swiperBackground from '@/components/common/basics/swiper-background';
	import gridMenuList from '@/components/common/list/grid-menu-list';
	import identifyList from '@/components/common/list/identify-list';
	import sellQuicklyList from '@/components/common/list/sell-quickly-list';
	import activityList from '@/components/common/list/activity-list';
	//import goodsList from '@/components/common/list/goods-list';
	import goodsList from '@/components/common/list/goods-sort-list';
	import liveList from '@/components/common/list/live-list';
	import videoList from '@/components/common/list/video-list';
	import gridSortList from '@/components/common/list/grid-sort-list';
	import modalImg from '@/components/common/basics/modal-img';
	//======================================================================
	import _home_data from '@/static/data/home.js'; //虚拟数据
	import _tool from '@/utils/tools.js';

	// 接口
	import {
		AdsIndex,
		ProductLists,
		CategoryMenu,
		CategoryAll,
		BrandList,
		ProductFuscreen,
		ProductFulists,
	} from '@/api/mall.js';
	import { getIndexPrice } from '@/api/common.js';
	export default {
		name: 'home',
		components: {
			welcomeTip,
			swiperBackground,
			gridMenuList,
			identifyList,
			sellQuicklyList,
			activityList,
			goodsList,
			liveList,
			videoList,
			footerTabbar,
			gridSortList,
			modalImg,
		},
		data() {
			return {
				tabID: 0,
				appMode: _tool.mpb_mode('tips'),
				swiperInfo: {
					index: 0,
					show: true,
					welcome: true,
					list: [],
				},
				phoneModel: '',
				phoneModelname: '',
				UserGoodsId: 0,
				UserCateId: 0,
				UserPhoneMoney: '',
				headInfo: {
					Class: '',
					opacity: 100,
				},
				goodsShow: true,
				headTab: {
					TabCur: 0,
					TabCatID: 0,
					scrollLeft: 0,
					list: [],
				},
				viewContent: {
					welcome: true,
				},
				gridMenuData: [],
				identifyData: [],
				quickly: {},
				activity: [],
				goodsTabData: {
					TabCur: 0,
					list: [],
				},
				goodsData: [],
				liveData: [],
				videoData: [],
				initgridSortData: [],
				gridSortData: [],
				modalShow: false,
				gotopstatus: false,
				pageIndex: 1,
				pageLimit: 10,
				userInfo: {},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					contentdown: '加载更多数据',
					contentrefresh: '加载中...',
					contentnomore: '暂无更多数据。',
				},
			};
		},
		onLoad() {
			let that = this;
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.userInfo = userInfo;
			}

			this.swiperInfo.list = _home_data.swiper();
			this.gridMenuData = _home_data.nav();
			this.goodsTabData.list = _home_data.goodsTab();

			uni.getSystemInfo({
				success: function (res) {
					if (res.model) {
						that.phoneModel = res.model;
						that.phoneModelname = res.model;
						let index = that.phoneModel.lastIndexOf('(');
						let index1 = that.phoneModel.lastIndexOf('<');
						if (index != -1) {
							that.phoneModel = that.phoneModel.substring(0, index);
						} else if (index1 != -1) {
							that.phoneModel = that.phoneModel.substring(0, index1);
						}
					}
					let parmas = {
						model: that.phoneModel,
					};
					getIndexPrice(parmas).then((res) => {
						if (res.code == 1) {
							that.UserPhoneMoney = res.data.money;
							if (res.data.money > 0) {
								that.UserGoodsId = res.data.goods_info.id;
								that.UserCateId = res.data.goods_info.cate_id;
							}
							if (res.data.goods_info.name) {
								that.phoneModel = res.data.goods_info.name;
							}
						}
					});
				},
			});
			this.headInfo.Class = 'welcome';
			// 427
			this.loadData();
		},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.getProduct();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return;
			// this.pageIndex += 1;
			this.getProduct();
		},
		methods: {
			snTap() {
				console.log('扫描二维码获取序列号筛选结果');
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: function (res) {
						// 微信小程序
						console.log(res.errMsg == 'scanCode:ok');
						if (res.errMsg == 'scanCode:ok') {
							// 扫描到的信息
							let code = res.result;
							uni.navigateTo({
								url: res.result,
							});
							// that.erpproductSnDataFuc();
						} else {
							uni.$u.toast('未识别到二维码，请重新尝试！');
						}
					},
				});
			},
			// 页面基本数据请求
			loadData() {
				let that = this;
				AdsIndex({}).then((res) => {
					that.swiperInfo.list = res.data;
				});
				CategoryMenu({}).then((res) => {
					let data = [
						{
							id: '0',
							name: '首页',
						},
					];
					data.push(...res.data);
					that.headTab.list = data;
				});

				this.getProduct();
			},
			// 获取产品列表
			getProduct() {
				let that = this;
				let params = {
					page: this.pageIndex,
					pagesize: this.pageLimit,
				};
				ProductLists(params)
					.then((res) => {
						let data = res.data;

						if (that.pageIndex == 1) {
							that.goodsData = data;
						} else {
							that.goodsData.push(...data);
						}
						if (res.data.length == 10) {
							that.pageIndex++;
						} else {
							that.loadmore = 'noMore';
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					});
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				let that = this;
				/*
				if (this.headTab.TabCur == 0) {
					if (scrollTop <= 100) {
						let num = scrollTop / 100;
						this.headInfo.opacity = num;
						//触顶了
						if (scrollTop == 0) {
							console.log('触顶了刷新');
							//设置刷新
							that.loadData();
						}
					} else if (scrollTop > 100) {
						this.headInfo.opacity = 1;
					}
				}*/
			},
			//触底了
			setReachBottom() {
				this.getProduct();
				//设置加载
			},
			//欢迎提示关闭事件
			welcomeClose(bol) {
				this.swiperInfo.welcome = bol;
				this.headTab.welcome = bol;
				let Class = this.headInfo.Class;
				this.headInfo.Class = Class.replace(/welcome/g, '');
				this.viewContent.welcome = bol;
				//设置颜色
				_tool.setBarColor(false);
			},
			//搜索框下的tab菜单被点击
			tabSelect(e) {
				let that = this;
				let index = e.currentTarget.dataset.index;
				let cid = e.currentTarget.dataset.id;
				this.headTab.TabCur = index;
				this.headTab.TabCatID = cid;
				that.gridSortData = [];
				this.initgridSortData.map((mmp) => {
					if (mmp.pid == cid) {
						that.gridSortData.push(mmp);
					}
				});
				this.headTab.scrollLeft = (index - 1) * 60;
				if (index == 0) {
					this.swiperInfo.show = true;
					//this.headInfo.opacity = 0;
				} else {
					this.swiperInfo.show = false;
					//this.headInfo.opacity = 1;
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0,
				});
			},
			swiperChange(e) {
				this.swiperInfo.index = e.detail.current;
			},
			gridMenuTap(e) {
				if (e.index == 0) {
					uni.navigateTo({
						// url: "/pages/goods/sales/kanyidao"
						url: '/pages/goods/special?type=' + 3,
					});
				} else if (e.index == 1) {
					//特卖
					uni.navigateTo({
						url: '/pages/goods/special?type=' + 1,
						//url: "/pages/home/video"
					});
				} else if (e.index == 2) {
					//上新
					uni.navigateTo({
						url: '/pages/goods/special?type=' + 2,
					});
				} else if (e.index == 3) {
					//热销
					uni.navigateTo({
						url: '/pages/goods/special?type=' + 4,
						//url: "/pages/home/video"
					});
					//this.goSell();
				} else if (e.index == 4) {
					uni.navigateTo({
						url: '/pages/goods/special?type=' + 5,
						//url: "/pages/home/video"
					});
					//this.callKefu();
				} else {
					uni.navigateTo({
						url: '/pages/home/sort_list?fid=' + e.pid + '&sid=' + e.id,
					});
				}
			},
			goSell() {
				this.$emit('goSell');
			},
			identifyTap(e) {
			},
			quicklyTap(e) {
			},
			activityTap(e) {
			},
			//商品列表上的分类tab被点击
			goodsTab(e) {
				this.goodsTabData.TabCur = e.currentTarget.dataset.id;
				// #ifdef H5
				uni.pageScrollTo({
					scrollTop: 340,
					duration: 200,
				});
				// #endif

				// #ifdef APP-PLUS
				uni.pageScrollTo({
					scrollTop: 1010,
					duration: 200,
				});
				// #endif
			},
			goodsListTap(e) {
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + e.data.product_id,
				});
			},
			liveListTap(e) {
			},
			videoListTap(e) {
			},
			gridSortTap(e) {
				// 点击品牌
				uni.navigateTo({
					url:
						'/pages/home/sort_list?sid=' +
						e.data.id +
						'&bid=' +
						this.headTab.TabCatID +
						'&cid=' +
						e.data.category_id,
				});
			},
			goToTap() {
				uni.pageScrollTo({
					scrollTop: 1,
					duration: 300,
				});
			},
			imgTap() {
				this.modalShow = false;
				uni.navigateTo({
					url: '/pages/goods/reward',
				});
				console.log('图片被点击');
			},
			closeTap() {
				this.modalShow = false;
				console.log('点击了关闭');
			},
			sortVueTap() {
				console.log('点击了分类');
				uni.navigateTo({
					url: '/pages/home/sort',
				});
			},
			searchTap() {
				uni.navigateTo({
					url: '/pages/home/search',
				});
			},
			videoTap() {
				console.log('点击了短视频');
				uni.navigateTo({
					url: '/pages/home/video',
				});
			},
			goevaluation() {
				//console.log('goodsid',this.UserGoodsId);
				//去估价
				if (this.UserGoodsId == 0 || this.UserCateId == 0) {
					this.$u.toast('未找到该机型，请去分类寻找！');
				} else {
					uni.navigateTo({
						url: '../recycling/recycling-new?id=' + this.UserGoodsId + '&cate_id=' + this.UserCateId,
					});
				}
			},
			// 联系客服
			btnClick() {
				console.log('球被点击');
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.head-search-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999;
		padding-top: var(--status-bar-height);
		transition: top 0.25s;
		padding-bottom: 10rpx;

		.search-box {
			position: relative;
			.search-form {
				.sbtn {
					height: 48rpx;
					line-height: 48rpx;
					position: absolute;
					right: 80rpx;
				}
			}
			.cuIcon-scan {
				font-size: 20px;
				margin-right: 5px;
			}
		}

		.flex-tab {
			position: relative;
			transition: opacity 0.25s;

			.flex {
				.basis-xxl {
					flex-basis: 90%;
					width: 90%;
					z-index: 1;
				}

				.basis-xxs {
					flex-basis: 10%;
					z-index: 1;
					width: 10%;
				}

				.sort-icon {
					font-size: 55rpx;
					height: 64rpx;
					line-height: 64rpx;
					text-align: center;
				}
			}
		}
	}

	.head-search-box.welcome {
		top: calc(var(--status-bar-height) + 101rpx);
		transition: top 0.25s;
	}

	.swiper-background-box {
		position: absolute;
		height: 888rpx;
		width: 100%;
		top: 0;
		display: none;
		transition: 0s;
		.swiper-background {
			position: absolute;
			height: 888rpx;
			width: 100%;
			opacity: 0.1;
			top: 0;
			//background-size: cover;
			//transition: opacity .25s;
		}
	}
	.swiper-background-box.show {
		display: block;
		transition: 0s;
	}

	.view-content {
		display: none;
		width: 100%;

		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 30rpx);
		/* #endif */

		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 70rpx);
		/* #endif */

		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 85rpx);
		/* #endif */

		.tab-list {
			position: relative;
			width: 100%;
		}
	}

	.view-content.welcome {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 180rpx);
		/* #endif */

		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */

		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */

		transition: all 0.25s;
	}

	.view-content.show {
		display: block;
	}

	.swiper-box {
		width: 100%;

		.screen-swiper {
			height: 420rpx;
			uni-image {
				border-radius: 6rpx;
			}
			.swiper-padding {
				//padding: 0 25rpx;
			}
		}
	}

	.red-envelopes {
		width: 100%;
	}

	.goods-tab-box {
		position: sticky;
		padding: 2rpx 0;
		transition: all 0.25s;
		z-index: 999;
		background: #fff;

		/* #ifndef MP */
		top: calc(var(--status-bar-height) + 101rpx);
		/* #endif */

		/* #ifdef MP */
		top: calc(var(--status-bar-height) + 161rpx);
		/* #endif */

		.cu-tag.z {
			top: 0px;
			right: -32.72rpx;
			font-size: 20rpx;
			padding: 19rpx 6rpx;
			transform: scale(0.8);
		}
	}

	.ad-img {
		width: 100%;
	}

	.tab-list-title {
		.img-aau {
			width: 101.81rpx;
			margin-top: 12.72rpx;
		}

		.text-right {
			.img-aau {
				margin-right: 14.54rpx;
			}
		}

		.text-left {
			.img-aau {
				margin-left: 14.54rpx;
			}
		}
	}

	.add-btn-view-box {
		position: fixed;
		z-index: 999999;
		bottom: 181.81rpx;
		right: 27.27rpx;
		width: 81.81rpx;

		.cu-btn {
			margin: auto;
			width: 81.81rpx;
			height: 81.81rpx;
			font-weight: 800;
			border-radius: 50%;
			font-size: 36.36rpx;
			border: 9.09rpx solid #fff;
			box-shadow: 0 0 14.54rpx 7.27rpx #d0d0d0;
		}
	}

	.home-box {
		// display: none;
	}

	.home-box.show {
		display: block;
	}

	.block {
		height: 420rpx;
		.video {
			width: 100%;
			height: 210rpx;
			color: #0081ff;
			image {
				max-height: 200rpx;
			}
		}
		.baojia-bar {
			width: 100%;
			height: 200rpx;
			color: #0081ff;
			background-color: #fff;
			border: 1px solid #cecece;
			border-radius: 20rpx;
			padding: 0 10rpx;
			.process-info {
				//box-shadow: 0px 0px 10rpx 0px rgba(136, 136, 136, 0.5);
				color: #929292;
				padding: 20rpx 10rpx;

				.model {
					font-size: 28rpx;
					color: #323232;
					font-weight: bold;
				}

				.price {
					font-size: 28rpx;
					color: #f48d31;
					font-weight: bold;
				}

				.btn {
					height: 46rpx;
					font-size: 24rpx;
					line-height: 46rpx;
					//text-align: center;
					//color: #D0D7E2;
					//box-shadow: 0px 0px 10rpx 0px rgba(136, 136, 136, 1);
					//background-color: #0F366F;
					//padding: 2rpx 6rpx;
					//border-radius: 20rpx;
				}

				.line {
					height: 30rpx;
					background-color: #929292;
					padding: 0 1rpx;
					margin-left: -20rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	.block-1,
	.block-2 {
		margin-left: 6rpx;
		margin-right: 6rpx;
		width: 50%;
	}
</style>
