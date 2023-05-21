<template>
	<view class="cart-box container">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false">
			<block slot="content">购物车</block>
			<block slot="right">
				<text @tap="checkouts">{{checkout ? '完成' : '管理'}}</text>
			</block>
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

		<view class="cart-list-view" v-for="(item, index) in cartList" :key="item.cart_id">
			<!-- 列表 -->
			<view
				class="cart-list bg-white margin-sm"
				style="
					border-radius: 11rpx;
					display: flex;
					justify-items: center;
					align-items: center;
					padding-left: 20rpx;
					position: relative;
				"
			>
				<block>
					<view class="radio" :class="item.disabled ? 'radio-red' : ''" @tap="radioChange(index)"></view>
					<view
						class="cart-item"
						:class="{'b-b': index!==cartList.length-1}"
						@click="navTo(`/pages/product/product?id=${item.product_id}&flash=0`)"
					>
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
							</view>
							<u-number-box class="step" v-model="item.value" min="0" @change="valChange(item)"></u-number-box>
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
			</view>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<view>123</view>
		<!-- 底部菜单栏 -->
		<view class="action-section bg-white">
			<view class="checkbox">
				<image
					:src="allChoose?'/static/selected.png':'/static/select.png'"
					mode="aspectFit"
					@click="checkall('all')"
				></image>
			</view>
			<view class="total-box">
				<view class="text-red">
					<text class="text-red margin-right-xs">¥</text>
					<text class="text-red text-xxl text-bold">{{total}}</text>
				</view>
			</view>
			<button class="no-border cu-btn bg-deepblue radius-4" @click="createOrder" v-if="!checkout">结算</button>
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
	import { CartIndex, CartAdd, CartDelete, CartNumberChange, CartChooseChange } from '@/api/mall.js';
	import { shoppingCartList, shoppingOrder } from '@/api/malls.js';
	import { mapState } from 'vuex';
	export default {
		name: 'cart',
		components: {
			barTitle,
			uniNumberBox,
			footerTabbar,
		},
		data() {
			return {
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
		onLoad() {
			uni.startPullDownRefresh({});
			this.state = 'load';
			this.cartList = [];
		},
		onPullDownRefresh() {
			this.state = 'load';
			this.cartList = [];
			this.getCart();
		},
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
			//选中状态处理
			// async check(type, index) {
			// 	let trueArr = [];
			// 	let falseArr = [];
			// 	let oldChoose = [];
			// 	const list = this.cartList;
			// 	//保存旧的数据
			// 	list.forEach((item) => {
			// 		if (item.choose) {
			// 			oldChoose.push(item.cart_id);
			// 		}
			// 	});

			// 	//本地处理
			// 	if (type === 'item') {
			// 		this.cartList[index].choose = !this.cartList[index].choose;
			// 		if (this.cartList[index].choose) {
			// 			trueArr.push(this.cartList[index].cart_id);
			// 		} else {
			// 			falseArr.push(this.cartList[index].cart_id);
			// 		}
			// 	} else {
			// 		const choose = !this.allChoose;
			// 		list.forEach((item) => {
			// 			item.choose = choose;
			// 			if (item.isset) {
			// 				if (choose) {
			// 					trueArr.push(item.cart_id);
			// 				} else {
			// 					falseArr.push(item.cart_id);
			// 				}
			// 			}
			// 		});
			// 		this.allChoose = choose;
			// 	}
			// 	this.calcTotal(type);

			// 	//远程处理
			// 	let result = await this.$api.request('/cart/choose_change', 'POST', {
			// 		trueArr,
			// 		falseArr,
			// 	});
			// 	if (!result) {
			// 		//恢复原来勾选的状态
			// 		list.forEach((item) => {
			// 			if (oldChoose.indexOf(item.cart_id) >= 0) {
			// 				item.choose = 1;
			// 			} else {
			// 				item.choose = 0;
			// 			}
			// 		});
			// 		this.calcTotal(type);
			// 	}
			// },
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
				CartNumberChange({ id: cart_id, number: newNumber })
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
						setTimeout(function () {
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
				uni.setStorageSync('cartList', this.cartList);
				const shoppingOrderItemList = [];
				this.cartList.map((item) => {
					if (item.disabled) {
						shoppingOrderItemList.push({ goodsId: item.goodsInfo.goodsId, cartId: item.cartId });
					}
				});
				console.log({
					totalPrice: this.total,
					shoppingOrderItemList,
				});
				shoppingOrder({
					totalPrice: this.total,
					shoppingOrderItemList,
				}).then((res) => {
					if (res.code === 200) {
						uni.navigateTo({
							url: '/pages/tabbar/settlement?id=' + res.data,
						});
					}
				});
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
		bottom: 0upx;
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
