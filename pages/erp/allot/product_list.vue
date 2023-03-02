<template>
	<view>
		<!--接入查找商品列表接口(此接口为该公司所有门店以及仓库)-->
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" :seachkey="storeName" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="cuIcon-scan" @tap="snTap" />
			</block>
		</bar-search-title>
		
		
		
		<!--<filterDropdown :menuTop="filtertopnum" :filterData="filterData" :defaultSelected="defaultSelected" :updateMenuName="true"
			@confirm="confirm" @change="changeFuc" dataFormat="Object"></filterDropdown>-->


		<view class="margin-lr-sm">
			<view class="cu-card article">
				<view class="cu-item margin-tb-sm bg-white padding-sm radius-4" v-for="(item,index) in dataList" @click="tapgoods(item)">
					<view class="content">
						<image :src="item.image" mode="aspectFill">
						</image>
						<view class="desc">
							<view class="text-deepblue text-lg">{{item.name}}</view>
							<view class="text-content">
								<view class="text-sm">调拨价:<text class="text-red">{{item.peer_price}}</text>元 成本:{{item.cost_price}}元
								</view>
								<view class="text-sm">序列号：{{item.sn}} <text
										class="margin-left-sm cuIcon-copy text-orange" @tap="copy(item.sn)">复制</text>
								</view>
								<!-- <view class="text-sm">销售价：{{item.sales_price}}元</view> -->
								<view class="text-sm">入库时间：{{item.createtime}}</view>
							</view>
							<view>
								<view class="cu-tag bg-red light sm round">{{item.cate_name}}</view>
								<view class="cu-tag bg-blue light sm round">{{item.brand_name}}</view>
								<!-- <view class="cu-tag bg-green light sm round" @tap="baogao">验机报告</view> -->
							</view>
						</view>
					</view>
				</view>
				<!--分页-->
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

	import _tool from '@/utils/tools.js'; //工具函数
	import {
		//erpProductGetBasicData,
		erpproductgetallotlist
	} from "@/api/erpapi.js";
	import {
		AdsIndex,
		ProductLists
	} from "@/api/mall.js"
	export default {
		components: {
			barSearchTitle,
			filterDropdown,
			goodsSortList,
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
				ifBottomRefresh: false,
				dataList: [],
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				defaultSelected: [],
				cid: '',
				bid: '',
				mid: '',
				sid: '',
				
				modalName: null,
				pageIndex: 1,
				pageLimit: 10,
				warehouse_id: '',
				partition_id: '',
				category_id: '',
				brand_id: '',
				series_id: '',
				machine_id: '',
				snNumber: '',
				storeName: '',
				filtertopnum:'90',//筛选条高度
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			this.filtertopnum = 160;
			// #endif
			this.erpproductgetlistFuc();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.pageIndex = 1; //重置分页页码
			this.erpproductgetlistFuc('refresh');
		},
		//加载更多
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.pageIndex += 1;
			this.ifBottomRefresh = true
			this.erpproductgetlistFuc();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {

			tapgoods(info) {
				
				let selectInfo = {
					goods_id: info.id
				}
				// 1. 获取当前页面栈实例（此时最后一个元素为当前页）
				let pages = getCurrentPages()
				// 2. 上一页面实例
				// 注意是length长度，所以要想得到上一页面的实例需要 -2
				// 若要返回上上页面的实例就 -3，以此类推
				let prevPage = pages[pages.length - 2]
				// 3. 给上一页面实例绑定getValue()方法和参数（注意是$vm）
				prevPage.$vm.getValue(selectInfo)
				// 4. 返回上一页面
				uni.navigateBack({
					delta: 1 // 返回的页面数
				})
			},
			
			
			loadData() {
				let that = this;
				AdsIndex({}).then(res => {
					that.swiperList = res.data;
				})
			},
			erpproductgetlistFuc() {
				let that = this;
				let paramsData = {
					'page': this.pageIndex,
					'pagelist': this.pageLimit,
					'keyword': this.storeName
				}
				erpproductgetallotlist(paramsData).then(res => {
					let data = res.data.data;
					if (that.ifBottomRefresh) {
						that.dataList = that.dataList.concat(data)
					} else {
						that.dataList = data
					}
					that.ifBottomRefresh = false
					that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
				})
			},
			searchTap(e) {
				console.log('搜索结果', e)
				this.storeName = e;
				this.erpproductgetlistFuc();
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
							that.erpproductgetlistFuc();
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}

					}
				});
			},
			edit(id) {
				//编辑提交
				console.log('编辑提交' + id)
				//回调后决定消失或继续编辑
				this.modalName = null
			},
			copy(sn) {
				//拷贝
				uni.setClipboardData({
					data: sn
				});

			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			changebar(e) {
				console.log('----------change----------');
				console.log(e);
			},
			selectbar(e) {
				console.log('----------select----------');
				console.log(e);
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
	

	.cu-card.article>.cu-item {

		.content {
			uni-image {
				width: 6.8em;
				height: 6.8em;
			}

			.text-content {
				height: 4.4em;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}
</style>
