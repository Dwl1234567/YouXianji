<template>
	<view>
		<!-- v-for="(item,index) in orderList" :key="index" -->
		<view class="box_2 flex-col">
			<view class="box_3 flex-col">
				<view class="group_3 flex-row">
					<view class="image-text_1 flex-row justify-between">
						<text class="text-group_1">优闲集寻他店</text>
					</view>
					<image class="icon_2" referrerpolicy="no-referrer"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng76a69ec8d984edf3b54d04b77768e328ebb05626d86c986f26777b8490007c8e" />
					<!-- <text class="text_3">等待买家付款</text> -->
				</view>
				<view class="group_4 flex-row justify-between">
					<view class="image-text_2 flex-row justify-between">
						<view class="group_5 flex-col"></view>
						<view class="text-group_2 flex-col">
							<text class="text_4">iPhone&nbsp;14&nbsp;por&nbsp;Max</text>
							<text class="text_5">红色+256G</text>
							<text class="text_6">¥9800</text>
						</view>
					</view>
					<text class="text_7">X1</text>
				</view>
				<view class="group_6 flex-col"></view>
				<view class="text-wrapper_1 flex-row">
					<text class="text_8"></text>
					<text class="text_9">需付款</text>
					<text class="text_10">¥</text>
					<text class="text_11">2199</text>
				</view>
				<view class="group_7 flex-row justify-between">
					<button class="button_1 flex-col" @click="onClick_1">
						<text class="text_12">取消订单</text>
					</button>
					<button class="button_2 flex-col" @click="onClick_2">
						<text class="text_13">继续付款</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [],
			};
		},
		methods: {},
	};
</script>

<style>
	@import '/static/common.css';

	.box_2 {
		background-color: rgba(240, 240, 240, 1);
		padding: 13px;
	}

	.box_3 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 6px;
		padding: 13px 0 22px 0;
		position: relative;
	}

	.group_3 {
		margin: 0 15px 0 9px;
	}

	.image-text_1 {
		// width: 109px;
	}

	.single-avatar_1 {
		border-radius: 50%;
		background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/47f219e4195e4c6d8136596bc3b30d58_mergeImage.png);
		width: 26px;
		height: 26px;
		border: 1px solid rgba(151, 151, 151, 1);
	}

	.text-group_1 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin-top: 7px;
	}

	.icon_2 {
		width: 5px;
		height: 8px;
		margin: 9px 0 9px 5px;
	}

	.text_3 {
		position: absolute;
		right: 28rpx;
		overflow-wrap: break-word;
		color: rgba(255, 6, 6, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 7px 0 0 145px;
	}

	.group_4 {
		margin: 10px 15px 0 9px;
	}

	.image-text_2 {
		margin-left: 15rpx;
	}

	.group_5 {
		border-radius: 6px;
		background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/8d27d8a9bbce490abb4f5b491e1ac801_mergeImage.png);
		width: 79px;
		height: 79px;
	}

	.text-group_2 {
		margin-left: 15rpx;
	}

	.text_4 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 15px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 15px;
	}

	.text_5 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 66px 0 0;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 18px;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 18px;
		margin: 25px 79px 0 0;
	}

	.text_7 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin-top: 66px;
	}

	.group_6 {
		background-color: rgba(216, 216, 216, 1);
		width: 366px;
		height: 1px;
		margin-top: 16px;
	}

	.text-wrapper_1 {
		margin: 5px 15px 0 9px;
		justify-content: flex-end;
	}

	.text_8 {
		overflow-wrap: break-word;
		color: rgba(255, 6, 6, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin-top: 7px;
	}

	.text_9 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 13px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 0 0 130px;
	}

	.text_10 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 16px;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 16px;
		margin: 7px 0 0 3px;
	}

	.text_11 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 25px;
		font-family: PingFangSC-Semibold;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
		line-height: 25px;
	}

	.group_7 {
		margin-right: 28rpx;
		margin-top: 17rpx;
		justify-content: flex-end;

		button {
			margin-left: 28rpx;
		}
	}

	.button_1 {
		border-radius: 15px;
		border: 0.5px solid rgba(151, 151, 151, 1);
		padding: 5px 10px 4px 11px;
	}

	.text_12 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 18px;
	}

	.button_2 {
		margin-left: 15rpx;
		background-image: linear-gradient(90deg, rgba(255, 104, 104, 1) 0, rgba(234, 21, 21, 1) 100%);
		border-radius: 15px;
		padding: 5px 9px 4px 12px;
	}

	.text_13 {
		overflow-wrap: break-word;
		color: rgba(255, 255, 255, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 18px;
	}
</style>