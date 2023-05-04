<template>
	<view>
		<!--接入查找商品列表接口-->
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="cuIcon-scan" @tap="snTap" />
			</block>
		</bar-search-title>

		<view class="margin-sm">
			<view class="cu-card article">
				<view class="bg-white cu-item radius-3" v-for="(item,index) in dataList">
					
					<view class="content" style="margin:10px 5px;">
						<image :src="item.image" mode="aspectFill">
						</image>
						<view class="desc">
							<view class="text-content">
								<view class="title">
									<view class="text-cut">{{item.name}}</view>
								</view>
								<view class="">
									<view class="text-sm">销售价:<text class="text-red">{{item.sales_price}}</text>元
										库存:{{item.stock}}<text class="margin-left-sm cuIcon-edit text-orange"
											@tap="showModal(item)" data-target="Modal">调价</text></view>
									<view class="text-sm">序列号：{{item.sn}} <text class="margin-left-sm cuIcon-copy text-orange" @tap="copy(item.sn)">复制</text>
									</view>
									<view class="text-sm">
										<text class="margin-right-sm">成本价：{{item.cost_price}}元</text>
										<text>调拨价：{{item.peer_price}}元</text>
									</view>
									<view class="text-sm">入库时间：{{item.createtime}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex padding-lr-sm justify-end margin-bottom-sm">
						<!--
						<view class="cu-btn round margin-xs bg-deepblue text-bold sm" @tap="copy(item.sn)">
							<text>一键复制序列号</text>
						</view>
						-->
						<view class="cu-btn round margin-xs bg-red text-bold sm" @tap="edit(item.id)">
							<text>审核</text>
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
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import goodsSortList from '@/components/common/list/goods-sort-list';
	import filterDropdown from '@/components/HMERP-filterDropdown/HM-filterDropdown.vue';
	import LiFilter from '@/components/Li-Filter/Li-Filter.vue';

	import _tool from '@/utils/tools.js'; //工具函数
	import {
		leaderSelectRecycleForm
	} from "@/api/erp.js"
	
	export default {
		components: {
			barSearchTitle,
			filterDropdown,
			goodsSortList,
			LiFilter
		},
		data() {
			return {
				index: '',
				swiperIndex: 0,
				swiperList: [],
				gridRoundList: [],
				gridSmList: [],
				fid: '',
				sid: '',
				dataList: [],
				tiaojiaInfo: '',
				ifBottomRefresh: false,
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				defaultSelected: [],
				
				modalName: null,
				pageIndex: 1,
				pageLimit: 10,
				snNumber: '',
				storeName: '',
				storeId: '',
				filtertopnum: '90', //筛选条高度
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			this.filtertopnum = 10;
			// #endif
			console.log(uni.getStorageSync('userinfo'))
			this.storeId = uni.getStorageSync('userinfo').storeId
			this.erpusertaskproductFuc();
			
		},
		//下拉刷新
		onPullDownRefresh() {
			this.erpusertaskproductFuc('refresh');
		},
		//加载更多
		onReachBottom() {
			this.erpusertaskproducttFuc();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			erpusertaskproductFuc() {
				let that = this;
				let paramsData = {
					'pageNum': this.pageIndex,
					'pageSize': this.pageLimit,
					'storeId': this.storeId
				}
				leaderSelectRecycleForm(paramsData).then(res => {
					let data = res.rows;
					if (that.ifBottomRefresh) {
						that.dataList = that.dataList.concat(data)
					} else {
						that.dataList = data
					}
					that.ifBottomRefresh = false
					that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
				})
			},
			searchTap(e) {
				console.log('搜索结果', e)
				this.storeName = e;
				this.erpusertaskproductFuc();
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
							that.erpusertaskproductFuc();
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}

					}
				});
			},
			edit(info) {
				//编辑提交
				console.log(info);
				let that = this;
				
				let paramstData = {
					id:info
				}
				erpShangjiaCheck(paramstData).then(res=>{
					that.$u.toast('审核成功');
					setTimeout(() => {
						location.reload()
					}, 1000);
					
				});
			},
			copy(sn) {
				//拷贝
				console.log('复制到剪贴板' + sn)
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
	.cu-card.article>.cu-item{
		padding-bottom: 0;
	}
	.cu-card.article>.cu-item .title{
		padding:0;
		line-height:60rpx;
	}
	.cu-card.article>.cu-item .content {
		padding:0;
		uni-image {
			width: 6.8em;
			height: 6.8em;
		}

		.text-content {
			//height: 5.4em;
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.cu-modal {
		z-index: 99;
	}
</style>
