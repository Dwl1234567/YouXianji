<template>
	<view>
		
		<filterDropdown ref="filterDropdown" :menuTop="filtertopnum" :filterData="filterData" :defaultSelected="defaultSelected"
			:updateMenuName="true" @confirm="confirm" @change="changefilter" dataFormat="Object"></filterDropdown>
		
		<view class="margin-top padding-bottom-sm padding-top-sm">
			<view class="margin-top-xl cu-list card-menu">
				<view class="bg-white arrow margin-bottom-xs radius-4" v-for="(item,index) in dataList" :key="index">
					<view class="padding-xs flex justify-between text-xs">
						<view>单号:{{item.code}}</view>
						<view>
							时间:{{item.createtime}}
						</view>
					</view>
					
					<view class="padding-sm radius margin-top-sm  text-sm">
						<view  v-for="(item1,index1) in item.goodslist" :key="index1"  @tap="prodoctTap(item1.id)">
							<view class="margin-top-sm text-xs">
								<view class="flex padding-lr-sm justify-between">
									<view class="">
										<text class="text-bold">机器方式:</text>
										<text class="text-red" v-if="item1.is_ok == 0">直售</text>
										<text class="text-red" v-else>分拣</text>
									</view>
									<view class="">
										<text class="text-bold">回单状态:</text>
										<text class="text-red" v-if="item.receipt_status == 1">是</text>
										<text class="text-red" v-else>否</text>
									</view>
								</view>
								<view class="flex padding-lr-sm justify-between">
									<view class="">
										<text class="text-bold">是否维修:</text>
										<text class="text-red" v-if="item.is_wx == 1">是</text>
										<text class="text-red" v-else>否</text>
									</view>
									<view class="">
										<text class="text-bold">维修状态:</text>
										<text class="text-red" v-if="item.ps_status == 1">待送修</text>
										<text class="text-red" v-else-if="item.ps_status == 2">已送修</text>
										<text class="text-red" v-else>已取回</text>
									</view>
								</view>
								<view class="flex padding-lr-sm justify-between">
									<view class="">
										<text class="text-bold">是否抛售:</text>
										<text class="text-red" v-if="item1.is_ps == 0">否</text>
										<text class="text-red" v-else>是</text>
									</view>
									<view class="">
										<text class="text-bold">抛售状态:</text>
										<text class="text-red" v-if="item.ps_status == 1">待抛售</text>
										<text class="text-red" v-else-if="item.ps_status == 2">抛售中</text>
										<text class="text-red" v-else>已抛售</text>
									</view>
								</view>
							</view>
							<view class="flex">
								<view class="flex-sub padding-sm radius">
									<view class="goodsimg"
										:style="[{backgroundImage:'url('+item1.image+')'}]"></view>
								</view>
								<view class="flex-treble padding-sm radius">
									<view class="text-deepblue">{{item1.title}}</view>
									<view class="flex justify-between">
										<view class="" v-if="item1.sn">序列号:{{item1.sn}}</view>
										<view class="" v-if="item1.cart_info['0_attr_1']">购买渠道:{{item1.cart_info['0_attr_1']}}</view>
									</view>
									<view class="flex justify-between">
										<view class="" v-if="item1.money">回收价:{{item1.money}}</view>
										<view class="" v-if="item1.nums">数量:{{item1.nums}}</view>
									</view>
									<!--如果有-->
									<view class="flex justify-between">
										<view class="">销售人:刘强</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					
					<view class="">
						<view class="flex padding-lr-sm justify-between">
							<view class="">
								付款状态:
								<text v-if="item.paystatus == 0">未付款</text>
								<text v-else>已付款</text>
							</view>
							<view class="">
								审批状态:
								<text v-if="item.status == 0">待审批</text>
								<text v-else-if="item.status == 1">审批通过</text>
								<text v-else>审批不通过</text>
							</view>
						</view>
						
						<view class="flex padding-lr-sm justify-between">
							<view class="">
								回收类型:
								<text v-if="item.type == 1">采购单</text>
								<text v-if="item.type == 2">点点单</text>
								<text v-else>类型错误</text>
							</view>
							<view class=""  @tap="pingzhengTap" data-target="Image" :data-url="item.images">
								<view class="cu-btn round margin-xs bg-deepblue sm" v-if="item.paystatus == 0">
									<text>付款凭证</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!--付款凭证弹窗-->
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">付款凭证</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xs">
					<swiper class="screen-swiper square-dot" :indicator-dots="true"
					 :autoplay="true" interval="5000" duration="500">
						 <swiper-item v-for="(item,index) in pingzhengImg" :key="index">
							<image :src="item" mode="aspectFill"></image>
						 </swiper-item>
					 </swiper>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>

	</view>
</template>

<script>
	import {
		erppurchasegetlist
	} from "@/api/erpapi.js";
	import {
		selectRecycleOrderList
	} from "@/api/erp.js";
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
				pingzhengImg: [],
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh:false,
				defaultSelected: [],
				filterData: [{
					"name": '付款状态',
					"type": 'hierarchy',
					"submenu": [{
						"name": "全部状态",	//全部设为默认，选中时标签栏显示为付款状态
						"value": "all"
					},{
						"name": "未付款",	
						"value": "0"
					},
					{
						"name": "已付款",
						"value": "1"
					}]
				}, {
					"name": '审核状态',
					"type": 'hierarchy',
					"submenu": [{
						"name": "全部状态",	//全部设为默认，选中时标签栏显示为审核状态
						"value": "all"
					},{
						"name": "待审批",	//设为默认或者有没有一个不传值全部的状态设为默认
						"value": "0"
					},
					{
						"name": "审批通过",
						"value": "1"
					},
					{
						"name": "审批不通过",
						"value": "2"
					}]
				}, {
					"name": '开单类型',	//选择
					"type": 'hierarchy',
					"submenu": [{
						"name": "全部类型",	//设为默认
						"value": "0"
					},
					{
						"name": "采购单",
						"value": "1"
					},
					{
						"name": "点点单",
						"value": "2"
					}]
				}],
				dataList: [],
				queryInfo: {
					pageNum: 1,
					pageSize: 20,
					// company_id: '',
					// store_id: '',
					// warehouse_id: '',
					// partition_id: '',
					// paystatus: '',
					// status: '',
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
			this.checkfilterData = {
				"index": [
					[
						null
					],
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
					],
					[
						null
					]
				]
			};
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			});
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
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			
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
				// paramsData['paystatus'] = that.checkfilterData.value[0][0];
				// paramsData['status'] = that.checkfilterData.value[1][0];
				// paramsData['type'] = that.checkfilterData.value[2][0];
				selectRecycleOrderList(paramsData).then(res => {
					console.log(res.rows)
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			prodoctTap(id){
				console.log(id)
				uni.navigateTo({
					url: "/pages/erp/purchase/product?Id="+id
				});
			},
			pingzhengTap(e){
				this.modalName = e.currentTarget.dataset.target
				let imglist = e.currentTarget.dataset.url
				imglist = imglist.split(',')
				this.pingzhengImg =  imglist
				//this.pingzhengImg = e.currentTarget.dataset.url.split(',')
				console.log(this.pingzhengImg)
				//alert(url)
			},
			hideModal(e) {
				this.modalName = null
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
	
	.cu-list.menu > .cu-item.arrow{
		padding-top:20rpx;
		padding-bottom:20rpx;
	}
	.cu-steps .cu-item [class*="cuIcon-"], .cu-steps .cu-item .num{
		font-size:24rpx;
		line-height:24rpx;
	}
	.card-menu .goodsimg{
		width:150rpx;
		height:150rpx;
		background-size: 100% 100%;
	}
</style>
