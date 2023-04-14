<template>
	<view class="content">
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">我的地址</block>
		</bar-title>
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input text-right" type="text" v-model="addressData.linkman" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input text-right" type="number" v-model="addressData.phonenumber" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" v-on:click="showCityPicker()">
			<text class="tit">地区</text>
			<view class="input text-right">
				{{cityLebel}}
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">详细</text>
			<input class="input text-right" type="text" v-model="addressData.detailAddress" placeholder="详细地址,楼号" placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.is_default" color="#FFB629" @change="switchChange" class="text-right"/>
		</view>
		<button class="add-btn text-color-yellow radius-6" @click="confirm">保存</button>
		
		<mpvue-city-picker @onChange="onChange" @onCancel="onCancel"
		 @onConfirm="onConfirm" ref="mpvueCityPicker" ></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvueCityPicker.vue';
	import {
		saveUserAddress
	} from "@/api/commons.js"
	
	import {
		AddressInfo,
		AddressEdit,
		AddressAdd
	} from "@/api/mall.js";
	import barTitle from '@/components/common/basics/bar-title';
	
	export default {
		components: {
			mpvueCityPicker,
			barTitle
		},
		data() {
			return {
				addressData: {
					linkman: '',
					phonenumber: '',
					detailAddress: '',
					provinceId: 0,
					cityId: 0,
					regionId: 0,
					is_default: false
				},
				pickerValueDefault: [0, 0, 0] ,//城市选择器默认值 省市区id
				cityLebel:'请选择地区',
				pagetype:''
			}
		},
		onLoad(option) {
			let title = '新增收货地址';
			if(option.type === 'edit'){
				this.pagetype = option.type
			}
			if (option.type === 'edit') {
				
				this.getInfo(option);
				
				title = '编辑收货地址'
			} else {

				// this.$refs.mpvueCityPicker.creat(this.pickerValueDefault);
			};
			this.manageType = option.type;
			uni.setNavigationBarTitle({ 
				title
			})
			
		},
		onReady() {
			if (this.pagetype === 'edit') {
				this.$refs.mpvueCityPicker.creat(this.pickerValueDefault);
			} else {
				this.$refs.mpvueCityPicker.creat(this.pickerValueDefault);
			}
		},
		methods: {
			// 获取地址详情
			async getInfo(option){
				this.addressData = {
					addressId: JSON.parse(option.query).addressId,
					linkman: JSON.parse(option.query).linkman,
					phonenumber: JSON.parse(option.query).phonenumber,
					detailAddress: JSON.parse(option.query).detailAddress,
					provinceId: JSON.parse(option.query).provinceId,
					cityId: JSON.parse(option.query).cityId,
					regionId: JSON.parse(option.query).regionId,
					is_default: JSON.parse(option.query).defaultAble === '1' ? true : false	
				}
				var pickerValueDefault = [];
				pickerValueDefault.push(JSON.parse(option.query).provinceId);
				pickerValueDefault.push(JSON.parse(option.query).cityId);
				pickerValueDefault.push(JSON.parse(option.query).regionId);
				this.pickerValueDefault = pickerValueDefault;
				// this.$refs.mpvueCityPicker.creat(pickerValueDefault);
				
			},
			// 城市选择器
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			// 城市选择器改变值
			onChange(e) {
				// console.log('选择的值')
				// console.log(e);
			},
			// 城市选择器关闭
			onCancel(e) {
				//console.log(e);
			},
			// 城市选择器确定
			onConfirm(e) {
				this.cityLebel = e.label;
				this.pickerValueDefault = e.value;
				this.addressData.provinceId = this.pickerValueDefault[0];
				this.addressData.cityId = this.pickerValueDefault[1];
				this.addressData.regionId = this.pickerValueDefault[2];
			},
			//默认地址
			switchChange(e) {
				this.addressData.is_default = e.detail.value;
			},
			//提交
			async confirm() {
				//Deep Clone
				let data = JSON.parse(JSON.stringify(this.addressData));
				if (!data.linkman) {
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if (!data.phonenumber) {
					this.$api.msg('请输入手机号码');
					return;
				}
				if (!data.detailAddress) {
					this.$api.msg('请填详细地址信息');
					return;
				}
				data.defaultAble = data.is_default == true ? '1' : '0';
				let action = this.manageType == 'edit' ? 'edit' : 'add';
					await saveUserAddress(data).then(res=>{
						// let result = await this.$api.request('/address/' + action, 'POST', data);
						if (res) {
							// this.$api.prePage().refreshList(data, this.manageType);
							setTimeout(() => {
								uni.navigateBack()
							}, 800)
						}
					})
				
				
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;
		border-bottom: 1px #D8D8D8 solid;
		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: #232323;
			font-weight: 400;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {

		.tit {
			color: #232323;
			font-weight: 400;
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		margin: 60upx auto;
	}
</style>
