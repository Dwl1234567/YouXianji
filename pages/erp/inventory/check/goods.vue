<template>
	<view>
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="iconfont icon-saomiao" @tap="snTap" />
			</block>
		</bar-search-title>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-red cur':''" @tap="tabSelect" data-id="0">
				未盘点 ({{total}})
			</view>
			<view class="cu-item" :class="1==TabCur?'text-red cur':''" @tap="tabSelect" data-id="1">
				盘点 ({{total1}})
			</view>
		</scroll-view>
		<view class="cu-list menu" v-if="0==TabCur">
			<view class="arrow" v-for="(item,index) in dataList" :key="index">
				<view class="content">
					<text class="text-grey title" v-if="item.modelName">{{item.modelName}}</text>
					<text class="text-grey title" v-if="item.fittingsName">{{item.fittingsName}}</text>
				</view>
				<view class="action">
					<view class=""><text class="text-grey text-sm text"
							v-if="item.basicPriceLabel">{{item.basicPriceLabel}}</text></view>
					<view class=""><text class="text-grey text-sm text" v-if="item.deviceNo">序列号：{{item.deviceNo}}</text></view>
					<view class=""><text class="text-grey text-sm text" v-if="item.fittingsColor">颜色：{{item.fittingsColor}}</text>
					</view>
					<view class=""><text class="text-grey text-sm text"
							v-if="item.fittingsNumber">数量：{{item.fittingsNumber}}个</text>
					</view>
				</view>
				<view class="over" @tap="yunShow(item)" v-if="isView != 2">取样</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-list menu" v-if="1==TabCur">
			<view class="arrow" v-for="(item,index) in dataList1" :key="index">
				<view class="content">
					<text class="text-grey title" v-if="item.modelName">{{item.modelName}}</text>
					<text class="text-grey title" v-if="item.fittingsName">{{item.fittingsName}}</text>
				</view>
				<view class="action">
					<view class=""><text class="text-grey text-sm text"
							v-if="item.basicPriceLabel">{{item.basicPriceLabel}}</text></view>
					<view class=""><text class="text-grey text-sm text" v-if="item.deviceNo">序列号{{item.deviceNo}}</text></view>
					<view class=""><text class="text-grey text-sm text" v-if="item.fittingsColor">颜色：{{item.fittingsColor}}</text>
					</view>
				</view>
				<view class="time">
					<view>盘点时间:{{item.checkTime}}</view>
					<view>盘点人：{{item.checkPeopleName}}</view>
					<view class="" v-if="item.fittingsNumber">数量：{{item.fittingsNumber}}</view>
					<view class="" v-if="item.checkNumber">盘点数量：{{item.checkNumber}}</view>
				</view>
				<view class="over" @tap="seePic(item)">查看</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<u-popup :show="yunShowImg1" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">上传凭证</view>
				<view class="yunShow-item" v-if="checkTaskType == 2">
					<view class="left">配件数量</view>
					<view class="input">
						<u--input placeholder="请输入内容" :border="'surround'" v-model="fittingsNumber"></u--input>
					</view>
				</view>
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
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		storeCheckItemList,
		uploadCheckVoucher,
		selectFittingsList
	} from "@/api/erp.js";
	export default {
		components: {
			barSearchTitle,
		},
		data() {
			return {
				isView: 0,
				fittingsNumber: null,
				total: 0,
				total1: 0,
				checkTaskType: 0,
				checkTaskId: 0,
				fileList1: [],
				itemList: {},
				dataLists: [],
				yunShowImg1: false,
				TabCur: 0,
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				switchA: false,
				checkId: '',
				storeName: '',
				ifBottomRefresh: false,
				dataList: [],
				dataList1: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				queryInfo1: {
					pageNum: 1,
					pageSize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				loadmore1: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad(options) {
			this.checkTaskId = options.checkTaskId;
			this.isView = options.isView
			this.checkTaskType = options.checkTaskType;
		},
		onShow() {
			this.getDataList();
			this.getDataList1()
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.TabCur == 0) {
				this.queryInfo.pageNum = 1; //重置分页页码
			} else {
				this.queryInfo1.pageNum = 1; //重置分页页码
			}
			this.getDataList();
			this.getDataList1();

		},
		onReachBottom() {
			if (this.TabCur == 0) {
				if (this.loadmore == 'noMore') return
				this.queryInfo.pageNum += 1;
				this.ifBottomRefresh = true
				this.getDataList();
			} else {
				if (this.loadmore1 == 'noMore') return
				this.queryInfo1.pageNum += 1;
				this.ifBottomRefresh1 = true
				this.getDataList1();
			}

		},
		methods: {
			seePic(item) {
				const pic = item.checkVoucher.split(',')
				//需要分割url并去除空数组
				let a = pic.map((item) => {
					return this.$httpImage + item;
				});
				uni.previewImage({
					current: 0,
					urls: a,
				});
			},
			close() {
				this.fittingsNumber = null
				this.yunShowImg1 = false
			},
			// 确认上传凭证
			uploadCheckVoucher() {
				let checkVoucher = []
				this.fileList1.map(item => {
					checkVoucher.push(item.url)
				})
				let parms = {
					checkItemId: this.itemList.checkItemId,
					checkVoucher: checkVoucher.join(','),
					fittingsNumber: this.fittingsNumber,
					checkType: 1
				}
				uploadCheckVoucher(parms).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '取样成功',
						});
						this.fileList1 = []
						this.getDataList();
						this.getDataList1();
						this.close()
					}
				})
			},
			yunShow(item) {
				this.itemList = item;
				this.yunShowImg1 = true
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60

			},
			statusTap(id) {
				uni.navigateTo({
					url: "/pages/erp/inventory/check/status?id=" + id
				});
			},
			snTap() {
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
							console.log(that.checkTaskId)
							let parms = {
								checkTaskId: that.checkTaskId,
								deviceId: data.a,
								checkType: 0
							}
							uploadCheckVoucher(parms).then(res => {
								if (res.code === 200) {
									uni.showToast({
										icon: 'none',
										title: '取样成功',
									});
									that.getDataList();
									that.getDataList1();
									that.yunShowImg1 = false
								} else {
									uni.showToast({
										icon: 'none',
										title: res.msg,
									});
								}
							})
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}

					}
				});
			},
			searchTap(e) {
				console.log('搜索结果', e)
				this.storeName = e;
				this.getDataList();
			},
			getDataList1() {
				let that = this;
				let paramsData = that.queryInfo1;
				paramsData.itemStatus = 1
				paramsData.checkTaskId = this.checkTaskId
				if (this.checkTaskType != 2) {
					storeCheckItemList(paramsData).then(res => {
							let data = res.rows;
							if (data) {
								if (that.ifBottomRefresh1) {
									that.dataList1 = that.dataList1.concat(data)
								} else {
									that.dataList1 = data
								}
								this.total1 = res.total;
								that.ifBottomRefresh1 = false
								that.loadmore1 = res.total == that.dataList1.length ? 'noMore' : 'more'
							}

						})
						.finally(() => {
							uni.stopPullDownRefresh();
						})
				} else {
					selectFittingsList(paramsData).then(res => {
							let data = res.rows;
							if (data) {
								if (that.ifBottomRefresh1) {
									that.dataList1 = that.dataList1.concat(data)
								} else {
									that.dataList1 = data
								}
								this.total1 = res.total;
								that.ifBottomRefresh1 = false
								that.loadmore1 = res.total == that.dataList1.length ? 'noMore' : 'more'
							}

						})
						.finally(() => {
							uni.stopPullDownRefresh();
						})
				}

			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo
				paramsData.itemStatus = 0
				paramsData.checkTaskId = this.checkTaskId
				if (this.checkTaskType != 2) {
					storeCheckItemList(paramsData).then(res => {
							let data = res.rows;
							if (data) {
								if (that.ifBottomRefresh) {
									that.dataList = that.dataList.concat(data)
								} else {
									that.dataList = data
								}
								this.total = res.total;
								that.ifBottomRefresh = false
								that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
							}

						})
						.finally(() => {})
				} else {
					selectFittingsList(paramsData).then(res => {
							let data = res.rows;
							if (data) {
								if (that.ifBottomRefresh) {
									that.dataList = that.dataList.concat(data)
								} else {
									that.dataList = data
								}
								that.ifBottomRefresh = false
								this.total = res.total;
								that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
							}

						})
						.finally(() => {})
				}
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
				console.log(222)
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
		}
	}
</script>

<style lang="scss">
	page {
		background: #F0F0F0;
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

	.menu {
		padding: 26rpx;
	}

	.arrow {
		background: #FFFFFF;
		border-radius: 11rpx;
		padding: 45rpx 38rpx;
		margin-bottom: 24rpx;
		padding-bottom: 41px;

		.content {
			margin-bottom: 34rpx
		}

		.action {
			view {
				margin-bottom: 19rpx;
			}
		}

		.title {
			font-size: 29rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #101010;
			line-height: 29rpx;

		}

		.text {
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #8E8E8E;
			line-height: 25rpx;

		}

		.over {
			float: right;
			height: 55rpx;
			display: inline-block;
			padding: 0rpx 47rpx;
			background: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
			border-radius: 29rpx;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 55rpx;
		}
	}

	.cu-list.menu-avatar>.cu-item.arrow {
		padding-right: 68rpx
	}

	.cu-list.menu-avatar>.cu-item.arrow:before {
		position: absolute;
		top: 0;
		right: 15px;
		bottom: 0;
		display: block;
		margin: auto;
		width: 15px;
		height: 15px;
		color: #8799a3;
		content: "\e6a3";
		text-align: center;
		font-size: 17px;
		font-family: cuIcon;
		line-height: 15px;
	}
</style>