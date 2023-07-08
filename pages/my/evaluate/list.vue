<template>
	<view>
		<view class="padding">
			<block v-for="(items,index) in dataList" :key="index">
				<view class="view-box" style="padding: 0rpx;">
					<view class="flex-wrap text-sm" style="margin-bottom: 32rpx;">
						<view class="basis-1 margin-right-sm" style="display: flex;align-items: center;">
							<view class="cu-avatar sm round" :style="'backgroundImage: url(' + $httpImage + items.avatar + ')'"
								style="width: 53rpx; height: 53rpx;" />
							<view class=""
								style="font-size: 27rpx;font-family: PingFangSC-Medium, PingFang SC;font-weight: 500;color: #4F4F50; margin-left:8rpx">
								{{items.nickName}}
							</view>
						</view>
						<view style="margin-top: 10rpx;">
							已购：{{items.modelName}} {{items.basePriceLabel}}
						</view>
						<view class="basis-9" style="margin-top: 26rpx;">

							<view class="margin-top-xs"
								style="word-break: break-all;width: 80vw;font-size: 25rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #4F4F50;">
								{{items.context}}
							</view>
							<!-- <view class="text-gray margin-top-sm">{{items.spec}}</view> -->
						</view>
						<view v-if="items.photo" style="margin-top: 24rpx;display: flex;">
							<image v-for="(item, index) in items.photo" :src="$httpImage + item"
								style="width: 153rpx; height: 153rpx;margin-right: 11rpx;"></image>
						</view>

					</view>
				</view>
			</block>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		selectMyEvaluateList,
	} from "@/api/malls.js"
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {},
		data() {
			return {
				dataList: [],
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
				ifBottomRefresh: false,
			}
		},
		onLoad() {
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
		},
		onReady() {
			_tool.setBarColor(true);

		},
		// 下拉刷新
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
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				selectMyEvaluateList(paramsData).then(res => {
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
			},
			deletecom(id) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除该评价嘛？',
					success: function(res) {
						if (res.confirm) {
							userdelevaluate({
								evaluate_id: id
							}).then(res => {
								that.$u.toast('删除成功！');
								uni.startPullDownRefresh();
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		},

	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
</style>