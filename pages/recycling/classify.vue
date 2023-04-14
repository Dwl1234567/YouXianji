<template>
	<view class="sell-box">
		<view class="head-box">
			<!--标题栏-->
			<!-- 搜索型号 和未上架机型-->
			<view class="search-box flex">
				<view class="cu-bar search">
					<view class="action" @tap="BackPage">
						<text class="cuIcon-back" />
					</view>
					<view class="search-form round">
						<text class="cuIcon-search"/>
						<input @input="searchInput" :value="keyword" :adjust-position="false" type="text" placeholder="您想要回收的产品" confirm-type="search"/>
						<text class="cuIcon-close close-icon" v-if="search_close" @tap="closeInput"/>
					</view>
				</view>
				<view class="diybtn margin-tb-sm text-center" @tap="divFormTap">
					<view class="cu-btn round bg-red">
						未上架机型点这里
					</view>
				</view>
			</view>
			<!-- 搜索联想 -->
			<view class="search-warp" v-if="showWarp">
				<scroll-view scroll-y class="item-container">
					<view class="thumb-box" v-for="(item,index) in seachList" :key="index">
						<view class="item-active" @tap="goodsclick(item)">
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<!-- 根类 -->
			<view class="rootcate-box">
				<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item text-bold text-lg" :class="index==topCur?'text-red cur':''" v-for="(item,index) in dataListArr" :key="index" @tap="rootcateclick(item.classificationId,index)" :data-id="item.classificationId,index">
						{{item.classificationName}} 
						<view class="put"></view>
					</view>
			</scroll-view>
			</view>
		</view>
		
		<!--占位的-->
		<!--<view class="seat-height"/>-->
		
		<view class="VerticalBox" v-if="goodsDataArr">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				style="height:calc(100vh - 120rpx)">
				<view class="cu-item" :class="index==tabCur?'text-red cur':''"
					v-for="(item,index) in goodsDataArr" :key="index" @tap="TabSelect(item.id,index)"
					:data-id="index">
					{{item.brandName}}
				</view>
				<view style="height: 300rpx;"></view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 120rpx)">
				<!-- @scroll="VerticalMain" -->
				<!-- :scroll-into-view="'main-'+mainCur" -->
				<view class="categoods-box">
					<u-grid :border="false">
						<u-grid-item bgColor="#ffffff" :customStyle="{padding:20+'rpx'}"
							v-for="(baseListItem,baseListIndex) in itemArr"
							:key="baseListIndex"  @click="goodsclick(baseListItem)" v-if="goodsDataArr[tabCur]">
							<view class="categoods-main">
								<image class="img" :src=" http + baseListItem.photo" mode="aspectFill"></image>
								<view class="text" >{{baseListItem.modelName}}</view>
								<!-- :style="{height:baseListItem.name.length > 20 ? '80rpx':'50rpx'}" -->
							</view>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="padding-lr padding-bottom">
					<!-- <u-divider text="没有更多了" :hairline="true"></u-divider> -->
				</view>
				<view style="height: 200rpx;"></view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		HTTP_REQUEST_IMAGEURL
	} from '@/config/app';
	import {
		Godscategory,
		GodsgoodsList,
		searchRecycleData
	} from "@/api/common.js";
	import {
		getSeries,
		getAllClassification
	} from "@/api/retrieve.js";
	import _tool from '@/utils/tools.js';	//工具函数
	
	export default {
		components: { 
		},
		data() {
			return {
				http: '',
				topCur: 0, //顶部选择下标
				scrollLeft: 0,
				tabCur: 0, //左边选择下标
				mainCur: 0, //右边下标
				verticalNavTop: 0,
				load: true,
				showWarp: false,
				keyword: '',
				search_close: false,
				twoId:0,
				dataListArr:[],
				goodsDataArr:[],
				seachList:[],
				itemArr:[]
			}
		},
		onLoad(option) {
			this.http = HTTP_REQUEST_IMAGEURL
			this.type = option.type;
		},
		onReady() {
			
		},
		onShow() {
			
		},
		mounted() {
			this.getAllClassification()
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			
			// 获取分类
			getAllClassification(){
			    getAllClassification().then(res => {
					this.dataListArr = res.data
					this.getSeries(res.data[0].classificationId);
				})
			},
			BackPage() {
				this.$api.navigateBack();
			},
			searchRecycleDataFuc(key = '') {
				
				let paramsData = {
					name: key
				}
				searchRecycleData(paramsData).then(res => {
					if (res.code == 1) {
						this.seachList = res.data;
					}
				})
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
				//触底加载
			},
			backTap() {
				//console.log('点击返回');
				uni.navigateBack();
			},
			closeTap() {
				this.$emit('closeTap');
			},
			//搜索
			searchInput(event) {
				let value = event.detail.value;
				this.keyword = value;
				if(value) {
					this.search_close = true;
					this.showWarp = true;	//打开联想框
					this.searchRecycleDataFuc(value);
				} else {
					this.search_close = false;
					this.showWarp = false;	//关闭联想框
				}
				console.log('回调搜索联想'+value);
			},
			closeInput() {
				this.keyword = '';
				this.search_close = false;
				this.showWarp = false;	//关闭联想框
			},
			//下拉刷新被触发
			onRefresh() {
				
				
			},
			// 无图片替换
			imageError(index){
				this.goodsDataArr[index]['imgUrl'] = 'https://mpb.shousifang.com/uploads/recying/goods/nopic.jpg'; //默认图片路径  
			},
			getSeries(id){
				let that = this;
				getSeries(id).then(res=>{
					let data  = res.data;
					if(res.code  == 200){
						// console.log(data[0].series)
						if (data.length !== 0){
							this.itemArr = data[0].modelList
						}
						that.goodsDataArr =  data;
					}
					
				})
			},
			rootcateclick(id,index) {
				this.topCur = index;
				this.tabCur = 0;
				this.twoId = 0;
				this.getSeries(id);
				this.scrollLeft = index * 60;
			},
			goodsclick(value) {
				// console.log(value);
				let type = this.type;
				uni.navigateTo({
					url: '/pages/recycling/recycling-new?id=' + value.modelId +'&cate_id='+value.cate_id +'&type='+type
				})
			},
			TabSelect(id,index) {
				this.tabCur = index;
				this.twoId = id;
				this.itemArr = this.goodsDataArr[index].modelList;
			},
			VerticalMain(e) {
				return false;
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						return false
					}
				}
			},
			divFormTap() {
				uni.navigateTo({
					url: "/pages/recycling/diyform"
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sell-box {
		
		
		/* #ifndef MP */
		//top: calc(var(--status-bar-height) + 110.99rpx);
		/* #endif */
		position: relative;
		min-height: 100vh;
		z-index: 100;
		width: 100%;
		// display: none;
		.head-box{
			position: fixed;
			//top: 0;
			z-index: 9999;
			width: 100%;
			/* #ifdef APP-PLUS */
			top: var(--status-bar-height);
			/* #endif */
		}
		//搜索条
		.search-box {
			background: #FAFAFA;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			//padding: calc(var(--status-bar-height) + 9.09rpx) 9.09rpx;	//兼容App和H5
			//padding: 10rpx 20rpx;
			height: 120rpx;
			.back{
				margin-left: 30rpx;
				font-size: 30rpx;
			}
			.back > uni-text[class*="cuIcon-"]{
				font-size: 36rpx;
				margin-left: -0.3em;
				margin-right: 0.3em;
			}
			.search {
				width: 100%;
				padding:0;
				.search-form{
					margin:0;
					background-color: #f1f1f1;
				}
				.u-search__content__input--placeholder{
					font-size: 24rpx;
				}
			}
			.diybtn{
				font-weight: bold;
				padding:0 15rpx;
				.cu-btn{
					font-size: 24rpx;
					height: 64rpx;
					line-height: 64rpx;
					padding:0 20rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			.close {
				margin-right:30rpx;
			}
			.close > uni-text[class*="cuIcon-"]{
				font-size: 36rpx;
			}
		}
		//搜索框内容文字大小
		.uni-input-input{
			font-size: 20rpx;
		}
		//搜索联想框
		.search-warp {
			display: flex;
			overflow: hidden;
			background-color: #FFFFFF;
			position: absolute;
			z-index: 101;
			top: calc(var(--status-bar-height) + 121rpx);
			left: 0;
			width: 100%;
			.item-container {
				display: flex;
				flex-direction: column;
				flex: 1;
				padding: 15rpx 0;
				// height: 200rpx;
				.thumb-box {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					height: 60rpx;
					width: 100%;
					padding: 0 20rpx;
					align-items: center;
					font-size: 26rpx;
					.item-active {
						width: 100%;
						color: #0081FF;
					}
				}
			}
		}
		//占位条
		.seat-height {
			width: 100%;
			
			/* #ifndef MP */
			height: calc(var(--status-bar-height) - 15.99rpx);
			/* #endif */
			
			/* #ifdef MP */
			height: calc(var(--status-bar-height) + 110.99rpx);
			/* #endif */
		}
		//顶部一级菜单
		.rootcate-box {
			.nav{
				.cu-item{
					width:25%;
					margin:unset;
					text-align: center;
				}
			}
		}
		//内容盒子
		.VerticalBox {
			//padding: 210rpx 0 0 0;
			display: flex;
			//position: fixed;
			width: 100%;
			padding-top: calc(var(--status-bar-height) + 210rpx);
			//左边菜单
			.VerticalNav.nav {
				width: 160rpx;
				white-space: initial;
			}
			
			.VerticalNav.nav .cu-item {
				width: 100%;
				text-align: center;
				background-color: #fff;
				margin: 0;
				border: none;
				height: auto;
				padding: 40rpx 10rpx;
				line-height: 30rpx;
				position: relative;
				font-size: 30rpx;
			}
			
			.VerticalNav.nav .cu-item.cur {
				background-color: #f1f1f1;
			}
			
			.VerticalNav.nav .cu-item.cur::after {
				content: "";
				width: 8rpx;
				height: auto;
				border-radius: 10rpx 0 0 10rpx;
				position: absolute;
				background-color: currentColor;
				top: 0;
				right: 0rpx;
				bottom: 0;
				margin: auto;
			}
			//右边品牌
			.VerticalMain {
				background-color: #f1f1f1;
				flex: 1;
				.categoods-box {
					background-color: #FFFFFF;
					margin: 10rpx;
				}
				
				.categoods-main {
					text-align: center;
				
					.img {
						width: 166rpx;
						height: 166rpx;
					}
				
					.text {
						color: #999999;
						font-size: 24rpx;
						// height: 50rpx;
					}
				}
			}
		}
	}
	.sell-box.show {
		display: block;
	}
</style>
