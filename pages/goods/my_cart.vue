<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor='bg-white' @rightTap="barEditTap">
			<block slot="content">购物车</block>
			<block slot="right">
				<text v-if="goods_checked">完成</text>
				<text v-else>编辑</text>
			</block>
		</bar-title> -->

		<view class="bg-white cart-list-view">
			<checkbox-group class="block" @change="CheckboxChange">
				<!-- <block v-for="(item,index) in goodsList" :key="item.id"> -->
					<!--
					<view class="padding checkbox-title-view">
						<checkbox class='round red sm checked' :class="item.checked?'checked':''"
						 :checked="item.checked?true:false" :value="item.id + ''"/>
						<view class="text-black text-lg shop-title">{{item.name}}</view>
					</view>
					-->
					<block v-for="(items,index) in cartList" :key="items.id">
						<view class="light goods-list-item-view">
							<checkbox class='round red sm' :class="items.checked?'checked':''"
								:checked="items.checked?true:false" :value="items.id + ''" />
							<view class="cu-avatar radius lg" :style="[{backgroundImage:'url('+ items.image +')'}]" />
							<view class="goods-info-view">
								<view class="text-cut text-black">{{items.title}}</view>
								<view class="text-sm text-gray" v-if="items.spec">{{items.spec}}</view>
								<view class="tag-view">
									<text class="cu-tag line-red sm radius" v-if="items.tag">{{items.tag}}</text>
								</view>
								<view class="goods-price-view">
									<view class="text-price-view">
										<text class="text-price text-red text-lg">{{items.nowPrice}}</text>
										<text class="cu-tag bg-red sm radius"
											v-if="items.price_tag">{{items.price_tag}}</text>
									</view>
									<view class="step-btn-view">
										<!-- <button class="btn text-gray">-</button>
										<input class="input" type='number' :value="items.num" />
										<button class="btn">+</button> -->
										<uni-number-box class="step" :min="1" :max="items.stock" :disabled="items.number>=items.stock" :value="cartList[index].number"
										 :isMax="items.number>=items.stock?true:false" :isMin="items.number===1" :index="index" @eventChange="numberChange"></uni-number-box>
									</view>
								</view>
							</view>
						</view>
					</block>
				<!-- </block> -->
			</checkbox-group>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />

		<!--底部操作-->
		<view class="bg-white footer-fixed foot-padding-bottom">
			<view class="cu-bar padding-lr">
				<view class="checked-view" @tap="tapChecked">
					<checkbox class='round red sm checked' :class="checkAll?'checked':''" :checked="checkAll">
					</checkbox>
					<text class="text-black text-lg text-bold">全选</text>
				</view>
				<view class="price-view">
					<view class="text-black text-bold">合计：￥9999.00</view>
					<view class="text-sm">总额:￥9168.00 优惠:￥0.00</view>
				</view>
				<view class="btn-view">
					<button class="cu-btn radius bg-red" @tap="tapBtn">去结算(3)</button>
				</view>
			</view>
		</view>

		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<!--编辑-->
		<view class="add-btn-view-box" @tap="barEditTap">
			<button class="cu-btn cuIcon-check bg-red" v-if="goods_checked"></button>
			<button class="cu-btn cuIcon-write bg-red" v-else></button>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';

	import _my_cart_data from '@/static/data/my_cart.js'; //虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		CartIndex,
		CartNumberChange,
		CartChooseChange
	} from "@/api/mall.js"
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				goodsList: [],
				checkAll: true,
				goods_checked: false,
				total: 0, //总价格
				allChoose: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				state : 'load'
			}
		},
		onLoad() {
			// this.goodsList = _my_cart_data.goodsListData();
		},
		onPullDownRefresh() {
			this.state = 'load';
			this.cartList = [];
			this.getCart();
		},
		onShow() {
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
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			async getCart() {
				let login = await this.$api.checkLogin();
				if (login) {
					CartIndex({}).then(res=>{
						let data = res.data;
						this.state = 'loaded';
						if (data) {
							this.cartList = data;
							this.calcTotal();
						}
					})
					.finally(com=>{
						uni.stopPullDownRefresh();
					})
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
					url: '/pages/public/login'
				})
			},
			//选中状态处理
			async check(type, index) {

				let trueArr = [];
				let falseArr = [];
				let oldChoose = [];
				const list = this.cartList;
				//保存旧的数据
				list.forEach(item => {
					if (item.choose) {
						oldChoose.push(item.cart_id);
					}
				})

				//本地处理
				if (type === 'item') {
					this.cartList[index].choose = !this.cartList[index].choose;
					if (this.cartList[index].choose) {
						trueArr.push(this.cartList[index].cart_id);
					} else {
						falseArr.push(this.cartList[index].cart_id);
					}
				} else {
					const choose = !this.allChoose
					list.forEach(item => {
						item.choose = choose;
						if (item.isset) {
							if (choose) {
								trueArr.push(item.cart_id);
							} else {
								falseArr.push(item.cart_id);
							}
						}
					})
					this.allChoose = choose;
				}
				this.calcTotal(type);

				//远程处理
				let result = await this.$api.request('/cart/choose_change', 'POST', {
					trueArr,
					falseArr
				});
				if (!result) {
					//恢复原来勾选的状态
					list.forEach(item => {
						if (oldChoose.indexOf(item.cart_id) >= 0) {
							item.choose = 1;
						} else {
							item.choose = 0;
						}
					})
					this.calcTotal(type);
				}

			},
			//数量
			async numberChange(data) {
				let oldNumber = this.cartList[data.index].number;
				let newNumber = data.number;
				this.cartList[data.index].number = newNumber;
				this.calcTotal();

				let cart_id = this.cartList[data.index].cart_id;
				let result = await this.$api.request('/cart/number_change?id=' + cart_id, 'GET', {
					number: newNumber
				}, false);
				if (!result) {
					this.cartList[data.index].number = oldNumber;
					this.calcTotal();
				}

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
								id: id
							});
							if (result) {
								let tempCart = this.cartList.splice(index, 1);
								this.calcTotal();
							}
						}
					}
				})

			},
			//清空
			async clearCart() {
				let [error, res] = await uni.showModal({
					title: '确认清空？'
				});
				if (res.confirm) {
					let id = [];
					this.cartList.forEach(item => {
						id.push(item.cart_id);
					});
					let data = this.$api.request('/cart/delete', 'POST', {
						id: id
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
				list.forEach(item => {
					if (item.isset) {
						if (item.choose == 1) {
							total += item.nowPrice * item.number;
						} else if (choose === true) {
							choose = false;
						}
					}
				})
				this.allChoose = choose;
				this.total = total.toFixed(2);
			},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let cartId = [];
				list.forEach(item => {
					if (item.choose) {
						cartId.push(item.cart_id);
					}
				})
				if (cartId.length == 0) {
					this.$api.msg('没有选中商品');
					return;
				}
				this.$api.navTo(`/pages/order/createOrder?cart=${cartId.join(',')}`);
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
					url: '/pages/goods/settlement'
				});
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
	@import "@/uni_modules/mpb-ui/shop/my_cart.scss";
</style>
