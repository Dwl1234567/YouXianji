<template>
	<view class="bar-search-title-box">
		<view class="cu-bar" :class="[fixed?'fixed':'', shadow?'':'no-shadow', bgColor]">
			<view class="action" @tap="BackPage" v-if="isBack">
				<text class="iconfont icon-fanhui" />
			</view>
			<view class="search" style="width: 100%;">
				<view class="search-form round">
					<text class="cuIcon-search" />
					<!-- <text class="margin-left-xs">{{content}}</text> -->
					<input class="margin-left-xs" v-model="seachKey" confirm-type="search" :placeholder="content"
						@input="seachTap" @confirm="contentTap" />
					<button v-show="seachKey?true:false" class="seach-btn cu-btn bg-red sm text-bold radius-3" @click="seachTap">搜索</button>
					<text class="cuIcon-roundclosefill" style="font-size: 40rpx;" v-if="showClearIcon" @click="clearIcon"></text>
				</view>
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
		name: 'bar-search-title',
		props: {
			storeName: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: ''
			},
			content: {
				type: String,
				default: '输入关键字'
			},
			isBack: {
				type: Boolean,
				default: true
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
		data() {
			return {
				seachKey: '',
				showClearIcon: false,
			}
		},
		mounted() {
			// console.log(this.storeName);
		},
		methods: {
			clearIcon(){
				this.seachKey = '';
				this.seachTap();
			},
			BackPage() {
				uni.navigateBack() // 解决ios点击返回无效
				// this.$api.navigateBack();
			},
			contentTap() {
				// console.log('点一下~');
				this.$emit('contentTap');
			},
			rightTap() {
				this.$emit('rightTap');
			},
			seachTap() {
				if (this.seachKey.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
				this.$emit('seachTap', this.seachKey)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bar-search-title-box {
		.cu-bar {
			padding-top: var(--status-bar-height);
			min-height: calc(var(--status-bar-height) + 101rpx);
		
			.content {
				// top: var(--status-bar-height);
				/* #ifndef MP */
				// width: calc(100% - 181.81rpx);
				/* #endif */

				/* #ifdef MP */
				// left: -140rpx;
				// width: calc(100% - 300rpx);
				/* #endif */

				.search-form {
					display: inherit;
					flex: inherit;
					margin: 0;
					color: #717171;

					[class*="cuIcon-"] {
						margin: 0;
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
		.search-form{
			.seach-btn{
				line-height:unset;
				
			}
		}
	}	
	.cu-bar .search-form [class*="cuIcon-roundclosefill"]{
		margin:0 0.5em 0 0.3em;
	}
</style>
