<template>
	<view>
		<bar-title bgColor="bg-white">
			<block slot="content">供应商列表</block>
			<block slot="right">
				<button class="cu-btn sm" @tap="snTap">
					<!-- <text class="cuIcon-add" /> -->
					{{admin ? '完成' : '管理'}}
				</button>
			</block>
		</bar-title>
		<filterDropdown
			ref="filterDropdown"
			:menuTop="filtertopnum"
			:filterData="shopownerFilterData"
			:defaultSelected="defaultSelected"
			:updateMenuName="true"
			@confirm="confirm"
			@change="changefilter"
			dataFormat="Object"
		></filterDropdown>
		<!--为上面的临时筛选条进行的临时兼容处理-->
		<view style="padding: 0px 20rpx">
			<!-- :class="admin ? 'transform' : 'transformRight'" -->
			<view v-for="(item, index) in dataList" style="display: flex; align-items: center">
				<view :class="admin ? '' : 'transform'" style="margin-right: 28rpx">
					<view class="radio" :class="item.disabled ? 'radio-red' : ''" @tap="radioChange(index)"></view>
				</view>
				<view class="group_3 flex-col">
					<view class="text-wrapper_1 flex-row justify-between">
						<text class="text_6">单号:{{item.sortNo}}</text>
						<text class="text_7">时间:2{{item.createTimeStr}}</text>
					</view>
					<view class="section_1 flex-row">
						<view class=""></view>
						<image
							:src="$httpImage + item.modelPhoto"
							mode="aspectFit"
							class="cu-avatar lg radius box_5 flex-col"
						></image>
						<view class="text-wrapper_2 flex-col">
							<text class="text_8">{{item.modelName}}</text>
							<text class="text_9">{{item.label}}</text>
							<text class="text_10">序列号:{{item.deviceNo}}</text>
							<text class="text_11">回收价:{{item.recyclePrice}}元</text>
						</view>
						<view class="tag_1 flex-col" v-if="item.sortStatus == 0">
							<text class="text_12">待送拣</text>
						</view>
						<view class="tag_33 flex-col" v-if="item.sortStatus == 1">
							<text class="text_33">已送检</text>
						</view>
					</view>
					<text class="text_13">回收人：{{item.recyclePeopleName}}</text>
				</view>
			</view>
		</view>
		<view class="bottomView" :class="admin ? '' : 'transform'">
			<view>
				<u-checkbox-group style="align-items: center" @change="allCheck">
					<u-checkbox v-model="checked" active-color="red" shape="circle" style="width: 38rpx; height: 38rpx">
						光影
					</u-checkbox>
					全选
				</u-checkbox-group>
			</view>
			<view class="goXiu" @tap="goXiu">送检</view>
		</view>
		<!--弹窗-->
		<u-popup :show="yunShow" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">送拣信息填写</view>
				<view class="yunShow-item">
					<view class="left">运营中心</view>
					<view class="select">
						<uni-data-select v-model="centerId" :localdata="range" @change="change"></uni-data-select>
					</view>
				</view>
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
				<view class="yunShow-item" v-if="address">
					<view class="left">收件地址</view>
					<view class="inputAddress">
						{{address}}
						<view class="copy" @tap="copy">一键复制</view>
					</view>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="addInspectDevices">确定</view>
			</view>
		</u-popup>

		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import { sortingList, getOperatingCenter, addInspectDevice } from '@/api/erp.js';
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
				address: '',
				// 运营中心id
				centerId: 0,
				// 物流公司
				logisticsCompany: '',
				// 物流单号
				logisticsNo: '',
				range: [
					{ value: 0, text: '篮球' },
					{ value: 1, text: '足球' },
					{ value: 2, text: '游泳' },
				],
				values: '',
				// 运营中心弹框
				yunShow: false,
				checked: false,
				// 控制管理
				admin: false,
				filerData: [],
				filtertopnum: '83', //筛选条高度
				defaultSelected: [],
				// 店长可视页面
				shopownerFilterData: [
					{
						name: '是否直售',
						type: 'hierarchy',
						submenu: [
							{
								name: '全部', //全部设为默认，选中时标签栏显示为全部
								value: '0,1,2,3',
							},
							{
								name: '待送检',
								value: '0',
							},
							{
								name: '已送检',
								value: '1,2',
							},
							{
								name: '代取回',
								value: '3',
							},
							{
								name: '已取回',
								value: '4',
							},
						],
					},
					{
						name: '抛售状态',
						type: 'hierarchy',
						submenu: [
							{
								name: '全部',
								value: '5,6,7',
							},
							{
								name: '待抛售',
								value: '5',
							},
							{
								name: '抛售中',
								value: '6',
							},
							{
								name: '已抛售',
								value: '7',
							},
						],
					},
					{
						name: '维修状态', //选择
						type: 'hierarchy',
						submenu: [
							{
								name: '全部', //设为默认
								value: '8,9',
							},
							{
								name: '待维修',
								value: '8',
							},
							{
								name: '维修中',
								value: '9',
							},
						],
					},
				],
				modalName: null,
				// modalName: 'TongyongModal1',
				type: 1,
				title: '分拣处理',
				tab_scroll: 0,
				tab_cur: 0,
				nav_list: [
					{
						name: '物品信息',
						child: [],
					},
					{
						name: '成色情况',
						child: [],
					},
					{
						name: '功能情况',
						child: [],
					},
				],
				radiolist1: [
					{
						name: '待抛售',
						value: '1',
					},
					{
						name: '抛售中',
						value: '2',
					},
					{
						name: '已抛售',
						value: '3',
					},
				],
				radiovalue1: '',
				radiovalue2: '',
				radiolist2: [
					{
						name: '待送修',
						value: '1',
					},
					{
						name: '已送修',
						value: '2',
					},
					{
						name: '已取回',
						value: '3',
					},
				],
				checktitle: '',
				checkgoodsid: '',
				remark: '', //维修备注
				CostMoney: '',
				iszs: false,
				isps: true,
				iswx: false,
				switchstatus: false,
				retrieveList: [],
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh: false,
				dataList: [],
				thirdInfo: '',
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				newnav_list: [],
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					contentdown: '加载更多数据',
					contentrefresh: '加载中...',
					contentnomore: '暂无更多数据。',
				},
			};
		},
		onLoad(options) {
			// #ifdef APP-PLUS
			this.filtertopnum = 1;
			// #endif
			// 进入页面刷新
			this.getOperatingCenter();
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			});
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
			let that = this;
			uni.$once('updatethird', function (data) {
				that.thirdInfo = data;
			});
		},
		methods: {
			// 提交运营中心
			addInspectDevices() {
				let sortIdList = [];
				this.dataList.map((item) => {
					if (item.disabled) {
						sortIdList.push(item.sortId);
					}
				});
				let promise = {
					centerId: this.centerId,
					logisticsCompany: this.logisticsCompany,
					logisticsNo: this.logisticsNo,
					sortIdList,
				};
				addInspectDevice(promise).then((res) => {
					if (res.code === 200) {
						this.yunShow = false;
						this.getDataList();
					}
				});
			},
			// 复制运营中心地址
			copy() {
				uni.setClipboardData({
					data: this.address,
					success: () =>
						uni.showToast({
							title: '链接已复制',
						}),
				});
			},
			// 运营中心选择change
			change(e) {
				this.centerId = e;
				this.range.map((item) => {
					if (item.value === e) {
						this.address = item.address;
					}
				});
			},
			// 获取运营中心select
			getOperatingCenter() {
				getOperatingCenter(uni.getStorageSync('userinfo').storeId).then((res) => {
					let data = res.data.map((item) => {
						item.text = item.operatingCenterName;
						item.value = item.operatingCenterId;
						return item;
					});
					this.range = data;
				});
			},
			// 关闭送检弹框
			close() {
				this.yunShow = false;
			},
			// 送检
			goXiu() {
				this.yunShow = true;
			},
			// 全选
			allCheck() {
				this.checked = !this.checked;
				if (this.checked) {
					this.dataList.map((item) => {
						return (item.disabled = true);
					});
				} else {
					this.dataList.map((item) => {
						return (item.disabled = false);
					});
				}
			},
			// 点击多选按钮
			radioChange(e) {
				this.dataList[e].disabled = !this.dataList[e].disabled;
			},
			// 点击管理
			snTap() {
				this.admin = !this.admin;
			},
			// 切换选择框
			confirm(e) {
				let data = [];
				e.value.map((item) => {
					if (item[0]) {
						item[0].split(',').map((spItem) => {
							data.push(spItem);
						});
					}
				});
				this.filerData = data;
				this.getDataList();
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			groupChange2(n) {
				console.log('groupChange', n);
			},
			hsfTap() {
				uni.navigateTo({
					url: '/pages/erp/third/list',
				});
			},
			copy(text) {
				uni.setClipboardData({
					data: text,
				});
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				const storeId = uni.getStorageSync('userinfo').storeId;
				paramsData.storeId = storeId;
				paramsData.sortingStatusList = that.filerData;
				sortingList(paramsData)
					.then((res) => {
						let data = res.rows;
						data.map((item) => {
							return (item.disabled = false);
						});
						console.log(data);
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
			tongyongTap(info, e) {
				this.nav_list[0].child = info.attr.base_json;
				this.nav_list[1].child = info.attr.colour_json;
				this.nav_list[2].child = info.attr.function_json;
				this.checktitle = info.title;
				this.checkgoodsid = info.recycle_goods_id;

				this.modalName = e;
			},
			tongyongHideModal(e) {
				this.modalName = null;
			},
			tongyongAction(id) {
				console.log(id);
				let paramsData = {
					type: id,
					goods_id: this.checkgoodsid,
					zs_status: this.iszs ? '1' : '0',
					is_ps: this.isps ? '1' : '0',
					ps_status: this.radiovalue1,
					is_wx: this.iswx ? '1' : '0',
					wx_status: this.radiovalue2,
				};
				if (this.isps) {
					if (!this.radiovalue1) {
						return this.$u.toast('请选择抛售状态！');
					}
					if (!this.thirdInfo.id) {
						return this.$u.toast('请选择回收方！');
					}
				}
				if (this.iswx) {
					if (!this.radiovalue2) {
						return this.$u.toast('请选择维修状态！');
					}
					if (!this.CostMoney) {
						return this.$u.toast('请输入维修成本金额');
					}
					paramsData.third_id = this.thirdInfo.id;
					paramsData.costmoney = this.CostMoney;
					paramsData.remarks = this.remark;
				}
				let checkvalue = [];
				this.nav_list.map((item, index) => {
					item.child.map((item1, index1) => {
						item1.child.map((item2, index2) => {
							if (item2.click) {
								checkvalue.push(item2);
							}
						});
					});
				});
				paramsData.cart_info = JSON.stringify(checkvalue);
				if (id == 1) {
					paramsData.actiontype = 1;
				}
				if (id == 2) {
					paramsData.actiontype = 2;
				}
				console.log(paramsData);
				// return;
				erppurchasequalityedit(paramsData).then((res) => {
					this.$u.toast('提交成功！');
					this.$nextTick(() => {
						uni.startPullDownRefresh();
					});
				});
				this.modalName = null;
			},
			SwitchA(e) {
				this.iszs = e.detail.value;
				if (this.iszs == 1) {
					this.isps = 0;
				}
				console.log(this.iszs);
			},
			SwitchB(e) {
				this.isps = e.detail.value;
				if (this.isps == 1) {
					this.iszs = 0;
				}
			},
			SwitchC(e) {
				this.iswx = e.detail.value;
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				console.log(this.tab_cur);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0,
				});
			},
			itemclick(pindex, findex, mindex) {
				this.nav_list[pindex].child[findex].child.map((item, index) => {
					item.click = false;
				});
				this.nav_list[pindex].child[findex].child[mindex].click = true;
				this.newnav_list = this.nav_list;
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
		padding-top: 100rpx;
		// padding: 100rpx 21rpx 0rpx 21rpx;
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

	.cu-card.article > .cu-item {
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
	}
	.tag_33 {
		background-color: #e5fcf1;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
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
