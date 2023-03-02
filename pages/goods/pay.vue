<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor='bg-white'>
			<block slot="content">立即支付</block>
		</bar-title> -->
		<!--商品信息-->

		<view class="text-gray padding-sm">支付方式</view>

		<!--支付方式-->
		<view class="bg-white pay-view">
			<radio-group class="block" @change="RadioChange">
				<view class="pay-bar" @tap="payTap('wechat')" v-if="payTypeList.wxpay && total > 0">
					<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/wechat.png)" />
					<view class="content">
						<view class="text-black">
							<text class="margin-right-sm">微信支付</text>
							<text class="cu-tag bg-red radius sm">推荐</text>
						</view>
						<view class="text-gray text-sm">亿万用户的选择，更快更安全</view>
					</view>
					<view class="action">
						<radio class="red radio" :class="radio=='wechat'?'checked':''"
							:checked="radio=='wechat'?true:false" value="wechat" />
					</view>
				</view>

				<view class="pay-bar" @tap="payTap('alipay')" v-if="payTypeList.alipay && total > 0">
					<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/alipay.png)" />
					<view class="content">
						<view class="text-black">
							<text class="margin-right-sm">支付宝支付</text>
							<text class="cu-tag line-red radius sm">HOT</text>
						</view>
						<view class="text-gray text-sm">数亿用户都在用，安全可托付</view>
					</view>
					<view class="action">
						<radio class="red radio" :class="radio=='alipay'?'checked':''"
							:checked="radio=='alipay'?true:false" value="alipay" />
					</view>
				</view>
				<view class="pay-bar" @tap="payTap('hbjiangzhang')" v-if="payTypeList.offline">
					<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/alipay.png)" />
					<view class="content">
						<view class="text-black">
							<text class="margin-right-sm">奖章支付</text>
							<text class="cu-tag line-red radius sm">共有12349枚</text>
						</view>
						<view class="text-gray text-sm">
							<text>可为您抵扣</text>
							<text class="line-red">100元</text>
						</view>
					</view>
					<view class="action">
						<radio class="red radio" :class="radio=='hbjiangzhang'?'checked':''"
							:checked="radio=='hbjiangzhang'?true:false" value="hbjiangzhang" />
					</view>
				</view>
			</radio-group>
		</view>

		<!--提示信息-->
		<view class="text-gray padding-sm text-sm">
			如您购买的机器不符合消费者保障权益，将由平安承保、优闲集承担相关责任。
		</view>

		<!--底部操作-->
		<view class="bg-white footer-fixed foot-padding-bottom">
			<view class="padding-sm flex flex-direction">
				<button class="cu-btn radius bg-red" @tap="confirm">￥{{total}} 立即支付</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		PayUnify,
		PayJssdkBuildConfig,
		PayAlipay,
		PayOffline
	} from "@/api/mall.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		PayGetPayType
	} from "@/api/mall.js"
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				goodsList: [],
				checkAll: true,
				goods_img: '/static/delect_images/home/goods/1.png',
				radio: 'wechat',
				payType: 'wechat',
				orderInfo: {},
				orderId: '',
				payTypeList: {
					wxpay: false,
					alipay: false
				},
				total: 0.00
			}
		},
		async onLoad(options) {
			this.total = options.total;
			this.orderId = options.order_id;
			await this.getPayType();
			// 如果传这个参数就直接支付了，（默认第一个是微信支付）
			if (options.pay) {
				this.confirm()
			}
		},
		methods: {
			// 获取支付方式
			async getPayType() {
				let that = this;
				PayGetPayType({platform:"APP-PLUS"}).then(res=>{
					let type = res.data;
					if (type) {
						that.payTypeList = type;
					}
				})
				
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			payBtnTap() {
				uni.navigateTo({
					url: "/pages/status/pay_status"
				});
			},
			payTap(type) {
				this.radio = type;
				this.payType = type;
			},
			//确认支付
			async confirm() {
				console.log(this.payType);
				if (this.payType == "wechat") {
					// #ifdef H5 || APP-PLUS || MP-WEIXIN
					this.weixinPay();
					// #endif
				} else if (this.payType == "alipay") {
					// 支付宝支付
					this.alipay();
				} else if (this.payType == "hbjiangzhang") {
					// 货到付款
					this.offlinePay();
				}
			},
			async alipay() {

				// #ifdef H5
				window.open(this.$unishow + '/pay/alipay?order_id=' + this.orderId);

				setTimeout(function() {
					uni.showModal({
						title: '提示',
						content: '是否已支付?',
						cancelText: '否',
						confirmText: '是',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '/pages/order/order?state=0'
								});
							} else if (res.cancel) {
								//console.log('用户点击取消');
							}
						},
						fail: function(res) {
							//console.log(res)
						}
					});
				}, 3000);
				// #endif

				// #ifdef APP-PLUS
				let params = {
					order_id:this.orderId,
					platform:'APP-PLUS'
				}
				// let orderInfo = await this.$api.request('/pay/alipay', 'POST', {
				// 	order_id: this.orderId
				// });
				PayAlipay(params).then(res=>{
					let orderInfo = res.data;
					console.log(res);
					if (orderInfo) {
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: orderInfo,
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
								uni.redirectTo({
									url: '/pages/money/paySuccess'
								})
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
								that.$api.msg('支付失败');
							}
						});
					}
				})
				.catch(err=>{
					console.log(err);
				})
				
				

				// #endif

			},
			async weixinPay() {
				let that = this;
				// let data = await this.$api.request('/pay/unify', 'GET', {
				// 	order_id: this.orderId
				// });
				let params = {
					order_id:this.orderId,
					platform:'APP-PLUS'
				}
				PayUnify(params).then(res=>{
					console.log(res);
					let data = res.data;
					if (data) {
					
						if (data.trade_type == 'MWEB') {
							// #ifdef H5
							// 微信外的H5
							location.href = data.mweb_url;
							// #endif
					
							// #ifdef APP-PLUS
							// app 使用h5支付
							var wv; //计划创建的webview 
							wv = plus.webview.create("", "custom-webview", {
								'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
							})
							wv.loadURL(data.mweb_url, {
								Referer: data.referer
							});
					
							setTimeout(function() {
								uni.showModal({
									title: '提示',
									content: '是否已支付?',
									cancelText: '否',
									confirmText: '是',
									success: function(res) {
										if (res.confirm) {
											uni.redirectTo({
												url: '/pages/order/order?state=0'
											});
										} else if (res.cancel) {
											//console.log('用户点击取消');
										}
									},
									fail: function(res) {
										//console.log(res)
									}
								});
							}, 3000);
							// #endif
					
						} else if (data.trade_type == 'JSAPI') {
							if (data.weixinOauth2) {
								// 微信oauth2授权（主要用来拿openid）
								location.href = data.weixinOauth2
								return;
							}
					
							// #ifdef H5
							// 微信内的H5
							PayJssdkBuildConfig().then(res=>{
								let config = res.data;
								if (config) {
									jweixin.config(config);
									jweixin.ready(function() {
										jweixin.chooseWXPay({
											timestamp: data
											.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
											nonceStr: data.nonce_str, // 支付签名随机串，不长于 32 位
											package: 'prepay_id=' + data
											.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
											signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
											paySign: data.paySign, // 支付签名
											success: function(res) {
												// 支付成功后的回调函数
												uni.redirectTo({
													url: '/pages/money/paySuccess'
												})
											},
											fail: function(err) {
												//console.log('fail:' + JSON.stringify(err));
												//that.$api.msg('fail:' + JSON.stringify(err))
												that.$api.msg('支付失败');
											}
										})
									});
									jweixin.error(function(res) {
										//that.$api.msg(JSON.stringify(res));
										that.$api.msg('支付失败');
									});
								} else {
									that.$api.msg('支付失败');
								}
							})
							// let config = await this.$api.request('/pay/jssdkBuildConfig');
							
							// #endif
					
							// #ifdef MP-WEIXIN
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: data.timeStamp,
								nonceStr: data.nonce_str,
								package: 'prepay_id=' + data.prepay_id,
								signType: 'MD5',
								paySign: data.paySign,
								success: function(res) {
									uni.redirectTo({
										url: '/pages/money/paySuccess'
									})
								},
								fail: function(err) {
									//console.log('fail:' + JSON.stringify(err));
									//that.$api.msg('fail:' + JSON.stringify(err))
									that.$api.msg('支付失败');
								}
							});
							// #endif
						}
					}
				})
				
			},

			async offlinePay() {
				let that = this;
				let params = {
					order_id:this.orderId
				}
				// let data = await this.$api.request('/pay/offline', 'GET', {
				// 	order_id: this.orderId
				// });
				PayOffline(params).then(res=>{
					let data = res.data;
					if (data) {
						uni.redirectTo({
							url: '/pages/money/paySuccess'
						});
					}
				})
				
				
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	@import "@/uni_modules/mpb-ui/shop/pay.scss";
</style>
