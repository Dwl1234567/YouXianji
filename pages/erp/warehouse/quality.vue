<template>
	<view class="">
		<view class="zaiui-bar-view-box">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<!--<view class="text-center text-black zaiui-small-routine-title">客户列表</view>-->
			<!-- #endif -->

			<!--标题栏-->
			<bar-title bgColor="bg-white" adress="/pages/tabbarerp/home">
				<block slot="content">仓库管理</block>
				<block slot="right">
					<button class="cu-btn sm line-red round" @tap="addCustomer">
						<text class="cuIcon-add" />
						添加仓库
					</button>
				</block>
			</bar-title>
		</view>

		<view>
			<!--为上面的临时筛选条进行的临时兼容处理-->
			<view class="margin-top-xl cu-card article">
				<view class="cu-item bg-white margin-sm radius-3 padding-sm" v-for="(item,index) in dataList" :key="index">
					<view class="">
						<view class="padding-xs flex justify-between text-xs">
							<view>仓库名称</view>
							<view>
								{{item.warehouseName}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--弹窗-->
			<view class="cu-modal" :class="modalName=='TongyongModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">{{title}}</view>
						<view class="action" @tap="tongyongHideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xs">
						<!--选项-->
						<view class="bg-white nav-tab-view">
							<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="tab_scroll">
								<block v-for="(tabitem,tabindex) in nav_list" :key="tabindex">
									<view class="cu-item" :class="tabindex == tab_cur?'select':''" @tap="tabSelect" :data-id="tabindex">
										<view :class="tabindex == tab_cur?'text-black':''">{{tabitem.name}}</view>
										<view class="tab-dot bg-red" />
									</view>
								</block>
							</scroll-view>
						</view>
						<!-- <view class="hight-view"></view> -->
						<!--选项列表  这里传recycle_goods_id向接口erp/product/getrecycleinfo请求数据，和回收点点报价一样-->
						<view class="process-box margin-top-sm">
							<block v-for="(item,index) in nav_list" :key="index">
								<scroll-view v-show="tab_cur == index" scroll-y="true" class="scroll-Y">

									<view class="recy-item" v-for="(citem,cindex) in item.child" :key="cindex">
										<view class="title">
											<text class="margin-right-xs">{{citem.name}}</text>
										</view>
										<!-- check-list -->
										<view class="check-list-box">
											<u-scroll-list :indicator="false">
												<view class="item" v-for="(checkitem,checkindex) in citem.child" :key="checkindex"
													@click="itemclick(index,cindex,checkindex)" :class="checkitem.click ? 'active':''">
													{{checkitem.name}}
												</view>
											</u-scroll-list>
										</view>
										<view class="text-left text-lightgrey"><input class="text-sm" placeholder="请输入备注信息"
												v-model="citem.remark" name="input"></input></view>
									</view>

								</scroll-view>
							</block>

						</view>

					</view>

					<!--售卖处理-->
					<view class="margin-bottom-lg">
						<view class="cu-form-group">
							<view class="title">是否直售</view>
							<switch @change="SwitchA" :class="iszs == 1?'checked':''" :checked="iszs == 0?false:true">
							</switch>
						</view>
						<view class="cu-form-group">
							<view class="title">是否抛售</view>
							<switch @change="SwitchB" :class="isps == 1?'checked':''" :checked="isps == 0?false:true">
							</switch>
						</view>
						<view class="" v-show="isps == 1">
							<view class="cu-form-group">
								<view class="title">抛售状态1</view>
								<view class="cu-capsule radius">
									<u-radio-group placement="row" v-model="radiovalue1" @change="groupChange">
										<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1" :key="index"
											:label="item.name" :name="item.value">
										</u-radio>
									</u-radio-group>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title">回收方</view>
								<view class="cu-capsule radius" @tap="hsfTap">
									<view class="">
										{{thirdInfo.name ? thirdInfo.name :'请选择回收方'}}
										<text class="cuIcon-right"></text>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-form-group">
							<view class="title">是否维修</view>
							<switch @change="SwitchC" :class="iswx == 1?'checked':''" :checked="iswx == 0?false:true">
							</switch>
						</view>
						<view class="" v-show="iswx == 1">
							<view class="cu-form-group">
								<view class="title">维修状态</view>
								<view class="cu-capsule radius">
									<u-radio-group placement="row" v-model="radiovalue2" @change="groupChange2">
										<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist2" :key="index"
											:label="item.name" :name="item.value">
										</u-radio>
									</u-radio-group>
								</view>
							</view>
							<view class="cu-form-group">
								<view class="title">维修成本</view>
								<input placeholder="维修成本金额" v-model="CostMoney" @input="costmoney"></input>
							</view>
							<view class="cu-form-group">
								<view class="title">维修备注</view>
								<input placeholder="请输入备注信息" v-model="remark" name="input"></input>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="tongyongHideModal">取消</button>
							<view class="">
								<button class="cu-btn bg-green margin-left" @tap="tongyongAction(1)">标记</button>
								<button class="cu-btn bg-red margin-left" @tap="tongyongAction(2)">提交</button>
							</view>
						</view>
					</view>

				</view>
			</view>
			<!-- 下拉加载提示 -->
			<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>

		</view>
	</view>
</template>

<script>
	import {
		erppurchasequalitylist,
		erppurchasequalityedit
	} from "@/api/erpapi.js";
	import {
		warehouseList
	} from "@/api/erp.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import filterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	export default {
		components: {
			barTitle,
			filterDropdown,
		},
		data() {
			return {
				storeId: 0,
				filtertopnum: '83', //筛选条高度
				defaultSelected: [],
				filterData: [{
					"name": '是否直售',
					"type": 'hierarchy',
					"submenu": []
				}],
				parentId: null,
				modalName: null,
				// modalName: 'TongyongModal1',
				type: 1,
				title: "分拣处理",
				tab_scroll: 0,
				tab_cur: 0,
				nav_list: [{
					name: '物品信息',
					child: []
				}, {
					name: '成色情况',
					child: []
				}, {
					name: '功能情况',
					child: []
				}, ],
				radiolist1: [{
						name: '待抛售',
						value: '1',
					},
					{
						name: '抛售中',
						value: '2',
					},
					{
						name: '已抛售',
						value: '3',
					},
				],
				radiovalue1: '',
				radiovalue2: '',
				radiolist2: [{
						name: '待送修',
						value: '1',
					},
					{
						name: '已送修',
						value: '2',
					},
					{
						name: '已取回',
						value: '3',
					},
				],
				checktitle: '',
				checkgoodsid: '',
				remark: '', //维修备注
				CostMoney: '',
				iszs: false,
				isps: true,
				iswx: false,
				switchstatus: false,
				retrieveList: [],
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh: false,
				dataList: [],
				thirdInfo: '',
				queryInfo: {
					pageNum: 1,
					pageSize: 20,
				},
				newnav_list: [],
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad(options) {
			// #ifdef APP-PLUS
			this.filtertopnum = 1;
			// #endif
			// 进入页面刷新
			this.storeId = uni.getStorageSync('userinfo').storeId
			this.getFaterList();
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryInfo.pageNum = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.pageNum += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		onShow() {
			let that = this;
			uni.$once('updatethird', function(data) {
				console.log(data);
				that.thirdInfo = data;
			})
		},
		methods: {
			confirm(e) {
				console.log(e.value[0][0])
				this.parentId = e.value[0][0];
				this.getDataList();
			},
			// 添加kehu
			addCustomer() {
				uni.navigateTo({
					url: "/pages/erp/warehouse/add"
				});
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			groupChange2(n) {
				console.log('groupChange', n);
			},
			hsfTap() {
				uni.navigateTo({
					url: '/pages/erp/third/list'
				})
			},
			copy(text) {
				uni.setClipboardData({
					data: text
				});
			},
			getFaterList() {
				warehouseList({
					storeId: this.storeId,
					parentId: 0
				}).then(res => {
					res.rows.map(item => {
						this.filterData[0].submenu.push({
							name: item.warehouseName,
							value: item.warehouseId
						})
					})
				})
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				paramsData.parentId = this.parentId;
				paramsData.storeId = this.storeId;
				warehouseList(paramsData).then(res => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.total == that.dataList.length ? 'noMore' : 'more'
						}

					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			tongyongTap(info, e) {
				this.nav_list[0].child = info.attr.base_json;
				this.nav_list[1].child = info.attr.colour_json;
				this.nav_list[2].child = info.attr.function_json;
				this.checktitle = info.title;
				this.checkgoodsid = info.recycle_goods_id;

				this.modalName = e;
			},
			tongyongHideModal(e) {
				this.modalName = null
			},
			tongyongAction(id) {
				console.log(id)
				let paramsData = {
					type: id,
					goods_id: this.checkgoodsid,
					zs_status: this.iszs ? '1' : '0',
					is_ps: this.isps ? '1' : '0',
					ps_status: this.radiovalue1,
					is_wx: this.iswx ? '1' : '0',
					wx_status: this.radiovalue2,
				}
				if (this.isps) {
					if (!this.radiovalue1) {
						return this.$u.toast('请选择抛售状态！')
					}
					if (!this.thirdInfo.id) {
						return this.$u.toast('请选择回收方！')
					}
				}
				if (this.iswx) {
					if (!this.radiovalue2) {
						return this.$u.toast('请选择维修状态！')
					}
					if (!this.CostMoney) {
						return this.$u.toast('请输入维修成本金额')
					}
					paramsData.third_id = this.thirdInfo.id;
					paramsData.costmoney = this.CostMoney;
					paramsData.remarks = this.remark;
				}
				let checkvalue = [];
				this.nav_list.map((item, index) => {
					item.child.map((item1, index1) => {
						item1.child.map((item2, index2) => {
							if (item2.click) {
								checkvalue.push(item2);
							}
						})
					})
				})
				paramsData.cart_info = JSON.stringify(checkvalue);
				if (id == 1) {
					paramsData.actiontype = 1;
				}
				if (id == 2) {
					paramsData.actiontype = 2;

				}
				console.log(paramsData);
				// return;
				erppurchasequalityedit(paramsData).then(res => {
					this.$u.toast('提交成功！')
					this.$nextTick(() => {
						uni.startPullDownRefresh();
					})
				})
				this.modalName = null
			},
			SwitchA(e) {
				this.iszs = e.detail.value
				if (this.iszs == 1) {
					this.isps = 0
				}
				console.log(this.iszs)
			},
			SwitchB(e) {
				this.isps = e.detail.value
				if (this.isps == 1) {
					this.iszs = 0
				}
			},
			SwitchC(e) {
				this.iswx = e.detail.value
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				console.log(this.tab_cur);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			itemclick(pindex, findex, mindex) {
				this.nav_list[pindex].child[findex].child.map((item, index) => {
					item.click = false;
				})
				this.nav_list[pindex].child[findex].child[mindex].click = true;
				this.newnav_list = this.nav_list;
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
	.tips {
		justify-content: space-between;
		display: flex;

		text {
			text-align: justify;
		}
	}

	.cu-card.article>.cu-item {
		.title {
			padding: 0 0 10rpx 0;
		}

		.content {
			uni-image {
				width: 5.4em;
				height: 5.4em;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.process-box {
		width: 100%;
		padding: 0 20rpx;

		// height: 300rpx;
		.scroll-Y {
			height: auto;
			max-height: 700rpx;
		}
	}

	.hight-view {
		/* #ifndef APP-PLUS */
		height: 280rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 320rpx;
		/* #endif */
	}

	.recy-item {
		width: 100%;
		position: relative;
		padding-bottom: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #EEEEEE;

		.title {
			width: 20%;
			text-align: left;
			font-size: 24rpx;
			color: #555555;
			position: absolute;
			left: 0;
		}

		.check-list-box {
			white-space: nowrap;
			overflow: hidden;
			padding-left: 20%;

			.active {
				color: #FFFFFF !important;
				background-color: #f03 !important;
			}

			.item {
				position: relative;
				display: inline-block;
				background-color: #eeeeee;
				color: #333333;
				width: auto;
				text-align: center;
				font-size: 24rpx;
				padding: 10rpx 20rpx;
				margin-right: 10rpx;

				.tipsbox {
					position: absolute;
					right: 0;
					top: 0;
					width: 88rpx;
					height: 88rpx;
				}

				.righticon {
					width: 80rpx;
					height: 80rpx;
					margin-top: 4rpx;
					margin-right: 4rpx;
					border-radius: 10rpx;
				}

				.tipsticon {
					width: 36rpx;
					height: 36rpx;
					border-radius: 10rpx;
				}
			}
		}
	}

	.cu-modal {
		z-index: 999;
	}

	.cu-form-group {
		min-height: 45px;
	}
</style>