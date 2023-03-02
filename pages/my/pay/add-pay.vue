<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">新增收款账号</block>
			
		</bar-title>

		<!--表单-->
		<view class="cu-form-group margin-top">
			<view class="title">收款姓名</view>
			<input placeholder="您的姓名" @input="nameInput" v-model="bankInfo.bankusername"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="nameClose" />
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input placeholder="用于联系通知您的号码" @input="phoneInput" v-model="bankInfo.bankphone" />
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
			<input placeholder="请输入收款账号" @input="payInput" v-model="bankInfo.bankcard"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="payClose" />
		</view>
		<view class="cu-form-group">
			<view class="title">开关选择</view>
			<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
		</view>
		<!--小程序端显示-->
		<view class="bg-white wecanui-footer-fixed foot-pb">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red" @click="addUserBankFuc">提交保存</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		addUserBank
	} from "@/api/common.js";
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
				bankInfo:{}
			}
		},
		onLoad() {
			let that = this;
			that.bankInfo.banktype = that.multiIndex[0]
			that.bankInfo.bankname = that.multiArray[1][0]
		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
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
				that.bankInfo.banktype = that.multiIndex[0]
				that.bankInfo.bankname = that.multiArray[0][that.multiIndex[0]] + that.multiArray[1][that.multiIndex[1]];
				this.$forceUpdate()
			},
			// 添加银行卡
			addUserBankFuc() {
				let that = this;
				let params = {
					'bank_card':that.bankInfo.bankcard,
					'bank_type':that.bankInfo.banktype,
					'bank_name':that.bankInfo.bankname,
					'bank_username':that.bankInfo.bankusername,
					'bank_phone':that.bankInfo.bankphone,
					'isdefault': that.switchA?'1':'0'
				}
				addUserBank(params).then(res=>{
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
</style>
