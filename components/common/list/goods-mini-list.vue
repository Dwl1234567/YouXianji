<template>
	<view class="goods-list-box" :class="show?'show':''">
		<view class="cu-list menu-avatar">
			<block v-for="(item,index) in list_data" :key="index">
				<view class="cu-item bg-white margin-bottom-sm radius-6" @tap="listTap(item,index)">
					<view class="cu-avatar radius lg" :style="[{backgroundImage:'url('+ item.image +')'}]"></view>
					<view class="content">
						<!--标题-->
						<view class="text-black text-cut">
							<text class="text-bold">{{item.title}}</text>
						</view>
						<!--标签-->
						<view class="text-gray text-cut text-sm">
							<text class="cu-label bg-red radius" style="padding:0 5rpx;">{{item.colourname}}</text>
							<!--item.type-->
							<block v-for="(items,indexs) in item.tags" :key="indexs">
								<text class="text-black  margin-left-sm"> {{items}}</text>
							</block>
						</view>
						<!--价格-->
						<view class="text-gray text-cut text-sm tag-view">
							<text class="text-red text-bold text-price text-xl" v-if="item.sales_price">{{item.sales_price}}2222</text>
							<!-- <text class="text-gray through" v-if="item.cost_price">￥{{item.cost_price}}</text> -->
							<block v-for="(items,indexs) in item.discount" :key="indexs">
								<text class="cu-tag line-orange radius sm">{{items}}</text>
							</block>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'goods-mini-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			listTap(data,index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list-box {
		display: none;
		.cu-list{
			overflow: hidden;
		}
		.cu-list.menu-avatar > .cu-item {
			padding: 20px 12px;
			height: 119px;
			&:after {
				width: 0;
				height: 0;
				border-bottom: 0;
			}
			.cu-avatar{
				left: 12px;
			}
			.cu-avatar.lg {
				width: 79px;
				height: 79px;
				font-size: 2em;
			}
			.content {
				left: 99px;
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
					font-size: 26rpx;
					font-weight:blod;
					display: inherit;
					align-items: inherit;
				}
				.through {
					text-decoration:line-through;
				}
				.tag-view {
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
