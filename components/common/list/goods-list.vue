<template>
	<view class="margin-bottom goods-list-box" :class="show?'show':''">
		<view class="flex flex-wrap ">
			<view class="padding-sm padding-right-xs ">
				<block v-for="(item,index) in list_data" :key="index">
					<view class="bg-white margin-bottom-sm list-radius" v-if="!item.type" @tap="listTap(item,index)">
						<view class="goods-img">
							<image :src="item.image" mode="widthFix" lazy-load/>
							<text class="cuIcon-videofill text-white pay-view" v-if="item.pay"/>
						</view>
						<view class="padding-xs">
							<view class="text-cut-2 text-black">{{item.title}}</view>
							<view class="margin-top-xs">
								<view class="flex">
									<view class="flex-sub">
										<text class="text-price text-red text-xl text-left">{{item.sales_price}}</text>
									</view>
									<view class="flex-sub text-right" v-if="item.test_id">
										<text class="cu-tag light bg-red radius sm ">已验机</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'goods-list',
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
		position: relative;
		width: 100%;
		display: none;
		.list-radius {
			border-radius: 19rpx;
		}
		.goods-img {
			position: relative;
			width: 100%;
			image {
				width: 100%;
				border-radius: 19rpx 19rpx 0 0;
			}
			.pay-view {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				font-size: 46rpx;
			}
			.service-view {
				position: absolute;
				width: 100%;
				bottom: 7.5rpx;
				right: 10rpx;
			}
			.mold-view {
				position: absolute;
				width: 100%;
				bottom: 7.5rpx;
				left: 10rpx;
			}
		}
		.text-time {
			line-height: 47rpx;
		}
		.recommend-list-box {
			.img-aat {
				width: 55rpx;
				margin-top: 10rpx;
			}
			.img-goods {
				font-variant: small-caps;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				-webkit-box-pack: center;
				justify-content: center;
				-webkit-box-align: center;
				align-items: center;
				white-space: nowrap;
				position: relative;
				width: 137rpx;
				height: 137rpx;
				background-size: cover;
				background-position: center;
				vertical-align: middle;
				border-radius: 12%;
			}
		}
	}
	.goods-list-box.show {
		display: block;
	}
</style>
