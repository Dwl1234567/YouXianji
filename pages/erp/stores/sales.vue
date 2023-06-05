<template>
	<view>
		<!--接入查找商品列表接口-->
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">{{storename}}</block>
			<block slot="right">
				<button class="cu-btn sm bg-deepblue radius-4" @tap="showModal" data-target="DrawerModalL">切换门店</button>
			</block>
		</bar-title>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in daylist" :key="index"
				@tap="tabSelect" :data-id="index">
				{{item.key}}
			</view>
		</scroll-view>
		<view class="margin-sm padding-sm bg-deepblue">
			<view class="table-stastics" v-if="zCur ==0">
				<view class="table-stastics-tr">
					<view class="table-stastics-td table-stastics-line  table-stastics-left table-stastics-bold">项目</view>
					<view class="table-stastics-td table-stastics-line  table-stastics-right  table-stastics-bold">数据</view>
				</view>
				<view class="table-stastics-tr" v-for="(item,index) in salesTotalData" :key="index">
					<view class="table-stastics-td table-stastics-line  table-stastics-left">{{item.name}}</view>
					<view class="table-stastics-td table-stastics-line  table-stastics-right  text-red">{{item.num}}</view>
				</view>
			</view>
			<view class="table-stastics" v-if="zCur ==1">
				<view class="table-stastics-tr">
					<view class="table-stastics-td table-stastics-line  table-stastics-left table-stastics-bold">项目</view>
					<view class="table-stastics-td table-stastics-line  table-stastics-right  table-stastics-bold">数据</view>
				</view>
				<view class="table-stastics-tr" v-for="(item,index) in recycleTotalData" :key="index">
					<view class="table-stastics-td table-stastics-line  table-stastics-left">{{item.name}}</view>
					<view class="table-stastics-td table-stastics-line  table-stastics-right  text-red">{{item.num}}</view>
				</view>
			</view>
		</view>

		<!-- 日期选择控件 -->
		<u-calendar :show="showdate" mode="range" :minDate="minDate[0]" :maxDate="maxDate[0]" defaultDate="[]"
			:allowSameDay="true" :closeOnClicOverlay="true" @confirm="confirmDate" @close="closeDate"></u-calendar>

		<!--侧边门店切换-->
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-list menu text-left">
					<view :style="[{height:'calc(' + CustomBar + 'px)'}]"></view>
					<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
						style="height:calc(100vh - 305upx)">
						<view class="cu-item arrow" v-for="(item,index) in 50" :key="index" @tap="storeSelect" :data-id="index">
							<view class="content">
								<view>门店 {{index +1}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<view class="margin-sm">
			<!--主菜单-->
			<scroll-view scroll-x class="nav  text-center" scroll-with-animation :scroll-left="zLeft">
				<view class="cu-item text-lg" :class="index==zCur?'text-red text-bold cur':''" v-for="(item,index) in navList"
					:key="index" @tap="Select" :data-id="index">
					{{item}}
				</view>
			</scroll-view>

			<!--销售汇总-->
			<view class="" v-if="zCur == 0">
				<view class="padding-tb-sm bg-white radius-3">
					<!--二级维度-->
					<scroll-view scroll-x class="nav  text-center" scroll-with-animation :scroll-left="sellLeft">
						<view class="cu-item" :class="index==sellCur?'text-red cur':''" v-for="(item,index) in sellList"
							:key="index" @tap="sellSelect" :data-id="index">
							{{item}}
						</view>
					</scroll-view>
					<!--三级筛选维度-->
					<block v-if="sellCur==0">
						<view class="flex justify-center">
							<view class="padding-lr-sm ">
								<picker @change="kehuChange" :value="kehukey" :range="kehu">
									<view class="picker">
										{{kehukey>-1?kehu[kehukey]:'线上/下'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
							<view class="padding-lr-sm">
								<picker @change="xiaoshouChange" :value="xiaoshoukey" :range="xiaoshou">
									<view class="picker">
										{{xiaoshoukey>-1?xiaoshou[xiaoshoukey]:'销售员'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
							<!-- <view class="padding-lr-sm">
								<picker @change="sale_channelChange" :value="sale_channelkey" :range="sale_channel">
									<view class="picker">
										{{sale_channelkey>-1?sale_channel[sale_channelkey]:'全新/二手'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view> -->
							<view class="padding-lr-sm">
								<picker @change="clientChange" :value="clientkey" :range="client">
									<view class="picker">
										{{clientkey>-1?client[clientkey]:'客户'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
						</view>
					</block>
					<block v-if="sellCur==1">
						<view class="flex justify-center">
							<view class="padding-lr-sm ">
								<picker @change="employeeChange" :value="xiaoshoukey" :range="xiaoshou">
									<view class="picker">
										{{xiaoshoukey>-1?xiaoshou[xiaoshoukey]:'销售员'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
						</view>
					</block>
					<block v-if="sellCur==2">
						<view class="flex justify-center">
							<view class="padding-lr-sm">
								<picker @change="salesClientChange" :value="clientkey" :range="client">
									<view class="picker">
										{{clientkey>-1?client[clientkey]:'客户'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
						</view>
					</block>
					<block v-if="sellCur==3">
						<view style="position: relative;">
							<LiFilter :isType="0" :alias="['分类','品牌','系列','机型']" @change="changebar" @select="selectbar"
								:datalist="filterbasiclist" :height="0.6" :isFixtop="false"></LiFilter>
						</view>
					</block>
				</view>
				<!--全部销售list 点击请求刷新或切换局部-->
				<block>
					<sell0 :list_data="salesStatistisList"></sell0>
				</block>
				<!-- 			<block v-if="sellCur==1">
					<sell1 :list_data="salesStatistisList1"></sell1>
				</block>
				<block v-if="sellCur==2">
					<sell2 :list_data="salesStatistisList2"></sell2>
				</block>
				<block v-if="sellCur==3">
					<sell3 :list_data="salesStatistisList3"></sell3>
				</block> -->
			</view>
			<!--回收汇总-->
			<view class="" v-if="zCur == 1">
				<view class="padding-tb-sm bg-white radius-3">
					<!--二级维度-->
					<scroll-view scroll-x class="nav  text-center" scroll-with-animation :scroll-left="buyLeft">
						<view class="cu-item" :class="index==buyCur?'text-red cur':''" v-for="(item,index) in buyList" :key="index"
							@tap="buySelect" :data-id="index">
							{{item}}
						</view>
					</scroll-view>
					<!--三级筛选维度-->
					<block v-if="buyCur==0">
						<view class="flex justify-center" style="align-items: center;">
							<view class="padding-lr-sm ">
								<picker @change="recycleChanneChange" :value="recycle_channel_key" :range="kehu">
									<view class="picker">
										{{recycle_channel_key>0?kehu[recycle_channel_key]:'线上/下'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
							<view class="padding-lr-sm">
								<picker @change="recyclePeopleIdChange" :value="recycle_people0_key" :range="xiaoshou">
									<view class="picker">
										{{recycle_people0_key>-1?xiaoshou[recycle_people0_key]:'回收人'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
							<view class="padding-lr-sm">
								<picker @change="recycleClientIdChange" :value="recycle_client0_key" :range="client">
									<view class="picker">
										{{recycle_client0_key>-1?client[recycle_client0_key]:'客户'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
						</view>

					</block>
					<block v-if="buyCur==1">
						<view class="flex justify-center">
							<view class="padding-lr-sm">
								<picker @change="recyclePeopleChange" :value="recycle_people0_key" :range="xiaoshou">
									<view class="picker">
										{{recycle_people0_key>-1?xiaoshou[recycle_people0_key]:'回收人'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
						</view>
					</block>
					<block v-if="buyCur==2">
						<view class="flex justify-center">
							<view class="padding-lr-sm">
								<picker @change="recycleClientChange" :value="recycle_client0_key" :range="client">
									<view class="picker">
										{{recycle_client0_key>-1?client[recycle_client0_key]:'客户'}}
										<text class="iconfont icon-jiantouxiangxia"></text>
									</view>
								</picker>
							</view>
						</view>
					</block>
					<block v-if="buyCur==3">
						<view style="position: relative;">
							<LiFilter :isType="0" :alias="['分类','品牌','系列','机型']" @select="recycleSelectBar"
								:datalist="filterbasiclist" :height="1" :isFixtop="false"></LiFilter>
						</view>
					</block>
				</view>
			</view>
			<!--全部回收list 点击请求刷新或切换局部-->
			<block>
				<buy0 :list_data="recycleDataList0"></buy0>
			</block>
			<!-- <block v-if="buyCur==1">
				<buy1 :list_data="recycleDataList1"></buy1>
			</block>
			<block v-if="buyCur==2">
				<buy2 :list_data="recycleDataList2"></buy2>
			</block>
			<block v-if="buyCur==3">
				<buy3 :list_data="recycleDataList3"></buy3>
			</block> -->
		</view>

		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!--	
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="sLeft">
			<view class="cu-item" :class="index1==Cur?'text-green cur':''" v-for="(item1,index1) in navList" :key="index1" @tap="Select" :data-id="index1">
				{{item1}}
			</view>
		</scroll-view>	
		-->
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import LiFilter from '@/components/Li-Filter/Li-Filter.vue';
	import sell0 from '@/components/common/erp/sales/sell0'; //销售统计
	import sell1 from '@/components/common/erp/sales/sell1'; //销售员汇总
	import sell2 from '@/components/common/erp/sales/sell2'; //销售客户汇总
	import sell3 from '@/components/common/erp/sales/sell3'; //销售机型汇总
	import buy0 from '@/components/common/erp/sales/buy0'; //回收统计
	import buy1 from '@/components/common/erp/sales/buy1'; //回收人汇总
	import buy2 from '@/components/common/erp/sales/buy2'; //回收客户汇总
	import buy3 from '@/components/common/erp/sales/buy3'; //回收机型汇总
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		getSalesList0,
		getSalesList1,
		getSalesList2,
		getSalesList3,
		getRecycleList0,
		getRecycleList1,
		getRecycleList2,
		getRecycleList3,
		erpStatisticGetData,
		erpProductGetBasicData,
		erpStatisticGetTotalData
	} from "@/api/erpapi.js";
	import {
		getStoreRecyclePerformance,
		selectStoreUsers,
		selectStoreClientList,
		getStoreSellPerformance
	} from "@/api/erp.js";

	export default {
		//name: 'sales',
		components: {
			barTitle,
			LiFilter,
			sell0,
			sell1,
			sell2,
			sell3,
			buy0,
			buy1,
			buy2,
			buy3
		},
		data() {
			return {
				xiaoshouList: [],
				salesTotalData: {},
				recycleTotalData: {},
				jixinglist: {},
				modalName: null,
				verticalNavTop: 0,
				storename: '优闲集门店',
				dataList: [],
				TabCur: 0,
				ifBottomRefresh: false,
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				minDate: this.getDay(-90),
				maxDate: this.getDay(0),
				showdate: false,
				daylist: [{
						'key': '今天',
						'value': this.getDay(0)
					},
					{
						'key': '昨天',
						'value': this.getDay(-1)
					},
					{
						'key': '本月',
						'value': this.getthismonth()
					},
					{
						'key': '上月',
						'value': this.getlastmonth()
					},
					{
						'key': '选择日期',
						'value': []
					},
				],
				zCur: 0, //0-销售汇总 1-回收汇总
				zLeft: 0,
				navList: ['销售汇总', '回收汇总'],
				pageIndex: 1,
				pageLimit: 10,
				//销售配置
				sellCur: 0,
				sellLeft: 0,
				sellList: ['销售统计', '销售员汇总', '按客户汇总', '按机型汇总'],
				kehukey: 0,
				xiaoshoukey: -1,
				kehu: ['线上/下', '线下', '线上'],
				xiaoshou: [], //销售员下拉数据
				employeeList: {}, //销售员下拉数据key-value
				clientkey: -1,
				client: [], //销售汇总 -- 客户
				clientList: {}, //销售汇总 -- 客户数据key-value
				sale_channelkey: -1,
				sale_channel: ['全新/二手', '全新', '二手'],
				dataHZList: [],
				saleInChannel: 0, //销售统计 线上/下 1-线上 2-线下
				salePeople: 0, //销售统计 销售员
				saleChannel: 0, //销售统计 全新/二手 1-全新 2-二手
				saleClient: 0, //销售统计 客户
				salesStatistisList: [], //销售统计数据列表
				employeekey: -1,
				salePeople0: 0, //销售员汇总 销售员ID
				salesStatistisList1: [], //销售员汇总数据列表
				sales_client_key: -1,
				sales_client_id: 0,
				salesStatistisList2: [], //按客户汇总数据列表

				filterbasicInfo: '', //按机型汇总 筛选数据
				filterbasiclist: {}, //按机型汇总 筛选数据
				sales_category_id: 0, //销售汇总 分类ID
				sales_brand_id: 0, //销售汇总 品牌ID
				sales_series_id: 0, //销售汇总 系列ID
				sales_machine_id: 0, //销售汇总 机型ID
				salesStatistisList3: [], //按机型汇总数据列表

				//回收配置
				buyCur: 0,
				buyLeft: 0,
				buyList: ['回收统计', '按回收人汇总', '按客户汇总', '按机型汇总'],
				recycle_channel_key: 0,
				recycleInChannel: 0, //回收统计 线上/下 1-线上 2-线下
				recycle_people0_key: -1,
				recycle_people_0: 0, //回收统计 回收人ID
				recycle_client0_key: -1,
				recyle_client_0: 0, //回收统计 客户ID
				recycleDataList0: [],

				recycle_people_key: -1, //回收人 key
				recycle_people_1: 0, //按回收人汇总 回收人ID
				recycleDataList1: [],
				recycle_client_key: -1, //按客户汇总 key
				recycle_client_id: 0, //按客户汇总 客户ID
				recycleDataList2: [], //按客户汇总 列表

				recycle_category_id: 0, //回收汇总 分类ID
				recycle_brand_id: 0, //回收汇总 品牌ID
				recycle_series_id: 0, //回收汇总 系列ID
				recycle_machine_id: 0, //回收汇总 机型ID
				recycleDataList3: [], //按机型汇总数据列表
			}
		},
		onLoad() {

			this.getSelectData();
			this.getSelectStoreClientList();
			this.GetSalesTotalData();
			// this.erpProductGetBasicDataFuc();
		},
		created() {
			//获取销售统计 列表
			// this.salesStatistisDataList();

		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageIndex = 1; //重置分页页码
			// this.getList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.pageIndex += 1;
			this.ifBottomRefresh = true
			// this.getList();
		},
		methods: {
			//获取销售统计
			GetSalesTotalData() {
				let queryparams = {
					modelId: null,
					recyclePeople: this.xiaoshoukey == -1 ? null : this.xiaoshouList[this.xiaoshoukey - 1].userId,
					clientId: this.clientkey == -1 ? null : this.clientList[this.clientkey - 1].id,
					onlineType: this.kehukey,
					queryType: this.TabCur,
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1]
				}
				// queryparams.type = 1;
				getStoreSellPerformance(queryparams).then(res => {
					this.salesTotalData = [{
							name: '销售订单数量',
							num: res.data.storeSellCount.sellCount
						},
						{
							name: '商品总数',
							num: res.data.storeSellCount.productCount
						},
						{
							name: '业绩',
							num: res.data.storeSellCount.sellTotalPrice
						},
						{
							name: '成本',
							num: res.data.storeSellCount.costTotalPrice
						},
						{
							name: '实收',
							num: res.data.storeSellCount.totalFundsReceived
						},
						{
							name: '毛利率',
							num: res.data.storeSellCount.grossProfitRate
						}
					]
					this.salesStatistisList = res.data.storeSellPerformanceList
				});
			},
			//获取回收统计
			GetRecycleTotalData() {
				console.log(this.clientList)
				console.log(this.recycle_client0_key)
				let queryparams = {
					modelId: null,
					recyclePeople: this.recycle_people0_key == -1 ? null : this.xiaoshouList[this.recycle_people0_key - 1]
						.userId,
					clientId: this.recycle_client0_key == -1 ? null : this.clientList[this.recycle_client0_key - 1].id,
					onlineType: this.recycle_channel_key,
					queryType: this.TabCur,
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1]
				}
				// queryparams.type = 1;
				getStoreRecyclePerformance(queryparams).then(res => {
					console.log(res.data.storeRecyclePerformanceList)
					this.recycleTotalData = [{
							name: '回收订单数量',
							num: res.data.storeRecycleCount.recycleCount
						},
						{
							name: '回收额',
							num: res.data.storeRecycleCount.recycleTotalPrice
						}
					]
					console.log(res.data.storeRecyclePerformanceList)
					this.recycleDataList0 = res.data.storeRecyclePerformanceList;
				});
			},
			//获取销售员列表
			getSelectData() {
				let queryData = {}
				selectStoreUsers(queryData).then(res => {
					this.xiaoshouList = res.data
					this.xiaoshou = ['销售员'];
					res.data.map(item => {
						this.xiaoshou.push(item.nickName);
					})
				});
			},
			// 获取客户列表
			getSelectStoreClientList() {
				selectStoreClientList().then(res => {
					this.clientList = res.data;
					this.client = ['客户'];
					res.data.map(item => {
						this.client.push(item.clientName);
					})
				})
			},
			//销售统计列表
			salesStatistisDataList() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					inchannel: this.saleInChannel,
					sale_people: this.salePeople,
					channel: this.saleChannel,
					client_id: this.saleClient
				}
				getSalesList0(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.salesStatistisList = that.salesStatistisList.concat(data)
							} else {
								that.salesStatistisList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.salesStatistisList.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//销售员汇总 
			salesStatistisemployeeList() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					sale_people: this.salePeople0
				}
				getSalesList1(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.salesStatistisList1 = that.salesStatistisList1.concat(data)
							} else {
								that.salesStatistisList1 = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.salesStatistisList1.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//按客户汇总
			salesStatistisClientList() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					client_id: this.sales_client_id
				}
				getSalesList2(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.salesStatistisList2 = that.salesStatistisList2.concat(data)
							} else {
								that.salesStatistisList2 = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.salesStatistisList2.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//按机型汇总 筛选数据
			// 获取筛选项
			erpProductGetBasicDataFuc() {
				let that = this;
				erpProductGetBasicData({}).then(res => {
					let data = res.data;
					this.filterbasicInfo = data;
					console.log('接口读取->', this.filterbasicInfo);
					let tempdata = {
						filterType: 1,
						data: []
					};
					let skudata = this.filterbasicInfo.category; //SKU
					let skuItem = {
						title: '选择机型', //排序头的名称
						value: 'a',
						alias: ['分类', '品牌', '系列', '机型'],
						type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
						data: skudata
					};
					tempdata.data.push(skuItem);
					this.filterbasiclist = tempdata;
				})
			},
			//按机型汇总
			salesStatistisMachineList() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					category_id: this.sales_category_id, //销售汇总 分类ID
					brand_id: this.sales_brand_id, //销售汇总 品牌ID
					series_id: this.sales_series_id, //销售汇总 系列ID
					machine_id: this.sales_machine_id, //销售汇总 机型ID
				}
				getSalesList3(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.salesStatistisList3 = that.salesStatistisList3.concat(data)
							} else {
								that.salesStatistisList3 = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.salesStatistisList3.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//回收统计
			recycleStatistisList0() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					inchannel: this.recycleInChannel,
					recycle_people: this.recycle_people_0,
					client_id: this.recyle_client_0
				}
				getRecycleList0(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.recycleDataList0 = that.recycleDataList0.concat(data)
							} else {
								that.recycleDataList0 = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.recycleDataList0.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//按回收人汇总
			recycleStatistisList1() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					recycle_people: this.recycle_people_1
				}
				getRecycleList1(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.recycleDataList1 = that.recycleDataList1.concat(data)
							} else {
								that.recycleDataList1 = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.recycleDataList1.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//按回收人汇总
			recycleStatistisList2() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					client_id: this.recycle_client_id
				}
				getRecycleList2(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.recycleDataList2 = that.recycleDataList2.concat(data)
							} else {
								that.recycleDataList2 = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.recycleDataList2.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//按机型汇总
			recycleStatistisList3() {
				let queryparams = {
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1],
					page: this.pageIndex,
					pagesize: this.pageLimit,
					category_id: this.recycle_category_id, //回收汇总 分类ID
					brand_id: this.recycle_brand_id, //回收汇总 品牌ID
					series_id: this.recycle_series_id, //回收汇总 系列ID
					machine_id: this.recycle_machine_id, //回收汇总 机型ID
				}
				getRecycleList3(queryparams).then(res => {
						let that = this;
						let data = res.data.list;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.recycleDataList3 = that.recycleDataList3.concat(data)
							} else {
								that.recycleDataList3 = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.recycleDataList3.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			//统一调取列表接口
			getList() {
				if (this.zCur == 0) {
					this.pageIndex = 1;

					switch (this.sellCur) {
						case 0: //销售汇总
							// this.salesStatistisDataList();
							break;
						case 1: //销售员汇总
							this.salesStatistisemployeeList();
							break;
						case 2: //按客户汇总列表
							this.salesStatistisClientList();
							break;
						case 3: //按机型汇总列表
							this.salesStatistisMachineList();
							break;
					}
				} else {
					console.log('this.buyCur', this.buyCur);
					switch (this.buyCur) {
						case 0: //回收统计
							this.recycleStatistisList0();
							break;
						case 1: //按回收人汇总
							this.recycleStatistisList1();
							break;
						case 2: //按客户汇总列表
							this.recycleStatistisList2();
							break;
						case 3: //按机型汇总列表
							this.recycleStatistisList3();
							break;
					}
				}
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				if (this.TabCur == 4) {
					//弹出日期选择
					this.showdate = true;
				} else {
					this.daylist[4].key = '选择日期';
					if (this.zCur == 0) {
						this.GetSalesTotalData();
					} else {
						this.GetRecycleTotalData();
					}
					// this.getList();
				}
			},
			// 初始化时间
			// 获取当前时间，day为number，getDay(-1):昨天的日期;getDay(0):今天的日期;getDay(1):明天的日期;【以此类推】
			getDay(day) {
				let today = new Date();
				let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码

				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				let dataList = [];
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				return dataList;
			},
			getthismonth() {
				let today = new Date();

				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				let dataList = [];
				dataList.push(tYear + "-" + tMonth + "-" + '01');
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				return dataList;
			},
			getlastmonth() {
				// let today = new Date('2020-01-01');
				let today = new Date();
				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth);
				tDate = this.doHandleMonth(tDate);
				if (tMonth == '00') {
					tMonth = '12'
					tYear = tYear - 1;
				}
				// console.log(this.getMonthDays(tYear,tMonth));
				tDate = this.getMonthDays(tYear, tMonth);
				let dataList = [];
				dataList.push(tYear + "-" + tMonth + "-" + '01');
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				return dataList;
			},
			getMonthDays(year, month) {
				// 本月第一天 1-31
				const relativeDate = new Date(year, month, 1);
				// 获得当前月份0-11
				let relativeMonth = relativeDate.getMonth();
				// 获得当前年份4位年
				let relativeYear = relativeDate.getFullYear();

				// 当为12月的时候年份需要加1 月份需要更新为0 也就是下一年的第一个月
				if (relativeMonth === 11) {
					relativeYear += 1;
					relativeMonth = 0;
				} else {
					// 否则只是月份增加,以便求的下一月的第一天
					relativeMonth += 1;
				}
				// 一天的毫秒数
				const millisecond = 1000 * 60 * 60 * 24;
				// 下月的第一天
				const nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
				// 返回得到上月的最后一天,也就是本月总天数
				return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
			},
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},
			confirmDate(e) {
				this.daylist[4].value = [];
				this.daylist[4].value.push(e[0]);
				this.daylist[4].value.push(e.pop());

				this.daylist[4].key = e[0] + '~' + e.pop();
				this.showdate = false;
				if (this.zCur == 0) {
					this.GetSalesTotalData();
				} else {
					this.GetRecycleTotalData();
				}
				// this.getList();
			},
			closeDate() {
				this.showdate = false;
			},
			clear() {
				this.recycle_people0_key = -1;
				this.recycle_client0_key = -1;
				this.recycle_channel_key = 0;
				this.kehukey = 0;
				this.xiaoshoukey = -1;
			},
			Select(e) {
				this.zCur = e.currentTarget.dataset.id;
				if (this.zCur == 0) {

					this.GetSalesTotalData();
				} else {
					this.GetRecycleTotalData();
				}
				this.loadmore = 'more';
				this.ifBottomRefresh = false;
				this.zLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			sellSelect(e) {
				this.clear()
				this.loadmore = 'more';
				this.ifBottomRefresh = false
				this.sellCur = e.currentTarget.dataset.id;
				this.GetSalesTotalData();
				this.sellLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			buySelect(e) {
				this.clear()
				this.loadmore = 'more';
				this.ifBottomRefresh = false
				this.buyCur = e.currentTarget.dataset.id;
				this.GetSalesTotalData();
				this.buyLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//销售汇总  -- 线上/下
			kehuChange(e) {
				this.kehukey = e.detail.value;
				if (this.kehukey > 0) {
					this.saleInChannel = this.kehukey;
				} else {
					this.saleInChannel = 0;
				}
				console.log(e.detail.value)
				this.GetSalesTotalData();
			},
			//销售汇总  -- 销售员
			xiaoshouChange(e) {
				this.xiaoshoukey = e.detail.value;
				console.log('this.xiaoshoukey', this.xiaoshoukey);
				// if (this.xiaoshoukey > 0) {
				// 	let key = this.xiaoshoukey - 1;
				// 	this.salePeople = this.employeeList[key]['user_id'];
				// } else {
				// 	this.salePeople = 0;
				// }
				this.GetSalesTotalData();
			},
			//销售汇总  -- 全新/二手
			sale_channelChange(e) {
				this.sale_channelkey = e.detail.value;
				if (this.sale_channelkey > 0) {
					this.saleChannel = this.sale_channelkey;
				} else {
					this.saleChannel = 0;
				}
				// this.getList();
			},
			//销售汇总  -- 客户
			clientChange(e) {
				this.clientkey = e.detail.value;
				console.log('this.clientkey', this.clientkey);
				if (this.clientkey > 0) {
					let key = this.clientkey - 1;
					this.saleClient = this.clientList[key]['id'];
				} else {
					this.saleClient = 0;
				}
				this.GetSalesTotalData();
			},
			//销售员汇总  -- 销售员
			employeeChange(e) {
				this.xiaoshoukey = e.detail.value;
				console.log('this.employeekey', this.employeekey);
				// if (this.employeekey > 0) {
				// 	let key = this.employeekey - 1;
				// 	this.salePeople0 = this.employeeList[key]['user_id'];
				// } else {
				// 	this.salePeople0 = 0;
				// }
				this.GetSalesTotalData();
			},
			//按客户汇总 -- 客户
			salesClientChange(e) {
				this.clientkey = e.detail.value;
				console.log('this.sales_client_key', this.sales_client_key);
				// if (this.sales_client_key > 0) {
				// 	let key = this.sales_client_key - 1;
				// 	this.sales_client_id = this.clientList[key]['id'];
				// } else {
				// 	this.sales_client_id = 0;
				// }
				console.log('this.sales_client_key', this.sales_client_key);
				this.GetSalesTotalData();
			},
			//回收统计 线上/下
			recycleChanneChange(e) {
				this.recycle_channel_key = e.detail.value;
				if (this.recycle_channel_key > 0) {
					this.recycleInChannel = this.recycle_channel_key;
				} else {
					this.recycleInChannel = 0;
				}
				this.GetRecycleTotalData();
			},
			//回收统计 -- 回收人
			recyclePeopleIdChange(e) {
				console.log(e.detail.value)
				this.recycle_people0_key = e.detail.value;
				// if (this.recycle_people0_key > 0) {
				// 	let key = this.recycle_people0_key - 1;
				// 	this.recycle_people_0 = this.employeeList[key]['user_id'];
				// } else {
				// 	this.recycle_people_0 = 0;
				// }
				this.GetRecycleTotalData();
			},
			//回收统计 -- 客户
			recycleClientIdChange(e) {
				this.recycle_client0_key = e.detail.value;
				// if (this.recycle_client0_key > 0) {
				// 	let key = this.recycle_client0_key - 1;
				// 	this.recyle_client_0 = this.clientList[key]['id'];
				// } else {
				// 	this.recyle_client_0 = 0;
				// }
				this.GetRecycleTotalData();
			},
			//回收汇总 -- 回收人
			recyclePeopleChange(e) {
				this.recycle_people0_key = e.detail.value;
				// if (this.recycle_people_key > 0) {
				// 	let key = this.recycle_people_key - 1;
				// 	this.recycle_people_1 = this.employeeList[key]['user_id'];
				// } else {
				// 	this.recycle_people_1 = 0;
				// }
				this.GetRecycleTotalData();
			},
			//回收汇总 -- 客户
			recycleClientChange(e) {
				this.recycle_client0_key = e.detail.value;
				// if (this.recycle_client_key > 0) {
				// 	let key = this.recycle_client_key - 1;
				// 	this.recycle_client_id = this.clientList[key]['id'];
				// } else {
				// 	this.recycle_client_id = 0;
				// }
				this.GetRecycleTotalData();
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			storeSelect(e) {
				console.log(e)
				//赋值
				let store_id = Number(e.currentTarget.dataset.id) + 1
				this.storename = '门店-' + store_id;

				this.modalName = null
				//this.tabCur = e.currentTarget.dataset.id;
				//this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			changebar(e) {
				//console.log('----------change----------');
				//console.log(e);
			},
			//销售汇总 -- 按机型汇总
			selectbar(e) {
				//console.log('----------select----------');
				let selectType = e.root;
				let selectedData = e.nodes;
				switch (selectedData.length) {
					case 4:
						this.sales_category_id = selectedData[0]['value'];
						this.sales_brand_id = selectedData[1]['value'];
						this.sales_series_id = selectedData[2]['value'];
						this.sales_machine_id = selectedData[3]['value'];
						break;
					case 3:
						this.sales_category_id = selectedData[0]['value'];
						this.sales_brand_id = selectedData[1]['value'];
						this.sales_series_id = selectedData[2]['value'];
						break;
					case 2:
						this.sales_category_id = selectedData[0]['value'];
						this.sales_brand_id = selectedData[1]['value'];
						break;
					case 1:
						this.sales_category_id = selectedData[0]['value'];
						break;
				}
				// this.getList();
			},
			recycleSelectBar(e) {
				let selectType = e.root;
				let selectedData = e.nodes;
				switch (selectedData.length) {
					case 4:
						this.recycle_category_id = selectedData[0]['value'];
						this.recycle_brand_id = selectedData[1]['value'];
						this.recycle_series_id = selectedData[2]['value'];
						this.recycle_machine_id = selectedData[3]['value'];
						break;
					case 3:
						this.recycle_category_id = selectedData[0]['value'];
						this.recycle_brand_id = selectedData[1]['value'];
						this.recycle_series_id = selectedData[2]['value'];
						break;
					case 2:
						this.recycle_category_id = selectedData[0]['value'];
						this.recycle_brand_id = selectedData[1]['value'];
						break;
					case 1:
						this.recycle_category_id = selectedData[0]['value'];
						break;
				}
				// this.getList();
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
	@import "@/uni_modules/mpb-ui/shop/sort_list.scss";

	.cu-card.article>.cu-item .content {
		uni-image {
			width: 6.8em;
			height: 6.8em;
		}

		.text-content {
			height: 5.4em;
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.u-page__tag-item {
		margin-right: 20px;
	}

	.cu-dialog,
	.VerticalNav.nav {
		width: 240upx;
		white-space: initial;
	}

	.table-stastics {
		width: 100%;
		border-top: 1px solid #fff;
		border-left: 1px solid #fff;
		box-sizing: border-box;

		.table-stastics-line {
			border-bottom: 1px solid #fff;
			border-right: 1px solid #fff;
		}

		.table-stastics-tr {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: stretch;
			align-content: center;

			.table-stastics-td {
				box-sizing: border-box;
				padding: 3px;
				word-break: break-all;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: center;
				align-items: center;
				align-content: center;
				min-height: 25px;
				font-size: 12px;
			}

			.table-stastics-left {
				width: 40%;
			}

			.table-stastics-right {
				width: 60%;
			}

			.table-stastics-bold {
				font-weight: bold;
			}
		}
	}
</style>