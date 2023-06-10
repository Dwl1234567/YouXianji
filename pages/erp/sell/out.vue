<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="true">
			<block slot="content">退款记录</block>
			<block slot="right">
				<button class="cu-btn sm bg-deepblue" @tap="goToout">
					登记
				</button>
			</block>
		</bar-title>
		<view class="">
			<!-- <data-lists dataList="dataList"></data-lists> -->
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		getrefundlist
	} from "@/api/erpapi.js"
	import barTitle from '@/components/common/basics/bar-title';
	import dataLists from '@/components/common/dataListmore/dataList.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
			dataLists
		},
		data() {
			return {
				ifBottomRefresh: false,
				dataList: [],
				queryInfo: {
					page: 1,
					pagesize: 20,
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

			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			});
		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
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
			goToout() {
				uni.navigateTo({
					url: '/pages/erp/sell/outadd'
				});
			},
			//接收菜单结果
			confirm(e) {
				console.log(e);
				this.getDataList();
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;

				getrefundlist(paramsData).then(res => {
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
						console.log(data)
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
</style>