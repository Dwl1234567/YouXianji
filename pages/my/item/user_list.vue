<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">推广人统计</block>
		</bar-title>
		<view class="agent bg-white margin-sm radius-4">
			<view class="head text-red">
				共 <text class="big">{{total}}</text> 人
			</view>
			<view class="t_tou">
				<view class="tou_1"><view class="bg-gray">头像</view></view>
				<view class="tou_1"><view class="bg-gray">昵称</view></view>
				<view class="tou_1"><view class="bg-gray">等级</view></view>
			</view>
			<view class="t">
			  <block v-for="(item,index) of dataList" :key="index">
				<li class="t_01">
					<view class="t_01_1"> 
						<image style="width: 40rpx;" :src="item.avatar || '/static/img/avatar/1.png'" mode="widthFix"></image>
					</view>
					<view class="t_01_1 text-lightgrey">{{item.nickname}}</view>
					<view class="t_01_1  text-red">V{{item.level}}</view>
				</li>
			  </block>
			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import{
		agentuserteamuser
	} from "@/api/agent.js"
	import barTitle from '@/components/common/basics/bar-title';
	
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				list:[1,2,3,4,5],
				dataList: [],
				queryInfo: {
					page: 1,
					pagesize: 10,
				},
				total:0,
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
				agentuserteamuser(paramsData).then(res => {
						let data = res.data.list;
						this.total = res.data.total;
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
	.agent{
		.head{text-align: center;padding: 80rpx 20rpx 60rpx; font-weight: bold;}
		.head .big{font-size: 80rpx;padding: 0 10rpx;}
		.t_tou{display: flex;padding: 20rpx;height: 60rpx;line-height: 60rpx;margin-bottom: 20rpx;}
		.tou_1{width: 34%;text-align: center;}
		.t_01{display: flex;height: 90rpx;line-height: 90rpx;}
		.t_01_1{width: 34%;text-align: center;}
		.t_01_1 img{width:60rpx;height: 60rpx;border-radius: 60rpx; background-color: #222;}
		//.t li:nth-of-type(odd){ background-color: #EEEEEE;} 
		//.t li:nth-of-type(even){background-color: #fff;} 
	
	}
</style>
