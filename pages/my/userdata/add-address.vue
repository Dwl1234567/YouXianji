<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">新增地址</block>
			<block slot="right">
				<text class="text-orange" @click="savaAddUserAddress()">保存</text>
			</block>
		</bar-title>

		<!--表单-->
		<view class="cu-form-group margin-top">
			<view class="title">收货人</view>
			<input placeholder="您的姓名" v-model="shname" @input="nameInput" />
			<text class='cuIcon-roundclosefill text-grey' v-if="nameClose" />
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input placeholder="卖家和快递员联系您的方式" v-model="shphone" @input="phoneInput" />
			<text class='cuIcon-roundclosefill text-grey' v-if="phoneClose" />
		</view>
		<view class="cu-form-group" @tap="adshow = true">
			<view class="title">所在地区</view>
			<input disabled type="text" v-model="all_detail" placeholder-class="line" placeholder="省市区县、乡镇等" />
		</view>
		<view class="cu-form-group">
			<view class="title">详细地址</view>
			<input placeholder="请输入详细的地址信息" v-model="adrdesc" @input="addressInput" />
			<text class='cuIcon-roundclosefill text-grey' v-if="addressClose" />
		</view>
		<view class="cu-form-group">
			<view class="title">开关选择</view>
			<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
		</view>
		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<view class="bg-white wecanui-footer-fixed foot-pb" @click="savaAddUserAddress">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red">提交保存</button>
			</view>
		</view>
		<!-- #endif -->
		<uviewpicker mode="region" ref="uPicker" v-model="adshow" @confirm="getaddress"></uviewpicker>
	</view>
</template>

<script>
	import {
		addUserAddress
	} from "@/api/common.js";
	import barTitle from '@/components/common/basics/bar-title';
	import uviewpicker from '@/components/uviewpicker/uviewpicker.vue'
	export default {
		components: {
			barTitle,
			uviewpicker
		},
		data() {
			return {
				adshow: false,
				switchA: false,
				nameClose: false,
				phoneClose: false,
				addressClose: false,
				areaCode: [],
				province_id: '',
				city_id: '',
				region_id: '',
				all_detail: '',
				shname: '',
				shphone: '',
				adrdesc: '',
			}
		},
		onLoad() {

		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			showRegionPicker() {
				this.adshow = true;
			},
			//选中地址
			getaddress(e) {
				console.log(e);
				let that = this;
				that.province_id = e.province.value;
				that.city_id = e.city.value;
				that.region_id = e.area.value;
				that.all_detail = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			SwitchA(e) {
				this.switchA = e.detail.value
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
			addressInput(event) {
				let value = event.detail.value;
				if (value != "") {
					this.addressClose = true;
				} else {
					this.addressClose = false;
				}
			},
			// 保存收货地址
			savaAddUserAddress() {
				let that = this;
				let params = {
					'name': that.shname,
					'phone': that.shphone,
					'province_id': that.province_id,
					'city_id': that.city_id,
					'region_id': that.region_id,
					'detail': that.adrdesc,
					'isdefault': that.switchA ? '1' : '0',
					'all_detail': that.all_detail
				}
				addUserAddress(params).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'success',
							title: '添加成功!',
							duration: 2000,
							complete: function() {
								uni.navigateBack({
									delta: 1
								});
							}
						})

					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}

	.cu-form-group {
		.title {
			width: 166rpx;
			text-align: justify;
			text-align-last: justify;
		}
	}
</style>
