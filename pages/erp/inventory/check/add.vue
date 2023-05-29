<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">添加盘点任务</block>
		</bar-title>
		<scroll-view scroll-x class="bg-white nav text-center text-xl">
			<view class="cu-item padding-lr-sm " :class="1==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="1" style="position:relative">
				产品
				<view class="tab-dot bg-white"></view>
			</view>
			<!-- <view class="cu-item padding-lr-sm" :class="2==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="2" style="position:relative">
				已接受
				<view class="tab-dot bg-white"></view>
			</view> -->
			<view class="cu-item padding-lr-sm" :class="3==TabCur?'text-101010 cur':'text-929294'" @tap="tabSelect"
				data-id="3" style="position:relative">
				价格
				<view class="tab-dot bg-white"></view>
			</view>
		</scroll-view>
		<view class="context">
			<view class="list" v-for="(item, index) in warehouseListss" :key="index">
				<view>{{item.warehouseName}}</view>
				<view @tap="addList(index)" :class="item.display ? 'red' : ''"></view>
			</view>
		</view>
		<view class="oks" @tap="selectPeople">
			确定
		</view>
		<u-popup :show="taskShow" mode="bottom" closeOnClickOverlay @close="close" :closeIconPos="'top-right'">
			<view class="yunShow-top">
				<view class="yunShow-title">选择分配人员</view>
				<view class="yunShow-item">
					<!-- <view class="left">分配人员</view>
					<view class="select">
						<uni-data-select v-model="centerId" :localdata="range"></uni-data-select>
					</view> -->
					<view class="list" v-for="(item, index) in range" :key="index">
						<view>{{item.nickName}}</view>
						<view @tap="addNikeName(index)" :class="item.display ? 'red' : ''"></view>
					</view>
				</view>
			</view>
			<view class="yunShow-bottom">
				<view class="close" @tap="close">取消</view>
				<view class="ok" @tap="postStoreCheckTask">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		warehouseList,
		storeCheckTask,
		selectStoreUsers
	} from "@/api/erp.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				taskShow: false,
				warehouseIdList: [],
				TabCur: 1,
				range: [],
				centerId: 0,
				scrollLeft: 0,
				warehouseListss: [],
				checkboxArr: [],
				modalName: null,
				textareaAValue: '',
			}
		},
		onLoad() {
			this.warehouseLists();
			this.getSelectStoreUsers()
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			getSelectStoreUsers() {
				selectStoreUsers().then(res => {
					if (res.code === 200) {
						let data = res.data.map(item => {
							item.text = item.nickName;
							item.value = item.userId;
							item.display = false
							return item;
						})
						this.range = data
					}
				})
			},
			postStoreCheckTask() {
				let checkPeople = []
				let warehouseIdList = [];
				this.warehouseListss.map(item => {
					if (item.display) {
						warehouseIdList.push(item.warehouseId)
					}
				})
				this.range.map(item => {
					if (item.display) {
						checkPeople.push(item.userId)
					}
				})
				const parmes = {
					checkPeopleIds: checkPeople,
					warehouseIdList
				}
				storeCheckTask(parmes).then(res => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '添加成功',
						});
						this.centerId = 0
						uni.navigateTo({
							url: '/pages/tabbarerp/home'
						})
					}
				})
			},
			selectPeople() {
				this.taskShow = true
			},
			close() {
				this.taskShow = false
			},
			addList(e) {
				this.warehouseListss[e].display = !this.warehouseListss[e].display
			},
			addNikeName(e) {
				this.range[e].display = !this.range[e].display
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			warehouseLists() {
				warehouseList({
					parentId: 0
				}).then(res => {
					if (res.code === 200) {
						res.rows.map(item => {
							item.display = false
						})
						this.warehouseListss = res.rows
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.oks {
		margin: 50rpx auto;
		width: 622rpx;
		height: 84rpx;
		background: linear-gradient(90deg, #FF6868 0%, #EA1515 100%);
		border-radius: 13rpx 13rpx 13rpx 11rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 84rpx;
		text-align: center;

	}

	.yunShow-top {
		padding: 26rpx 28rpx 28rpx 28rpx;

		.yunShow-title {
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #232323;
			text-align: center;
		}
	}

	.yunShow-item {
		display: flex;
		align-items: center;
		margin-top: 22rpx;
		flex-direction: column;

		.left {
			font-size: 31rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232323;
		}

		.select {
			flex: 1;
			margin-left: 11.45rpx;
		}

		.input {
			margin-left: 11.45rpx;
			border: 1px solid #e2e2e2;
			border-radius: 11rpx;
		}

		.inputAddress {
			margin-left: 11.45rpx;
			border: 1px solid #e2e2e2;
			border-radius: 11rpx;
			flex: 1;
			padding: 9rpx 11rpx;

			.copy {
				width: 141rpx;
				height: 53rpx;
				background: #ff1a1a;
				border-radius: 27rpx;
				font-size: 27rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				line-height: 53rpx;
				text-align: center;
				margin-top: 17rpx;
			}
		}
	}

	.yunShow-bottom {
		display: flex;

		view {
			width: 267rpx;
			height: 99rpx;
			line-height: 99rpx;
			flex: 1;
			text-align: center;
			border: 1px solid #d8d8d8;
			font-size: 38rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232323;
		}
	}

	.list {
		width: 100%;
		padding: 32rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.red {
			background-color: red !important;
		}

		view:nth-child(2) {
			width: 38rpx;
			height: 38rpx;
			border: 2rpx solid #CECECE;
			border-radius: 38rpx;
		}
	}

	.context {
		padding: 0 28rpx;

		.list {
			padding: 32rpx 0;
			border-bottom: 1px solid #D8D8D8;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.red {
				background-color: red !important;
			}

			view:nth-child(2) {
				width: 38rpx;
				height: 38rpx;
				border: 2rpx solid #CECECE;
				border-radius: 38rpx;
			}
		}
	}
</style>