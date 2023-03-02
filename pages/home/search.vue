<template>
	<view>
		<view class="bar-search-title-box">
			<view class="cu-bar search bg-white fixed no-shadow">
				<view class="action" @tap="BackPage">
					<text class="cuIcon-back" />
				</view>
				<view class="search-form round">
					<text class="cuIcon-search" />
					<input @input="searchInput" :value="searchKey" :adjust-position="false" type="text"
						placeholder="苹果7" confirm-type="search" />
					<text class="cuIcon-close close-icon" v-if="search_close" @tap="closeInput" />
				</view>
				<view class="action">
					<text class="cu-btn btn bg-red radius-4" @click="seachFuc">搜索</text>
				</view>
			</view>
			<!--占位的-->
			<view class="seat-height" />
		</view>
		<!-- 搜索结果 -->
		<view class="seach-main">
			<goods-sort-list :list_data="seachList" @listTap="goodsSortListTap">
			</goods-sort-list>
		</view>
		<!--搜索区域-->
		<view class="padding search-list-view" v-if="!deleteView">
			<!--搜索记录-->
			<view class="search-list-view" v-if = "historyList.length > 0">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<text class="cuIcon-delete text-gray icon-right" @tap="deleteTap" />
				</view>
				<view class="btn-view">
					<button class="cu-btn round" v-for="item in historyList" @click="historyClick(item)">{{item}}</button>
				</view>
			</view>

			<!--推荐搜索-->
			<view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">推荐搜索</text>
				</view>
				<view class="btn-view">
					<button class="cu-btn round" v-for="item in recommendList" @click="recomendClick(item)">{{item}}</button>
				</view>
			</view>
		</view>

		<!--处理历史记录-->
		<view class="padding search-list-view" v-if="deleteView">
			<!--搜索记录-->
			<view class="search-list-view">
				<view class="search-bar-view">
					<text class="text-black">历史搜索</text>
					<view class="text-sm text-right">
						<text class="text-gray" @tap="allclearhis">全部删除</text>
						<text class="text-red" @tap="logTap">完成</text>
					</view>
				</view>
				<view class="btn-view">
					<button class="cu-btn round" v-for="(item,index) in historyList" @click="removehisClick(index)">
						<text>{{item}}</text>
						<text class="cuIcon-roundclosefill close-icon"  />
					</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		ProductSearch
	} from "@/api/mall.js"
	import goodsSortList from '@/components/common/list/goods-sort-list';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			goodsSortList
		},
		data() {
			return {
				search_close: false,
				searchKey: '',
				deleteView: false,
				seachList: [],
				historyList:[
					'iphone',
					'mete',
					'mac',
				],
				recommendList:[
					'耳机',
					'笔记本',
					'小米',
					'华为',
					'三星'
				]
			}
		},
		onLoad() {
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			goodsSortListTap(e){
				console.log(e);
				uni.navigateTo({
					url: '/pages/goods/goods?id=' + e.data.id
				});
			},
			searchRecycleDataFuc(key = '') {
				if(!this.searchKey){
					return;
				}
				let paramsData = {
					keyword: this.searchKey
				}
				ProductSearch(paramsData).then(res => {
					if (res.code == 1) {
						this.seachList = res.data.data;
					}
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
			seachFuc(){
				this.searchRecycleDataFuc();
			},
			searchInput(event) {
				let value = event.detail.value;
				this.searchKey = value;
				if (value) {
					this.search_close = true;
				} else {
					this.search_close = false;
				}
				console.log(value)
			},
			historyClick(name){
				this.searchKey = name;
				this.searchRecycleDataFuc();
			},
			recomendClick(name){
				this.searchKey = name;
				this.searchRecycleDataFuc();
			},
			removehisClick(index){
				this.historyList.splice(index,1);
			},
			allclearhis(){
				this.historyList = [];
			},
			closeInput() {
				this.searchKey = '';
				this.search_close = false;
			},
			deleteTap() {
				this.deleteView = true;
			},
			logTap() {
				this.deleteView = false;
			},
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	@import "@/uni_modules/mpb-ui/shop/search.scss";
</style>
