<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">提现记录</block>
		</bar-title>
		<view class="record">
			<view class="bg-F0F0F0 padding-sm">
				<view class="head bg-white radius-6 padding-lg padding-bottom-xs">
					<view class="">
						<view class="head_l_1 text-101010 text-400 text-lg margin-bottom-sm">当前余额</view>
						<view class="head_l_2 text-black text-bold text-xxxl">{{balance}}</view>
					</view>
					<view class="head_r bg-D8D8D8 text-101010 text-400 text-sm" @click="jump_cash">立即提现</view>
				</view>

			</view>
			<block v-for="(item,index) of dataList" :key="index">
				<view class="list bg-white padding-lg border-bottom-xl" style="display: flex;">
					<view class="list_01">
						<view></view>
						<view class="list_01_l" v-if="item.accountType==2">银行卡</view>
						<view class="list_01_l" v-if="item.accountType==1">支付宝</view>
						<view class="list_01_l" v-if="item.accountType==0">微信</view>
						<view class="list_01_r">
							{{item.createTime}}
						</view>
						<!-- <view class="list_01_r text-101010 text-xl text-400">-{{item.withdrawPrice}}</view> -->
					</view>
					<view class="list_02 text-929294">
						<view class="list_01_l">{{item.withdrawPrice}}</view>
						<view class="list_01_r" v-if="!item.paymentVoucher">处理中</view>
						<view class="" v-if="item.paymentVoucher">交易成功</view>
						<!-- <view class="" v-if="item.status==2">已驳回</view> -->
					</view>
					<image :src=" $httpImage + item.paymentVoucher"></image>
				</view>
			</block>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import {
		agentUserCashlist,
		agentIndexMyCash
	} from "@/api/agent.js"
	import {
		getDistributionIncomeInfo,
		withdrawList,
	} from '@/api/commons.js'
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				balance: '',
				list: [{
						type: "提现",
						money: "3000.00",
						time: "2019.06.29 14:00",
						state: 1
					},
					{
						type: "提现",
						money: "3000.00",
						time: "2019.06.29 14:00",
						state: 0
					},
					{
						type: "提现",
						money: "3000.00",
						time: "2019.06.29 14:00",
						state: 1
					},
				],
				dataList: [],
				money: 0,
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
			this.$nextTick(() => {
				uni.startPullDownRefresh()
			});
			this.getDistributionIncomeInfo()
			this.getmycash();
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
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			// 获取提现余额
			getDistributionIncomeInfo() {
				getDistributionIncomeInfo().then(res => {
					if (res.code === 200) {
						this.balance = res.data.totalIncome
					}
				})
			},
			jump_cash() {
				uni.navigateTo({
					url: '/pages/my/item/tixian_add1',
				});
			},
			getmycash() {
				let that = this;
				let paramsData = {};
				agentIndexMyCash(paramsData).then(res => {
					let data = res.data;
					if (data) {
						that.money = data.fee;
						console.log('data.fee', data.fee);

					}
				})
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				withdrawList(paramsData).then(res => {
						let data = res.rows;
						if (data) {
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
	.record {
		font-size: 14px;

		.head {
			display: flex;
			justify-content: space-between;



			.head_r {
				height: 30px;
				line-height: 30px;
				width: 90px;
				text-align: center;
				border-radius: 20px;
				margin-top: 28rpx;
				margin-right: 30rpx;
			}
		}

		.list {
			border-bottom: 1px #D8D8D8 solid;
			align-items: center;
			justify-content: space-between;

			image {
				width: 107rpx;
				height: 107rpx;
			}

			.list_01 {
				font-size: 16px;
				font-weight: 600;
				padding-bottom: 10px;

				.list_01_r {
					color: #9A9A9A;
					font-size: 14px;
					font-weight: 400;
					margin-top: 7rpx;
				}
			}

			.list_02 {
				color: #9A9A9A;

				.list_01_l {
					font-size: 16px;
					font-weight: 600;
					color: black;
					margin-bottom: 7rpx;
				}

				.list_01_r {
					color: #FC4F50;
				}
			}
		}
	}
</style>