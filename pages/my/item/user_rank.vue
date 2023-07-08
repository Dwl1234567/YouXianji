<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">推广人排行</block>
		</bar-title>
		<view class="back">
			<image src="../../../static/huaban.png" class="backImg" mode="aspectFill"></image>
			<view class="head_tit text-left">
				<view>收益排行榜</view>
			</view>
			<view class="head_tits text-left">
				<view>赚取佣金等你来</view>
			</view>
		</view>

		<view class="sort  margin-sm text-center radius-6">

			<view class="head bg-white radius-6">
				<view class="small_title flex justify-content">
					<view class="">
						<view class="text-101010 text-lg">
							<text class="big">{{myRankList.myCommission||0}}</text>
						</view>
						<view>已赚佣金</view>

					</view>
					<view class="">
						<view class="text-red">
							<text class="big">{{myRankList.myRanking||0}}</text>
						</view>
						<view>当前排名</view>

					</view>
				</view>
			</view>
			<!--省市筛选-->
			<view class="">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					省份：
					<view class="cu-item" :class="index==addressIndex?'text-green cur':''" v-for="(item,index) in address"
						:key="index" @tap="tabSelect(item,index)">
						{{item.value}}
					</view>
				</scroll-view>
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					城市：
					<view class="cu-item" :class="index==cityIndex?'text-green cur':''"
						v-for="(item,index) in address[addressIndex].children" :key="index" @tap="tabCity(item,index)"
						:data-id="index">
						{{item.value}}
					</view>
				</scroll-view>
			</view>

			<view class="item-people margin-top radius-6 bg-white padding-bottom">
				<view class="t_tou">
					<view class="tou_1">排名</view>
					<view class="tou_2">分销人员</view>
					<view class="tou_1">佣金</view>
				</view>
				<view class="t">
					<block v-for="(item,index) of dataList" :key="index">
						<view class="t_01" :class="item.isme?'bg-red light':''">
							<view class="t_01_1">
								<text>
									{{item.flag}}
								</text>
								<!--<image src="@/static/item/win.png">{{index+1}}</image>-->
							</view>
							<view class="t_01_2">
								<image :src="$httpImage + item.avatar || '/static/img/avatar/1.png'"></image>
								{{item.nickName}}
							</view>
							<view class="t_01_3">
								{{item.totalMoney}}
							</view>
						</view>
					</block>
				</view>
			</view>

		</view>
		<!-- 下拉加载提示 -->
		<!-- <uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more> -->
	</view>
</template>

<script>
	import {
		selectDistributionIncomeRank,
		selectMyRankInfo
	} from "@/api/commons.js"
	import barTitle from '@/components/common/basics/bar-title';
	import address from './newDiZhi.json'
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				myRankList: {},
				cityIndex: 0,
				addressIndex: 0,
				address: [],
				TabCur: 0,
				scrollLeft: 0,
				list: [1, 2, 3, 4, 5],
				dataList: [],
				city: '三亚市',
				queryInfo: {
					pageNum: 1,
					pageSize: 20,
					city: ','
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				total: 0,
				curnum: 0,
				userfee: 0,
				ifBottomRefresh: false
			}
		},
		onLoad() {
			this.address = address
			this.$nextTick(() => {
				uni.startPullDownRefresh({

				})
			})
			this.selectMyRankInfo()
			// #ifdef APP-PLUS
			let that = this
			let type = '';
			uni.getSystemInfo({
				success: function(res) {
					if (res.osName == 'ios') {
						type = 'wgs84'
					} else {
						type = 'gcj02'
					}
				}
			});
			uni.getLocation({
				type: type,
				geocode: true, //设置该参数为true可直接获取经纬度及城市信息
				success: function(res) {
					console.log(res.address.city, '22222222222222222222222');
					that.city = res.address.city
					that.getDataList(res.address.city)
				},
				fail: function(res) {
					uni.showToast({
						title: '获取地址失败，将导致部分功能不可用',
						icon: 'none',
					});
				},
				complete() {},
			});
			// #endif
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		onPullDownRefresh() {
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList(this.city);
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList(this.city);
		},
		methods: {
			// 查询我的排行
			selectMyRankInfo() {
				selectMyRankInfo().then(res => {
					if (res.code === 200) {
						this.myRankList = res.data
					}
				})
			},
			tabSelect(e, index) {
				this.addressIndex = index
				this.cityIndex = 0;
				this.getDataList(e.children[0].value);
				// this.TabCur = e.currentTarget.dataset.id;
				// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tabCity(e, index) {
				this.cityIndex = index;
				this.getDataList(e.value);
			},
			getDataList(city) {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.city = city
				selectDistributionIncomeRank({
						city: city
					}).then(res => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							that.dataList = data
							// if (that.ifBottomRefresh) {
							// 	that.dataList = that.dataList.concat(data)
							// } else {
							// 	that.dataList = data
							// }
							// that.ifBottomRefresh = false
							// that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
							// this.total = res.total;

						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.back {
		position: relative;

		.backImg {
			width: 100vw;
		}

		.head_tit {
			position: absolute;
			top: 102rpx;
			left: 30rpx;
			font-family: PingFangSC-Semibold;
			font-size: 32px;
			color: #101010;
			font-weight: 600;
		}

		.head_tits {
			position: absolute;
			top: 192rpx;
			left: 30rpx;
			font-family: PingFangSC-Regular;
			font-size: 16px;
			color: #101010;
			font-weight: 400;
		}
	}

	.sort {
		position: relative;
		top: -160rpx;
		background-color: #F0F0F0;

		// width: 90vw;
		.head {
			//background-color: #E0451D;
			//color: #fff;
			padding: 37px 15px 10px;
			line-height: 50rpx;

			.head_tit {
				font-size: 24px;
				padding-bottom: 20px;
			}

			.small_title {
				justify-content: space-around;
				font-size: 30rpx;
				line-height: 60rpx;

				.big {
					font-size: 46rpx;
					font-weight: 700;
				}
			}
		}

		.head span {
			font-size: 30px;
			padding: 0 5px;
		}

		.t_tou {
			display: flex;
			padding: 10px;
			height: 30px;
			line-height: 30px;
			margin-bottom: 10px;
			justify-content: space-between;

		}

		.tou_1 {
			width: 20%;
			text-align: center;
		}

		.tou_2 {
			width: 45%;
			text-align: left;
		}

		.t_01 {
			display: flex;
			height: 50px;
			line-height: 50px;
			justify-content: space-between;

			.t_01_1 {
				width: 20%;
				text-align: center;

			}

			.t_01_2 {
				text-align: left;

				uni-image {
					width: 30px;
					height: 30px;
					border-radius: 30px;
					vertical-align: middle;
					margin-right: 10px;
				}
			}

			.t_01_3 {
				width: 20%;
				text-align: center;

			}
		}

		.t_01:nth-of-type(1) {
			color: red;
		}

		.t_01:nth-of-type(2) {
			color: green;
		}

		.t_01:nth-of-type(3) {
			color: skyblue;
		}

		/*
		.t .t_01:nth-of-type(odd) {
			background-color: #EEEEEE;
		}

		.t .t_01:nth-of-type(even) {
			background-color: #fff;
		}*/

	}
</style>