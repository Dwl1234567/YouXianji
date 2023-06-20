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
<!-- showFalse() {
				this.test1111 = false
			}, -->
<!-- test(item) {
				selectLogisticsInfo({
					sortOrderId: item.sortOrderId
				}).then(res => {
					const {
						logisticsInfo,
					} = res.data;
					// 判断邮寄信息是否查询成功
					if (logisticsInfo && logisticsInfo.data && logisticsInfo.code == 200) {
						const data = logisticsInfo.data.map((item) => {
							return {
								title: item.AcceptStation,
								desc: item.AcceptTime,
							};
						});
						this.active = logisticsInfo.data.length - 1;
						this.logisticsInfo = data;
					}
				})
				this.test1111 = true
			}, -->

<!-- 	active: null,
			logisticsInfo: [],
			test1111: false, -->

<!-- import logistics from '@/components/common/logistics/dataList.vue'; -->

<!-- <logistics :show="test1111" @showFalse="showFalse" :logisticsInfo="logisticsInfo" :active="active"></logistics> -->

<!-- test(item) -->