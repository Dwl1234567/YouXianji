<template>
	<view>
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" :content="seriesName" @contentTap="searchTap">
			<block slot="right">
				<text class="cuIcon-service" />
			</block>
		</bar-search-title>
		<!--新组件示例-->
		<!-- <LiFilter :isType="0" @change="changebar" @select="selectbar" :datalist="testData" :height="0.6" :isFixtop="false" :show="false"></LiFilter> -->
		<!--<filterDropdown ref="filterDropdown" :menuTop="filtertopnum" :filterData="filterData" :defaultSelected="defaultSelected"
			:updateMenuName="true" @confirm="confirm" @change="changefilter" dataFormat="Object"></filterDropdown>-->
		<filterDropdown ref="filterDropdown" :menuTop="filtertopnum" :filterData="shopownerFilterData"
			:defaultSelected="defaultSelected" :updateMenuName="true" @confirm="confirm" dataFormat="Object"></filterDropdown>
		<!-- <HM-filterDropdown :menuTop="downFiltertop" :filterData="downFilterData" :defaultSelected="dfDefaultSelected"
			:updateMenuName="true" @confirm="confirm" @filterLabelChange="filterLabelChange"
			dataFormat="Object"></HM-filterDropdown> -->
		<!--商品列表-->
		<view class="bg-white margin-top padding-bottom-sm padding-top-sm goods-list-view-box">
			<!-- 占位 -->
			<view :style="{marginTop: downFilterPlaceholderHeight + 'px'}">
				<!--商品列表1-->
				<goods-sort-list :list_data="goodsList" @listTap="goodsSortListTap" :show="TabCur==0?true:false">
				</goods-sort-list>
				<!--商品列表2-->
				<goods-sort-list :list_data="goodsList" @listTap="goodsSortListTap" :show="TabCur==1?true:false">
				</goods-sort-list>
			</view>
		</view>
		<!-- <view>{{confirmSelectData}}</view> -->
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import LiFilter from '@/components/Li-Filter/Li-Filter.vue'; //新筛选组件
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue'; //旧筛选组件
	import goodsSortList from '@/components/common/list/goods-sort-list';

	import data from '@/static/data/shaixuan.js'; //筛选菜单数据
	import _sort_list_data from '@/static/data/sort_list.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		AdsIndex,
		ProductLists,
		ProductFuscreen,
		ProductFulists,
		ProductFilterchilren
	} from "@/api/mall.js"
	import {
		selectStoreGoods
	} from "@/api/malls.js"
	export default {
		components: {
			barSearchTitle,
			LiFilter,
			filterDropdown,
			goodsSortList,
		},
		data() {
			return {
				seriesName: null,
				TabCur: 0,
				goodsList: [],
				bid: '',
				mid: '',
				cid: '',
				sid: '',
				by: '',
				price_type: '',
				colour: '',
				seachname: '',
				specList: {},
				specListdata: [],
				loadingType: 'more', //加载更多状态
				pageIndex: 1,
				pageLimit: 10,
				fuscreenData: {},
				shopownerFilterData: [{
						name: '综合排序',
						type: 'hierarchy',
						submenu: [{
								name: '价格由低到高', //全部设为默认，选中时标签栏显示为全部
								value: '1',
							},
							{
								name: '价格由高到低',
								value: '2',
							}
						],
					},
					{
						name: '价格区间',
						type: 'hierarchy',
						submenu: [{
								name: '0-1000',
								value: '0',
							},
							{
								name: '1001-3000',
								value: '1',
							},
							{
								name: '3001-6000',
								value: '2',
							},
							{
								name: '6000+',
								value: '3',
							},
						],
					},
					{
						name: '成色', //选择
						type: 'hierarchy',
						submenu: [{
								name: '99成新', //设为默认
								value: '0',
							},
							{
								name: '95成新', //设为默认
								value: '2',
							},
							{
								name: '9成新', //设为默认
								value: '3',
							},
							{
								name: '9成新以下', //设为默认
								value: '4',
							},
						],
					},
				],
				defaultSelected: [],
				//旧组件筛选
				filterData: [{
					"name": '综合排序',
					"type": 'hierarchy',
					"submenu": []
				}, {
					"name": '价格',
					"type": 'hierarchy',
					"submenu": [

					]
				}, {
					"name": '成色',
					"type": 'hierarchy',
					"submenu": [{
						"name": "",
						"submenu": []
					}, ]
				}, {
					"name": '筛选',
					"type": 'radio',
					"submenu": []
				}],

				queryInfo: {
					pageNum: 1,
					pageSize: 10,
				},
				orderRule: null,
				priceBetween: null,
				conditionInfo: null,
				ifBottomRefresh: false,
				initdata: '',
				checklist: [],
				filtertopnum: '90', //筛选条高度

				downFiltertop: '90',
				downFilterPlaceholderHeight: '12',
				downFilterData: [], // 下拉筛选栏列表数据
				dfDefaultSelected: [],
				confirmSelectData: '',
				seriesId: 0,
				modelId: 0
			}
		},
		onLoad(e) {
			this.initDownFilter(e)
			console.log(e)
			this.seriesName = e.seriesName
			this.modelId = e.modelId
			this.seriesId = e.seriesId
			//临时数据
			// this.testData = {};
			// let tempdata = {
			// 	filterType: 1,
			// 	data: []
			// };

			// let byItem = {
			// 	title: '综合排序', //排序头的名称
			// 	value: 'by',
			// 	type: 1, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			// 	data: [
			// 		{
			// 			value: 1,
			// 			text: '综合排序'
			// 		},
			// 		{
			// 			value: 2,
			// 			text: '价格由低到高'
			// 		},
			// 		{
			// 			value: 3,
			// 			text: '价格由高到低'
			// 		}
			// 	]
			// };


			// let pricetypeItem = {
			// 	title: '价格区间', //排序头的名称
			// 	value: 'price_type',
			// 	type: 1, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			// 	data: [
			// 		{
			// 			value: 0,
			// 			text: '全部价格'
			// 		},
			// 		{
			// 			value: 1,
			// 			text: '0-1000'
			// 		},
			// 		{
			// 			value: 2,
			// 			text: '1001-3000'
			// 		},
			// 		{
			// 			value: 3,
			// 			text: '3001-6000'
			// 		},
			// 		{
			// 			value: 4,
			// 			text: '6000及以上'
			// 		}
			// 	] //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			// };
			// let colourItem = {
			// 	title: '成色', //排序头的名称
			// 	value: 'colour',
			// 	type: 1, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			// 	data: [
			// 		{
			// 			value: 0,
			// 			text: '全部成色'
			// 		},
			// 		{
			// 			value: 1,
			// 			text: '99成新'
			// 		},
			// 		{
			// 			value: 2,
			// 			text: '95成新'
			// 		},
			// 		{
			// 			value: 3,
			// 			text: '9成新'
			// 		},
			// 		{
			// 			value: 4,
			// 			text: '9成新以下'
			// 		}
			// 	] //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			// };
			// let categoryData = require('static/data/category.json');

			// let categoryItem = {
			// 	title: '筛选', //排序头的名称
			// 	value: 'category',
			// 	alias:['分类','品牌','系列','机型','网络制式','颜色'],
			// 	type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			// 	data: categoryData
			// };

			// tempdata.data.push(byItem);
			// tempdata.data.push(pricetypeItem);
			// tempdata.data.push(colourItem);
			// tempdata.data.push(categoryItem);
			// this.testData = tempdata;


			// #ifdef APP-PLUS
			this.filtertopnum = 160;
			// #endif
			// console.log(e);
			if (e.cid) {
				this.cid = e.cid;
			}
			if (e.bid) {
				this.bid = e.bid;
			}
			if (e.sid) {
				this.sid = e.sid;
			}
			if (e.mid) {
				this.mid = e.mid;
			}
			this.loadPage();
			// this.GetgoodsData('refresh', 1);

		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getgoodsList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return;
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true;
			this.getgoodsList();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			confirm(e) {
				console.log(e.value[0][0])
				this.orderRule = e.value[0][0]
				this.priceBetween = e.value[1][0]
				this.conditionInfo = e.value[2][0]
				this.getgoodsList()
			},
			initDownFilter(e) {
				// 下拉筛选距离顶部的高度
				// #ifdef APP-PLUS
				if (plus.os.name === 'Android') {
					this.downFiltertop = '160'
				} else {
					this.downFiltertop = '137'
				}
				// #endif

				// // 获取页面筛选数据
				// selectStoreGoods({
				// 	seriesId: e.seriesId,
				// 	modelId: e.modelId
				// }).then((res) => {

				// })

			},
			// 初始化页面
			loadPage() {
				this.getgoodsList();
			},
			getgoodsList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.firstFlag = that.queryInfo.pageNum == 1 ? true : false
				paramsData.orderRule = this.orderRule;
				paramsData.priceBetween = this.priceBetween;
				paramsData.conditionInfo = this.conditionInfo;
				paramsData.seriesId = that.seriesId;
				// paramsData.modelId = that.modelId;
				selectStoreGoods(paramsData)
					.then((res) => {
						let data = res.rows;
						data.map((item) => {
							return (item.disabled = false);
						});
						console.log(data);
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.goodsList = that.goodsList.concat(data);
							} else {
								that.goodsList = data;
							}
							that.ifBottomRefresh = false;
							that.loadmore = res.total == that.goodsList.length ? 'noMore' : 'more';
						}
					})
			},
			goodsSortListTap(e) {
				console.log(e);

				uni.navigateTo({
					url: '/pages/goods/goods?id=' + e.data.goodsId
				});
			},
			searchTap() {
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
	@import "@/uni_modules/mpb-ui/shop/sort_list.scss";
</style>