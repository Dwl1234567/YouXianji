<template>
	<view>
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<!-- <block slot="right">
				<text class="iconfont icon-saomiao" @tap="snTap"></text>
			</block> -->
		</bar-search-title>

		<scroll-view scroll-x class="bg-white nav text-center text-xl">
			<view class="cu-item padding-lr-sm" :class="1==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="1" style="position: relative">
				线下配件
				<view class="tab-dot bg-white"></view>
			</view>
			<view class="cu-item padding-lr-sm" :class="2==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="2" style="position: relative">
				线上配件
				<view class="tab-dot bg-white"></view>
			</view>
		</scroll-view>
		<view class="cu-item arrow" style="display: flex; justify-content: space-between; padding: 10px">
			<view class="content">筛选时间</view>
			<view class="action">
				<view class="picker text-gray" @tap="show = true">{{ time ? time : '请选择时间区间'}}</view>
			</view>
		</view>
		<view class="cu-card article" v-if="1==TabCur">
			<view style="padding: 20rpx 20rpx">
				<view v-for="(item, index) in dataList" style="display: flex; align-items: center; margin-bottom: 10px"
					:key="index">
					<view class="group_3 flex-col">
						<view class="text-wrapper_1 flex-row justify-between">
							<text class="text_7">订单号:{{item.fittingsFormNo}}</text>
							<text class="text_7">时间:{{item.createTime}}</text>
						</view>
						<view class="section_1 flex-row" v-for="(items,indexs) in item.sellFittingsFormItemList">
							<view class=""></view>
							<image :src="$httpImage + items.fittingsPhoto" mode="aspectFit"
								class="cu-avatar lg radius box_5 flex-col">
							</image>
							<view class="text-wrapper_2 flex-col">
								<text class="text_8">{{items.modelName}}</text>
								<text class="text_10">数量:{{items.fittingsNumber}}个</text>
								<text class="text_10">单价:{{items.fittingsSellPrice}}元</text>
								<text class="text_11">总价:{{items.fittingsNumber * items.fittingsSellPrice}}元</text>
							</view>
						</view>
						<text class="text_13">销售人：{{item.sellPeopleName}}</text>
						<text class="text_13">实收款：{{item.fundsReceived}}元</text>
						<text class="text_13">业绩：{{item.profit}}元</text>
						<view class="button">
							<view class="receipt" v-if="item.sellPeople == userInfo.userId" @tap="goBack(item)">退款</view>
							<view class="receipt" v-if="item.sellPeople == userInfo.userId" @tap="billing(item)">打印</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-card article" v-if="2==TabCur">
			<view style="padding: 20rpx 20rpx">
				<view v-for="(item, index) in dataList1" style="display: flex; align-items: center; margin-bottom: 10px"
					:key="index">
					<view class="group_3 flex-col">
						<view class="text-wrapper_1 flex-row justify-between">
							<text class="text_7">订单号:{{item.fittingsFormNo}}</text>
							<text class="text_7">时间:{{item.createTime}}</text>
						</view>
						<view class="section_1 flex-row" v-for="(items,indexs) in item.sellFittingsFormItemList">
							<view class=""></view>
							<image :src="$httpImage + items.fittingsPhoto" mode="aspectFit"
								class="cu-avatar lg radius box_5 flex-col">
							</image>
							<view class="text-wrapper_2 flex-col">
								<text class="text_8">{{items.modelName}}</text>
								<text class="text_10">数量:{{items.fittingsNumber}}个</text>
								<text class="text_10">单价:{{items.fittingsSellPrice}}元</text>
								<text class="text_11">总价:{{items.fittingsNumber * items.fittingsSellPrice}}元</text>
							</view>
						</view>
						<text class="text_13">销售人：{{item.sellPeopleName}}</text>
						<text class="text_13">实收款：{{item.fundsReceived}}元</text>
						<text class="text_13">业绩：{{item.profit}}元</text>
						<view class="button">
							<view class="receipt" v-if="item.sellPeople == userInfo.userId" @tap="goBack(item)">退款</view>
							<view class="receipt" v-if="item.sellPeople == userInfo.userId" @tap="billing(item)">打印</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore1" :contentText="contentText"></uni-load-more>
		</view>
		<!-- <u-datetime-picker ref="datetimePicker" :show="show" v-model="value1" mode="year-month" :formatter="formatter"
			@confirm="aaa(1)" @cancel="close"></u-datetime-picker> -->
		<u-calendar :show="show" mode="range" @confirm="aaa" @close="close"></u-calendar>
		<u-popup :show="yunShowImg1" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">上传凭证</view>
				<view class="yunShow-img" style="margin-top: 20rpx;">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="3"></u-upload>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="uploadCheckVoucher">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		selectSellFittingsList,
		printSellFittiongsForm,
		selecyMyOnLineSellFormList,
		returnSellFittingsForm
	} from '@/api/erp.js';
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import _tool from '@/utils/tools.js'; //工具函数
	const d = new Date()
	const year = d.getFullYear()
	let month = d.getMonth() + 1
	month = month < 10 ? `0${month}` : month
	const date = d.getDate()
	export default {
		components: {
			barSearchTitle,
		},
		data() {
			return {
				fileList1: [],
				itemList: {},
				startTime: null,
				endTime: null,
				deviceNo: null,
				userInfo: {},
				show: false,
				yunShowImg1: false,
				value1: Number(new Date()),
				time: '',
				TabCur: 1,
				ifBottomRefresh: false,
				ifBottomRefresh1: false,
				ifBottomRefresh2: false,
				dataList: [],
				dataList1: [],
				dataList2: [],
				storeId: '',
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				queryInfo1: {
					pageNum: 1,
					pageSize: 10,
				},
				queryInfo2: {
					pageNum: 1,
					pageSize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				loadmore1: 'more', //more 还有数据   noMore 无数据
				loadmore2: 'more', //more 还有数据   noMore 无数据
				contentText: {
					contentdown: '加载更多数据',
					contentrefresh: '加载中...',
					contentnomore: '暂无更多数据。',
				},
				modalName: null,
				refuseRemark: '', //拒绝原因
				checkInfo: '', //选中拒绝的信息
			};
		},
		onLoad() {
			// let storeInfo = uni.getStorageSync('store_info');
			// storeInfo = JSON.parse(storeInfo);
			// this.storeId = storeInfo.store_id;
			// 进入页面刷新
			this.userInfo = uni.getStorageSync('userinfo')
			this.getDataList();
			// uni.startPullDownRefresh();
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
			if (this.TabCur == 1) {
				this.queryInfo.pageNum = 1; //重置分页页码
				this.getDataList();
			} else if (this.TabCur == 2) {
				this.queryInfo1.pageNum = 1; //重置分页页码
				this.getDataList1();
			}

		},
		onReachBottom() {
			if (this.TabCur == 1) {
				if (this.loadmore == 'noMore') return;
				this.queryInfo.pageNum += 1;
				this.ifBottomRefresh = true;
				this.getDataList();
			} else if (this.TabCur == 2) {
				if (this.loadmore1 == 'noMore') return;
				this.queryInfo1.pageNum += 1;
				this.ifBottomRefresh1 = true;
				this.getDataList1();
			}
		},
		methods: {
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
						url: 'http://192.168.31.91:8080/common/upload', // 仅为示例，非真实的接口地址
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
			searchTap(e) {
				this.deviceNo = e
				this.getDataList();
				this.getDataList1();
			},
			// 确认上传凭证
			uploadCheckVoucher() {
				let that = this
				let checkVoucher = []
				that.fileList1.map(item => {
					checkVoucher.push(item.url)
				})
				let parms = {
					fittingsFormId: that.itemList.fittingsFormId,
					returnVoucher: checkVoucher.join(','),
				}
				returnSellFittingsForm(parms).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							duration: 1500,
							title: '退款成功',
						});
						that.close()
						setTimeout(function() {
							that.fileList1 = []
							that.getDataList();
							that.getDataList1();
						}, 1500);

					}
				})
			},
			goBack(item) {
				this.itemList = item
				this.yunShowImg1 = true;
				// returnSellFittingsForm({

				// })
			},
			billing(item) {
				printSellFittiongsForm({
					fittingsFormId: item.fittingsFormId
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '打印成功'
						})
					}
				})
			},
			goDetail(sellFormId) {
				// uni.navigateTo({
				// 	url: '/pages/erp/sell/form?sellFormId=' + sellFormId,
				// });
				uni.setStorageSync('updatesell', sellFormId)
				// uni.$emit('updatesell', sellFormId)
				uni.navigateTo({
					url: '/pages/erp/sell/outadd'
				});
			},
			day(e) {
				var today = new Date(e);

				//日期
				var DD = String(today.getDate()).padStart(2, '0'); // 获取日
				var MM = String(today.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
				var yyyy = today.getFullYear(); // 获取年

				// 时间
				var hh = String(today.getHours()).padStart(2, '0'); //获取当前小时数(0-23)
				var mm = String(today.getMinutes()).padStart(2, '0'); //获取当前分钟数(0-59)
				var ss = String(today.getSeconds()).padStart(2, '0'); //获取当前秒数(0-59)
				today = yyyy + '-' + MM;
				return today;
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				}
				if (type === 'month') {
					return `${value}月`;
				}
				if (type === 'day') {
					return `${value}日`;
				}
				return value;
			},
			close() {
				this.show = false;
				this.yunShowImg1 = false
			},
			aaa(value) {
				this.startTime = value[0];
				this.endTime = value[1];
				this.time = value[0] + '-' + value[1];
				if (this.TabCur == 1) {
					this.getDataList();
				} else {
					this.getDataList1();
				}
				this.show = false;
				// setTimeout(() => {
				// 	console.log(this.day(this.value1), value);
				// 	this.time = this.day(this.value1);
				// 	this.show = false;
				// 	if (this.TabCur == 1) {
				// 		this.getDataList();
				// 	} else {
				// 		this.getDataList1();
				// 	}

				// }, 100);
			},
			copy(value) {
				uni.setClipboardData({
					data: value,
				});
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
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.startTime = this.startTime;
				paramsData.endTime = this.endTime;
				paramsData.deviceNo = this.deviceNo
				selectSellFittingsList(paramsData)
					.then((res) => {
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
			getDataList1() {
				let that = this;
				let paramsData = that.queryInfo1;
				paramsData.queryDateStr = this.time;
				selecyMyOnLineSellFormList(paramsData)
					.then((res) => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载

							if (that.ifBottomRefresh1) {
								that.dataList1 = that.dataList1.concat(data);
							} else {
								that.dataList1 = data;
							}
							that.ifBottomRefresh1 = false;
							that.loadmore1 = res.total == that.dataList1.length ? 'noMore' : 'more';
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					});
			},
			allotTop(info, type) {
				let that = this;
				if (info) {
					this.checkInfo = info;
				} else {
					that.$u.toast('暂无数据，请刷新页面');
					return false;
				}
				if (type == 1) {
					//同意
					console.log('同意直接提交');
					updatesingletransfer({
						allot_id: info.id,
						allot_status: 2,
					}).then((res) => {
						that.$u.toast(res.msg);
						uni.startPullDownRefresh({});
					});
				} else if (type == 3) {
					console.log('拒绝后弹窗提交');
					if (!that.refuseRemark) {
						return uni.showToast({
							title: '请输入拒绝原因!',
							icon: 'none',
						});
					}
					updatesingletransfer({
							allot_id: this.checkInfo.id,
							allot_status: 3,
							remarks: this.refuseRemark,
						})
						.then((res) => {
							that.$u.toast(res.msg);
						})
						.finally(() => {
							uni.startPullDownRefresh({});
							this.modalName = null;
						});
				} else {
					this.modalName = 'Modal';
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
		},
	};
</script>

<style lang="scss">
	@import '@/static/common.css';

	page {
		background: #f0f0f0;
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
			background-image: linear-gradient(90deg, #ff6868 0%, #ea1515 100%);
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
</style>