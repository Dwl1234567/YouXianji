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
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg radius-4" @click="deliveryTap">提交订单</button>
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
	import {
		GodsgoodsDetail,
		GodsgoodsPrice,
		getUserMobile
	} from "@/api/common.js";
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	import {
		openQyKefu
	} from "@/utils/util.js"
	import {
		mapState
	} from 'vuex';
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
					'功能情况'
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
			// let data = JSON.parse(decodeURIComponent(option.data))

			this.goodsInfo = option;
			this.goodsId = option.id;
			this.type = option.type;
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
			moneyFuc(e) {
				let that = this;
				// console.log(e);
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
				// let paramsdata = [];
				//that.forecastMoney = that.baseMoney;
				that.forecastMoney = 0;
				that.goodsdesc = '';
				console.log('that.retrieveList',that.retrieveList);

				that.retrieveList.forEach((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.child.forEach((iiitem, indexxx) => {
							if (iiitem.checked) {
								that.forecastMoney += Number(iiitem.price);
								console.log('that.forecastMoney',that.forecastMoney);
								// paramsdata.push({iitem.key:iiitem.id});
								that.Priceprams[iitem.key] = indexxx;
								if (index == 0 && iitem.key != 'small') {
									that.goodsdesc = that.goodsdesc + iiitem.name + ' | ';
								}
							}
						})
					})
				})

				console.log('总价：');
				console.log(that.forecastMoney);
				console.log('that.Priceprams',that.Priceprams);
				// console.log(paramsdata);
			},
			getGodsgoodsDetail() {
				let that = this;
				let params = {
					'goods_id': that.goodsInfo.id,
					'cate_id': that.goodsInfo.cate_id,
					// 'goods_id': '1',
					// 'cate_id': '6'
				}
				GodsgoodsDetail(params).then(res => {
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
			// 添加选择熟悉
			addcheckattr() {
				let that = this;
				that.retrieveList.map((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.child.map((iiitem, indexxx) => {
							if (indexxx == 0) {
								iiitem['checked'] = true;
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
			// 获取报价
			getGodsgoodsPrice() {
				let that = this;
				that.Priceprams['goods_id'] = that.goodsInfo.id;
				// console.log(that.goodsInfo);
				that.Priceprams['cate_id'] = that.goodsInfo.cate_id;
				GodsgoodsPrice(that.Priceprams).then(res => {
					let data = res.data;
					if (res.code == 1) {
						that.detailId = data.detail_id;
						uni.navigateTo({
							url: 'form?type=' + that.type + '&detailId=' + that.detailId + '&goodsId=' +
								that.goodsId
						})
					}
				})
			},
			//去发货
			async deliveryTap() {
				let login = await this.$api.checkLogin();
				if(login){
					this.getGodsgoodsPrice();
				}
				//this.getGodsgoodsPrice();

				
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
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
				// 	  console.log(res);
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
							console.log(err + '检查code错误');
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
