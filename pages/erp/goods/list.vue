<template>
	<view>
		<!--接入查找商品列表接口(此接口为该公司所有门店以及仓库)-->
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" :seachkey="storeName" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="iconfont icon-saomiao" @tap="snTap" />
			</block>
		</bar-search-title>



		<!--<filterDropdown :menuTop="filtertopnum" :filterData="filterData" :defaultSelected="defaultSelected" :updateMenuName="true"
			@confirm="confirm" @change="changeFuc" dataFormat="Object"></filterDropdown>-->

		<select-data-list :title="titles" @seachSelect="seachSelect" :dataList="treeData"></select-data-list>
		<data-list :dataList="dataList"></data-list>
		<view class="bottomView">
			<view class="totalNumber">
				总数量：{{wareCount.totalNumber}}
			</view>
			<view class="totalCost">
				总价值：{{wareCount.totalCost ? wareCount.totalCost : 0}}
			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import dataList from '@/components/common/dataList/dataList.vue';
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import goodsSortList from '@/components/common/list/goods-sort-list';
	import filterDropdown from '@/components/HMERP-filterDropdown/HM-filterDropdown.vue';
	import selectDataList from '@/components/common/select/dataList.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		//erpProductGetBasicData,
		selectWarehouseGoodsList,
		selectWarehouseGoodsCount
	} from "@/api/erp.js";
	import {
		AdsIndex,
		ProductLists
	} from "@/api/mall.js"
	export default {
		components: {
			barSearchTitle,
			dataList,
			filterDropdown,
			goodsSortList,
			selectDataList
		},
		data() {
			return {
				deviceNo: null,
				deviceId: null,
				wareCount: {},
				titles: '仓库筛选',
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
				treeData: [{
						value: 0,
						text: "全部"
					},
					{
						value: 1,
						text: "整备"
					},
					{
						value: 2,
						text: "上架"
					},
				],
				modalName: null,
				pageIndex: 1,
				pageLimit: 10,
				warehouse_id: 0,
				partition_id: '',
				category_id: '',
				brand_id: '',
				series_id: '',
				machine_id: '',
				snNumber: '',
				storeName: '',
				inPageType: '',
				filtertopnum: '90', //筛选条高度
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			this.filtertopnum = 160;
			// #endif
			// 0 开单 1调拨
			this.inPageType = e.type;
			this.erpproductgetlistFuc();
			this.selectWarehouseGoodsCount();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageIndex = 1; //重置分页页码
			this.erpproductgetlistFuc();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return;
			this.pageIndex += 1;
			this.ifBottomRefresh = true;
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
			selectWarehouseGoodsCount() {
				selectWarehouseGoodsCount({
					'queryType': this.warehouse_id,
				}).then(res => {
					if (res.code === 200) {
						this.wareCount = res.data
					}
				})
			},
			seachSelect(e) {
				this.warehouse_id = e
				this.erpproductgetlistFuc()
				this.selectWarehouseGoodsCount()
			},
			tapgoods(info) {
				if (!this.inPageType) {
					return;
				}
				let selectInfo = {
					goods_id: info.goods_id,
					type: this.inPageType
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

			//接收菜单结果
			confirm(e) {
				let that = this;
				console.log(e);
				this.indexArr = e.index;
				this.valueArr = e.value;

				// that.filterData[1].submenu[0].submenu = data.category;
				// return;
				this.warehouse_id = e.value[0][0]; //主仓库id
				this.partition_id = e.value[0][1]; //分仓
				this.category_id = ''; //分类
				this.brand_id = ''; //品牌
				this.series_id = ''; //系列
				this.machine_id = ''; //机型
				this.erpproductgetlistFuc();
			},
			changeFuc(e) {
				console.log(e);
			},
			//修改选中项-示例
			changeSelected() {
				//设置选中项
				// 一下的注释是针对测试数据说明结构的意思，具体传入什么数据，要看你自己数据。如果data.js数据有修改，注意defaultSelected也要修改
				//传入defaultSelected的结构不能错，错了就报错运行异常。 不想选中的请传入null

				this.defaultSelected = [];
				this.$nextTick(() => {
					this.defaultSelected = [
						[3, 0, 1], //第0个菜单选中 一级菜单的第6项，二级菜单的第0项，三级菜单的第1项
						[2, 0, 1], //第1个菜单选中 一级菜单的第2项，二级菜单的第0项，三级菜单的第1项
						[1, 1], //第2个菜单选中 一级菜单的第1项 一级菜单的第1项
						[
							[0],
							[1, 2, 7],
							[1, 0]
						], //筛选菜单选中 第一个筛选的第0项，第二个筛选的第1,2,7项，第三个筛选的第1,0项
						[
							[0],
							[1],
							[1]
						] //单选菜单选中 第一个筛选的第0项，第二个筛选的第1项，第三个筛选的第1项
					];
				})
			},
			loadData() {
				let that = this;
				AdsIndex({}).then(res => {
					that.swiperList = res.data;
				})
			},
			erpproductgetlistFuc() {
				console.log(this.warehouse_id)
				let that = this;
				let paramsData = {
					'pageNum': this.pageIndex,
					'pageSize': this.pageLimit,
					'queryType': this.warehouse_id,
					'deviceNo': this.deviceNo,
					'deviceId': this.deviceId
				}
				selectWarehouseGoodsList(paramsData).then(res => {
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
				this.deviceNo = e;
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
							const data = JSON.parse(res.result)
							console.log(data.a)
							that.deviceId = data.a;
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

	page {
		background-color: #F0F0F0;
	}

	.bottomView {
		position: fixed;
		bottom: 0px;
		background: white;
		width: 100vw;
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
</style>