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
							{{dataInfo.totalIncome || 0}}
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
						<view class="number">{{dataInfo.yestodayTotalIncome || 0}}</view>
					</view>
					<view class="right">
						<view class="title">累计已提</view>
						<view class="number">{{dataInfo.totalWithDraw || 0}}</view>
					</view>
				</view>
			</view>
			<view class="tixian" @click="jump_cash(dataInfo.totalIncome)">
				立即提现
			</view>

			<view class="level margin-tb-xl" v-if="dataInfo"
				:style="{backgroundImage: 'url('+ $httpImage + dataInfo.userMemberInfo.indexPhoto +')', backgroundSize: '100%', backgroundRepeat: 'no-repeat'}">
				<view class=" margin-top-xxs text-center text-xxl text-bold text-white">
					{{dataInfo.userMemberInfo.levelName}}
				</view>
				<!-- <image :src="dataInfo.userlevelimage" mode="aspectFill" class="radius-3" style="height:428upx"></image> -->
				<view class="margin-top-xxs text-center text-lg text-white margin-bottom">
					距离下一级还需
				</view>
				<block>
					<view class="text-white text-sm text-center">
						<view class="">下级数</view>
						<!-- <view class="">{{item1.yesnum}}/{{item1.number}}人</view> -->
					</view>
					<view class="flex margin-top-xxs">
						<view class="cu-progress round">
							<view class="bg-red" v-if="dataInfo.userMemberInfo.ancestorDifferenceP"
								:style="{width: dataInfo.userMemberInfo.ancestorDifferenceP ? dataInfo.userMemberInfo.ancestorDifferenceP :''}">
							</view>
						</view>
						<!-- <text class="margin-left-sm cuIcon-roundcheckfill" :class="item1.finish_rate=='100%'?'text-red':'text-lightgrey'"></text> -->
					</view>
					<view class="flex justify-between margin-bottom-xs text-white text-sm">
						<view>{{dataInfo.userMemberInfo.ancestorDifference}}</view>
						<view>{{dataInfo.userMemberInfo.ancestorNum}}</view>
					</view>
				</block>
				<block>
					<view class="text-white text-sm text-center">
						<view class="">有效下级数</view>
						<!-- <view class="">{{item1.yesnum}}/{{item1.number}}人</view> -->
					</view>
					<view class="flex margin-top-xxs">
						<view class="cu-progress round">
							<view class="bg-red"
								:style="{width: dataInfo.userMemberInfo.validAncestorDifferenceP ? dataInfo.userMemberInfo.validAncestorDifferenceP :''}">
							</view>
						</view>
						<!-- <text class="margin-left-sm cuIcon-roundcheckfill" :class="item1.finish_rate=='100%'?'text-red':'text-lightgrey'"></text> -->
					</view>
					<view class="flex justify-between margin-bottom-xs text-white text-sm">
						<view>{{dataInfo.userMemberInfo.validAncestorDifference}}</view>
						<view>{{dataInfo.userMemberInfo.validAncestorNum}}</view>
					</view>
				</block>
				<view class="margin-bottom-sm progress margin-top" v-for="(item1,index1) in dataInfo.next_level_list"
					:key="index1">
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
				<view class="shengji">
					<view class="btn text-color-yellow text-center radius-6 text-white text-sm"
						v-if="dataInfo.userMemberInfo.validAble == 1" @tap="jump_level">付费升级</view>
					<view class="btn text-color-yellow text-center radius-6 text-white text-sm" v-else @tap="onClick_2(dataInfo)">
						立即激活{{dataInfo.userMemberInfo.activatePrice}}元</view>
				</view>
			</view>
			<view class="icon">
				<view class="ico" v-for="(item,index) of list" :key="index">
					<navigator :url="item.url" style="height: 100%;">
						<view class="tubiao">
							<!-- <img class="img" :src="item.img"></img> -->
							<image class="img" :src="item.img" mode="widthFix"></image>
						</view>
						<view class="tt">
							<view class="text">{{item.title}}</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="kong"></view>
		</view>
		<u-popup :show="show" mode="bottom" @close="close">
			<view class="prop">
				<view class="title">选择支付方式</view>
				<view class="pay">
					<view class="wxPay">
						<view class="left">
							<image src="/static/微信@2x.png" mode=""></image>
							<text>微信</text>
						</view>
						<view class="right">
							<image :src="isWx ? '/static/checkYuan.png' : '/static/yuan.png'" @tap="checkWx"></image>
						</view>
					</view>
					<view class="zfbPay">
						<view class="left">
							<image src="/static/zhifubao.png" mode=""></image>
							<text>支付宝</text>
						</view>
						<view class="right">
							<image :src="!isWx ? '/static/checkYuan.png' : '/static/yuan.png'" @tap="checkWx"></image>
						</view>
					</view>
				</view>
				<view class="querenbutton" @tap="initiatePayment">确认付款</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		agentIndex
	} from "@/api/agent.js"
	import barTitle from '@/components/common/basics/bar-title';
	import {
		getDistributionIncomeInfo,
		createZfbPayment,
		createWxPayment,
		paymentReturn
	} from '@/api/commons.js'
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				show: false,
				isWx: true,
				itemList: {},
				list: [{
						title: '推广名片',
						img: "../../../static/item/111.png",
						url: "/pages/my/item/card"
					},
					{
						title: '推广人统计',
						img: "../../../static/item/统计.png",
						url: "/pages/my/item/user_list"
					},
					{
						title: '佣金记录',
						img: "../../../static/item/222.png",
						url: "/pages/my/item/money_log"
					},
					{
						title: '推广排名',
						img: "../../../static/item/排名.png",
						url: "/pages/my/item/user_rank"
					},
				],
				dataInfo: ''
			}
		},
		onLoad() {

		},
		onShow() {
			this.getDistributionIncomeInfo()
			// this.agentIndexFuc();
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
			// 确认付款
			initiatePayment(e) {
				let that = this;
				// console.log('付款');
				// #ifdef APP-PLUS
				if (!this.isWx) {
					createZfbPayment({
						businessType: 1
					}).then(res => {
						if (res.code === 200) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data.orderStr,
								success: function(ress) {
									paymentReturn({
										tradeno: ress.tradeno
									}).then(resss => {
										if (resss.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '支付成功',
											});
											this.show = false
											that.getDistributionIncomeInfo()
										}
									})
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									if (err.code == -100) {
										uni.showToast({
											icon: 'none',
											title: '支付失败',
										});
									}
									console.log('fail:' + JSON.stringify(err));
								}
							})
						}
					})
				} else {
					createWxPayment({
						businessType: 1
					}).then(res => {
						if (res.code === 200) {
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: res.data.result,
								success: function(ress) {
									paymentReturn({
										orderId: res.data.orderId,
									}).then(resss => {
										if (resss.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '支付成功',
											});
											this.show = false
											that.getDistributionIncomeInfo()
										}
									})
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									if (err.code == -100) {
										uni.showToast({
											icon: 'none',
											title: '支付失败',
										});
									}
									console.log('fail:' + JSON.stringify(err));
								}
							})
						}
					})
				}
				// #endif
				// #ifdef MP-WEIXIN
				// #endif

			},
			// 关闭弹框
			close() {
				this.show = false;
			},
			checkWx() {
				this.isWx = !this.isWx;
			},
			// 确认付款
			onClick_2(item) {
				this.itemList = item;
				this.show = true;
			},
			// 获取分销信息
			getDistributionIncomeInfo() {
				getDistributionIncomeInfo().then(res => {
					if (res.code === 200) {
						res.data.userMemberInfo.ancestorDifferenceP = ((res.data.userMemberInfo.ancestorDifference / res.data
							.userMemberInfo.ancestorNum) * 100) + '%'
						res.data.userMemberInfo.validAncestorDifferenceP = ((res.data.userMemberInfo.validAncestorDifference /
							res.data
							.userMemberInfo.validAncestorNum) * 100) + '%'
						this.dataInfo = res.data
					}
				})
			},
			// 获取分销概况
			agentIndexFuc() {
				agentIndex({}).then(res => {
						if (res.code == 1) {
							this.dataInfo = res.data;
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh()
					})
			},
			jump_cash(totalIncome) {
				uni.navigateTo({
					url: '/pages/my/item/tixian_add1?totalIncome=' + totalIncome,
				});
			},
			jump_level() {
				let ruleId = this.dataInfo.userMemberInfo.ruleId
				uni.navigateTo({
					url: '/pages/my/item/level_list?ruleId=' + ruleId,
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
	page {
		background: #F0F0F0;
	}

	.prop {
		padding: 34rpx 47rpx 120rpx 47rpx;

		.title {
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #4f4f50;
			line-height: 48rpx;
			text-align: center;
		}

		.group_4 {
			margin: 0;
			margin-top: 28rpx;
			border: 2rpx solid #d8d8d8;
			padding: 32rpx 17rpx;
			border-radius: 11rpx;
			margin-bottom: 13rpx;
		}

		.textarea {
			height: 155rpx !important;
			border: 2rpx solid #d8d8d8;
			border-radius: 11rpx;
			margin-top: 28rpx;
			margin-bottom: 43rpx;
		}

		.upload {
			margin-bottom: 28rpx;
		}
	}

	.querenbutton {
		background: linear-gradient(90deg, #f3c81a 0%, #ffb629 100%);
		border-radius: 13rpx 13rpx 13rpx 11rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #4f4f50;
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
	}

	.pay {
		margin: 20rpx;
		background: #ffffff;
		border-radius: 11rpx;
		padding: 30rpx 0rpx;
	}

	.zfbPay {
		margin-top: 34rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 57rpx;
				height: 57rpx;
				margin-right: 11rpx;
			}
		}

		.right {
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}

	.wxPay {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 57rpx;
				height: 57rpx;
				margin-right: 11rpx;
			}
		}

		.right {
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}

	.reseller {
		min-height: 100vh;
		font-size: 14px;
		padding: 30rpx;

		.commission {
			padding: 40rpx 52rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 23px;
				border-bottom: 0.5px solid rgba(96, 42, 11, 1);

				.title {
					font-size: 12px;
					color: #913B00;
					font-weight: 500;
				}

				.number {
					margin-top: 7px;
					font-family: DINAlternate-Bold;
					font-size: 38px;
					color: #833200;
					font-weight: 700;
				}

				.right {
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

			.bottom {
				padding-top: 17px;
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.title {
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #833200;
					font-weight: 400;
				}

				.number {
					margin-top: 4px;
					font-family: DINAlternate-Bold;
					font-size: 24px;
					color: #833200;
					font-weight: 700;
				}

				.right {
					margin-left: 117px;
				}
			}

		}

		.tixian {
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-family: PingFangSC-Medium;
			font-size: 18px;
			color: #683E15;
			font-weight: 500;
			background: #FFC784;
			box-shadow: 0px 2px 4px 0px rgba(204, 134, 53, 1);
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

			.ico:nth-child(2n) {
				border-left: 1px #D8D8D8 solid;
			}

			.ico:nth-child(1) {
				border-bottom: 1px #D8D8D8 solid;
			}

			.ico:nth-child(2) {
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

			.shengji {
				display: flex;
				justify-content: center;

				.btn {
					text-align: center;
					padding: 5rpx 10rpx;
					width: 55%;
					height: 58rpx;
					background: #FFC784 !important;
					line-height: 58rpx;
					font-weight: bold;
				}
			}
		}

		.progress {
			width: 444rpx;
			margin: 0 auto;

			.cu-progress {
				height: 12rpx;
			}
		}

		.kong {
			height: 100px;
		}
	}
</style>