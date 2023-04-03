<template>
	<view class="bar-title-box">
		<view class="cu-bar" :class="[fixed?'fixed':'', shadow?'':'no-shadow', bgColor]">
			<view class="action" @tap="BackPage" v-if="isBack">
				<text class=" iconfont icon-fanhui"/>
				<text>{{backText}}</text>
			</view>
			<view class="action" @tap="leftTap" v-if="!isBack">
				<slot name="left" />
			</view>
			<view class="content" @tap="contentTap">
				<slot name="content" />
			</view>
			<view class="action" @tap="rightTap">
				<!--小程序端不显示-->
				<!-- #ifndef MP -->
				<slot name="right" />
				<!-- #endif -->
			</view>
		</view>
		<!--占位的-->
		<view class="seat-height" v-if="fixed" />
	</view>
</template>

<script>
	export default {
		name: 'bar-title',
		props: {
			bgColor: {
				type: String,
				default: 'bg-white'
			},
			datas: {
				type: String,
				default: ''
			},
			isBack: {
				type: Boolean,
				default: true
			},
			backText: {
				type: String,
				default: ""
			},
			fixed: {
				type: Boolean,
				default: true
			},
			shadow: {
				type: Boolean,
				default: false
			}
		},
		created() {
			
		},
		methods: {
			BackPage() {
				const canNavBack = getCurrentPages()
				console.log(canNavBack, 'canNavBack2222222222')
				if (this.datas == 1) {
					uni.navigateBack({
						delta: 6
					})
				} else {
					//判断是否刷新了浏览器，刷新了浏览器，页面栈只有当前一个
					// #ifdef H5
					if (canNavBack && canNavBack.length > 1) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						history.back()
					}
					// #endif
					// #ifndef H5
					uni.navigateBack()
					// #endif
				}
				
			},
			leftTap() {
				this.$emit('leftTap');
			},
			contentTap() {
				this.$emit('contentTap');
			},
			rightTap() {
				this.$emit('rightTap');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bar-title-box {
		.cu-bar {
			padding-top: var(--status-bar-height);
			min-height: calc(var(--status-bar-height) + 101rpx);
			z-index: 100;
			.content {
				top: var(--status-bar-height);

				.cu-tag {
					position: relative;
					top: -2.72rpx;
					padding: 0 5.45rpx;

					text {
						position: relative;
						top: 2rpx;
					}
				}
			}
		}

		.cu-bar.fixed.no-shadow {
			box-shadow: inherit;
		}

		.cu-bar.bg-white {
			color: #333333;
		}

		.seat-height {
			width: 100%;
			height: calc(var(--status-bar-height) + 101rpx);
		}
	}
</style>
