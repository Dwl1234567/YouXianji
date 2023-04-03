<template>
	<view>
		<view class="bar-search-title-box">
			<view class="cu-bar fixed no-shadow bg-white">
				<view class="action" @tap="BackPage">
					<text class=" iconfont icon-xiangyou"/>
				</view>
				<view class="content search" @tap="searchTap">
					<view class="search-form round">
						<text class="cuIcon-search"/>
						<text class="margin-left-xs">输入您正在找的宝贝</text>
					</view>
				</view>
			</view>
			<!--占位的-->
			<view class="seat-height"></view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
				<block v-for="(item,index) in list" :key="index">
					<view class="cu-item" :class="index==tabCur?'text-red cur':''" @tap="TabSelect" :data-key="item.id" :data-id="index">
						<view :class="index==tabCur?'text-black text-bold':''">{{item.name}}</view>
					</view>
				</block>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<block v-for="(item,index) in list" :key="index">
					<view class="padding-top padding-lr" :id="'main-'+index">
						
						
						<!--标题栏-->
						<block v-for="(items,indexs) in item.serieslist" :key="indexs">
							<view class="cu-bar bg-white">
								<view class="action">
									<text class="cuIcon-title text-red"/>
									<text>{{items.name}}</text>
								</view>
							</view>
							<view class="grid-icon-box">
								<view class="cu-list grid col-3 no-border">
									<block v-for="(itemss,indexss) in items.machine_list" :key="indexss">
										<view class="cu-item" @tap="sortlistTap(items.id,itemss.id,items.brand_id)">
											<view class="grid-icon">
												<image class="icon" :src="itemss.image" lazy-load mode="widthFix"/>
											</view>
											<text class="text-black">{{itemss.name}}</text>
										</view>
									</block>
								</view>
							</view>
						</block>
					</view>
				</block>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import _sort_data from '@/static/data/sort_vue.js';	//虚拟数据
	import _tool from '@/utils/tools.js';	//工具函数
	import{
		CategoryAll
	} from "@/api/mall.js";
	import{
		CategoryAlls
	} from "@/api/shop.js";
	export default {
		data() {
			return {
				list: [], tabCur: 0, mainCur: 0, verticalNavTop: 0, load: true, sortList: [],cid:''
			}
		},
		onLoad() {
			this.loadData();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			loadData(){
				let that = this;
				const isNew = uni.getStorageSync('isNew')
				console.log(isNew)
				if (isNew === 1) {
					CategoryAlls({}).then(res=>{
						that.list = res.data;
						that.cid = that.list[0].id;
						that.list.map(mmp=>{
							if(mmp.pid !=0);
							that.sortList.push(mmp);
						})
					})
				} else {
					CategoryAll({}).then(res=>{
						that.list = res.data;
						that.cid = that.list[0].id;
						that.list.map(mmp=>{
							if(mmp.pid !=0);
							that.sortList.push(mmp);
						})
					})
				}
				
				
			},
			BackPage() {
				const canNavBack = getCurrentPages()
				//判断是否刷新了浏览器，刷新了浏览器，页面栈只有当前一个
				// #ifdef H5
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					history.back()
				}
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.cid = e.currentTarget.dataset.key;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				// console.log(e);
				let that = this;
				let tabHeight = 0;
				
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			},
			sortlistTap(sid,mid,bid){
				console.log("点击了产品");
				uni.navigateTo({
					url: "/pages/home/sort_list?cid="+this.cid+"&sid="+sid+"&mid="+mid+"&bid="+bid
				});	
			},
			searchTap() {
				console.log("点击了搜索，无效！")
				uni.navigateTo({
					url: "/pages/home/search"
				});
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
	
	@import "@/uni_modules/mpb-ui/shop/sort_vue.scss";
	
</style>
