<template>
	<view>
		<view class="zaiui-bar-view-box">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<!--<view class="text-center text-black zaiui-small-routine-title">客户列表</view>-->
			<!-- #endif -->
			
			<!--标题栏-->
			<bar-title bgColor="bg-white">
				<block slot="content">供应商列表</block>
				<block slot="right">
					<button class="cu-btn sm line-red round"  @tap="snTap">
						<text class="cuIcon-add"/>
						添加供应商
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
				<view class="cu-item bg-white radius-4 margin-sm" @click="choosecust(item)">
					<view class="content">
						<view class="text-grey">{{item.name}}</view>
					</view>
					<view class="action">
						<view class="text-gray text-sm">
							{{item.phone}}
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
		supplierList
	}from "@/api/erp.js"
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				seachtext:'',
				dataList: [],
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
				ifBottomRefresh:false,
				chooseStatus:0
			};
		},
		onLoad(options) {
			this.chooseStatus = options.chooseStatus;
		},
		onShow() {
			this.getDataList();
		},
		onReady() {
			
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
			choosecust(info){
				if(this.chooseStatus){
					return;
				}
				uni.$emit('updatesupplier',info)
				uni.navigateBack({
					delta: 1
				})
			},
			seachFuc(){
				this.getDataList();
			},
			snTap(){
				uni.navigateTo({
					url:'/pages/erp/supplier/add'
				})
			},
			isMobile (mobile) {
				let regExp = /^1[3-9]\d{9}$/;
				return regExp.test(mobile)
			},
			getDataList() {
				let that = this;
				let paramsData = {
					...that.queryInfo,
				}
				let storeId = uni.getStorageSync('userinfo').storeId;
				paramsData.storeId = storeId;
				supplierList(paramsData).then(res => {
						let data = res.data.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
			
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
			
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			}
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
