<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">短视频</block>
		</bar-title> -->
		<video-list :list_data="dataList" @listTap="videoListTap" :show="true"></video-list>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import videoList from '@/components/common/list/video-list';
	import _home_data from '@/static/data/home.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		videoListapi
	} from "@/api/common.js"
	export default {
		components: {
			barTitle,
			videoList,
		},
		data() {
			return {
				videoData: [],
				queryInfo: {
					page: 1,
					limit: 10
				},
				dataList: [],
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
			// this.videoData = _home_data.videoData();
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
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
				let parmasData = {
					...this.queryInfo
				}
				videoListapi(parmasData).then(res => {
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total_count == that.dataList.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			BackPage() {
				console.log('点击了返回');
				uni.navigateBack();
			},
			videoListTap(data){
				console.log(data.data);
				uni.navigateTo({
					url:`/pages/home/video_detail?image=${data.data.image}&videofile=${data.data.videofile}`
				})
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */

	@import "@/uni_modules/mpb-ui/shop/sort_vue.scss";
</style>
