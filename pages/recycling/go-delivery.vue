<template>
	<view style="padding-bottom: 160rpx;">
		<view class="cu-list grid col-2 no-border margin-lr-xl">
			<view class="cu-item" :class="index==TabCur?'bg-red cur':''" v-for="(item,index) in cuIconList" :key="index"
				@tap="tabSelect" :data-id="index">
				<view :class="['cuIcon-' + item.cuIcon, index==TabCur?'':'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text :class="index==TabCur?'text-white':'text-' + item.color">{{item.name}}</text>
			</view>
		</view>
		<view class="">

			<!--顺丰上门-->
			<view class="cu-form-group margin-top" v-if="TabCur==0">
				<view class="title">取件地址</view>
				<view class="picker" v-if="takeAddress.length == 0" @click="$u.route('/pages/mycenter/personal_data/add-address')">
					还未设置收货地址，点击去设置~
				</view>
				<picker v-else @change="AddressChange" :value="index.address" range-key="all_detail" :range="takeAddress">
					<view class="picker">
						{{index.address>-1?takeAddress[index.address].all_detail:'请选择取件地址'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group" v-if="TabCur==0">
				<view class="title">取件时间</view>
				<picker mode="multiSelector" :value="timeIndex" range-key="value" @columnchange="Timecolumnchange"
					@change="TimeChange" :range="takeTime">
					<view class="picker">
						{{timeIndex[0] > -1 ? takeTime[0][timeIndex[0]].value+takeTime[1][timeIndex[1]].value:'请选择上门取件时间'}}
					</view>
				</picker>
			</view>
			<!--自寄-->
			<view class="cu-form-group margin-top" v-if="TabCur==1">
				<view class="title">姓名</view>
				<input placeholder="请输入联系人姓名" v-model="jjname" name="input"></input>
			</view>
			<view class="cu-form-group" v-if="TabCur==1">
				<view class="title">手机号</view>
				<input placeholder="请输入联系人手机号" v-model="jjphone" name="input"></input>
			</view>
			<view class="cu-form-group" v-if="TabCur==1">
				<view class="title">顺丰单号</view>
				<input placeholder="请输入顺丰单号,如还无快递单可先提交" v-model="jjdanhao" name="input"></input>
			</view>
			<view class="bg-white padding margin-top" v-if="TabCur==1">
				<view>收货信息：{{platformInfo}}</view>
				<view class="padding-sm flex flex-wrap justify-center">
					<view class="cu-btn bg-red round sm" @click="copyfuc">点击复制</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">收款账户</view>
				<view class="picker" v-if="paylist.length == 0" @click="$u.route('/pages/mycenter/pay/add-pay')">
					还未设置收款账户，点击去设置~
				</view>
				<picker v-else @change="PickerChange" range-key="bankinfo" :value="index.pay" :range="paylist">
					<view class="picker">
						{{index.pay>-1?paylist[index.pay].bank_name + paylist[index.pay].bank_card :'请选择打款账户'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput"
					placeholder="请输入备注信息"></textarea>
			</view>
			<!--商品信息-->
			<view class="bg-white orderview-card-box">
				<view class="orderview-card-view orderview-shop-view">
					<view class="shop-info-view">
						<!-- <view class="cu-avatar round sm" :style="[{backgroundImage:'url('+ orderInfo.avatar +')'}]" /> -->
						<view class="text-black text-bold text-lg title-view">{{orderDetail.order_number}}</view>
					</view>
					<view class="goods-list-view">
						<view class="cu-avatar radius" v-if="orderDetail.img_params" :style="[{backgroundImage:'url('+ orderDetail.img_params.split(',')[0] +')'}]" />
						<view class="goods-info-view">
							<view class="text-black text-cut name">{{orderDetail.goods_name}} </view>
							<view class="tag-view">
							<!-- 	<block v-for="(item_s,index_s) in orderDetail.cart_info" :key="index_s">
									<text class="cu-tag sm line-red radius"
										:class="index_s == 0?'tag_1':''">{{item_s}}</text>
								</block>
								<view class="more" @tap="tagsTap">
									更多>>
								</view> -->
								<block v-if="orderDetail.type == 0">
								<view class="tag-view">
									<block v-for="(item,index) in orderDetail.cart_info" :key="index">
										<text v-if="index < 6" class="cu-tag sm line-red radius" >{{item.attr_name}}</text>
									</block>
								</view>
								</block>
								<block v-else>
									<view class="tag-view">
										<text class="cu-tag sm line-red radius">{{orderDetail.cart_info.level_name}}</text>
									</view>
								</block>
							</view>
						</view>
					</view>
					<view class="orderview-foot-view">
						<view class="sys-price">
							<view class="left-view">
								<image class="af5-img" src="/static/img/af5.png" mode="widthFix" />
								<text class="text-black">系统报价</text>
							</view>
							<text class="text-black text-right">￥ {{orderDetail.quoted_price}}</text>
						</view>
						<!-- <view class="sec-price">
							<view class="left-view">
								<image class="af5-img" src="/static/img/af5.png" mode="widthFix" />
								<text class="text-black">二次报价</text>
							</view>
							<text class="text-black text-right">￥ {{orderDetail.quoted_price}}</text>
						</view> -->
					</view>
				</view>
			</view>
			<!--商品金额-->
			<view class="bg-white orderview-card-box">
				<view class="orderview-card-view orderview-price-view">
					<view class="text-black title-view">
						<view class="title">回收报价</view>
						<view class="text-right">
							<text class="text-price">{{orderDetail.quoted_price}}</text>
						</view>
					</view>

					<view class="text-black text-bold title-right-view">
						<text class="margin-right-xs">最终回收报价：</text>
						<text class="text-price text-red">{{orderDetail.quoted_price}}</text>
					</view>

				</view>
			</view>
			<!--
			<view class="cu-form-group">
				<view class="title">序列号/IMEI</view>
				<input placeholder="请输入设备序列号/IMEI" name="input"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			-->
		</view>
		<view class="bg-white orderview-footer-fixed" @tap="addTap">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		upload
	} from "@/api/upload.js";
	import {
		addNowDay,
		gethoursInfo
	} from "@/utils/pub.js"
	import {
		getUserAddress,
		getBankList,
		recycleSendExpress,
		addBasicOrder,
		getGlobalInfo,
		recycleOrderDetail
	} from "@/api/common.js";
	export default {
		components: {},
		data() {
			return {
				index: {
					address: -1,
					time: -1,
					pay: -1,
					tags: -1,
				},
				timeIndex: [0, 0],
				pImgDeleteStatus: false,
				TabCur: 0,
				modalName: null,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '顺丰上门'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '自寄'
				}],
				takeTime: [
					[],
					[]
				],
				takeAddress: [],
				paylist: [],
				orderInfo: {
					orderNum: '2030040585838829922',
					orderDetail: [],
					name: 'iPhone XR',
					tag: ['黑色', '128GB', '大陆国行', '保修期大于330天', ],
					bg_img: '/static/goods/1.png',
					avatar: '/static/img/avatar/1.jpg',
				},
				detailId: '',
				goodsId: '',
				orderId:'',
				orderDetail:'',
				goodsInfo: '',
				cartInfo: [],
				platformInfo:'',
				checkimgshow:false,
				imgParams:[],
				uploadImgtype:'',
				textareaAValue:'' ,//用户备注
				jjname:'',//寄件名
				jjphone:'',//寄件手机
				jjdanhao:''//寄件单号
			}
		},
		onLoad(option) {
			this.getGlobalInfoFuc();
			this.initPickupTime();
			// this.detailId = option.detailId;
			// this.goodsId = option.goodsId;
			this.orderId = option.orderId;
			this.recycleOrderDetailFuc();
		},
		onShow() {
			this.getUserAddressFuc();
			this.getBankListFuc();
		},
		methods: {
			// 获取全局信息
			getGlobalInfoFuc(){
				let that = this;
				getGlobalInfo().then(res=>{
					if(res.code == 1){
						that.platformInfo = res.data.platform_receipt.recipient + res.data.platform_receipt.recipient_phone + res.data.platform_receipt.recipient_address;
					}
				})
			},
			// 复制
			copyfuc(){
				let that = this;
				uni.setClipboardData({
				    data: that.platformInfo,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			// 获取订单详情
			recycleOrderDetailFuc(){
				let that = this;
				let params = {
					"order_id":that.orderId,
				}
				recycleOrderDetail(params).then(res=>{
					if(res.code == 1){
						that.orderDetail = res.data;
						// that.basics = res.data.order_status;
					}
				})
			},
			// 初始化取货时间
			initPickupTime() {
				let that = this;
				let myDate = new Date();
				const thours = myDate.getHours();
				// const thours = 10;
				for (let i = 0; i < 3; i++) {
					if (i == 0) {
						that.takeTime[0].push({
							value: addNowDay(0, 0) + "(今天)"
						});
					} else if (i == 1) {
						that.takeTime[0].push({
							value: addNowDay(0, 1) + "(明天)"
						});
					} else if (i == 2) {
						that.takeTime[0].push({
							value: addNowDay(0, 2) + "(后天)"
						});
					}
				}
				that.takeTime[1] = gethoursInfo(0);
				console.log(that.takeTime);
			},
			TimeChange(e) {
				console.log(e);
				this.timeIndex = e.detail.value
				// this.index.time = e.detail.value
			},
			// 两列变化
			Timecolumnchange(e) {
				let that = this;
				let myDate = new Date();
				let index = e.detail.value
				let hourlist = [];
				console.log(index);
				if (index == 0) {
					hourlist = gethoursInfo(0);
					// that.$set(that.takeTime[1], hourlist);
					that.takeTime[1] = hourlist.filter((item,index)=>{
						return item
					})
				} else {
					hourlist = gethoursInfo(1);
					// that.$set(that.takeTime[1], hourlist);
					that.takeTime[1] = hourlist.filter((item,index)=>{
						return item
					})
				}
				this.$forceUpdate()
				// console.log(that.takeTime);
			},
			tabSelect(e) {
				//this.TabCur = e.currentTarget.dataset.id;
				this.TabCur = e.currentTarget.dataset.id;
				console.log(this.TabCur);
			},
			PickerChange(e) {
				this.index.pay = e.detail.value
			},
			AddressChange(e) {
				this.index.address = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			addTap() {
				let that = this;
				if (that.TabCur == 0) {
					if (that.index.address == -1) {
						return $u.toast('请添加一个地址！')
					}
					that.creatinsertBasicOrder();
				} else if (that.TabCur == 1) {
					that.creatinsertBasicOrder();
				}
				// uni.navigateTo({
				// 	url: "/pages/mycenter/orderview"
				// });
			},
			// 获取用户收货地址
			getUserAddressFuc() {
				let that = this;
				getUserAddress().then(res => {
					if (res.code == 1) {
						that.takeAddress = res.data;
						if (that.takeAddress.length > 0) {
							that.index.address = 0
						}
						that.takeAddress.forEach((item, index) => {
							item['all_detail'] = item.all_detail + '-' + item.detail;
						})
					}
				})
			},
			// 获取银行列表
			getBankListFuc(){
				let that = this;
				getBankList().then(res=>{
					if (res.code == 1) {
						that.paylist = res.data;
						if (that.paylist.length > 0) {
							that.$set(that.index, 'pay', 0);
						}
						that.paylist.forEach((item, index) => {
							item['bankinfo'] = item.bank_name + '-' + item.bank_card;
						})
						
					}
				})
			},
			// 创建订单
			creatinsertBasicOrder() {
				let that = this;
				let puttakeTime = '';
				if(that.TabCur == 0 && that.timeIndex[0] != -1 && that.timeIndex[1] != -1){
					return that.$u.toast('请选择上门取件时间');
				}else{
					puttakeTime = that.takeTime[0][that.timeIndex[0]].keyy+' '+that.takeTime[1][that.timeIndex[1]].keyy;
					console.log(puttakeTime);
				}
				let params = {
					'order_id': that.orderId,
					'user_note': that.textareaAValue,
					'bank_id': that.paylist[that.index.pay].id,
					'transport': that.TabCur + 1,
					'address_id': that.takeAddress[that.index.address].address_id,
					'express_sn': that.jjdanhao,
					'express_name': '顺丰快递',
					'take_time': puttakeTime,
					'user_name': that.jjname,
					'user_phone': that.jjphone,
				}
				recycleSendExpress(params).then(res => {
					if(res.code == 1){
						that.$u.toast('提交订单成功');
						uni.switchTab({
							url:'../mycenter/mycenter'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-list.grid>.cu-item uni-text {
		color: unset;
	}

	.orderview-card-box {
		padding: 27.27rpx 27.27rpx 0;
	}

	.orderview-card-view {
		position: relative;
		border-radius: 9.09rpx;
		padding: 18.18rpx;
		box-shadow: 0 0 14.54rpx #f1f1f1;
	}

	.translate45 {
		transform: rotate(45deg);
		transition-duration: 1s;
	}

	.orderview-shop-view {
		position: relative;

		.shop-info-view {
			position: relative;
			margin-bottom: 27.27rpx;
			line-height: 47.27rpx;
			height: 47.27rpx;

			.cu-avatar {
				position: absolute;
			}

			.title-view {
				position: relative;
				padding-left: 63.63rpx;
			}
		}

		.goods-list-view {
			position: relative;
			margin: 18.18rpx 0;

			.cu-avatar {
				position: absolute;
				height: 120rpx;
				width: 120rpx;
			}

			.goods-info-view {
				position: relative;
				padding-left: 140rpx;
				height: 120rpx;

				.name {
					position: relative;
					height: 38.18rpx;
					width: 100%;
				}

				.tag-view {
					position: relative;
					margin-bottom: 9.09rpx;
					margin-top: 7.27rpx;
					height: 33.87rpx;
					width: 100%;

					.cu-tag {
						position: relative;
						margin-bottom: 10rpx;
						top: -3.63rpx;
					}
				}

				.more {
					font-size: 24rpx;
					color: #007AFF
				}

				.text-price {
					position: relative;
					height: 36.36rpx;
					width: 100%;
				}
			}
		}

		.orderview-foot-view {
			position: relative;
			background: #FFFCFC;
			margin: 0 -18.18rpx -18.18rpx -18.18rpx;
			border-radius: 0 0 9.09rpx 9.09rpx;
			padding: 18.18rpx;

			.sys-price,
			.sec-price {
				position: relative;
			}

			.left-view {
				position: relative;
				padding-right: 181.81rpx;

				.af5-img {
					position: relative;
					margin-right: 9.09rpx;
					width: 36.36rpx;
					top: 3.63rpx;
				}
			}

			.text-right {
				position: absolute;
				right: 18.18rpx;
				top: 18.18rpx;
			}
		}
	}

	.orderview-price-view {
		position: relative;

		.title-view {
			position: relative;
			margin-bottom: 18.18rpx;

			.title {
				position: relative;
				padding-right: 181.81rpx;
			}

			.text-right {
				position: absolute;
				top: 3.63rpx;
				right: 0;
			}
		}

		.title-right-view {
			position: relative;
			margin-top: 27.27rpx;
			text-align: right;
		}

		.solid-line {
			margin: 27.27rpx 0;
		}
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

	.cu-form-group {
		.title {
			width: 160rpx;
			text-align-last: justify;
		}
	}
</style>
