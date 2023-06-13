<template>
	<view>
		<view class="bar-search-title-box">
			<view class="cu-bar fixed no-shadow bg-white">
				<view class="action" @tap="BackPage">
					<text class=" iconfont icon-xiangyou" />
				</view>
				<view class="content search" @tap="searchTap">
					<view class="search-form round">
						<text class="cuIcon-search" />
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
					<view class="cu-item" :class="item.classificationId==tabCur?'text-red cur':''" @tap="TabSelect"
						:data-key="item.classificationId" :data-id="item.classificationId">
						<view :class="item.classificationId==tabCur?'text-black text-bold':''">{{item.classificationName}}</view>
					</view>
				</block>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation :scroll-into-view="'main-'+mainCur"
				@scroll="VerticalMain">
				<block v-for="(item,index) in modelList" :key="index">
					<view class="padding-top padding-lr" :id="'main-'+index">


						<!--标题栏-->
						<block>
							<view class="cu-bar bg-white">
								<view class="action">
									<text>{{item.seriesName}}</text>
								</view>
							</view>
							<view class="grid-icon-box">
								<view class="cu-list grid col-3 no-border">
									<block v-for="(items, indexs) in item.models">
										<view class="cu-item" @tap="sortlistTap(items)">
											<view class="grid-icon">
												<image class="icon" :src=" $httpImage + item.photo" lazy-load mode="widthFix" />
											</view>
											<text class="text-black">{{items.modelName}}</text>
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
	import _sort_data from '@/static/data/sort_vue.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		getAllClassification,
		selectModelTree
	} from "@/api/malls.js";
	import {
		CategoryAlls
	} from "@/api/shop.js";
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				sortList: [],
				cid: '',
				modelList: [],
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
			loadData() {
				let that = this;
				const isNew = uni.getStorageSync('isNew')
				console.log(isNew)
				getAllClassification().then(res => {
					this.list = res.data
					this.tabCur = res.data[0].classificationId
					selectModelTree({
						classificationId: res.data[0].classificationId
					}).then(res => {
						this.modelList = res.data
					})
				})
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
				selectModelTree({
					classificationId: e.currentTarget.dataset.id
				}).then(res => {
					this.modelList = res.data
				})
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
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
			sortlistTap(item) {
				console.log("点击了产品", item);
				uni.navigateTo({
					url: "/pages/home/sort_list?modelId=" + item.modelId
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