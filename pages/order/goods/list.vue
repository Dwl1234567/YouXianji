<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					<view class="box_2 flex-col" v-for="(item,index) in tabItem.orderList" :key="index">
						<view class="box_3 flex-col">
							<view class="group_3 flex-row">
								<view class="image-text_1 flex-row justify-between">
									<text class="text-group_1">优闲集寻他店</text>
								</view>
								<image class="icon_2" referrerpolicy="no-referrer"
									src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng76a69ec8d984edf3b54d04b77768e328ebb05626d86c986f26777b8490007c8e" />
								<text class="text_3" v-if="item.orderStatus == 0">等待买家付款</text>
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
								<view class="text_8">
									<view class="" v-if="item.surplusTime > 0">倒计时：</view>
									<view class="" v-if="item.surplusTime > 0">
										<u-count-down :time="item.surplusTime * 1000" format="HH:mm:ss"></u-count-down>
									</view>
								</view>
								<!-- <text class="text_8">
									倒计时
									<u-count-down :time="item.surplusTime * 1000" format="HH:mm:ss"></u-count-down>
								</text> -->
								<view class="" style="display: flex; align-items: flex-end">
									<text class="text_9">需付款</text>
									<text class="text_10">¥</text>
									<text class="text_11">{{item.secondHandGoods.sellPrice}}</text>
								</view>
							</view>
							<view class="group_7 flex-row justify-between">
								<button class="button_1 flex-col" @click="onClick_1(item)" v-if="item.orderStatus == 0">
									<text class="text_12">取消订单</text>
								</button>
								<button class="button_2 flex-col" @click="onClick_2(item)" v-if="item.orderStatus == 0">
									<text class="text_13">继续付款</text>
								</button>
								<button class="button_1 flex-col" v-if="item.orderStatus == 1">
									<text class="text_12">等待买家发货</text>
								</button>
								<button class="button_1 flex-col" @click="sales(item)" v-if="item.orderStatus == 3">
									<text class="text_12">申请售后</text>
								</button>
								<button class="button_1 flex-col" @click="returns(item)" v-if="item.orderStatus == 1">
									<text class="text_12">退款</text>
								</button>
								<button class="button_1 flex-col" @click="" v-if="item.orderStatus == 2|| item.orderStatus == 3">
									<text class="text_12">物流信息</text>
								</button>
								<button class="button_2 flex-col" @click="clientConfirm(item)" v-if="item.orderStatus == 2">
									<text class="text_13">确认收货</text>
								</button>
								<button class="button_2 flex-col" @click="goEvaluate(item)" v-if="item.orderStatus == 3">
									<text class="text_13">评价</text>
								</button>
								<button class="button_1 flex-col" v-if="item.orderStatus == 4">
									<text class="text_12">等待商家确认</text>
								</button>
								<button class="button_1 flex-col" @click="goback(item)" v-if="item.orderStatus == 6">
									<text class="text_12">填写退货物流</text>
								</button>
								<button class="button_1 flex-col" @click="goback(item)" v-if="item.orderStatus == 7">
									<text class="text_12">查看物流</text>
								</button>
								<button class="button_1 flex-col" @click="selectNewest(item)" v-if="item.orderStatus == 10">
									<text class="text_12">查看凭证</text>
								</button>
							</view>
						</view>
					</view>
					<u-modal :show="showlogout" @cancel="showlogout = false" @confirm="confirmFuc" title="确认取消订单？"
						:showCancelButton="true"></u-modal>
					<u-popup :show="show" mode="bottom" @close="close" @open="open">
						<view class="prop">
							<view class="title">选择支付方式</view>
							<view class="pay">
								<view class="wxPay">
									<view class="left">
										<image src="/static/微信@2x.png" mode=""></image>
										<text>微信</text>
									</view>
									<view class="right">
										<image :src="isWx ? '/static/checkYuan.png' : '/static/yuan.png'" @tap="checkWx"></image>
									</view>
								</view>
								<view class="zfbPay">
									<view class="left">
										<image src="/static/zhifubao.png" mode=""></image>
										<text>支付宝</text>
									</view>
									<view class="right">
										<image :src="!isWx ? '/static/checkYuan.png' : '/static/yuan.png'" @tap="checkWx"></image>
									</view>
								</view>
							</view>
							<view class="querenbutton" @tap="initiatePayment">确认付款</view>
						</view>
					</u-popup>
					<u-popup :show="salesShow" mode="bottom" @close="close" @open="open" zIndex="888" overlayStyle="z-index: 888">
						<view class="prop">
							<view class="title">售后类型</view>
							<view class="pay">
								<view class="wxPay">
									<view class="left">
										<!-- <image src="/static/微信@2x.png" mode=""></image> -->
										<text>申请售后</text>
									</view>
									<view class="right">
										<image :src="afterSaleType ? '/static/checkYuan.png' : '/static/yuan.png'"
											@tap="checkAfterSaleType"></image>
									</view>
								</view>
								<view class="zfbPay">
									<view class="left">
										<!-- <image src="/static/支付宝@2x.png" mode=""></image> -->
										<text>退货退款</text>
									</view>
									<view class="right">
										<image :src="!afterSaleType ? '/static/checkYuan.png' : '/static/yuan.png'"
											@tap="checkAfterSaleType"></image>
									</view>
								</view>
							</view>
							<view class="group_4 flex-row justify-between">
								<view class="image-text_2 flex-row justify-between">
									<view class="group_5 flex-col"></view>
									<view class="text-group_2 flex-col">
										<text class="text_4" v-if="itemList.secondHandGoods">{{itemList.secondHandGoods.title}}</text>
										<text class="text_5" v-if="itemList.secondHandGoods">
											{{itemList.secondHandGoods.basePriceLabel}}
										</text>
										<text class="text_6" v-if="itemList.secondHandGoods">¥{{itemList.secondHandGoods.sellPrice}}</text>
									</view>
								</view>
								<text class="text_7">X1</text>
							</view>
							<view class="tab">退款说明</view>
							<u--textarea v-model="value1" placeholder="请输入内容" class="textarea"></u--textarea>
							<view class="tab upload">上传图片</view>
							<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
								:maxCount="3"></u-upload>
							<view class="querenbutton" @tap="secondGoodsReturn">确认</view>
						</view>
					</u-popup>
					<!-- 查看凭证 -->
					<u-popup :show="seeShow" mode="bottom" @close="close" @open="open" zIndex="888" overlayStyle="z-index: 888">
						<view class="prop">
							<view class="title">售后类型</view>
							<!-- <u--textarea v-model="returnList.context" placeholder="请输入内容" class="textarea"></u--textarea> -->
							<view class="tab upload">查看图片</view>
							<u-upload :fileList="fileList2" @afterRead="afterRead" @delete="deletePic" name="2" multiple
								:maxCount="3"></u-upload>
						</view>
					</u-popup>
					<u-popup :show="yunShow" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
						<view class="yunShow-top">
							<view class="yunShow-title">送拣信息填写</view>
							<view class="yunShow-item">
								<view class="left">快递公司</view>
								<view class="input">
									<u--input placeholder="请输入内容" :border="'surround'" v-model="logisticsCompany"></u--input>
								</view>
							</view>
							<view class="yunShow-item">
								<view class="left">快递单号</view>
								<view class="input">
									<u--input placeholder="请输入内容" :border="'surround'" v-model="logisticsNo"></u--input>
								</view>
							</view>
						</view>
						<view class="yunShow-bottom">
							<view class="close" @tap="close">取消</view>
							<view class="ok" @tap="clientReturn">确定</view>
						</view>
					</u-popup>
					<!-- 订单列表 -->
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from '@/components/empty';
	import Vue from 'vue';
	import {
		shoppingOrderList,
		continuePayment,
		cancelOrder,
		clientConfirm,
		secondGoodsReturn,
		clientReturn,
		clientRefund,
		selectNewest,
		zfbContinuePayment
	} from '@/api/malls.js';
	export default {
		components: {
			empty,
		},
		data() {
			return {
				seeShow: false,
				fileList2: [],
				returnList: {},
				afterSaleType: true,
				logisticsCompany: '',
				logisticsNo: '',
				fileList1: [],
				value1: '',
				salesShow: false,
				isWx: true,
				yunShow: false,
				show: false,
				showlogout: false,
				itemList: {},
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '待付款',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 1,
						text: '待发货',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 3,
						text: '评价',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 4,
						text: '售后',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
				],
				pageSize: 10,
			};
		},
		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			if (options.state) {
				this.tabCurrentIndex = options.state;
			}
			if (options.type) {
				this.tabCurrentIndex = Number(options.type);
			}
			// #ifndef MP
			this.loadData();
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData();
			}
			// #endif
		},
		onPullDownRefresh() {
			this.pullDownRefresh();
		},
		onBackPress() {
			console.log(222)
		},
		onShow() {},
		methods: {
			// 售后查看凭证
			selectNewest(item) {
				selectNewest({
					orderId: item.orderId,
				}).then((res) => {
					if (res.code === 200) {
						this.seeShow = true;
						this.returnList = res.data;
						this.fileList2 = res.data.afterSaleVoucher.split(',').map((item) => {
							return {
								url: this.$httpImage + item,
							};
						});
					}
				});
			},
			// 退款
			returns(item) {
				clientRefund({
					orderId: item.orderId,
				}).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '退款成功',
					});
					this.navList[this.tabCurrentIndex].page = 1;
					this.loadData();
				});
			},
			// 买点确认退货
			clientReturn() {
				clientReturn({
					orderId: this.itemList.orderId,
					logisticsCompany: this.logisticsCompany,
					logisticsNo: this.logisticsNo,
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '退货物流填写成功',
						});
						this.yunShow = false;
						this.navList[this.tabCurrentIndex].page = 1;
						this.loadData();
					}
				});
			},
			// 买家点击退货物流
			goback(item) {
				this.itemList = item;
				this.yunShow = true;
			},
			// 确认申请售后
			secondGoodsReturn() {
				const photo = this.fileList1.map((item) => {
					return item.url;
				});
				secondGoodsReturn({
					orderId: this.itemList.orderId,
					context: this.value1,
					afterSaleType: this.afterSaleType ? '1' : '0',
					photo: photo.join(','),
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '退货申请成功',
						});
						this.salesShow = false;
						this.navList[this.tabCurrentIndex].page = 1;
						this.loadData();
					}
				});
			},
			// 申请售后
			sales(item) {
				this.itemList = item;
				this.salesShow = true;
			},
			// 去评价
			goEvaluate(item) {
				uni.navigateTo({
					url: '/pages/order/goods/evaluate?shoppingOrderId=' + item.orderId,
				});
			},
			// 确认收获
			clientConfirm(item) {
				clientConfirm({
					orderId: item.orderId,
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '收货成功',
						});
						this.navList[this.tabCurrentIndex].page = 1;
						this.loadData();
					}
				});
			},
			// 确认付款
			initiatePayment(e) {
				console.log({
					orderId: Number(this.itemList.orderId),
					paymentType: this.isWx ? '1' : '0',
				});
				if (!this.isWx) {
					zfbContinuePayment({
						orderId: this.itemList.orderId
					}).then(res => {
						if (res.code === 200) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data.orderStr,
								success: function(ress) {
									paymentReturn({
										orderPaymentId: res.orderPaymentId,
										tradeno: ress.tradeno
									}).then(resss => {
										if (resss.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '支付成功',
											});
											this.loadData();
											this.show = false;

										}
									})
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									if (err.code == -100) {
										uni.showToast({
											icon: 'none',
											title: '支付失败',
										});
										this.loadData();
									}
									console.log('fail:' + JSON.stringify(err));
								}
							})
						}
					})
				}
			},
			checkWx() {
				this.isWx = !this.isWx;
			},
			checkAfterSaleType() {
				this.afterSaleType = !this.afterSaleType;
			},
			// 关闭弹框
			close() {
				this.seeShow = false;
				this.yunShow = false;
				this.salesShow = false;
				this.show = false;
			},
			// 确认付款
			onClick_2(item) {
				this.itemList = item;
				this.show = true;
			},
			// 确认取消订单
			confirmFuc() {
				cancelOrder({
					orderId: this.itemList.orderId,
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '取消成功',
						});
						this.navList[this.tabCurrentIndex].page = 1;
						this.showlogout = false;
						this.loadData();
					}
				});
			},
			// 取消订单
			onClick_1(item) {
				this.itemList = item;
				this.showlogout = true;
			},
			//获取订单列表
			async loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}
				if (navItem.loadingType == 'noMore' && navItem.page !== 1) {
					return;
				}
				let state = navItem.state;
				navItem.loadingType = 'loading';
				shoppingOrderList({
						orderStatus: state,
						pageNum: navItem.page,
						pageSize: this.pageSize,
					})
					.then((res) => {
						let result = res.rows;
						if (!result) {
							navItem.loadingType = 'more';
						} else {
							if (result.length <= res.total) {
								//判断是否还有数据， 有改为 more， 没有改为noMore
								navItem.loadingType = 'noMore';
							} else {
								navItem.loadingType = 'more';
							}
							if (navItem.page == 1) {
								navItem.orderList = result;
							} else {
								result.forEach((item) => {
									item = Object.assign(item, this.orderStateExp(item.state));
									navItem.orderList.push(item);
								});
							}
							navItem.page++;
							// // 页数加一
							// navItem.page++;
							// result.forEach((item) => {
							// 	item = Object.assign(item, this.orderStateExp(item.state));
							// 	navItem.orderList.push(item);
							// });
							//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
							this.$set(navItem, 'loaded', true);
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					});
			},

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index) {
				//console.log('this.tabCurrentIndex',this.tabCurrentIndex,index);
				this.tabCurrentIndex = index;
				this.navList[index].page = 1;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0,
				});
				this.loadData();
			},
			// 订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 0:
						stateTip = '交易成功';
						break;
					case 1:
						stateTip = '待付款';
						break;
					case 2:
						stateTip = '待发货';
						break;
					case 3:
						stateTip = '待收货';
						break;
					case 4:
						stateTip = '待评价';
						break;
					case 5:
						stateTip = '售后';
						break;
					case 6:
						stateTip = '拒绝退款';
						break;
					case 9:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;

						//更多自定义
				}
				return {
					stateTip,
					stateTipColor,
				};
			},
			pullDownRefresh() {
				this.navList = [];
				this.navList = [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 2,
						text: '待发货',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 3,
						text: '待收货',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 4,
						text: '评价',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
					{
						state: 5,
						text: '售后',
						loadingType: 'more',
						orderList: [],
						page: 1,
					},
				];
				this.loadData();
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

		.group_4 {
			margin: 0;
			margin-top: 28rpx;
			border: 2rpx solid #d8d8d8;
			padding: 32rpx 17rpx;
			border-radius: 11rpx;
			margin-bottom: 13rpx;
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

	page,
	.content {
		background: $page-color-base;
		height: 100%;
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
		width: 342px;
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
		margin-right: 10rpx;
	}

	.text-group_2 {}

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
		justify-content: space-between;
		align-items: center;
	}

	.text_8 {
		display: flex;
		align-items: center;
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
		// margin: 9px 15px 0 186px;
		margin-top: 17rpx;
		margin-right: 14px;
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

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				position: relative;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}

				.action-btn {
					width: 160rpx;
					height: 60rpx;
					padding: 0;
					text-align: center;
					line-height: 60rpx;
					font-size: 26rpx;
					color: #303133;
					background: #fff;
					border-radius: 100px;
					float: right;
					position: absolute;
					right: 30rpx;
					bottom: 0;
				}

				.refund {
					position: absolute;
					right: 30rpx;
					font-size: 28rpx;
					color: #fa436a;
					top: 35rpx;
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}

	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center;
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999;
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}

	.uni-load-more__img>view {
		position: absolute;
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: 0.2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite;
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px;
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0;
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px;
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0;
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px;
	}

	.load2 {
		transform: rotate(30deg);
	}

	.load3 {
		transform: rotate(60deg);
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s;
	}

	.load2 view:nth-child(1) {
		animation-delay: 0.13s;
	}

	.load3 view:nth-child(1) {
		animation-delay: 0.26s;
	}

	.load1 view:nth-child(2) {
		animation-delay: 0.39s;
	}

	.load2 view:nth-child(2) {
		animation-delay: 0.52s;
	}

	.load3 view:nth-child(2) {
		animation-delay: 0.65s;
	}

	.load1 view:nth-child(3) {
		animation-delay: 0.78s;
	}

	.load2 view:nth-child(3) {
		animation-delay: 0.91s;
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s;
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s;
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s;
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s;
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.2;
		}
	}
</style>