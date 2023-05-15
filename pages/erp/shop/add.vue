<template>
	<view>
		<bar-title bgColor="bg-white">
			<block slot="content">配件采购</block>
		</bar-title>
		<!--为上面的临时筛选条进行的临时兼容处理-->
		<view style="padding: 0px 20rpx">
			<view class="block_1 flex-col">
				<view class="section_1 flex-row">
					<view class="image-text_1 flex-col">
						<!-- <image
							class="image_4"
							referrerpolicy="no-referrer"
							src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngd7e51bfea4a1d169fbd1680551225fa3e676e2867ff28a239cd11b01962a9c51"
						/> -->
						<image :src="$httpImage + data.fittingsPhoto" mode="aspectFit" class="image_4"></image>
						<text class="text-group_1">配件主图</text>
					</view>
				</view>
				<view class="section_2 flex-row justify-between">
					<text class="text_4">供货商</text>
					<!-- <view class="input_1 flex-col">
						<text class="text_5">请输入真实姓名</text>
					</view> -->
					<view @tap="supplierTap" class="text_5">
						{{supplierInfo.supplierLinkname ? supplierInfo.supplierLinkname : '请选择供货商'}}
					</view>
				</view>
				<view class="section_3 flex-row justify-between">
					<text class="text_6">仓库</text>
					<view class="flex-col">
						<text class="text_5">{{data.warehouseName}}</text>
					</view>
					<!-- <u-input class="input_1" v-model="fittingsColor"></u-input> -->
				</view>
				<view class="section_3 flex-row justify-between">
					<text class="text_4">配件名称</text>
					<view class="flex-col">
						<text class="text_5">{{data.fittingsName}}</text>
					</view>
					<!-- <u-input class="input_1" v-model="fittingsName"></u-input> -->
				</view>
				<view class="section_3 flex-row justify-between">
					<text class="text_6">颜色</text>
					<view class="flex-col">
						<text class="text_5">{{data.fittingsColor}}</text>
					</view>
					<!-- <u-input class="input_1" v-model="fittingsColor"></u-input> -->
				</view>
				<view class="section_4 flex-row justify-between">
					<text class="text_8">数量</text>
					<u-input class="input_1" v-model="fittingsNumber"></u-input>
				</view>
				<view class="section_5 flex-row">
					<text class="text_10">成本价</text>
					<u-input class="input_1" v-model="fittingsCostPrice"></u-input>
					<text class="text_12">元</text>
				</view>
				<view class="section_6 flex-row">
					<text class="text_13">销售价</text>
					<u-input class="input_1" v-model="fittingsSellPrice"></u-input>
					<text class="text_15">元</text>
				</view>
			</view>
			<view class="orderview-footer-fixed" style="margin-top: 10px">
				<view class="flex flex-direction">
					<button class="cu-btn bg-reds radius-4 margin-tb-sm lg" @tap="upShareimg">确定</button>
				</view>
			</view>
		</view>
		<!--弹窗-->

		<!-- 下拉加载提示 -->
		<!-- <uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more> -->
	</view>
</template>

<script>
	import Vue from 'vue';
	import { fittingsOrder, fittingsOrders } from '@/api/erp.js';
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	export default {
		components: {
			barTitle,
			filterDropdown,
		},
		data() {
			return {
				data: {},
				fittingsOrderId: 0,
				fittingsName: '',
				fittingsColor: '',
				fittingsNumber: '',
				fittingsCostPrice: '',
				fittingsSellPrice: '',
				supplierInfo: {},
			};
		},
		onLoad(options) {
			this.data = uni.getStorageSync('shopAdd');
			this.fittingsCostPrice = options.fittingsCostPrice;
			this.fittingsNumber = options.fittingsNumber;
			this.fittingsSellPrice = options.fittingsSellPrice;
			this.supplierInfo.supplierId = options.supplierId;
			this.supplierInfo.supplierLinkname = options.supplierName;
			this.fittingsOrderId = options.fittingsOrderId;
		},
		// 下拉刷新
		onPullDownRefresh() {},
		onReachBottom() {},
		onShow() {
			let that = this;
			uni.$once('updatesupplier', function (data) {
				console.log(data);
				that.supplierInfo = {
					...data,
				};
			});
		},
		methods: {
			upShareimg() {
				let paramsData = {
					fittingsNumber: this.fittingsNumber,
					fittingsCostPrice: this.fittingsCostPrice,
					fittingsSellPrice: this.fittingsSellPrice,
					wareHouseConfigId: this.data.warehouseId,
					supplierId: Number(this.supplierInfo.supplierId),
					fittingsConfigId: this.data.fittingsConfigId,
					fittingsConfig: {
						warehouseName: this.data.warehouseName,
						fittingsPhoto: this.data.fittingsPhoto,
						fittingsColor: this.data.fittingsColor,
					},
				};
				console.log(this.fittingsOrderId);
				if (this.fittingsOrderId) {
					paramsData.fittingsOrderId = this.fittingsOrderId;
					fittingsOrders(paramsData).then((res) => {
						if (res.code === 200) {
							uni.showToast({
								icon: 'none',
								title: '修改成功',
							});
							uni.navigateBack();
						}
					});
				} else {
					fittingsOrder(paramsData).then((res) => {
						if (res.code === 200) {
							uni.showToast({
								icon: 'none',
								title: '添加成功',
							});
							uni.navigateBack();
						}
					});
				}
			},
			supplierTap() {
				uni.navigateTo({
					url: '/pages/erp/supplier/supplier',
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
	.block_1 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 6px;
		padding: 17px 18px 24px 18px;
	}

	.section_1 {
		width: 120px;
		align-self: center;
	}

	.image-text_1 {
	}

	.image_4 {
		width: 120px;
		height: 120px;
	}

	.text-group_1 {
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		align-self: center;
		margin-top: 9px;
	}

	.section_2 {
		width: 331px;
		margin-top: 28px;
	}

	.text_4 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin-top: 7px;
	}

	.input_1 {
		margin-left: 20rpx;
		border-radius: 6px;
		border: 1px solid rgba(226, 226, 226, 1);
		// padding: 8px 148px 5px 9px;
	}

	.text_5 {
		overflow-wrap: break-word;
		color: rgba(146, 146, 148, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 20px;
	}

	.section_3 {
		width: 331px;
		margin-top: 15px;
	}

	.text_6 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin-top: 6px;
	}

	.input_2 {
		margin-left: 20rpx;
		border-radius: 6px;
		border: 1px solid rgba(226, 226, 226, 1);
		// padding: 8px 134px 5px 9px;
	}

	.text_7 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(146, 146, 148, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 20px;
	}

	.section_4 {
		width: 331px;
		margin-top: 15px;
	}

	.text_8 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin-top: 6px;
	}

	.input_3 {
		margin-left: 20rpx;
		border-radius: 6px;
		border: 1px solid rgba(226, 226, 226, 1);
		// padding: 8px 134px 5px 9px;
	}

	.text_9 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(146, 146, 148, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 20px;
	}

	.section_5 {
		margin-top: 15px;
	}

	.text_10 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin-top: 6px;
	}

	.input_4 {
		border-radius: 6px;
		border: 1px solid rgba(226, 226, 226, 1);
		margin-left: 26px;
		padding: 8px 105px 5px 9px;
	}

	.text_11 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(146, 146, 148, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 20px;
	}

	.text_12 {
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin: 6px 0 0 13px;
	}

	.section_6 {
		margin-top: 15px;
	}

	.text_13 {
		width: 20%;
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin-top: 6px;
	}

	.input_5 {
		border-radius: 6px;
		border: 1px solid rgba(226, 226, 226, 1);
		margin-left: 26px;
		padding: 8px 105px 5px 9px;
	}

	.text_14 {
		overflow-wrap: break-word;
		color: rgba(146, 146, 148, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 20px;
	}

	.text_15 {
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 22px;
		margin: 6px 0 0 13px;
	}
</style>
