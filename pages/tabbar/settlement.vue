<template>
	<view class="cart-box container">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false">
			<block slot="content">确认订单</block>
		</bar-title>
		<!-- 空白页 -->
		<!-- <view v-if="(!hasLogin || empty===true) && state != 'load'" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="/pages/home/sort" open-type="navigate">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view> -->

		<view class="cart-list-view">
			<view class="adress" v-if="addressN">
				<view class="">{{addressN.linkman}} {{addressN.phonenumber}}</view>
				<view>{{addressN.provinceName}}{{addressN.cityName}}{{addressN.regionName}} {{addressN.detailAddress}}</view>
			</view>
			<!-- 列表 -->
			<view class="cart-list bg-white margin-sm" style="border-radius: 11rpx; position: relative">
				<block v-for="(item, index) in cartList" :key="item.cart_id" v-if="item.disabled == true">
					<!-- <view class="radio" :class="item.disabled ? 'radio-red' : ''" @tap="radioChange(index)"></view> -->
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}"
						@click="navTo(`/pages/product/product?id=${item.product_id}&flash=0`)">
						<view class="image-wrapper">
							<image :src="$httpImage + item.goodsInfo.frontPhoto" class="loaded" mode="aspectFill"></image>
							<!-- 							<view
								v-if="item.isset == true"
								class="iconfont icon-circleorange checkbox"
								:class="{checked: item.choose}"
								@click.stop="check('item', index)"
							></view> -->
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.goodsInfo.title}}</text>
							<text class="attr" v-if="item.sellPrice">{{item.sellPrice}}</text>
							<view class="price margin-top-xs">
								￥
								<text class="text-red text-xxl text-bold">{{item.goodsInfo.sellPrice}}</text>
								<text style="color: red">{{cartPrice(item.oldPrice, item.nowPrice)}}</text>
								<text class="step">x {{item.value}}</text>
							</view>

							<!-- <u-number-box class="step" v-model="item.value" min="0" @change="valChange(item)"></u-number-box> -->
							<!-- <uni-number-box
								class="step"
								:min="1"
								:max="item.stock"
								:disabled="item.number>=item.stock"
								:value="cartList[index].number"
								:isMax="item.number>=item.stock?true:false"
								:isMin="item.number===1"
								:index="index"
								@eventChange="numberChange"
							></uni-number-box> -->
						</view>
						<text class="del-btn iconfont icon-delete" @click.stop="deleteCartItem(index)"></text>
						<text class="invalid" v-if="item.isset == false">失效</text>
						<text class="invalid" v-if="item.stock == 0 && item.isset == true">库存不足</text>
					</view>
				</block>
				<view class="xinxi">
					<view class="xinxi-item">
						<view>配送服务</view>
						<view>快递包邮</view>
					</view>
					<view class="xinxi-item">
						<view>店铺优惠</view>
						<view>无优惠</view>
					</view>
					<view class="xinxi-item">
						<view>开具发票</view>
						<view>该商品不支持线上开票，请联系商家</view>
					</view>
					<view class="xinxi-item">
						<view>配送服务</view>
						<view>快递包邮</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="wxPay">
				<view class="left">
					<image src="/static/微信@2x.png" mode=""></image>
					<text>微信</text>
				</view>
				<view class="right">
					<image :src="isWx ? '/static/checkYuan.png' : '/static/yuan.png'" @tap="checkWx"></image>
				</view>
			</view>
			<view class="zfbPay">
				<view class="left">
					<image src="/static/支付宝@2x.png" mode=""></image>
					<text>支付宝</text>
				</view>
				<view class="right">
					<image :src="!isWx ? '/static/checkYuan.png' : '/static/yuan.png'" @tap="checkWx"></image>
				</view>
			</view>
		</view>
		<!--占位底部距离-->
		<view class="cu-tabbar-height" />

		<!-- 底部菜单栏 -->
		<view class="action-section bg-white">
			<view class="checkbox">
				<image :src="allChoose?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="checkall('all')">
				</image>
			</view>
			<view class="total-box">
				<view class="text-red">
					<text class="text-red margin-right-xs">¥</text>
					<text class="text-red text-xxl text-bold">{{total}}</text>
				</view>
			</view>
			<button class="no-border cu-btn bg-deepblue radius-4" @click="createOrder" v-if="!checkout"
				style="padding: 17rpx 122rpx;background: linear-gradient(90deg, #F3C81A 0%, #FFB629 100%);border-radius: 42rpx;color: #FFFFFF;">结算</button>
			<button class="no-border cu-btn bg-deepblue radius-4" @click="createOrder" v-else>删除</button>
		</view>

		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<!--编辑-->
		<view class="add-btn-view-box" @tap="barEditTap">
			<button class="cu-btn cuIcon-check bg-red" v-if="goods_checked"></button>
			<button class="cu-btn cuIcon-write bg-red" v-else></button>
		</view>
		<!-- #endif -->
		<!--底部导航-->
		<footer-tabbar :tabID="3" :msgDot="true" />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';

	import barTitle from '@/components/common/basics/bar-title';
	import uniNumberBox from '@/components/uni-number-box.vue';
	import _my_cart_data from '@/static/data/my_cart.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		CartIndex,
		CartAdd,
		CartDelete,
		CartNumberChange,
		CartChooseChange
	} from '@/api/mall.js';
	import {
		shoppingCartList,
		getDefaultAddress,
		initiatePayment,
		testAliPay,
		paymentReturn
	} from '@/api/malls.js';
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'cart',
		components: {
			barTitle,
			uniNumberBox,
			footerTabbar,
		},
		data() {
			return {
				orderPaymentId: 0,
				addressN: {},
				isWx: true,
				checkout: false,
				goodsList: [],
				checkAll: true,
				goods_checked: false,
				total: 0, //总价格
				allChoose: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				state: 'load',
			};
		},
		onLoad(option) {
			this.orderPaymentId = option.id;
			this.cartList = uni.getStorageSync('cartList');
			this.getDefaultAddresss();
		},
		onPullDownRefresh() {},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			},
		},
		computed: {
			...mapState(['hasLogin']),
		},
		methods: {
			// 获取默认地址
			getDefaultAddresss() {
				getDefaultAddress().then((res) => {
					if (res.code === 200) {
						this.addressN = res.data;
					}
				});
			},
			checkWx() {
				this.isWx = !this.isWx;
			},
			// 全选
			checkall() {
				this.allChoose = !this.allChoose;
				if (this.allChoose) {
					this.cartList.map((item) => {
						item.disabled = true;
						this.total = Number(this.total) + item.goodsInfo.sellPrice * item.value;
					});
				} else {
					this.total = 0;
					this.cartList.map((item) => {
						item.disabled = false;
					});
				}
			},
			// 切换管理
			checkouts() {
				this.checkout = !this.checkout;
			},
			// 点击多选按钮
			radioChange(e) {
				this.cartList[e].disabled = !this.cartList[e].disabled;
				if (!this.cartList[e].disabled) {
					this.total = Number(this.total) - this.cartList[e].goodsInfo.sellPrice * this.cartList[e].value;
				} else {
					this.total = Number(this.total) + this.cartList[e].goodsInfo.sellPrice * this.cartList[e].value;
				}
			},
			async getCart() {
				let login = await this.$api.checkLogin();
				console.log(login);
				if (login) {
					shoppingCartList({
							pageSize: 100000,
							pageNum: 1,
						})
						.then((res) => {
							let data = res.rows;
							data.map((item) => {
								item.disabled = false;
								item.value = 1;
								return item;
							});
							this.state = 'loaded';
							if (data) {
								this.cartList = data;
								this.calcTotal();
							}
						})
						.finally((com) => {
							uni.stopPullDownRefresh();
						});
					// let data = await this.$api.request('/cart');
					// uni.stopPullDownRefresh();
					// this.state = 'loaded';
					// if (data) {
					// 	this.cartList = data;
					// 	this.calcTotal();
					// }
				}
			},
			cartPrice(oldPrice, nowPrice) {
				let string = '';
				if (oldPrice < nowPrice) {
					let number = (nowPrice - oldPrice).toFixed(2);
					string = ' ↑涨价 ' + number + '元';
				} else if (oldPrice > nowPrice) {
					let number = (oldPrice - nowPrice).toFixed(2);
					string = ' ↓降价 ' + number + '元';
				}
				return string;
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login',
				});
			},

			//数量
			async numberChange(data) {
				let oldNumber = this.cartList[data.index].number;
				let newNumber = data.number;
				this.cartList[data.index].number = newNumber;
				this.calcTotal();

				let cart_id = this.cartList[data.index].cart_id;
				// let result = await this.$api.request('/cart/number_change?id=' + cart_id, 'GET', {
				// 	number: newNumber
				// }, false);
				CartNumberChange({
						id: cart_id,
						number: newNumber
					})
					.then((res) => {})
					.catch((err) => {
						this.cartList[data.index].number = oldNumber;
						this.calcTotal();
					});
			},
			//删除
			async deleteCartItem(index) {
				let list = this.cartList;
				let row = list[index];
				let id = row.cart_id;

				uni.showModal({
					content: '确认删除 ' + list[index].title + '？',
					success: async (e) => {
						if (e.confirm) {
							let result = await this.$api.request('/cart/delete?', 'POST', {
								id: id,
							});
							if (result) {
								let tempCart = this.cartList.splice(index, 1);
								this.calcTotal();
							}
						}
					},
				});
			},
			//清空
			async clearCart() {
				let [error, res] = await uni.showModal({
					title: '确认清空？',
				});
				if (res.confirm) {
					let id = [];
					this.cartList.forEach((item) => {
						id.push(item.cart_id);
					});
					let data = this.$api.request('/cart/delete', 'POST', {
						id: id,
					});
					let that = this;
					if (data) {
						setTimeout(function() {
							that.state = 'load';
							that.cartList = [];
							that.getCart();
						}, 300);
					}
				}
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let choose = true;
				list.forEach((item) => {
					if (item.isset) {
						if (item.choose == 1) {
							total += item.nowPrice * item.number;
						} else if (choose === true) {
							choose = false;
						}
					}
				});
				// this.allChoose = choose;
				this.total = total.toFixed(2);
			},
			//创建订单
			createOrder() {
				console.log({
					orderPaymentId: Number(this.orderPaymentId),
					paymentType: this.isWx ? '1' : '0',
				});
				if (!this.isWx) {
					testAliPay({
						orderPaymentId: this.orderPaymentId
					}).then(res => {
						if (res.code === 200) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data,
								success: function(ress) {
									paymentReturn({
										orderPaymentId: this.orderPaymentId,
										tradeno: ress.tradeno
									}).then(resss => {
										if (resss.code === 200) {
											uni.showToast({
												icon: 'none',
												title: '支付成功',
											});
										}
									})
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									if (err.code == -100) {
										uni.showToast({
											icon: 'none',
											title: '支付失败',
										});
									}
									console.log('fail:' + JSON.stringify(err));
								}
							})
						}
					})
				}


				// initiatePayment({
				// 	orderPaymentId: Number(this.orderPaymentId),
				// 	paymentType: this.isWx ? '1' : '0',
				// }).then((res) => {
				// 	if (res.code === 200) {
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: '结算成功',
				// 		});
				// 	}
				// });
				// uni.requestPayment({
				// 	provider: 'wxpay',
				// 	success(res) {
				// 		console.log(res);
				// 	},
				// 	fail(res) {
				// 		console.log(res);
				// 	},
				// 	complete(res) {
				// 		console.log(res);
				// 	},
				// });
				// let list = this.cartList;
				// let cartId = [];
				// list.forEach((item) => {
				// 	if (item.choose) {
				// 		cartId.push(item.cart_id);
				// 	}
				// });
				// if (cartId.length == 0) {
				// 	this.$api.msg('没有选中商品');
				// 	return;
				// }
				// this.$api.navTo(`/pages/goods/settlement?cart=${cartId.join(',')}`);
			},
			navTo(url) {
				this.$api.navTo(url);
			},
			CheckboxChange(e) {
				let items = this.goodsList,
					values = e.detail.value;
				for (let i = 0; i < items.length; i++) {
					//店铺处理
					let result = values.includes(items[i].id + '');
					if (result) {
						items[i].checked = true;
					} else {
						items[i].checked = false;
					}
					//商品处理
					let goods = items[i].goods;
					for (let x = 0; x < goods.length; x++) {
						let result = values.includes(goods[x].id + '');
						if (result) {
							goods[x].checked = true;
						} else {
							goods[x].checked = false;
						}
					}
				}
			},
			tapChecked() {
				if (this.checkAll) {
					this.checkAll = false;
				} else {
					this.checkAll = true;
				}
			},
			barEditTap() {
				if (this.goods_checked) {
					this.goods_checked = false;
				} else {
					this.goods_checked = true;
				}
			},
			tapBtn() {
				uni.navigateTo({
					url: '/pages/goods/settlement',
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
	@import '@/uni_modules/mpb-ui/shop/my_cart.scss';

	.cart-box {
		// display: none;
	}

	page {
		background: #f0f0f0;
	}

	.cart-box.show {
		display: block;
	}

	.adress {
		margin: 20rpx;
		background: #ffffff;
		border-radius: 11rpx;
		padding: 30rpx 32rpx;
	}

	.xinxi {
		padding: 28rpx 32rpx;
	}

	.xinxi-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 34rpx;

		view {
			font-size: 27rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #101010;
			line-height: 38rpx;
		}

		view:nth-child(2) {
			color: #929294;
		}
	}

	.pay {
		margin: 20rpx;
		background: #ffffff;
		border-radius: 11rpx;
		padding: 30rpx 32rpx;
	}

	.zfbPay {
		margin-top: 34rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 57rpx;
				height: 57rpx;
				margin-right: 11rpx;
			}
		}

		.right {
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}

	.wxPay {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 57rpx;
				height: 57rpx;
				margin-right: 11rpx;
			}
		}

		.right {
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
	}

	.radio {
		width: 38rpx;
		height: 38rpx;
		border-radius: 38rpx;
		border: 2rpx solid #cecece;
	}

	.radio-red {
		background-color: #ff3a31;
	}

	.step {
		position: absolute;
		bottom: 0px;
		right: 0px;
	}

	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm + 2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		width: 100%;
		padding: 30upx 20upx 30upx 14upx;

		.clamp {
			height: auto !important;
			white-space: unset;
		}

		.image-wrapper {
			width: 180upx;
			height: 180upx;
			flex-shrink: 0;
			position: relative;
		}

		.checkbox {
			position: absolute;
			left: -60upx;
			top: 34%;
			z-index: 8;
			font-size: 30upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			//overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.price {
				font-size: $font-base + 2upx;
				color: #ec6e57;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.uni-numbox {
				left: unset;
				right: -60upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: #da3b26;
		}

		.invalid {
			position: absolute;
			right: 0;
			bottom: 0;
			background: #999999;
			color: #ffffff;
			padding: 6upx 12upx;
			border-radius: 10upx;
			font-size: 26upx;
			margin-right: 50upx;
			margin-bottom: 32upx;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 0px;
		/* #ifndef APP-PLUS */
		bottom: 100upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		bottom: 100upx;
		/* #endif */
		z-index: 95;
		display: flex;
		align-items: center;
		width: 100vw;
		height: 100upx;
		padding: 0 30upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: 0.2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;
			width: 60%;
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: #ff644e;
	}
</style>