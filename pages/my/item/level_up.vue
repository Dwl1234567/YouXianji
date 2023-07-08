<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">等级升级</block>
		</bar-title>
		<view class="margin-tb-sm view-box">
			<view class="bg-white card goods-view">

				<view class="margin-bottom-sm title-view">
					<view class="">
						<text class="text-black margin-right-xs">升级到</text>
						<text class="bg-red cu-tag sm radius">{{dataInfo.levelName}}</text>
					</view>
				</view>

				<view class="margin-tb text-xl text-500 text-101010">我的特权</view>
				<view class="text-black gift-list text-lg">
					<view class="text-cut title">二手1级分佣</view>
					<text class="text-right">{{(dataInfo.new1Ratio * 1).toFixed(2)}}%</text>
				</view>
				<view class="text-black gift-list text-lg">
					<view class="text-cut title">二手2级分佣</view>
					<text class="text-right">{{(dataInfo.new2Ratio * 1).toFixed(2)}}%</text>
				</view>
				<view class="text-black gift-list text-lg">
					<view class="text-cut title">全新1级分佣</view>
					<text class="text-right">{{(dataInfo.secondHand1Ratio * 1).toFixed(2)}}%</text>
				</view>
				<view class="text-black gift-list text-lg">
					<view class="text-cut title">全新2级分佣</view>
					<text class="text-right">{{(dataInfo.secondHand2Ratio * 1).toFixed(2)}}%</text>
				</view>
			</view>
		</view>

		<!--支付方式-->
		<view class="bg-white pay-view margin-lr radius-6">
			<radio-group class="block" @change="RadioChange">
				<view class="pay-bar" @tap="payTap('wxpay')">
					<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/wechat.png)" />
					<view class="content">
						<view class="text-black">
							<text class="margin-right-sm">微信支付</text>
							<text class="cu-tag bg-red radius sm">推荐</text>
						</view>
						<view class="text-gray text-sm">亿万用户的选择，更快更安全</view>
					</view>
					<view class="action">
						<radio class="red radio" :class="radio=='wxpay'?'checked':''" :checked="radio=='wxpay'?true:false"
							value="wxpay" />
					</view>
				</view>

				<view class="pay-bar" @tap="payTap('alipay')">
					<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/alipay.png)" />
					<view class="content">
						<view class="text-black">
							<text class="margin-right-sm">支付宝支付</text>
							<text class="cu-tag line-red radius sm">HOT</text>
						</view>
						<view class="text-gray text-sm">数亿用户都在用，安全可托付</view>
					</view>
					<view class="action">
						<radio class="red radio" :class="radio=='alipay'?'checked':''" :checked="radio=='alipay'?true:false"
							value="alipay" />
					</view>
				</view>
			</radio-group>
		</view>

		<!--服务协议-->
		<view class="margin-tb agreement-checked-view">
			<checkbox class="round red sm checked" :checked="servercheck" />
			<view class="text-black-view">
				<text class="text-black">我已阅读并同意</text>
				<text class="text-yellow">《优闲集平台放心买用户服务协议》</text>
			</view>
		</view>


		<!--占位底部距离-->
		<view class="cu-tabbar-height" />

		<!--底部操作-->
		<view class="bg-white footer-fixed foot-padding-bottom">
			<view class="cu-bar padding-lr">
				<view class="text-black text-bold price-view">
					<text>金额：<span class="text-yellow text-xxl text-400">{{dataInfo.sellPrice}}</span></text>
				</view>
				<view class="btn-view ">
					<button class="cu-btns radius-4 text-color-yellow text-white padding-lr-xl" @tap="submit">确认升级</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		agentuserlevelgopay,
		agentuserleveladdorder,
		agentuserlevelview
	} from "@/api/agent.js"
	import barTitle from '@/components/common/basics/bar-title';
	import {
		selectMemberLevelRule,
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
				radio: 'wxpay',
				payType: 'wxpay',
				servercheck: true,
				dataInfo: '',
				id: ''
			}
		},
		onLoad(options) {
			this.itemList = uni.getStorageSync('itemList')
			// this.id = options.id;
			this.agentuserlevelviewFuc(this.itemList.ruleId)
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		onUnload() {
			uni.removeStorageSync('itemList')
		},
		methods: {
			// 获取等级详情
			agentuserlevelviewFuc(id) {
				selectMemberLevelRule({
					ruleId: id
				}).then(res => {
					this.dataInfo = res.data;
				})
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			payTap(type) {
				this.radio = type;
				this.payType = type;
			},
			submit() {
				console.log(this.payType)
				let that = this;
				// console.log('付款');
				// #ifdef APP-PLUS
				if (this.payType != 'wxpay') {
					createZfbPayment({
						ruleId: this.itemList.ruleId
					}).then(res => {
						if (res.code === 200) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data.orderStr,
								success: function(ress) {
									paymentReturn({
										orderId: res.data.orderId,
										tradeno: ress.tradeno
									}).then(resss => {
										if (resss.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '支付成功',
											});
											uni.navigateBack()
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
						ruleId: this.itemList.ruleId
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
											uni.navigateBack()
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
		},

	}
</script>

<style lang="scss">
	@import "@/uni_modules/mpb-ui/shop/pay.scss";
	@import "@/uni_modules/mpb-ui/shop/settlement.scss";

	page {
		background: #F0F0F0;
	}
</style>