<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">我的推广</block>
			<block slot="right">
				<view @click="jump_level" class="bg-deepblue cu-btn radius-4 text-sm">我要升级</view>
			</block>
		</bar-title>

		<!--其他级别-->
		<view class="reseller">
			<view class="top margin-sm bg-white radius-4">
				<view class="num">
					<view>昨日收益</view>
					<view class="txc">{{dataInfo.yesterfee || 0}}</view>
				</view>
				<view class="num1" style="">
					<view>当前佣金</view>
					<view style="font-size:60rpx;" class="text-red">{{dataInfo.fee || 0}}</view>
				</view>
				<view class="num" style="margin-right: 30px;">
					<view>累计已提</view>
					<view>{{dataInfo.tixianmoney || 0}}</view>
				</view>
				<view class="tixian" @click="jump_cash">
					<view class="btn  bg-deepblue radius-4 sm">立即提现</view>
				</view>
				<view class="jilu">
					<navigator url="/pages/my/item/tixian_list">
						<view class="jl">提现记录 ></view>
					</navigator>
				</view>
			</view>
			
			<view class="level margin-sm">
				<view class="margin-sm text-center text-deepblue text-lg text-bold">
					我的等级
				</view>
				<image :src="dataInfo.userlevelimage" mode="aspectFill" class="radius-3" style="height:428upx"></image>
				<view class="margin-sm text-center text-deepblue text-lg text-bold">
					距离下一级还需
				</view>
				<view  class="margin-bottom-sm" v-for="(item1,index1) in dataInfo.next_level_list" :key="index1">
					<view class="flex justify-between">
						<view class="">
							{{item1.real_name}} / 
							<text class="text-xs">{{item1.is_must==1?'务必达成':'满足其一'}}</text>
						</view>
						<view class="">{{item1.yesnum}}/{{item1.number}}人</view>
					</view>
					<view class="flex">
						<view class="cu-progress round">
							<view class="bg-red" :style="{width: item1.finish_rate ? item1.finish_rate :''}"></view>
						</view>
						<text class="margin-left-sm cuIcon-roundcheckfill" :class="item1.finish_rate=='100%'?'text-red':'text-lightgrey'"></text>
					</view>
				</view>
				<view class="shengji"  @click="jump_level">
					<view class="btn bg-red text-center radius-4 sm">立即升级</view>
				</view>
			</view>
			<view class="icon">
				<view class="ico" v-for="(item,index) of list" :key="index">
					<navigator :url="item.url">
						<view class="tubiao">
							<!-- <img class="img" :src="item.img"></img> -->
							<image class="img":src="item.img" mode="widthFix"></image>
						</view>
						<view class="tt">
							<view class="text">{{item.title}}</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="kong"></view>
		</view>
	</view>
</template>

<script>
	import {
		agentIndex
	} from "@/api/agent.js"
	import barTitle from '@/components/common/basics/bar-title';

	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				list: [{
						title: '推广名片',
						img: "../../../static/item/mp.png",
						url: "/pages/my/item/card"
					},
					{
						title: '推广人统计',
						img: "../../../static/item/tj.png",
						url: "/pages/my/item/user_list"
					},
					{
						title: '佣金明细',
						img: "../../../static/item/q.png",
						url: "/pages/my/item/money_log"
					},
					{
						title: '推广排名',
						img: "../../../static/item/dd.png",
						url: "/pages/my/item/user_rank"
					},
				],
				dataInfo:''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.agentIndexFuc();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		onPullDownRefresh() {
			this.agentIndexFuc();
		},
		methods: {
			// 获取分销概况
			agentIndexFuc(){
				agentIndex({}).then(res=>{
					if(res.code == 1){
						this.dataInfo = res.data;
					}
				})
				.finally(()=>{
					uni.stopPullDownRefresh()
				})
			},
			jump_cash() {
				uni.navigateTo({
					url: '/pages/my/item/tixian_add1',
				});
			},
			jump_level() {
				let next_level = this.dataInfo.next_level
				uni.navigateTo({
					url: '/pages/my/item/level_list?next_level='+next_level,
				});
			},
			getDataList() {
				let that = this;
				let paramsData = that.TabCur == 0 ? that.queryInfo : that.queryInfo1;
				erpcheckgetlist(paramsData).then(res => {
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
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			}
		},

	}
</script>

<style lang="scss">
	.reseller {
		min-height: 100vh;
		font-size: 14px;

		.top {
			display: flex;
			justify-content: space-between;
			position: relative;
			height: 460rpx;

			.title {
				background-color: #FFFFFF
			}

			.num1 {
				margin-top: 10%;
				text-align: center;
				width: 33%;
			}

			.num {
				font-size: 30rpx;
				line-height: 50rpx;
				text-align: center;
				margin-top: 30%;
				width: 33%;

			}

		}

		.jilu {
			font-size: 15px;
			position: absolute;
			right: 10%;
			top: 20%;
		}

		.tixian {
			display: flex;
			justify-content: center;
			width: 55%;
			position: absolute;
			bottom: 40rpx;
			left: 23%;

			.btn {
				text-align: center;
				padding:5rpx 10rpx;
				width: 85%;
				font-weight: bold;
			}


		}

		.icon {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			margin-left: 3%;
			margin-right: 3%;

			.ico {
				border-radius: 10px;
				border: 1px solid #C0C0C0;
				width: 49%;
				height: 100px;
				margin-top: 10px;
				display: flex;
				border: none;
				font-size: 15px;
				flex-direction: column;
				background-color: #FFFFFF;

				.img {
					width: 32px;
					height: 32px;
				}

				.tubiao {
					margin-top: 20px;
					text-align: center;
				}

				.text {
					color: #8F8F94;
					padding-top: 5px;
					text-align: center;

				}
			}
		}

		.level {
			border-radius: 10px;
			background-color: #FFFFFF;
			text-align: center;
			padding: 30rpx;
			
			.shengji{
				display: flex;
				justify-content: center;
				.btn {
					text-align: center;
					padding:5rpx 10rpx;
					width: 55%;
					font-weight: bold;
				}
			}
		}

		.kong {
			height: 100px;
		}
	}
</style>
