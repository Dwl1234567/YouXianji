<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">编辑收款账号</block>
			
		</bar-title>

		<!--表单-->
		<view class="cu-form-group margin-top">
			<view class="title">收款姓名</view>
			<input placeholder="您的姓名" @input="nameInput" v-model="bankInfo.bank_username" class="text-right"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="nameClose" />
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input placeholder="用于联系通知您的号码" @input="phoneInput" v-model="bankInfo.bank_phone" class="text-right"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="phoneClose" />
		</view>
		<view class="cu-form-group">
			<view class="title">账户类型</view>
			<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex"
				:range="multiArray">
				<view class="picker">
					{{multiArray[0][multiIndex[0]]}}，
					{{multiArray[1][multiIndex[1]]}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">收款账号</view>
			<input placeholder="请输入收款账号" @input="payInput" v-model="bankInfo.bank_card" class="text-right"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="payClose" />
		</view>
		<view class="cu-form-group">
			<view class="title">开关选择</view>
			<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
		</view>
		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<!-- <view class="bg-white">
			<view class="flex flex-direction">
				<button class="cu-btn text-color-yellow text-xl text-4F4F50" @click="addUserBankFuc">保存</button>
			</view>
		</view> -->
		<!-- #endif -->

	</view>
</template>

<script>
	import {
		AddressEdit,
		AddressInfo
	} from "@/api/mall.js";
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				switchA: false,
				multiIndex: [0, 0, 0],
				nameClose: false,
				phoneClose: false,
				payClose: false,
				multiArray: [
					['银行卡', '支付宝', '微信'],
					['工商银行', '建设银行', '农业银行', '邮储银行', '招商银行', '兴业银行', '浦发银行', '中信银行', '广发银行', '平安银行'],
				],
				bankInfo:{},
				bankid:''
			}
		},
		onLoad(options) {
			let that = this;
			that.bankid = options.bankid;
			// console.log(options);
			that.bankInfo.banktype = that.multiIndex[0]
			that.bankInfo.bankname = that.multiArray[1][0]
			this.AddressInfoFuc();
		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			// 获取地址信息
			AddressInfoFuc(){
				AddressInfo({
					id:this.bankid
				}).then(res=>{
					this.bankInfo = res.data;
					this.multiArray[1].map((item, itemIndex) => {
						if (item === res.data.bank_name){
							this.multiIndex = [res.data.bank_type, itemIndex]
						}
					})
				})
			},
			nameInput(event) {
				let value = event.detail.value;
				if (value != "") {
					this.nameClose = true;
				} else {
					this.nameClose = false;
				}
			},
			phoneInput(event) {
				let value = event.detail.value;
				if (value != "") {
					this.phoneClose = true;
				} else {
					this.phoneClose = false;
				}
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			payInput(event) {
				let value = event.detail.value;
				if (value != "") {
					this.payClose = true;
				} else {
					this.payClose = false;
				}
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			//联动地址，请自行开发，或在插件市场寻找插件替代，此处不做具体功能开发。
			MultiColumnChange(e) {
				let that = this;
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
			
				switch (e.detail.column) {
					case 0:
						switch (data.multiIndex[0]) {
							case 0:
								data.multiArray[1] = ['工商银行', '建设银行', '农业银行', '邮储银行', '招商银行', '兴业银行', '浦发银行', '中信银行',
									'广发银行', '平安银行'
								];
								break;
							case 1:
								data.multiArray[1] = ['个人', '企业'];
								break;
							case 2:
								data.multiArray[1] = ['账号'];
								break;
						}
						data.multiIndex[1] = 0;
						data.multiIndex[2] = 0;
						break;
						/*
					case 1:
						data.multiIndex[2] = 0;
						break;
					case 2:
						data.multiIndex[2] = 0;
						break;
						*/
				}
				// this.multiArray = data.multiArray;
				// this.multiIndex = data.multiIndex;
				that.$set(that.multiArray, data.multiArray);
				that.$set(that.multiIndex, data.multiIndex);
				that.bankInfo.bank_type = that.multiIndex[0]
				that.bankInfo.bank_name = that.multiArray[1][that.multiIndex[1]];
				this.$forceUpdate()
			},
			// 添加银行卡
			addUserBankFuc() {
				let that = this;
				let params = {
					'bank_card':that.bankInfo.bank_card,
					'bank_type':that.bankInfo.bank_type,
					'bank_name':that.bankInfo.bank_name,
					'bank_username':that.bankInfo.bank_username,
					'bank_phone':that.bankInfo.bank_phone,
					'isdefault': that.switchA?'1':'0'
				}
				AddressEdit(params).then(res=>{
					uni.showToast({
						icon:'success',
						title:'添加成功!',
						duration:1000,
						complete:function(){
							uni.navigateBack({
								delta: 1
							});
						},
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}
	button{
		width: 326px;
		height: 44px;
		margin: 0 auto;
		margin-top: 41px;
	}
</style>
