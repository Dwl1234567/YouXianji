<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor='bg-white'>
			<block slot="content">确认订单</block>
		</bar-title> -->

		<!--收货地址-->
		<view class="margin-tb-sm view-box">
			<view class="bg-white card address-view">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="bg-grey icon-view">
							<text class="cuIcon-locationfill" />
						</view>
						<view class="content" v-if="addressData && addressData.name">
							<view class="text-black">
								<text>{{addressData.name}}</text>
								<text class="margin-left">{{addressData.mobile}}</text>
							</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">{{addressData.province.name+addressData.city.name+addressData.area.name+' '+addressData.address}}</view>
							</view>
						</view>
						<view class="content" v-else>
							<view class="text-black" @click="goaddress()">
								请选择收货地址
							</view>
						</view>
						<view class="action">
							<text class="text-gray cuIcon-right" />
						</view>
					</view>
				</view>
				<view class="address-line" />
			</view>
		</view>

		<!--商品信息-->
		<view class="margin-tb-sm view-box">
			<view class="bg-white card goods-view">
				<!--
				<view class="margin-bottom-sm title-view">
					<view class="cu-avatar sm round" style="background-image:url(/static/delect_images/avatar/1.jpg)"/>
					<view class="title-box">
						<text class="text-black margin-right-xs">强哥自营</text>
						<text class="bg-red cu-tag sm radius">自营</text>
					</view>
				</view>
				-->
				<view class="goods-info-view-box solid-bottom"  v-for="(item, index) in product" :key="item.id">
					<view class="cu-avatar radius lg" :style="[{backgroundImage:'url('+ item.image +')'}]" />
					<view class="goods-info-view">
						<view class="text-cut text-black">{{item.title}}</view>
						<view class="text-sm text-gray">比加入时降￥50元</view>
						<view class="tag-view">
							<text class="cu-tag line-blue sm radius" v-for="(tag,tagindex) in item.value" :key="tagindex">{{tag}}</text>
						</view>
						<view class="goods-price-view">
							<text class="text-price text-red text-lg">{{item.sales_price}}</text>
						</view>
					</view>
				</view>
				<!--
				<view class="margin-tb text-sm text-gray">赠品</view>
				<view class="text-black gift-list">
					<view class="text-cut title">机身清洁 + 180天质保,机身清洁 + 180天质保</view>
					<text class="text-right">￥ 0</text>
				</view>
				<view class="text-black gift-list">
					<view class="text-cut title">品胜充电器 + 数据线</view>
					<text class="text-right">￥ 0</text>
				</view>
				
				<view class="margin-top-lg checked-view">
					<checkbox class='round red sm checked checked'/>
					<view class="text-black-view">
						<text class="text-black">平台服务保障（推荐选购）</text>
						<text class="text-gray cuIcon-question"/>
					</view>
				</view>
				
				<view class="margin-top-sm flex service-view">
					<view class="flex-sub bg-page padding-sm margin-xs radius">
						<view class="text-black text-cut">碎屏保障服务180天</view>
						<view class="text-gray text-sm text-cut">免费更换一次原厂品质屏</view>
						<view class="text-black">
							<text class="margin-right-xs">￥ 95.00</text>
							<text class="cu-tag line-red sm radius">限时5折</text>
						</view>
						<view class="corner-mark"/>
						<text class="cuIcon-check check-icon"/>
					</view>
					<view class="flex-sub bg-page padding-sm margin-xs radius">
						<view class="text-black text-cut">意外保障服务90天</view>
						<view class="text-gray text-sm text-cut">意外硬件损坏免费维修</view>
						<view class="text-black">
							<text class="margin-right-xs">￥ 65.00</text>
							<text class="cu-tag line-red sm radius">限时5折</text>
						</view>
						<view class="corner-mark check"/>
						<text class="cuIcon-check check-icon check"/>
					</view>
				</view>
				-->
			</view>
		</view>

		<!--支付方式-->
		<view class="margin-tb-sm view-box">
			<view class="bg-white card pay-view">
				<view class="text-lg text-black title-view">
					<text class="text-left">支付方式</text>
					<text class="text-right">在线支付</text>
				</view>
				<view class="tag-view-box">
					<text class="cu-tag line-green sm radius">微信支付</text>
					<text class="cu-tag line-blue sm radius">支付宝支付</text>
					<text class="cu-tag line-blue sm radius">花呗分期</text>
					<text class="cu-tag line-red sm radius">奖章支付</text>
				</view>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content">
							<text class="text-black">配送方式</text>
						</view>
						<view class="action">
							<text class="text-black">快递 ￥{{deliveryPrice}}</text>
						</view>
					</view>
					<!--
					<view class="cu-item arrow">
						<view class="content">
							<text class="text-black">促销优惠</text>
						</view>
						<view class="action">
							<text class="cu-tag bg-red sm radius">秒杀</text>
							<text class="text-gray">已优惠180</text>
						</view>
					</view>
					<view class="cu-item arrow">
						<view class="content">
							<text class="text-black">红包</text>
						</view>
						<view class="action">
							<text class="text-gray">暂无可用红包</text>
						</view>
					</view>
					-->
				</view>
			</view>
		</view>

		<!--商品价格计算-->
		<view class="margin-tb-sm view-box">
			<view class="bg-white card price-view">

				<view class="text-black item-view">
					<view class="text-cut title">商品总额</view>
					<text class="text-red text-price text-right">￥{{price}}</text>
				</view>
				<view class="text-black item-view">
					<view class="text-cut title">
						<text class="margin-right-xs">运费</text>
						<text class="cuIcon-question icon" />
					</view>
					<text class="text-right">+ ￥{{deliveryPrice}}</text>
				</view>
				<!--
				<view class="text-black item-view">
					<view class="text-cut title">促销优惠</view>
					<text class="text-right">- ￥180.00</text>
				</view>
				-->
			</view>
		</view>

		<!--服务协议-->
		<view class="margin-tb agreement-checked-view">
			<checkbox class="round red sm checked" :checked="servercheck"/>
			<view class="text-black-view">
				<text class="text-black">我已阅读并同意</text>
				<text class="text-blue">《优闲集平台放心买用户服务协议》</text>
			</view>
		</view>


		<!--占位底部距离-->
		<view class="cu-tabbar-height" />

		<!--底部操作-->
		<view class="bg-white footer-fixed foot-padding-bottom">
			<view class="cu-bar padding-lr">
				<view class="text-black text-bold price-view">
					<text>合计：￥{{total}}</text>
				</view>
				<view class="btn-view">
					<button class="cu-btn radius bg-red" @tap="submit">确认下单</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		OrderCreate,
		OrderSubmit,
		OrderGetDelivery
	} from "@/api/mall.js"
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				goodsList: [],
				checkAll: true,
				goods_img: '/static/delect_images/home/goods/1.png',
				maskState: 0, //优惠券面板显示状态
				remark: '', //备注
				payType: 1, //1微信 2支付宝
				couponList: [],
				useCouponIndex: -1,
				addressData: {},
				product: [],
				price: 0.00, //商品金额
				coupon_price: 0.00, //优惠券金额
				total: 0.00, //实付金额
				deliveryList: [],
				deliveryIndex: 0,
				deliveryPrice: 0.00,
				cart: [], // 购物车id
				flash_id: 0, // 秒杀id
				progress:{},
				submitLock:false ,// 提交按钮锁
				servercheck:false
			}
		},
		onLoad(options) {
			if (options.hasOwnProperty('flash_id')) {
				this.flash_id = options.flash_id;
			}

			if (options.hasOwnProperty('cart')) {
				this.cart = options.cart;
				// 从购物车进入 
				this.getOrderCreate({
					cart: options.cart
				});
			} else {
				// 从商品进入
				this.getOrderCreate({
					id: options.id,
					spec: options.spec,
					flash_id: this.flash_id
				});
			}
		},
		onShow() {
			// if (this.addressData.hasOwnProperty('city_id')) {
			// 	// 检查当前地址是否存在于运费模板中
			// 	this.getDelivery();
			// }
		},
		methods: {
			payTap() {
				uni.navigateTo({
					url: "/pages/goods/pay"
				});
			},
			goaddress(){
				uni.navigateTo({
					url:"/pages/my/address/address"
				})
			},
			async submit() {
				
				// 如果没有地址则提示先加地址
				if (!this.addressData || !this.addressData.hasOwnProperty('city_id')) {
					this.$api.msg('请选择收货地址');
					return;
				}
			
				this.$api.msg('提交中...', 20000);
				let delivery_id = 0;
				if (this.deliveryList && this.deliveryList[this.deliveryIndex] && this.deliveryList[this.deliveryIndex].id) {
					delivery_id = this.deliveryList[this.deliveryIndex].id;
				}
				let coupon_id = 0;
				if (this.couponList && this.couponList[this.useCouponIndex] && this.couponList[this.useCouponIndex].id) {
					coupon_id = this.couponList[this.useCouponIndex].id;
				} 
				let data = {
					city_id: this.addressData.city_id,
					address_id: this.addressData.id,
					delivery_id: delivery_id,
					coupon_id: coupon_id,
					remark: this.remark,
					product_id: [],
					spec: [],
					number: [],
					cart: this.cart,
					flash_id: this.flash_id
				};
			
				this.product.forEach((item, index) => {
					data.product_id.push(item.id);
					data.spec.push(item.spec.replace(/,/g, '|'));
					data.number.push(item.number);
				});
			
				if (this.submitLock) {
					return;
				}
				this.submitLock = true; // 提交锁
				// let apiUrl = this.flash_id == 0 ? '/order/submit' : '/flash/submitOrder';
				// let result = await this.$api.request(apiUrl, 'POST', data);
				console.log(data);
				OrderSubmit(data).then(res=>{
					let result = res.data;
					if (result) {
						this.submitLock = false; // 解除锁
						this.$api.msg('已提交', 2000); 
						uni.redirectTo({
							url: `/pages/goods/pay?order_id=${result.order_id}&total=${this.total}&out_trade_no=${result.out_trade_no}`
						});
					} 
					this.submitLock = false; // 解除锁
				})
				
			},
			// 计算百分比
			percentage(number, sold) {
				if (!sold) {
					return 0;
				}
				return parseInt(sold / number * 100);
			},
			// 获取运费模板
			async getDelivery() {
				// let delivery = await this.$api.request('/order/getDelivery?city_id=' + this.addressData.city_id);
				let params = {
					'city_id':this.addressData.city_id
				}
				OrderGetDelivery(params).then(res=>{
					let delivery = res.data;
					if (delivery) {
						this.deliveryList = delivery;
						this.deliveryIndex = 0;
						this.calcTotal();
					}
				})
				
			},
			// 选择运费模板
			deliveryChange(e) {
				this.deliveryIndex = e.detail.value;
				this.calcTotal();
			},
			// 使用优惠券
			useCoupon(index) {
				if (this.useCouponIndex !== index) {
					this.useCouponIndex = index;
					//this.coupon_price = this.couponList[index].value;
				} else {
					this.useCouponIndex = -1;
					// this.coupon_price = 0;
				}
				this.calcTotal();
			},
			getOrderCreate(param) {
				let that = this;
				OrderCreate(param).then(res => {
					let data = res.data;
					if (data) {
						this.addressData = data.address;
						this.product = data.product;
						this.couponList = data.coupon;
						this.deliveryList = data.delivery;
						this.calcTotal();
						
						if (data.flash) {
							this.progress = data.flash;
						}
					} else {
						setTimeout(function() {
							that.$api.prePage().getDetail(param.id, param.flash_id);
							uni.navigateBack();
						}, 3000)
					}
				})
			},
			//数量
			async numberChange(data) {
				let oldNumber = this.product[data.index].number;
				let newNumber = data.number;
				this.product[data.index].number = newNumber;
				this.calcTotal();
			
				//判断当前库存
				let stock = this.product[data.index].stock;
				if (newNumber > this.product[data.index].stock) {
					this.product[data.index].number = stock;
				}
			
			},
			// 计算价格
			calcTotal() {
				let price = 0;
				let number = 0; // 产品数量
				let product = this.product;
			
				product.forEach(item => {
					price = price + parseFloat(item.sales_price) * item.number;
					number = number + item.number;
				});
			
				this.price = price.toFixed(2);
				let total = price;
			
				// 检查当前优惠券是否满足使用条件
				this.coupon_price = 0.00;
				if (this.useCouponIndex != -1 && this.couponList && this.couponList[this.useCouponIndex]) {
					this.coupon_price = this.couponList[this.useCouponIndex].value
					if (this.price >= this.couponList[this.useCouponIndex].least) {
						total = total - this.coupon_price;
					} else {
						this.$api.msg('选中的优惠券不满足使用条件', 2000);
						this.useCouponIndex = -1; //取消选中的优惠券
						this.coupon_price = 0; //设置优惠金额为0
						total = total - this.coupon_price;
					}
				}
			
				// 计算当前运费模板
				// id: 29 运费模板id
				// name: "购买2件以上包邮"  标题
				// type: "quantity"  // 续重类型
				// min: 2  // 至少购买量
				// first: 1  // 首件数量
				// first_fee: "0.00" // 首单价钱
				// additional: 1  // 续件数量
				// additional_fee: "0" // 续件价钱
				let delivery = this.deliveryList[this.deliveryIndex];
				if (delivery) {
					let deliveryPrice = 0;
					if (delivery.hasOwnProperty('id')) {
						if (delivery.min > number) {
							this.$api.msg('必须至少购买' + delivery.min + '件商品才能使用此配送方式', 6000)
						}
						// 如何为0就赋值1，不然下面的循环会死循环
						delivery.first = delivery.first == 0 ? 1 : delivery.first;
						delivery.additional = delivery.additional == 0 ? 1 : delivery.additional;
						for (let i = 0; i < number;) {
							if (i === 0) {
								deliveryPrice = deliveryPrice + parseInt(delivery.first_fee);
								i = i + parseInt(delivery.first);
							} else {
								deliveryPrice = deliveryPrice + parseInt(delivery.additional_fee);
								i = i + parseInt(delivery.additional);
							}
						}
					}
					this.deliveryPrice = deliveryPrice.toFixed(2);
					total = total + deliveryPrice;
				}
			
				this.total = total.toFixed(2);
			},
			// 查看运费模板
			deliveryTemplate() {
				this.$api.navTo('/pages/order/delivery');
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
	@import "@/uni_modules/mpb-ui/shop/settlement.scss";
</style>
