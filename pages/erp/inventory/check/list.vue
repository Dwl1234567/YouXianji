<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">盘点列表</block>
		</bar-title>

		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-red cur':''" @tap="tabSelect" data-id="0">
				正在进行
			</view>
			<view class="cu-item" :class="1==TabCur?'text-red cur':''" @tap="tabSelect" data-id="1">
				往期盘点
			</view>
			<view class="cu-item" :class="2==TabCur?'text-red cur':''" @tap="tabSelect" data-id="2">
				异常盘点
			</view>
		</scroll-view>
		<view class="cu-list menu" v-if="0==TabCur">
			<view class="arrow" v-for="(item,index) in dataList" :key="index" @tap="tabGoods(item)">
				<view class="content">
					<text
						class="text-grey title">{{item.checkTaskType == 0 ? '整备' : item.checkTaskType == 1 ? '上架' : '配件'}}</text>
				</view>
				<view class="action">
					<view class=""><text class="text-grey text-sm text">发布时间{{item.startTime}}</text></view>
					<view class=""><text class="text-grey text-sm text">截止时间{{item.endTime}}</text></view>
				</view>
				<view class="over" @tap.stop="endTask(item.checkTaskId)">结束</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-list menu" v-if="1==TabCur">
			<view class="arrow" v-for="(item,index) in dataList1" :key="index">
				<view class="content">
					<text
						class="text-grey title">{{item.checkTaskType == 0 ? '整备' : item.checkTaskType == 1 ? '上架' : '配件'}}</text>
				</view>
				<view class="action">
					<view class=""><text class="text-grey text-sm text">发布时间{{item.startTime}}</text></view>
					<view class=""><text class="text-grey text-sm text">截止时间{{item.endTime}}</text></view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore1" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-list menu" v-if="2==TabCur">
			<view class="arrow" v-for="(item,index) in dataList2" :key="index" @tap="tabGoods(item, '2')">
				<view class="content">
					<text
						class="text-grey title">{{item.checkTaskType == 0 ? '整备' : item.checkTaskType == 1 ? '上架' : '配件'}}</text>
				</view>
				<view class="action">
					<view class=""><text class="text-grey text-sm text">发布时间{{item.startTime}}</text></view>
					<view class=""><text class="text-grey text-sm text">截止时间{{item.endTime}}</text></view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		storeCheckTaskList,
		endTask
	} from "@/api/erp.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				TabCur: 0,
				ifBottomRefresh: false,
				dataList: [],
				dataList1: [],
				dataList2: [],
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
			}
		},
		onLoad(options) {
			// 进入页面刷新
			this.getDataList()
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
			if (this.TabCur == 0) {
				this.queryInfo.pageNum = 1; //重置分页页码
			} else if (this.TabCur == 1) {
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
			// 结束按钮
			endTask(e) {
				endTask({
					checkTaskId: e
				}).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '操作成功',
						});
						this.getDataList()
					}
				})
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
			tabGoods(info, index) {
				uni.navigateTo({
					url: "/pages/erp/inventory/check/goods?checkTaskId=" + info.checkTaskId + "&checkTaskType=" + info
						.checkTaskType + '&isView=' + index
				});
			},
			getDataList() {
				let that = this;
				let paramsData = that.TabCur == 0 ? that.queryInfo : that.TabCur == 1 ? that.queryInfo1 : that.queryInfo2;
				paramsData.checkTaskStatus = that.TabCur;
				storeCheckTaskList(paramsData).then(res => {
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
							} else if (that.TabCur == 2) {
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
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F0F0F0;
	}

	.menu {
		padding: 26rpx;
	}

	.arrow {
		background: #FFFFFF;
		border-radius: 11rpx;
		padding: 45rpx 38rpx;
		padding-bottom: 80rpx;
		margin-bottom: 20rpx;

		.content {
			margin-bottom: 34rpx
		}

		.action {
			view {
				margin-bottom: 19rpx;
			}
		}

		.title {
			font-size: 29rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #101010;
			line-height: 29rpx;

		}

		.text {
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #8E8E8E;
			line-height: 25rpx;

		}

		.over {
			float: right;
			height: 55rpx;
			display: inline-block;
			padding: 0rpx 47rpx;
			background: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
			border-radius: 29rpx;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 55rpx;
		}
	}

	.cu-list.menu>.cu-item {}
</style>