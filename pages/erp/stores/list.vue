<template>
	<view>
		<!--接入查找商品列表接口-->
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="cuIcon-scan" @tap="snTap" />
			</block>
		</bar-search-title>
		<LiFilter :isType="isType" @change="changebar" @select="selectbar" :datalist="filterData" :height="0.6"
			:isFixtop="false" :show="false"></LiFilter>
		<!--<filterDropdown :menuTop="filtertopnum" :updateMenuName="false" @confirm="confirm"></filterDropdown>-->


		<view class="margin-top-lg margin-bottom padding-bottom-sm padding-top-sm">
			<view class="cu-card article">
				<view class="cu-item bg-white margin-sm radius-4" v-for="(item,index) in dataList">
					<view class="title">
						<view class="text-cut">{{item.name}}</view>
					</view>
					<view class="content">
						<image :src="item.image" mode="aspectFill">
						</image>
						<view class="desc">
							<view class="text-content">
								<view class="text-sm">销售价:<text class="text-red">{{item.sales_price}}</text>元
									库存:{{item.stock}}<text class="margin-left-sm cuIcon-edit text-orange"
										@tap="showModal(item)" data-target="Modal">调价</text></view>
								<view class="text-sm">序列号：{{item.sn}} 
									<text class="margin-left-sm cuIcon-copy text-orange" @tap="copy(item.sn)">复制</text>
								</view>
								<view class="text-sm">销售价：{{item.sales_price}}元</view>
								<view class="text-sm">入库时间：{{item.updatetime}}</view>
							</view>
							<view>
								<view class="cu-tag bg-red light sm round">手机</view>
								<view class="cu-tag bg-blue light sm round">苹果</view>
								<!-- <view class="cu-tag bg-green light sm round" @tap="baogao">验机报告</view> -->
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
						<input class="border" v-model="tiaojiaInfo.sales_price" placeholder="请输入价格" name="input"
							value="10000"></input>
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
	// import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import filterDropdown from '@/components/HMERP-filterDropdown/HM-filterDropdown.vue';
	import LiFilter from '@/components/Li-Filter/Li-Filter.vue';

	import _tool from '@/utils/tools.js'; //工具函数
	import {
		erpProductStorelist,
		erpProductGetBasicData,
		erpusereditproductmoney
	} from "@/api/erpapi.js"
	export default {
		components: {
			barSearchTitle,
			filterDropdown,
			LiFilter,
			goodsSortList,
		},
		data() {
			return {
				fid: '',
				sid: '',
				dataList: [],
				tiaojiaInfo:'',
				ifBottomRefresh: false,
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				defaultSelected: [],
				isType:0,
				filterData: {},
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
				initFilterList: [],
				checkFilterList: [],
				lastcheckList:[],
				filtertopnum:'90',//筛选条高度
			}
		},
		onLoad(e) {
			// let filterbasicInfo = uni.getStorageSync('filterbasicInfo');
			// if(!filterbasicInfo){
			// 	this.erpProductGetBasicDataFuc()
			// }else{
			// 	filterbasicInfo = JSON.parse(filterbasicInfo);
			// 	this.filterInitData(filterbasicInfo);
			// }
			// #ifdef APP-PLUS
			this.filtertopnum = 160;
			// #endif
			this.erpProductGetBasicDataFuc();
			this.erpproductgetlistFuc();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.erpproductgetlistFuc('refresh');
		},
		//加载更多
		onReachBottom() {
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
				this.erpproductgetlistFuc('refresh');
				
			},
			filterInitData(data){
				let that = this;
				if (data) {
					// 仓库
					let filedata = data.house.map((item) => {
						let info = {
							name: item.name,
							value: item.id,
							submenu: [{
								name: item.name,
								value: item.id,
							}]
						}
						item.partition_list.map((childitem) => {
							let childinfo = {
								name: childitem.name,
								value: childitem.id,
							}
							info.submenu.push(childinfo);
						})
				
						return info
					})
					filedata.unshift({
						name: '全部仓库',
						value: '0',
						submenu: [{
							name: '全部仓库',
							value: '0'
						}]
					});
					that.filterData[0].submenu = filedata;
					//商品
					that.initFilterList.push(...data.category);
					// console.log(that.initFilterList);
					that.filterData[1].submenu[0].submenu = data.category;
				}
			},
			//接收菜单结果
			confirm(e) {
				console.log(e);
				this.indexArr = e.index;
				this.valueArr = e.value;

			},
			change(e) {
				// console.log('选中-》',e);
				this.getcheckfilterInfo(e.checkindex,e.value)
				// this.indexArr = e.index;
				// this.valueArr = e.value;

			},
			// 获取选中项
			getcheckfilterInfo(index,value) {
				let that = this;
				// let index = value[1].length - 1;
				// console.log(value);
				let cIndex = value[1];
				// console.log('cIndex',cIndex);
				// return;
				// let checkinfo = that.initFilterList[cIndex[0][0]].children[cIndex[1][0]].children[cIndex[0][0]].children
				// let checkinfo = that.initFilterList[cIndex[0][0]].children[cIndex[0][0]].children
				// console.log(checkinfo);
				// return;
				let info = '';
				switch(index){
					case 0:
					// console.log(that.initFilterList[cIndex[0][0]].children);
					info = {
						'name': '品牌',
						'submenu': [...that.initFilterList[cIndex[0][0]].children]
					}
					that.filterData[1]['submenu'][1] = info;
					break;
					case 1:
					// console.log(that.initFilterList[cIndex[0][0]].children[cIndex[1][0]].children);
					info = {
						'name': '系列',
						'submenu': [...that.initFilterList[cIndex[0][0]].children[cIndex[0][0]].children]
					}
					that.filterData[1]['submenu'][2] = info;
					break;
					case 2:
					info = {
						'name': '型号',
						'submenu': [...that.initFilterList[cIndex[0][0]].children[cIndex[0][0]].children[cIndex[0][0]].children]
					}
					that.filterData[1]['submenu'][3] = info;
					break;
					case 3:
					// 点击型号
					break;
				}
				
				that.filterData = JSON.parse(JSON.stringify(that.filterData));
				// console.log(that.filterData);
				// return;
				let datalen = that.filterData[1]['submenu'].length
				this.changeSelected(datalen);
			},
			//修改选中项-示例
			changeSelected(len) {
				let that = this;
				//设置选中项
				// 一下的注释是针对测试数据说明结构的意思，具体传入什么数据，要看你自己数据。如果data.js数据有修改，注意defaultSelected也要修改
				//传入defaultSelected的结构不能错，错了就报错运行异常。 不想选中的请传入null
				console.log(len);
				console.log('筛选数据->',this.filterData);
				// return;
				this.$nextTick(() => {
					let info = []
					for(let i = 0;i<len;i++){
						info.push([0])
						
					}
					
					// return;
					that.defaultSelected = [
						[null, null],
						[
							[0],
							[0],
						]
					]
				})
			},
			getArrDifference(arr1, arr2){
			  return arr1.concat(arr2).filter((v, i, arr) => {
			    return arr.indexOf(v) === arr.lastIndexOf(v);
			  })
			},
			erpproductgetlistFuc() {
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
				erpProductStorelist(paramsData).then(res => {
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
			edit() {
				//编辑提交
				if(this.tiaojiaInfo.sales_price<=0){
					return uni.showToast({
						title:'价格不能为0小于0！',
						icon:'none',
						position:'top'
					});
				}
				erpusereditproductmoney({
					money:this.tiaojiaInfo.sales_price,
					goods_id:this.tiaojiaInfo.goods_id
				}).then(res=>{
					this.$u.toast('调价成功！');
					uni.startPullDownRefresh({
						
					})
				})
				.finally(()=>{
					this.modalName = null
				})
			},
			copy(sn) {
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
