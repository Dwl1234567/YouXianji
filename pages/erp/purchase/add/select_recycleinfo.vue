<template>
	<view>
		<!--标题栏-->
		<view class="toolbar">
			<view class="header">
				<view class="goods-list-view">
					<view v-if="goods_info.image" class="cu-avatar lg radius"
						:style="[{backgroundImage:'url('+ goods_info.image +')'}]" />
					<view class="goods-info-view">
						<view class="text-black text-cut name">{{goods_info.name}}</view>
						<view class="tags">
							{{goodsdesc}}
						</view>
						<view class="text-price" v-if="forecastMoney > capacity20Money">
							{{forecastMoney}}
						</view>
						<view class="text-price" @click="callKefu()" v-else>
							<text>?</text>
							<text class="margin-left-sm cu-btn bg-red sm">咨询客服</text>
						</view>
					</view>
				</view>
				
			</view>
			<!--选项-->
			<view class="bg-white nav-tab-view">
				<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="tab_scroll">
					<block v-for="(tabitem,tabindex) in nav_list" :key="tabindex">
						<view class="cu-item" :class="tabindex == tab_cur?'select':''" @tap="tabSelect"
							:data-id="tabindex">
							<view :class="tabindex == tab_cur?'text-black':''">{{tabitem}}</view>
							<view class="tab-dot bg-red" />
						</view>
					</block>
				</scroll-view>
			</view>
		</view>

		<view class="hight-view" />
		<!--选项列表-->
		<block v-for="(item,index) in nav_list" :key="index">
			<view class="process-box" v-show="tab_cur == index">
				<scroll-view v-for="(recyitem,recyindex) in retrieveList[index]" :key="recyindex" scroll-y="true"
					class="scroll-Y">
					<SelectData :title="recyitem.name" :checklist="recyitem.child" @itemclick="moneyFuc">
					</SelectData>

				</scroll-view>
			</view>
		</block>
		<view class="hight-view" />
		<view class="bg-white orderview-footer-fixed">
			<view class="flex flex-direction" >
				<button class="cu-btn bg-red margin-tb-sm lg" @click="deliveryTap">属性确定</button>
			</view>
		</view>
	
	</view>
</template>

<script>
	import{
		erppurchaseclickattradd,
		erppurchasegetrecycleinfo
	} from "@/api/erpapi.js"
	import barTitle from '@/components/common/basics/bar-title';
	import {
		GodsgoodsDetail,
		GodsgoodsPrice,
		getUserMobile
	} from "@/api/common.js";
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	import {
		openQyKefu
	} from "@/utils/util.js"
	export default {
		components: {
			SelectData,
			barTitle
		},
		data() {
			return {
				tokenstatus: false,
				wxcode: '',
				goodsInfo: '',
				goods_info: '',
				goodsId: '',
				//选项卡
				tab_scroll: 0,
				tab_cur: 0,
				nav_list: [
					'物品信息',
					'成色情况',
					'功能情况',
					'维修情况'
				],
				retrieveList: [],
				forecastMoney: 0, //报价金额
				baseMoney: 0,
				capacity20Money: 0, // 容量
				goodsdesc: '--',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				Priceprams: {},
				detailId: ''
			}
		},
		onLoad(option) {
			this.goodsInfo = option;
			this.goodsId = option.id;
			this.getGodsgoodsDetail();
		},
		onShow() {
			let that = this;
			// #ifdef MP
			uni.login({
				success(res) {
					that.wxcode = res.code;
				}
			})
			let token = uni.getStorageSync('LOGIN_STATUS_TOKEN');
			if (token) {
				that.tokenstatus = true;
			}
			// #endif
		},
		methods: {
			moneyFuc(e) {
				let that = this;
				console.log(e);
				let ckindex = e.ckid.split('-');
				// console.log(ckindex);

				if (e.status == 1) {
					that.capacity20Money = Number(e.money) * 0.2;
				}

				this.retrieveList[Number(ckindex[0])][Number(ckindex[1])].child.forEach((item, index) => {
					if (index == Number(ckindex[2])) {
						item.checked = true;
					} else {
						item.checked = false;
					}
				})

				this.calcYuguMoney();

			},
			// 计算价格
			calcYuguMoney() {
				let that = this;
				let paramsdata = [];
				// that.forecastMoney = that.baseMoney;
				that.forecastMoney = 0;
				that.goodsdesc = '';

				that.retrieveList.forEach((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.child.forEach((iiitem, indexxx) => {
							if (iiitem.checked) {
								// paramsdata.push({iitem.key:iiitem.id});
								that.Priceprams[iitem.key] = iiitem.name;
								console.log('选中金额',iiitem.price);
								that.forecastMoney += Number(iiitem.price);
							}
						})
					})
				})

				console.log(that.Priceprams);
				// console.log(paramsdata);
			},
			getGodsgoodsDetail() {
				let that = this;
				let params = {
					'modeltype':1,
					'recycle_goods_id': that.goodsInfo.id,
					// 'cate_id': that.goodsInfo.cate_id,
					// 'goods_id': '1',
					// 'cate_id': '6'
				}
				erppurchasegetrecycleinfo(params).then(res => {
						if (res.code == 1) {
							// that.retrieveList = res.data.goods_list;
							that.retrieveList[0] = res.data.goods_info.base_json;

							that.goods_info = res.data.goods_info;
							that.baseMoney = res.data.goods_info.basemoney;
							// that.forecastMoney = res.data.goods_info.basemoney;
							// console.log(that.forecastMoney);
							that.addcheckattr();
							setTimeout(() => {
								that.retrieveList[1] = res.data.goods_info.colour_json;
								that.retrieveList[2] = res.data.goods_info.function_json;
								that.addcheckattr();
								this.calcYuguMoney();
							}, 500)
							// this.calcYuguMoney();
						}
					})
					.catch(err => {
						uni.showModal({
							title: '提示',
							content: err,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateBack({
										delta: -1
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					})
			},
			// 添加选择属性
			addcheckattr() {
				let that = this;
				that.retrieveList.map((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.child.map((iiitem, indexxx) => {
							if (indexxx == 0) {
								iiitem['checked'] = true;
								that.Priceprams[iitem.key] = iiitem.name;
							} else {
								iiitem['checked'] = false;
							}
							iiitem['ckid'] = index + '-' + indexx + '-' + indexxx;
						})
					})
				})
				// console.log(that.retrieveList);
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				// console.log(this.tab_cur);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			
			//属性确定
			deliveryTap() {
				erppurchaseclickattradd({
					goods_id:this.goodsInfo.id,
					value:JSON.stringify(this.Priceprams),
					name:this.goods_info.name,
					guide_price:this.forecastMoney
				}).then(res=>{
					uni.redirectTo({
						url:'/pages/erp/purchase/add/select_recycleform?id='+res.data
					})
				})
			},
		
		
			// 联系客服
			callKefu() {
				// #ifdef MP-WEIXIN
				// wx.openCustomerServiceChat({
				//   extInfo: {url: 'https://work.weixin.qq.com/kfid/kfccb4648b9af3bc58e'},
				//   corpId: 'ww373df77bd799d02f',
				//   success(res) {
				// 	  console.log(res);
				//   }
				// })
				openQyKefu();
				// #endif
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.toolbar {
		/* #ifndef H5 */
		top: 0;
		/* #endif */

		/* #ifdef H5 */
		top: 80rpx;
		/* #endif */

		position: fixed;
		z-index: 998;
		background-color: #FFFFFF;
		margin-bottom: 340rpx;
		width: 100%;

		.nav-tab-view {
			width: 100%;
			height: 80rpx;
		}

		.header {
			width: 100%;
			line-height: 80rpx;
			align-items: center;
			padding: 0 20rpx;
			border-bottom: 2rpx solid #dddddd;
			z-index: 999;

			.tips {
				height: 68rpx;
				line-height: 68rpx;
				font-size: 24rpx;
				color: #555555;
			}

			.tips-text {
				height: 30rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #555555;

				.cu-btn {
					padding: 0 10rpx;
					margin-left: 5rpx;
					background: #f03;
					color: #fff;
					height: 30rpx;
					line-height: 30rpx;
				}
			}

			.goods-list-view {
				position: relative;
				margin-top: 27.27rpx;

				.cu-avatar {
					position: absolute;
					width: 150.18rpx;
					height: 150.18rpx;
				}

				.goods-info-view {
					position: relative;
					padding-left: 176.36rpx;
					height: 150.18rpx;

					.name {
						position: relative;
						line-height: 50rpx;
						font-size: 36rpx;
					}

					.tags {
						line-height: 40rpx;
						font-size: 26rpx;
					}

					.text-price {
						font-weight: bold;
						line-height: 50rpx;
						margin-top: 9.09rpx;
						font-size: 36rpx;
						color: #f03;
					}
				}
			}
		}
	}

	.process-box {
		width: 100%;
		padding: 0 20rpx;

		.big-box {
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
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

	.getoffer-box {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
	}

	.nav.z .cu-item.select .tab-dot {
		width: 70%;
	}

	.uni-mask {
		background: rgba(0, 0, 0, .9);
	}

	.orderview-footer-fixed {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		box-shadow: 0 -3.63rpx 10.9rpx 0 #eaeaea;
		padding: 18.18rpx 27.27rpx;
		text-align: right;

		.cu-btn {
			margin-left: 10px;
		}
	}
</style>
