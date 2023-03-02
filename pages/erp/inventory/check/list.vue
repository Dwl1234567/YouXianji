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
		</scroll-view>
		<view class="cu-list menu" v-if="0==TabCur">
			<view class="cu-item arrow margin-lr-sm margin-top-xs radius-2" v-for="(item,index) in dataList" :key="index" @tap="tabGoods(item)">
				<view class="content">
					<text class="text-grey">{{item.remark}}</text>
				</view>
				<view class="action">
				  <view class=""><text class="text-grey text-sm">{{item.createtime}}</text></view>
				  <view class=""><text class="text-grey text-sm">{{item.endtime}}</text></view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-list menu" v-if="1==TabCur">
			<view class="cu-item arrow" v-for="(item,index) in dataList1" :key="index" @tap="tabGoods(item)">
				<view class="content">
					<text class="text-grey">{{item.remark}}</text>
				</view>
				<view class="action">
				  <view class=""><text class="text-grey text-sm">{{item.createtime}}</text></view>
				  <view class=""><text class="text-grey text-sm">{{item.endtime}}</text></view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore1" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		erpcheckgetlist
	} from "@/api/erpapi.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js';	//工具函数
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
				queryInfo: {
					page: 1,
					pagesize: 10,
				},
				queryInfo1: {
					page: 1,
					pagesize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				loadmore1: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad(options) {
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
			if(this.TabCur == 0){
				this.queryInfo.page = 1; //重置分页页码
			}else{
				this.queryInfo1.page = 1; //重置分页页码
			}
			this.getDataList();
			
		},
		onReachBottom() {
			if(this.TabCur == 0){
				if (this.loadmore == 'noMore') return
				this.queryInfo.page += 1;
				this.ifBottomRefresh = true
				this.getDataList();
			}else{
				if (this.loadmore1 == 'noMore') return
				this.queryInfo1.page += 1;
				this.ifBottomRefresh1 = true
				this.getDataList();
			}
			
		},
		methods: {
			tabSelect(e) {
				// console.log(e);
				if(this.TabCur != e.currentTarget.dataset.id){
					// 进入页面刷新
					uni.startPullDownRefresh();
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				
			},
			tabGoods(info) {
				uni.navigateTo({
					url: "/pages/erp/inventory/check/goods?checkId="+info.id
				});
			},
			getDataList() {
				let that = this;
				let paramsData = that.TabCur == 0 ? that.queryInfo : that.queryInfo1;
				paramsData.check_status = that.TabCur;
				erpcheckgetlist(paramsData).then(res => {
						let data = res.data.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if(that.TabCur == 0){
								if (that.ifBottomRefresh) {
									that.dataList = that.dataList.concat(data)
								} else {
									that.dataList = data
								}
								that.ifBottomRefresh = false
								that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
							}else if(that.TabCur == 1){
								if (that.ifBottomRefresh) {
									that.dataList1 = that.dataList1.concat(data)
								} else {
									that.dataList1 = data
								}
								that.ifBottomRefresh1 = false
								that.loadmore1 = res.data.total == that.dataList1.length ? 'noMore' : 'more'
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
	.cu-list.menu>.cu-item{
	}
</style>