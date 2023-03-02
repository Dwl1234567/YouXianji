<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">提现记录</block>
		</bar-title>
		<view class="record">
			<view class="head bg-white margin-sm radius-2">
				<view class="padding-sm">
					<view class="head_l_1 text-deepblue text-bold text-lg margin-bottom-sm">当前余额</view>
					<view class="head_l_2 text-red text-bold text-xxl">{{money}}</view>
				</view>
				<view class="head_r bg-deepblue " @click="jump_cash">立即提现</view>
			</view>
			<block v-for="(item,index) of dataList" :key="index">
				<view class="list bg-white margin-sm padding-sm radius-2">
					<view class="list_01">
						<view class="list_01_l" v-if="item.type==0">银行卡</view>
						<view class="list_01_l" v-if="item.type==1">支付宝</view>
						<view class="list_01_l" v-if="item.type==2">微信</view>
						<view class="list_01_r text-red">-{{item.money}}</view>
					</view>
					<view class="list_02">
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
				margin-top: 28px;
				margin-right: 15px;
			}
		}

		.list {

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
