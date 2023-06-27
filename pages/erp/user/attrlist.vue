<template>
	<view>
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">改报价</block>
		</bar-title>
		<scroll-view scroll-x class="bg-white nav text-center text-xl">
			<view class="cu-item padding-lr-sm " :class="0==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="0" style="position:relative">
				正在进行
				<view class="tab-dot bg-white"></view>
			</view>
			<view class="cu-item padding-lr-sm" :class="1==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="1" style="position:relative">
				已完成
				<view class="tab-dot bg-white"></view>
			</view>
		</scroll-view>
		<view class="margin">
			<view class="box" v-if="TabCur == 0" style="background-color: white;border-radius: 11rpx;">
				<view style="padding: 40rpx 28rpx;" class="boxs" v-for="(item,index) in dataList" :key="index">
					<view class="title">{{item.modelName}}</view>
					<view class="text">时间:{{item.updateTime}}</view>
					<view class="button" @tap="editAtt(item, 0)">修改</view>
				</view>

			</view>
			<view class="box" style="padding: 40rpx 28rpx; background-color: white;border-radius: 11rpx;" v-if="TabCur == 1">
				<view class="box" v-if="TabCur == 1" style="background-color: white;border-radius: 11rpx;">
					<view style="padding: 40rpx 28rpx;" class="boxs" v-for="(item,index) in dataList" :key="index">
						<view class="title">{{item.modelName}}</view>
						<view class="text">时间:{{item.updateTime}}</view>
						<view class="button" @tap="editAtt(item, 1)">查看</view>
					</view>

				</view>
			</view>
			<view class="buttons" @tap="submitAttr" v-if="dataList.length && TabCur == 0">提交</view>
		</view>
		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		selectUnderwayTaskList,
		submitAdjustPrice
	} from "@/api/erp.js"
	export default {
		//name: 'sales',
		components: {
			barTitle
		},
		data() {
			return {
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
		onLoad() {
			//加载虚拟数据
			this.$nextTick(() => {
				uni.startPullDownRefresh({})
			})
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
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			submitAttr() {
				let data = this.dataList.map(item => {
					return item.taskId
				})
				submitAdjustPrice(data)
				this.getDataList()
			},
			editAtt(row, index) {
				const see = index == 1 ? true : false
				uni.navigateTo({
					url: '/pages/erp/user/editAttrlist?taskId=' + row.taskId + '&see=' + see
				})
			},
			// 获取列表
			getDataList() {
				let that = this;

				let paramsData = {
					...that.queryInfo,
				}
				paramsData.approveStatus = this.TabCur
				selectUnderwayTaskList(paramsData).then(res => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载

							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							console.log(that.dataList)
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'

						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.getDataList()
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
	page {
		background: #F0F0F0;
	}

	.buttons {
		background: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
		border-radius: 13rpx 13rpx 13rpx 11rpx;
		width: 622rpx;
		height: 84rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 84rpx;
		text-align: center;
		margin: 0 auto;
		margin-top: 50rpx;
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