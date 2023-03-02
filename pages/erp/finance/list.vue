<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">流水账单</block>
		</bar-title>
		
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="1==TabCur?'text-red cur':''" @tap="tabSelect" data-id="1">
				待审批
			</view>
			<view class="cu-item" :class="2==TabCur?'text-red cur':''" @tap="tabSelect" data-id="2">
				已审批
			</view>
		</scroll-view>
		<view class="cu-list menu" v-if="1==TabCur">
			<view class="margin-sm bg-white radius-4" v-for="(item,index) in dataList" :key="index" @tap="tabGoods(item.id)">
				<view class="padding-xs flex justify-between text-xs">
					<view>单号:{{item.code}}</view>
					<view>
						时间:{{item.createtime}}
					</view>
				</view>
				<view class="margin-top-sm ">
					<view class="cu-steps text-xs">
						<view class="cu-item " :class="item.have_paid != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已回收
						</view>
						<view class="cu-item" :class="item.have_deliverede != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							待质检
						</view>
						<view class="cu-item" :class="item.have_received != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							质检中
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已质检
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已付款
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							验机报告
						</view>
						<view class="cu-item" :class="item.have_commented != 0 ? 'text-red':''">
							<text class="cuIcon-roundcheckfill"></text>
							已上架
						</view>
					</view>
				</view>
				<view class="padding-sm text-sm">
					<view class="flex" style="border-bottom:1px solid #efefef;"  v-for="(item1,index1) in item.goodslist" :key="index1">
						<view class="flex-sub padding-sm">
							<view class="goodsimg"
								:style="[{backgroundImage:'url('+item1.image+')'}]"></view>
						</view>
						<view class="flex-treble padding-sm">
							<view class="text-deepblue">{{item1.title}}</view>
							<view class="flex justify-between">
								<view class="" v-if="item1.sn">序列号:{{item1.sn}}</view>
							</view>
							<!--支出-->
							<view class="flex justify-between" v-if="item.type == 'income'">
								<view class="" v-if="item1.money">销售价:{{item1.money}}</view>
								<view class="" v-if="item1.peer_price">调拨价:{{item1.peer_price}}</view>
								<view class="" v-if="item1.cost_price">回收价:{{item1.cost_price}}</view>
							</view>
							<!--收入-->
							<view class="flex justify-between" v-if="item.type == 'spending'">
								<view class="" v-if="item1.money">回收价:{{item1.money}}</view>
								<view class="" v-if="item1.peer_price">调拨价:{{item1.peer_price}}</view>
								<view class="" v-if="item1.sales_price">回收价:{{item1.sales_price}}</view>
							</view>
							<view class="flex justify-between">
								<view class="">直售:
									<text v-if="item1.is_ok ==1">是</text>
									<text v-else>否</text>
								</view>
								<view class="" v-if="item1.nums">数量:{{item1.nums}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="grid margin-bottom text-center col-2">
					<view class="padding-xs">
						<view class="cu-tag line-blue round sm">科目：{{item.subjectsname}}</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag round line-red sm">
							账单类型:
							<text v-if="item.type == 'income'">收入</text>
							<text v-else-if="item.type == 'spending'">支出</text>
							<text v-else>类型错误</text>
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag line-red round sm">
							财务类别：{{item.typename}}
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag line-green round sm">
							<text v-if="item.type == 'income'">收入</text>
							<text v-if="item.type == 'spending'">支出</text>
							时间：{{item.datatime}}
						</view>
					</view>
					<view class="padding-xs">
						<view class="cu-tag line-red round sm">
							发起人：{{item.createname}}
						</view>
					</view>
					<!--
					<view class="padding-xs">
						<view class="cu-btn bg-red round sm">
							付款/审批
						</view>
					</view>
					-->
				</view>
				<!--
				<view class="content padding-tb-sm">
					<view>{{item.subjects_id|FbilltypeInfo}}[{{item.type == 'income'?'收入':'支出'}}]{{item.amount}}元</view>
					<view class="text-gray text-sm">
						<text class="margin-right-sm">[{{item.desc}}]</text>
						<text class="">{{item.audittime}}</text>
					</view>
				</view>
				<view class="action">
					<view class="cu-tag round bg-blue light" v-if="item.type == 'spending'">应付款</view>
					<view class="cu-tag round bg-olive light" v-else>应收款</view>
				</view>
				-->
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-list menu" v-if="2==TabCur">
			<view class="cu-item arrow" v-for="(item,index) in dataList1" :key="index" @tap="tabGoods(item.id)">
				<view class="content padding-tb-sm">
					<view>{{item.subjects_id|FbilltypeInfo}}[{{item.type == 'income'?'收入':'支出'}}]{{item.amount}}元</view>
					<view class="text-gray text-sm">
						<text class="margin-right-sm">[{{item.desc}}]</text>
						<text class="">{{item.audittime}}</text>
					</view>
				</view>
				<view class="action">
					<view class="cu-tag round bg-blue light"  v-if="item.type == 'spending'">应付款</view>
					<view class="cu-tag round bg-olive light" v-else>应收款</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore1" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		erpfinancewastebook
	} from "@/api/erpapi.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js';	//工具函数
	// 科目类别
	const billtypeInfo = [
		{
			value:1,
			lable:'工资'
		},{
			value:2,
			lable:'采购'
		},{
			value:3,
			lable:'差旅'
		},{
			value:4,
			lable:'交通'
		},{
			value:5,
			lable:'招待'
		},{
			value:6,
			lable:'运营'
		},{
			value:7,
			lable:'租赁'
		},{
			value:8,
			lable:'办公'
		},{
			value:9,
			lable:'销售'
		},{
			value:10,
			lable:'快递'
		}
	]
	// 1=工资,2=采购,3=差旅,4=交通,5=招待,6=运营,7=租赁,8=办公,9=销售,10=快递
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				TabCur: 1,
				ifBottomRefresh: false,
				dataList: [],
				dataList1: [],
				queryInfo: {
					page: 1,
					pagelist: 10,
				},
				queryInfo1: {
					page: 1,
					pagelist: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				loadmore1: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad() {
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
		},
		onReady() {
			
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('进入刷新');
			if(this.TabCur == 1){
				this.queryInfo.page = 1; //重置分页页码
			}else if(this.TabCur == 2){
				this.queryInfo1.page = 1; //重置分页页码
			}
			this.getDataList();
		},
		onReachBottom() {
			if(this.TabCur == 1){
				if (this.loadmore == 'noMore') return
				this.queryInfo.page += 1;
				this.ifBottomRefresh = true
				this.getDataList();
			}else if(this.TabCur == 2){
				if (this.loadmore1 == 'noMore') return
				this.queryInfo1.page += 1;
				this.ifBottomRefresh1 = true
				this.getDataList();
			}
		},
		filters:{
			FbilltypeInfo(value){
				if (!value) return ''
				let text = ''
				billtypeInfo.map((item,index)=>{
					if(item.value == value){
						text = item.lable;
					}
				})
				return text;
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				uni.startPullDownRefresh();
			},
			tabGoods(id) {
				//弹出审批付款窗
				/*
				uni.navigateTo({
					url: "/pages/erp/finace/goods?checkId="+id
				});*/
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				if(that.TabCur == 1){
					paramsData['status'] = 'unaudited'
				}else if(that.TabCur == 2){
					paramsData = that.queryInfo1;
					paramsData['status'] = 'audited'
				}
				erpfinancewastebook(paramsData).then(res => {
						let data = res.data.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if(that.TabCur == 1){
								if (that.ifBottomRefresh) {
									that.dataList = that.dataList.concat(data)
								} else {
									that.dataList = data
								}
								that.ifBottomRefresh = false
								that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
							}else if(that.TabCur == 2){
								if (that.ifBottomRefresh1) {
									that.dataList1 = that.dataList1.concat(data)
								} else {
									that.dataList1 = data
								}
								that.ifBottomRefresh1 = false
								that.loadmore1 = res.data.total == that.dataList1.length ? 'noMore' : 'more'
							}
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			}
		}
	}
</script>

<style lang="scss">
	.cu-list.menu .goodsimg{
		width:150rpx;
		height:150rpx;
		background-size: 100% 100%;
	}
</style>