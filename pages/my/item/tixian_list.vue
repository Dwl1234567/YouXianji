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
						<view class="head_l_2 text-black text-bold text-xxxl">{{money}}</view>
					</view>
					<view class="head_r bg-D8D8D8 text-101010 text-400 text-sm" @click="jump_cash">立即提现</view>
				</view>
				
			</view>
			<block v-for="(item,index) of dataList" :key="index">
				<view class="list bg-white padding-lg border-bottom-xl">
					<view class="list_01">
						<view class="list_01_l" v-if="item.type==0">银行卡</view>
						<view class="list_01_l" v-if="item.type==1">支付宝</view>
						<view class="list_01_l" v-if="item.type==2">微信</view>
						<view class="list_01_r text-101010 text-xl text-400">-{{item.money}}</view>
					</view>
					<view class="list_02 text-929294">
						<view class="list_01_l">{{item.optime}}</view>
						<view class="list_01_r" v-if="item.status==0">处理中</view>
						<view class="" v-if="item.status==1">交易成功</view>
						<view class="" v-if="item.status==2">已驳回</view>
					</view>
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
		agentUserCashlist,agentIndexMyCash
	} from "@/api/agent.js"
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
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
				money:0,
				queryInfo: {
					page: 1,
					pagelist: 10,
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
			this.$nextTick(()=>{
				uni.startPullDownRefresh()
			});
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
			this.queryInfo.page = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.page += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			jump_cash() {
				uni.navigateTo({
					url: '/pages/my/item/tixian_add1',
				});
			},
			getmycash(){
				let that = this;
				let paramsData = {};
				agentIndexMyCash(paramsData).then(res => {
					let data = res.data;
					if (data) {
						that.money = data.fee;
						console.log('data.fee',data.fee);
			
					}
				})
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				agentUserCashlist(paramsData).then(res => {
						let data = res.data.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载

							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'

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
			.list_01 {
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				font-weight: 600;
				padding-bottom: 10px;
			}

			.list_02 {
				display: flex;
				justify-content: space-between;
				color: #9A9A9A;

				.list_01_r {
					color: #FC4F50;
				}
			}
		}
	}
</style>
