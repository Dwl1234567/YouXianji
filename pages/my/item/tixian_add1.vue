<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">申请提现</block>
			<block slot="right">
				<view @click="jump_card()" class="bg-deepblue cu-btn radius-4 text-sm">添加银行卡</view>
			</block>
		</bar-title>
		<view class="tixian">
			<!--账户列表-->
			<view class="bg-white pay-view margin-sm padding-tb-sm bg-white radius-4">
				<view class="text-black text-lg text-bold padding-sm">提现到</view>
				<radio-group class="block cu-list">
					<view class="pay-bar cu-item"  v-for="(item,index) of bankList" :key="index" >
						<!-- <view class="cu-avatar sm" /> -->
						<view class="cu-avatar radius-1-5 lg" v-if="item.bank_icon" :style="{backgroundImage:'url('+ (item.bank_icon ? item.bank_icon : '/static/img/avatar/1.jpg') +')'}" />
						<view class="content">
							<view class="text-black">
								<text class="margin-right-sm">{{item.bank_name}}</text>
								<!-- <text class="cu-tag bg-red radius sm" v-if="item.isdefault == 1">默认</text> -->
							</view>
							<view class="text-gray text-sm">{{item.bank_card}}</view>
						</view>
						<view class="action">
							<radio class="red radio" />
						</view>
					</view>
				</radio-group>
			</view>
			<!-- <view class='swip-box'>
				<swiper @change="changeindex" class="swiper">
					<swiper-item v-for="(item,index) of bankList" :key="index" style="height: 150px;" >
						<view class="card" @click="jump_card(index)" :style="{backgroundColor:item.bank_bg}">
							<view v-if="item.bank_icon" class="card_l"><image  class="img1" :src="item.bank_icon" /></view>
							<view class="card_r">
								<view class="card_r_1">{{item.bank_name}}</view>
								<view class="card_r_2">{{item.bank_card}}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view> -->
			<view class="margin-sm padding-tb-sm bg-white radius-4">
				<view class="text-black text-lg text-bold padding-sm">提现金额</view>
				<view class="hsuru">
					<view class="hu_l">
						<input v-model="num" placeholder="0" placeholder-style="color:#000;font-size: 24px;font-weight: bold;height:35px;" />
					</view>
				</view>
				<view class="yue">
					<view class="yue_l">可提现佣金<span>{{yu}}</span>元</view>
					<view class="yue_r" @click="whole"><span>全部提现</span></view>
				</view>
				
				<view class="margin-top-lg text-center">
					<view class="cu-btn bg-red radius-4 text-sm padding-lr-xl text-bold" @click="qdtx">确定提现</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import {
		getBankList
	} from "@/api/common.js";
	import {
		getRecycleUserinfo
	} from "@/api/user.js";
	import {
		agentUserApplymoney
	} from "@/api/agent.js";
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				id: 0,
				num: 0,
				yu: 0,
				card: [1, 2, 3],
				index: 0,
				bankList:[]
			}
		},
		onLoad(options) {
			this.getBankListFuc();
			getRecycleUserinfo().then(res => {
				this.yu = res.data.fee;
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0
			});
		},
		methods: {
			// 申请提现
			agentUserApplymoneyFuc(){
				let paramsData = {
					user_bank_id:this.bankList[this.index].id,
					money:this.num
				}
				agentUserApplymoney(paramsData).then(res=>{
					this.$u.toast(res.msg);
					uni.navigateTo({
						url: '/pages/my/item/tixian_list'
					})
				})
			},
			// 获取银行卡
			getBankListFuc(){
				getBankList({}).then(res=>{
					this.bankList = res.data;
				})
			},
			changeindex(e) {
				this.index = e.detail.current 
			},
			jump_card(index = '') {
				if (index === '') {
					uni.navigateTo({
						url: "/pages/my/pay/add-pay"
					})
				} else {
					const card = this.card[index]
					uni.setStorageSync('bank', card)
					uni.navigateTo({
						url: '/pages/my/pay/edit-pay'
					})
				}

			},
			qdtx() {
				if(!this.num){
					return this.$api.msg('请输入提现金额!')
				}
				if(this.num <= 0){
					return this.$api.msg('提现金额不能小于等于0!')
				}
				if (this.num > this.yu) {
					this.$api.msg('提现金额错误！')
				} else {
					this.agentUserApplymoneyFuc();
				}
			},
			bgc(type) {
				if (type == 0) {
					return '';
				}
				if (type == 1) {
					return 'renmin';
				}
				if (type == 2) {
					return 'nongye';
				}
				if (type == 3) {
					return 'gongshang';
				}
				if (type == 4) {
					return 'jianshe';
				}

			},
			whole() {
				this.num = this.yu
			}
		},
		
	}
</script>

<style lang="scss">
	@import "@/uni_modules/mpb-ui/shop/pay.scss";
	.pay-view .pay-bar .cu-avatar{
		width:100rpx;
		height:100rpx;
	}
	.tixian {
	
			.je {
				padding: 10px;
				font-size: 16px;
				font-weight: bold;
			}
	
			.hsuru {
				display: flex;
				border-bottom: 1px solid #F0F0F0;
				margin: 10px 10px 12px;
				padding: 10px 10px 10px 0;
				justify-content: space-between;
			}
	
			.hu_l input {
				font-size: 24px;
				font-weight: bold;
			}
	
			.yue {
				margin: 0px 10px 20px;
				display: flex;
				justify-content: space-between;
			}
	
			.yue span {
				color: #F86744;
			}
	
			.qdtx {
				margin: 0 20% 20px;
				border-radius: 20px;
				color: #fff;
				height: 36px;
				line-height: 36px;
				text-align: center;
				font-size: 16px;
				background: linear-gradient(to top, #FA7458, #EB511B);
				box-shadow: 2px 2px 4px #ED5624;
				border: 1px solid #F76644;
			}
	
			.card {
				background-color: #45AAF0;
				margin: 0px 20px 10px;
				border-radius: 10px;
				padding: 20px 10px;
				color: #fff;
				display: flex;
				box-shadow: 0px 5px 10px #A5CBEA;
			}
	
			.card_l {
				width: 20%;
				text-align: center;
			}
	
			.card_l .img1 {
				width: 45px;
				height: 45px;
			}
	
			.card_r {
				width: 80%;
	
				.card_r_1 {
					font-size: 16px;
					padding-bottom: 10px;
				}
	
				.card_r_2 {
					font-size: 14px;
					padding-bottom: 20px;
				}
	
				.card_r_3 {
					font-size: 14px;
				}
			}
	
			.one {
				display: flex;
				justify-content: space-between;
	
				.t_tit {
					font-size: 20px;
					padding: 20px;
					font-weight: bold;
				}
	
				.head_btn {
					margin: 15px 20px 0px;
					border: 1px solid #F2F2F2;
					padding: 0px 15px;
					line-height: 25px;
					height: 25px;
				}
			}
	
			.gongshang {
				background-color: #C42B25;
			}
	
			.nongye {
				background-color: #008566;
			}
	
			.renmin {
				background-color: #E50012;
			}
	
			.jianshe {
				background-color: #003B8F;
			}
		}
</style>
