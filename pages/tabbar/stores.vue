<template>
	<view class="stores-box">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false" @rightTap="barTitleRightTap">
			<block slot="content">门店列表</block>
		</bar-title>
		<view class="cur-city-row">
			<view class="cur-block">当前城市：
				<text @click="chooseCity">{{city.name}}<text class="lg text-gray iconfont icon-jiantouxiangxia"></text></text>
			</view>
		</view>
		<view class="cu-card article">
			<view style="padding: 15rpx 20rpx; position: relative;" v-for="(item,index) in storeList" v-if="index == 0"
				class="max">
				<image :src="$httpImage + item.photo" mode="widthFix"
					style="width: 218rpx;border-radius: 11rpx; position: absolute;right: 40rpx; top: 0rpx;"></image>
				<view class="max_title">
					{{item.storeName}}
				</view>
				<view class="max_time">
					{{item.businessHours}}
				</view>
				<view class="max_background">
					<view class="max_photo">
						{{item.linkPhonenumber}}
					</view>
					<view class="flex justify-between">
						<view>{{item.location}}</view>
						<view>距离<text> {{item.distance.toFixed(2)}}km</text></view>
					</view>
					<image src="/static/mendian.png" mode="widthFix"></image>
				</view>
				<view class="bg-white max_background_white">
					<view class="max_button">呼叫客服</view>
				</view>
			</view>
			<view class="margin-bottom-xs cu-item bg-white listItem" v-for="(item,index) in storeList">
				<view class="content" @click="gostoreInfo(item)" v-if="index !== 0">

					<view class="desc" style="padding: 26rpx 30rpx;">
						<view class="title flex justify-between" style="margin-bottom: 8rpx;">
							<view class="text-cut">
								{{item.storeName}}
							</view>
							<view class="right">
								<view class="text-sm text1" v-if="item.km !== '99999'" style="margin-bottom: 4rpx;">
									距离<text> {{item.distance.toFixed(2)}}km</text>
								</view>
							</view>
						</view>
						<view class="text-content text-bold">
							<!-- 							<view class="count" style="margin-bottom: 10rpx;">
								<text class="text-red"> {{item.onSellCount}} 款在售机型</text>
							</view> -->
							<view class="flex" style="margin-top: 5rpx;">
								<image :src="$httpImage + item.photo" mode="aspectFill"></image>
								<view class="" style="margin-left: 17rpx;">
									<image src="/static/huishou2.png" mode="heightFix" style="height: 32rpx;margin-bottom: 10rpx;">
									</image>
									<view class="text1">
										<view class="">
											{{item.linkPeople}}
											{{item.linkPhonenumber}}
										</view>
										<view class="">
											{{item.location}}
										</view>
									</view>
								</view>
							</view>
							<view class="fuwu">
								<view>特色服务</view>
								<view>以旧换新 | 周边配件|手机贴膜 | iPhone贴膜 | 隐私清 除 | 数据迁移</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!-- 下拉加载提示 -->
		<uni-load-more :status="uLoadMore.status" :contentText="uLoadMore.contentText"></uni-load-more>

		<!--客服悬浮球-->
		<view class="kefu">
			<drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" />
		</view>
		<footer-tabbar :tabID='1' :msgDot='true' />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';
	import {
		selectStoreByCityId,
	} from "@/api/commons.js"

	import barTitle from '@/components/common/basics/bar-title';

	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		name: 'stores',
		components: {
			barTitle,
			footerTabbar
		},
		data() {
			return {
				city: {
					id: null,
					name: '三亚市', // 默认城市
					longitude: '109.508268',
					latitude: '18.247872',
				},
				query: {
					page: 1,
					pageSize: 10,
				},
				storeList: [], // 门店列表
				getCityExeced: 0, // 获取当前城市是否已调用

				uLoadMore: {
					status: 'more',
					contentText: {
						"contentdown": "加载更多数据",
						"contentrefresh": "加载中...",
						"contentnomore": "暂无更多数据"
					},
				},
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('进入下拉刷新');
			this.query.page = 1 // 重置分页
			this.uLoadMore.status = 'more' // 重置加载更多组件状态
			this.storeList = [] // 清空门店列表
			this.getStoreList(function() {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			console.log('onReachBottom')
			if (this.uLoadMore.status == 'noMore') return false
			this.getStoreList();
		},
		onLoad() {
			console.log('onLoad')

		},
		onShow() {
			console.log('onShow')
			// // if (this.getCityExeced > 0) {
			// // 获取当前存储的选择城市
			// let cityInfo = uni.getStorageSync('storeByCity')
			// console.log(cityInfo)
			// if (cityInfo) {
			// 	console.log(cityInfo.cityName);
			// 	console.log(this.city.name);
			// 	if (cityInfo.cityName !== this.city.name) {
			// 		// 选择的城市与当前页面城市不一致才去请求，重新获取门店
			// 		// 重新请求store列表接口
			// 		console.log('getStorageSync storeByCity =>', cityInfo)
			// 		this.city.cityId = cityInfo.cityId
			// 		this.city.name = cityInfo.cityName
			// 		this.query.page = 1 // 重置分页
			// 		this.uLoadMore.status = 'more' // 重置加载更多组件状态
			// 		this.storeList = [] // 清空门店列表
			// 		this.getStoreList()
			// 	}
			// }
			// // }
			let type = 'gcj02'
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success: function(res) {
					if (res.osName == 'ios') {
						type = 'wgs84'
					} else {
						type = 'gcj02'
					}
				}
			});
			// #endif
			// 通过定位获取城市，再通过城市获取对应门店列表
			uni.getLocation({
				type: type,
				geocode: true, // 设置该参数为true可直接获取经纬度及城市信息-仅app端支持
				complete: (res) => {
					console.log(res)
					if (res.errCode === undefined && res.address.city) {
						// 获取当前定位城市
						console.log('定位------->', res)
						this.city.name = res.address.city
						this.city.longitude = res.longitude
						this.city.latitude = res.latitude
						uni.removeStorageSync('storeByCity')
						uni.setStorageSync('storeByCity', JSON.stringify({
							id: 0,
							name: res.address.city,
							longitude: res.longitude,
							latitude: res.latitude,
						}))
					} else {
						// 获取不到将使用默认城市
						uni.showToast({
							title: '获取当前城市失败，将使用默认城市信息',
							icon: 'none'
						});
					}
					this.getCityExeced = 1 // 已经执行了获取当前城市的api接口

					this.getStoreList()
					// this.getDataList();
				}
			});
			this.getStoreList()

		},
		mounted() {
			_tool.setBarColor(true);
			// uni.pageScrollTo({
			// 	scrollTop: 0,
			// 	duration: 0
			// });
		},
		methods: {
			getStoreList(callback) {
				// 请求接口获取门店列表
				selectStoreByCityId({
					cityId: this.city.cityId,
				}).then((res) => {
					this.storeList = res.data
				}).catch((err) => {}).finally((res) => {
					// 请求响应后的回调
					if (typeof callback === 'function') {
						callback()
					}
				})

			},
			// 去门店详情
			gostoreInfo(item) {
				uni.navigateTo({
					url: '/pages/stores/goods?id=' + item.storeId
				})
				uni.setStorageSync('storeItem', item)
			},
			// //页面被滚动
			// setPageScroll(scrollTop) {
			// 	//console.log(scrollTop);
			// },
			// //触底了
			// setReachBottom() {
			// 	console.log('触底了');
			// },
			barTitleRightTap() {
				console.log('标题栏右边被点击');
			},
			// getDataList() {
			// 	let that = this;
			// 	let paramsData = that.queryInfo;
			// 	paramsData['latitude'] = that.latitude
			// 	paramsData['longitude'] = that.longitude
			// 	console.log('paramsData', paramsData);
			// 	storelist(paramsData).then(res => {
			// 			let data = res.data.data;
			// 			if (data) {
			// 				//判断是触底加载还是第一次进入页面的加载
			// 				data.map((item,index)=>{
			// 					item.km = that.getBit(item.km)
			// 				})
			// 				if (that.ifBottomRefresh) {
			// 					that.dataList = that.dataList.concat(data)
			// 				} else {
			// 					that.dataList = data
			// 				}
			// 				that.ifBottomRefresh = false
			// 				that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
			// 			}
			// 		})
			// 		.finally(() => {
			// 			uni.stopPullDownRefresh();
			// 		})
			// },
			// getBit(value, bit = 3) {
			// 	let str = value.toString();
			// 	let strIndex = str.indexOf('.');
			// 	if (strIndex === -1) return str;
			// 	str = str.substring(0, strIndex + bit);
			// 	// console.log(str, bit);
			// 	return str;
			// },
			gocateFuc(type) {
				console.log(type);
				uni.setStorageSync('cattype', type);
				uni.navigateTo({
					url: '/pages/recycling/classify'
				})
			},
			// 联系客服
			btnClick() {
				console.log('球被点击');
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			},
			// 选择城市
			chooseCity() {
				uni.navigateTo({
					url: '/pages/common/city?id=' + this.city.id + '&name=' + this.city.name,
					complete: (res) => {
						console.log(res);
					}
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";

	@import "@/uni_modules/mpb-ui/shop/sort_list.scss";

	page {
		background-color: #f4f4f4;
	}

	.max {
		image {
			margin-top: 17rpx;
			margin-bottom: -5px;
			width: 100%;
		}

		.max_background_white {
			padding: 24rpx 11rpx;

			.max_button {
				background: #FEEB39;
				border-radius: 40rpx;
				height: 78rpx;
				line-height: 78rpx;
				text-align: center;
				font-size: 31rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #35372C;
			}
		}

		.max_title {
			font-size: 31rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #101010;
			line-height: 42rpx;
		}

		.max_time {
			margin-top: 10rpx;
			font-size: 23rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #101010;
			line-height: 32rpx;
		}

		.max_background {
			overflow: hidden;
			margin-top: 26rpx;
			background: #FFEE68;
			border-radius: 11rpx 11rpx 0rpx 0rpx;
			padding: 34rpx 20rpx;
			padding-bottom: 0rpx !important;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #101010;
			line-height: 34rpx;
		}

		.max_photo {
			margin-bottom: 22rpx;
		}
	}

	.fuwu {
		display: flex;
		margin-top: 26rpx;

		view:nth-child(1) {
			width: 160rpx !important;
			font-size: 23rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #696969;
			line-height: 32rpx;
		}

		view:nth-child(2) {
			font-size: 23rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #696969;
			line-height: 32rpx;
		}
	}

	.text1 {
		font-size: 21rpx !important;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400 !important;
		color: #8E8E8E !important;
	}

	.listItem {
		// border: 0.5px solid rgba(213, 218, 223, 1);
		// border-radius: 6px;
		padding: 0px !important;

		.content {
			image {
				margin-left: 0px !important;
				width: 119rpx;
				height: 115rpx;
				border-radius: 0px !important;
			}

			.desc {
				justify-content: center !important;

				.count {
					font-size: 25rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FF3A31;
				}
			}
		}
	}

	.stores-box {
		width: 100%;

		// display: none;
		.follow-box {
			.action-text-cut {
				width: 70%;
			}
		}

		.grid-menu {
			.cu-list.grid.no-border>.cu-item {
				.cu-avatar {
					margin: 0 auto;
				}
			}
		}

		.cu-card.article>.cu-item {
			padding-top: 20rpx;
			padding-bottom: 20rpx;

			.cate-box {
				width: 100%;

				.scroll-view_H {
					width: 100%;
					height: 160rpx;
					white-space: nowrap;
				}

				.img {
					width: 205rpx;
					height: 154rpx;
					// padding: 20rpx;
					margin-right: 20rpx;
					border: 1px solid #ccc;
					border-radius: 10rpx;
					display: inline-block;
				}
			}
		}

		.cu-card.article>.cu-item .content>uni-image {
			width: 200rpx;
			height: 200rpx;
			margin-left: 10px;
			border-radius: 15rpx;
			border: 1px solid #ccc;
		}

		.cu-card.article>.cu-item .title {
			padding: 20rpx 0 0 0;
			line-height: 30rpx;
			font-size: 30rpx;
			color: #333
		}

		.cu-card.article>.cu-item .content {
			padding: 0;
		}

		.cu-card.article>.cu-item .content .text-content {
			height: auto;
			color: #333;
			font-size: 20rpx;
			font-weight: normal;
			line-height: 32rpx;
		}

		.cu-card.article>.cu-item .content .right {
			display: flex;
			justfy-content: center;
			align-items: center;

			.more {
				font-size: 42rpx;
			}
		}
	}

	.stores-box.show {
		display: block;
	}

	.cur-city-row {
		margin: 20rpx;
	}
</style>