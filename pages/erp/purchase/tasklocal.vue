<template>
	<view>
		<view class="margin-sm">
			<view class="bg-white arrow margin-bottom-xs radius-4 tasklocal" v-for="(item,index) in dataList" :key="index">
				<view class="padding-sm flex justify-between text-sm" style="border-bottom: 2rpx solid #edebeb;">
					<view>
						<text class="text-deepblue text-bold">上门时间：</text>
						<text class="text-darkgrey">{{item.take_time}}</text>
					</view>
				</view>
				<view class="padding-sm radius margin-top-sm  text-sm ">
					<view class="flex">
						<view class="flex-sub padding-sm radius">
							<view class="goodsimg"
								:style="[{backgroundImage:'url('+item.image+')'}]"></view>
						</view>
						<view class="flex-treble padding-sm radius">
							<view class="text-deepblue">{{item.goods_name}}</view>
							<!-- <view class="flex justify-between">
								<view class="" v-if="item1.sn">序列号:{{item1.sn}}</view>
								<view class="" v-if="item1.cart_info['0_attr_1']">购买渠道:{{item1.cart_info['0_attr_1']}}</view>
							</view> -->
							<view class="flex justify-between">
								<view class="" v-if="item.quoted_price">回收估价:{{item.quoted_price}}</view>
								<!-- <view class="" v-if="item1.nums">数量:{{item1.nums}}</view> -->
							</view>
						</view>
					</view>
				</view>
				<view class="">
					<view class="flex padding-lr-sm justify-between">
						<view class="">
							客户:
							<text>{{item.user_name}}</text>
						</view>
						<view class="fr">
							<view class="cu-btn bg-red radius-3 sm text-bold"  @tap="takerTap(item.id)">接单</view>
						</view>
					</view>
					<view class=" cf padding-sm">
						<view class="text-lightgrey" style="border-bottom: 2rpx dashed #edebeb; padding-bottom:6rpx;">
							地址:
							<text>{{item.user_address}}</text>
						</view>
						<view class="text-lightgrey" style="padding-top:6rpx;">
							备注:
							<text>{{item.user_note}}</text>
						</view>
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
		getsamecitylocallist,updatetakerinfo
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
					//company_id: '',
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
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
				this.getDataList();
			},
			// 点击筛选
			changefilter(e) {
				console.log(e);
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				
				getsamecitylocallist(paramsData).then(res => {
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
						console.log(data)
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
			takerTap(id) {
				console.log(id+'接单处理')
				
				//提交接口后刷新
				let params = {
					'id': id
				}
				updatetakerinfo(params).then(res => {
					if (res.code == 1) {
						uni.$u.toast(res.msg);
						setTimeout(() => {
							uni.startPullDownRefresh();
						}, 1500)
						
						
					}
				})
				.catch(err => {
					uni.$u.toast(err.msg);
				})
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
	.cu-steps .cu-item [class*="cuIcon-"], .cu-steps .cu-item .num{
		font-size:24rpx;
		line-height:24rpx;
	}
	.tasklocal .goodsimg{
		width:120rpx;
		height:120rpx;
		background-size: 100% 100%;
	}
</style>
