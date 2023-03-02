<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">新机回收报价</block>
		</bar-title>
		<view class="title-box bg-white">
			<view class="time-box">
				<view class="day">
					{{thistime.getFullYear()}}
				</view>
				<view class="day">
					{{thistime.getMonth()+1 < 10 ? '0'+(thistime.getMonth()+1) : thistime.getMonth()+1}}
				</view>
				<view class="day">
					{{thistime.getDate() < 10 ? '0'+thistime.getDate() : thistime.getDate()}}
				</view>
			</view>
			<view class="right-box">
				<view class="wenzi">
					<view class="">全新机回收</view>
					<view class="text-grey">国行原封未激活</view>
				</view>
				<view class="baojia">
					报价
				</view>
			</view>
		</view>
		<view class="zhanwei-hight-box" />
		<view class="padding">
			<view class="h-table margin-top" v-for="(item,index) in dataList" :key="index" @click="gogetprice(item)">
				<view class="name">{{item.name}}</view>
				<view class="h-tr h-tr-3 h-thead">
					<view class="h-td">颜色</view>
					<view class="h-td">存储</view>
					<view class="h-td">价格</view>
				</view>
				<view class="h-tr h-tr-3"  v-for="(item1,index1) in item.children" :key="index1">
					<view class="h-td">{{item1.name_3}}</view>
					<view class="h-td">{{item1.name_2}}</view>
					<view class="h-td">{{item1.money_value}}</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import {
		dayPrice
	} from "@/api/common.js";
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				thistime: new Date(),
				dataList: []
			}
		},
		onLoad() {
			this.getdayPrice();
		},
		onReady() {

		},
		methods: {
			getdayPrice() {
				let that = this;
				dayPrice().then(res => {
					if (res.code == 1) {
						that.dataList = res.data;
					}
				})
			},
			gogetprice(data){
				uni.navigateTo({
					url: '../recycling/recycling-new?id=' + data.id +'&cate_id='+data.cate_id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.zhanwei-hight-box {
		height: 110rpx;
	}

	.title-box {
		position: fixed;
		height: 110rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		box-shadow: 0px 0px 10rpx 0px rgba(136, 136, 136, 0.5);

		.time-box {
			display: flex;
			justify-content: space-around;
			margin: 20rpx 0;
			width: 50%;

			.day {
				padding: 6rpx 15rpx;
				font-size: 48rpx;
				font-weight: bold;
				border-radius: 20rpx;
				box-shadow: 0px 0px 6rpx 0px rgba(136, 136, 136, 0.6);
			}

			.day:nth-child(1) {
				color: #EE5873;
			}

			.day:nth-child(2) {
				color: #3B629C;
			}

			.day:nth-child(3) {
				color: #3B999B;
			}
		}

		.right-box {
			width: 50%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20rpx;

			.wenzi {}

			.baojia {
				justify-content: center;
				display: flex;
				font-size: 50rpx;
			}
		}
	}

	.h-table {

		/* 行 */
		.h-tr {
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: stretch;
			align-content: center;

			border-color: #ccc;
			border-style: solid;
			border-width: 0;
			border-top-width: 1px;
			border-left-width: 1px;
			border-bottom-width: 1px;
			color: #333;

			/* 等比分列，1-8列 */
			@for $i from 1 through 8 {
				&-#{$i} {
					>.h-td {
						width: (100% / $i);
					}
				}
			}

			+.h-tr {
				border-top-style: none;
			}
		}

		/* 单元格 */
		.name {
			text-align: center;
			border-top: 1px solid #ccc;
			border-right: 1px solid #ccc;
			border-left: 1px solid #ccc;
			padding: 10rpx;
			font-size: 28rpx;
		}

		.h-td {
			box-sizing: border-box;
			padding: 3px;
			word-break: break-all;
			border-color: #ccc;
			border-style: solid;
			border-width: 0;
			border-right-width: 1px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			align-content: center;
			min-height: 50rpx;
			font-size: 20rpx;

			/* 跨列 */
			&-colspan {
				flex-grow: 1;
				width: 0;
			}

			/* 内容顶部对齐 */
			&-top {
				align-items: flex-start;
				align-content: flex-start;
			}

			/* 内容底部对齐 */
			&-bottom {
				align-items: flex-end;
				align-content: flex-end;
			}

			/* 内容左边对齐 */
			&-left {
				justify-content: flex-start;
			}

			/* 内容右边对齐 */
			&-right {
				justify-content: flex-end;
			}
		}

		/* 表头 */
		.h-thead {
			font-size: 26rpx;
			font-weight: bold;
			background-color: #e6e6e6;
		}

		/* 表格虚线 */
		&-dashed {
			.h-tr {
				border-top-style: dashed;
				border-left-style: dashed;
				border-bottom-style: dashed;
			}

			.h-td {
				border-right-style: dashed;
			}
		}

		/* 表格主题 Map，颜色摘自 Bootstrap */
		$theme-table:(primary:(color:#fff,
				bgColor:#337ab7,
				border:#2e6da4),
			success:(color:#fff,
				bgColor:#5cb85c,
				border:#4cae4c),
			info:(color:#fff,
				bgColor:#5bc0de,
				border:#46b8da),
			warning:(color:#fff,
				bgColor:#f0ad4e,
				border:#eea236),
			danger:(color:#fff,
				bgColor:#d9534f,
				border:#d43f3a));

		/* 生成主题代码 */
		$theme-table-keys:map-keys($theme-table);

		@each $k in $theme-table-keys {
			$item: map-get($theme-table, $k);

			&-#{$k} {
				.h-tr {
					border-top-color: map-get($item, border);
					border-left-color: map-get($item, border);
					border-bottom-color: map-get($item, border);
					color: map-get($item, bgColor);
				}

				.h-td {
					border-right-color: map-get($item, border);

				}

				.h-thead {
					background-color: map-get($item, bgColor);
					color: map-get($item, color);
				}
			}
		}
	}
</style>
