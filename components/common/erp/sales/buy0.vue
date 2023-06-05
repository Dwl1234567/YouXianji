<template>

	<view class="margin-top-xs cu-list card-menu">
		<view class="bg-white arrow margin-bottom-xs padding-tb-xs radius-4" v-for="(item,index) in list_data" :key="index"
			style="border: 2rpx solid #F0F0F0;">

			<view class="group_3 flex-col">
				<view class="text-wrapper_1 flex-row justify-between">
					<text class="text_7">时间:{{item.updateTime}}</text>
				</view>
				<view class="section_1 flex-row">
					<view class=""></view>
					<image :src="$httpImage + item.modelPhoto" mode="aspectFit" class="cu-avatar lg radius box_5 flex-col">
					</image>
					<view class="text-wrapper_2 flex-col">
						<text class="text_8">{{item.modelName}}</text>
						<!-- <text class="text_9">{{item.label}}</text> -->
						<text class="text_10">序列号:{{item.deviceNo}}</text>
						<text class="text_11">销售价:{{item.sellPrice}}元</text>
						<text class="text_11">回收价:{{item.recyclePrice}}元</text>
					</view>
				</view>
				<text class="text_13">客户：{{item.clientName}}</text>
				<text class="text_13">回收人：{{item.recyclePeopleName}}</text>
				<text class="text_13">备注：{{item.remark}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'sell0',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			listTap(data) {
				console.log(data)
				/*
				this.$emit('listTap', {
					data
				});*/
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/common.css';

	.cu-list.card-menu {
		margin-right: 0;
		margin-left: 0;
	}

	.card-menu .goodsimg {
		width: 150rpx;
		height: 150rpx;
		background-size: 100% 100%;
	}

	.button {
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-end;

		view {
			min-width: 143rpx;
			height: 55rpx;
			border-radius: 29rpx;
			border: 1px solid #979797;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #101010;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.receipt {
			padding: 9rpx 17rpx;
			background: linear-gradient(90deg, #ff6868 0%, #ea1515 100%);
			margin-left: 26rpx;
			color: #ffffff !important;
			border: none;
			font-size: 25rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
		}
	}

	.bottomView {
		position: fixed;
		bottom: 0px;
		width: 750rpx;
		height: 191rpx;
		background: #ffffff;
		padding: 29rpx 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.transform {
		// transform: translateX(100rpx);
		display: none;
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

	.goXiu {
		width: 313rpx;
		height: 82rpx;
		background: #ff1a1a;
		border-radius: 42rpx;
		text-align: center;
		line-height: 82rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
	}

	.transformRight {
		transform: translateX(-100rpx);
	}

	.radio {
		width: 38rpx;
		height: 38rpx;
		border-radius: 38rpx;
		border: 2rpx solid #cecece;
	}

	.radio-red {
		background-color: #ff3a31;
	}

	.tips {
		justify-content: space-between;
		display: flex;

		text {
			text-align: justify;
		}
	}

	.cu-card.article>.cu-item {
		.title {
			padding: 0 0 10rpx 0;
		}

		.content {
			uni-image {
				width: 5.4em;
				height: 5.4em;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.process-box {
		width: 100%;
		padding: 0 20rpx;

		// height: 300rpx;
		.scroll-Y {
			height: auto;
			max-height: 700rpx;
		}
	}

	.hight-view {
		/* #ifndef APP-PLUS */
		height: 280rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 320rpx;
		/* #endif */
	}

	.recy-item {
		width: 100%;
		position: relative;
		padding-bottom: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #eeeeee;

		.title {
			width: 20%;
			text-align: left;
			font-size: 24rpx;
			color: #555555;
			position: absolute;
			left: 0;
		}

		.check-list-box {
			white-space: nowrap;
			overflow: hidden;
			padding-left: 20%;

			.active {
				color: #ffffff !important;
				background-color: #f03 !important;
			}

			.item {
				position: relative;
				display: inline-block;
				background-color: #eeeeee;
				color: #333333;
				width: auto;
				text-align: center;
				font-size: 24rpx;
				padding: 10rpx 20rpx;
				margin-right: 10rpx;

				.tipsbox {
					position: absolute;
					right: 0;
					top: 0;
					width: 88rpx;
					height: 88rpx;
				}

				.righticon {
					width: 80rpx;
					height: 80rpx;
					margin-top: 4rpx;
					margin-right: 4rpx;
					border-radius: 10rpx;
				}

				.tipsticon {
					width: 36rpx;
					height: 36rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	.cu-modal {
		z-index: 999;
	}

	.cu-form-group {
		min-height: 45px;
	}

	.group_3 {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 6px;
		padding: 14px 11px 22px 9px;
		width: 95vw;
	}

	.text-wrapper_1 {
		width: 348px;
	}

	.text_6 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 12px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.text_7 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 12px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
	}

	.section_1 {
		position: relative;
		margin: 9px 0px 0 0;
	}

	.box_5 {
		border-radius: 6px;
		// background-image: url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/4240095d9d5a4c4b9180ad3ce22071cd_mergeImage.png);
		width: 79px;
		height: 79px;
		margin-top: 5px;
	}

	.text-wrapper_2 {
		margin: 5px 0 0 8px;
	}

	.text_8 {
		overflow-wrap: break-word;
		color: rgba(16, 16, 16, 1);
		font-size: 15px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 15px;
	}

	.text_9 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 67px 0 0;
	}

	.text_10 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 8px 31px 0 0;
	}

	.text_11 {
		overflow-wrap: break-word;
		color: rgba(142, 142, 142, 1);
		font-size: 13px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 13px;
		margin: 9px 29px 0 0;
	}

	.tag_1 {
		background-color: rgba(235, 246, 255, 1);
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.tag_33 {
		background-color: #fff4e5;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_33 {
		overflow-wrap: break-word;
		color: #e29140;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_44 {
		background-color: #ebf6ff;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_44 {
		overflow-wrap: break-word;
		color: #1190d6;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_55 {
		background-color: #ffef95;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_55 {
		overflow-wrap: break-word;
		color: #bc890e;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_66 {
		background-color: #ef2727;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_66 {
		overflow-wrap: break-word;
		color: #ffffff;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_77 {
		background-color: #e5fcf1;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_77 {
		overflow-wrap: break-word;
		color: #00c082;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.tag_88 {
		background-color: #ffdbdb;
		border-radius: 10px;
		margin: 0 0 64px 42px;
		padding: 2px 20px 1px 19px;
		position: absolute;
		right: 0;
	}

	.text_88 {
		overflow-wrap: break-word;
		color: #f76540;
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.text_12 {
		overflow-wrap: break-word;
		color: rgba(17, 144, 214, 1);
		font-size: 12px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		text-align: left;
		white-space: nowrap;
		line-height: 17px;
	}

	.text_13 {
		overflow-wrap: break-word;
		color: rgba(35, 35, 35, 1);
		font-size: 14px;
		font-weight: NaN;
		text-align: left;
		white-space: nowrap;
		line-height: 14px;
		margin: 20px 250px 0 0;
	}
</style>