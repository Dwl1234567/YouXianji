<template>
	<view>
		<view class="margin-sm">
			<view class="bg-white arrow margin-bottom-xs radius-4" v-for="(item,index) in dataList" :key="index">
				<view class="padding-sm flex justify-between text-sm">
					<view>
						<text class="text-bold text-blue">网单</text>
					</view>
					<view>
						<text class="text-deepblue text-bold">单号:</text>
						<text class="text-darkgrey">{{item.code}}</text>
					</view>
					<view>
						<text class="text-deepblue text-bold">时间:</text>
						<text class="text-darkgrey">{{item.createtime}}</text>
					</view>
				</view>
				<view class="padding-sm radius margin-top-sm  text-sm">
					<view  v-for="(item1,index1) in item.goodslist" :key="index1"  @tap="prodoctTap(item1.id)">
						
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
							回收人:
							<text>刘强没东</text>
						</view>
						<view class="">
							用户:
							<text>刘强没东</text>
						</view>
						
						<view class="">
							实收:
							<text>500元</text>
						</view>
					</view>
					<view class="flex padding-lr-sm justify-between">
						<view class="">
							平台:
							<text>67元</text>
						</view>
						<view class="">
							物流:
							<text>27元</text>
						</view>
						<view class="">
							分拣:
							<text>5.00元</text>
						</view>
					</view>
					<view class="flex padding-lr-sm justify-between">
						<view class="">
							客服<text class="text-xs text-lightgrey">(7686676)</text>:
							<text>500元</text>
						</view>
						<view class="">
							分销:
							<text>67元</text>
						</view>
					</view>
					<view class="flex padding-lr-sm justify-between">
						<view class="">
							优惠:
							<text>50:00元</text>
						</view>
						<view class="">
							毛利:
							<text>500.00元</text>
						</view>
					</view>
					<view class="padding-bottom-sm padding-lr-sm">
						<text class="text-darkgrey">备注:</text>
						<text class="text-lightgrey">收到一个好机</text>
					</view>
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
				dataList: [],
				queryInfo: {
					page: 1,
					pagesize: 20,
					company_id: '',
					store_id: '',
					warehouse_id: '',
					partition_id: '',
					paystatus: '',
					status: '',
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
				paramsData['paystatus'] = that.checkfilterData.value[0][0];
				paramsData['status'] = that.checkfilterData.value[1][0];
				paramsData['type'] = that.checkfilterData.value[2][0];
				erppurchasegetlist(paramsData).then(res => {
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
