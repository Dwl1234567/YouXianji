<template>
	<view>
		<!-- v-for="(item,index) in orderList" :key="index" -->
		<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
			<view class="box_2 flex-col" v-for="(item,index) in orderList" :key="index">
				<view class="box_3 flex-col">
					<view class="group_3 flex-row">
						<view class="image-text_1 flex-row justify-between">
							<text class="text-group_1">{{item.secondHandGoods.storeName}}</text>
						</view>
						<image class="icon_2" referrerpolicy="no-referrer"
							src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng76a69ec8d984edf3b54d04b77768e328ebb05626d86c986f26777b8490007c8e" />
					</view>
					<view class="group_4 flex-row justify-between">
						<view class="image-text_2 flex-row justify-between">
							<view class="group_5 flex-col"></view>
							<view class="text-group_2 flex-col">
								<text class="text_4">{{item.secondHandGoods.title}}</text>
								<text class="text_5">{{item.secondHandGoods.basePriceLabel}}</text>
								<text class="text_6">¥{{item.secondHandGoods.sellPrice}}</text>
							</view>
						</view>
						<text class="text_7">X1</text>
					</view>
					<view class="group_6 flex-col"></view>
					<view class="text-wrapper_1 flex-row">
						<text class="text_8"></text>
						<text class="text_9">需付款</text>
						<text class="text_10">¥</text>
						<text class="text_11">{{item.secondHandGoods.sellPrice}}</text>
					</view>
					<view class="group_7 flex-row justify-between">
						<button class="button_1 flex-col" @click="onClick_1(item)" v-if="item.orderStatus == 4">
							<text class="text_12">拒绝</text>
						</button>
						<button class="button_1 flex-col" @click="selectReturnReason(item)" v-if="item.orderStatus == 4">
							<text class="text_12">查看退货原因</text>
						</button>
						<button class="button_2 flex-col" @click="agreeReturn(item)" v-if="item.orderStatus == 4">
							<text class="text_13">同意</text>
						</button>
						<button class="button_1 flex-col" v-if="item.orderStatus == 6">
							<text class="text_12">已同意</text>
						</button>
						<button class="button_1 flex-col" v-if="item.orderStatus == 7">
							<text class="text_12">查看物流</text>
						</button>
						<button class="button_1 flex-col" v-if="item.orderStatus == 7" @tap="returnSh(item)">
							<text class="text_12">上传凭证</text>
						</button>
					</view>
				</view>
			</view>
		</scroll-view>

		<u-popup :show="show" mode="bottom" @close="close" @open="open">
			<view class="prop">
				<view class="title">选择拒绝理由</view>
				<view class="pay">
					<view class="wxPay" v-for="(item,index) in reList">
						<view class="left">
							<text>{{item.dictLabel}}</text>
						</view>
						<view class="right">
							<image :src="isWx ==item.dictCode ? '/static/checkYuan.png' : '/static/yuan.png'" @tap="checkWx(item)">
							</image>
						</view>
					</view>
				</view>
				<view class="querenbutton" @tap="initiatePayment">确认</view>
			</view>
		</u-popup>
		<u-popup :show="returnShow" mode="bottom" @close="close" @open="open" zIndex="888" overlayStyle="z-index: 888">
			<view class="prop">
				<view class="tab upload">上传图片</view>
				<u-upload :fileList="fileList2" @afterRead="afterRead" @delete="deletePic" name="2" multiple
					:maxCount="3"></u-upload>
				<view class="querenbutton" @tap="uploadAfterSaleVoucher">确认</view>
			</view>
		</u-popup>
		<u-popup :show="salesShow" mode="bottom" @close="close" @open="open" zIndex="888" overlayStyle="z-index: 888">
			<view class="prop">
				<view class="title">售后类型</view>
				<view class="tab">退款说明</view>
				<u--textarea v-model="returnList.context" placeholder="请输入内容" class="textarea"></u--textarea>
				<view class="tab upload">上传图片</view>
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="3"></u-upload>
				<!-- <view class="querenbutton" @tap="secondGoodsReturn">确认</view> -->
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		empSelectList,
		sellerShipments,
		refuseReasonList,
		selectReturnReason,
		agreeReturn,
		uploadAfterSaleVoucher,
	} from '@/api/erp.js';
	export default {
		data() {
			return {
				returnShow: false,
				fileList2: [],
				isWx: 0,
				logisticsCompany: '',
				logisticsNo: '',
				orderList: [],
				yunShow: false,
				pageNum: 1,
				pageSize: 10,
				loadingType: 'more',
				show: false,
				salesShow: false,
				reList: [],
				returnList: {},
				fileList1: [],
			};
		},
		onLoad(options) {
			this.refuseReasonList();
			this.empSelectList();
		},
		methods: {
			// 退货上传凭证
			uploadAfterSaleVoucher() {
				const photo = this.fileList2.map((item) => {
					return item.url;
				});
				uploadAfterSaleVoucher({
					orderId: this.itemList.orderId,
					afterSaleVoucher: photo.join(','),
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '上传成功',
						});
						this.returnShow = false;
						this.pageNum = 1;
						this.empSelectList();
					}
				});
			},
			// 退货上传凭证
			returnSh(item) {
				this.itemList = item;
				this.returnShow = true;
			},
			// 同意退货接口
			agreeReturn(item) {
				agreeReturn({
					orderId: item.orderId,
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '同意退货',
						});
						this.pageNum = 1;
						this.empSelectList();
					}
				});
			},
			// 查看退货原因
			selectReturnReason(item) {
				selectReturnReason({
					orderId: item.orderId,
				}).then((res) => {
					if (res.code === 200) {
						this.returnList = res.data;
						this.fileList1 = res.data.photo.split(',').map((item) => {
							return {
								url: this.$httpImage + item,
							};
						});
						this.salesShow = true;
					}
				});
			},
			// 选择退款理由
			checkWx(item) {
				this.isWx = item.dictCode;
			},
			// 选择退款理由列表
			refuseReasonList() {
				refuseReasonList().then((res) => {
					if (res.code === 200) {
						this.reList = res.data;
					}
				});
			},
			// 关闭弹框
			close() {
				this.returnShow = false;
				this.salesShow = false;
				this.show = false;
			},
			// 填写运单号
			sellerShipments() {
				sellerShipments({
					orderId: this.itemList.orderId,
					logisticsCompany: this.logisticsCompany,
					logisticsNo: this.logisticsNo,
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '发货成功',
						});
						this.pageNum = 1;
						this.yunShow = false;
						this.empSelectList();
					}
				});
			},
			// 获取列表
			empSelectList() {
				if (this.pageNum != 1 && this.loadingType != 'more') {
					return;
				}
				empSelectList({
					orderStatus: '4',
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				}).then((res) => {
					let result = res.rows;
					if (!result) {
						this.loadingType = 'more';
					} else {
						//console.log(result)
						if (result.length >= this.pageSize) {
							//判断是否还有数据， 有改为 more， 没有改为noMore
							this.loadingType = 'more';
						} else {
							this.loadingType = 'noMore';
						}
						if (this.pageNum == 1) {
							this.orderList = result;
						} else {
							result.forEach((item) => {
								// item = Object.assign(item, this.orderStateExp(item.state));
								this.orderList.push(item);
							});
						}
						this.pageNum++;
					}
				});
			},
			// 点击添加物流单号
			onClick_1(item) {
				this.itemList = item;
				this.show = true;
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
	@import '/static/common.css';

	.image-view-img {
		z-index: 1000000 !important;
	}

	.querenbutton {
		background: linear-gradient(90deg, #f3c81a 0%, #ffb629 100%);
		border-radius: 13rpx 13rpx 13rpx 11rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #4f4f50;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
	}

	.pay {
		margin: 20rpx;
		background: #ffffff;
		border-radius: 11rpx;
		padding: 30rpx 0rpx;
	}

	.zfbPay {
		margin-top: 34rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 57rpx;
				height: 57rpx;
				margin-right: 11rpx;
			}
		}

		.right {
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}

	.wxPay {
		margin-bottom: 34rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 57rpx;
				height: 57rpx;
				margin-right: 11rpx;
			}
		}

		.right {
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}

	.prop {
		padding: 34rpx 47rpx 120rpx 47rpx;

		.title {
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #4f4f50;
			line-height: 48rpx;
			text-align: center;
		}

		.textarea {
			height: 155rpx !important;
			border: 2rpx solid #d8d8d8;
			border-radius: 11rpx;
			margin-top: 28rpx;
			margin-bottom: 43rpx;
		}

		.upload {
			margin-bottom: 28rpx;
		}
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

	.box_2 {
		background-color: rgba(240, 240, 240, 1);
		padding: 13px;
	}

	.box_3 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 6px;
		padding: 13px 0 22px 0;
		position: relative;
	}

	.group_3 {
		margin: 0 15px 0 9px;
	}

	.image-text_1 {
		// width: 109px;
	}

	.single-avatar_1 {
		border-radius: 50%;
		background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/47f219e4195e4c6d8136596bc3b30d58_mergeImage.png);
		width: 26px;
		height: 26px;
		border: 1px solid rgba(151, 151, 151, 1);
	}

	.text-group_1 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin-top: 7px;
	}

	.icon_2 {
		width: 5px;
		height: 8px;
		margin: 9px 0 9px 5px;
	}

	.text_3 {
		position: absolute;
		right: 28rpx;
		overflow-wrap: break-word;
		color: rgba(255, 6, 6, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 7px 0 0 145px;
	}

	.group_4 {
		margin: 10px 15px 0 9px;
	}

	.image-text_2 {
		// width: 220px;
	}

	.group_5 {
		border-radius: 6px;
		background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/8d27d8a9bbce490abb4f5b491e1ac801_mergeImage.png);
		width: 79px;
		height: 79px;
	}

	.text-group_2 {
		margin-left: 15rpx;
	}

	.text_4 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 15px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 15px;
	}

	.text_5 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 66px 0 0;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 18px;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 18px;
		margin: 25px 79px 0 0;
	}

	.text_7 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin-top: 66px;
	}

	.group_6 {
		background-color: rgba(216, 216, 216, 1);
		width: 366px;
		height: 1px;
		margin-top: 16px;
	}

	.text-wrapper_1 {
		margin: 5px 15px 0 9px;
		justify-content: flex-end;
	}

	.text_8 {
		overflow-wrap: break-word;
		color: rgba(255, 6, 6, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin-top: 7px;
	}

	.text_9 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 13px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 0 0 130px;
	}

	.text_10 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 16px;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 16px;
		margin: 7px 0 0 3px;
	}

	.text_11 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 25px;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 25px;
	}

	.group_7 {
		// width: 165px;
		margin-right: 28rpx;
		margin-top: 17rpx;
		justify-content: flex-end;

		button {
			margin-left: 28rpx;
		}
	}

	.button_1 {
		border-radius: 15px;
		border: 0.5px solid rgba(151, 151, 151, 1);
		padding: 5px 10px 4px 11px;
	}

	.text_12 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 18px;
	}

	.button_2 {
		margin-left: 15rpx;
		background-image: linear-gradient(90deg, rgba(255, 104, 104, 1) 0, rgba(234, 21, 21, 1) 100%);
		border-radius: 15px;
		padding: 5px 9px 4px 12px;
	}

	.text_13 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 18px;
	}
</style>