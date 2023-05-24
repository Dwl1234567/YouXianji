<!-- 登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="/static/背景.png"></image>
		<!-- <image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<view class="login-content" style="z-index: 100; position: relative">
			<view class="t-b">{{ title }}</view>
			<view class="t-b2">{{ tdesc }}</view>
			<form class="cl">
				<view class="t-a">
					<!-- <image src="https://zhoukaiwen.com/img/loginImg/sj.png"></image>
					<view class="line"></view> -->
					<input type="text" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
				</view>
				<view class="t-a">
					<!-- <image src="https://zhoukaiwen.com/img/loginImg/yz.png"></image>
					<view class="line"></view> -->
					<input type="number" name="code" maxlength="6" placeholder="请输入验证码" v-model="yzm" />
					<view class="t-c" @tap="getCode()">{{tips}}</view>
					<!-- <view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{ second }})</view> -->
				</view>
				<button @tap="login()" class="loginBtn">登 录</button>
				<view class="reg" @tap="reg()">注 册</view>
			</form>
			<view class="t-f"><text>————— 第三方账号登录 —————</text></view>
			<view class="t-e cl">
				<view class="t-g" @tap="toLogin()">
					<image src="https://zhoukaiwen.com/img/loginImg/wx.png"></image>
				</view>
				<view class="t-g" @tap="zfbLogin()">
					<image src="https://zhoukaiwen.com/img/loginImg/qq.png"></image>
				</view>
			</view>
		</view>

		<!-- 验证码倒计时 -->
		<u-code :seconds="second" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
	</view>
</template>
<script>
	import {
		sendCaptcha,
		login,
		userInfo
	} from '@/api/login.js';
	import {
		mapMutations
	} from 'vuex';
	import Vue from 'vue';
	import {
		smslogin,
		loginCode,
		kefulogin
	} from '@/api/common.js';
	import {
		UserLogin
	} from '@/api/mall.js';
	export default {
		data() {
			return {
				title: '欢迎来到优闲集', //填写logo或者app名称，也可以用：欢迎回来，看您需求
				tdesc: '',
				second: 60, //默认60秒
				tips: '',
				showText: true, //判断短信是否发送
				logining: false,
				phone: '13211111111', //手机号码
				// phone: '18670535536', //手机号码
				yzm: '111111', //验证码
			};
		},
		onLoad() {},
		methods: {
			async toLogin() {
				this.logining = true;
				let params = {
					mobile: this.phone,
					password: this.yzm,
				};
				UserLogin(params).then((res) => {
					let data = res.data;
					if (data) {

						this.$store.commit('login', data);
						this.logining = true;
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/tabbar/home',
							});
						}, 2000);
					} else {
						this.logining = false;
					}
				});
			},
			//当前登录按钮操作
			login() {
				var that = this;
				if (!that.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					});
					return;
				}
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none',
					});
					return;
				}
				if (!that.yzm) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
					});
					return;
				}
				//....此处省略，这里需要调用后台验证一下验证码是否正确，根据您的需求来
				// uni.showToast({
				// 	title: '登录成功！',
				// 	icon: 'none'
				// });
				let params = {
					phonenumber: that.phone,
					code: that.yzm,
				};
				login(params)
					.then((res) => {
						if (res.code == 200) {
							let data = {}
							// #ifdef APP-PLUS
							let type = '';
							uni.getSystemInfo({
								success: function(res) {
									if (res.osName == 'ios') {
										type = 'wgs84'
									} else {
										type = 'gcj02'
									}
								}
							});
							uni.getLocation({
								type: type,
								geocode: true, //设置该参数为true可直接获取经纬度及城市信息
								success: function(res) {
									data = res
								},
								fail: function(res) {
									uni.showToast({
										title: '获取地址失败，将导致部分功能不可用',
										icon: 'none',
									});
								},
								complete() {
									// that.getstoresstorelatelystore();
								},
							});
							// #endif
							this.$store.commit('setToken', res.token);
							if (data) {
								setTimeout(() => {
									this.getUserInfo();
									this.$store.commit('login', );
									this.$store.commit('setAddress', data);
									console.log(2222222)
								}, 1200)
							}
							// console.log(uni.getStorageSync('url'), 'uni.getStorageSync();');

							if (uni.getStorageSync('url')) {
								uni.navigateTo({
									url: uni.getStorageSync('url'),
								});
							} else {
								uni.switchTab({
									url: '/pages/tabbar/home',
								});
							}
						}
					})
					.catch((err) => {
						uni.$u.toast(err.msg);
					});
			},
			codeChange(text) {
				this.tips = text;
			},
			// 获取用户信息
			getUserInfo() {
				const data = Vue.prototype.$store.state.address
				userInfo(data).then((res) => {
					console.log(res, 444444);
					var roles = res.data.roles;
					roles.map((item) => {
						if (item.roleKey === 'consumer') {
							this.$store.commit('setRoles', 'consumer');
						} else if (item.roleKey === 'store_admin') {
							this.$store.commit('setRoles', 'store_admin');
						} else if (item.roleKey === 'store_employee') {
							this.$store.commit('setRoles', 'store_employee');
						} else if (item.roleKey === 'sorting_leader') {
							this.$store.commit('setRoles', 'sorting_leader');
						} else if (item.roleKey === 'sorting_people') {
							this.$store.commit('setRoles', 'sorting_people');
						}
					});
					uni.setStorageSync('userinfo', res.data);
					this.$store.commit('setUserInfo', res.data);
				});
			},
			//获取短信验证码
			getCode() {
				var that = this;
				if (!that.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					});
					return;
				}
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none',
					});
					return;
				}
				uni.showLoading({
					title: '正在获取验证码',
				});
				//这里请求后台获取短信验证码
				let params = {
					phonenumber: that.phone,
				};
				console.log(123);
				sendCaptcha(params)
					.then((res) => {
						if (res.code == 200) {
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}
					})
					.catch((err) => {
						uni.$u.toast(err.msg);
					})
					.finally((arr) => {
						uni.hideLoading();
					});
			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				// uni.$u.toast('倒计时开始');
			},
			//注册按钮点击
			reg() {
				uni.showToast({
					title: '注册跳转',
					icon: 'none',
				});
				uni.navigateTo({
					url: '/pages/common/login/register',
				});
				// uni.navigateTo({
				// 	url: '/pages/common/login/mallreg?event=register'
				// });
			},
			//等三方微信登录
			wxLogin() {
				uni.showToast({
					title: '微信登录',
					icon: 'none',
				});
			},
			//第三方支付宝登录
			zfbLogin() {
				let that = this;
				let params = {
					account: that.phone,
					password: that.yzm,
				};
				kefulogin(params)
					.then((res) => {
						this.$store.commit('login', res.data.userinfo);
						uni.switchTab({
							url: '/pages/tabbar/home',
						});
					})
					.catch((err) => {
						uni.$u.toast(err.msg);
					});
			},
		},
	};
</script>
<style>
	.img-a {
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0rpx;
		right: 0;
	}

	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		/* margin-bottom: -200rpx; */
	}

	.reg {
		font-size: 28rpx;
		color: #4f4f50;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 14rpx;
		font-weight: bold;
		background: #f5f6fa;
		color: #000000;
		text-align: center;
		margin-top: 30rpx;
	}
</style>