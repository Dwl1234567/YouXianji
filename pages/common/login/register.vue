<!-- 登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image>
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="t-b2">副标说明文字</view>
		<form class="cl">
			<view class="t-a">
				<image src="https://zhoukaiwen.com/img/loginImg/sj.png"></image>
				<view class="line"></view>
				<input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
			</view>
			<view class="t-a">
				<image src="https://zhoukaiwen.com/img/loginImg/yz.png"></image>
				<view class="line"></view>
				<input type="number" name="code" maxlength="6" placeholder="请输入验证码" v-model="yzm" />
				<view class="t-c" @tap="getCode()">{{tips}}</view>
				<!-- <view v-else class="t-c" style="background-color: #A7A7A7;">重新发送({{ second }})</view> -->

			</view>
			<view class="t-a">
				<image src="https://zhoukaiwen.com/img/loginImg/sj.png"></image>
				<view class="line"></view>
				<input type="number" name="invatecode" placeholder="请输入邀请码" maxlength="11" v-model="invatecode" />
			</view>
			<button @tap="reg()">注 册</button>
			<view class="login" @tap="login()">登 录</view>
		</form>
		<view class="t-f"><text>————— 第三方账号登录 —————</text></view>
		<view class="t-e cl">
			<view class="t-g" @tap="wxLogin()">
				<image src="https://zhoukaiwen.com/img/loginImg/wx.png"></image>
			</view>
			<view class="t-g" @tap="zfbLogin()">
				<image src="https://zhoukaiwen.com/img/loginImg/qq.png"></image>
			</view>
		</view>

		<!-- 验证码倒计时 -->
		<u-code :seconds="second" @end="end" @start="start" ref="uCode" @change="codeChange"></u-code>
	</view>
</template>
<script>
	import {
	    mapMutations  
	} from 'vuex';
	import {
		regCode,
		register,
		kefureg 
	} from "@/api/common.js";
	export default {
		data() {
			return {
				title: '欢迎注册！', //填写logo或者app名称，也可以用：欢迎回来，看您需求
				second: 60, //默认60秒
				tips: '',
				showText: true, //判断短信是否发送
				phone: '18670535536', //手机号码
				invatecode: '', //手机号码
				yzm: '157316' //验证码
			};
		},
		onLoad() {},
		methods: {
			//当前注册按钮操作
			reg() {
				var that = this;
				if (!that.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none'
					});
					return;
				}
				if (!that.yzm) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return;
				}
				//....此处省略，这里需要调用后台验证一下验证码是否正确，根据您的需求来
				
				let params = {
					'mobile': that.phone,
					'code': that.yzm,
					'source' : 2
					// 'invatecode':''
				}
				
				// kefureg(params).then(res => {
				// 	if(res.code == 1){
				// 		uni.showToast({
				// 			title: '注册成功！',
				// 			icon: 'none'
				// 		});
				// 		this.$store.commit('login', res.data)
				// 		uni.navigateTo({
				// 			url: '../../home/home'
				// 		})
				// 	}
				// })
				// .catch(err=>{
				// 	uni.$u.toast(err.msg);
				// })
				register(params).then(res => {
					if(res.code == 1){
						uni.showToast({
							title: '注册成功！',
							icon: 'none'
						});
						this.$store.commit('login', res.data)
						uni.navigateTo({
							url: '../../home/home'
						})
					}
				})
				.catch(err=>{
					uni.$u.toast(err.msg);
				})
				
			},
			codeChange(text) {
				this.tips = text;
			},
			//获取短信验证码
			getCode() {
				var that = this;
				if (!that.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(that.phone)) {
					uni.showToast({
						title: '请输入正确手机号',
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '正在获取验证码'
				})
				//这里请求后台获取短信验证码
				let params = {
					'mobile': that.phone,
					// 'invatecode':''
				}
				regCode(params).then(res => {
					if (res.code == 1) {
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						
					}
				})
				.catch(err=>{
					uni.$u.toast(err.msg);
				})
				.finally(arr=>{
					uni.hideLoading();
				})
			},
			end() {
				// uni.$u.toast('倒计时结束');
			},
			start() {
				// uni.$u.toast('倒计时开始');
			},
			//登录按钮点击
			login() {
				uni.showToast({
					title: '登录跳转',
					icon: 'none'
				});
				uni.navigateTo({
					url: '/pages/common/login/login'
				});
			},
			//等三方微信登录
			wxLogin() {
				uni.showToast({
					title: '微信登录',
					icon: 'none'
				});
			},
			//第三方支付宝登录
			zfbLogin() {
				uni.showToast({
					title: '支付宝登录',
					icon: 'none'
				});
			}
		}
	};
</script>
<style>
	.img-a {
		position: absolute;
		width: 100%;
		top: -150rpx;
		right: 0;
	}

	.img-b {
		position: absolute;
		width: 50%;
		bottom: 0;
		left: -50rpx;
		/* margin-bottom: -200rpx; */
	}

	.login {
		font-size: 28rpx;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		background: #f5f6fa;
		color: #000000;
		text-align: center;
		margin-top: 30rpx;
	}
</style>
