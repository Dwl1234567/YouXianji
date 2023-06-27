<template>
	<view>
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">改报价</block>
		</bar-title>
		<view style="padding: 30rpx;">
			<view class="tableTitle">
				<view class="col-8">
					内容
				</view>
				<view class="col-4">
					历史价
				</view>
				<view class="col-4">
					现价
				</view>
			</view>
			<view v-for="(item,index) in dataList" :key="index" class="tableItem">
				<view class="item_1">{{item.keyName}}</view>
				<view class="item_2">
					<view v-for="(items,indexs) in item.adjustPriceTaskItemList" :key="indexs" class="item_3">
						<view class="item_4">{{items.valueName}}</view>
						<view class="item_4">{{items.oldPrice}}</view>
						<view class="item_4" v-if="see == true">{{items.newPrice}}</view>
						<view class="item_4" v-else><input type="text" v-model="items.newPrice" @blur="inpuBlur"></view>
					</view>
				</view>

			</view>

		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
	</view>

</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		selectTaskItemList,
		saveAdjustPrice
	} from "@/api/erp.js"
	export default {
		//name: 'sales',
		components: {
			barTitle
		},
		data() {
			return {
				index: null,
				taskId: 0,
				see: false,
				TabCur: 0,
				dataList: [{

				}],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				ifBottomRefresh: false,
			}
		},
		onLoad(options) {
			this.index = options.index
			this.taskId = options.taskId
			this.see = options.see
			this.getDataList(options.taskId)
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		onPullDownRefresh() {
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList(this.taskId);
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList(this.taskId);
		},
		methods: {
			inpuBlur() {
				saveAdjustPrice(this.dataList)
			},
			tabSelect(e) {
				// console.log(e);
				if (this.TabCur != e.currentTarget.dataset.id) {
					// 进入页面刷新
					uni.startPullDownRefresh();
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 获取列表
			getDataList(taskId) {
				let that = this;

				selectTaskItemList({
						taskId
					}).then(res => {
						that.dataList = res.data
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			goodsclick(id) {
				uni.navigateTo({
					url: '/pages/erp/user/attrprice?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";

	/* #endif */
	// page {
	// 	background: #F0F0F0;
	// }
	.tableTitle {
		display: flex;

		view:nth-child(1) {
			width: 50% !important;
		}

		view {
			border: 1px solid #E2E2E2;
			text-align: center;
			width: 25%;
		}
	}

	.tableItem {
		display: flex;
		// align-items: center;

		.item_1 {
			width: 25%;
			text-align: center;
			border: 1px solid #E2E2E2;
		}

		.item_2 {
			width: 75%;

		}

		.item_3 {
			display: flex;
		}

		.item_4 {
			height: 72rpx;
			line-height: 72rpx;
			border: 1px solid #E2E2E2;
			text-align: center;
			width: 33.33%;

			input {
				height: 72rpx;
				// line-height: 72rpx;
			}
		}
	}

	.box {

		.boxs {
			padding-bottom: 80rpx !important;
		}

		.title {
			font-size: 29rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #101010;
			line-height: 29rpx;
		}

		.text {
			margin-top: 20rpx;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #8E8E8E;
			line-height: 25rpx;
		}

		.button {
			float: right;
			display: inline-block;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 34rpx;
			padding: 9rpx 47rpx;
			background: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
			border-radius: 29rpx;
		}
	}

	.item {
		text-align: center;

		.img {
			width: 166rpx;
			height: 166rpx;
		}

		.text {
			color: #999999;
			font-size: 24rpx;
			// height: 50rpx;
		}


	}

	.cur {
		.tab-dot {
			position: absolute;
			height: 3px !important;
			border-radius: 20rpx;
			bottom: 5px;
			left: 0;
			right: 0;
			width: 25px !important;
			margin: auto;
			background-image: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
		}
	}
</style>