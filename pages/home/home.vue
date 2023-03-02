<template>
	<view>
		<!--首页-->
		<home :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==0?true:false" @goSell="goSell" v-if="loadOn.home" />

		<!--发现-->
		<!--<find :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==1?true:false" v-if="loadOn.find" />-->
		
		<!--门店-->
		<stores :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==1?true:false" v-if="loadOn.stores" />
		
		<!--卖二手-->
		<sell :barClose="true" :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==2?true:false"
			v-if="loadOn.sell" @closeTap="sellCloseTap" />

		<!--消息-->
		<!-- <news :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==3?true:false" v-if="loadOn.news" /> -->
		<!-- 购物车 -->
		<cart :show="tabID==3?true:false"></cart>
		<!--回收-->
		<!--
		<recycle :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==3?true:false" v-if="loadOn.recycle"/>
		-->
		<!--我的-->
		<my :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==4?true:false" v-if="loadOn.my" />

		<!--底部导航-->
		<footer-tabbar :tabID='tabID' :msgDot='true' @tabTap='tabTap' />
	</view>
</template>

<script>
	//加载组件
	import home from '@/components/common/view/home';
	//import find from '@/components/common/view/find';
	import stores from '@/components/common/view/stores';
	import sell from '@/components/common/view/sell';
	//import recycle from '@/components/common/view/recycle';
	import news from '@/components/common/view/news';
	import my from '@/components/common/view/my';
	import cart from '@/components/common/view/cart';

	//固定组件
	import footerTabbar from '@/components/common/footer/footer-tabbar';
	import {getGlobalInfo} from "@/api/common.js";
	//工具函数
	import _tool from '@/utils/tools.js';
	export default {
		components: {
			home,
			stores,
			//find,
			sell,
			news,
			//recycle, 
			my,
			footerTabbar,
			cart
		},
		data() {
			return {
				loadOn: {
					home: true,
					//find: false,
					stores: false,
					sell: false,
					cart:false,
					// news: false,
					//recycle: false, 
					my: false,
				},
				scrollY: 0,
				scrollBottom: 0,
				tabID: 0,
				tabIndex: 0,
			}
		},
		onPullDownRefresh() {
			console.log(this.tabIndex);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			getGlobalInfo({}).then(res=>{
				uni.setStorageSync('sharebgimg',res.data.posters_image);
			})
		},
		onReady() {
			_tool.setBarColor(true);
		},
		methods: {
			// 去卖货
			goSell(){
				this.tabTap(2)
			},
			tabTap(index) {
				this.tabIndex = this.tabID;
				if (index == 1 && !this.loadOn.stores) {
					this.loadOn.stores = true;
				}
				/*
				if (index == 1 && !this.loadOn.find) {
					this.loadOn.find = true;
				}*/
				if (index == 2 && !this.loadOn.sell) {
					this.loadOn.sell = true;
				}

				if (index == 3 && !this.loadOn.cart) {
					this.loadOn.cart = true;
				}
				/*
				if (index == 3 && !this.loadOn.recycle) {
					this.loadOn.recycle = true;
				}
				*/
				if (index == 4 && !this.loadOn.my) {
					this.loadOn.my = true;
				}
				this.tabID = index;
				//设置颜色
				if (index == 0) {
					_tool.setBarColor(false);
				}
				if (index == 1 || index == 2 || index == 3) {
					_tool.setBarColor(true);
				}
				if (index == 4) {
					_tool.setBarColor(false);
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			sellCloseTap() {
				this.tabTap(this.tabIndex);
			},
		},
		
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			//console.log(e.scrollTop);
		},
		onReachBottom(e) {
			let timestamp = new Date().getTime();
			this.scrollBottom = timestamp;
		},
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "@/uni_modules/colorui/main.css";
	@import "@/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
</style>
