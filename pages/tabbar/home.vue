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
		<!-- <view class="swiper-background-box show">
			<view class="swiper-background"></view>
		</view> -->

		<!-- <view class="tab">
			<view class="second" @tap="checkView(1)">二手</view>
			<view class="new" @tap="checkView(2)">全新</view>
		</view> -->
		<!-- <view v-if="newViews">
			<newView @checkView="checkView"></newView>
		</view> -->
		<view>
			<secondView @checkView="checkView" :goodsData="goodsData" @checkBrandId="checkBrandId"></secondView>
		</view>
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
	import newView from './components/new.vue';
	import secondView from './components/second.vue';
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
		ProductLists,
		CategoryAll,
		BrandList,
		ProductFuscreen,
		ProductFulists,
	} from '@/api/mall.js';
	import {
		kefuInitUser
	} from '@/api/user.js';
	import {
		secondGoodsList
	} from '@/api/malls.js';
	export default {
		name: 'home',
		components: {
			newView,
			secondView,
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
		onShow() {
			this.getProduct()
			this.$nextTick(() => {
				let address = uni.getStorageSync('address');
				console.log(address, 3333333333)
			});
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
					let parmas = {
						model: that.phoneModel,
					};
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
			checkBrandId(e) {
				this.goodsData = []
				this.bandId = e != 0 ? e : null;
				this.getProduct()
			},
			checkView(e) {
				if (e === 'new') {
					this.newViews = true;
				} else {
					this.newViews = false;
				}
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
							let code = res.result;
							setTimeout(() => {
								uni.navigateTo({
									url: res.result,
								});
							}, 1000);
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
			},
			// 获取产品列表
			getProduct() {
				let that = this;
				let params = {
					firstFlag: that.firstFlag,
					bandId: that.bandId
				};
				secondGoodsList(params)
					.then((res) => {
						console.log(res.data, '3333333333')
						let data = res.data;
						that.goodsData.push(...data);
						this.firstFlag = false;
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
					url: '/pages/goods/goods?id=' + e.data.product_id,
				});
			},
			liveListTap(e) {},
			videoListTap(e) {},
			gridSortTap(e) {
				// 点击品牌
				uni.navigateTo({
					url: '/pages/home/sort_list?sid=' + e.data.id + '&bid=' + this.headTab.TabCatID + '&cid=' + e.data
						.category_id,
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
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
				const res = await this.$api.checkLogin();
				// if (res) {
				// 	console.log(this.userInfo)
				// 	const isNew  = uni.getStorageSync('isNew')
				// 	const res = await kefuInitUser({
				// 		userId: this.userInfo.user_id,
				// 		isNew,
				// 		isHome: 1
				// 	})
				// 	if (res.code === 1) {
				// 		uni.navigateTo({
				// 			url: '/pages/chat/chat',
				// 		});
				// 	}
				// }
			},
			// 联系客服
			btnClick() {
				this.kefuInitUser();
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

		.search-box {
			position: relative;

			.search-form {
				.sbtn {
					height: 32px;
					line-height: 32px;
					position: absolute;
					right: 37px;
					background-image: linear-gradient(90deg, #ff6868 0%, #ea1515 100%);
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