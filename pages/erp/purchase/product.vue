<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">采购产品列表</block>
		</bar-title> -->
		
		<view class="bg-white">
			<view class="cu-form-group">
				<view class="title">标题</view>
				<view class="">
					{{goodsinfo.title}}
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">序列号/IMEI</view>
				<view class="">
					{{goodsinfo.sn}}
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class='action'>
					<text class='cuIcon-title text-red'></text>
					<text class="title">机器图片</text>
					<text class="margin-left-xs text-sm"></text>
				</view>
			</view>
			<view class="pic padding flex justify-between align-center">
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[0] ?  addpicicon : 'url('+goodsinfo.images[0]+')' }">
					正面
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[1] ?  addpicicon : 'url('+goodsinfo.images[1]+')' }">
					背面
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[2] ?  addpicicon : 'url('+goodsinfo.images[2]+')' }">
					顶面
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[3] ?  addpicicon : 'url('+goodsinfo.images[3]+')' }">
					底面
				</view>
			</view>
			<view class="pic padding flex justify-between align-center">
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[4] ?  addpicicon : 'url('+goodsinfo.images[4]+')' }">
					左侧
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[5] ?  addpicicon : 'url('+goodsinfo.images[5]+')' }">
					右侧
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[6] ?  addpicicon : 'url('+goodsinfo.images[6]+')' }">
					摄像头
				</view>
				<view class='cu-avatar xl radius' :style="{'background-image': !goodsinfo.images[7] ?  addpicicon : 'url('+goodsinfo.images[7]+')' }">
					其他
				</view>
			</view>
			<view class="flex-sub text-center">
				<view class="tips padding-sm light bg-red">
					<text class="text-lg">回收指导价：</text>
					<text class="text-price text-lg">100</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">回收价</view>
				<view class="">
					<text class="margin-right-xs">初始:{{goodsinfo.money}}</text>
					+
					<text class="margin-lr-xs">整备:{{goodsinfo.costmoney}}</text>
					=
					<text class="margin-left-xs">最终:{{goodsinfo.cost_price}}</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">调拨价</view>
				<view class="">{{goodsinfo.peer_price}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">销售价</view>
				<view class="">{{goodsinfo.sales_price}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">成色</view>
				<view class="">{{goodsinfo.colourname}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">仓库</view>
				<view class="">
					{{goodsinfo.warehouse.name}}
					<text class="text-lightgrey">({{goodsinfo.warehouse.number}})</text>
					<text class="text-red margin-lr-xs">-</text>
					{{goodsinfo.partition.name}}
					<text class="text-lightgrey">({{goodsinfo.partition.coding}})</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">SKU</view>
				<view class="">
					{{goodsinfo.categoryname}}
					<text class="text-red margin-lr-xs">-</text>
					{{goodsinfo.brandname}}
					<text class="text-red margin-lr-xs">-</text>
					{{goodsinfo.seriesname}}
					<text class="text-red margin-lr-xs">-</text>
					{{goodsinfo.machinename}}
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class='action'>
					<text class='cuIcon-title text-red'></text>
					<text class="title">已选属性</text>
					<text class="margin-left-xs text-sm"></text>
				</view>
			</view>
			<view class="bg-white padding-lr">
				<view class="cu-list grid col-3 no-border padding-lr-sm">
					<view v-for="(item,index) in goodsvalue" :key="index" @tap="tabSelect"  :data-id="index">
						<view class="cu-item radius-2" :class="index==TabKey?'bg-red cur':''">
							<text class='text-bold' :class="index==TabKey?'text-white':'text-red'">{{item.title}}</text>
						</view>
					</view>
					<view class="margin-top-sm" style="width:100%;">
						<view class="h-table">
							<view class="h-tr h-tr-2 h-thead">
								<view class="h-td">属性</view>
								<view class="h-td">属性值</view>
							</view>
							<view class="h-tr h-tr-2" v-for="(item1,index1) in goodsvalue[TabKey].list" :key="index1">
								<view class="h-td">
									<view class="text-bold">
										{{item1.name}}
									</view>
								</view>
								<view class="h-td">
									{{item1.value}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">是否直售</view>
				是
			</view>
		</view>
		

	</view>
</template>

<script>
	import {
		erppurchaseproductdata
	} from "@/api/erpapi.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh:false,
				addpicicon: "none",
				productid: '',
				goodsinfo: '',
				TabKey:'base',
			}
		},
		onLoad(options) {
			this.productid = options.Id;
		},
		created() {
			this.getData();
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			
			getData() {
				let queryparams = {
					productid: this.productid	
				}
				erppurchaseproductdata(queryparams).then(res => {
					this.goodsinfo = res.data;
					this.goodsvalue = res.data.value
					console.log(goodsvalue)
					//this.dataList = res.data;
				})
			},
			tabSelect(e) {
				console.log(e.currentTarget);
				this.TabKey = e.currentTarget.dataset.id;
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	.tips{
	  justify-content: space-between;
	  display: flex;
	  text{
		  text-align: justify;
	  }
	}
	.cu-card.article>.cu-item {
		margin-top: 0;
		padding-bottom:0;
		.content{
			uni-image{
				width:6.8em;
				height:6.8em;
			}
			.text-content{
				height: 5.4em;
			}
		}
	}
	.border{
		height:2.4em;
		line-height:2.4em;
		border:1px solid #e1e1e1;
	}
	
	.cu-avatar {
		background-color: #ccc;
	}
	
	.translate45 {
		transform: rotate(45deg);
		transition-duration: 1s;
	}
	
	.check-list-box {
		overflow: hidden;
	
		.item {
			position: relative;
			display: inline-block;
			background-color: #d7f0db !important;
			color: #39b54a !important;
			width: auto;
			text-align: center;
			font-size: 26rpx;
			padding: 10rpx 10rpx;
			margin-top: 10rpx;
			margin-right: 10rpx;
		}
	}
	
	.hight-view {
		height: 290rpx;
	}
	
	.orderview-footer-fixed {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		box-shadow: 0 -3.63rpx 10.9rpx 0 #eaeaea;
		padding: 18.18rpx 27.27rpx;
		text-align: right;
	
		.cu-btn {
			margin-left: 10px;
		}
	}
	.h-table .h-td{
		display:inline-block;
		text-align: center;
	}
	.cu-bar .action .cuIcon-title{
		font-size:80rpx;
		line-height: 80rpx;
		margin-right:0 !important;
	}
	.cu-bar .title,
	.cu-form-group .title {
		color:#111f3a;
		font-weight: bold;
		white-space: nowrap;
	}
	.pic{background-color: #fff;}
	.pic .cu-avatar{
		border-radius: 30rpx;
		background-color: #f2f1f6;
		color:#afafb0;
		font-size:1.2em;
	}
</style>
