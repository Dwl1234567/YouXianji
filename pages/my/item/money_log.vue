<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">佣金记录</block>
		</bar-title>
		<view class="mingxi bg-white margin-sm radius-3 padding-top-xl">
			<view class="tab flex text-xl text-400 text-929294" style="    justify-content: center;">
				<view class="tab-item margin-right-sm" @tap="checkTab(1)" :class="tabId === 1 ? 'text-500 text-101010': ''">收入统计
				</view>
				<view class="tab-item margin-left-sm" @tap="checkTab(2)" :class="tabId === 2 ? 'text-500 text-101010': ''">支出统计
				</view>
			</view>
			<view class="ticheng bg-white">
				<view class="totalfee padding-lg text-center text-red">
					共
					<text class="fee">{{tabId == 1 ? allIncome : allWithdraw}}</text>
					元
				</view>
				<view class="t_tou">
					<view class="tou_1">
						<view class="bg-white">来源/时间</view>
					</view>
					<view class="tou_2">
						<view class="bg-white">金额</view>
					</view>
				</view>
				<block v-for="(item,index) of dataList" :key="index" v-if="tabId == 1">
					<view v-if="item.index" class="formatData">{{item.formatData}}</view>
					<view class="tc" @click="jump(item.id)">
						<view class="left" style="display: flex;align-items: center;">
							<image :src="$httpImage + item.frontPhoto"
								style="width: 115rpx;height: 115rpx;background-color: aliceblue;margin-right: 10rpx;"></image>
							<view>
								<view class="text_1">{{item.title}}</view>
								<view class="text_1">{{item.basePriceLabel}}</view>
								<view class="text_2">{{item.formatData}}</view>
							</view>
						</view>
						<view class="right">
							{{item.money}}
						</view>
						<!-- <view class="item1">
							<view class="">{{item.memo}}</view>
							<view class="text-lightgrey">{{item.createtime}}</view>
						</view>
						<view class="item2 padding-sm" :class="item.money < 0 ? 'text-lightgrey':'text-red'">
							{{item.money}}
						</view> -->
					</view>
				</block>
				<block v-for="(item,index) of dataList" :key="index" v-if="tabId == 2">
					<view v-if="item.index" class="formatData">{{item.formatData}}</view>
					<view class="tc" @click="jump(item.id)">
						<view class="item1" style="text-align: left;">
							<view class="" v-if="item.accountType==2">银行卡</view>
							<view class="" v-if="item.accountType==1">支付宝</view>
							<view class="" v-if="item.accountType==0">微信</view>
							<view class="text-lightgrey">{{item.createTime}}</view>
						</view>
						<view class="item2 padding-sm" :class="item.withdrawPrice < 0 ? 'text-lightgrey':'text-red'">
							{{item.withdrawPrice}}
						</view>
					</view>
				</block>
				<!-- 下拉加载提示 -->
				<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
			</view>
		</view>

		<!-- <button class="cash-btn bg-deepblue radius-4" @click="jump_cash">去提现</button> -->

	</view>
</template>

<script>
	import {
		distributionIncomeList,
		withdrawList,
		selectTotal
	} from "@/api/commons.js"
	import barTitle from '@/components/common/basics/bar-title';

	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				allIncome: '',
				allWithdraw: '',
				formatDatas: '',
				tabId: 1,
				num: 0,
				dataList: [],
				totalfee: 0,
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad() {
			// this._load()
			this.$nextTick(() => {
				uni.startPullDownRefresh({

				})
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		onPullDownRefresh() {
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList();
			this.selectTotal();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			// 获取总收入统计和支出统计
			selectTotal() {
				selectTotal().then(res => {
					if (res.code === 200) {
						this.allIncome = res.data.allIncome;
						this.allWithdraw = res.data.allWithdraw
					}
				})
			},
			checkTab(item) {
				this.tabId = item
				if (item == 1) {
					this.getDataList()
				} else {
					this.getDataLists()
				}
			},
			jump_cash() {
				uni.navigateTo({
					url: '/pages/my/item/tixian_add1'
				})
			},
			jump(id) {
				uni.navigateTo({
					url: '/pages/my/item/money_state?id=' + id
				})
			},
			change(e) {
				this.num = e
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				distributionIncomeList(paramsData).then(res => {
						let data = res.rows;
						// that.totalfee = res.data.totalfee;
						if (data) {
							data.map(item => {
								if (item.formatData == this.formatDatas) {
									item.index = 0
									return item
								} else {
									this.formatDatas = item.formatData;
									item.index = 1
									return item
								}
							})
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			getDataLists() {
				let that = this;
				let paramsData = that.queryInfo;
				withdrawList(paramsData).then(res => {
						let data = res.rows;
						// that.totalfee = res.data.totalfee;
						if (data) {
							data.map(item => {
								if (item.formatData == this.formatDatas) {
									item.index = 0
									return item
								} else {
									this.formatDatas = item.formatData;
									item.index = 1
									return item
								}
							})
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.formatData {
		height: 52rpx;
		background: #F9F9FB;
		line-height: 52rpx;
	}

	.mingxi {
		.head {
			display: flex;
			margin: 10px 0;
		}

		.head_l {
			display: flex;
			width: 85%;
			justify-content: space-around;
		}

		.head_r {
			width: 15%;
			text-align: center;
		}

		.head_l_1 {
			border: 1px solid #F2F2F2;
			padding: 0px 15px;
			line-height: 25px;
		}

		.head_btn {
			margin: 10px 20px 0;
			border: 1px solid #F2F2F2;
			padding: 0px 15px;
			line-height: 25px;
		}

		.ling {
			color: #E1461D;
			border: 1px solid #E1461D;
			padding: 0px 15px;
			line-height: 25px;
		}

		.shouyi {
			border-top: 1px solid #EBEBEB;
			border-bottom: 1px solid #EBEBEB;
			background-color: #FAFAFA;
			display: flex;
			height: 30px;
			line-height: 30px;
			padding: 3px 10px;
			margin-top: 15px;
		}

		.sy_l {
			width: 50%;
		}

		.sy_l span {
			font-weight: bold;
		}

		.ticheng {
			.totalfee {
				font-size: 40rpx;

				.fee {
					font-size: 80rpx;
				}
			}

			.t_tou {
				display: flex;
				padding: 20rpx;
				height: 60rpx;
				line-height: 60rpx;
				margin-bottom: 20rpx;
				text-align: center;

				.tou_1 {
					width: 75%;
					text-align: left;
					font-size: 29rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #101010;
					line-height: 40rpx;
				}

				.tou_2 {
					font-size: 29rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #101010;
					line-height: 40rpx;
					width: 25%;
				}
			}

		}

		//.ticheng li:nth-of-type(odd){ background-color: #EEEEEE;} 
		//.ticheng li:nth-of-type(even){background-color: #fff;} 
		.tc {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			line-height: 25px;
			font-size: 14px;
			text-align: center;
			align-items: center;
			border-bottom: 1px solid #D8D8D8;

			.item1 {
				width: 75%;
			}

			.item2 {
				width: 25%;
			}

			.text_1 {
				font-size: 23rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #101010;
				line-height: 23rpx;
				margin-bottom: 10rpx;
				text-align: left;
			}

			.text_2 {
				font-size: 23rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #929294;
				line-height: 23rpx;
				text-align: left;
			}
		}

		//.tc_l{color: #9A9A9A;}
		//.tc_l span{font-size: 14px;font-weight: bold;color: #000;}
		//.tc_2{color: #E1461D;}
		//.tc_2 span{color: #9A9A9A;}
	}

	.cash-btn {
		position: fixed;
		left: 15px;
		right: 15px;
		bottom: 8px;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>