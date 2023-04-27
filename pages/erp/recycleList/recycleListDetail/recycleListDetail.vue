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
							<image :src="$httpImage + recycleOrder.modelPhoto" model="aspectFit"></image>
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
							{{recycleOrder.postType == 0 ? '顺丰上门' : recycleOrder.postType == 1? '自行邮寄' :
							'同城上门'}}
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
						<view class="list_1 flex-row">
							<view class="list-items_1 flex-col" v-for="(item, index) in loopData0" :key="index">
								<view class="group_9 flex-col" :style="{ background: item.lanhuBg1 }"></view>
							</view>
						</view>
						<view class="group_10 flex-col">
							<view class="box_7 flex-col"></view>
						</view>
					</view>
				</view>
				<view class="box_8 flex-col">
					<text class="text_35">机器属性</text>
					<view class="group_11 flex-row justify-between">
						<view
							class="flex-col"
							:class="tab === 1 ? 'text-wrapper_12': 'text-wrapper_13'"
							@tap="checkTab(1)"
						>
							<text :class="tab === 1 ? 'text_36': 'text_37'">物品信息</text>
						</view>
						<view
							class="flex-col"
							:class="tab === 2 ? 'text-wrapper_12': 'text-wrapper_13'"
							@tap="checkTab(2)"
						>
							<text :class="tab === 2 ? 'text_36': 'text_37'">成色情况</text>
						</view>
						<view
							class="flex-col"
							:class="tab === 3 ? 'text-wrapper_12': 'text-wrapper_13'"
							@tap="checkTab(3)"
						>
							<text :class="tab === 3 ? 'text_36': 'text_37'">功能情况</text>
						</view>
						<view
							class="flex-col"
							:class="tab === 4 ? 'text-wrapper_12': 'text-wrapper_13'"
							@tap="checkTab(4)"
						>
							<text :class="tab === 4 ? 'text_36': 'text_37'">维修情况</text>
						</view>
					</view>
					<view
						class="text-wrapper_15 flex-row justify-between"
						v-for="item in qualityInfoList"
						v-if="item.indexs == 1 && tab === 1"
					>
						<text class="text_39">{{item.key}}</text>
						<text class="text_40">{{item.value}}</text>
					</view>
					<view
						class="text-wrapper_15 flex-row justify-between"
						v-for="item in qualityInfoList"
						v-if="item.indexs == 2 && tab === 2"
					>
						<text class="text_39">{{item.key}}</text>
						<text class="text_40">{{item.value}}</text>
					</view>
					<view
						class="text-wrapper_15 flex-row justify-between"
						v-for="item in qualityInfoList"
						v-if="item.indexs == 3 && tab === 3"
					>
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
			<uni-popup-dialog
				ref="inputClose"
				mode="input"
				title="请确认序列号"
				:value=deviceNo
				placeholder="请填写序列号"
				@confirm="dialogInputConfirm"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
	import { empSelectRecycleOrderDetail, empAgreeOrder, updateDeviceNo } from '@/api/erp.js';
	export default {
		data() {
			return {
				deviceNo: '',
				input:'',
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
				loopData0: [
					{
						lanhuBg1:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/f78e421e38be4ea8bd4af6fa7779b882_mergeImage.png)',
					},
					{
						lanhuBg1:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/14aea857490a4b259f35cf82746dfdca_mergeImage.png)',
					},
					{
						lanhuBg1:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/e2e8a2632cda49dfbff42acf404dfb3d_mergeImage.png)',
					},
					{
						lanhuBg1:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/17e730d9e90146c4b47b3eedda9c64ea_mergeImage.png)',
					},
					{
						lanhuBg1:
							'url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/e0db6ed3d17040c28582d784a76c148b_mergeImage.png)',
					},
				],
				constants: {},
			};
		},
		onLoad(option) {
			// console.log(this.$httpImage);
			this.recycleOrderId = option.recycleOrderId;
			this.userId = uni.getStorageSync('userinfo').userId;
			this.empSelectRecycleOrderDetail(option.recycleOrderId);
		},
		methods: {
			empSelectRecycleOrderDetail(recycleOrderId) {
				empSelectRecycleOrderDetail(recycleOrderId).then((res) => {
					console.log(res);
					if (res.code == 200) {
						const { logisticsInfo, qualityInfo, recycleOrder } = res.data;
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
						this.deviceNo = res.data.recycleOrder.deviceNo;
						this.qualityInfoList = JSON.parse(qualityInfo.qualityInfoList);
						uni.setStorageSync('modelName', recycleOrder.modelName)
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
					success: function () {
						// console.log('success');
					},
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
					deviceId: this.recycleOrder.deviceId
				}
				updateDeviceNo(query).then(res => {
					if (res.code === 200) {
						if (this.editType == 1) {
							uni.navigateTo({
								url: '/pages/erp/recycleList/recycling-new?modelId=' + this.recycleOrder.modelId,
							});
						} else {
							empAgreeOrder(this.recycleOrderId).then((res) => {
								if (res.code == 200) {
									uni.navigateTo({
										url: '/pages/erp/recycleList/index',
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
</style>
