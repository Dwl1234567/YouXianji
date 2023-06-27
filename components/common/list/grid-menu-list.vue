<template>
	<view class="cu-list grid col-5 no-border">
		<block v-for="(item,index) in ListData" :key="index">
			<view class="cu-item text-center" @tap="listTap(item,index)">
				<view class="grid-icon circle">
					<image class="icon" :src="item.img" />
					<view class="cu-tag badge z" :class="['bg-' + item.color]" v-if="item.badge">{{item.badge}}</view>
					<text class="text-black">{{item.name}}</text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'grid-menu-list',
		data() {
			return {
				ListData: [],
				scrollPage: 1,
				scrollDot: 0,
			};
		},
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		created() {
			this.ListData = this.list_data;
			this.getScrollPageNum();
		},
		watch: {
			list_data() {
				this.ListData = this.list_data;
				this.getScrollPageNum();
			}
		},
		methods: {
			getScrollPageNum() {
				this.scrollPage = _tool.getPageNum(this.ListData.length, 10);
			},
			navScroll(e) {
				//计算公式: 移动距离 /（A总 / B总）
				let pageWidth = this.scrollPage * 16;
				let Width = e.detail.scrollWidth / pageWidth;
				this.scrollDot = e.detail.scrollLeft / Width;
			},
			listTap(data, index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-list.grid {
		background-color: #FFFFFF;
		border: 0.5px solid rgba(213, 218, 223, 1);
		border-radius: 6px;

		.grid-icon {
			margin: 0 10rpx;

			.icon {
				border-radius: 100%;
			}
		}
	}

	.text-black {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #101010;
		font-weight: 400;
	}

	.cu-list.grid>.cu-item .cu-tag {
		transform: scale(0.8);
	}

	.cu-list {
		padding-top: 12px !important;
		padding-bottom: 6px !important;
	}

	.cu-list.grid.no-border,
	.cu-list.grid.no-border>.cu-item {
		padding-top: 0;
		padding-bottom: 0px;
	}

	.cu-list.grid>.cu-item .circle {
		margin: 0 auto !important;

		.icon {
			display: inline-block;
			margin: 0;
			// padding:24upx;
			background-color: #ffffff;
			width: 33px;
			height: 33px;
			border-radius: 0% !important;
		}

		text {
			margin-top: 0;
		}
	}
</style>