<template>
	<view>
		<view class="padding bg-F0F0F0">
			<view class="cu-list solids-top">
				<view class="cu-item bg-white padding margin-bottom-sm radius-6" v-for="(item,index) in dataList">
					<view class="content">
						<view class="flex justify-between">
							<view>订单号:{{item.order_id}}</view>
							<view class="cu-tag bg-red sm radius margin-left-xs" @click="deletecom(item.id)">删除评价</view>
						</view>
						<view class="text-gray text-content flex justify-around">
							<view class="">
								<text class="text-red">{{item.spec}}</text>
							</view>
						</view>
						<view class="bg-gray padding-sm radius margin-top-sm  text-sm">
							{{item.comment}}
						</view>

						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.createtime_text}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		userevaluate,
		userdelevaluate
	} from "@/api/mall.js"
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {},
		data() {
			return {
				dataList: [],
				queryInfo: {
					page: 1,
					pagesize: 10,
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
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				userevaluate(paramsData).then(res => {
						let data = res.data.list;
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
			},
			deletecom(id) {
				let that =  this;
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
