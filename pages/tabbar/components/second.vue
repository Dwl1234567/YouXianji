<template>
	<view class="home-box">
		<!--欢迎-->
		<!-- <welcome-tip
			:content="appMode.tips+'，'+userInfo.nickname"
			:show="true"
			:c_s="3000"
			@closeFinish="welcomeClose"
		></welcome-tip> -->

		<!--营销块背景-->
		<view class="swiper-background-box show">
			<view class="swiper-background"></view>
		</view>
		<!--头部轮播背景-->
		<!-- <swiper-background :list_data="swiperInfo.list" :indexs="swiperInfo.index" :show="swiperInfo.show"
			:welcome="swiperInfo.welcome"></swiper-background> -->

		<view class="head-search-box" :class="" :style="">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center margin-top-sm small-routine-title">首页</view>
			<!-- #endif -->
			<view class="tab">
				<view @tap="checkView('second')" class="tab-item" :class=" !newViews ? 'option': ''">二手商城</view>
				<!-- <view @tap="checkView('new')" class="tab-item" :class="newViews ? 'option': ''">全新商城</view> -->
			</view>
			<!--搜索框-->
			<view class="cu-bar search search-box">
				<view class="search-form round" @tap="searchTap">
					<!-- <text class="cuIcon-search"></text> -->
					<text>iPhone 13 Pro</text>
					<view class="sbtn cu-btn btn bg-red radius-4">搜索</view>
				</view>
				<text class="iconfont icon-saomiao" @tap="snTap" style="margin-right: 15px;" />
			</view>

			<!--选项卡-->
			<view class="nav-box flex-tab show">
				<view class="flex">
					<view class="basis-xxl">
						<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="headTab.scrollLeft">
							<block v-for="(item,index) in headTab.list" :key="index">
								<view class="cu-item" :class="index==headTab.TabCur?'select':''" @tap="tabSelect" :data-index="index"
									:data-id="item.id">
									<view>{{item.name}}</view>
									<view class="tab-dot bg-white"></view>
								</view>
							</block>
						</scroll-view>
					</view>
					<view class="basis-xs flex" @tap="sortVueTap">
						<!-- 					<view class="sort-icon">
							<text class="cuIcon-sort"></text>
						</view> -->
						<view style="line-height: 60rpx">分类</view>
					</view>
				</view>
			</view>
		</view>

		<!--中间内容区域-->
		<view class="view-content" :class="[headTab.TabCur==0?'show':'']">
			<!--滑动菜单-->
			<!-- 123 -->
			<!-- <uni-steps :options="[{title: '事件一'}, {title: '事件二'}, {title: '事件三'}, {title: '事件四'}]" :active="1"></uni-steps> -->
			<view class="padding-sm">
				<grid-menu-list :list_data="gridMenuData" @listTap="gridMenuTap" />
			</view>

			<!--轮播、报价条、短视频-->
			<view class="padding-lr-sm padding-bottom-sm" style="position: relative">
				<view class="flex block">
					<view class="flex-sub block-1 radius">
						<!--轮播-->
						<view class="swiper-box">
							<swiper class="screen-swiper square-dot c" autoplay circular indicator-dots :current="swiperInfo.index"
								@change="swiperChange">
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
								<image class="" src="https://storage.youxianji.cc/images/20221012172029634686dd87fb7.png"
									mode="widthFix" />
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
										<text class="padding-lr-xl btn radius-4" @click="goevaluation()">立即估价</text>
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

			<view class="padding-lr-sm bg-white products">
				<view class="products-item">
					<image src="/static/home/1.svg"></image>
					<text>正品保障</text>
				</view>
				<view class="products-item">
					<image src="/static/home/2.svg"></image>
					<text>极速发货</text>
				</view>
				<view class="products-item">
					<image src="/static/home/3.svg"></image>
					<text>售后无忧</text>
				</view>
				<!-- <image class="" src="/static/home/baozhang.png" mode="widthFix" style="width: 100%; height: auto" /> -->
			</view>
			<!-- 			<u-sticky offset-top="90"> -->
			<filterDropdown ref="filterDropdown" :menuTop="filtertopnum" :filterData="shopownerFilterData"
				:defaultSelected="defaultSelected" :updateMenuName="true" @confirm="confirm" dataFormat="Object">
			</filterDropdown>
			<!-- </u-sticky> -->

			<view class="tab-list">
				<!--商品列表-->
				<goods-list :list_data="goodsData" @listTap="goodsListTap"
					:show="goodsTabData.TabCur!=3 && goodsTabData.TabCur!=4?true:false"></goods-list>
			</view>

			<!--占位底部距离-->
			<view class="cu-tabbar-height"></view>
		</view>
		<!--中间内容区域-分类-->

		<view class="view-content" :class="headTab.TabCur!=0?'show':''">
			<!--宫格分类-->
			<grid-sort-list :list_data="modelList" @listTap="gridSortTap"></grid-sort-list>

			<!--广告-->
			<!-- <view class="margin">
				<image class="ad-img" :src="swiperInfo.list[0].image" mode="widthFix"></image>
			</view> -->

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
		<modal-img :show="modalShow" src="/static/delect_images/home/sundry/reward.png" @imgTap="imgTap"
			@closeTap="closeTap"></modal-img>

		<!--返回顶部-->
		<view class="add-btn-view-box">
			<!--返回顶部-->
			<button v-if="gotopstatus" class="cu-btn cuIcon-top bg-red" @tap="goToTap"></button>
		</view>
		<!--客服悬浮球-->
		<!-- <view class="kefu">
			<drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" />
		</view> -->
		<!--底部导航-->
		<!-- <footer-tabbar :tabID="0" :msgDot="true" /> -->
	</view>
</template>

<script>
	// 底部tabbar
	// import footerTabbar from './components/footer-tabbar.vue';

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
	import filterDropdown from '@/components/HM-filterDropdownNew/HM-filterDropdown.vue'; //旧筛选组件
	//======================================================================
	import _home_data from '@/static/data/home.js'; //虚拟数据
	import _tool from '@/utils/tools.js';
	// 接口
	import {
		ProductLists,
		CategoryAll,
		BrandList,
		ProductFuscreen,
		ProductFulists,
	} from '@/api/mall.js';
	// 接口
	import {
		secondGoodsList,
		bindDistributionRelation,
		getAllBrand,
		getSeriesList
	} from '@/api/malls.js';
	import {
		kefuInitUser
	} from '@/api/user.js';
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
			// footerTabbar,
			filterDropdown,
			gridSortList,
			modalImg,
		},
		props: {
			goodsData: {
				type: Array,
				default: '',
			},
		},
		data() {
			return {
				shopownerFilterData: [{
						name: '综合排序',
						type: 'hierarchy',
						submenu: [{
								name: '综合排序', //全部设为默认，选中时标签栏显示为全部
								value: null,
							}, {
								name: '价格由低到高', //全部设为默认，选中时标签栏显示为全部
								value: '1',
							},
							{
								name: '价格由高到低',
								value: '2',
							}
						],
					},
					{
						name: '价格区间',
						type: 'hierarchy',
						submenu: [{
								name: '不限价格',
								value: null,
							}, {
								name: '0-1000',
								value: '0',
							},
							{
								name: '1001-3000',
								value: '1',
							},
							{
								name: '3001-6000',
								value: '2',
							},
							{
								name: '6000+',
								value: '3',
							},
						],
					},
					{
						name: '商品成色', //选择
						type: 'hierarchy',
						submenu: [{
								name: '不限成色', //设为默认
								value: null,
							}, {
								name: '99成新', //设为默认
								value: '0',
							},
							{
								name: '95成新', //设为默认
								value: '2',
							},
							{
								name: '9成新', //设为默认
								value: '3',
							},
							{
								name: '9成新以下', //设为默认
								value: '4',
							},
						],
					},
				],
				defaultSelected: [],
				filtertopnum: '391', //筛选条高度
				modelList: [],
				firstFlag: true,
				newViews: true,
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
				// goodsData: [],
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
		created() {
			// 储存isNew值 1为全新0为二手
			uni.setStorageSync('isNew', 1);
			let that = this;
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				this.userInfo = userInfo;
			}

			this.swiperInfo.list = _home_data.swiper();
			this.gridMenuData = _home_data.nav();
			this.goodsTabData.list = _home_data.goodsTab();

			uni.getSystemInfo({
				success: function(res) {
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
				},
			});
			this.headInfo.Class = 'welcome';
			// 427
			this.loadData();
		},
		onShow() {},
		onLoad() {},
		onPullDownRefresh() {
			this.pageIndex = 1;
			this.getProduct();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return;
			this.pageIndex += 1;
			this.getProduct();
		},
		onPageScroll(e) {
			console.log(e)
		},
		methods: {
			scorllTop() {
				const query = uni.createSelectorQuery()
				query
					.select('.filterDropdown')
					.boundingClientRect((data) => {
						console.log(data, 'data')
						let pageScrollTop = Math.round(data.top)
						// uni.pageScrollTo({
						// 	scrollTop: pageScrollTop, //滚动的距离
						// 	duration: 0, //过渡时间
						// })
					})
					.exec()
			},
			confirm(e) {
				const query = {
					orderRule: e.value[0][0],
					priceBetween: e.value[1][0],
					conditionInfo: e.value[2][0]
				}

				this.$emit('search', query)
			},
			checkView(e) {
				if (e === 'new') {
					uni.setStorageSync('isNew', 1);
				} else {
					uni.setStorageSync('isNew', 2);
				}
				this.$emit('checkView', e);
			},
			snTap() {
				console.log('扫描二维码获取序列号筛选结果');
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: function(res) {
						// 微信小程序
						if (res.errMsg == 'scanCode:ok') {
							// 扫描到的信息
							console.log(res.result, 'res.result')
							const data = JSON.parse(res.result)
							console.log(data, '22222222222222222222222222')
							if (data.way == 1) {
								setTimeout(() => {
									uni.navigateTo({
										url: data.url,
									});
								}, 1000);
							} else if (data.way == 2) {

								console.log('分享人')
								that.bindingUsers(data.parentId)
							}

							// that.erpproductSnDataFuc();
						} else {
							uni.$u.toast('未识别到二维码，请重新尝试！');
						}
					},
				});
			},
			bindingUsers(item) {
				bindDistributionRelation({
					parentId: Number(item),
				})
			},
			// 页面基本数据请求
			loadData() {
				let that = this;
				getAllBrand({}).then((res) => {
					let data = [{
						id: '0',
						name: '首页',
					}, ];
					res.data.map(item => {
						item.id = item.brandId
						item.name = item.brandName
					})
					data.push(...res.data);
					that.headTab.list = data;
				});

				// this.getProduct();
			},
			// 获取产品列表
			// getProduct() {
			// 	let that = this;
			// 	let params = {
			// 		firstFlag: this.firstFlag,
			// 	};
			// 	secondGoodsList(params)
			// 		.then((res) => {
			// 			let data = res.data;
			// 			that.goodsData.push(...data);
			// 			this.firstFlag = false;
			// 		})
			// 		.finally(() => {
			// 			uni.stopPullDownRefresh();
			// 		});
			// },
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
				// this.getProduct();
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
				this.$emit('checkBrandId', cid)
				getSeriesList({
					brandId: cid
				}).then(res => {
					this.modelList = res.data
				})
				// that.gridSortData = [];
				// this.initgridSortData.map((mmp) => {
				// 	if (mmp.pid == cid) {
				// 		that.gridSortData.push(mmp);
				// 	}
				// });
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
			identifyTap(e) {},
			quicklyTap(e) {},
			activityTap(e) {},
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
					url: '/pages/goods/goods?id=' + e.data.goodsId + '&isNew=false',
				});
			},
			liveListTap(e) {},
			videoListTap(e) {},
			gridSortTap(e) {
				// 点击品牌
				uni.navigateTo({
					url: '/pages/home/sort_list?seriesId=' + e.data.seriesId + '&seriesName=' + e.data.seriesName,
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
			},
			closeTap() {
				this.modalShow = false;
			},
			sortVueTap() {
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
			async kefuInitUser() {
				const res = await kefuInitUser({});
			},
			// 联系客服
			btnClick() {
				this.kefuInitUser();
				console.log('球被点击');
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.products {
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		.products-item {
			display: flex;
			align-items: center;

			image {
				margin-right: 5px;
				width: 20px;
				height: 20px;
			}

			text {
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #101010;
				font-weight: 400;
			}
		}
	}

	.head-search-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999;
		padding-top: var(--status-bar-height);
		transition: top 0.25s;
		padding-bottom: 10rpx;

		.tab {
			margin-top: 20px;
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			.tab-item {
				font-size: 19px;
				color: #101010;
				font-weight: 400;
			}

			.option {
				font-size: 23px;
				color: #101010;
				font-weight: 500;
			}
		}

		.search-box {
			position: relative;

			.search-form {
				border: 1px solid rgba(255, 193, 73, 1);

				.sbtn {
					height: 32px;
					line-height: 32px;
					position: absolute;
					right: 83rpx;
					background-image: linear-gradient(90deg, #f3c81a 0%, #ffb629 100%);
				}

				text {
					font-family: PingFangSC-Regular;
					font-size: 17px;
					color: #8e8e8e;
					font-weight: 400;
					position: absolute;
					left: 25px;
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

					.nav {
						padding-left: 10px;
					}
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
		top: 144px;
		display: none;
		transition: 0s;

		.swiper-background {
			position: absolute;
			height: 888rpx;
			width: 100%;
			opacity: 0.1;
			top: 144px;
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
		margin-top: calc(var(--status-bar-height) + 30rpx + 125px);
		/* #endif */

		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 70rpx + 102px);
		/* #endif */

		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 85rpx + 102px);
		/* #endif */

		.tab-list {
			position: relative;
			width: 100%;
		}
	}

	.view-content.welcome {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 180rpx + 102px);
		/* #endif */

		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 220rpx + 102px);
		/* #endif */

		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 220rpx + 102px);
		/* #endif */

		transition: all 0.25s;
	}

	.view-content.show {
		display: block;
	}

	.swiper-box {
		width: 100%;

		.screen-swiper {
			height: 262px;

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
		height: 260px;

		.video {
			width: 100%;
			height: 127px;
			color: #0081ff;

			image {
				max-height: 127px;
			}
		}

		.baojia-bar {
			width: 100%;
			height: 127px;
			color: #0081ff;
			background-image: linear-gradient(-44deg, #fdf1ff 0%, #ccdef8 100%);
			border: 0.5px solid rgba(213, 218, 223, 1);
			border-radius: 6px;
			padding: 0 10rpx;
			text-align: center;

			.process-info {
				//box-shadow: 0px 0px 10rpx 0px rgba(136, 136, 136, 0.5);
				color: #929292;
				padding: 20rpx 10rpx;
				font-family: PingFangSC-Medium;
				font-size: 16px;
				color: #101010;
				font-weight: 500;

				.model {
					font-size: 14px;
					// color: #323232;
					// font-weight: bold;
				}

				.price {
					font-size: 20px;
					color: #f48d31;
					font-weight: bold;
				}

				.btn {
					border: 1px solid rgba(30, 129, 255, 1);
					border-radius: 4px;
					color: rgba(30, 129, 255, 1);
					font-size: 10px;
					height: 23px !important;
					line-height: 23px;
					font-weight: 400;
					width: 118px;
					display: block;
					margin: 0 auto;
					margin-top: 3px;
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