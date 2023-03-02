<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">推广人排行</block>
		</bar-title>
		<view class="sort bg-white margin-sm text-center radius-4">
			<view class="head">
				<view class="head_tit">
					<view>分销排行榜</view>
				</view>
				<view class="small_title">
					<view>已赚佣金</view>
					<view class="text-red">
						共<text class="big">{{userfee||0}}</text>元
					</view>
					<view>当前排名</view>
					<view class="text-red">
						第<text class="big">{{curnum||0}}</text>名
					</view>
				</view>
			</view>
			<!--省市筛选-->
		<!-- 	<view class="">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					省份：
					<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10"
						:key="index" @tap="tabSelect" :data-id="index">
						Tab{{index}}
					</view>
				</scroll-view>
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					城市：
					<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in 10"
						:key="index" @tap="tabSelect" :data-id="index">
						Tab{{index}}
					</view>
				</scroll-view>
			</view> -->
			<view class="t_tou">
				<view class="tou_1">排名</view>
				<view class="tou_2">分销人员</view>
				<view class="tou_1">佣金</view>
			</view>
			<view class="t">
				<block v-for="(item,index) of dataList" :key="index">
					<view class="t_01" :class="item.isme?'bg-red light':''">
						<view class="t_01_1"> 
							<text>
								{{item.paiming}} 
							</text>
						<!--<image src="@/static/item/win.png">{{index+1}}</image>-->
						</view>
						<view class="t_01_2"> 
							<image :src="item.avatar || '/static/img/avatar/1.png'"></image> 
							{{item.nickname}} 
						</view>
						<view class="t_01_3">
							{{item.total_money}}
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import{
		agentuserranking
	} from "@/api/agent.js"
	import barTitle from '@/components/common/basics/bar-title';

	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				list: [1, 2, 3, 4, 5],
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
				total:0,
				curnum:0,
				userfee:0,
				ifBottomRefresh:false
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
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				agentuserranking(paramsData).then(res => {
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
							this.total = res.data.total;
							this.curnum = res.data.curnum;
							this.userfee = res.data.userfee;

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
	.sort {
		.head {
			//background-color: #E0451D;
			//color: #fff;
			padding: 40px 10px 30px;
			line-height: 50rpx;

			.head_tit {
				font-size: 24px;
				padding-bottom: 20px;
			}
			.small_title{
				font-size:30rpx;
				line-height:60rpx;
				.big{
					font-size:70rpx;
				}
			}
		}

		.head span {
			font-size: 30px;
			padding: 0 5px;
		}

		.t_tou {
			display: flex;
			padding: 10px;
			height: 30px;
			line-height: 30px;
			margin-bottom: 10px;
			justify-content: space-between;
			
		}

		.tou_1 {
			width: 20%;
			text-align: center;
		}

		.tou_2 {
			width: 45%;
			text-align: left;
		}

		.t_01 {
			display: flex;
			height: 50px;
			line-height: 50px;
			justify-content: space-between;
			.t_01_1 {
				width: 20%;
				text-align: center;
				
			}
			
			.t_01_2 {
				width: 45%;
				text-align: left;
				uni-image {
					width: 30px;
					height: 30px;
					border-radius: 30px;
					vertical-align: middle;
					margin-right: 10px;
				}
			}
			.t_01_3 {
				width: 20%;
				text-align: center;
				
			}
		}
		.t_01:nth-of-type(1){
			color: red;
		}
		.t_01:nth-of-type(2){
			color: green;
		}
		.t_01:nth-of-type(3){
			color: skyblue;
		}
		
		/*
		.t .t_01:nth-of-type(odd) {
			background-color: #EEEEEE;
		}

		.t .t_01:nth-of-type(even) {
			background-color: #fff;
		}*/

	}
</style>
