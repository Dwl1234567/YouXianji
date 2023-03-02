<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">调拨列表</block>
		</bar-title>
		
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="1==TabCur?'text-red cur':''" @tap="tabSelect" data-id="1">
				待处理
			</view>
			<view class="cu-item" :class="2==TabCur?'text-red cur':''" @tap="tabSelect" data-id="2">
				已接受
			</view>
			<view class="cu-item" :class="3==TabCur?'text-red cur':''" @tap="tabSelect" data-id="3">
				已拒绝
			</view>
		</scroll-view>
		<view class="cu-card article" v-if="1==TabCur">
			<view class="cu-item margin-sm padding-sm bg-white radius-3" v-for="(item,index) in dataList" :key="index">
				<view class="content">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="desc">
						<view class="title"><view class="text-cut">{{item.title}}</view></view>
						<view class="text-xs">
							<view class="flex justify-between">
								<view class="">序列号：{{item.sn}} <!--<text class="margin-left-sm cuIcon-copy text-orange"  @tap="copy(item.sn)">复制</text>--></view>
								<view class="">调拨时间：{{item.createtime}}</view>
							</view>
							<view class="flex justify-between">
								<view class="">成本价：{{item.cost_price}}</view>
								<view class="">调拨价：<text class="text-red">{{item.peer_price}}</text>元</view>
							</view>
							<view class="flex justify-between">
								<view class="">销售价：{{item.sales_price}}</view>
								<view class="">库存：1</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-between margin-bottom-sm">
					<view class="padding-top-sm padding-left padding-right">
						<view class="cu-tag bg-green light sm">{{item.store_name}}</view>
						<text class="text-xs margin-lr-xs">的</text>
						<view class="cu-tag bg-blue light sm">{{item.allot_name}}</view>
						<text class="text-xs margin-left-xs"> 发起的调货</text>
					</view>
					<view class="">
						<view class="cu-btn round margin-xs bg-deepblue text-bold sm" @tap="allotTop(item,2)">
							<text>拒绝</text>
						</view>
						<view class="cu-btn round margin-xs bg-red text-bold sm"  @tap="allotTop(item,1)">
							<text>同意</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">{{checkInfo.title}}</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<input class="border" v-model="refuseRemark" placeholder="请输入拒绝原因" name="input"></input>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub " @tap="hideModal">取消</view>
						<!-- <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view> -->
						<view class="action margin-0 flex-sub text-green solid-left" @tap="allotTop('',3)">确定</view>
					</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-card article" v-if="2==TabCur">
			<view class="cu-item margin-sm padding-sm bg-white radius-3" v-for="(item,index) in dataList1" :key="index">
				<view class="content">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="desc">
						<view class="title"><view class="text-cut">{{item.title}}</view></view>
						<view class="text-xs">
							<view class="flex justify-between">
								<view class="">序列号：{{item.sn}} <!--<text class="margin-left-sm cuIcon-copy text-orange"  @tap="copy(item.sn)">复制</text>--></view>
								<view class="">调拨时间：{{item.createtime}}</view>
							</view>
							<view class="flex justify-between">
								<view class="">成本价：{{item.cost_price}}</view>
								<view class="">调拨价：<text class="text-red">{{item.peer_price}}</text>元</view>
							</view>
							<view class="flex justify-between">
								<view class="">销售价：{{item.sales_price}}</view>
								<view class="">库存：1</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-between margin-bottom-sm">
					<view class="padding-top-sm padding-left padding-right">
						<view class="cu-tag bg-green light sm">{{item.store_name}}</view>
						<text class="text-xs margin-lr-xs">的</text>
						<view class="cu-tag bg-blue light sm">{{item.allot_name}}</view>
						<text class="text-xs margin-left-xs"> 发起的调货</text>
					</view>
					<view class="padding-top-xs">
						<view class="cu-btn round margin-xs line-red text-bold sm">
							<text>已接受</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore1" :contentText="contentText"></uni-load-more>
		</view>
		<view class="cu-card article" v-if="3==TabCur">
			<view class="cu-item margin-sm padding-sm bg-white radius-3" v-for="(item,index) in dataList2" :key="index">
				<view class="content">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="desc">
						<view class="title"><view class="text-cut">{{item.title}}</view></view>
						<view class="text-xs">
							<view class="flex justify-between">
								<view class="">序列号：{{item.sn}} <!--<text class="margin-left-sm cuIcon-copy text-orange"  @tap="copy(item.sn)">复制</text>--></view>
								<view class="">调拨时间：{{item.createtime}}</view>
							</view>
							<view class="flex justify-between">
								<view class="">成本价：{{item.cost_price}}</view>
								<view class="">调拨价：<text class="text-red">{{item.peer_price}}</text>元</view>
							</view>
							<view class="flex justify-between">
								<view class="">销售价：{{item.sales_price}}</view>
								<view class="">库存：1</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-between">
					<view class="padding-top-sm padding-left padding-right">
						<view class="cu-tag bg-green light sm">{{item.store_name}}</view>
						<text class="text-xs margin-lr-xs">的</text>
						<view class="cu-tag bg-blue light sm">{{item.allot_name}}</view>
						<text class="text-xs margin-left-xs"> 发起的调货</text>
					</view>
					<view class="padding-top-xs">
						<view class="cu-btn round margin-xs line-deepblue text-bold sm">
							<text>已拒绝</text>
						</view>
					</view>
				</view>
				<view class="bg-grey light margin-left margin-right padding-xs radius text-sm margin-bottom-sm">
					<view class="flex">
						<view class="flex-sub">
							{{item.remark}}
						</view>
					</view>
				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore2" :contentText="contentText"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
		erpcheckgetlist,
		transferlist,
		updatesingletransfer
	} from "@/api/erpapi.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				TabCur: 1,
				ifBottomRefresh: false,
				ifBottomRefresh1: false,
				ifBottomRefresh2: false,
				dataList: [],
				dataList1: [],
				dataList2: [],
				storeId:'',
				queryInfo: {
					page: 1,
					pagesize: 10,
					company_id:1,
					store_id:0,
					allot_status:1,
				},
				queryInfo1: {
					page: 1,
					pagesize: 10,
					company_id:1,
					store_id:0,
					allot_status:2,
				},
				queryInfo2: {
					page: 1,
					pagesize: 10,
					company_id:1,
					store_id:0,
					allot_status:3,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				loadmore1: 'more', //more 还有数据   noMore 无数据
				loadmore2: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				modalName: null,
				refuseRemark:'',//拒绝原因
				checkInfo:'',//选中拒绝的信息
			}
		},
		onLoad() {
			let storeInfo = uni.getStorageSync('store_info');
			storeInfo = JSON.parse(storeInfo);
			this.storeId = storeInfo.store_id;
			// 进入页面刷新
			uni.startPullDownRefresh();
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
			if(this.TabCur == 1){
				this.queryInfo.page = 1; //重置分页页码
			}else if(this.TabCur == 2){
				this.queryInfo1.page = 1; //重置分页页码
			}else{
				this.queryInfo2.page = 1; //重置分页页码
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
			}else{
				if (this.loadmore2 == 'noMore') return
				this.queryInfo2.page += 1;
				this.ifBottomRefresh2 = true
				this.getDataList();
			}
			
		},
		methods: {
			copy(value){
				uni.setClipboardData({
					data: value
				});
			},
			tabSelect(e) {
				// console.log(e);
				if(this.TabCur != e.currentTarget.dataset.id){
					// 进入页面刷新
					uni.startPullDownRefresh();
				}
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				
			},
			getDataList() {
				let that = this;
				let paramsData = that.TabCur == 1 ? that.queryInfo : that.TabCur == 2 ? that.queryInfo1 : that.queryInfo2;
				paramsData.store_id = that.storeId;
				transferlist(paramsData).then(res => {
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
							}else{
								if (that.ifBottomRefresh2) {
									that.dataList2 = that.dataList2.concat(data)
								} else {
									that.dataList2 = data
								}
								that.ifBottomRefresh2 = false
								that.loadmore2 = res.data.total == that.dataList2.length ? 'noMore' : 'more'
							}
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			allotTop(info,type){
				let that = this;
				if(info){
					this.checkInfo = info;
				}else{
					that.$u.toast('暂无数据，请刷新页面');
					return false;
				}
				if(type == 1){ //同意
					console.log('同意直接提交');
					updatesingletransfer({
						allot_id:info.id,
						allot_status:2,
					}).then(res=>{
						that.$u.toast(res.msg);
						uni.startPullDownRefresh({
							
						})
					})
				}else if(type == 3){
					console.log('拒绝后弹窗提交');
					if(!that.refuseRemark){
						return uni.showToast({
							title:'请输入拒绝原因!',
							icon:"none"
						});
					}
					updatesingletransfer({
						allot_id:this.checkInfo.id,
						allot_status:3,
						remarks:this.refuseRemark
					}).then(res=>{
						that.$u.toast(res.msg);
						
					})
					.finally(()=>{
						uni.startPullDownRefresh({})
						this.modalName = null
					})
				}else{
					this.modalName = 'Modal'
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style lang="scss">
	.cu-card.article>.cu-item {
		padding-bottom:0;
		.title{
			padding:0 0 20rpx 0;
		}
		.content{
			uni-image{
				width:4.8em;
				height:4.8em;
				margin-right:10rpx;
			}
		}
	}
	.border{
		height:2.4em;
		line-height:2.4em;
		border:1px solid #e1e1e1;
	}
	.cu-modal{
		z-index: 99;
	}
</style>