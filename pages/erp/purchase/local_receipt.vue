<template>
	<view>
		<view class="bg-white margin-sm">
			<view class="cu-bar">
				<view class='action'>
					<text class='cuIcon-title text-red'></text>
					<text class="title">序列号/IMEI</text>
					<text class="margin-left-xs text-sm">
						<input placeholder="请输入设备序列号/IMEI" name="input" v-model="devicesn"></input>
					</text>
				</view>
			</view>
			<view class="cu-list grid col-1">
				<view class="cu-item bg-deepblue">
					<input class="text-green" v-model="hsweixinnum" placeholder="微信" @input="ActualreceiptsAllFuchs"></input>
				</view>
				<view class="cu-item bg-deepblue">
					<input class="text-blue" v-model="hsalipaynum" placeholder="支付宝" @input="ActualreceiptsAllFuchs"></input>
				</view>
				<view class="cu-item bg-deepblue">
					<input class="text-red" v-model="hsxianjinnum" placeholder="现金" @input="ActualreceiptsAllFuchs"></input>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">实际回收价</view>
				<view class="">
					<text class="text-red">{{hsActualreceiptsAll}}</text>
				</view>
			</view>
			<!--拍照-->
			<view class="cu-form-group pingzheng">
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
			<u-action-sheet :actions="upimageList" :closeOnClickAction="true" @close="closeUpimg" :cancelText="'取消'"
				@select="selectUpimg" :show="showupimage"></u-action-sheet>
				
			<view class="orderview-footer-fixed">
				<view class="flex flex-direction">
					<button class="cu-btn bg-red radius-4 margin-tb-sm lg" @click="updateTakerData">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		raiseUpload
	} from "@/api/upload.js";
	import {
		takerupdatepaymoneydata
	} from "@/api/erpapi.js";
	export default {
		components: {
		},
		data() {
			return {
				orderId:'',	//回收订单
				devicesn:'', 
				hsweixinnum:'',
				hsalipaynum:'', 
				hsxianjinnum:'',  
				imgList1: [],//回收图片
				upgetimgList1:[],//回收图片
				hsActualreceiptsAll:0,//回收已填写金额
				hsReceivablesMoney:'',
				showupimage: false,
				btnStatus:false,
				upimageList: [{
						name: '拍照',
						value: 1,
					},
					{
						name: '相册选图',
						value: 2,
					}
				],
				
			}
		},
		onLoad(options) {
			this.orderId = options.Id;
		},
		onReady() {
			
		},
		methods: {
			// 回收价格
			ActualreceiptsAllFuchs(){
				// 合计
				this.hsActualreceiptsAll = Number(this.hsweixinnum) + Number(this.hsalipaynum) + Number(this.hsxianjinnum)
				// json
				this.hsActualreceiptsJson =JSON.stringify({wexin:Number(this.hsweixinnum),alipay:Number(this.hsalipaynum),xianjin:Number(this.hsxianjinnum)});
				
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
				let openimg_num = Number(that.imgList1.length)
				let uplength = 9 - openimg_num;
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: (res) => {
						if (that.imgList1.length != 0) {
							that.imgList1 = that.imgList1.concat(res.tempFilePaths)
						} else {
							that.imgList1 = res.tempFilePaths
						}
						console.log(that.imgList1);
						return;
					},
					complete:function(){
						that.checkimgshow = false;
					}
					
				});
			},
			// 使用相册功能
			openpictrue(){
				let that = this;
				let imgNumber = 0;
				imgNumber = Number(that.imgList1.length);
				let uplength = 9 - imgNumber;
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						
						if (that.imgList1.length != 0) {
							that.imgList1 = that.imgList1.concat(res.tempFilePaths)
						} else {
							that.imgList1 = res.tempFilePaths
						}
						console.log(that.imgList1);
						return;
					},
					complete:function(){
						that.checkimgshow = false;
					}
				});
			},
			ChooseImage() {
				let that = this;
				let imglist_num = Number(this.imgList1.length);
				let uplength = 9 - imglist_num;
				uni.chooseImage({
					count: uplength, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.push = false;
						if (this.imgList1.length != 0) {
							this.imgList1 = this.imgList1.concat(res.tempFilePaths)
						} else {
							this.imgList1 = res.tempFilePaths
						}
						console.log(this.imgList1);
					}
				});
				
			},
			//提交数据
			updateTakerData(){
				let that = this;
				if(that.btnStatus){
					return that.$u.toast('提交中，请稍等……');
				}
				that.btnStatus = true;
				//序列号
				if(!that.devicesn){
					that.btnStatus = false;
					return that.$u.toast('请填写序列号');
				}
				if(that.hsActualreceiptsAll==0){
					that.btnStatus = false;
					return that.$u.toast('请填写金额');
				}
				if(that.imgList1.length==0){
					that.btnStatus = false;
					return that.$u.toast('请上传客户收款账号');
				}
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
					that.recycleTap();
				})
			
			},
			recycleTap(){
				let that = this;
				let paramsData  = {};
				paramsData['orderId'] = that.orderId;
				paramsData['devicesn'] = that.devicesn;
				paramsData['hsweixinnum'] = that.hsweixinnum;
				paramsData['hsalipaynum'] = that.hsalipaynum;
				paramsData['hsxianjinnum'] = that.hsxianjinnum;
				paramsData['images'] = that.upgetimgList1.join(',');
				takerupdatepaymoneydata(paramsData).then(res => {
					that.btnStatus = false;
					if (res.code == 1) {
						uni.$u.toast(res.msg);
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/erp/purchase/local"
							});
						}, 1000)
					}else{
						uni.$u.toast(res.msg);
					}
				})
				.catch(err => {
					that.btnStatus = false;
					uni.$u.toast(err.msg);
				})
			},
			
			DelImg(e) {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: res => {
						if (res.confirm) {
							that.imgList1.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})								
			},
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	
	.cu-list.menu > .cu-item.arrow{
		padding-top:20rpx;
		padding-bottom:20rpx;
	}
	.cu-steps .cu-item [class*="cuIcon-"], .cu-steps .cu-item .num{
		font-size:24rpx;
		line-height:24rpx;
	}
	.card-menu .goodsimg{
		width:150rpx;
		height:150rpx;
		background-size: 100% 100%;
	}
	.process-box {
		width: 100%;
		padding: 0 20rpx;
	
		// height: 300rpx;
		.scroll-Y {
			height: auto;
			max-height: 700rpx;
		}
	}
	.recy-item {
		width: 100%;
		position: relative;
		padding-bottom: 10rpx;
		margin-bottom: 10rpx;
		border-bottom: 1rpx solid #EEEEEE;
	
		.title {
			width: 20%;
			text-align: left;
			font-size: 24rpx;
			color: #555555;
			position: absolute;
			left: 0;
		}
	
		.check-list-box {
			white-space: nowrap;
			overflow: hidden;
			padding-left: 20%;
	
			.active {
				color: #FFFFFF !important;
				background-color: #f03 !important;
			}
	
			.item {
				position: relative;
				display: inline-block;
				background-color: #eeeeee;
				color: #333333;
				width: auto;
				text-align: center;
				font-size: 24rpx;
				padding: 10rpx 20rpx;
				margin-right: 10rpx;
	
				.tipsbox {
					position: absolute;
					right: 0;
					top: 0;
					width: 88rpx;
					height: 88rpx;
				}
	
				.righticon {
					width: 80rpx;
					height: 80rpx;
					margin-top: 4rpx;
					margin-right: 4rpx;
					border-radius: 10rpx;
				}
	
				.tipsticon {
					width: 36rpx;
					height: 36rpx;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
