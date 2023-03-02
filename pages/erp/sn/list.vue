<template>
	<view>
		<!--接入查找商品列表接口(此接口为该公司所有门店以及仓库)-->
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" :seachkey="storeName" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="cuIcon-scan" @tap="snTap" />
			</block>
		</bar-search-title>
		<view v-if="showData===true" >
			<view class="margin-sm cu-card article" :class="dispalyClass">
				<view class="cu-item">
					<view class="content  bg-white radius-4">
						<image :src="goodsInfo.image" mode="aspectFill">
						</image>
						<view class="padding-tb-sm">
							<view class="text-deepblue text-lg">{{goodsInfo.name}}</view>
							<view class="text-content">
								<view class="text-sm">
									序列号：{{goodsInfo.sn}}
									<text class="margin-left-sm cuIcon-copy text-orange" @tap="copy(goodsInfo.sn)">复制</text>
									
								</view>
								<view class="text-sm">
									回收：{{goodsInfo.cost_price}}元
									<text class="margin-left-sm">库存：{{goodsInfo.stock}}</text>
								</view>
								<view class="text-sm">
									调拨：{{goodsInfo.peer_price}}元
									销售：{{goodsInfo.sales_price}}元
									
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="margin-lr-sm" v-for="(item,index) in sellList" :key="index">
				<!--销售-->
				<view class="cu-timeline">
					<view class="cu-item text-red">
						<view class="cu-time">
							<view class=" flex justify-between">
								<text class="margin-left text-bold text-red">{{item.createtime}}</text>
								<text class="margin-left text-bold text-deepblue">销售</text>
							</view>
						</view>
						<view class="content bg-white">
							<view class="bg-white arrow margin-bottom-xs padding-tb-xs radius-4">
								<view class="padding-xs flex justify-between text-sm">
									<view>
										<text class="text-bold text-red" v-if="item.channel == 1">全新</text>
										<text class="text-bold text-red" v-else>二手</text>
									</view>
									<view>
										<text class="text-deepblue text-bold">单号:</text>
										<text class="text-darkgrey">{{item.code}}</text>
									</view>
								</view>
								<view class="padding-lr-sm margin-top-xs  text-sm">
									<view class="flex justify-between text-sm">
										<view class="">
											<text class="text-deepblue text-bold">门店:</text>
											<text class="">{{item.store_name}}</text>
										</view>
										<view class="">
											<text class="text-deepblue text-bold">制单人:</text>
											<text class="">{{item.user_name}}</text>
										</view>
									</view>
									
									<view class="flex justify-between text-sm">
										<view class="">
											<text class="text-deepblue text-bold">数量:</text>
											<text class="">{{item.nums}}</text>
										</view>
										<view class="">
											<text class="text-deepblue text-bold">金额:</text>
											<text class="">{{item.money}}元</text>
										</view>
									</view>
									<view class="">
										<text class="text-darkgrey">备注:</text>
										<text class="text-lightgrey">{{item.remark}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!--分拣-->
				<view class="cu-timeline" v-for="(item,index) in qualityList" :key="index">
					<view class="cu-item text-red">
						<view class="cu-time">
							<view class=" flex justify-between">
								<text class="margin-left text-bold text-red">{{item.createtime}}</text>
								<text class="margin-left text-bold text-deepblue">分拣</text>
							</view>
						</view>
						<view class="content bg-white">
							<view  class="arrow margin-bottom-xs padding-tb-xs radius-4">
								<view class="margin-top-sm text-sm">
									<view class="flex padding-lr-sm justify-between">
										<view class="">
											<text class="text-bold">机器方式:</text>
											<text class="text-red" v-if="item.is_ok == 0">直售</text>
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
											<text class="text-red" v-if="item.is_ps == 0">否</text>
											<text class="text-red" v-else>是</text>
										</view>
										<view class="">
											<text class="text-bold">抛售状态:</text>
											<text class="text-red" v-if="item.ps_status == 1">待抛售</text>
											<text class="text-red" v-else-if="item.ps_status == 2">抛售中</text>
											<text class="text-red" v-else>已抛售</text>
										</view>
									</view>
									<view class="flex padding-lr-sm justify-between">
										<view class="">
											<text class="text-bold">回收方:</text>
											<text class="text-red">{{item.third_name}}</text>
										</view>
										<view class="">
											<text class="text-bold">分拣人:</text>
											<text class="text-red">{{item.name}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!--回收-->
				<view class="cu-timeline" v-for="(item,index) in purchaseList" :key="index">
					<view class="cu-item text-red">
						<view class="cu-time">
							<view class=" flex justify-between">
								<text class="margin-left text-bold text-red">{{item.createtime}}</text>
								<text class="margin-left text-bold text-deepblue">回收</text>
							</view>
						</view>
						<view class="content bg-white">
							<view class="arrow margin-bottom-xs padding-tb-xs radius-4">
								<view class="padding-sm flex justify-between text-sm">
									<view>
										<text class="text-bold text-red">{{item.source}}</text>
									</view>
									<view>
										<text class="text-deepblue text-bold">单号:</text>
										<text class="text-darkgrey">{{item.code}}</text>
									</view>
								</view>
								
								<view class="padding-lr-sm margin-top-sm text-sm">
									<view class="flex justify-between">
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">回收人:</text>
											<text class="">{{item.user_name}}</text>
										</view>
										<view class="padding-bottom-xs"></view>
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">客户:</text>
											<text class="">{{item.client_name}}</text>
										</view>
									</view>
									
									<view class="flex justify-between">
										<view >
											<text class="text-deepblue text-bold">开单类型:</text>
											<text class="" v-if="item.type == 1">采购单</text>
											<text class="" v-else-if="item.type == 2">点点开单</text>
											<text class="text-red" v-else>调拨开单</text>
										</view>
										<view >
											<text class="text-deepblue text-bold">付款状态:</text>
											<text class="" v-if="item.paystatus == 1">已付款</text>
											<text class="" v-else>未付款</text>
										</view>
									</view>
									<view class="flex justify-between">
										<view class="">
											<text class="text-deepblue text-bold">审核状态:</text>
											<text class="" v-if="item.status == 1">审批通过</text>
											<text class="text-red" v-else-if="item.status == 2">审批不通过</text>
											<text class="" v-else>未审批</text>
										</view>
										<view class="">
											<text class="text-deepblue text-bold">开单状态:</text>
											<text class="" v-if="item.push_status == 1">预制单</text>
											<text class="" v-else>正式单</text>
										</view>
										
									</view>
									<view class="flex justify-between">
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">产品数量:</text>
											<text class="">{{item.nums}}</text>
										</view>
										<view class="padding-bottom-xs"></view>
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">产品金额:</text>
											<text class="">{{item.money}}</text>
										</view>
									</view>
									<view class="padding-bottom-sm">
										<text class="text-darkgrey">备注:</text>
										<text class="text-lightgrey">{{item.remark}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!--财务-->
				<view class="cu-timeline" v-for="(item,index) in financeList" :key="index">
					<view class="cu-item text-red">
						<view class="cu-time">
							<view class=" flex justify-between">
								<text class="margin-left text-bold text-red">{{item.createtime}}</text>
								<text class="margin-left text-bold text-deepblue">财务</text>
							</view>
						</view>
						<view class="content bg-white">
							<view class="margin-sm radius-4" >
								<view class="flex justify-between text-xs">
									<view>单号:{{item.code}}</view>
									<view>
										审批时间:{{item.audittime}}
									</view>
								</view>
								
								<view class="text-sm">
									<view class="grid col-2">
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">科目:</text>
											<text class="">{{item.subject_name}}</text>
										</view>
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">账单类型:</text>
											<text v-if="item.type == 'income'">收入</text>
											<text v-else-if="item.type == 'spending'">支出</text>
											<text v-else>类型错误</text>
										</view>
									</view>
									<view class="grid col-2">
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">发起人:</text>
											<text class="">{{item.create_name}}</text>
										</view>
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">财务类别:</text>
											<text class="">{{item.type_name}}</text>
										</view>
									</view>
									<view class="grid col-2">
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">审核人:</text>
											<text class="">{{item.admin_name}}</text>
										</view>
										<view class="padding-bottom-xs">
											<text class="text-deepblue text-bold">金额:</text>
											<text class="">{{item.amount}}</text>
										</view>
									</view>
									<view class="padding-bottom-sm">
										<text class="text-darkgrey">备注:</text>
										<text class="text-lightgrey">{{item.desc}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import barSearchTitle from '@/components/common/basics/bar-search-title';

	import _tool from '@/utils/tools.js'; //工具函数
	import {
		getsndata
	} from "@/api/erpapi.js";
	
	export default {
		components: {
			barSearchTitle,
		},
		data() {
			return {
				goodsInfo:[],
				financeList:[],
				qualityList:[],
				purchaseList:[],
				sellList:[],
				dispalyClass:'display-none',
				showData:false,
				storeName: '',
			}
		},
		onLoad(e) {
			
		},
		onReady() {
			//_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			erpproductSnDataFuc() {
				let that = this;
					
				if(!that.storeName){
					uni.$u.toast('请填写商品序列号')
				}
				let paramsData = {
					'sn':that.storeName
				}
				getsndata(paramsData).then(res => {
					if(res.code==1){
						that.showData = true;
						that.goodsInfo = res.data.goodsinfo;
						that.financeList = res.data.finance_list;
						that.qualityList = res.data.quality_list;
						that.purchaseList = res.data.purchase_list;
						that.sellList = res.data.sell_list;
						if(that.goodsInfo){
							that.dispalyClass = 'display-block';
						}
					}
					console.log(that.goodsInfo);
					//let data = res.data.data;
					
				})
				
			},
			
			searchTap(e) {
				console.log('搜索结果', e)
				this.storeName = e;
				this.erpproductSnDataFuc();
			},
			snTap() {
				console.log('扫描二维码获取序列号筛选结果')
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: function(res) {
						console.log('获取到货品号，调用接口', res)
						// 微信小程序
						if (res.errMsg == "scanCode:ok") {
							// 扫描到的信息
							let code = res.result
							that.storeName = code;
							that.erpproductSnDataFuc();
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}

					}
				});
			},
			
			copy(sn) {
				//拷贝
				uni.setClipboardData({
					data: sn
				});

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
	.display-none {display: none;}
	.display-block {display: block;}
	.cu-card,.cu-card>.cu-item{
		overflow: unset;
	}
	.cu-card.article>.cu-item {

		.content {
			uni-image {
				width: 6.8em;
				height: 6.8em;
			}

			.text-content {
				height: 5.4em;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}
	.cu-card.article > .cu-item .content .text-content{
		height:auto;
	}
	.cu-card.article>.cu-item{padding-bottom:0;}
	.cu-timeline{background-color: unset;}
	.cu-timeline>.cu-item{
		padding:0 0 15px 25px;
	}
	.cu-timeline .cu-time{
		width:100%;
		text-align:left;
		padding:5px 10px 10px 0;
	}
	.cu-timeline>.cu-item::before{
		top:0;
		left:0;
		background-color: unset;
	}
	.cu-timeline>.cu-item::after{
		left:10px;
		width:5px;
		background-color: #fff;
	}
	.cu-timeline>.cu-item>.content{
		padding:5px;
		border-radius:10px;
	}
</style>
