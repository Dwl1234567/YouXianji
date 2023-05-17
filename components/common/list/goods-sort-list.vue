<template>
	<view class="goods-list-box" :class="show?'show':''">
		<view class="cu-list menu-avatar">
			<block v-for="(item,index) in list_data" :key="index">
				<view class="cu-item margin-sm bg-white radius-2" @tap="listTap(item,index)">
					<view
						class="cu-avatar radius lg"
						:style="[{backgroundImage:'url('+ $httpImage + item.frontPhoto +')'}]"
					></view>
					<view class="content">
						<!--标题-->
						<view class="text-black text-cut">
							<text class="cu-tag bg-red radius sm" v-if="item.autarky">自营</text>
							<text class="text-bold">{{item.title}}</text>
						</view>
						<!--标签-->
						<view class="text-gray text-cut text-sm">
							<!--item.type-->
							<text class="">{{item.tags}}</text>
							<!--
							<block v-for="(items,indexs) in item.tags" :key="indexs">
								<text class="text-black  margin-right-sm"> {{items}}</text>
							</block>
							-->
						</view>
						<!--价格-->
						<view class="text-gray text-cut text-sm tag-view">
							<text class="text-red text-bold text-price text-xl">{{item.sellPrice}}</text>
							<!-- <text class="text-gray through" v-if="item.cost_price">￥{{item.cost_price}}</text> -->
							<block v-for="(items,indexs) in item.discount" :key="indexs">
								<text class="cu-tag line-orange radius sm">{{items}}</text>
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
						<view class="text-gray text-cut text-sm">
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
		.cu-list.menu-avatar > .cu-item {
			height: 140px;
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
				left: 153px;
				width: calc(100% - 94.54rpx - 59.99rpx - 119.99rpx);
				line-height: 1.7em;
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
					margin-top: 12px;
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
