<template>
	<view class="goods-list-box" :class="show?'show':''">
		<view class="cu-list menu-avatar">
			<block v-for="(item,index) in list_data" :key="index">
				<view class="cu-item margin-sm bg-white radius-2" @tap="listTap(item,index)">
					<view class="cu-avatar radius" :style="[{backgroundImage:'url('+ $httpImage + item.backPhoto +')'}]"
						style="width: 120px; height: 120px;">
					</view>
					<view class="content">
						<!--标题-->
						<view class="text-black text-cut">
							<text class="cu-tag bg-red radius sm" v-if="item.autarky">自营</text>
							<text class="text-bold" style=" white-space: pre-wrap;">{{item.modelName}} {{item.basePriceLabel}}</text>
							<!-- <view class="text-sm text-gray" style=" white-space: pre-wrap;">{{item.deviceLabel}}</view> -->
						</view>

						<!--价格-->
						<view class="text-gray text-cut text-sm tag-view" style="margin-top: 5rpx;">
							<text class="text-red text-bold text-price text-xl">{{item.sellPrice}}</text>
							<text class="text-gray text-cut text-sm" style="margin-left: 15rpx;">{{item.evaluateCount}}条评价</text>
						</view>
						<!--标签-->
						<view class="text-gray text-cut text-sm" style="margin-top: 5rpx;">
							<!--item.type-->
							<!-- <text class="">{{item.tags}}</text> -->

							<block v-for="(items,indexs) in item.recycleFormClassificationLabelList" :key="indexs">
								<text class="text-black  margin-right-sm" style="background: #E5FCF1;
						border-radius: 8rpx;height: 27rpx;padding: 5rpx 15rpx;color: #00C082;font-weight: 500;">
									{{items.labelName}}</text>
							</block>

						</view>
						<!--验机状态-->
						<view class="text-gray text-cut text-sm">
							<text class="cu-tag light bg-red radius sm" v-if="item.quv">已验机</text>
							<block v-for="(items,indexs) in item.style" :key="indexs">
								<text class="cu-tag line-blue radius sm">{{items}}</text>
							</block>
						</view>
						<!--门店-->
						<view class="text-gray text-cut text-sm" style="margin-top: 6rpx;">
							<text class="text-sm">优闲集小强回收直营店</text>
						</view>
					</view>
					<!-- <view class="action">
						<text class="text-red text-xl iconfont icon-add"></text>
					</view> -->
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'goods-sort-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return [];
				},
			},
			show: {
				type: Boolean,
				default: true,
			},
		},
		created() {
			console.log(this.list_data)
		},
		methods: {
			listTap(data, index) {
				this.$emit('listTap', {
					data,
					index,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.goods-list-box {
		display: none;

		.cu-list.menu-avatar>.cu-item {
			height: 120px;
			background: #ffffff;
			border: 0.5px solid rgba(213, 218, 223, 1);
			border-radius: 6px;
			overflow: hidden;

			&:after {
				width: 0;
				height: 0;
				border-bottom: 0;
			}

			.cu-avatar.lg {
				width: 140px;
				height: 140px;
				font-size: 2em;
			}

			.content {
				left: 130px;
				width: calc(100% - 94.54rpx - 59.99rpx - 90.99rpx);
				line-height: 1.4em;

				.cu-tag.sm {
					display: inline-block;
					margin-left: 0;
					height: 29.09rpx;
					font-size: 14.54rpx;
					line-height: 29.09rpx;
					margin-right: 9.09rpx;
					margin-bottom: 9.09rpx;
				}

				view:first-child {
					font-family: PingFangSC-Medium;
					font-size: 16px;
					color: #101010;
					font-weight: 500;
					display: inherit;
					align-items: inherit;
				}

				.through {
					text-decoration: line-through;
				}

				.tag-view {
					font-family: PingFangSC-Medium;
					font-size: 20px;
					color: #ff3a31;
					font-weight: 500;

					text {
						margin-right: 9.09rpx;
					}
				}
			}
		}
	}

	.goods-list-box.show {
		display: block;
	}
</style>