<template>
	<view>
		<!-- <filterDropdown ref="filterDropdown" :menuTop="filtertopnum" :filterData="filterData"
			:defaultSelected="defaultSelected" :updateMenuName="true" @confirm="confirm" @change="changefilter"
			dataFormat="Object"></filterDropdown> -->
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<!-- <block slot="right">
					<text class="iconfont icon-saomiao" @tap="snTap"></text>
				</block> -->
		</bar-search-title>
		<scroll-view scroll-x class="bg-white nav text-center text-xl">
			<view class="cu-item padding-lr-sm" :class="1==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="1" style="position: relative">
				线下回收
				<view class="tab-dot bg-white"></view>
			</view>
			<view class="cu-item padding-lr-sm" :class="2==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="2" style="position: relative">
				线上回收
				<view class="tab-dot bg-white"></view>
			</view>
		</scroll-view>
		<view class=" padding-bottom-sm padding-top-sm">
			<view class="cu-item arrow" style="display: flex; justify-content: space-between; padding: 20rpx 20rpx">
				<view class="content">筛选时间</view>
				<view class="action">
					<view class="picker text-gray" @tap="show = true">{{ time ? time : '请选择月份'}}</view>
				</view>
			</view>
			<view class=" cu-list card-menu">
				<view style="">
					<!-- :class="admin ? 'transform' : 'transformRight'" -->
					<view v-for="(item, index) in dataList" style="display: flex; align-items: center; margin-bottom: 10px">
						<!-- :class="admin ? '' : 'transform'" -->
						<view style="margin-right: 28rpx" class="transform">
							<view class="radio" :class="item.disabled ? 'radio-red' : ''" @tap="radioChange(index)"></view>
						</view>
						<view class="group_3 flex-col">
							<view class="text-wrapper_1 flex-row justify-between">
								<text class="text_7">时间:{{item.createTime}}</text>
							</view>
							<view class="section_1 flex-row">
								<view class=""></view>
								<image :src="$httpImage + item.modelPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
								</image>
								<view class="text-wrapper_2 flex-col">
									<text class="text_8">{{item.modelName}}</text>
									<text class="text_9">{{item.label}}</text>
									<text class="text_10">序列号:{{item.deviceNo}}</text>
									<text class="text_11">调拨价:{{item.allotPrice}}元</text>
									<text class="text_11">回收价:{{item.recyclePrice}}元</text>
									<text class="text_11">销售价:{{item.sellPrice}}元</text>
								</view>
							</view>
							<text class="text_13" v-if="item.recyclePeopleName">回收人：{{item.recyclePeopleName}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--付款凭证弹窗-->
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">付款凭证</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xs">
					<swiper class="screen-swiper square-dot" :indicator-dots="true" :autoplay="true" interval="5000"
						duration="500">
						<swiper-item v-for="(item,index) in pingzhengImg" :key="index">
							<image :src="item" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
		<u-calendar :show="show" mode="range" @confirm="aaa" @close="close"></u-calendar>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		erppurchasegetlist
	} from '@/api/erpapi.js';
	import {
		empSelectRecycleList
	} from '@/api/erp.js';
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	//import barTitle from '@/components/common/basics/bar-title';
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			//barTitle,
			barSearchTitle,
			filterDropdown,
		},
		data() {
			return {
				time: null,
				startTime: null,
				endTime: null,
				deviceNo: null,
				show: false,
				TabCur: 1,
				modalName: null,
				pingzhengImg: [],
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh: false,
				defaultSelected: [],
				filterData: [{
						name: '付款状态',
						type: 'hierarchy',
						submenu: [{
								name: '全部状态', //全部设为默认，选中时标签栏显示为付款状态
								value: 'all',
							},
							{
								name: '未付款',
								value: '0',
							},
							{
								name: '已付款',
								value: '1',
							},
						],
					},
					{
						name: '审核状态',
						type: 'hierarchy',
						submenu: [{
								name: '全部状态', //全部设为默认，选中时标签栏显示为审核状态
								value: 'all',
							},
							{
								name: '待审批', //设为默认或者有没有一个不传值全部的状态设为默认
								value: '0',
							},
							{
								name: '审批通过',
								value: '1',
							},
							{
								name: '审批不通过',
								value: '2',
							},
						],
					},
					{
						name: '开单类型', //选择
						type: 'hierarchy',
						submenu: [{
								name: '全部类型', //设为默认
								value: '0',
							},
							{
								name: '采购单',
								value: '1',
							},
							{
								name: '点点单',
								value: '2',
							},
						],
					},
				],
				dataList: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
					// company_id: '',
					// store_id: '',
					// warehouse_id: '',
					// partition_id: '',
					// paystatus: '',
					// status: '',
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					contentdown: '加载更多数据',
					contentrefresh: '加载中...',
					contentnomore: '暂无更多数据。',
				},
				checkfilterData: '',
				filtertopnum: '80', //筛选条高度
			};
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.filtertopnum = 1;
			// #endif
			this.checkfilterData = {
				index: [
					[null],
					[null],
					[null]
				],
				value: [
					[null],
					[null],
					[null]
				],
			};
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			});
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0,
			});
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
		methods: {
			searchTap(e) {
				this.deviceNo = e
				this.getDataList();
			},
			tabSelect(e) {
				// console.log(e);
				if (this.TabCur != e.currentTarget.dataset.id) {
					// 进入页面刷新
					uni.startPullDownRefresh();
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},
			close() {
				this.show = false;
			},
			aaa(value) {
				this.startTime = value[0];
				this.endTime = value[1];
				this.time = value[0] + '-' + value[1];
				this.getDataList();
				this.show = false;
			},
			//接收菜单结果
			confirm(e) {
				console.log(e);
				this.checkfilterData = e;
				this.getDataList();
			},
			// 点击筛选
			changefilter(e) {
				console.log(e);
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.startTime = this.startTime;
				paramsData.endTime = this.endTime;
				paramsData.deviceNo = this.deviceNo
				paramsData.onlineRecycleFlag = this.TabCur - 1
				empSelectRecycleList(paramsData)
					.then((res) => {
						console.log(res.rows);
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
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
			prodoctTap(id) {
				console.log(id);
				uni.navigateTo({
					url: '/pages/erp/purchase/product?Id=' + id,
				});
			},
			pingzhengTap(e) {
				this.modalName = e.currentTarget.dataset.target;
				let imglist = e.currentTarget.dataset.url;
				imglist = imglist.split(',');
				this.pingzhengImg = imglist;
				//this.pingzhengImg = e.currentTarget.dataset.url.split(',')
				console.log(this.pingzhengImg);
				//alert(url)
			},
			hideModal(e) {
				this.modalName = null;
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
		background: #F0F0F0;
	}

	.button {
		margin-top: 20rpx;
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
		margin: 9px 0px 0 0;
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
		background-color: #fff4e5;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_33 {
		overflow-wrap: break-word;
		color: #e29140;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_44 {
		background-color: #ebf6ff;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_44 {
		overflow-wrap: break-word;
		color: #1190d6;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_55 {
		background-color: #ffef95;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_55 {
		overflow-wrap: break-word;
		color: #bc890e;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_66 {
		background-color: #ef2727;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_66 {
		overflow-wrap: break-word;
		color: #ffffff;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_77 {
		background-color: #e5fcf1;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_77 {
		overflow-wrap: break-word;
		color: #00c082;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_88 {
		background-color: #ffdbdb;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_88 {
		overflow-wrap: break-word;
		color: #f76540;
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

	.cur {
		.tab-dot {
			position: absolute;
			height: 3px !important;
			border-radius: 20rpx;
			bottom: 5px;
			left: 0;
			right: 0;
			width: 25px !important;
			margin: auto;
			background-image: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
		}
	}

	.cu-card.article>.cu-item {
		padding-bottom: 0;

		.title {
			padding: 0 0 20rpx 0;
		}

		.content {
			uni-image {
				width: 4.8em;
				height: 4.8em;
				margin-right: 10rpx;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.cu-modal {
		z-index: 99;
	}

	.cu-list.menu>.cu-item.arrow {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.cu-steps .cu-item [class*='cuIcon-'],
	.cu-steps .cu-item .num {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.card-menu .goodsimg {
		width: 150rpx;
		height: 150rpx;
		background-size: 100% 100%;
	}
</style>