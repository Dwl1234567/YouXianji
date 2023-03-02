<template>
	<view>
		<!--销售单列表接口 /erp/sell/getlist-->
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">销售列表</block>
		</bar-title> -->
		
		<filterDropdown ref="filterDropdown"  :menuTop="filtertopnum" :filterData="filterData" :defaultSelected="defaultSelected"
			:updateMenuName="true" @confirm="confirm" @change="changefilter" dataFormat="Object"></filterDropdown>
		
		<view class="margin-top padding-bottom-sm padding-top-sm">
			<view class="margin-top-xl cu-list card-menu">
				<view class="bg-white arrow margin-bottom-xs padding-tb-xs radius-4" v-for="(item,index) in dataList" :key="index">
					<view class="padding-sm flex justify-between text-sm"  @click="choosecust(item)">
						<view>
							<text class="text-deepblue text-bold">单号:</text>
							{{item.code}}
						</view>
						<view>
							<text class="text-deepblue text-bold">时间:</text>
							{{item.createtime}}
						</view>
					</view>
					<view class="margin-top-xs text-sm">
						<view class="flex"  v-for="(item1,index1) in item.goodslist" :key="index1"  @tap="prodoctTap(item1.id)">
							<view class="flex-sub padding-lr-sm radius">
								<view class="goodsimg"
									:style="[{backgroundImage:'url('+item1.image+')'}]"></view>
							</view>
							<view class="flex-treble padding-lr-sm radius" style="padding-top:15px">
								<view class="flex justify-between">
									<view class="text-deepblue text-sm text-bold">{{item1.title}}</view>
									<view class="" v-if="item1.nums">x{{item1.nums}}</view>
								</view>
								<view class="text-xs">
									<view class="flex justify-between">
										<view class="" v-if="item1.sn">序列号:{{item1.sn}}</view>
										<view class="">回收人:刘强</view><!--如果有-->
									</view>
									<view class="flex justify-between">
										<view class="">回收价:<text class="text-red">100</text></view>
										<view class="">调拨价:<text class="text-red">100</text></view>
										<view class="" v-if="item1.money">销售价:<text class="text-red">{{item1.money}}</text></view>

									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="padding-bottom-xs">
						<view class="flex padding-lr-sm justify-between">
							<view class="">
								<text class="text-deepblue text-bold">客户：</text>
								<text class="text-red">{{item.client_id}}</text>
							</view>
							<view class="" v-if="item.putstatus==2">
								<view class="">
									<text class="text-deepblue text-bold">挂单：</text>
									<text class="text-red">{{item.putmoney||0}}</text>
								</view>
							</view>
						</view>
						<view class="flex padding-lr-sm justify-between">
							<view class="">
								<text class="text-deepblue text-bold">应收：</text>
								<text class="text-red">{{item.money}}</text>
							</view>
							<view class="">
								<text class="text-deepblue text-bold">实收：</text>
								<text class="text-red">{{item.paymoney}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--
		<view class="bg-white margin-top padding-bottom-sm padding-top-sm">
			<view class="margin-top-lg cu-list menu card-menu">
				<view class="cu-item arrow" v-for="(item,index) in dataList" :key="index" @tap="prodoctTap(item)">
					<view class="content">
						<view class="text-grey">{{item.code}}</view>
						<view class="text-gray text-sm">
							{{item.createtime}}
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.money}}元</view>
						<view class="cu-tag round bg-blue sm" v-if="item.putstatus == 2">挂单中</view>
					</view>
				</view>
			</view>
		</view>
		-->
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		erpsellGetlist,
		erpclientmylist
	} from "@/api/erpapi.js";
	//import barTitle from '@/components/common/basics/bar-title';
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			//barTitle,
			filterDropdown,
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh: false,
				defaultSelected: [],
				filterData: [{
					"name": '挂单状态',
					"type": 'hierarchy',
					"submenu": [{
						"name": "全部状态",	//全部设为默认，选中时标签栏显示为挂单状态
						"value": "all"
					},{
						"name": "不挂单",	//设为默认或者有没有一个不传值全部的状态设为默认
						"value": "1"
					},
					{
						"name": "挂单中",
						"value": "2"
					}]
				},{
					"name": '客户筛选',	//我的客户列表接口
					"type": 'hierarchy',
					"submenu": [
						{
							"name": "全部状态",	//全部设为默认，选中时标签栏显示为挂单状态
							"value": "all"
						}
					]
				}],
				dataList: [],
				queryInfo: {
					page: 1,
					pagelist: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				checkfilterData:'',
				filtertopnum:'90',//筛选条高度
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.filtertopnum = 1;
			// #endif
			this.erpclientmylist();
			this.checkfilterData = {
				"index": [
					[
						null
					],
					[
						null
					]
				],
				"value": [
					[
						null
					],
					[
						null
					]
				]
			};
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryInfo.page = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.page += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			choosecust(info){
				if(this.chooseStatus){
					return;
				}
				uni.$emit('updatesell',info)
				uni.navigateBack({
					delta: 1
				})
			},
			// 我的客户
			erpclientmylist(){
				let that = this;
				erpclientmylist({}).then(res=>{
					let data = res.data.data;
					if(data){
						let filedata = data.map((item)=>{
							let info = {
								name:item.username,
								value:item.id
							}
							return info
						})
						filedata.unshift({name:'全部',value:0});
						that.filterData[1].submenu = filedata;
						console.log('that.filterData',that.filterData);
					}
					
				})
			},
			//接收菜单结果
			confirm(e) {
				console.log(e);
				this.checkfilterData = e;
				this.getDataList();
			},
			// 点击筛选
			changefilter(e) {
				console.log(e);
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData['putstatus'] = that.checkfilterData.value[0][0];
				paramsData['client_id'] = that.checkfilterData.value[1][0];
				erpsellGetlist(paramsData).then(res => {
						let data = res.data.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			prodoctTap(id){
				console.log(id)
				uni.navigateTo({
					url: "/pages/erp/sell/product?Id="+id
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
	.cu-list.menu > .cu-item.arrow{
		padding-top:20rpx;
		padding-bottom:20rpx;
	}
	.card-menu .goodsimg{
		width:150rpx;
		height:150rpx;
		background-size: 100% 100%;
	}
</style>
