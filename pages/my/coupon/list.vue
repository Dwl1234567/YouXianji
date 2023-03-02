<template>
	<view>
		<!--列表-->
		<view>
			<view class="coupon-sponsored-card-view" v-for="(item,index) in dataList" :key="index">
				<view class="card-price-view">
					<view class="text-red price-left-view">
						<text class="text-sm">￥</text>
						<text class="price">{{item.money}}</text>
					</view>
					<view class="name-content-view">
						<view class="text-cut text-red">{{item.title}}</view>
						<view class="text-xs">满{{item.least}}元可用</view>
						<view class="text-xs">有效期:{{item.starttime}} - {{item.endtime}}</view>
					</view>
					<view class="btn-right-view">
						<view class="cu-btn bg-deepblue" @click="RadioChange(item.id)">去使用</view>
					</view>
				</view>
				<view class="card-num-view">
					<view class="text-xs">券码：{{item.code}}</view>
				</view>
			</view>

		</view>
		<!-- 下拉加载提示 -->
		<!-- <uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more> -->
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import {
		usercouponmylist,
	} from "@/api/mall.js"
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				radio: '',
				dataList: [],
				queryInfo: {
					page: 1,
					pagesize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				total: 0,
				ifBottomRefresh: false
			}
		},
		onLoad(option) {
			this.$nextTick(() => {
				uni.startPullDownRefresh({

				})
			})
		},
		onPullDownRefresh() {
			this.queryInfo.page = 1; //重置分页页码
			this.getDataList();
		},
		methods: {
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				usercouponmylist({}).then(res => {
						let data = res.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							that.dataList = data
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			RadioChange(id) {
				uni.switchTab({
					url:'/pages/tabbar/home'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.coupon-sponsored-card-view {
		position: relative;
		margin: 27.27rpx 27.27rpx 0;

		.card-price-view {
			position: relative;
			background: #FFF5F5;
			border-radius: 14.54rpx 14.54rpx 0 0;
			padding: 18.18rpx;

			.price-left-view {
				position: absolute;
				height: 125.45rpx;
				width: 145.45rpx;
				text-align: center;
				line-height: 125.45rpx;

				.price {
					font-size: 45.45rpx;
					font-weight: 400;
				}
			}

			.name-content-view {
				position: relative;
				padding-left: 163.63rpx;
				padding-right: 145.45rpx;
				height: 125.45rpx;
				line-height: 1.8;
				color: #999898;

				&::before {
					content: '';
					position: absolute;
					top: -18.18rpx;
					bottom: -18.18rpx;
					margin-left: -18.18rpx;
					border-left: 2rpx dashed #fdbabc;
				}
			}

			.btn-right-view {
				position: absolute;
				right: 27.27rpx;
				top: 18.18rpx;
				height: 125.45rpx;
				line-height: 125.45rpx;
			}
		}

		.card-num-view {
			position: relative;
			background: #FFECED;
			border-radius: 0 0 14.54rpx 14.54rpx;
			border-top: 2rpx dashed #dedbdb;
			padding: 10.9rpx 27.27rpx;
			color: #999898;

			&::before {
				content: '';
				position: absolute;
				width: 36.36rpx;
				height: 36.36rpx;
				background: #ffffff;
				border-radius: 50%;
				top: -18.18rpx;
				left: -18.18rpx;
			}

			&::after {
				content: '';
				position: absolute;
				width: 36.36rpx;
				height: 36.36rpx;
				background: #ffffff;
				border-radius: 50%;
				top: -18.18rpx;
				right: -18.18rpx;
			}

			view {
				position: relative;
				padding-right: 72.72rpx;
			}

			text {
				position: absolute;
				right: 27.27rpx;
				top: 14.54rpx;
			}
		}
	}
</style>
