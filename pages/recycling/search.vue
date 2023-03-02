<template>
	<view>
		<view class="bar-search-title-box">
			<view class="cu-bar search bg-white fixed no-shadow">
				<!-- #ifndef MP -->
				<view class="action" @tap="BackPage">
					<text class="cuIcon-back" />
				</view>
				<!-- #endif -->
				<view class="search-form round">
					<text class="cuIcon-search" />
					<input @input="searchInput" :value="keyword" :adjust-position="false" type="text" placeholder="苹果7"
						confirm-type="search" />
					<text class="cuIcon-close close-icon" v-if="search_close" @tap="closeInput" />
				</view>
				<view class="action">
					<text class="text-red">搜索</text>
				</view>
			</view>
			<!--占位的-->
			<view class="seat-height" />
		</view>
		<view class="search-warp" v-if="showWarp">
			<scroll-view scroll-y class="item-container">
				<view class="thumb-box" v-for="(item,index) in seachInfo" :key="index" @click="gorecycling(item)">
					<view class="">
						<text>{{item.name}}</text>
					</view>
					<!-- <u-icon name="checkbox-mark" color="primary" size="24"></u-icon> -->
				</view>

			</scroll-view>
		</view>
		<!--搜索区域-->
		<view class="padding search-list-view" v-if="!deleteView">
			<!--搜索记录-->
			<!-- <view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<text class="cuIcon-delete text-gray icon-right" @tap="deleteTap" />
				</view>
				<view class="btn-view">
					<button class="cu-btn round">耳机</button>
					<button class="cu-btn round">苹果手机</button>
					<button class="cu-btn round">电动车</button>
				</view>
			</view> -->

			<!--推荐搜索-->
			<!-- <view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">推荐搜索</text>
				</view>
				<view class="btn-view">
					<button class="cu-btn round">耳机</button>
					<button class="cu-btn round">苹果手机</button>
					<button class="cu-btn round">电动车</button>
					<button class="cu-btn round">笔记本</button>
					<button class="cu-btn round">衣柜</button>
					<button class="cu-btn round">平板电脑</button>
					<button class="cu-btn round">华为手机</button>
					<button class="cu-btn round">小米</button>
					<button class="cu-btn round">三星</button>
				</view>
			</view> -->
		</view>

		<!--处理历史记录-->
		<view class="padding search-list-view" v-if="deleteView">
			<!--搜索记录-->
			<view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<view class="text-sm text-right">
						<text class="text-gray">全部删除</text>
						<text class="text-red" @tap="logTap">完成</text>
					</view>
				</view>
				<view class="btn-view">
					<button class="cu-btn round">
						<text>耳机</text>
						<text class="cuIcon-roundclosefill close-icon" />
					</button>
					<button class="cu-btn round">
						<text>苹果手机</text>
						<text class="cuIcon-roundclosefill close-icon" />
					</button>
					<button class="cu-btn round">
						<text>电动车</text>
						<text class="cuIcon-roundclosefill close-icon" />
					</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		searchRecycleData
	} from "@/api/common.js"
	export default {
		data() {
			return {
				search_close: false,
				keyword: '',
				showWarp: false,
				deleteView: false,
				seachInfo: ''
			}
		},
		onLoad() {

		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			// 搜索结果
			searchRecycleDataFuc(name) {
				let that = this;
				let params = {
					'name': name
				}
				searchRecycleData(params).then(res => {
					if (res.code == 1) {
						that.seachInfo = res.data.filter((item) => {
							return item
						})
					}
				})
			},
			BackPage() {
				uni.navigateBack();
			},
			searchInput(event) {
				let value = event.detail.value;
				if(!value){
					return false;
				}
				this.searchRecycleDataFuc(value);
				this.keyword = value;
				if (value) {
					this.search_close = true;
					this.showWarp = true; //打开联想框
				} else {
					this.search_close = false;
					this.showWarp = false; //关闭联想框
				}
				console.log(value)
			},
			closeInput() {
				this.keyword = '';
				this.search_close = false;
				this.showWarp = false; //关闭联想框
			},
			deleteTap() {
				this.deleteView = true;
			},
			logTap() {
				this.deleteView = false;
			},
			// 去回收
			gorecycling(data) {
				uni.navigateTo({
					url: 'recycling-new?id=' + data.id + '&cate_id=' + data.cate_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.bar-search-title-box {
		.cu-bar {
			/* #ifndef MP */
			padding-top: var(--status-bar-height);
			min-height: calc(var(--status-bar-height) + 101rpx);

			/* #endif */
			.content {
				top: var(--status-bar-height);
				width: calc(100% - 181.81rpx);
			}

			.search-form [class*="cuIcon-"] {
				margin: 0 0.8em 0 0.8em;
			}

			.search-form {
				/* #ifdef MP */
				margin-right: 28.81rpx;
				/* #endif */

				margin-left: 9.09rpx;

				.close-icon {
					font-size: 29.09rpx;
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
			/* #ifdef MP */
			// height: calc(var(--status-bar-height) + 101rpx);
			height: 20rpx;
			/* #endif */

		}
	}

	//搜索联想框
	.search-warp {
		display: flex;
		overflow: hidden;
		background-color: #FFFFFF;
		position: absolute;
		z-index: 101;
		//top: calc(var(--status-bar-height) + 121rpx);
		left: 0;
		width: 100%;
		padding-top: 80rpx;
		.item-container {
			display: flex;
			flex-direction: column;
			flex: 1;
			padding: 15rpx 0;

			// height: 200rpx;
			.thumb-box {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				height: 60rpx;
				width: 100%;
				padding: 0 20rpx;
				align-items: center;
				font-size: 26rpx;

				.item-active {
					color: #0081FF;
				}
			}
		}
	}

	.search-list-view {
		position: relative;
		width: 100%;
		margin-top: 30rpx;
		.search-list-view {
			.search-bar-view {
				position: relative;
				margin-bottom: 18.18rpx;
				width: 100%;

				.icon-right {
					position: absolute;
					right: 0;
					top: 5.45rpx;
				}

				.text-right {
					position: absolute;
					right: 0;
					top: 4rpx;

					text+text {
						margin-left: 27.27rpx;
					}
				}
			}

			.btn-view {
				position: relative;
				padding-bottom: 36.36rpx;
				width: 100%;

				.cu-btn {
					color: #333333;
					height: 54.54rpx;
					font-size: 23.63rpx;
					margin-right: 27.27rpx;
					margin-bottom: 18.18rpx;

					.close-icon {
						top: 0;
						color: #9c9797;
						right: -9.09rpx;
						position: absolute;
						font-size: 27.27rpx;
					}
				}
			}
		}
	}
</style>
