<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">订单详情</block>
		</bar-title>
		 -->
		<!--物流信息-->
		<view class="bg-white orderview-card-box" v-if="basics != 0">
			<view class="orderview-card-view orderview-address-view">
				<view class="text-lg text-bold text-black">物流信息</view>
				<view class="solid-line"></view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="bg-grey icon-view">
							<text class="cuIcon-locationfill"/>
						</view>
						<view class="content">
							<view class="text-black">
								<text>收货人：</text>
								<text>{{platformInfo.recipient}}</text>
								<text class="margin-left">{{platformInfo.recipient_phone}}</text>
							</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">{{platformInfo.recipient_address}}</view>
							</view>
						</view>
						<view class="right text-xl" @tap="wuliuTap">
							<text class="margin-right cuIcon-right icon"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--商品信息-->
		<view class="bg-white orderview-card-box">
			<view class="orderview-card-view orderview-shop-view">
				<view class="shop-info-view">
					<view class="cu-avatar round sm" :style="[{backgroundImage:'url('+ avatar +')'}]"/>
					<view class="text-black text-bold text-lg title-view">{{orderDetail.order_number}}</view>
				</view>
				<view class="goods-list-view">
					<view class="cu-avatar radius" v-if="orderDetail.img_params" :style="[{backgroundImage:'url('+ orderDetail.img_params.split(',')[0] +')'}]"/>
					<view class="goods-info-view">
						<view class="text-black text-cut name">{{orderDetail.goods_name}}</view>
						<block v-if="orderDetail.type == 0">
						<view class="tag-view">
							<block v-for="(item,index) in orderDetail.cart_info" :key="index">
								<text v-if="index < 6" class="cu-tag sm line-red radius" >{{item.attr_name}}</text>
							</block>
						</view>
						</block>
						<block v-else>
							<view class="tag-view">
								<text class="cu-tag sm line-red radius" v-if="orderDetail.cart_info">{{orderDetail.cart_info.level_name}}</text>
							</view>
						</block>
					</view>
				</view>
				<view class="orderview-foot-view">
					<view class="sys-price">
						<view class="left-view">
							<image class="af5-img" src="/static/img/af5.png" mode="widthFix"/>
							<text class="text-black">系统报价</text>
						</view>
						<text class="text-black text-right">￥ {{orderDetail.quoted_price}}</text>
					</view>
					<view class="sec-price">
						<view class="left-view">
							<image class="af5-img" src="/static/img/af5.png" mode="widthFix"/>
							<text class="text-black">二次报价</text>
						</view>
						<text class="text-black text-right">￥ {{orderDetail.quoted_price}}</text>
					</view>
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
				<view class="text-black title-view">
					<view class="title">活动加价</view>
					<view class="text-right">
						<text class="margin-right-xs">+</text>
						<text class="text-price">0</text>
					</view>
				</view>
				<view class="text-black text-bold title-right-view">
					<text class="margin-right-xs">最终回收报价：</text>
					<text class="text-price text-red">{{orderDetail.quoted_price}}</text>
				</view>
				
				<view class="solid-line"></view>
				
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-red margin-tb-sm lg"  @click="callKefu()">联系客服</button>
				</view>
			</view>
		</view>
		
		<!--订单信息-->
		<view class="bg-white orderview-card-box">
			<view class="orderview-card-view orderview-order-view">
				<view class="text-lg text-bold text-black">订单信息</view>
				<view class="solid-line"></view>
				<view class="text-black title-view">
					<view class="title">订单编号</view>
					<view class="text-right">
						<text class="margin-right-xs">{{orderDetail.order_number}}</text>
						<button class="cu-btn sm line-black">复制</button>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">订单状态</view>
					<view class="text-right">
						<text class="margin-right-xs" v-if="basics == 0">
							等待用户发货
						</text>
						<text class="margin-right-xs" v-if="basics == 1">
							已发货，物流运输中
						</text>
						<text class="margin-right-xs" v-if="basics == 2">
							已到货，质检中
						</text>
						<text class="margin-right-xs" v-if="basics == 3">
							已质检，待财务打款
						</text>
						<text class="margin-right-xs" v-if="basics == 4">
							已打款，待用户确认
						</text>
						<text class="margin-right-xs" v-if="basics == 5">
							交易已完成
						</text>
						<text class="margin-right-xs" v-if="basics == 6">
							交易已取消
						</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">下单时间</view>
					<view class="text-right">
						<text>{{orderDetail.add_time}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">机器型号</view>
					<view class="text-right">
						<text>{{orderDetail.goods_name}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">系统估价</view>
					<view class="text-right">
						<text>￥{{orderDetail.quoted_price}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">活动加价</view>
					<view class="text-right">
						<text>￥{{0}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">二次报价</view>
					<view class="text-right">
						<text>￥{{orderDetail.quoted_price}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">报价备注</view>
					<view class="text-right">
						<text>{{orderDetail.system_note}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">结算价格</view>
					<view class="text-right">
						<text>￥{{orderDetail.quoted_price}}</text>
					</view>
				</view>
				<view class="text-black title-view" v-if="orderDetail.bank_info">
					<view class="title">收款方式</view>
					<view class="text-right">
						<text>{{orderDetail.bank_info.split(',')[0]}}</text>
					</view>
				</view>
				<view class="text-black title-view"  v-if="orderDetail.bank_info">
					<view class="title">收款姓名</view>
					<view class="text-right">
						<text>{{orderDetail.bank_info.split(',')[1]}}</text>
					</view>
				</view>
				<view class="text-black title-view"  v-if="orderDetail.bank_info">
					<view class="title">收款银行</view>
					<view class="text-right">
						<text>邮储银行</text>
					</view>
				</view>
				<view class="text-black title-view"  v-if="orderDetail.bank_info">
					<view class="title">收款账户</view>
					<view class="text-right">
						<text>{{orderDetail.bank_info.split(',')[2]}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">用户备注</view>
					<view class="text-right">
						<text>{{orderDetail.user_note}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white orderview-card-hight-box"/>
		
		<!--底部-->
		<view class="foot-hight-view"/>
		
		<view class="bg-white orderview-footer-fixed orderview-foot-padding-bottom" v-if="basics == 0">
			<button class="cu-btn line-black radius" @tap="cancelTap">取消订单</button>
			<button class="cu-btn bg-red" @tap="deliveryTap">去发货</button>
		</view>
		
		<view class="bg-white orderview-footer-fixed orderview-foot-padding-bottom" v-if="basics == 1">
			<button class="cu-btn line-black radius" @click="callKefu()">联系客服</button>
			<button class="cu-btn bg-red" @tap="logisticsviewTap">物流查询</button>
		</view>
		
		<view class="bg-white orderview-footer-fixed orderview-foot-padding-bottom" v-if="basics == 2">
			<button class="cu-btn bg-red" @click="callKefu()">联系客服</button>
			<!--催质检-->
		</view>
		
		<view class="bg-white orderview-footer-fixed orderview-foot-padding-bottom" v-if="basics == 3">
			<button class="cu-btn line-black radius" @click="callKefu()">联系客服</button>
			<button class="cu-btn bg-red" @tap="p2pTap">催付款</button>
		</view>
		
		<view class="bg-white orderview-footer-fixed orderview-foot-padding-bottom" v-if="basics == 4">
			<button class="cu-btn bg-red" @tap="confirmReceipt">确认收款</button>
		</view>
		<view class="bg-white orderview-footer-fixed orderview-foot-padding-bottom" v-if="basics == 5">
			<button class="cu-btn line-black radius" @tap="appraiseTap">去分享</button>
			<button class="cu-btn bg-red" @click="callKefu()">联系客服</button>
			<button class="cu-btn bg-red" @tap="whereaboutsTap" :data-id="orderId">查看钱款去向</button>
		</view>
		
		<!--测试下一步，接入时去掉-->
		<!-- <view class="add-btn-view-box" @tap="nextTap">
			<button class="cu-btn cuIcon-play_forward_fill bg-red"></button>
		</view> -->
		
		<!--弹出框-->
		<!--确认收货-->
		<view class="cu-modal bottom-modal" :class="bottomModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white solid-bottom">
					<view class="text-black text-center title">手机安全验证</view>
					<text class="text-gray cuIcon-close close" @tap="closeModalTap"></text>
				</view>
				<view class="bg-white modal-view">
					<view class="content">
						<view class="tel-btn-view">
							<view class="text-black tel-view">验证码已发至：138****8000</view>
							<button class="cu-btn sm" @tap="getCodeKey" v-if="btnKey">获取</button>
							<button class="cu-btn sm" v-else>56s</button>
						</view>
						<view class="text-sm text-black margin-tb">
							<text>确认收款后，交易将结束。您之前寄送到收四方的</text>
							<text class="text-red">iPhone XR</text>
							<text>，将会属于收四方。</text>
						</view>
						<view class="text-sm text-gray margin-bottom">
							提醒:确认收款后机器将脱离个人,请仔细核对是否收到款项再点击确认收款。
						</view>
						<view class="code-view">
							<text class="code" v-if="!codeKey[0]"> — </text>
							<text class="code" v-else> {{codeKey[0]}} </text>
							
							<text class="code" v-if="!codeKey[1]"> — </text>
							<text class="code" v-else> {{codeKey[1]}} </text>
							
							<text class="code" v-if="!codeKey[2]"> — </text>
							<text class="code" v-else> {{codeKey[2]}} </text>
							
							<text class="code" v-if="!codeKey[3]"> — </text>
							<text class="code" v-else> {{codeKey[3]}} </text>
						</view>
					</view>
					
					<!--数字键盘-->
					<view class="num-lock-view">
						<view class="cu-list grid col-3 solid-top">
							<block v-for="(item,index) in 9" :key="index">
								<view class="cu-item" @tap="codeKeyTap(item)">
									<text class="text-black num">{{item}}</text>
								</view>
							</block>
							<view class="cu-item">
								<text class="text-black num"></text>
							</view>
							<view class="cu-item" @tap="codeKeyTap(0)">
								<text class="text-black num">0</text>
							</view>
							<view class="cu-item" @tap="codeKeyDelTap">
								<text class="cuIcon-close close"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		recycleOrderDetail,
		getGlobalInfo
	} from "@/api/common.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				orderId: '',
				orderDetail:'',
				basics: 0, 	//订单状态值
				showad:true,
				bg_img: '/static/goods/1.png', 
				avatar: '/static/img/avatar/1.jpg', 
				cancel: false, //订单是否关闭  false已关闭  true正常
				basicsList: [
					{cuIcon: 'time',name: '待发货', name_s: '已发货'}, //用户操作 0待发货 1已发货
					{cuIcon: 'deliver',name: '未到货', name_s: '已到货'},	//快递操作 1未到货 2已到货
					{cuIcon: 'repair',name: '待质检', name_s: '已质检'}, //分拣操作  2待质检 3已质检
					{cuIcon: 'recharge',name: '未打款', name_s: '已打款'},	//财务操作 3未打款  4已打款
					{cuIcon: 'pay',name: '待收款', name_s: '已收款'},	//用户确认  4待收款  5已收款
					{cuIcon: 'medal',name: '已完成', name_s: '已关闭'}	//订单最后状态是否关闭 5已完成 6已关闭
				], 
				bottomModal: false, 
				codeKey: [], 
				btnKey: true,
				platformInfo:'',
			}
		},
		onLoad(option) {
			let that = this;
			that.orderId = option.orderId;
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数
			console.log(that.orderId); //打印出上个页面传递的参数。
			that.recycleOrderDetailFuc();
			that.getGlobalInfoFuc();
		},
		onReady() {
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			// 联系客服
			callKefu() {
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			},
			// 获取全局信息
			getGlobalInfoFuc(){
				let that = this;
				getGlobalInfo({}).then(res=>{
					if(res.code == 1){
						that.platformInfo = res.data.platform_receipt;
					}
				})
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
						that.basics = res.data.order_status;
					}
				})
			},
			//模拟状态
			nextTap() {
				this.basics = this.basics == this.basicsList.length ? 0 : this.basics + 1;
				//if
				//console.log(this.basics);
			},
			//取消订单
			cancelTap(){
				uni.showModal({
				    title: '提示',
					mask:true,
				    content: '确定要取消这个回收订单吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//去发货
			deliveryTap(){
				let that = this;
				uni.showModal({
				    title: '选择发货的方式',
					mask:true,
				    content: '自行寄出仅限于顺丰快递哦！',
					cancelText:'自行寄出',
					cancelColor:'#007AFF',
					confirmColor:'#007AFF',
					confirmText:'顺丰上门',
				    success: function (res) {
				        if (res.confirm) {
							console.log('顺丰上门');
							uni.navigateTo({
								url:'../recycling/go-delivery?type=0&orderId='+that.orderId
							})
				        } else if (res.cancel) {
							console.log('自行寄出');
							uni.navigateTo({
								url:'../recycling/go-delivery?type=1&orderId='+that.orderId
							})
				        }
				    }
				});
			},
			//催付款
			p2pTap(){
				uni.showToast({
				    title: '已提交',
				    duration: 2000,
					success: function (res) {
					    //console.log(res);
					}
				});
			},
			//钱款去向
			whereaboutsTap(e){
				let orderId = e.currentTarget.dataset.id;
				console.log(orderId);
				uni.navigateTo({
					url: '/pages/mycenter/whereabouts?orderId=' + orderId
				});
			},
			confirmReceipt() {
				uni.showModal({
				    title: '收款提醒',
				    content: '请务必确认已收到款后再确认收款，避免造成不必要的麻烦和损失！',
					confirmText: '确认收款',
					confirmColor: '#0081ff',
					class: 'orderview-modal',
				    success: res => {
				        if (res.confirm) {
							this.bottomModal = true;
				        }
				    }
				});
			},
			closeModalTap () {
				this.bottomModal = false;
			},
			codeKeyTap (index) {
				if(this.codeKey.length < 4) {
					this.codeKey.push(index);
				}
			},
			codeKeyDelTap() {
				this.codeKey.pop();
			},
			getCodeKey() {
				this.btnKey = false;
			},
			appraiseTap() {
				//带本图片参数跳转
				uni.navigateTo({
					url: "/pages/appraise/form"
				});
			},
			//物流信息
			logisticsTap(){
				uni.navigateTo({
					url: "/pages/mycenter/logistics/logistics"
				});
			},
			//物流信息查询
			logisticsviewTap(){
				uni.navigateTo({
					url: "/pages/mycenter/logistics/logisticsview"
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.cu-steps .cu-item {
		&:before {
			width: calc(100% - 72.72rpx);
			border-bottom: 5.45rpx solid #FFF3F3;
			left: calc(0px - (100% - 72.72rpx) / 2);
			top: 34.54rpx;	
		}
		.icon-view {
			border-radius: 181.81rpx;
			height: 72.72rpx;
			width: 72.72rpx;
			margin: auto;
			margin-bottom: 14.54rpx;
			box-sizing: border-box;
			border: 7.27rpx solid #FFF3F3;
			text {
				font-size: 36.36rpx;
				line-height: 61.81rpx;
			}
		}
	}
	.cu-steps .cu-item.select {
		&:before {
			border-color: #e54d42;
		}
		.icon-view {
			border: 7.27rpx solid #e54d42;
		}
	}
	.orderview-card-box {
		padding: 27.27rpx 27.27rpx 0;
	}
	.orderview-card-hight-box {
	    height: 45.45rpx;	
	}
	.orderview-card-view {
		position: relative;
		border-radius: 9.09rpx;
		padding: 18.18rpx;
		box-shadow: 0 0 14.54rpx #f1f1f1;
	}
	.orderview-goods-ad-view {
		.cu-avatar {
			position: absolute;
			height: 136.36rpx;
			width: 136.36rpx;
		}
		.goods-info-view {
			position: relative;
			padding-left: 154.54rpx;
			padding-right: 145.45rpx;
			height: 136.36rpx;
			.cu-tag {
				font-size: 21.81rpx;
				padding: 0 18.18rpx;
				height: 36.36rpx;
				border-radius: 18.18rpx 3.63rpx;	
			}
			.text-black {
				margin-top: 18.18rpx;
				margin-bottom: 7.27rpx;
			}
		}
		.goods-btn-view {
			position: absolute;
			line-height: 136.36rpx;
			height: 136.36rpx;
			right: 18.18rpx;
			top: 18.18rpx;
		}
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
				height: 154.54rpx;
			    width: 154.54rpx;
			}
			.goods-info-view {
				position: relative;
				padding-left: 172.72rpx;
				height: 154.54rpx;
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
						margin-bottom:10rpx;
						top: -3.63rpx;
					}
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
			.sys-price, .sec-price{
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
	.orderview-order-view {
		position: relative;
		.solid-line {
		    margin: 27.27rpx 0;	
		}
		.title-view {
			position: relative;
			margin-bottom: 18.18rpx;
			&:last-child {
				margin-bottom: 12.72rpx;
			}
			.title {
			    position: absolute;
			    top: 3.63rpx;
			    left: 0;
			}
			.text-right {
			   position: relative;
			   padding-left: 181.81rpx;
				.cu-btn {
				    padding: 0 10.9rpx;
				    height: 30.9rpx;
					top: -3.63rpx;
				}
			}
		}
	}
	.orderview-address-view {
		position: relative;
		.solid-line {
		    margin: 18.18rpx 0;	
		}
		.cu-list.menu-avatar>.cu-item {
			height: 55px;
			&:after {
				width: 0;
				height: 0;
				border-bottom: 0;
			}
			.icon-view {
			    position: absolute;
				border-radius: 100%;
				text-align: center;
				line-height: 45.45rpx;
				height: 45.45rpx;
				width: 45.45rpx;
			    left: 9.09rpx;
			    top: 25.45rpx;
			}
			.content {
			    left: 72.72rpx;
			    width: calc(100% - 94.54rpx);
			}
		}
	}
	.orderview-status-img-view {
		position: relative;
		.are-img-view {
			position: relative;
			margin-bottom: 18.18rpx;
			.are-img {
			    width: 327.27rpx;	
			}
		}
	}
	.orderview-title-view {
		position: relative;
		margin: 36.36rpx 0 0;
		.img-anc {
		    position: relative;
		    width: 36.36rpx;
		    top: 3.63rpx;
		}
	}
	.orderview-recommend-goods-list-view {
		position: relative;
		.flex-wrap {
		    padding: 9.09rpx;	
			.basis-df {
				width: 50%;
				padding: 0 9.09rpx;
			}
		}
		.list-itme {
			text-align: center;
			margin-bottom: 18.18rpx;
			.cu-avatar {
				width: 347.27rpx;
			    height: 347.27rpx;
			}
			.goods-info-view {
				position: relative;
				padding: 14.54rpx;
				text-align: left;
				.text-price {
				    margin: 9.09rpx 0;
				}
				.foot-box {
					position: relative;
					.cu-tag {
					    position: absolute;
					    right: 0;
					    top: 0;
					}
				}
			}
		}
	}
	.foot-hight-view {
		width: 100%;
		height: calc((env(safe-area-inset-bottom) / 2) + 109.09rpx);
	}
	.orderview-footer-fixed {
		position: fixed;
		z-index: 999999;
		bottom: 0;
		width:100%;
		box-shadow: 0 -3.63rpx 10.9rpx 0 #eaeaea;
		padding: 18.18rpx 27.27rpx;
		text-align: right;
		.cu-btn {
		    margin-left: 10px;	
		}
	}
	.cu-modal.bottom-modal {
		.cu-bar {
			min-height: 81.81rpx;
			.title {
				position: relative;
				width: 100%;
			}
			.close {
			    position: absolute;
				font-size: 36.36rpx;
			    right: 27.27rpx;
			}
		}
		.modal-view {
			position: relative;
			width: 100%;
			.content {
			    position: relative;
				text-align: left;
			    padding: 27.27rpx 18.18rpx;
				.tel-btn-view {
					position: relative;
					width: 100%;
					.tel-view {
					    position: relative;
						padding-right: 163.63rpx;
						line-height: 47.27rpx;
					    height: 47.27rpx;
					}
					.cu-btn {
					    position: absolute;
					    right: 0;
					    top: 0;
					}
				}
				.code-view {
					position: relative;
					text-align: center;
					.code {
					    font-size: 54.54rpx;
					}
					.code + .code {
						margin-left: 18.18rpx;
					}
				}
			}
			.num-lock-view {
				position: relative;
				margin-bottom: -2rpx;
				.solid-top::after {
				    border-top: 2rpx solid rgba(0, 0, 0, 0.1);
				}
				.cu-list.grid>.cu-item {
					text {
						color: inherit;
					}
					.num {
					    font-size: 40rpx;
					}
					.close {
					    font-size: 32.72rpx;
					    margin-top: 9.09rpx;
					}
					&:active {
						background-color: #f0f0f0;
					}
				}
			}
		}
	}
	.cu-avatar{
		background-color: unset;
	}
	
</style>
