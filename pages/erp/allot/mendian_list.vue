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
				<view class="cu-item margin-tb-sm bg-white padding-sm radius-4" v-for="(item,index) in dataList"
					@click="tapgoods(item)">
					<view class="content">
						<!-- <image :src="item.image" mode="aspectFill">
						</image> -->
						<view class="">
							{{item.storeName}}
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
		getAllotedStoreList
	} from "@/api/erp.js";
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
				storeName: null,
				filtertopnum: '90', //筛选条高度
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
				console.log(info);
				uni.setStorageSync('mendian_list', info)
				uni.navigateTo({
					url: '/pages/erp/allot/allot_push'
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
					'pageNum': this.pageIndex,
					'pageSize': this.pageLimit,
					'storeName': this.storeName
				}
				getAllotedStoreList(paramsData).then(res => {
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