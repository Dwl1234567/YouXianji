<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">我的分销</block>
			<block slot="right">
				<!-- <view @click="jump_level" class="bg-deepblue cu-btn radius-4 text-sm">我要升级</view> -->
			</block>
		</bar-title>

		<!--其他级别-->
		<view class="reseller">
			<!-- <view class="top margin-sm bg-white radius-4">
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
				</view> -->
				<view class="commission">
					<view class="top">
						<view class="left">
							<view class="title">
								当前佣金（元）
							</view>
							<view class="number">
								{{dataInfo.fee || 0}}
							</view>
						</view>
						<view class="right text-center">
							<navigator url="/pages/my/item/tixian_list">
								<view class="jl">提现记录</view>
							</navigator>
						</view>
					</view>
					<view class="bottom">
						<view class="left">
							<view class="title">昨日收益</view>
							<view class="number">{{dataInfo.yesterfee || 0}}</view>
						</view>
						<view class="right">
							<view class="title">累计已提</view>
							<view class="number">{{dataInfo.tixianmoney || 0}}</view>
						</view>
					</view>
				</view>
				<view class="tixian" @click="jump_cash">
					立即提现
				</view>
			
			<view class="level margin-tb-xl" :style="{backgroundImage: 'url('+ dataInfo.userlevelimage +')', backgroundSize: '100%', backgroundRepeat: 'no-repeat'}">
				<view class=" margin-top-xxs text-center text-xxl text-bold text-white">
					普通会员
				</view>
				<!-- <image :src="dataInfo.userlevelimage" mode="aspectFill" class="radius-3" style="height:428upx"></image> -->
				<view class="margin-top-xxs text-center text-lg text-white margin-bottom">
					距离下一级还需
				</view>
				<view  class="margin-bottom-sm progress margin-top" v-for="(item1,index1) in dataInfo.next_level_list" :key="index1">
					<view class="">
						<view class="text-white text-sm text-center">
							{{item1.real_name}} 
							<!-- <text class="text-xs">{{item1.is_must==1?'务必达成':'满足其一'}}</text> -->
						</view>
						<!-- <view class="">{{item1.yesnum}}/{{item1.number}}人</view> -->
					</view>
					<view class="flex margin-top-xxs ">
						<view class="cu-progress round">
							<view class="bg-red" :style="{width: item1.finish_rate ? item1.finish_rate :''}"></view>
						</view>
						<!-- <text class="margin-left-sm cuIcon-roundcheckfill" :class="item1.finish_rate=='100%'?'text-red':'text-lightgrey'"></text> -->
					</view>
					<view class="flex justify-between margin-bottom-xs text-white text-sm">
						<view>{{item1.yesnum}}</view>
						<view>{{item1.number}}</view>
					</view>
				</view>
				<view class="shengji"  @click="jump_level">
					<view class="btn text-color-yellow text-center radius-6 text-white text-sm">立即升级</view>
				</view>
			</view>
			<view class="icon">
				<view class="ico" v-for="(item,index) of list" :key="index">
					<navigator :url="item.url" style="height: 100%;">
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
						img: "../../../static/item/名片.png",
						url: "/pages/my/item/card"
					},
					{
						title: '推广人统计',
						img: "../../../static/item/统计.png",
						url: "/pages/my/item/user_list"
					},
					{
						title: '佣金记录',
						img: "../../../static/item/名片备份.png",
						url: "/pages/my/item/money_log"
					},
					{
						title: '推广排名',
						img: "../../../static/item/排名.png",
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
	page{
		background: #F0F0F0;
	}
	.reseller {
		min-height: 100vh;
		font-size: 14px;
		padding: 30rpx;
		.commission{
			padding: 40rpx 52rpx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 23px;
				border-bottom: 0.5px solid rgba(96,42,11,1);
				.title{
					font-size: 12px;
					color: #913B00;
					font-weight: 500;
				}
				.number{
					margin-top: 7px;
					font-family: DINAlternate-Bold;
					font-size: 38px;
					color: #833200;
					font-weight: 700;
				}
				.right{
					background-image: linear-gradient(180deg, #FFDAA6 0%, #EEAA5A 85%);
					border-radius: 17px;
					width: 74px;
					height: 33px;
					line-height: 33px;
					font-family: PingFangSC-Semibold;
					font-size: 13px;
					color: #FFFFFF;
					font-weight: 600;
				}
			}
			.bottom{
				padding-top: 17px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.title{
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #833200;
					font-weight: 400;
				}
				.number{
					margin-top: 4px;
					font-family: DINAlternate-Bold;
					font-size: 24px;
					color: #833200;
					font-weight: 700;
				}
				.right{
					margin-left: 117px;
				}
			}
			
		}
		.tixian{
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #683E15;
			font-weight: 500;
			background: #FFC784;
			box-shadow: 0px 2px 4px 0px rgba(204,134,53,1);
			border-radius: 0px 0px 6px 6px;
		}

		.jilu {
			font-size: 15px;
			position: absolute;
			right: 10%;
			top: 20%;
		}

		.icon {
			display: flex;
			flex-wrap: wrap;
			.ico:nth-child(2n){
				border-left: 1px #D8D8D8 solid;
			}
			.ico:nth-child(1){
				border-bottom: 1px #D8D8D8 solid;
			}
			.ico:nth-child(2){
				border-bottom: 1px #D8D8D8 solid;
			}
			.ico {
				border: 1px solid #C0C0C0;
				width: 49%;
				height: 100px;
				display: flex;
				border: none;
				font-size: 30rpx;
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
					margin-top: 7px;
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: 26rpx;
					color: #101010;
					font-weight: 400;

				}
			}
		}

		.level {
			border-radius: 10px;
			background-color: #FFFFFF;
			text-align: center;
			padding: 30rpx;
			margin-top: 34rpx;
			.shengji{
				display: flex;
				justify-content: center;
				.btn {
					text-align: center;
					padding:5rpx 10rpx;
					width: 55%;
					height: 58rpx;
					background: #FFC784 !important;
					line-height: 58rpx;
					font-weight: bold;
				}
			}
		}
		.progress{
			width: 444rpx;
			margin: 0 auto;
			.cu-progress{
				height: 12rpx;
			}
		}
		.kong {
			height: 100px;
		}
	}
</style>
