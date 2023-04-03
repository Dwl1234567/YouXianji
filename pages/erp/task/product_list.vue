<template>
	<view>
		<!--接入查找商品列表接口-->
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="cuIcon-scan" @tap="snTap" />
			</block>
		</bar-search-title>
		<!-- <LiFilter :isType="0" @change="changebar" @select="selectbar" :datalist="filterData" :height="0.6"
			:isFixtop="false" :show="false"></LiFilter> -->
		<!-- <filterDropdown :menuTop="filtertopnum" :filterData="filterData" :defaultSelected="defaultSelected" :updateMenuName="true"
			@confirm="confirm" dataFormat="Object"></filterDropdown>
		-->

		<view class="margin-sm">
			<view class="cu-card article">
				<view class="flex bg-white radius-6 " v-for="(item,index) in dataList" style="overflow: hidden;">
					<image :src="item.image" mode="aspectFill" style="width: 280rpx; height: 280rpx;">
					</image>
					<view class="" style="padding: 34rpx 26rpx 20rpx 26rpx; display: flex; flex-direction: column;justify-content: space-between; flex: 1 1 auto;">		
						<view class="desc">
							<view class="">
								<view class="title">
									<view class="text-cut text-lg text-500">{{item.name}}</view>
								</view>
								<view class="margin-top-sm">
									<view class="text-sm text-929294">
										销售价:<text class="text-red">{{item.sales_price}}</text>元
										<span class="margin-left-sm">库存:<text class="text-red">{{item.stock}}</text></span>
										<!--<text class="margin-left-sm cuIcon-edit text-orange" @tap="showModal(item)" data-target="Modal">调价</text>-->
									</view>
									<view class="text-sm text-929294 margin-top-sm">序列号：{{item.sn}} 
									<!-- <text class="margin-left-sm cuIcon-copy text-orange" @tap="copy(item.sn)"></text> -->
									</view>
									<!-- <view class="text-sm">
										<text class="margin-right-sm">成本价：{{item.cost_price}}元</text>
										<text>调拨价：{{item.peer_price}}元</text>
									</view>
									<view class="text-sm">入库时间：{{item.updatetime}}</view> -->
								</view>
							</view>
						</view>
						<view class="flex justify-end" style="">
							<view class="cu-btn round text-bold sm" @tap="copy(item.sn)">
								<text>复制序列号</text>
							</view>
							<view class="cu-btn round margin-left-sm text-bold sm" @tap="showModal(item)" data-target="Modal">
								<text>调价</text>
							</view>
						</view>
					</view>
					
				</view>

			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">{{tiaojiaInfo.name}}</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						<view class="cu-list grid col-3">
							<view class="cu-item">
								销售价
								<input class="text-red" type="number" v-model="tiaojiaInfo.sales_price" placeholder="销售价"
									name="input"></input>
							</view>
							<view class="cu-item">
								调拨价
								<input class="text-blue" type="number" v-model="tiaojiaInfo.peer_price" placeholder="调拨价"
									name="input"></input>
							</view>
							<view class="cu-item">
								回收价
								<input class="text-green" type="number" v-model="tiaojiaInfo.cost_price" placeholder="回收价"
									name="input"></input>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub " @tap="hideModal">取消调价</view>
						<!-- <view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view> -->
						<view class="action margin-0 flex-sub text-green solid-left" @tap="edit()">确定调价</view>
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
		erpUserTaskProduct,
		erpProductGetBasicData,
		erpusereditproductmoney
	} from "@/api/erpapi.js"
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
				filterData: {
					filterType: 1,
					data: [{
						"title": '仓库',
						"type": 1,
						"value": 'a',
						"alias": ['主仓库', '子仓库'],
						"data": []
					}, {
						"title": '筛选', //分类、品牌、系列、机型
						"type": 1,
						"value": 'b',
						"alias": ['分类', '品牌', '系列', '机型'],
						"data": []
					}]
				},
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
				filtertopnum: '90', //筛选条高度
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			this.filtertopnum = 10;
			// #endif
			this.erpProductGetBasicDataFuc()
			this.erpusertaskproductFuc();
			this.filterData
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
			// 获取筛选项
			erpProductGetBasicDataFuc() {
				let that = this;

				erpProductGetBasicData({}).then(res => {
					let data = res.data;
					if (data) {
						// 仓库
						// that.filterData.data[0].data = data.house;
						that.filterData = {
							"filterType": 1,
							"data": [{
									"title": "仓库",
									"type": 2,
									"value": "a",
									"alias": [
										"主仓库",
										"子仓库"
									],
									"data": data.house
								},
								{
									"title": "筛选",
									"type": 2,
									"value": "b",
									"alias": [
										"分类",
										"品牌",
										"系列",
										"机型"
									],
									"data":data.category
								}
							]
						};
						// that.filterData.data[1].data = data.category;
						console.log(that.filterData);
					}
				})
			},
			changebar(e) {
				console.log('----------change----------');
				console.log(e);
			},
			selectbar(e) {
				console.log('----------select----------');
				console.log(e);
				// e.nodes
				if(e.root.value == 'a'){
					// 仓库
					e.nodes.map((item,index)=>{
						console.log(index);
						if(index == 0){
							this.warehouse_id = item.value;  //主
						}else if(index == 1){
							this.partition_id = item.value;  //子
						}
					})
				}else if(e.root.value == 'b'){
					// 筛选
					e.nodes.map((item,index)=>{
						console.log(index);
						if(index == 0){
							this.category_id = item.value;  //"分类",
						}else if(index == 1){
							this.brand_id = item.value;  //品牌
						}else if(index == 2){
							this.series_id = item.value;  //系列
						}else if(index == 3){
							this.machine_id = item.value;  //机型
						}
					})
				}
				this.erpusertaskproductFuc('refresh');
				
			},
			//接收菜单结果
			confirm(e) {
				this.indexArr = e.index;
				this.valueArr = e.value;

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
			erpusertaskproductFuc() {
				let that = this;
				let paramsData = {
					'page': this.pageIndex,
					'pagelist': this.pageLimit,
					'warehouse_id': this.warehouse_id,
					'partition_id': this.partition_id,
					'category_id': this.category_id,
					'brand_id': this.brand_id,
					'series_id': this.series_id,
					'machine_id': this.machine_id,
					// 'sn':this.snNumber,
					'keyword': this.storeName
				}
				erpUserTaskProduct(paramsData).then(res => {
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
			edit() {
				//编辑提交
				console.log(this.tiaojiaInfo);
				return;
				if (this.tiaojiaInfo.sales_price <= 0) {
					return uni.showToast({
						title: '价格不能为0小于0！',
						icon: 'none',
						position: 'top'
					});
				}
				erpusereditproductmoney({
						money: this.tiaojiaInfo.sales_price,
						peer_price: this.tiaojiaInfo.peer_price,
						cost_price: this.tiaojiaInfo.cost_price,
						goods_id: this.tiaojiaInfo.id
					}).then(res => {
						this.$u.toast('调价成功！');
						uni.startPullDownRefresh({

						})
					})
					.finally(() => {
						this.modalName = null
					})
				//回调后决定消失或继续编辑
			},
			copy(sn) {
				if(!sn){
					this.$u.toast('无序列号！');
					return;
				}
				//拷贝
				console.log('复制到剪贴板' + sn)
				uni.setClipboardData({
					data: sn
				});
			},
			showModal(info) {
				this.modalName = 'Modal';
				this.tiaojiaInfo = info;
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
	@import "@/uni_modules/mpb-ui/shop/sort_list.scss";
	page{
		background: #F0F0F0;
	}
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
			// line-height: 1;
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
