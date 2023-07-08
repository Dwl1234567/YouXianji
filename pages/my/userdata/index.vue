<template>
	<view>
		<!--设置列表-->
		<view class="cu-list menu sm-border margin-sm bg-white radius-4">
			<view class="cu-item arrow" @tap="setaAvatarTap">
				<view class="content">头像</view>
				<view class="action">
					<view class="cu-avatar radius sm" :style="[{backgroundImage:'url('+ $httpImage + userInfo.avatar +')'}]" />
				</view>
			</view>
			<view class="cu-item arrow" @tap="editNameTap">
				<view class="content">昵称</view>
				<view class="action">
					<text class="text-gray">{{userInfo.nickName}}</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">性别</view>
				<view class="action">
					<picker @change="sexPickerChange" :value="sexIndex" :range="sexPicker">
						<view class="picker text-gray">{{sexIndex>-1?sexPicker[sexIndex]:'男'}}</view>
					</picker>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">出生日期</view>
				<view class="action">
					<picker mode="date" :value="dateValue" start="1920-01-01" :end="endtime" @change="datePickerChange">
						<view class="picker text-gray">{{dateValue}}</view>
					</picker>

				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="synopsisTap">
				<view class="content">个人简介</view>
				<view class="action">
					<text class="text-gray">{{userInfo.bio}}</text>
				</view>
			</view> -->
			<!-- @tap="editPhoneTap" -->
			<view class="cu-item arrow" @tap="editPhoneTap">
				<view class="content">手机号</view>
				<view class="action">
					<text class="text-gray">{{userInfo.phonenumber}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="bankTap">
				<view class="content">银行账户</view>
			</view>
			<view class="cu-item arrow" @tap="addressTap">
				<view class="content">地址管理</view>
			</view>
		</view>

		<!-- <view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow">
				<view class="content">注销账户</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		getUserInfo,
		userset,
		addAvatar
	} from '@/api/user.js';
	import {
		UPLOAD_IMG_URL
	} from '@/config/app.js';
	import {
		getNowDay
	} from '@/utils/pub.js';
	import barTitle from '@/components/common/basics/bar-title';
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				avatar_img: '/static/img/avatar/1.jpg',
				sexIndex: 0,
				sexPicker: ['男', '女'],
				dateValue: '还未设置',
				userInfo: '',
				endtime: getNowDay(),
			};
		},
		onLoad() {
			console.log(this.endtime);
		},
		onShow() {
			let that = this;
			getUserInfo().then((res) => {
				let data = res.data;
				this.userInfo = data;
				this.sexIndex = data.sex;
				if (data.birthday) {
					that.dateValue = data.birthday;
				}
			});
		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0,
			});
		},
		methods: {
			setaAvatarTap() {
				// uni.navigateTo({
				// 	url: "/pages/my/userdata/avatar?avatar="+decodeURI(this.userInfo.avatar)
				// });
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(chooseImageRes);
						uni.uploadFile({
							url: UPLOAD_IMG_URL,
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'Authorization': Vue.prototype.$store.state.token,
								// 'content-type': 'multipart/form-data',
							},
							formData: {
								// 'file': 'touxiang'
							},
							success: (res) => {
								console.log(JSON.parse(res.data));
								let data = JSON.parse(res.data);
								// let params = {
								// 	key: 'avatar',
								// 	value: data.data.imgurl,
								// };
								// 临时更新用户头像
								this.userInfo.avatar = data.fileName
								// 传参修改用户头像信息
								addAvatar({
									avatar: data.fileName
								}).then((res) => {
									if (res.code === 200) {
										uni.showToast({
											title: '保存成功'
										})
									}
								});
							},
						});
					},
				});
			},
			editNameTap() {
				uni.navigateTo({
					url: '/pages/my/userdata/edit-name?name=' + this.userInfo.nickName,
				});
			},
			sexPickerChange(e) {
				this.sexIndex = e.detail.value;
				let that = this;
				let params = {
					key: 'gender',
					value: e.detail.value,
				};
				userset(params)
					.then((res) => {
						that.$u.toast('修改成功!');
					})
					.catch((err) => {
						that.$u.toast(err);
					});
			},
			datePickerChange(e) {
				console.log(123);
				let that = this;
				this.dateValue = e.detail.value;
				let params = {
					key: 'birthday',
					value: e.detail.value,
				};
				userset(params)
					.then((res) => {
						that.$u.toast('修改成功!');
					})
					.catch((err) => {
						that.$u.toast(err);
					});
			},
			synopsisTap() {
				uni.navigateTo({
					url: '/pages/my/userdata/edit-synopsis?bio=' + this.userInfo.bio,
				});
			},
			addressTap() {
				uni.navigateTo({
					// url: "/pages/my/userdata/address"
					url: '/pages/my/address/address',
				});
			},
			bankTap() {
				uni.navigateTo({
					url: '/pages/my/pay/paylist',
				});
			},
			editPhoneTap() {
				uni.navigateTo({
					url: '/pages/my/userdata/edit-phone?mobile=' + this.userInfo.phonenumber,
				});
			},
			editContactCardsTap() {
				uni.navigateTo({
					url: '/pages/my/userdata/contact-cards',
				});
			},
			regionTap() {
				uni.navigateTo({
					url: '/pages/my/userdata/region',
				});
			},
		},
	};
</script>

<style lang="scss">
	.zaiui-head-box {
		position: relative;
		padding: 45.45rpx 90.9rpx;
	}

	.zaiui-btn-view {
		position: fixed;
		width: 100%;
		bottom: 0;

		.flex {
			padding: 18.18rpx;
		}
	}
</style>