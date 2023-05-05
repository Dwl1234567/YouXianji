<template>
	<view>
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
		<view class="group_3 flex-col" v-for="(item, index) in dataList">
			<view class="text-wrapper_1 flex-row justify-between">
				<text class="text_6">单号:{{item.sortNo}}</text>
				<text class="text_7">时间:2{{item.createTimeStr}}</text>
			</view>
			<view class="section_1 flex-row">
				<view class=""></view>
				<image :src="$httpImage + item.modelPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col"></image>
				<view class="text-wrapper_2 flex-col">
					<text class="text_8">{{item.modelName}}</text>
					<text class="text_9">{{item.label}}</text>
					<text class="text_10">序列号:{{item.deviceNo}}</text>
					<text class="text_11">回收价:{{item.recyclePrice}}元</text>
				</view>
				<view class="tag_1 flex-col" v-if="item.sortStatus == 0">
					<text class="text_12">待送拣</text>
				</view>
			</view>
			<text class="text_13">回收人：{{item.recyclePeopleName}}</text>
		</view>
		<!--弹窗-->

		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import { sortingList } from '@/api/erp.js';
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
				console.log(data);
				that.thirdInfo = data;
			});
		},
		methods: {
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
		padding: 100rpx 21rpx 0rpx 21rpx;
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
