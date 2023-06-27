<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">调拨列表</block>
		</bar-title>

		<scroll-view scroll-x class="bg-white nav text-center text-xl">
			<view class="cu-item padding-lr-sm " :class="0==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="0" style="position:relative">
				待处理
				<view class="tab-dot bg-white"></view>
			</view>
			<view class="cu-item padding-lr-sm" :class="1==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="1" style="position:relative">
				已接受
				<view class="tab-dot bg-white"></view>
			</view>
			<view class="cu-item padding-lr-sm" :class="2==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="2" style="position:relative">
				已拒绝
				<view class="tab-dot bg-white"></view>
			</view>
		</scroll-view>
		<view class="cu-card article" v-if="0==TabCur">
			<view style="padding: 10px 20rpx">
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
							<image :src="$httpImage + item.backPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
							</image>
							<view class="text-wrapper_2 flex-col">
								<text class="text_8">{{item.modelName}}</text>
								<text class="text_9">{{item.label}}</text>
								<text class="text_10">序列号:{{item.deviceNo}}</text>
								<text class="text_11">调拨价:{{item.allotPrice}}元</text>
							</view>
						</view>
						<text class="text_13">申请调拨门店：{{item.storeName}}</text>
						<text class="text_13">申请人：{{item.nickName}}</text>
						<!-- 判断调拨门店 或 店长 或 回收人同意 -->
						<view class="button"
							v-if="storeId == item.approveStore && (roles.store_admin || userId == item.recyclePeople)">
							<view class="receipt" @tap="agreeAlloteApprove(item, 2)">
								拒绝
							</view>
							<view class="receipt" @tap="agreeAlloteApprove(item, 1)">
								接受
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-card article" v-if="1==TabCur">
			<view style="padding: 10px 20rpx">
				<!-- :class="admin ? 'transform' : 'transformRight'" -->
				<view v-for="(item, index) in dataList1" style="display: flex; align-items: center; margin-bottom: 10px">
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
							<image :src="$httpImage + item.backPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
							</image>
							<view class="text-wrapper_2 flex-col">
								<text class="text_8">{{item.modelName}}</text>
								<text class="text_9">{{item.label}}</text>
								<text class="text_10">序列号:{{item.deviceNo}}</text>
								<text class="text_11">调拨价:{{item.allotPrice}}元</text>
							</view>
						</view>
						<text class="text_13">申请调拨门店：{{item.storeName}}</text>
						<text class="text_13">申请人：{{item.nickName}}</text>
						<!-- 判断调拨门店 或 店长 或 回收人同意 -->
						<!-- <view class="button"
							v-if="storeId == item.approveStore && (roles.store_admin || userId == item.recyclePeople)">
							<view class="receipt" @tap="agreeAlloteApprove(item, 2)">
								拒绝
							</view>
							<view class="receipt" @tap="agreeAlloteApprove(item, 1)">
								接受
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore1" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-card article" v-if="2==TabCur">
			<view style="padding: 10px 20rpx">
				<!-- :class="admin ? 'transform' : 'transformRight'" -->
				<view v-for="(item, index) in dataList2" style="display: flex; align-items: center; margin-bottom: 10px">
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
							<image :src="$httpImage + item.backPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
							</image>
							<view class="text-wrapper_2 flex-col">
								<text class="text_8">{{item.modelName}}</text>
								<text class="text_9">{{item.label}}</text>
								<text class="text_10">序列号:{{item.deviceNo}}</text>
								<text class="text_11">调拨价:{{item.allotPrice}}元</text>
							</view>
						</view>
						<text class="text_13">申请调拨门店：{{item.storeName}}</text>
						<text class="text_13">申请人：{{item.nickName}}</text>
						<!-- 判断调拨门店 或 店长 或 回收人同意 -->
						<!-- <view class="button"
							v-if="storeId == item.approveStore && (roles.store_admin || userId == item.recyclePeople)">
							<view class="receipt" @tap="agreeAlloteApprove(item, 2)">
								拒绝
							</view>
							<view class="receipt" @tap="agreeAlloteApprove(item, 1)">
								接受
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore2" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		storeAllotList,
		agreeAlloteApprove
	} from "@/api/erp.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				userId: null,
				roles: {},
				TabCur: 0,
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
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				modalName: null,
				refuseRemark: '', //拒绝原因
				checkInfo: '', //选中拒绝的信息
			}
		},
		onLoad() {
			// this.storeId = storeInfo.store_id;
			// 进入页面刷新
			this.userId = uni.getStorageSync('userinfo').useId
			this.roles = uni.getStorageSync('roles')
			this.storeId = uni.getStorageSync('userinfo').storeId
			this.getDataList()
			uni.startPullDownRefresh();
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
			if (this.TabCur == 1) {
				this.queryInfo.pageNum = 1; //重置分页页码
			} else if (this.TabCur == 2) {
				this.queryInfo1.pageNum = 1; //重置分页页码
			} else {
				this.queryInfo2.pageNum = 1; //重置分页页码
			}
			this.getDataList();

		},
		onReachBottom() {
			if (this.TabCur == 0) {
				if (this.loadmore == 'noMore') return
				this.queryInfo.pageNum += 1;
				this.ifBottomRefresh = true
				this.getDataList();
			} else if (this.TabCur == 1) {
				if (this.loadmore1 == 'noMore') return
				this.queryInfo1.pageNum += 1;
				this.ifBottomRefresh1 = true
				this.getDataList();
			} else {
				if (this.loadmore2 == 'noMore') return
				this.queryInfo2.pageNum += 1;
				this.ifBottomRefresh2 = true
				this.getDataList();
			}

		},
		methods: {
			agreeAlloteApprove(item, index) {
				agreeAlloteApprove({
					allotId: item.allotId,
					approveStatus: index
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '处理成功',
						})
						this.getDataList()
					}
				})
			},
			copy(value) {
				uni.setClipboardData({
					data: value
				});
			},
			tabSelect(e) {
				// console.log(e);
				if (this.TabCur != e.currentTarget.dataset.id) {
					// 进入页面刷新
					uni.startPullDownRefresh();
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getDataList() {
				let that = this;
				let paramsData = that.TabCur == 0 ? that.queryInfo : that.TabCur == 1 ? that.queryInfo1 : that.queryInfo2;
				paramsData.approveStatus = that.TabCur
				storeAllotList(paramsData).then(res => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.TabCur == 0) {
								if (that.ifBottomRefresh) {
									that.dataList = that.dataList.concat(data)
								} else {
									that.dataList = data
								}
								that.ifBottomRefresh = false
								that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
							} else if (that.TabCur == 1) {
								if (that.ifBottomRefresh1) {
									that.dataList1 = that.dataList1.concat(data)
								} else {
									that.dataList1 = data
								}
								that.ifBottomRefresh1 = false
								that.loadmore1 = res.total == that.dataList1.length ? 'noMore' : 'more'
							} else {
								if (that.ifBottomRefresh2) {
									that.dataList2 = that.dataList2.concat(data)
								} else {
									that.dataList2 = data
								}
								that.ifBottomRefresh2 = false
								that.loadmore2 = res.total == that.dataList2.length ? 'noMore' : 'more'
							}
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			allotTop(info, type) {
				let that = this;
				if (info) {
					this.checkInfo = info;
				} else {
					that.$u.toast('暂无数据，请刷新页面');
					return false;
				}
				if (type == 1) { //同意
					console.log('同意直接提交');
					updatesingletransfer({
						allot_id: info.id,
						allot_status: 2,
					}).then(res => {
						that.$u.toast(res.msg);
						uni.startPullDownRefresh({

						})
					})
				} else if (type == 3) {
					console.log('拒绝后弹窗提交');
					if (!that.refuseRemark) {
						return uni.showToast({
							title: '请输入拒绝原因!',
							icon: "none"
						});
					}
					updatesingletransfer({
							allot_id: this.checkInfo.id,
							allot_status: 3,
							remarks: this.refuseRemark
						}).then(res => {
							that.$u.toast(res.msg);

						})
						.finally(() => {
							uni.startPullDownRefresh({})
							this.modalName = null
						})
				} else {
					this.modalName = 'Modal'
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style lang="scss">
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
</style>