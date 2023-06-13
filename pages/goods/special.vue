<template>
	<view>
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="苹果8p" @contentTap="searchTap">
			<block slot="right">
				<text class="cuIcon-service" />
			</block>
		</bar-search-title>

		<!-- <filterDropdown ref="filterDropdown" :menuTop="filterDropdowntop" :filterData="filterData" :defaultSelected="defaultSelected"
			:updateMenuName="true" @confirm="confirm" @change="changefilter" dataFormat="Object"></filterDropdown> -->
		<!-- <HM-filterDropdown :menuTop="downFiltertop" :filterData="downFilterData" :defaultSelected="dfDefaultSelected"
			:updateMenuName="true" @confirm="confirm" @filterLabelChange="filterLabelChange"
			dataFormat="Object"></HM-filterDropdown> -->
		<!--商品列表-->
		<view class="bg-white margin-top padding-bottom-sm padding-top-sm goods-list-view-box">
			<view :style="{marginTop: downFilterPlaceholderHeight + 'px'}">
				<!--商品列表1-->
				<goods-sort-list :list_data="goodsList" @listTap="goodsSortListTap"
					:show="TabCur==0?true:false"></goods-sort-list>
				<!--商品列表2-->
				<goods-sort-list :list_data="goodsList" @listTap="goodsSortListTap"
					:show="TabCur==1?true:false"></goods-sort-list>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import goodsSortList from '@/components/common/list/goods-sort-list';
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';

	import data from '@/static/data/shaixuan.js'; //筛选菜单数据
	import _sort_list_data from '@/static/data/sort_list.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		AdsIndex,
		ProductLists,
		ProductFuscreen,
		ProductFulists,
		ProductFilterchilren
	} from '@/api/mall.js';
	import {
		secondGoodsLists
	} from '@/api/malls.js';
	export default {
		components: {
			barSearchTitle,
			filterDropdown,
			goodsSortList,
		},
		data() {
			return {
				filterDropdowntop: 90, //筛选高度
				TabCur: 0,
				goodsList: [],
				bid: '',
				mid: '',
				cid: '',
				sid: '',
				by: '',
				price_type: '',
				colour: '',
				seachname: '',
				specList: {},
				specListdata: [],
				loadingType: 'more', //加载更多状态
				pageIndex: 1,
				pageLimit: 10,
				defaultSelected: [],
				filterData: [{
						name: '综合排序',
						type: 'hierarchy',
						submenu: [],
					},
					{
						name: '价格',
						type: 'hierarchy',
						submenu: [],
					},
					{
						name: '成色',
						type: 'hierarchy',
						submenu: [{
							name: '',
							submenu: [],
						}, ],
					},
					{
						name: '筛选',
						type: 'radio',
						submenu: [],
					},
				],
				initdata: '',
				checklist: [],
				type: '',

				downFiltertop: '90',
				downFilterPlaceholderHeight: '12',
				downFilterData: [], // 下拉筛选栏列表数据
				dfDefaultSelected: [],
				confirmSelectData: '',
			};
		},
		onLoad(e) {
			// // #ifdef APP-PLUS
			// if (plus.os.name = 'Android') {
			// 	this.downFilterPlaceholderHeight = '14'
			// } else {
			// 	this.downFilterPlaceholderHeight = '12'
			// }
			// // #endif
			this.initDownFilter(e);

			// console.log(e);
			if (e.cid) {
				this.cid = e.cid;
			}
			if (e.bid) {
				this.bid = e.bid;
			}
			if (e.sid) {
				this.sid = e.sid;
			}
			if (e.mid) {
				this.mid = e.mid;
			}
			this.type = e.type;
			this.loadPage();
			// this.GetgoodsData('refresh', 1);
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getgoodsList('refresh');
		},
		//加载更多
		onReachBottom() {
			this.getgoodsList();
		},
		onReady() {
			let heightbar = uni.getSystemInfoSync().statusBarHeight * 2 + 101 - 10;
			this.filterDropdowntop = heightbar;
			// console.log('设备信息',heightbar);
			_tool.setBarColor(true); //设置状态栏颜色
		},
		methods: {
			initDownFilter(e) {
				// 下拉筛选距离顶部的高度
				// #ifdef APP-PLUS
				if (plus.os.name === 'Android') {
					this.downFiltertop = '160';
				} else {
					this.downFiltertop = '137';
				}
				// #endif
			},
			filterLabelChange({
				page_index,
				box_index,
				label_index,
				box
			}) {
				console.log('filterLabelChange emit');
				console.log(box);

				let clickSelf = false;

				console.log('dfDefaultSelected', this.dfDefaultSelected);
				let activeIndex = this.dfDefaultSelected[page_index][box_index][0];
				if (activeIndex == label_index) {
					this.downFilterData[page_index].submenu[box_index].submenu[activeIndex].selected = false;
					this.dfDefaultSelected[page_index][box_index][0] = null;

					clickSelf = true;
				} else {
					if (activeIndex != null && activeIndex < this.downFilterData[page_index].submenu[box_index].submenu.length) {
						box.submenu[activeIndex].selected = false;
						let boxss = box;
						this.downFilterData[page_index].submenu.splice(box_index, 1, boxss);
						// this.downFilterData[page_index].submenu[box_index].submenu[activeIndex].selected = false;
					}

					this.downFilterData[page_index].submenu[box_index].submenu[label_index].selected = true;
					this.dfDefaultSelected[page_index][box_index][0] = label_index;
				}

				console.log('clickSelf->', clickSelf);

				if (page_index === this.downFilterData.length - 1) {
					if (box.cascade > 0) {
						// >0代表级联节点，可以获取下级节点
						// 判断当前box是否是联级关系（即存在父级或子级分类）,只有为联级关系的box才进行对下级节点的获取或删除操作
						if (clickSelf === true) {
							// 选中状态下的反选
							if (!(box.deep > 0)) {
								let delNodeCount = 0;
								for (let i = box_index + 1; i < this.downFilterData[page_index].submenu.length; i++) {
									if (box.cascade > 0) {
										delNodeCount++;
									}
								}

								// let delNodeCount = this.cascadeCount - box_index
								// if (delNodeCount < 0) delNodeCount = 0
								console.log('delNodeCount', delNodeCount);
								this.downFilterData[page_index].submenu.splice(box_index + 1, delNodeCount);
								let curlength = this.downFilterData[page_index].submenu.length;
								let actlength = this.dfDefaultSelected[page_index].length;
								if (curlength < actlength) {
									this.dfDefaultSelected[page_index].splice(box_index + 1, actlength - curlength);
								}
							}
							// this.downFilterData[page_index].submenu[box_index].submenu[activeIndex].selected = false;
							// this.dfDefaultSelected[page_index][box_index][0] = null;

							box.submenu[label_index].selected = false;
							let boxss = box;
							this.downFilterData[page_index].submenu.splice(box_index, 1, boxss);
							this.dfDefaultSelected[page_index].splice(box_index, 1, [null]);
						} else {
							if (!(box.deep > 0)) {
								let delNodeCount = 0;

								for (let i = box_index + 1; i <= this.downFilterData[page_index].submenu.length; i++) {
									if (this.downFilterData[page_index].submenu[i]?.cascade > 0) {
										delNodeCount++;
									}
								}

								// let delNodeCount = this.cascadeCount - box_index
								// if (delNodeCount < 0) delNodeCount = 0
								console.log('delNodeCount', delNodeCount);
								this.downFilterData[page_index].submenu.splice(box_index + 1, delNodeCount);
								let curlength = this.downFilterData[page_index].submenu.length;
								let actlength = this.dfDefaultSelected[page_index].length;
								if (curlength < actlength) {
									this.dfDefaultSelected[page_index].splice(box_index + 1, actlength - curlength);
								}
							}

							// this.subData[page_index].submenu[box_index].submenu[activeIndex].selected = false;
							this.dfDefaultSelected[page_index][box_index][0] = null;

							// 选中box下的某个label
							// 请求该label下级数据
							// 将label对应的value作为请求接口的参数
							// let param = box.submenu[label_index].value
							let subData = '';
							if (box.cascade > 0 && box.deep !== 1) {
								ProductFilterchilren({
									key: box.submenu[label_index].key,
									value: box.submenu[label_index].value,
								}).then((res) => {
									console.log(res);
									if (res && res.code === 1) {
										if (res.data.length > 0) {
											for (let i = 0; i < res.data.length; i++) {
												this.downFilterData[page_index].submenu.splice(box_index + i + 1, 0, res.data[i]);
												this.dfDefaultSelected[page_index].splice(box_index + i + 1, 0, [null]);
											}
										}
										box.submenu[label_index].selected = true;
										let boxss = box;
										// this.downFilterData[page_index].submenu[box_index].submenu[label_index].selected = true;
										// this.dfDefaultSelected[page_index][box_index][0] = label_index;
										this.downFilterData[page_index].submenu.splice(box_index, 1, boxss);
										this.dfDefaultSelected[page_index].splice(box_index, 1, [label_index]);
									}
								});
							} else {
								box.submenu[label_index].selected = true;
								let boxss = box;
								// this.downFilterData[page_index].submenu[box_index].submenu[label_index].selected = true;
								// this.dfDefaultSelected[page_index][box_index][0] = label_index;
								this.downFilterData[page_index].submenu.splice(box_index, 1, boxss);
								this.dfDefaultSelected[page_index].splice(box_index, 1, [label_index]);
							}
						}
					}
				}
			},
			// 初始化页面
			loadPage() {
				// let that = this;
				// let params = {
				// 	'cid': that.cid,
				// 	'bid': that.bid,
				// 	'sid': that.sid,
				// 	'mid': that.mid,
				// }
				// // console.log(params);
				// ProductFuscreen(params).then(res => {
				// 	that.initdata = res.data;
				// 	that.filterData[0].submenu = res.data.by.child;
				// 	that.filterData[1].submenu = res.data.price_type.child;
				// 	that.filterData[2].submenu = res.data.colour.child;

				// 	// --筛选
				// 	if (this.$api.isNotEmpty(res.data.cate.child)) {
				// 		let cateinfo = {
				// 			'name': res.data.cate.name,
				// 			'submenu': res.data.cate.child
				// 		}
				// 		that.filterData[3]['submenu'][0] = cateinfo;
				// 	}

				// 	if (this.$api.isNotEmpty(res.data.brand.child)) {
				// 		let brandinfo = {
				// 			'name': res.data.brand.name,
				// 			'submenu': res.data.brand.child
				// 		}
				// 		that.filterData[3]['submenu'][1] = brandinfo;
				// 	}
				// 	if (this.$api.isNotEmpty(res.data.series.child)) {
				// 		let seriesinfo = {
				// 			'name': res.data.series.name,
				// 			'submenu': res.data.series.child
				// 		}
				// 		that.filterData[3]['submenu'][2] = seriesinfo;
				// 	}
				// 	if (this.$api.isNotEmpty(res.data.machine.child)) {
				// 		let machineinfo = {
				// 			'name': res.data.machine.name,
				// 			'submenu': res.data.machine.child
				// 		}
				// 		that.filterData[3]['submenu'][3] = machineinfo;
				// 	}

				// 	let speclist = res.data.spec;
				// 	that.specListdata = res.data.spec;
				// 	speclist.forEach((item, index) => {
				// 		let specinfo = {
				// 			'name': item.name,
				// 			'submenu': item.child
				// 		}
				// 		that.filterData[3]['submenu'][4 + index] = specinfo;
				// 	})
				// 	this.changeSelected();
				// })
				this.getgoodsList();
			},
			// 重置筛选菜单
			// resetfileder(type) {
			// 	let that = this;
			// 	let params = {
			// 		'cid': that.cid,
			// 		'bid': that.bid,
			// 		'sid': that.sid,
			// 		'mid': that.mid,
			// 	}
			// 	// console.log(params);
			// 	ProductFuscreen(params).then(res => {
			// 		that.initdata = res.data;
			// 		that.filterData[0].submenu = res.data.by.child;
			// 		that.filterData[1].submenu = res.data.price_type.child;
			// 		that.filterData[2].submenu = res.data.colour.child;
			// 		that.filterData[3].submenu = [];
			// 		// --筛选
			// 		if (this.$api.isNotEmpty(res.data.cate.child)) {
			// 			let cateinfo = {
			// 				'name': res.data.cate.name,
			// 				'submenu': res.data.cate.child
			// 			}
			// 			that.filterData[3]['submenu'][0] = cateinfo;
			// 		}

			// 		if (this.$api.isNotEmpty(res.data.brand.child)) {
			// 			let brandinfo = {
			// 				'name': res.data.brand.name,
			// 				'submenu': res.data.brand.child
			// 			}
			// 			that.filterData[3]['submenu'][1] = brandinfo;
			// 		}
			// 		if (this.$api.isNotEmpty(res.data.series.child)) {
			// 			let seriesinfo = {
			// 				'name': res.data.series.name,
			// 				'submenu': res.data.series.child
			// 			}
			// 			that.filterData[3]['submenu'][2] = seriesinfo;
			// 		}
			// 		if (this.$api.isNotEmpty(res.data.machine.child)) {
			// 			let machineinfo = {
			// 				'name': res.data.machine.name,
			// 				'submenu': res.data.machine.child
			// 			}
			// 			that.filterData[3]['submenu'][3] = machineinfo;
			// 		}

			// 		let speclist = res.data.spec;
			// 		that.specListdata = res.data.spec;
			// 		speclist.forEach((item, index) => {
			// 			// console.log(index);
			// 			let specinfo = {
			// 				'name': item.name,
			// 				'submenu': item.child
			// 			}
			// 			that.filterData[3]['submenu'][4 + index] = specinfo;
			// 		})
			// 		console.log(that.filterData);
			// 		this.changeSelected(1, type);
			// 	})
			// },
			getgoodsList(type = 'add', loading) {
				let that = this;
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more';
				}

				if (type === 'refresh') {
					this.goodsList = [];
					this.pageIndex = 1;
				}

				let params = {};
				if (this.type == 3) {
					params = {
						specialSaleAble: 1,
						pageSize: that.pageLimit,
						pageNum: that.pageIndex,
					};
				}
				if (this.type == 2) {
					params = {
						hotAble: 1,
						pageSize: that.pageLimit,
						pageNum: that.pageIndex,
					};
				}
				if (this.type == 4) {
					params = {
						distributionAble: 1,
						pageSize: that.pageLimit,
						pageNum: that.pageIndex,
					};
				}
				if (this.specList) {
					params = Object.assign(params, this.specList);
				}
				// console.log(params);
				// return false;
				secondGoodsLists(params)
					.then((res) => {
						if (!res.rows) {
							that.$u.toast(res.msg);
							this.loadingType = 'nomore';
							return;
						}
						let goodsList = res.rows;
						if (!goodsList) {
							that.$u.toast(res.msg);
							this.loadingType = 'nomore';
							return;
						}

						this.goodsList = this.goodsList.concat(goodsList);

						//判断是否还有下一页，有是more  没有是nomore
						this.loadingType = goodsList.length > that.pageLimit ? 'nomore' : 'more';
						if (goodsList.length < that.pageLimit) {
							this.loadingType = 'nomore';
						} else {
							this.loadingType = 'more';
							this.pageIndex++;
						}
					})
					.finally((com) => {
						uni.stopPullDownRefresh();
					});
				if (type === 'refresh') {
					if (loading == 1) {
						uni.hideLoading();
					} else {
						uni.stopPullDownRefresh();
					}
				}
			},
			//接收菜单结果
			confirm(e) {
				this.confirmSelectData = JSON.stringify(e);

				let that = this;
				if (this.$api.isNotEmpty(e.value[3][0])) {
					that.cid = e.value[3][0][0];
				} else {
					that.cid = '';
				}
				if (this.$api.isNotEmpty(e.value[3][1])) {
					that.bid = e.value[3][1][0];
				} else {
					that.bid = '';
				}
				if (this.$api.isNotEmpty(e.value[3][2])) {
					that.sid = e.value[3][2][0];
				} else {
					that.sid = '';
				}
				if (this.$api.isNotEmpty(e.value[3][3])) {
					that.mid = e.value[3][3][0];
				} else {
					that.mid = '';
				}
				if (e.value[0][0]) {
					that.by = e.value[0][0];
					this.dfDefaultSelected[0].splice(0, 1, e.index[0][0]);
					// this.dfDefaultSelected[0][0] = e.index[0][0]
				} else {
					that.by = '';
				}
				if (e.value[1][0]) {
					that.price_type = e.value[1][0];
					this.dfDefaultSelected[1].splice(0, 1, e.index[1][0]);
					// this.dfDefaultSelected[1][0] = e.index[1][0]
				} else {
					that.price_type = '';
				}
				if (e.value[2][0]) {
					that.colour = e.value[2][0];
					this.dfDefaultSelected[2].splice(0, 1, e.index[2][0]);
					// this.dfDefaultSelected[2][0] = e.index[2][0]
				} else {
					that.colour = '';
				}
				let spec = '';
				if (e.value[3].length > 4) {
					for (let i = 4; i < e.value[3].length; i++) {
						if (e.value[3][i][0]) {
							spec += ',' + e.value[3][i][0];
						}
					}
					that.spec = spec.substr(1);
					// console.log('spec', that.spec)
				}
				// that.specListdata.forEach((item, index) => {
				// 	if (e.value[3][3 + index][0]) {
				// 		that.specList[item.name] = e.value[3][3 + index][0];
				// 	}
				// })
				// console.log(that.specList);
				// return false;
				this.getgoodsList('refresh');
			},
			// 点击筛选
			// changefilter(e) {
			// 	// console.log(e.index);
			// 	// return false;
			// 	let that = this;
			// 	that.checklist = [];
			// 	that.checklist.push(...e.index);
			// 	console.log(that.checklist);
			// 	// return false;
			// 	if (e.value[3][0] && that.cid != e.value[3][0][0]) {
			// 		that.cid = e.value[3][0][0];
			// 		that.bid = '';
			// 		that.sid = '';
			// 		that.mid = '';
			// 		this.resetfileder(1);
			// 	} else {
			// 		if (e.value[3][1] && that.bid != e.value[3][1][0]) {
			// 			that.bid = e.value[3][1][0];
			// 			that.sid = '';
			// 			that.mid = '';
			// 			this.resetfileder(2);
			// 		} else {
			// 			if (e.value[3][2] && that.sid != e.value[3][2][0]) {
			// 				that.sid = e.value[3][2][0];
			// 				that.mid = '';
			// 				this.resetfileder(3);
			// 			} else {
			// 				if (e.value[3][3] && that.mid != e.value[3][3][0]) {
			// 					that.mid = e.value[3][3][0];
			// 					this.resetfileder(4);
			// 				} else {
			// 					// console.log(that.filterData[3]);
			// 					that.cid = '';
			// 					that.bid = '';
			// 					that.sid = '';
			// 					that.mid = '';
			// 					this.resetfileder(5);
			// 				}
			// 			}
			// 		}
			// 	}
			// 	// this.resetfileder();
			// },
			//修改选中项-示例
			// changeSelected(type = 0, id) {
			// 	//设置选中项
			// 	// 一下的注释是针对测试数据说明结构的意思，具体传入什么数据，要看你自己数据。如果data.js数据有修改，注意defaultSelected也要修改
			// 	//传入defaultSelected的结构不能错，错了就报错运行异常。 不想选中的请传入null
			// 	let that = this;
			// 	that.defaultSelected = [];
			// 	if (type == 1) {
			// 		that.$nextTick(() => {
			// 			that.defaultSelected.push(...that.checklist);
			// 			that.defaultSelected[3] = [];
			// 			console.log(that.filterData[3].submenu);
			// 			// console.log(that.cid);
			// 			// console.log(that.bid);
			// 			// console.log(that.mid);
			// 			// console.log(that.sid);
			// 			// that.filterData[3].submenu.forEach((item, index) => {
			// 			switch (id) {
			// 				case 1:
			// 					that.filterData[3].submenu[0].submenu.map((item1, index1) => {
			// 						if (item1.id == that.cid) {
			// 							that.defaultSelected[3][0] = [index1];
			// 							for (let i = 1; i < that.filterData[3].submenu.length; i++) {
			// 								that.defaultSelected[3][i] = [null];
			// 							}
			// 						}
			// 					})
			// 					break;
			// 				case 2:
			// 					that.defaultSelected[3][0] = that.checklist[3][0];
			// 					that.filterData[3].submenu[1].submenu.map((item1, index1) => {
			// 						if (item1.id == that.bid) {
			// 							that.defaultSelected[3][1] = [index1];
			// 							for (let i = 2; i < that.filterData[3].submenu.length; i++) {
			// 								that.defaultSelected[3][i] = [null];
			// 							}
			// 						}
			// 					})
			// 					break;
			// 				case 3:
			// 					that.defaultSelected[3][0] = that.checklist[3][0];
			// 					that.defaultSelected[3][1] = that.checklist[3][1];
			// 					that.filterData[3].submenu[2].submenu.map((item1, index1) => {
			// 						if (item1.id == that.sid) {
			// 							that.defaultSelected[3][2] = [index1];
			// 							for (let i = 3; i < that.filterData[3].submenu.length; i++) {
			// 								that.defaultSelected[3][i] = [null];
			// 							}
			// 						}
			// 					})
			// 					break;
			// 				case 4:
			// 					that.defaultSelected[3][0] = that.checklist[3][0];
			// 					that.defaultSelected[3][1] = that.checklist[3][1];
			// 					that.defaultSelected[3][2] = that.checklist[3][2];
			// 					that.filterData[3].submenu[3].submenu.map((item1, index1) => {
			// 						if (item1.id == that.mid) {
			// 							that.defaultSelected[3][3] = [index1];
			// 							for (let i = 4; i < that.filterData[3].submenu.length; i++) {
			// 								that.defaultSelected[3][i] = [null];
			// 							}
			// 						}
			// 					})
			// 					break;
			// 				case 5:

			// 					break;
			// 			}
			// 			// })
			// 			// let pageindexlist = JSON.parse(JSON.stringify(that.defaultSelected))
			// 			// that.defaultSelected[3] = [[1],[1],[1],[1]]
			// 			console.log(that.defaultSelected);
			// 			// console.log(pageindexlist);
			// 			setTimeout(() => {
			// 				this.$refs.filterDropdown.processPage(3);
			// 			}, 0)

			// 		})
			// 	} else {
			// 		that.$nextTick(() => {
			// 			that.defaultSelected = [
			// 				[null],
			// 				[null],
			// 				[null],
			// 				[]
			// 			];

			// 			that.filterData[3].submenu.forEach((item, index) => {
			// 				// console.log(item);
			// 				if (that.cid && index == 0) {
			// 					item.submenu.forEach((item1, index1) => {
			// 						if (that.cid == item1.id) {
			// 							that.defaultSelected[3][0] = [index1]
			// 						}
			// 					})
			// 				} else if (that.bid && index == 1) {
			// 					item.submenu.forEach((item2, index2) => {
			// 						if (that.bid == item2.id) {
			// 							that.defaultSelected[3][1] = [index2]
			// 						}
			// 					})
			// 				} else if (that.sid && index == 2) {
			// 					item.submenu.forEach((item3, index3) => {
			// 						if (that.sid == item3.id) {
			// 							that.defaultSelected[3][2] = [index3]
			// 						}
			// 					})
			// 				} else if (that.mid && index == 3) {
			// 					item.submenu.forEach((item4, index4) => {
			// 						if (that.mid == item4.id) {
			// 							that.defaultSelected[3][3] = [index4]
			// 						}
			// 					})
			// 				} else {
			// 					that.defaultSelected[3][index] = [null];
			// 				}
			// 			})
			// 			// console.log(that.defaultSelected);
			// 		})
			// 	}
			// },
			goodsSortListTap(e) {
				console.log(e);

				uni.navigateTo({
					url: '/pages/goods/goods?id=' + e.data.product_id,
				});
			},
			searchTap() {
				uni.navigateTo({
					url: '/pages/home/search',
				});
			},
		},
	};
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import '/uni_modules/colorui/main.css';
	@import '/uni_modules/colorui/icon.css';
	@import '@/uni_modules/mpb-ui/shop/app.scss';
	/* #endif */
	@import '@/uni_modules/mpb-ui/shop/sort_list.scss';
</style>