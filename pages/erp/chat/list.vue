<template>
	<view>
		<view class="bg-white box" v-for="(item,index) in messagesUserList" :key="index" @click="godetail(item)"
			style="border-bottom: 1px solid #D8D8D8;">
			<view class="box-item">
				<image :src="$httpImage + item.avatar"></image>
				<view class="box-text">
					<view>{{item.nickName}}</view>
					<view>{{item.context}}</view>
				</view>

			</view>

		</view>
	</view>
	<!-- 下拉加载提示 -->
	</view>
</template>

<script>
	import {
		erpchatlist
	} from "@/api/erpapi.js"
	export default {
		data() {
			return {
				messagesUserList: [],
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
				ifBottomRefresh: true,
			};
		},
		onLoad() {
			//加载虚拟数据
		},
		onPullDownRefresh() {},
		onReachBottom() {},
		onShow() {
			// console.log(123)
			// this.sendFirst();
			let that = this
			that.sendFirst();
			uni.onSocketMessage(function(res) {
				let msg = JSON.parse(res.data)
				if (msg.code === 200) {
					if (msg.data && msg.data.messageType == 4) {
						that.messagesUserList = []
						msg.data.messagesUserList.map(item => {
							that.messagesUserList.push(item)
						})
					}
				}
			})
		},
		methods: {
			// 初始化获取消息
			sendFirst() {
				const message = {
					messageType: '5',
					storeId: uni.getStorageSync('userinfo').storeId,
					senderId: uni.getStorageSync('userinfo').userId
				}
				console.log(222)
				uni.sendSocketMessage({
					data: JSON.stringify(message)
				});
			},
			godetail(index) {
				uni.navigateTo({
					url: '/pages/erp/chat/chatAdmin?senderId=' + index.senderId
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		padding-bottom: 100upx;
	}

	.box {}

	.box-item {
		padding: 36rpx 28rpx;
		display: flex;
		align-items: center;

		image {
			width: 97rpx;
			height: 97rpx;
			border-radius: 97rpx;
			margin-right: 30rpx
		}

		.box-text {
			view:nth-child(1) {
				font-size: 31rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #101010;
				line-height: 42rpx;
			}

			view:nth-child(2) {
				font-size: 25rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #8E8E8E;
				line-height: 34rpx;
			}
		}
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