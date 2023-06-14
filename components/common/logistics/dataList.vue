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