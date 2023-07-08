<template>
	<view>
		<view class="zaiui-bar-view-box">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<!--<view class="text-center text-black zaiui-small-routine-title">客户列表</view>-->
			<!-- #endif -->

			<!--标题栏-->
			<bar-title bgColor="bg-white" adress="/pages/tabbarerp/home">
				<block slot="content">客户列表</block>
				<block slot="right" v-if="isShow != 'false'">
					<button class="cu-btn sm line-red round" @tap="addCustomer">
						<text class="cuIcon-add" />
						添加客户
					</button>
				</block>
			</bar-title>
		</view>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="seachtext" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-red round" @click="seachFuc">搜索</button>
			</view>
		</view>

		<view class="cu-list menu">
			<block v-for="(item,index) in dataList" :key="index">
				<view class="cu-item bg-white  radius-4 margin-sm" @click="choosecust(item)">
					<view class="content">
						<view class="text-grey">{{item.clientName}}</view>
					</view>
					<view class="action">
						<view class="text-gray text-sm">
							{{item.phonenumber}}
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		employeeClientList
	} from "@/api/erp.js"
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				reorganizeId: null,
				tab: null,
				isShow: true,
				CustomBar: this.CustomBar,
				pageNum: 1,
				pageSize: 100,
				seachtext: '',
				dataList: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 10,
					clientName: '',
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				chooseStatus: 0
			};
		},
		onLoad(options) {
			this.sellFormId = options.sellFormId ? options.sellFormId : ''
			this.reorganizeId = options.reorganizeId ? options.reorganizeId : ''
			this.tab = options.tab
			this.isShow = options.isShow
			this.chooseStatus = options.chooseStatus;
			// this.getDataList();
		},
		onBackPress() {
			console.log('物理返回')
			let pages = getCurrentPages() // 获取栈实例
			let page = pages[pages.length - 1] // 获取当前页面的数据，包含页面路由
			let prevPage = pages[pages.length - 2] // 获取上个页面的数据，包含页面
			if (prevPage.route != 'pages/tabbarerp/home') {
				uni.navigateTo({
					url: '/pages/tabbarerp/home',
				});
			}
		},
		onShow() {
			this.getDataList();
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
			// 添加kehu
			addCustomer() {
				uni.navigateTo({
					url: "/pages/erp/customer/add"
				});
			},
			choosecust(info) {
				if (this.chooseStatus) {
					return;
				}
				uni.setStorageSync('updatecustomer', info)
				if (this.reorganizeId) {
					uni.navigateTo({
						url: '/pages/tabbarerp/push?tab=' + this.tab + '&reorganizeId=' + this.reorganizeId
					})
				} else if (this.sellFormId) {
					uni.navigateTo({
						url: '/pages/tabbarerp/push?tab=' + this.tab + '&sellFormId=' + this.sellFormId
					})
				} else {
					uni.navigateTo({
						url: '/pages/tabbarerp/push?tab=' + this.tab
					})
				}

			},
			seachFuc() {
				this.getDataList();
			},
			isMobile(mobile) {
				let regExp = /^1[3-9]\d{9}$/;
				return regExp.test(mobile)
			},
			getDataList() {
				let that = this;
				that.queryInfo.clientName = that.seachtext;
				// that.queryInfo.username  = that.seachtext;
				let paramsData = that.queryInfo;
				employeeClientList(paramsData).then(res => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载

							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'

						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>