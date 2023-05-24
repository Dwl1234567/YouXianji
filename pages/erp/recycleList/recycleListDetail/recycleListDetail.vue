<template>
	<view class="page flex-col">
		<view class="section_1 flex-row">
			<view class="group_2 flex-col">
				<view class="box_1 flex-row">
					<uni-steps :options="logisticsInfo" active-color="#007AFF" :active="active" direction="column" />
				</view>
				<view class="box_2 flex-col">
					<view class="image-text_1 flex-row justify-between">
						<view class="box_3 flex-col">
							<image :src="$httpImage + recycleOrder.modelPhoto" mode="aspectFit"></image>
						</view>
						<view class="text-group_1 flex-col">
							<text class="text_19">{{recycleOrder.modelName}}</text>
							<text class="text_20">{{recycleOrder.deviceLabel}}</text>
							<text class="text_21">序列号:{{recycleOrder.deviceNo}}</text>
							<text class="text_22">回收预估价:{{recycleOrder.firstPrice}}元</text>
						</view>
					</view>
					<view class="group_6 flex-col"></view>
					<view class="text-wrapper_8 flex-row justify-between">
						<text class="text_23">订单来源方式</text>
						<text class="text_24">
							{{recycleOrder.postType == 0 ? '顺丰上门' : recycleOrder.postType == 1? '自行邮寄' : '同城上门'}}
						</text>
					</view>
					<view class="text-wrapper_9 flex-row justify-between">
						<text class="text_25">取件地址</text>
						<text class="text_26" v-if="recycleOrder.pickUpAddressObj">
							{{recycleOrder.pickUpAddressObj.provinceName}},{{recycleOrder.pickUpAddressObj.cityName}},{{recycleOrder.pickUpAddressObj.regionName}},{{recycleOrder.pickUpAddressObj.detailAddress}}
						</text>
					</view>
					<view class="group_7 flex-row justify-between">
						<text class="text_27">收款账户</text>
						<view class="flex-row">
							<text class="text_28" v-if="recycleOrder.userAccount">
								{{recycleOrder.userAccount.bankName}}{{recycleOrder.userAccount.accountNo}}
							</text>
							<view class="box_4 flex-col"></view>
							<text class="text_29" @tap="copyText">复制</text>
						</view>
					</view>
					<view class="group_8 flex-row justify-between">
						<view class="text-wrapper_10 flex-col">
							<text class="text_30">收件人信息</text>
							<text class="text_31">备注</text>
						</view>
						<view class="text-group_2 flex-col">
							<text class="text_32">{{recycleOrder.consigneeAddress}}</text>
							<text class="text_33">{{recycleOrder.remark}}</text>
						</view>
					</view>
				</view>
				<view class="box_5 flex-col">
					<view class="text-wrapper_11 flex-row">
						<text class="text_34">机器图片</text>
					</view>
					<view class="box_6 flex-row justify-between">
						<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
							<view class="scroll-view-item_H demo-text-1" v-for="(item, index) in urls" @tap="viewImg(urls, index)">
								<image :src="item" mode="aspectFit" style="width: 122rpx; height: 122rpx"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="box_8 flex-col">
					<text class="text_35">机器属性</text>
					<view class="group_11 flex-row justify-between">
						<scroll-view class="scroll-view_H" scroll-x="true" bindscroll="scroll" style="width: 100%">
							<view id="demo1" class="scroll-view-item_H demo-text-1">
								<view class="flex-col" :class="tab === 1 ? 'text-wrapper_12': 'text-wrapper_13'" @tap="checkTab(1)">
									<text :class="tab === 1 ? 'text_36': 'text_37'">物品信息</text>
								</view>
							</view>
							<view id="demo2" class="scroll-view-item_H demo-text-2">
								<view class="flex-col" :class="tab === 2 ? 'text-wrapper_12': 'text-wrapper_13'" @tap="checkTab(2)">
									<text :class="tab === 2 ? 'text_36': 'text_37'">成色情况</text>
								</view>
							</view>
							<view id="demo3" class="scroll-view-item_H demo-text-3">
								<view class="flex-col" :class="tab === 3 ? 'text-wrapper_12': 'text-wrapper_13'" @tap="checkTab(3)">
									<text :class="tab === 3 ? 'text_36': 'text_37'">功能情况</text>
								</view>
							</view>
							<view id="demo4" class="scroll-view-item_H demo-text-3">
								<view class="flex-col" :class="tab === 4 ? 'text-wrapper_12': 'text-wrapper_13'" @tap="checkTab(4)">
									<text :class="tab === 4 ? 'text_36': 'text_37'">维修情况</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="text-wrapper_15 flex-row justify-between" v-for="item in qualityInfoList"
						v-if="item.indexs == 1 && tab === 1">
						<text class="text_39">{{item.key}}</text>
						<text class="text_40">{{item.value}}</text>
					</view>
					<view class="text-wrapper_15 flex-row justify-between" v-for="item in qualityInfoList"
						v-if="item.indexs == 2 && tab === 2">
						<text class="text_39">{{item.key}}</text>
						<text class="text_40">{{item.value}}</text>
					</view>
					<view class="text-wrapper_15 flex-row justify-between" v-for="item in qualityInfoList"
						v-if="item.indexs == 3 && tab === 3">
						<text class="text_39">{{item.key}}</text>
						<text class="text_40">{{item.value}}</text>
					</view>
				</view>
				<view class="box_9 flex-row justify-between" v-if="userId == recycleOrder.receiver">
					<button class="button_1 flex-col" @click="onClick_2">
						<text class="text_45">回执</text>
					</button>
					<button class="button_2 flex-col" @click="onClick_3">
						<text class="text_46">同意</text>
					</button>
				</view>
			</view>
		</view>
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="请确认序列号" :value="deviceNo" placeholder="请填写序列号"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import {
		empSelectRecycleOrderDetail,
		empAgreeOrder,
		updateDeviceNo
	} from '@/api/erp.js';
	export default {
		data() {
			return {
				urls: [],
				list: {},
				deviceNo: '',
				input: '',
				editType: 0,
				// 员工id
				userId: null,
				active: 1,
				tab: 1,
				// 邮寄信息
				logisticsInfo: [],
				// 机器属性信息
				qualityInfoList: [],
				// 用户邮寄信息
				recycleOrder: [],
				recycleOrderId: 0,
				loopData0: [{
						lanhuBg1: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/f78e421e38be4ea8bd4af6fa7779b882_mergeImage.png)',
					},
					{
						lanhuBg1: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/14aea857490a4b259f35cf82746dfdca_mergeImage.png)',
					},
					{
						lanhuBg1: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/e2e8a2632cda49dfbff42acf404dfb3d_mergeImage.png)',
					},
					{
						lanhuBg1: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/17e730d9e90146c4b47b3eedda9c64ea_mergeImage.png)',
					},
					{
						lanhuBg1: 'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/e0db6ed3d17040c28582d784a76c148b_mergeImage.png)',
					},
				],
				constants: {},
			};
		},
		onLoad(option) {
			this.recycleOrderId = option.recycleOrderId;
			this.userId = uni.getStorageSync('userinfo').userId;
			this.empSelectRecycleOrderDetail(option.recycleOrderId);
		},
		methods: {
			//查看图片
			viewImg(url, index) {
				//需要分割url并去除空数组
				if (url) {
					if (url[index]) {
						uni.previewImage({
							current: index,
							urls: url,
						});
					}
				} else {}
			},
			empSelectRecycleOrderDetail(recycleOrderId) {
				empSelectRecycleOrderDetail(recycleOrderId).then((res) => {
					if (res.code == 200) {
						const {
							logisticsInfo,
							qualityInfo,
							recycleOrder
						} = res.data;
						this.recycleOrder = recycleOrder;
						// 判断邮寄信息是否查询成功
						if (logisticsInfo.code == 200) {
							const data = logisticsInfo.data.map((item) => {
								return {
									title: item.AcceptStation,
									desc: item.AcceptTime,
								};
							});
							this.active = logisticsInfo.data.length - 1;
							this.logisticsInfo = data;
						}
						this.list = res.data.qualityInfo;
						let urls = [];
						if (this.list.backPhoto) {
							urls.push(this.$httpImage + this.list.backPhoto);
						}
						if (this.list.bottomPhoto) {
							urls.push(this.$httpImage + this.list.bottomPhoto);
						}
						if (this.list.cameraPhoto) {
							urls.push(this.$httpImage + this.list.cameraPhoto);
						}
						if (this.list.frontPhoto) {
							urls.push(this.$httpImage + this.list.frontPhoto);
						}
						if (this.list.leftPhoto) {
							urls.push(this.$httpImage + this.list.leftPhoto);
						}
						if (this.list.otherPhoto) {
							urls.push(this.$httpImage + this.list.otherPhoto);
						}
						if (this.list.rightPhoto) {
							urls.push(this.$httpImage + this.list.rightPhoto);
						}
						if (this.list.topPhoto) {
							urls.push(this.$httpImage + this.list.topPhoto);
						}
						this.urls = urls;
						uni.setStorageSync('imgList', urls);
						this.deviceNo = res.data.recycleOrder.deviceNo;
						this.qualityInfoList = JSON.parse(qualityInfo.qualityInfoList);
						uni.setStorageSync('modelName', recycleOrder.modelName);
						uni.setStorageSync('basicPriceId', JSON.parse(qualityInfo.basicPriceId));
						uni.setStorageSync('qualityInfo', JSON.parse(qualityInfo.qualityInfo));
						uni.setStorageSync('qualityInfoList', JSON.parse(qualityInfo.qualityInfoList));
						uni.setStorageSync('recycleOrderId', recycleOrder.recycleOrderId);
						uni.setStorageSync('createById', recycleOrder.createById);
						uni.setStorageSync('deviceId', recycleOrder.deviceId);
					}
				});
			},
			copyText() {
				const text = this.recycleOrder.userAccount.accountNo;
				uni.setClipboardData({
					data: text,
					success: function() {},
				});
			},
			checkTab(e) {
				this.tab = e;
			},
			onClick_1() {
				alert(1);
			},
			dialogInputConfirm(val) {
				const query = {
					deviceNo: val,
					deviceId: this.recycleOrder.deviceId,
				};
				updateDeviceNo(query).then((res) => {
					if (res.code === 200) {
						if (this.editType == 1) {
							uni.navigateTo({
								url: '/pages/erp/recycleList/recycling-new?modelId=' +
									this.recycleOrder.modelId +
									'&modelPhoto=' +
									this.recycleOrder.modelPhoto,
							});
						} else {
							empAgreeOrder(this.recycleOrderId).then((res) => {
								if (res.code == 200) {
									uni.navigateTo({
										url: '/pages/erp/recycleList/index?type=2',
									});
								}
							});
						}
					}
				});
			},
			onClick_2() {
				this.editType = 1;
				this.$refs.inputDialog.open();
			},
			onClick_3() {
				this.editType = 2;
				this.$refs.inputDialog.open();
			},
		},
	};
</script>
<style lang="css">
	@import './common.css';
	@import './index.rpx.css';

	.page-section-spacing {
		margin-top: 60rpx;
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
</style>