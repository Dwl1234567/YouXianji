<template>
	<view>
		<view class="margin bg-white radius-4" v-for="(item,index) in dataList" :key="index" @click="godetail(index)">
			<view class="cu-list menu-avatar">
				<view v-for="(item1,index1) in item" :key="index1" class="cu-item arrow" :class="item1.sender_identity == '1'?'kefu':''">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ item1.avatar +')'}]">
					</view>
					<view class="content padding-tb-sm">
						<view class="text-grey">
							{{item1.name}}
							<view class="cu-tag round bg-red sm" v-if="item1.sender_identity == '0'">客户</view>
							<view class="cu-tag round bg-green sm" v-else>客服</view>
						</view>
						<view class="text-gray text-sm flex">
							<rich-text :nodes="item1.message"></rich-text>
						</view>
						<view class="text-grey text-xs">{{item1.createtime}}</view>
					</view>
					<view class="action">
						<view class="cu-tag round bg-grey sm" v-if="item1.status == 0">未读</view>
						<view class="cu-tag round bg-grey sm" v-else>已读</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		erpchatlist
	} from "@/api/erpapi.js"
	export default {
		data() {
			return {
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
				ifBottomRefresh: false,
			};
		},
		onLoad() {
			//加载虚拟数据
			this.$nextTick(() => {
				uni.startPullDownRefresh({})
			})
		},
		onPullDownRefresh() {
			this.queryInfo.page = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.page += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			// 获取列表
			getDataList() {
				let that = this;
				let paramsData = {
					...that.queryInfo
				}
				erpchatlist(paramsData).then(res => {
						let data = res.data.list;
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
			},
			godetail(index){
				uni.navigateTo({
					url:'/pages/erp/chat/view?id='+index
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		padding-bottom: 100upx;
	}

	.cu-list.menu-avatar>.cu-item.kefu {
		.cu-avatar {
			left: unset;
			right: 20rpx;
		}

		.content {
			left: 30rpx !important;
		}

		.action {
			right: 140rpx;
			position: absolute;
		}
	}
</style>
