<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">评估详情</block>
		</bar-title>
		
		<view class="bg-gradual-green padding radius text-center shadow-blur">
			<view class="padding-xl text-white">
				<view class="padding-xs text-lg">
					{{phonename}}
				</view>
				<view class="padding-xs text-xxl text-bold">
					￥{{allmoney}}
				</view>
				<view class="padding-xs text-lg">
					本机估价：{{money}} + 加价券：{{quanmoney}}
				</view>
			</view>
		</view>
		
		<!--选择加价券-->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 选择加价券
			</view>
			<view class="action" @tap="">
				<view class="right">+{{quanmoney}}元</view>
				<text class="cuIcon-right icon"/>
				
			</view>
		</view>
		<!--评估详情-->
		<view class="bg-white orderview-card-box">
			<view class="orderview-card-view orderview-order-view">
				<view class="text-lg text-bold text-black">评估详情</view>
				<view class="solid-line"></view>
				<view class="text-black title-view" v-for="(item,index) in dataInfo" :key="index">
					<view class="title">{{item.name}}</view>
					<view class="text-right">
						<text class="margin-right-xs">{{item.value}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white orderview-card-hight-box"/>
		
		<!--底部-->
		<view class="foot-hight-view"/>
		
		<view class="bg-white orderview-footer-fixed">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red lg" @tap="deliveryTap">立即换钱</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		GodsgoodsDetailPrice
	} from "@/api/common.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				money:'-.-',
				phonename:'-.-',
				allmoney:'-.-',
				quanmoney:0,
				detailId:'',
				dataInfo:[]
			}
		},
		onLoad(option) {
			this.money = option.money;
			this.phonename = option.model;
			this.detailId = option.detailId;
			this.allmoney = Number(this.money) + this.quanmoney;
			this.getGodsgoodsDetailPrice();
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			//获取报价详情
			getGodsgoodsDetailPrice(){
				let that = this;
				let pramas = {
					'detail_id':that.detailId
				}
				GodsgoodsDetailPrice(pramas).then(res=>{
					if(res.code == 1){
						that.dataInfo = res.data.value;
					}
				})
			},
			//去发货
			deliveryTap(){
				uni.showModal({
				    title: '选择发货的方式',
					mask:true,
				    content: '自行寄出仅限于顺丰快递哦！',
					cancelText:'自行寄出',
					cancelColor:'#007AFF',
					confirmColor:'#007AFF',
					confirmText:'顺丰上门',
				    success: function (res) {
				        if (res.confirm) {
							console.log('顺丰上门');
							
				        } else if (res.cancel) {
							console.log('自行寄出');
				        }
						uni.navigateTo({
							url:'form'
						})
				    }
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.cu-dialog{
		.grid{
			margin-bottom:calc((env(safe-area-inset-bottom) / 2) + 109.09rpx);
		}
	}
	.orderview-card-box {
		padding: 27.27rpx 27.27rpx 0;
	}
	.orderview-card-hight-box {
	    height: 45.45rpx;	
	}
	.orderview-card-view {
		position: relative;
		border-radius: 9.09rpx;
		padding: 18.18rpx;
		box-shadow: 0 0 14.54rpx #f1f1f1;
	}
	
	.orderview-order-view {
		position: relative;
		.solid-line {
		    margin: 27.27rpx 0;	
		}
		.title-view {
			position: relative;
			margin-bottom: 18.18rpx;
			&:last-child {
				margin-bottom: 12.72rpx;
			}
			.title {
			    position: absolute;
			    top: 3.63rpx;
			    left: 0;
			}
			.text-right {
			   position: relative;
			   padding-left: 181.81rpx;
				.cu-btn {
				    padding: 0 10.9rpx;
				    height: 30.9rpx;
					top: -3.63rpx;
				}
			}
		}
	}
	.foot-hight-view {
		width: 100%;
		height: calc((env(safe-area-inset-bottom) / 2) + 109.09rpx);
	}
	.orderview-footer-fixed {
		position: fixed;
		z-index: 999999;
		bottom: 0;
		width:100%;
		box-shadow: 0 -3.63rpx 10.9rpx 0 #eaeaea;
		padding: 18.18rpx 27.27rpx;
		text-align: right;
		.cu-btn {
		    margin-left: 10px;	
		}
	}
	.cu-modal.bottom-modal {
		.cu-bar {
			min-height: 81.81rpx;
			.title {
				position: relative;
				width: 100%;
			}
			.close {
			    position: absolute;
				font-size: 36.36rpx;
			    right: 27.27rpx;
			}
		}
		.modal-view {
			position: relative;
			width: 100%;
			.content {
			    position: relative;
				text-align: left;
			    padding: 27.27rpx 18.18rpx;
				.tel-btn-view {
					position: relative;
					width: 100%;
					.tel-view {
					    position: relative;
						padding-right: 163.63rpx;
						line-height: 47.27rpx;
					    height: 47.27rpx;
					}
					.cu-btn {
					    position: absolute;
					    right: 0;
					    top: 0;
					}
				}
				.code-view {
					position: relative;
					text-align: center;
					.code {
					    font-size: 54.54rpx;
					}
					.code + .code {
						margin-left: 18.18rpx;
					}
				}
			}
			.num-lock-view {
				position: relative;
				margin-bottom: -2rpx;
				.solid-top::after {
				    border-top: 2rpx solid rgba(0, 0, 0, 0.1);
				}
				.cu-list.grid>.cu-item {
					text {
						color: inherit;
					}
					.num {
					    font-size: 40rpx;
					}
					.close {
					    font-size: 32.72rpx;
					    margin-top: 9.09rpx;
					}
					&:active {
						background-color: #f0f0f0;
					}
				}
			}
		}
	}
	
</style>
