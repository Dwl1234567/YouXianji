<template>
	<view>
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<!-- <text class="cuIcon-scan" @tap="snTap" /> -->
				<text class="iconfont icon-saomiao" @tap="snTap"></text>
			</block>
		</bar-search-title>
		<scroll-view scroll-x class="bg-white nav text-center text-xl">
			<view class="cu-item padding-lr-sm " :class="1==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="1" style="position:relative">
				产品
				<view class="tab-dot bg-white"></view>
			</view>
			<!-- <view class="cu-item padding-lr-sm" :class="2==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="2" style="position:relative">
				已接受
				<view class="tab-dot bg-white"></view>
			</view> -->
			<view class="cu-item padding-lr-sm" :class="3==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="3" style="position:relative">
				价格
				<view class="tab-dot bg-white"></view>
			</view>
		</scroll-view>
		<!--为上面的临时筛选条进行的临时兼容处理-->
		<view style="">
			<view class="listData">
				<view class="list-item" :class="topWarehouseId == item.configId? 'check' : ''" v-for="(item,index) in listData"
					:key="index" @tap="check(item)" v-if="TabCur == 1">
					{{item.warehouseName}}
				</view>
				<view class="list-item" :class="topWarehouseId == item.configId? 'check' : ''" v-for="(item,index) in listDatas"
					:key="index" @tap="check(item)" v-if="TabCur == 3">
					{{item.warehouseName}}
				</view>
			</view>
			<view class="table" v-if="TabCur == 1">
				<view class="header" style="padding-top: 20rpx; padding-bottom: 20rpx">
					<view class="tab_1">名称</view>
					<view class="tab_2"></view>
					<view class="tab_2">低</view>
					<view class="tab_2"></view>
					<view class="tab_2">中</view>
					<view class="tab_2"></view>
					<view class="tab_2">高</view>
					<view class="tab_2"></view>
				</view>
				<view v-for="(item, index) in dataList"
					style="display: flex; align-items: center; padding-bottom: 10rpx; padding-top: 10rpx; border-top: 1px solid #D8D8D8"
					class="list">
					<view class="tab_1">{{item.modelName}}</view>
					<view class="tab_2">
						<view class="blue" v-if="item.countInventory <= item.count10day">
							{{item.countInventory}}
						</view>
					</view>
					<view class="tab_2">
						<view class="red">{{item.count10day}}</view>
					</view>
					<view class="tab_2">
						<view class="blue" v-if="item.countInventory > item.count10day && item.countInventory <= item.count15day">
							{{item.countInventory}}
						</view>
					</view>
					<view class="tab_2">
						<view class="green">{{item.count15day}}</view>
					</view>
					<view class="tab_2">
						<view class="blue" v-if="item.countInventory > item.count15day && item.countInventory <= item.count20day">
							{{item.countInventory}}
						</view>
					</view>
					<view class="tab_2">
						<view class="red">{{item.count20day}}</view>
					</view>
					<view class="tab_2">
						<view class="blue" v-if="item.countInventory > item.count20day">
							{{item.countInventory}}
						</view>
					</view>
				</view>
			</view>
			<view v-if="TabCur == 3" class="table">
				<view class="header" style="padding-top: 20rpx; padding-bottom: 20rpx">
					<view class="tab_1">名称</view>
					<view class="tab_2">排序</view>
				</view>
				<view v-for="(item, index) in dataLists"
					style="display: flex; align-items: center; padding-bottom: 10rpx; padding-top: 10rpx; border-top: 1px solid #D8D8D8"
					class="list">
					<view class="tab_1">{{item.modelName}}</view>
					<view class="tab_2">
						<view class="red">{{item.sellCount}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
	<!--弹窗-->

	<!-- 下拉加载提示 -->
</template>

<script>
	import Vue from 'vue';
	import {
		selectSuggestInventoryCount,
		selectModelSellRankCount
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
				TabCur: 1,
				topWarehouseId: 0,
				listData: [{
						configId: 0,
						warehouseName: '手机类',
					},
					{
						configId: 1,
						warehouseName: '平板类',
					}, {
						configId: 2,
						warehouseName: '电脑类',
					},
				],
				listDatas: [{
						configId: 0,
						warehouseName: '0-999',
					},
					{
						configId: 1,
						warehouseName: '1000-2999',
					}, {
						configId: 2,
						warehouseName: '3000-5999',
					}, {
						configId: 3,
						warehouseName: '6000+',
					}
				],
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh: false,
				dataList: [],
				dataLists: [],
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
			tabSelect(e) {
				// console.log(e);
				// if (this.TabCur != e.currentTarget.dataset.id) {
				// 	// 进入页面刷新

				// }
				if (e.currentTarget.dataset.id == 1) {
					this.getDataList()
				} else if (e.currentTarget.dataset.id == 3) {
					this.getDataLists()
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 切换头部筛选
			check(e) {
				this.topWarehouseId = e.configId;
				this.getDataList();
			},
			selectTopWarehouseList() {
				selectTopWarehouseList().then((res) => {
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
				paramsData.classificationStr = this.topWarehouseId;
				selectSuggestInventoryCount(paramsData)
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
			// 获取列表
			getDataLists() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.classificationStr = this.topWarehouseId;
				selectModelSellRankCount(paramsData)
					.then((res) => {
						let data = res.data;
						if (data) {
							that.dataLists = data;
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
		// padding: 100rpx 21rpx 0rpx 21rpx;
	}

	.header {
		display: flex;
		width: 100%;

		view {
			text-align: center;
		}

		.tab_1 {
			flex: 3;
		}

		.tab_2 {
			flex: 1;
		}
	}



	.table {
		margin: 26rpx;
		background: #FFFFFF;
		border-radius: 11rpx;
		border: 1rpx solid #D5DADF;

		.list {
			text-align: center;

			.tab_1 {
				flex: 3;
			}

			.tab_2 {
				flex: 1;

				.blue {
					width: 52rpx;
					height: 52rpx;
					background: #1190D6;
					color: white;
					border-radius: 52rpx;
					line-height: 52rpx;
					margin: 0 auto;
				}

				.red {
					width: 52rpx;
					height: 52rpx;
					background: #FD4C4C;
					color: white;
					border-radius: 52rpx;
					line-height: 52rpx;
					margin: 0 auto;
				}

				.green {
					margin: 0 auto;
					width: 52rpx;
					height: 52rpx;
					background: #00C082;
					color: white;
					border-radius: 52rpx;
					line-height: 52rpx;
				}
			}
		}

	}

	.listData {
		display: flex;
		margin-bottom: 25rpx;
		background-color: white;
		padding: 0 20rpx;
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
			border: 1px solid #979797;
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
		margin: 9px 11px 0 0;
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