<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">佣金记录</block>
		</bar-title>
		<view class="mingxi bg-white margin-sm radius-3">
			
			<view class="ticheng">
				<view class="totalfee padding-lg text-center text-red">
					共
					<text class="fee">{{totalfee}}</text>
					元
				</view>
				<view class="t_tou">
					<view class="tou_1"><view class="bg-gray">来源/时间</view></view>
					<view class="tou_2"><view class="bg-gray">金额</view></view>
				</view>
				<block v-for="(item,index) of dataList" :key="index">
					<view class="tc" @click="jump(item.id)">
						<view class="item1">
							<view class="">{{item.memo}}</view>
							<view class="text-lightgrey">{{item.createtime}}</view>
						</view>
						<view class="item2 padding-sm" :class="item.money < 0 ? 'text-lightgrey':'text-red'">
							{{item.money}}
						</view>
					</view>
				</block>
			</view>
		</view>
		
		<button class="cash-btn bg-deepblue radius-4" @click="jump_cash">去提现</button>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		agentuserfeelist
	} from "@/api/agent.js"
	import barTitle from '@/components/common/basics/bar-title';
	
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				num:0,
				dataList: [],
				totalfee: 0,
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
			}
		},
		onLoad() {
			// this._load()
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
			jump_cash(){
				uni.navigateTo({
					url:'/pages/my/item/tixian_add1'
				})
			},
			jump(id){
				uni.navigateTo({
					url:'/pages/my/item/money_state?id='+id
				})
			},
			change(e){
				this.num=e 
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
					agentuserfeelist(paramsData).then(res => {
						let data = res.data.list;
						that.totalfee = res.data.totalfee;
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
	.mingxi{
		.head{display: flex;margin: 10px 0;}
		.head_l{display: flex;width: 85%;justify-content: space-around;}
		.head_r{width: 15%;text-align: center;}
		.head_l_1{border: 1px solid #F2F2F2;padding: 0px 15px;line-height: 25px;}
		.head_btn{margin:10px 20px 0;border: 1px solid #F2F2F2;padding: 0px 15px;line-height: 25px;}
		.ling{color: #E1461D;border: 1px solid #E1461D;padding: 0px 15px;line-height: 25px;}
		.shouyi{border-top: 1px solid #EBEBEB;border-bottom:1px solid #EBEBEB; background-color: #FAFAFA;display: flex;height: 30px;
		line-height: 30px;padding: 3px 10px;margin-top: 15px;}
		.sy_l{width: 50%;}
		.sy_l span{font-weight: bold;}
		.ticheng{
			.totalfee{
				font-size:40rpx;
				.fee{
					font-size: 80rpx;
				}
			}
			.t_tou{
				display: flex;
				padding: 20rpx;
				height: 60rpx;
				line-height: 60rpx;
				margin-bottom: 20rpx;
				text-align: center;
				.tou_1{
					width: 75%;
				}
				.tou_2{
					width: 25%;
				}
			}
			
		}
		//.ticheng li:nth-of-type(odd){ background-color: #EEEEEE;} 
		//.ticheng li:nth-of-type(even){background-color: #fff;} 
		.tc{
			display: flex;
			justify-content: space-between;
			padding: 10px;
			line-height: 25px;
			font-size: 14px;
			text-align: center;
			.item1{
				width: 75%;
			}
			.item2{
				width: 25%;
			}
		}
		//.tc_l{color: #9A9A9A;}
		//.tc_l span{font-size: 14px;font-weight: bold;color: #000;}
		//.tc_2{color: #E1461D;}
		//.tc_2 span{color: #9A9A9A;}
	}
	.cash-btn{
		position: fixed;
		left: 15px;
		right: 15px;
		bottom: 8px;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
