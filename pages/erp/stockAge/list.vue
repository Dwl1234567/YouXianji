<template>
	<view>
		<!-- <bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="iconfont icon-saomiao" @tap="snTap"></text>
			</block>
		</bar-search-title> -->
		<!--为上面的临时筛选条进行的临时兼容处理-->
		<view style="padding: 0px 20rpx">
			<view class="listData">
				<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
					<!-- <view class="scroll-view-item_H demo-text-1" v-for="(item, index) in urls" @tap="viewImg(urls, index)">
						<image :src="item" mode="aspectFit" style="width: 122rpx; height: 122rpx"></image>
					</view> -->
					<view class="list-item scroll-view-item_H demo-text-1"
						:class="classificationId == item.classificationId? 'check' : ''" v-for="(item,index) in listData"
						:key="index" @tap="check(item)">
						{{item.classificationName}}
					</view>
				</scroll-view>
			</view>
			<view v-for="(item, index) in dataList" style="display: flex; align-items: center; margin-bottom: 10px">
				<view class="transform" style="margin-right: 28rpx">
					<view class="radio" :class="item.disabled ? 'radio-red' : ''" @tap="radioChange(index)"></view>
				</view>
				<view class="group_3 flex-col">
					<view class="text-wrapper_1 flex-row justify-between"></view>
					<view class="section_1 flex-row">
						<view class=""></view>
						<image :src="$httpImage + item.backPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
						</image>
						<view class="text-wrapper_2 flex-col">
							<text class="text_8">{{item.modelName}} {{item.label}}</text>
							<!-- <text class="text_9">{{item.basePriceLabel}}</text> -->
							<!-- <text class="text_9">颜色：{{item.fittingsConfig.fittingsColor}}</text> -->
							<text class="text_9">序列号：{{item.deviceNo}}</text>
							<text class="text_9">销售价：{{item.sellPrice}}</text>
							<text class="text_9">库龄时长：{{item.storageAge}}天</text>
						</view>
					</view>
					<!-- <view class="group_5 flex-row justify-between"> -->
					<!-- <button class="button_2 flex-col" @tap.stop="onClick_2(item)">
							<text class="text_16">移动到整备</text>
						</button> -->
					<!-- </view> -->
				</view>
			</view>
		</view>
		<!--弹窗-->

		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		selectStorageList,
		getAllClassification,
		toReoragnize
	} from '@/api/erp.js';
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	export default {
		components: {
			barSearchTitle,
			filterDropdown,
		},
		data() {
			return {
				value: 0,
				classificationId: null,
				listData: [{
					classificationId: null,
					classificationName: '全部',
				}, ],
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh: false,
				dataList: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					contentdown: '加载更多数据',
					contentrefresh: '加载中...',
					contentnomore: '暂无更多数据。',
				},
			};
		},
		onLoad(options) {
			this.getAllClassification();
			this.getDataList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return;
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true;
			this.getDataList();
		},
		onShow() {
			let that = this;
			uni.$once('updatethird', function(data) {
				that.thirdInfo = data;
			});
		},
		methods: {
			searchTap(e) {
				console.log('搜索结果', e)
				this.storeName = e;
				this.getDataList();
			},
			snTap() {
				console.log('扫描二维码获取序列号筛选结果')
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: function(res) {
						console.log('获取到货品号，调用接口', res)
						// 微信小程序
						if (res.errMsg == "scanCode:ok") {
							// 扫描到的信息
							const data = JSON.parse(res.result)
							console.log(data.a)
							that.deviceId = data.a
							that.getDataList();
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}

					}
				});
			},
			onClick_2(item) {
				toReoragnize({
					goodsId: item.goodsId
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '移动成功',
						});
						this.getDataList();
					}
				})
			},
			// updatecustomer(item) {
			// 	uni.setStorageSync('updatecustomer', item);
			// 	uni.navigateTo({
			// 		url: '/pages/tabbarerp/push',
			// 	});
			// },
			// 切换进步
			valChange(item) {
				console.log(this.dataList);
				let info = [];
				this.dataList.map((item) => {
					if (item.value) {
						info.push(item);
					}
				});
				setTimeout(() => {
					uni.setStorageSync('updatehouse', info);
				}, 1000);

				// uni.$emit('updatehouse', info);
			},
			// 切换头部筛选
			check(e) {
				this.classificationId = e.classificationId;
				this.getDataList();
			},
			getAllClassification() {
				getAllClassification({
					storageAgeShow: 1
				}).then((res) => {
					if (res.code === 200) {
						this.listData = this.listData.concat(res.data);
					}
				});
			},
			goTap(item) {
				uni.setStorageSync('shopAdd', item);
				uni.navigateTo({
					url: '/pages/erp/shop/add',
				});
			},
			// 获取列表
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.classificationId = this.classificationId;
				selectStorageList(paramsData)
					.then((res) => {
						let data = res.rows;
						if (data) {
							// 判断是触底加载还是第一次进入页面的加载;
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data);
							} else {
								that.dataList = data;
							}
							that.ifBottomRefresh = false;
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more';
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					});
			},
		},
	};
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import '/uni_modules/colorui/main.css';
	@import '/uni_modules/colorui/icon.css';
	@import '@/uni_modules/mpb-ui/shop/app.scss';
	/* #endif */
	@import '@/static/common.css';

	page {
		background: #f0f0f0;
		padding-top: 30rpx;
		// padding: 100rpx 21rpx 0rpx 21rpx;
	}

	.group_5 {
		height: 50rpx;
		position: relative;
		justify-content: flex-end;
		/* width: 314.8854961832061rpx;
	  margin: 30.53435114503817rpx 0 0 330.1526717557252rpx; */
	}

	.button_2 {
		border-radius: 15px;
		border: 0.5px solid rgba(151, 151, 151, 1);
		padding: 7.633587786259542rpx 43.89312977099237rpx 9.541984732824428rpx 45.80152671755725rpx;
	}

	.text_16 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 24.80916030534351rpx;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 34.35114503816794rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
	}

	.scroll-view-item {
		height: 300rpx;
	}

	.scroll-view-item_H {
		margin-left: 20rpx;
		display: inline-block;
		/* width: 100%; */
		/* height: 300rpx; */
	}

	.scroll-view-item_H:first-child {
		margin-left: 0px;
	}

	.listData {
		display: flex;
		margin-bottom: 25rpx;
	}

	.list-item {
		margin-right: 30rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #8e8e8e;
		line-height: 46rpx;
	}

	.check {
		margin-right: 30rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 500 !important;
		color: #101010 !important;
		line-height: 46rpx;
	}

	.button {
		display: flex;
		justify-content: flex-end;

		view {
			min-width: 143rpx;
			height: 55rpx;
			border-radius: 29rpx;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #101010;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.receipt {
			padding: 9rpx 17rpx;
			background: linear-gradient(90deg, #ff6868 0%, #ea1515 100%);
			margin-left: 26rpx;
			color: #ffffff !important;
			border: none;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
		}
	}

	.bottomView {
		position: fixed;
		bottom: 0px;
		width: 750rpx;
		height: 191rpx;
		background: #ffffff;
		padding: 29rpx 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.transform {
		// transform: translateX(100rpx);
		display: none;
	}

	.yunShow-top {
		padding: 26rpx 28rpx 28rpx 28rpx;

		.yunShow-title {
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #232323;
			text-align: center;
		}
	}

	.yunShow-item {
		display: flex;
		align-items: center;
		margin-top: 22rpx;

		.left {
			font-size: 31rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232323;
		}

		.select {
			flex: 1;
			margin-left: 11.45rpx;
		}

		.input {
			margin-left: 11.45rpx;
			border: 1px solid #e2e2e2;
			border-radius: 11rpx;
		}

		.inputAddress {
			margin-left: 11.45rpx;
			border: 1px solid #e2e2e2;
			border-radius: 11rpx;
			flex: 1;
			padding: 9rpx 11rpx;

			.copy {
				width: 141rpx;
				height: 53rpx;
				background: #ff1a1a;
				border-radius: 27rpx;
				font-size: 27rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 53rpx;
				text-align: center;
				margin-top: 17rpx;
			}
		}
	}

	.yunShow-bottom {
		display: flex;

		view {
			width: 267rpx;
			height: 99rpx;
			line-height: 99rpx;
			flex: 1;
			text-align: center;
			border: 1px solid #d8d8d8;
			font-size: 38rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232323;
		}
	}

	.goXiu {
		width: 313rpx;
		height: 82rpx;
		background: #ff1a1a;
		border-radius: 42rpx;
		text-align: center;
		line-height: 82rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
	}

	.transformRight {
		transform: translateX(-100rpx);
	}

	.radio {
		width: 38rpx;
		height: 38rpx;
		border-radius: 38rpx;
		border: 2rpx solid #cecece;
	}

	.radio-red {
		background-color: #ff3a31;
	}

	.tips {
		justify-content: space-between;
		display: flex;

		text {
			text-align: justify;
		}
	}

	.cu-card.article>.cu-item {
		.title {
			padding: 0 0 10rpx 0;
		}

		.content {
			uni-image {
				width: 5.4em;
				height: 5.4em;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.process-box {
		width: 100%;
		padding: 0 20rpx;

		// height: 300rpx;
		.scroll-Y {
			height: auto;
			max-height: 700rpx;
		}
	}

	.hight-view {
		/* #ifndef APP-PLUS */
		height: 280rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 320rpx;
		/* #endif */
	}

	.recy-item {
		width: 100%;
		position: relative;
		padding-bottom: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #eeeeee;

		.title {
			width: 20%;
			text-align: left;
			font-size: 24rpx;
			color: #555555;
			position: absolute;
			left: 0;
		}

		.check-list-box {
			white-space: nowrap;
			overflow: hidden;
			padding-left: 20%;

			.active {
				color: #ffffff !important;
				background-color: #f03 !important;
			}

			.item {
				position: relative;
				display: inline-block;
				background-color: #eeeeee;
				color: #333333;
				width: auto;
				text-align: center;
				font-size: 24rpx;
				padding: 10rpx 20rpx;
				margin-right: 10rpx;

				.tipsbox {
					position: absolute;
					right: 0;
					top: 0;
					width: 88rpx;
					height: 88rpx;
				}

				.righticon {
					width: 80rpx;
					height: 80rpx;
					margin-top: 4rpx;
					margin-right: 4rpx;
					border-radius: 10rpx;
				}

				.tipsticon {
					width: 36rpx;
					height: 36rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	.cu-modal {
		z-index: 999;
	}

	.cu-form-group {
		min-height: 45px;
	}

	.group_3 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 6px;
		padding: 14px 11px 22px 9px;
		width: 95vw;
	}

	.text-wrapper_1 {
		width: 348px;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 12px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.text_7 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 12px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.section_1 {
		position: relative;
	}

	.box_5 {
		border-radius: 6px;
		// background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/4240095d9d5a4c4b9180ad3ce22071cd_mergeImage.png);
		width: 79px;
		height: 79px;
		margin-top: 5px;
	}

	.text-wrapper_2 {
		margin: 5px 0 0 8px;
	}

	.text_8 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 15px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 15px;
	}

	.text_9 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 67px 0 0;
	}

	.text_10 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 31px 0 0;
	}

	.text_11 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 9px 29px 0 0;
	}

	.tag_1 {
		background-color: rgba(235, 246, 255, 1);
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.tag_33 {
		background-color: #e5fcf1;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_33 {
		overflow-wrap: break-word;
		color: #00c082;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.text_12 {
		overflow-wrap: break-word;
		color: rgba(17, 144, 214, 1);
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.text_13 {
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 14px;
		margin: 20px 250px 0 0;
	}
</style>