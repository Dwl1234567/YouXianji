<template>
	<view class="push-box">

		<view class="zaiui-bar-view-box">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center text-black zaiui-small-routine-title">快速开单</view>
			<!-- #endif -->

			<!--标题栏-->
			<view class="text-gray zaiui-bar-box">
				<text class="text-black text-lg">快速开单</text>
				<text class="margin-left-sm">选择开单类型</text>
				<text class="cuIcon-close text-right close" @tap="closeTap"></text>
			</view>
		</view>

		<!--占位的-->
		<view class="zaiui-seat-height"></view>

		<!--中间内容区域-->
		<view class="zaiui-view-content">
			<scroll-view scroll-x class="nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''"
						v-for="(item,index) in typeListData" :key="index" @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<view class="margin-lr-sm" v-if="TabCur == 0">
				<view class="bg-white radius-4">
					<view class="cu-form-group">
						<view class="title">客户</view>
						<view class="cu-capsule radius" @tap="customerTap">
							<view class="">
								{{customerInfo.username ? customerInfo.username :'请选择客户'}}
								<text class="cuIcon-right"></text>
							</view>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">货品</view>
						<view class="cu-capsule radius">
							<view class="padding-right" @tap="scanTap">
								<view class="cu-tag bg-deepblue">
									<text class="cuIcon-scan text-white"></text>
								</view>
								<view class="cu-tag line-deepblue">
									扫
								</view>
							</view>
					
							<view class="" @tap="selectSellTap">
								<view class="cu-tag bg-red">
									<text class="iconfont icon-choosebay text-white"></text>
								</view>
								<view class="cu-tag line-red">
									选
								</view>
							</view>
						</view>
					</view>
					
					<view class="cu-list menu-avatar">
						<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''"
							v-for="(item,index) in goodsList" :key="index" @touchstart="ListTouchStart"
							@touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
							<view class="cu-avatar lg" :style="[{backgroundImage:'url('+ item.image +')'}]">
							</view>
							<view class="content">
								<view class="text-grey">{{item.product_name}}</view>
								<view class="text-grey">序列号：{{item.product_sn}}</view>
								<view class="text-gray text-sm">
									收:<text class="text-red margin-right-xs">{{item.cost_price}}</text> 调:<text
										class="margin-right-xs">{{item.peer_price}}</text> 销:<text
										class="margin-right-xs">{{item.sales_price}}</text>
								</view>
							</view>
							<view class="move">
								<view class="bg-red" @tap="delectTap(index)">删除</view>
							</view>
						</view>
					</view>
					
					<view class="cu-form-group">
						<view class="title">总价</view>
						{{outputmoney}}元
					</view>
					
					<view class="cu-form-group">
						<view class="title">应收款</view>
						<input placeholder="请输入收款金额" v-model="ReceivablesMoney" @input="changemoney"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">实收款 <text style="margin-left:30rpx">{{ActualreceiptsAll}}</text> </view>
						<view class="cu-capsule radius" @tap="showModal" data-target="Modal">
							<view class="cu-tag line-red">
								填写收款方式及价格
							</view>
							<view class="cu-tag bg-red">
								<text class="cuIcon-unfold text-white"></text>
							</view>
						</view>
					</view>
					
					<view class="cu-form-group">
						<view class="title">是否挂单</view>
						<switch  class='red' @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"  color="#e54d42"></switch>
					</view>
					<view class="guadan" :class="switchGD?'show':''">
						<view class="cu-form-group">
							<view class="title">截止选择</view>
							<picker mode="date" :value="putendtime" start="2015-09-01" end="2020-09-01" @change="DateChange">
								<view class="picker">
									{{putendtime}}
								</view>
							</picker>
						</view>
					
						<view class="cu-form-group">
							<view class="title">本次欠款（计算）</view>
							<input placeholder="欠款金额" v-model="arrearsMoney" disabled="" name="input"></input>
							<!--(抓实收款可编辑)-->
						</view>
					</view>
					<view class="cu-form-group" style="border:2rpx solid #EEEEEE">
						<textarea class="textarea" maxlength="-1" @input="textareaAInput"
							placeholder="请输入备注信息"  v-model="remark" name="input"></textarea>
					</view>
					<!--
					<view class="cu-form-group">
						<view class="title">备注</view>
						<input placeholder="请输入备注信息" v-model="remark" name="input"></input>
					</view>-->
				</view>
				<view class="orderview-footer-fixed">
					<view class="flex flex-direction">
						<button class="cu-btn bg-red radius-4 margin-tb-sm lg" @click="upShareimg">确定</button>
					</view>
				</view>
			</view>
			
			
			<view class="margin-lr-sm" v-if="TabCur == 1">
				<view class="bg-white radius-4">
					<view class="cu-form-group client">
						<view class="title">客户</view>
						<view class="cu-capsule radius" @tap="customerTap">
							<view class="picker">
								{{customerInfo.username ? customerInfo.username :'请选择客户'}}
								<text class="lg cuIcon-right text-grey"></text>
							</view>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">货品</view>
						<view class="cu-capsule radius" @tap="selectRecycleTap">
							<view class="cu-tag bg-deepblue ">
								<text class="cuIcon-add text-white"></text>
							</view>
							<view class="cu-tag line-deepblue">
								选择货品
							</view>
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item"  :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in hsdangoodsList"
						:key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
						:data-target="'move-box-' + index" >
							<view class="cu-avatar lg" :style="[{backgroundImage:'url('+ item.image +')'}]">
							</view>
							<view class="content">
								<view class="text-grey">{{item.name}}</view>
								<view class="text-gray text-sm">
									收:<text class="text-red margin-right-xs">{{item.cost_price}}</text> 调:<text
										class="margin-right-xs">{{item.peer_price}}</text> 销:<text
										class="margin-right-xs">{{item.sales_price}}</text>
								</view>
							</view>
							<view class="move">
								<view class="bg-red" @tap="delectTap(index)">删除</view>
							</view>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">货品总数(计算)</view>
						{{hsdangoodsList.length}}
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">应付款 {{hsyinggaiMoney}}</view>
						<view class="cu-capsule radius" @tap="showModal2" data-target="Modal">
							<view class="cu-tag line-red">
								付款方式及价格
							</view>
							<view class="cu-tag bg-red">
								<text class="cuIcon-unfold text-white"></text>
							</view>
						</view>
					</view>
					<view class="cu-form-group" style="border:2rpx solid #EEEEEE">
						<textarea class="textarea" maxlength="-1" @input="textareaAInput"
							placeholder="请输入备注信息"  v-model="remark1" name="input"></textarea>
					</view>
					<!--<view class="cu-form-group">
						<view class="title">备注</view>
						<input placeholder="请输入备注" v-model="remark1" name="input"></input>
					</view>-->
				</view>
				
				<view class="orderview-footer-fixed">
					<view class="flex flex-direction">
						<button class="cu-btn bg-green radius-4 margin-tb-xs lg" @click="upbiaojiTap">预制开单</button>
						<button class="cu-btn bg-red radius-4 margin-tb-xs lg" @click="upShareimg">确定开单</button>
					</view>
				</view>
			</view>
		</view>
		
		<!--销售开单  收款填写-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">填写收款方式及价格</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-list grid col-2">
						<view class="cu-item bg-deepblue">
							<input class="text-green text-lg" type="number" v-model="weixinnum" placeholder="微信" @input="ActualreceiptsAllFuc"></input>
						</view>
						<view class="cu-item bg-deepblue">
							<input class="text-blue" type="number" v-model="alipaynum" placeholder="支付宝" @input="ActualreceiptsAllFuc"></input>
						</view>
						<view class="cu-item bg-deepblue">
							<input class="text-red" type="number" v-model="xianjinnum" placeholder="现金" @input="ActualreceiptsAllFuc"></input>
						</view>
						<view class="cu-item bg-deepblue">
							<input class="text-purple" type="number" v-model="dihuonum" placeholder="抵货款" @input="ActualreceiptsAllFuc"></input>
						</view>
					</view>
					<view class="margin-top">
						总计：<text class="text-red">{{ActualreceiptsAll}}</text>
					</view>
					<view class="cu-form-group pingzheng" :class="switchGD?'hide':''">
						<view class="title">收款凭证</view>
						<view class="cu-capsule round" @tap="paiTap">
							<view class="cu-tag bg-deepblue">
								<text class="cuIcon-camera text-white"></text>
							</view>
							<view class="cu-tag line-deepblue">
								图
							</view>
						</view>
					</view>
					
					<view class="cu-form-group" v-if="imgList.length > 0">
						<view class="grid col-3 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
								:data-url="imgList[index]">
								<image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--回收开单 付款填写-->
		<view class="cu-modal" :class="modalName2=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">填写付款方式及价格</view>
					<view class="action" @tap="hideModal2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-list grid col-2">
						<view class="cu-item bg-deepblue">
							<input class="text-green" type="number" v-model="hsweixinnum" placeholder="微信" @input="ActualreceiptsAllFuchs"></input>
						</view>
						<view class="cu-item bg-deepblue">
							<input class="text-blue" type="number" v-model="hsalipaynum" placeholder="支付宝" @input="ActualreceiptsAllFuchs"></input>
						</view>
						<view class="cu-item bg-deepblue">
							<input class="text-red" type="number" v-model="hsxianjinnum" placeholder="现金" @input="ActualreceiptsAllFuchs"></input>
						</view>
						<view class="cu-item bg-deepblue">
							<input class="text-purple" type="number" v-model="hsdihuonum" placeholder="抵货款" @input="ActualreceiptsAllFuchs"></input>
						</view>
					</view>
					<view class="margin-top">
						已填写：<text class="text-red">{{hsActualreceiptsAll}}</text>
						<text class="margin-left-sm">应付款：</text><text class="text-red">{{hsyinggaiMoney}}</text>
						<text class="margin-left-sm">剩余：</text><text class="text-red">{{hsarrearsMoney}}</text>
					</view>
					<!---->
					<view class="cu-form-group pingzheng" :class="switchGD?'hide':''">
						<view class="title">客户收款账户</view>
						<view class="cu-capsule round" @tap="paiTap">
							<view class="cu-tag bg-deepblue">
								<text class="cuIcon-camera text-white"></text>
							</view>
							<view class="cu-tag line-deepblue">
								图
							</view>
						</view>
					</view>
					<view class="cu-form-group" v-if="imgList1.length > 0">
						<view class="grid col-3 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList1" :key="index" @tap="ViewImage"
								:data-url="imgList1[index]">
								<image :src="imgList1[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<u-action-sheet :actions="upimageList" :closeOnClickAction="true" @close="closeUpimg" :cancelText="'取消'"
			@select="selectUpimg" :show="showupimage"></u-action-sheet>
		<!--底部导航-->
		<footer-tabbar :tabID='2' :msgDot='true' />
	</view>
</template>

<script>
	// 底部tabbar
	import footerTabbar from './components/footer-tabbar.vue';
	//import _sell_data from '@/static/data/sell.js';	//虚拟数据
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		erpProductGetdata,
		erpDayin,
		updatesingletransfer,
		selladd,
		erppurchaseclickattrview,
		erppurchaseadd,erppurchaseclickattrview1
	} from "@/api/erpapi.js"
	import {
		raiseUpload
	} from "@/api/upload.js";
	export default {
		name: 'push',
		components: {
			//typeList
			footerTabbar
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				typeListData: [],
				index: 1,
				customer: [],
				switchA: false,
				switchGD: false,
				modalName: null,
				modalName2: null,
				customerInfo: '',
				goodsList: [],//销售单
				hsgoodsList:[],//回收单
				hsdangoodsList:[],//回收货品
				outputmoney:0, //产值
				ReceivablesMoney:0,//应收款
				ActualreceiptsJson:'',//实收款json
				weixinnum:'',
				alipaynum:'', 
				xianjinnum:'',  
				dihuonum:'',
				hsweixinnum:'',
				hsalipaynum:'', 
				hsxianjinnum:'',  
				hsdihuonum:'',
				ActualreceiptsAll:0,//实收款总计
				arrearsMoney:0,//本次欠款 
				imgList: [],//销售图片
				imgList1: [],//回收图片
				upgetimgList:[],//销售图片
				upgetimgList1:[],//回收图片
				showupimage: false,
				upimageList: [{
						name: '拍照',
						value: 1,
					},
					{
						name: '相册选图',
						value: 2,
					}
				],
				remark:'',//备注
				remark1:'',//回收备注
				putendtime:'2022-02-02',//挂单时间
				hsgoods_id:'',
				hsActualreceiptsAll:'',//回收已填写金额
				hsarrearsMoney:'',//回收剩余款
				hsyinggaiMoney:'',//回收应付款
				hsReceivablesMoney:''
			}
		},
		onLoad(options) {
			//加载虚拟数据
			//this.typeListData();
			let typeListData = [{}];
			typeListData = [{
				id: 0,
				name: '销售'
			}, {
				id: 1,
				name: '回收'
			}];
			this.typeListData = typeListData;
			// this.erppurchaseclickattrviewFuc('3497');
			// this.erppurchaseclickattrviewFuc('3497');
			//this.TabCur = typeListData[0];
			//console.log(typeListData);
		},
		onShow() {
			let that = this;
			uni.$once('updatecustomer', function(data) {
				// console.log(data);
				that.customerInfo = {
					...data
				};
			})
			// uni.$once('hsgoodsId', function(data) {
			// 	console.log(data);
			// 	this.hsgoods_id = data
			// })
		},
		methods: {
			// 截止挂单时间
			DateChange(e){
				console.log(e);
				let data = e.detail.value;
			},
			// 应收款
			changemoney(){
				this.arrearsMoney = this.ReceivablesMoney - this.ActualreceiptsAll;
			},
			// 实收款总计
			ActualreceiptsAllFuc(){
				// this.ActualreceiptsAll = 0;
				// this.ReceivablesMoney = 0;
				this.ActualreceiptsAll = Number(this.weixinnum) + Number(this.alipaynum) + Number(this.xianjinnum) + Number(this.dihuonum)
				this.ActualreceiptsJson =JSON.stringify({wexin:Number(this.weixinnum),alipay:Number(this.alipaynum),xianjin:Number(this.xianjinnum),dihuo:Number(this.dihuonum)});
				this.arrearsMoney = this.ReceivablesMoney - this.ActualreceiptsAll;
			},
			// 回收价格
			ActualreceiptsAllFuchs(){
				// 合计
				this.hsActualreceiptsAll = Number(this.hsweixinnum) + Number(this.hsalipaynum) + Number(this.hsxianjinnum) + Number(this.hsdihuonum)
				// json
				this.hsActualreceiptsJson =JSON.stringify({wexin:Number(this.hsweixinnum),alipay:Number(this.hsalipaynum),xianjin:Number(this.hsxianjinnum),dihuo:Number(this.hsdihuonum)});
				// 欠款
				this.hsarrearsMoney = Number(this.hsyinggaiMoney) - Number(this.hsActualreceiptsAll);
				
			},
			delectTap(index) {
				this.goodsList.splice(index,1);
			},
			delectTap1(index) {
				this.hsgoodsList.splice(index,1);
			},
			erppurchaseclickattrviewFuc(id) {
				let that = this;
				erppurchaseclickattrview1({
					id: id
				}).then(res => {
					let data = res.data;
					// console.log(res.data);
					that.hsdangoodsList.push(res.data);
					that.hsyinggaiMoney = Number(that.hsyinggaiMoney) + Number(res.data.cost_price);
				})
			},
			getValue(list) {
				console.log(list, 'B页面传递的数据')
				if(list && list.sn_id){
					//判断该sn_id 是否已选择
					let snList = this.goodsList;
					let snFlag = 0;
					if(snList.length>0){
						for(var i=0;i<snList.length;i++){
							if(snList[i]['sn_id']==list.sn_id){
								snFlag = 1;
							}
						}
					}
					if(snFlag==1){
						console.log('该产品已有了');
						return ;
					}
					this.sn_id = list.sn_id;
					this.getoncegoods();
				}
				if(list && list.hsgoods_id){
					this.hsgoods_id = list.hsgoods_id;
					this.erppurchaseclickattrviewFuc(list.hsgoods_id);
				}
			},
			getDiyValue(list) {
				console.log(list, '未上架机型B页面传递的数据')
				if(list && list.sn_id){
					//判断该sn_id 是否已选择
					let snList = this.goodsList;
					let snFlag = 0;
					if(snList.length>0){
						for(var i=0;i<snList.length;i++){
							if(snList[i]['sn_id']==list.sn_id){
								snFlag = 1;
							}
						}
					}
					if(snFlag==1){
						console.log('该产品已有了');
						return ;
					}
					this.sn_id = list.sn_id;
					this.getoncegoods();
				}
				if(list && list.hsgoods_id){
					this.hsgoods_id = list.hsgoods_id;
					this.erppurchaseclickattrviewFuc(list.hsgoods_id);
				}
			},
			getoncegoods() {
				let that = this;
				erpProductGetdata({
					sn_id: this.sn_id
				}).then(res => {
					that.ReceivablesMoney = 0;
					that.outputmoney = 0;
					this.goodsList.push(res.data);
					this.goodsList.map((item,index)=>{
						that.outputmoney += Number(item.sales_price);
					})
					that.ReceivablesMoney = that.outputmoney;
				})
			},
			closeTap() {
				// this.$emit('closeTap');
				uni.navigateTo({
					url: '/pages/tabbarerp/home'
				})
			},
			SwitchA(e) {
				this.switchA = e.detail.value
				//console.log(this.switchA);
				if (this.switchA) {
					this.switchGD = true;
				} else {
					this.switchGD = false;
				}
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal2(e) {
				this.modalName2 = e.currentTarget.dataset.target
			},
			hideModal2(e) {
				this.modalName2 = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log(this.TabCur);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			customerTap() {
				uni.navigateTo({
					url: '/pages/erp/customer/customer'
				})
			},
			supplierTap() {
				uni.navigateTo({
					url: '/pages/erp/supplier/supplier'
				})
			},
			scanTap() {
				console.log(
					'调用摄像头扫一扫【二维码】,拿获取单个商品信息接口[/erp/product/getdata],前端(还是后端？)判断store_id是否本店，不是本店不输出商品信息并tips提示【仅允许销售本店商品！】'
				);
			},
			selectSellTap() {
				console.log(1234);
				uni.navigateTo({
					url: '/pages/erp/sell/add/select_product?type=0'
				})
			},
			selectRecycleTap() {
				uni.navigateTo({
					url: '/pages/erp/purchase/add/select_product'
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			typeListTap(e) {
				console.log(e);
			},
			CustomerChange(e) {

			},
			// 打印
			dayinFuc(info) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定打印该商品嘛？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							erpDayin({}).then(res => {
								that.$u.toast('打印成功!');
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			paiTap() {
				console.log('拍照、选图');
				this.showupimage = true;
			},
			closeUpimg() {
				this.showupimage = false;
			},
			selectUpimg(e) {
				console.log(e);
				if (e.value == 1) {
					this.opencamare();
				} else {
					this.openpictrue();
				}
			},
			// 使用拍照功能
			opencamare(){
				let that = this;
				let uplength = 9;
				if(that.TabCur){
					uplength = 9 - Number(that.imgList1.length);
				}else{
					uplength = 9 - Number(that.imgList.length);
				}
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						if(that.TabCur){
							if (that.imgList1.length != 0) {
								that.imgList1 = that.imgList1.concat(res.tempFilePaths)
							} else {
								that.imgList1 = res.tempFilePaths
							}
							return;
						}
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
						console.log(that.imgList);
					},
					complete:function(){
						that.checkimgshow = false;
					}
					
				});
			},
			// 使用相册功能
			openpictrue(){
				let that = this;
				let uplength = 9;
				if(that.TabCur){
					uplength = 9 - Number(that.imgList1.length);
				}else{
					uplength = 9 - Number(that.imgList.length);
				}
				console.log(uplength);
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if(that.TabCur){
							if (that.imgList1.length != 0) {
								that.imgList1 = that.imgList1.concat(res.tempFilePaths)
							} else {
								that.imgList1 = res.tempFilePaths
							}
							return;
						}
						if (that.imgList.length != 0) {
							that.imgList = that.imgList.concat(res.tempFilePaths)
						} else {
							that.imgList = res.tempFilePaths
						}
						console.log(that.imgList);
					},
					complete:function(){
						that.checkimgshow = false;
					}
				});
			},
			ChooseImage() {
				let that = this;
				let uplength = 9 - Number(this.imgList.length);
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.push = false;
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
						console.log(this.imgList);
					}
				});
				
			},
			upbiaojiTap() {
			},
			// 上传分享图片
			upShareimg(){
				let that = this;
				if(that.TabCur == 0){
					if(!that.customerInfo.id){
						return that.$u.toast('请选择客户');
					}
					if(that.goodsList.length <= 0){
						return that.$u.toast('请录入货品');
					}
					if(that.imgList.length <= 0 && !that.switchA){
						return that.$u.toast('请上传付款凭证');
					}
					let promisearr = [];
					that.imgList.forEach((item,index)=>{
						if(item.indexOf('shousifang') == -1){
							promisearr.push(raiseUpload(item));
						}else{
							that.upgetimgList.push(item);
						}
					})
					
					Promise.all(promisearr).then((res)=>{
						// console.log(res);
						res.forEach((iii)=>{
							that.upgetimgList.push(iii.data.imgurl);
						})
					})
					.finally(() => {
						that.deliveryTap();
					})
				}else if(that.TabCur == 1){
					// if(that.goodsList.length <= 0){
					// 	return that.$u.toast('请录入货品');
					// }
					// if(that.imgList.length <= 0){
					// 	return that.$u.toast('请上传付款凭证');
					// }
					
					let promisearr = [];
					that.imgList1.forEach((item,index)=>{
						if(item.indexOf('shousifang') == -1){
							promisearr.push(raiseUpload(item));
						}else{
							that.upgetimgList1.push(item);
						}
					})
					
					Promise.all(promisearr).then((res)=>{
						// console.log(res);
						res.forEach((iii)=>{
							that.upgetimgList1.push(iii.data.imgurl);
						})
					})
					.finally(() => {
						that.deliveryTap1();
					})
				}
				
			},
			DelImg(e) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: res => {
						if (res.confirm) {
							that.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			// 销售开单
			deliveryTap() {
				let that = this;
				let ids = that.goodsList.map((item,index)=>{
						return item.sn_id;
					})
				
				selladd({
					client_id:that.customerInfo.id,
					nums:that.goodsList.length,
					money:that.ReceivablesMoney,
					paytype:that.ActualreceiptsJson,
					images:that.upgetimgList.join(','),
					remark:that.remark,
					putstatus:that.switchA ? '1' : '0',
					putendtime:that.putendtime,
					snIds:ids.join(','),
					type:0,
					debt:that.arrearsMoney
				}).then(res=>{
					that.$u.toast('销售开单成功');
					setTimeout(() => {
						location.reload()
					}, 1000);
				})
			},
			// 回收开单
			deliveryTap1() {
				let that = this;
				let  money= 0;
				let  clickattr_ids= [];
				this.hsdangoodsList.map((item,index)=>{
					money = Number(money) + Number(item.cost_price)
					clickattr_ids.push(item.id);
				})
				let paramstData = {
					type:2,
					client_id:this.customerInfo?this.customerInfo.id:'',
					images:this.upgetimgList1,
					nums:this.hsdangoodsList.length,
					money:money,
					paytype:this.hsActualreceiptsJson,
					clickattr_ids:clickattr_ids.join(','),
					remark:this.remark1,
				}
				erppurchaseadd(paramstData).then(res=>{
					that.$u.toast('回收开单成功');
					setTimeout(() => {
						location.reload()
					}, 1000);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.push-box {
		position: relative;
		min-height: 50vh;
		z-index: 998;
		width: 100%;
		// display: none;
		padding-bottom: 100rpx;

		.zaiui-bar-view-box {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 999999;
			background: #FAFAFA;

			/* #ifndef MP */
			height: calc(var(--status-bar-height) + 99.99rpx);
			/* #endif */

			/* #ifdef MP */
			height: calc(var(--status-bar-height) + 189.99rpx);
			/* #endif */

			padding: var(--status-bar-height) 27.27rpx 0 27.27rpx;
			align-items: center;

			.zaiui-bar-box {
				position: relative;
				width: 100%;
				align-items: center;
				line-height: 99.99rpx;

				.close {
					position: absolute;
					right: 27.27rpx;
					font-size: 40rpx;
					bottom: 9.09rpx;
				}
			}
		}
		
		.cu-list.menu-avatar>.cu-item>.cu-avatar.lg{
			width: 60px;
			height: 60px;
		}
		.cu-list.menu-avatar>.cu-item .content {
		    left: 90px;
		    width: calc(100% - 100px);
		}
		
		.zaiui-seat-height {
			width: 100%;

			/* #ifndef MP */
			height: calc(var(--status-bar-height) + 99.99rpx);
			/* #endif */

			/* #ifdef MP */
			height: calc(var(--status-bar-height) + 199.99rpx);
			/* #endif */
		}

		.zaiui-view-content {
			padding: 0 27.27rpx 27.27rpx;
			.cu-form-group{
				background-color: unset;
			}
			.img-goods {
				font-variant: small-caps;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				-webkit-box-pack: center;
				justify-content: center;
				-webkit-box-align: center;
				align-items: center;
				white-space: nowrap;
				position: relative;
				width: 137rpx;
				height: 137rpx;
				background-size: cover;
				background-position: center;
				vertical-align: middle;
				border-radius: 12%;
			}
		}
	}

	.guadan {
		display: none;
	}

	.pingzheng.hide {
		display: none;
	}

	.guadan.show,
	.push-box.show {
		display: block;
	}

	.cu-list.menu-avatar>.cu-item .action {
		width: 150rpx;

		.print {
			padding: 0 20rpx;
			font-size: 24rpx;
			height: 48rpx;
		}
	}
	.cu-modal{
		z-index: 99;
	}
	.cu-list.grid>.cu-item:after{
		border:1px solid #fff;
		box-sizing:unset;
	}
	.orderview-footer-fixed {
		margin-top: 100rpx;
		width: 100%;
	}
</style>
