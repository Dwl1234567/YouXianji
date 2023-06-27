<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">流水账单</block>
		</bar-title>
		<view class="cu-list menu">
			<view class="ticheng bg-white">
				<view class="cu-item arrow" style="display: flex; justify-content: space-between; padding: 20rpx;">
					<view class="content">筛选时间</view>
					<view class="action">
						<view class="picker text-gray" @tap="show = true">{{ time ? time : '请选择月份'}}</view>
					</view>
				</view>
				<view class="totalfee padding-lg text-center text-red">
					共
					<text class="fee">{{allPrice}}</text>
					元
				</view>
				<view class="t_tou">
					<view class="tou_1">
						<view class="bg-white">来源/时间</view>
					</view>
					<view class="tou_2">
						<view class="bg-white">金额</view>
					</view>
				</view>
				<block v-for="(item,index) of dataList" :key="index">
					<view v-if="item.index" class="formatData">{{item.createDateStr}}</view>
					<view class="tc" @click="jump(item.id)">
						<view class="left" style="display: flex;align-items: center;">
							<!-- <image :src="$httpImage + item.frontPhoto"
								style="width: 115rpx;height: 115rpx;background-color: aliceblue;margin-right: 10rpx;"></image> -->
							<view>
								<view class="text_1">{{item.financeName}}</view>
								<view class="text_1">{{item.basePriceLabel}}</view>
								<view class="text_2" v-if="item.deviceNo">序列号：{{item.deviceNo}}</view>
								<view class="text_2" style="margin-top: 10rpx;">时间：{{item.createTime}}</view>
								<view class="text_2" style="margin-top: 10rpx;">数量：{{item.number}}</view>
								<view class="text_2" style="margin-top: 10rpx;" v-if="item.fittingsCostPrice">
									单价：{{item.fittingsCostPrice}}元</view>
							</view>
						</view>
						<view class="right">
							{{item.financeType == 0 ? '-' : '+'}}{{item.money}}
						</view>
						<!-- <view class="item1">
							<view class="">{{item.memo}}</view>
							<view class="text-lightgrey">{{item.createtime}}</view>
						</view>
						<view class="item2 padding-sm" :class="item.money < 0 ? 'text-lightgrey':'text-red'">
							{{item.money}}
						</view> -->
					</view>
				</block>
			</view>
			<!-- <view class="cu-item" v-for="(item,index) in dataList" :key="index"> -->
			<!-- <view class="content padding-tb-sm">
					<view class="margin-bottom-sm">{{item.subjects_id|FbilltypeInfo}}[{{item.type == 'income'?'收入':'支出'}}]{{item.amount}}元</view>
					<view class="text-gray text-sm">
						<view class="cu-tag round bg-blue light">{{item.type == 'income'?'应收款':'应付款'}}</view>
						<view class="cu-tag round bg-olive light">{{item.subjects_id|FbilltypeInfo}}</view>
						<view class="cu-tag round bg-red light">{{item.status == 'unaudited'?'待审批':'已审批'}}</view>
					</view>
				</view> -->
			<!-- <view class="action">
					<view class="text-grey">
						<view class="text-right margin-bottom-sm" >{{item.desc}}</view>
						<view class="text-grey text-sm" style="text-align: right;">{{item.audittime}}</view>
					</view>
				</view> -->
			<!-- </view> -->
		</view>
		<u-datetime-picker ref="datetimePicker" :show="show" v-model="value1" mode="year-month" :formatter="formatter"
			@confirm="aaa(1)" @cancel="close"></u-datetime-picker>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		financeList
	} from "@/api/erp.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	// 科目类别
	const billtypeInfo = [{
		value: 1,
		lable: '工资'
	}, {
		value: 2,
		lable: '采购'
	}, {
		value: 3,
		lable: '差旅'
	}, {
		value: 4,
		lable: '交通'
	}, {
		value: 5,
		lable: '招待'
	}, {
		value: 6,
		lable: '运营'
	}, {
		value: 7,
		lable: '租赁'
	}, {
		value: 8,
		lable: '办公'
	}, {
		value: 9,
		lable: '销售'
	}, {
		value: 10,
		lable: '快递'
	}]
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				allPrice: '',
				show: false,
				formatDatas: '',
				value1: Number(new Date()),
				time: '',
				ifBottomRefresh: false,
				dataList: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
					financeType: ''
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad() {
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		// 下拉刷新
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
		filters: {
			FbilltypeInfo(value) {
				if (!value) return ''
				let text = ''
				billtypeInfo.map((item, index) => {
					if (item.value == value) {
						text = item.lable;
					}
				})
				return text;
			}
		},
		methods: {
			day(e) {
				var today = new Date(e);

				//日期
				var DD = String(today.getDate()).padStart(2, '0'); // 获取日
				var MM = String(today.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
				var yyyy = today.getFullYear(); // 获取年

				// 时间
				var hh = String(today.getHours()).padStart(2, '0'); //获取当前小时数(0-23)
				var mm = String(today.getMinutes()).padStart(2, '0'); //获取当前分钟数(0-59)
				var ss = String(today.getSeconds()).padStart(2, '0'); //获取当前秒数(0-59)
				today = yyyy + '-' + MM;
				return today;
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				}
				if (type === 'month') {
					return `${value}月`;
				}
				if (type === 'day') {
					return `${value}日`;
				}
				return value;
			},
			close() {
				this.show = false;
			},
			aaa(value) {
				setTimeout(() => {
					console.log(this.day(this.value1), value);
					this.time = this.day(this.value1);
					this.show = false;
					this.getDataList();
				}, 100);
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.queryDateStr = this.time
				financeList(paramsData).then(res => {
						this.allPrice = res.data.totalMoney
						let data = res.data.dataArr.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							data.map(item => {
								if (item.createDateStr == this.formatDatas) {
									item.index = 0
									return item
								} else {
									this.formatDatas = item.createDateStr;
									item.index = 1
									return item
								}
							})
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.dataArr.total == that.dataList.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.formatData {
		height: 52rpx;
		background: #F9F9FB;
		line-height: 52rpx;
	}

	.head {
		display: flex;
		margin: 10px 0;
	}

	.head_l {
		display: flex;
		width: 85%;
		justify-content: space-around;
	}

	.head_r {
		width: 15%;
		text-align: center;
	}

	.head_l_1 {
		border: 1px solid #F2F2F2;
		padding: 0px 15px;
		line-height: 25px;
	}

	.head_btn {
		margin: 10px 20px 0;
		border: 1px solid #F2F2F2;
		padding: 0px 15px;
		line-height: 25px;
	}

	.ling {
		color: #E1461D;
		border: 1px solid #E1461D;
		padding: 0px 15px;
		line-height: 25px;
	}

	.shouyi {
		border-top: 1px solid #EBEBEB;
		border-bottom: 1px solid #EBEBEB;
		background-color: #FAFAFA;
		display: flex;
		height: 30px;
		line-height: 30px;
		padding: 3px 10px;
		margin-top: 15px;
	}

	.sy_l {
		width: 50%;
	}

	.sy_l span {
		font-weight: bold;
	}

	.ticheng {
		.totalfee {
			font-size: 40rpx;

			.fee {
				font-size: 80rpx;
			}
		}

		.t_tou {
			display: flex;
			padding: 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			margin-bottom: 20rpx;
			text-align: center;

			.tou_1 {
				width: 75%;
				text-align: left;
				font-size: 29rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #101010;
				line-height: 40rpx;
			}

			.tou_2 {
				font-size: 29rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #101010;
				line-height: 40rpx;
				width: 25%;
			}
		}

	}

	//.ticheng li:nth-of-type(odd){ background-color: #EEEEEE;} 
	//.ticheng li:nth-of-type(even){background-color: #fff;} 
	.tc {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		line-height: 25px;
		font-size: 14px;
		text-align: center;
		align-items: center;
		border-bottom: 1px solid #D8D8D8;

		.item1 {
			width: 75%;
		}

		.item2 {
			width: 25%;
		}

		.text_1 {
			font-size: 35rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #101010;
			line-height: 35rpx;
			margin-bottom: 10rpx;
			text-align: left;
		}

		.text_2 {
			font-size: 23rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #929294;
			line-height: 23rpx;
			text-align: left;
		}
	}

	//.tc_l{color: #9A9A9A;}
	//.tc_l span{font-size: 14px;font-weight: bold;color: #000;}
	//.tc_2{color: #E1461D;}
	//.tc_2 span{color: #9A9A9A;}

	.cash-btn {
		position: fixed;
		left: 15px;
		right: 15px;
		bottom: 8px;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>