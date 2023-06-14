<template>
	<view class="">
		<u-popup :show="show" mode="center" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<uni-steps :options="logisticsInfo" active-color="#007AFF" :active="active" direction="column" />
			</view>
		</u-popup>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'activity-list',
		props: {
			show: {
				type: Boolean,
				default: () => {
					return false
				}
			},
			logisticsInfo: {
				type: Array,
				default: () => {
					return []
				}
			},
			active: {
				type: Number,
				default: () => {
					return 0
				}
			}
		},
		methods: {
			close() {
				this.$emit('showFalse', false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './common.css';
	@import './index.rpx.css';

	.yunShow-top {
		padding: 26rpx 28rpx 28rpx 28rpx;
	}
</style>

<!-- if (!this.isWx) {
					testAliPay({
						orderPaymentId: this.orderPaymentId
					}).then(res => {
						if (res.code === 200) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data,
								success: function(ress) {
									paymentReturn({
										orderPaymentId: this.orderPaymentId,
										tradeno: ress.tradeno
									}).then(resss => {
										if (resss.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '支付成功',
											});
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
				} -->

<!-- 	active: null,
			logisticsInfo: [],
			test1111: false, -->

<!-- import logistics from '@/components/common/logistics/dataList.vue'; -->

<!-- <logistics :show="test1111" @showFalse="showFalse" :logisticsInfo="logisticsInfo" :active="active"></logistics> -->

<!-- test(item) -->