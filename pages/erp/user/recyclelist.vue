<template>
	<view class="page flex-col">
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<!-- <block slot="right">
				<text class="cuIcon-scan" @tap="snTap" />
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
		<view class="group_1">
			<view class="cu-item arrow" style="display: flex; justify-content: space-between; padding: 20rpx 20rpx">
				<view class="content">筛选时间</view>
				<view class="action">
					<view class="picker text-gray" @tap="show = true">{{ time ? time : '请选择月份'}}</view>
				</view>
			</view>
			<view class="block_3 flex-col">
				<view class="group_2 flex-col" v-for="(item,index) in recycleList" :key="index">
					<view class="text-wrapper_2 flex-row justify-between">
						<text class="text_8">时间:{{item.createTime}}</text>
					</view>
					<view class="group_3 flex-row justify-between">
						<view class="image-text_1 flex-row">
							<view class="box_2 flex-col">
								<image :src="$httpImage + item.modelPhoto" mode="widthFix"></image>
							</view>
							<view class="text-group_1 flex-col">
								<text class="text_9">{{item.modelName}}</text>
								<text class="text_10">{{item.label}}</text>
								<text class="text_11">序列号:{{item.deviceNo}}</text>
								<text class="text_12">回收价:{{item.recyclePrice}}元</text>
							</view>
							<view class="tag_1 flex-col"></view>
						</view>
						<view class="group_4 flex-col">
							<button class="tag_2 flex-col" v-if="item.postType == 0">
								<text class="text_14">顺丰上门</text>
							</button>
							<view class="button_1 flex-col" v-if="item.postType == 1">
								<text class="text_13">自行邮寄</text>
							</view>
							<view class="tag_3 flex-col" v-if="item.postType == 2">
								<text class="text_15">同城上门</text>
							</view>
						</view>
					</view>
					<!-- <view class="group_5 flex-row justify-between" v-if="item.orderStatus != 7">
						<button class="button_3 flex-col" v-if="item.orderStatus == 1">
							<text class="text_17">待确认</text>
						</button>
						<button class="button_3 flex-col" @tap="payShows(item.recycleOrderId)" v-else-if="item.orderStatus == 2">
							<text class="text_17">去付款</text>
						</button>
						<button class="button_3 flex-col" v-else-if="item.orderStatus == 3" @tap="kaidan(item)">
							<text class="text_17">开单</text>
						</button>
						<button class="button_3 flex-col" @tap="goBack(item.recycleOrderId)" v-else-if="item.orderStatus == 4">
							<text class="text_17">确认退回</text>
						</button>
						<button class="button_3 flex-col" v-else-if="item.orderStatus == 5">
							<text class="text_17">退回中</text>
						</button>
						<button class="button_3 flex-col" @tap="goDetail(item.recycleOrderId)" v-else>
							<text class="text_17">查看订单</text>
						</button>
					</view> -->
				</view>
			</view>
		</view>

		<u-popup :show="payShow" mode="center">
			<view class="block_31 flex-col">
				<text class="text_23">付款凭证</text>
				<view class="block_4 flex-col"></view>
				<view class="list_1 flex-row">
					<!-- <view class="image-wrapper_1 flex-col" v-for="(item, index) in loopData0" :key="index">
						<image class="thumbnail_4" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
					</view> -->
					<view class="cu-dialog">
						<view class="padding-xl">
							<view class="cu-list grid col-2">
								<view class="cu-item bg-deepblue">
									<input class="text-green text-lg" type="number" v-model="weixinnum" placeholder="微信"
										@input="ActualreceiptsAllFuc"></input>
								</view>
								<view class="cu-item bg-deepblue">
									<input class="text-blue" type="number" v-model="alipaynum" placeholder="支付宝"
										@input="ActualreceiptsAllFuc"></input>
								</view>
								<view class="cu-item bg-deepblue">
									<input class="text-red" type="number" v-model="xianjinnum" placeholder="现金"
										@input="ActualreceiptsAllFuc"></input>
								</view>
								<view class="cu-item bg-deepblue">
									<input class="text-purple" type="number" v-model="dihuonum" placeholder="抵货款"
										@input="ActualreceiptsAllFuc"></input>
								</view>
							</view>
							<view class="margin-top">
								总计：<text class="text-red">{{ActualreceiptsAll}}</text>
							</view>
							<view class="cu-form-group pingzheng" :class="switchGD?'hide':''">
								<view class="title">收款凭证</view>
								<view class="cu-capsule round" @tap="paiTap">
									<view class="cu-tag bg-deepblue">
										<text class="cuIcon-camera text-white"></text>
									</view>
									<view class="cu-tag line-deepblue">
										图
									</view>
								</view>
							</view>

							<view class="cu-form-group" v-if="imgList1.length > 0">
								<view class="grid col-3 grid-square flex-sub">
									<view class="bg-img" v-for="(item,index) in imgList1" :key="index" @tap="ViewImage"
										:data-url="imgList1[index]">
										<image :src="imgList1[index]" mode="aspectFill"></image>
										<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
											<text class='cuIcon-close'></text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<button class="button_11 flex-col" @click="onClick_1">
					<text class="text_24">确认付款</text>
				</button>
			</view>
		</u-popup>
		<u-popup :show="goBackShow" mode="center">
			<view class="box_5 flex-col">
				<view class="text-wrapper_5">
					<text class="text_177">物流信息</text>
					<text class="text_18">填写</text>
				</view>
				<view class="section_4 flex-row justify-between">
					<text class="text_19">快递公司</text>
					<view class="dropdown_1 flex-row justify-between">
						<u-input type="text" v-model="returnPostComp" />
					</view>
				</view>
				<view class="section_5 flex-row justify-between">
					<text class="text_21">快递单号</text>
					<view class="dropdown_1 flex-col justify-between">
						<u-input type="text" style="height: 19px;" v-model="returnPostNo" />
					</view>
				</view>
				<view class="section_6 flex-col"></view>
				<view class="section_7 flex-row justify-between">
					<text class="text_233" @tap="goBackShow = fasle">取消</text>
					<view class="group_55 flex-col"></view>
					<text class="text_244" @tap="goBackFir">确定</text>
				</view>
			</view>
		</u-popup>
		<u-calendar :show="show" mode="range" @confirm="aaa" @close="close"></u-calendar>
		<u-action-sheet :actions="upimageList" :closeOnClickAction="true" @close="closeUpimg" :cancelText="'取消'"
			@select="selectUpimg" :show="showupimage"></u-action-sheet>
	</view>
</template>
<script>
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import {
		getMyRecycleList,
		empRobRecycleOrder,
		empConfirmPayment,
		empConfirmReturn
	} from '@/api/erp.js';
	import {
		raiseUpload
	} from "@/api/upload.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle,
			barSearchTitle
		},
		data() {
			return {
				time: null,
				startTime: null,
				endTime: null,
				deviceNo: null,
				show: false,
				TabCur: 1,
				upimageList: [{
						name: '拍照',
						value: 1,
					},
					{
						name: '相册选图',
						value: 2,
					}
				],
				showupimage: false,
				imgList: [], //销售图片
				imgList1: [],
				weixinnum: '',
				alipaynum: '',
				xianjinnum: '',
				dihuonum: '',
				ActualreceiptsAll: 0, //实收款总计
				switchGD: false,
				// 快递公司
				returnPostComp: '',
				// 快递单号
				returnPostNo: '',
				// 付款凭证
				paymentVoucher: '',
				// 订单id
				recycleOrderId: 0,
				payShow: false,
				goBackShow: false,
				constants: {},
				loopData0: [{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng82a231131af99408dfa1b1126561c726f46f1ebcc21c22bdd30a4947b898f933',
					},
					{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng82a231131af99408dfa1b1126561c726f46f1ebcc21c22bdd30a4947b898f933',
					},
					{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng82a231131af99408dfa1b1126561c726f46f1ebcc21c22bdd30a4947b898f933',
					},
				],
				tab: 1,
				// 回收订单列表
				recycleList: [],
				queryPage: {
					pageNum: 1,
					pageSize: 10000,
					orderStatusList: ['0'],
				},
			};
		},
		onLoad(option) {
			this.tab = option.type;
			this.selectRecycleOrderList();
		},
		// 触底加载新页面
		onReachBottom() {
			if (this.queryPage.total > this.recycleList.length) {
				this.queryPage.pageNum = this.queryPage.pageNum + 1;
				this.selectRecycleOrderList(true);
			}
		},
		methods: {
			aaa(value) {
				this.startTime = value[0];
				this.endTime = value[1];
				this.time = value[0] + '-' + value[1];
				this.selectRecycleOrderList();
				this.show = false;
			},
			close() {
				this.show = false
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.selectRecycleOrderList()
			},
			searchTap(e) {
				this.deviceNo = e;
				this.selectRecycleOrderList()
			},
			// 开单
			kaidan(item) {
				uni.navigateTo({
					url: '/pages/erp/diandianUnpload/diandianUnpload?recycleOrderId=' + item.recycleOrderId + '&modelId=' +
						item.modelId
				})
			},
			selectUpimg(e) {
				console.log(e);
				if (e.value == 1) {
					this.opencamare();
				} else {
					this.openpictrue();
				}
			},
			DelImg(e) {
				let that = this;
				that.imgList1.splice(e.currentTarget.dataset.index, 1)
				// uni.showModal({
				// 	title: '提示',
				// 	content: '确定要删除吗？',
				// 	success: res => {
				// 		if (res.confirm) {
				// 			that.imgList1.splice(e.currentTarget.dataset.index, 1)
				// 		}
				// 	}
				// })
			},
			// 使用拍照功能
			opencamare() {
				let that = this;
				let uplength = 9;
				if (that.TabCur) {
					uplength = 9 - Number(that.imgList1.length);
				} else {
					uplength = 9 - Number(that.imgList.length);
				}
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						if (that.TabCur) {
							if (that.imgList1.length != 0) {
								that.imgList1 = that.imgList1.concat(res.tempFilePaths)
							} else {
								that.imgList1 = res.tempFilePaths
							}
							return;
						}
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
						console.log(that.imgList);
					},
					complete: function() {
						that.checkimgshow = false;
					}

				});
			},
			// 使用相册功能
			openpictrue() {
				let that = this;
				let uplength = 9;
				if (that.TabCur) {
					uplength = 9 - Number(that.imgList1.length);
				} else {
					uplength = 9 - Number(that.imgList.length);
				}
				console.log(uplength);
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res)
						if (that.TabCur) {
							if (that.imgList1.length != 0) {
								that.imgList1 = that.imgList1.concat(res.tempFilePaths)
							} else {
								that.imgList1 = res.tempFilePaths
							}
							return;
						}
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
						console.log(that.imgList);
					},
					complete: function() {
						that.checkimgshow = false;
					}
				});
			},
			paiTap() {
				console.log('拍照、选图');
				this.showupimage = true;
			},
			closeUpimg() {
				this.showupimage = false;
			},
			// 实收款总计
			ActualreceiptsAllFuc() {
				// this.ActualreceiptsAll = 0;
				// this.ReceivablesMoney = 0;
				this.ActualreceiptsAll = Number(this.weixinnum) + Number(this.alipaynum) + Number(this.xianjinnum) + Number(this
					.dihuonum)
				this.ActualreceiptsJson = JSON.stringify({
					wexin: Number(this.weixinnum),
					alipay: Number(this.alipaynum),
					xianjin: Number(this.xianjinnum),
					dihuo: Number(this.dihuonum)
				});
				this.arrearsMoney = this.ReceivablesMoney - this.ActualreceiptsAll;
			},
			// 退回接口
			goBackFir() {
				empConfirmReturn({
					'recycleOrderId': this.recycleOrderId,
					'returnPostComp': this.returnPostComp,
					'returnPostNo': this.returnPostNo
				}).then(res => {
					if (res.code == 200) {
						this.selectRecycleOrderList()
						this.goBackShow = false;
					}
				})
			},
			// 确认退回
			goBack(recycleOrderId) {
				this.recycleOrderId = recycleOrderId;
				this.goBackShow = true;
			},
			payShows(recycleOrderId) {
				this.recycleOrderId = recycleOrderId;
				this.payShow = true;
			},

			// 获取回收订单列表
			selectRecycleOrderList(isReach = false) {
				this.queryPage.deviceNo = this.deviceNo
				this.queryPage.onlineRecycleFlag = this.TabCur - 1
				getMyRecycleList(this.queryPage).then((res) => {
					if (isReach) {
						this.recycleList = this.recycleList.concat(res.rows);
					} else {
						this.recycleList = res.rows;
					}
				}).finally(() => {
					uni.stopPullDownRefresh();
				});
			},
			// 员工抢单
			empRobRecycleOrder(recycleOrderId) {
				empRobRecycleOrder(recycleOrderId).then((res) => {
					if (res.code == 200) {
						this.queryPage.total = res.total;
						this.selectRecycleOrderList();
					}
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: '/pages/erp/recycleList/recycleListDetail/recycleListDetail?recycleOrderId=' + item,
				});
			},
			checkTab(e) {
				this.tab = e;
				if (e == 1) {
					this.queryPage.orderStatusList = ['0'];
				} else if (e == 2) {
					this.queryPage.orderStatusList = ['1', '2', '3', '7'];
				} else if (e == 3) {
					this.queryPage.orderStatusList = ['4', '5'];
				} else {
					this.queryPage.orderStatusList = ['6'];
				}
				this.selectRecycleOrderList();
			},
			onClick_1() {
				let promisearr = this.imgList1.map(item => {
					return raiseUpload(item)
				})
				let imagesList = []
				Promise.all(promisearr).then((res) => {
					// console.log(res);
					console.log(res)
					// imagesList.push(res[0].fileName)
					res.map(itemm => {
						imagesList.push(itemm.fileName)
					})
				}).finally(() => {
					this.push(imagesList.join(','))
				})

				// setTimeout(this.push(), 1000)

			},
			push(list) {
				empConfirmPayment({
					'recycleOrderId': this.recycleOrderId,
					"wxPaymentPrice": this.weixinnum,
					"zfbPaymentPrice": this.alipaynum,
					"bankCardPrice": this.dihuonum,
					"cashPaymentPrice": this.xianjinnum,
					'paymentVoucher': list,
				}).then((res) => {
					if (res.code == 200) {
						this.selectRecycleOrderList();
						this.payShow = false;
					}
				})
			},
			onClick_2(item) {
				this.empRobRecycleOrder(item.recycleOrderId);
			},
			onClick_3() {
				alert(1);
			},
		},
	};
</script>
<style lang="css">
	@import './common.css';
	@import './index.rpx.css';

	page {
		background-color: rgba(240, 240, 240, 1);
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

	.block_3 {
		width: 100vw;
	}
</style>