<template>
	<view>
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<!-- <text class="cuIcon-scan" @tap="snTap" /> -->
				<button class="cu-btn sm" @tap="snTap">
					<!-- <text class="cuIcon-add" /> -->
					添加
				</button>
			</block>
		</bar-search-title>
		<!--为上面的临时筛选条进行的临时兼容处理-->
		<view style="padding: 20rpx 20rpx">
			<view class="cu-item arrow" style="display: flex; justify-content: space-between;">
				<view class="content">筛选时间</view>
				<view class="action">
					<view class="picker text-gray" @tap="show = true">{{ time ? time : '请选择月份'}}</view>
				</view>
			</view>
			<view v-for="(item, index) in dataList"
				style="display: flex; align-items: center; margin-bottom: 10px; margin-top: 10px">
				<view class="transform" style="margin-right: 28rpx">
					<view class="radio" :class="item.disabled ? 'radio-red' : ''" @tap="radioChange(index)"></view>
				</view>
				<view class="group_3 flex-col">
					<view class="text-wrapper_1 flex-row justify-between">
						<text class="text_7">时间:2{{item.createTime}}</text>
					</view>
					<view class="section_1 flex-row">
						<view class=""></view>
						<image :src="$httpImage + item.fittingsConfig.fittingsPhoto" mode="aspectFit"
							class="cu-avatar lg radius box_5 flex-col"></image>
						<view class="text-wrapper_2 flex-col">
							<text class="text_8">{{item.fittingsConfig.fittingsName}}</text>
							<view style="display: flex; margin-top: 10px">
								<view>
									<text class="text_9">颜色：{{item.fittingsConfig.fittingsColor}}</text>
									<text class="text_9">数量：{{item.fittingsNumber}}</text>
								</view>
								<view>
									<text class="text_10">成本价:{{item.fittingsCostPrice}}元</text>
									<text class="text_11">销售价:{{item.fittingsSellPrice}}元</text>
									<text class="text_11">采购金额:{{item.fittingsCostPrice * item.fittingsNumber}}元</text>
								</view>
							</view>
							<!-- 							<text class="text_9">颜色：{{item.fittingsConfig.fittingsColor}}</text>
							<text class="text_9">数量：{{item.fittingsNumber}}</text>
							<text class="text_10">成本价:{{item.fittingsCostPrice}}元</text>
							<text class="text_11">销售价:{{item.fittingsSellPrice}}元</text> -->
						</view>
					</view>
					<view class="button">
						<view class="receipt" @tap="sell(item)">打印</view>
						<view class="receipt" @tap="gotap(item)">修改</view>
						<view class="receipt" @tap="billing(item)" v-if="!item.fittingsVoucher">上传凭证</view>
						<view class="receipt" @tap="seebilling(item)" v-else>查看凭证</view>
					</view>
				</view>
			</view>
		</view>
		<!--弹窗-->
		<u-popup :show="dayinShow" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">打印数量</view>
				<view class="yunShow-img">
					<u--input placeholder="请输入内容" :border="'surround'" v-model="number"></u--input>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="confirmWarehousings">确定</view>
			</view>
		</u-popup>
		<!-- 上传凭证 -->
		<u-popup :show="yunShowImgMain" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">上传维修凭证</view>
				<view class="yunShow-img">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="3"></u-upload>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="confirmWarehousing">确定</view>
			</view>
		</u-popup>
		<u-calendar :show="show" mode="range" @confirm="aaa" @close="close"></u-calendar>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		fittingsOrderList,
		undersell,
		putaway,
		confirmWarehousing,
		printLabel
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
				startTime: null,
				endTime: null,
				deviceNo: null,
				time: null,
				show: false,
				number: null,
				itemList: {},
				dayinShow: false,
				fittingsOrderId: 0,
				yunShowImgMain: false,
				fileList1: [],
				sexIndex: 0,
				listTouchStart: 0,
				monthVal: '',
				listTouchDirection: null,
				ifBottomRefresh: false,
				dataList: [],
				sexPicker: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
			// this.getDataList();
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
			this.getDataList();
			let that = this;
			uni.$once('updatethird', function(data) {
				that.thirdInfo = data;
			});
		},
		methods: {
			searchTap(e) {
				console.log(e)
				this.deviceNo = e
				this.getDataList();
			},
			aaa(value) {
				this.startTime = value[0];
				this.endTime = value[1];
				this.time = value[0] + '-' + value[1];
				this.getDataList();
				this.show = false;
			},
			close() {
				this.show = false;
				this.dayinShow = false
				this.yunShowImgMain = false
			},
			// 打印
			sell(e) {
				this.itemList = e
				this.dayinShow = true
			},
			confirmWarehousings() {
				printLabel({
					fittingsOrderId: this.itemList.fittingsOrderId,
					printNumber: this.number
				}).then(res => {
					uni.showToast({
						title: '成功打印' + this.number + '张标签'
					})
					this.cloes()
				})
			},
			// 查看凭证
			seebilling(e) {
				let urll = e.fittingsVoucher.split(',');
				let a = urll.map((item) => {
					return this.$httpImage + item;
				});
				uni.previewImage({
					current: 0,
					urls: a,
				});
			},
			// 上传凭证
			confirmWarehousing() {
				let fittingsVoucher = this.fileList1.map((item) => {
					return item.url;
				});
				let paramsData = {
					fittingsOrderId: this.fittingsOrderId,
					fittingsVoucher: fittingsVoucher.join(','),
				};
				// 点击上传凭证按钮
				confirmWarehousing(paramsData).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '上传成功',
						});
						this.yunShowImgMain = false;
						this.getDataList();
					}
				});
			},
			billing(e) {
				this.fittingsOrderId = e.fittingsOrderId;
				this.yunShowImgMain = true;
			},
			sexPickerChange(e) {
				this.monthVal = this.sexPicker[e.detail.value];
				this.getDataList();
			},
			gotap(item) {
				uni.setStorageSync('shopAdd', item.fittingsConfig);
				uni.navigateTo({
					url: '/pages/erp/shop/add?fittingsNumber=' +
						item.fittingsNumber +
						'&fittingsSellPrice=' +
						item.fittingsSellPrice +
						'&fittingsCostPrice=' +
						item.fittingsCostPrice +
						'&supplierId=' +
						item.supplierId +
						'&supplierName=' +
						item.supplierName +
						'&fittingsOrderId=' +
						item.fittingsOrderId,
				});
			},
			snTap() {
				uni.navigateTo({
					url: '/pages/erp/shop/configList',
				});
			},
			// 获取列表
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.startTime = this.startTime;
				paramsData.endTime = this.endTime;
				paramsData.fittingsName = this.deviceNo
				if (this.monthVal) {
					paramsData.monthVal = Number(this.monthVal);
				}
				console.log(paramsData)
				fittingsOrderList(paramsData)
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
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			// 新增图片
			async afterRead(event) {
				console.log(123);
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				console.log(this[`fileList${event.name}`]);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中',
					});
				});
				for (let i = 0; i < lists.length; i++) {
					console.log(lists[i].url);
					const result = await this.uploadFilePromise(lists[i].url);
					console.log(result);
					let item = this[`fileList${event.name}`][fileListLen];
					this[`fileList${event.name}`].splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: 'success',
							message: '',
							url: result,
						})
					);
					fileListLen++;
				}
			},
			uploadFilePromise(urls) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://192.168.2.36:8080/common/upload', // 仅为示例，非真实的接口地址
						filePath: urls,
						name: 'file',
						header: {
							Authorization: Vue.prototype.$store.state.token,
						},
						success: (res) => {
							setTimeout(() => {
								const data = JSON.parse(res.data);
								resolve(data.fileName);
							}, 1000);
						},
					});
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