<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">机器报价</block>
		</bar-title> -->
		<view class="toolbar">
			<view class="header">
				<!--{{PhoneName}}-->
				<view class="goods-list-view">
					<view v-if="goods_info.image" class="cu-avatar lg radius"
						:style="[{backgroundImage:'url('+ goods_info.image +')'}]" />
					<view class="goods-info-view">
						<view class="text-black text-cut name">{{goods_info.name}}</view>
						<view class="tags">
							{{goodsdesc}}
						</view>
						<view class="text-price" v-if="forecastMoney > capacity20Money">
							<text class="text-xxl">{{forecastMoney}}</text>
						</view>
						<view class="text-price" @click="callKefu()" v-else>
							<text class="text-xxl">?</text>
							<text class="margin-left-sm cu-btn bg-red sm">咨询客服</text>
						</view>
					</view>
				</view>
				<view class="tips">
					<text class="cuIcon-info" />
					<text v-if="forecastMoney > 0">选择全部物品信息后，系统将显示最优情况的价格</text>
					<text v-else>由于您的设备问题过多无法准确报价、建议咨询人工客服。</text>
				</view>

				<view class="tips-text margin-bottom-sm">
					<text class=""><text class="cuIcon-info" />如您认为该价格与市场价不符</text>
					<text class="cu-btn sm" @click="callKefu()">去反馈</text>
				</view>
			</view>
			<!--选项-->
			<view class="bg-white nav-tab-view">
				<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="tab_scroll">
					<block v-for="(tabitem,tabindex) in nav_list" :key="tabindex">
						<view class="cu-item" :class="tabindex == tab_cur?'select':''" @tap="tabSelect"
							:data-id="tabindex">
							<view :class="tabindex == tab_cur?'text-101010':''">{{tabitem}}</view>
							<view class="tab-dot text-color-yellow" />
						</view>
					</block>
				</scroll-view>
			</view>
		</view>

		<view class="hight-view" />
		<!--选项列表-->
		<block v-for="(item,index) in nav_list" :key="index">
			<view class="process-box" v-show="tab_cur == index">
				<scroll-view scroll-y="true"
					class="scroll-Y" v-for="item in basicPrice">
					<!-- {{recyitem}} -->
					<SelectDataFirst title="机器SKU" :checklist="item" @itemclick="moneyFucs">
					</SelectDataFirst>
					<!-- {{basicPrice}} -->
				</scroll-view>
				<scroll-view v-for="(recyitem,recyindex) in retrieveList[index]" :key="recyindex" scroll-y="true"
					class="scroll-Y">
					<!-- {{recyitem}} -->
					<SelectData :title="recyitem.name" :checklist="recyitem.value" @itemclick="moneyFuc">
					</SelectData>
					<!-- {{recyitem}} -->
				</scroll-view>
			</view>
		</block>
		<view class="hight-view" />
		<view class="bg-white orderview-footer-fixed">
			<view class="flex flex-direction">
				<button class="cu-btn text-color-yellow margin-tb-sm lg radius-4" @click="deliveryTap">下一步</button>
			</view>
		</view>
		<!--
		<view class="getoffer-box">
			<u-button text="立即提交" class="bg-red"
				:customStyle="{height:'88rpx',borderRadius:'30rpx',color:'#ffffff',backgroundColor:'#e54d42'}"
				@tap="deliveryTap"></u-button>
		</view>
		-->


	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	// import {
	// 	GodsgoodsDetail,
	// 	GodsgoodsPrice,
	// 	getUserMobile
	// } from "@/api/common.js";
	import {
		getPriceTemplateByModel
	} from "@/api/retrieve.js";
	import { getInfoByRecycleOrderId } from '@/api/erp.js'
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	import SelectDataFirst from '@/components/RecyclingList/SelectDataFirst.vue';
	import {
		openQyKefu
	} from "@/utils/util.js"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			SelectDataFirst,
			SelectData,
			barTitle
		},
		data() {
			return {
				priceId: 0,
				allPrice:0,
				basicPrice: [],
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
				Pricepramitems: [],
				detailId: '',
				qualityInfo: null
			}
		},
		onLoad(option) {
			// let data = JSON.parse(decodeURIComponent(option.data))
			this.recycleOrderId = option.recycleOrderId
			this.goodsInfo = option;
			this.goodsId = option.modelId;
			this.modelName = option.modelName
			this.type = option.type;
			this.getInfoByRecycleOrderId(option.recycleOrderId)
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
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			getInfoByRecycleOrderId(recycleOrderId) {
				getInfoByRecycleOrderId(recycleOrderId).then(res => {
					this.qualityInfo = JSON.parse(res.data.qualityInfo);
					console.log(this.qualityInfo)
				});
			},
			moneyFucs(e) {
				this.allPrice = e.basicPrice;
				this.calcYuguMoney();
			},
			moneyFuc(e) {
				let that = this;
				let ckindex = e.ckid.split('-');
			
				if (e.status == 1) {
					that.capacity20Money = Number(e.money) * 0.2;
				}
				this.retrieveList[Number(ckindex[0])][Number(ckindex[1])].value.forEach((item, index) => {
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
				// let paramsdata = [];
				//that.forecastMoney = that.baseMoney;
				that.forecastMoney = 0;
				that.allPrice = 0;
				that.itemPrice = 0
				that.goodsdesc = '';
				that.Pricepramitems = []
				that.basicPrice[0].map(item => {
					if (item.checked) {
						that.allPrice = item.basicPrice;
						that.priceId = item.priceId;
					}
				})
				that.retrieveList.forEach((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.value.forEach((iiitem, indexxx) => {
							if (iiitem.checked) {
								that.itemPrice += Number(iiitem.price);
								// console.log(that.retrieveList[0].length, indexx, indexs)
								that.Priceprams[iitem.keyId] = indexxx;
								that.Pricepramitems.push({
									keyId:iitem.keyId,
									valueId:iiitem.valueId,
									key: iitem.name,
									value: iiitem.value,
									indexs: iitem.indexs
								})
								if (index == 0 && iitem.key != 'small') {
									that.goodsdesc = that.goodsdesc + iiitem.value + ' | ';
								}
							}
						})
					})
				})
				that.forecastMoney = that.allPrice - that.itemPrice
				uni.setStorageSync('goodsdesc', that.goodsdesc)
				uni.setStorageSync('Priceprams', that.Priceprams)
				uni.setStorageSync('Pricepramitems', that.Pricepramitems)
				// console.log('总价：');
				// console.log(that.forecastMoney);
				// console.log('that.Priceprams',that.Priceprams);
				// console.log('that.Pricepramitems', that.Pricepramitems);
			},
			getGodsgoodsDetail() {
				let that = this;
				getPriceTemplateByModel(that.goodsId).then(res => {
						if (res.code == 200) {
							// that.retrieveList = res.data.goods_list;
							const dataListNum = [
								res.data.propPrice[0].length,
								res.data.propPrice[1].length,
								res.data.propPrice[2].length,
								res.data.propPrice[3].length
							]
							uni.setStorageSync('dataListNum', dataListNum)
							that.retrieveList[0] = res.data.propPrice[0];
							res.data.propPrice[0].map(item => {
								item.indexs = 1
								return item
							})
							res.data.propPrice[1].map(item => {
								item.indexs = 2
								return item
							})
							res.data.propPrice[2].map(item => {
								item.indexs = 3
								return item
							})
							res.data.propPrice[3].map(item => {
								item.indexs = 4
								return item
							})
							that.basicPrice = [res.data.basicPrice]	
							that.retrieveList = res.data.propPrice
							that.goods_info = res.data.model;
							if (that.qualityInfo) {
								that.editcheckatter();
								setTimeout(() => {
									that.editcheckatter();
									this.calcYuguMoney();
								}, 500)
							} else {
								that.addcheckattr();
								setTimeout(() => {
									that.addcheckattr();
									this.calcYuguMoney();
								}, 500)
							}
							
							
						}
					})
					.catch(err => {
						uni.showModal({
							title: '提示',
							content: err,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack({
										delta: -1
									})
								} else if (res.cancel) {
								}
							}
						});
					})
			},
			// 添加选择熟悉
			addcheckattr() {
				let that = this;
				that.retrieveList.map((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.value.map((iiitem, indexxx) => {
							if (indexxx == 0) {
								iiitem['checked'] = true;
							} else {
								iiitem['checked'] = false;
							}
							iiitem['ckid'] = index + '-' + indexx + '-' + indexxx;
						})
					})
				})
				that.basicPrice.map((item,index) => {
				})
			},
			// 修改
			editcheckatter () {
				let that = this;
				for (var key in that.qualityInfo){
					// 第一层循环
					that.retrieveList.map((item, index) => {
						// 循环物品信息，成色情况，功能情况
						item.forEach((iitem, iindex) =>{
							// 循环分类下每一个小选择项目 
							iitem.value.forEach((iiitem,iiindex) => {
								if (iitem.keyId == key) {
									if (iiindex == that.qualityInfo[key]) {
										iiitem.checked = true;
									} else {
										iiitem.checked = false;
									}
									iiitem['ckid'] = index + '-' + iindex + '-' + iiindex;
								}
							});
						})
					})
				}
				const basicPriceId = uni.getStorageSync('basicPriceId')
				that.basicPrice[0].map((item,index) => {
					if (item.priceId == basicPriceId) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
				
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			// 获取报价
			getGodsgoodsPrice() {
				uni.navigateTo({
					url: 'form?type=' + this.type + '&goodsId=' + this.goodsId + '&modelName=' + this.modelName + '&forecastMoney=' + this.forecastMoney
				})
			},
			//去发货
			async deliveryTap() {
				uni.navigateTo({
					url: '/pages/erp/purchase/add/select_recycleform?forecastMoney=' + this.forecastMoney + '&recycleOrderId=' + this.recycleOrderId,
				});
			},
			upper: function(e) {
			},
			lower: function(e) {
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 联系客服
			callKefu() {
				// #ifdef MP-WEIXIN
				// wx.openCustomerServiceChat({
				//   extInfo: {url: 'https://work.weixin.qq.com/kfid/kfccb4648b9af3bc58e'},
				//   corpId: 'ww373df77bd799d02f',
				//   success(res) {
				//   }
				// })
				openQyKefu();
				// #endif
			},
			onGetPhoneNumber(e) {
				let that = this;
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
					//拒绝授权后弹出一些提示  
				} else {
					//允许授权  
					// e.detail.encryptedData //加密的用户信息  
					// e.detail.iv //加密算法的初始向量时要用到  
					uni.checkSession({
						success: function() {
							let usertoken = uni.getStorageSync('UID');
							let parmas = {
								'user_token': usertoken,
								'code': that.wxcode,
								'encryptedData': encodeURIComponent(e.detail.encryptedData),
								'iv': e.detail.iv,
							}
							getUserMobile(parmas).then(res => {
								if (res.code == 1) {
									that.tokenstatus = true;
									that.$store.commit("LOGIN", {
										'token': res.data.token
									});
								}
							})
						},
						fail: function(err) {
							uni.login({
								success(res) {
									let usertoken = uni.getStorageSync('UID');
									let parmas = {
										'user_token': usertoken,
										'code': res.code,
										'encryptedData': encodeURIComponent(e.detail
											.encryptedData),
										'iv': e.detail.iv,
									}
									getUserMobile(parmas).then(res => {
										if (res.code == 1) {
											that.tokenstatus = true;
											that.$store.commit("LOGIN", {
												'token': res.data.token
											});
										}
									})
								}
							})
						}

					})
				}
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
					background: #111f3a;
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
						color: #ec6e57;
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
		height: 400rpx;
		/* #endif */
		/* #ifdef APP-PLUS */
		height: 440rpx;
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
