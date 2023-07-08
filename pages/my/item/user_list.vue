<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">推广人统计</block>
		</bar-title>
		<view class="agent bg-white margin-sm radius-6 padding-top-xl">
			<view class="tab flex text-xl text-400 text-929294" style="    justify-content: center;">
				<view class="tab-item margin-right-sm" @tap="checkTab(1)" :class="tabId === 1 ? 'text-500 text-101010': ''">产品统计
				</view>
				<view class="tab-item margin-left-sm" @tap="checkTab(2)" :class="tabId === 2 ? 'text-500 text-101010': ''">关系统计
				</view>
			</view>
			<view class="head text-red">
				<text class="big">共{{total}}个</text>
			</view>
			<view class="t" v-if="tabId ==1">
				<view class="t_tou">
					<view class="tou_1">
						<view class="bg-white">产品名称</view>
					</view>
					<view class="tou_1">
						<view class="bg-white">被推广人</view>
					</view>
				</view>
				<block v-for="(item,index) of dataList" :key="index">
					<li class="t_02">
						<view class="left" style="display: flex;align-items: center;">
							<image :src="$httpImage + item.frontPhoto"
								style="width: 115rpx;height: 115rpx;background-color: aliceblue;margin-right: 10rpx;"></image>
							<view>
								<view class="text_1">{{item.modelName}}</view>
								<view class="text_1">{{item.basePriceLabel}}</view>
								<!-- <view class="text_2">{{item.formatData}}</view> -->
							</view>
						</view>
						<view class="right">
							<view class="text_1">
								{{item.browsePeopleName}}
							</view>
							<view class="text_1">
								{{item.browseTime}}
							</view>
						</view>
					</li>
				</block>
			</view>
			<view class="t" v-if="tabId ==2">
				<view class="t_tou">
					<view class="tou_1">
						<view class="bg-white">头像</view>
					</view>
					<view class="tou_1">
						<view class="bg-white">昵称</view>
					</view>
					<view class="tou_1">
						<view class="bg-white">等级</view>
					</view>
				</view>
				<block v-for="(item,index) of dataList" :key="index">
					<li class="t_01">
						<view class="t_01_1">
							<image style="width: 40rpx;" :src="item.avatar || '/static/img/avatar/1.png'" mode="widthFix"></image>
						</view>
						<view class="t_01_1 text-lightgrey">{{item.nickName}}</view>
						<view class="t_01_1  text-red">V{{item.level}}</view>
					</li>
				</block>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>


	</view>
</template>

<script>
	import {
		agentuserteamuser
	} from "@/api/agent.js"
	import {
		selectDistributionBrowseList,
		selectDistributionRelationList
	} from "@/api/commons.js"
	import barTitle from '@/components/common/basics/bar-title';

	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				tabId: 1,
				list: [1, 2, 3, 4, 5],
				dataList: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				total: 0,
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
			if (this.tabId == 1) {
				this.getDataList();
			} else {
				this.getDataLists();
			}

		},
		onReachBottom() {
			console.log(222)
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			if (this.tabId == 1) {
				this.getDataList();
			} else {
				this.getDataLists();
			}
		},
		methods: {
			checkTab(item) {
				this.tabId = item
				if (item == 1) {
					this.getDataList()
				} else {
					this.getDataLists()
				}
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				selectDistributionBrowseList(paramsData).then(res => {
						let data = res.rows;
						this.total = res.total;
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
			},
			getDataLists() {
				let that = this;
				let paramsData = that.queryInfo;
				selectDistributionRelationList(paramsData).then(res => {
						let data = res.rows;
						this.total = res.total;
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
	page {
		background: #F0F0F0;
	}

	.agent {
		.head {
			text-align: center;
			padding: 80rpx 20rpx 60rpx;
			font-weight: bold;
		}

		.head .big {
			font-size: 80rpx;
			padding: 0 10rpx;
		}

		.t_tou {
			display: flex;
			padding: 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			margin-bottom: 20rpx;
			justify-content: space-between;
		}

		.tou_1 {
			width: 34%;
			text-align: center;
		}

		.t_01 {
			display: flex;
			height: 90rpx;
			line-height: 90rpx;
		}

		.t_02 {
			display: flex;
			// height: 90rpx;
			align-items: center;
			justify-content: space-between;
			line-height: 90rpx;
			margin-bottom: 34rpx;
			padding: 0px 20rpx;

			.right {
				text-align: right;
			}
		}

		.t_01_1 {
			width: 34%;
			text-align: center;
		}

		.t_01_1 img {
			width: 60rpx;
			height: 60rpx;
			border-radius: 60rpx;
			background-color: #222;
		}

		.text_1 {
			font-size: 23rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #101010;
			line-height: 32rpx;
		}

		//.t li:nth-of-type(odd){ background-color: #EEEEEE;} 
		//.t li:nth-of-type(even){background-color: #fff;} 

	}
</style>