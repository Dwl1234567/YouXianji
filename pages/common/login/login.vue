<!-- 登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<image class="img-a" src="/static/beijing.png"></image>
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
	import Config from "./config.js"; // 本地配置数据
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
		getNearestStoreList
	} from '@/api/commons.js';
	import {
		UserLogin
	} from '@/api/mall.js';
	export default {
		data() {
			return {
				ws: {
					SocketTask: null,
					Timer: null, // 计时器
					ErrorMsg: [], // 发送失败的消息
					MaxRetryCount: 3, // 最大重连次数
					CurrentRetryCount: 0,
					socketOpen: false,
					pageHideCloseWs: true, // 是否在页面hide时关闭链接，兼容预览图片的情况
					unloadCloseWs: false // ws关闭状态码兼容性不好，手动标记页面卸载关闭ws链接
				},
				config: [],
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
		onLoad() {
			console.log('登陆页面')
		},
		onShow() {
			this.$socket.close()
		},
		methods: {
			toLogin() {
				// uni.login({
				// 	provider: 'weixin',
				// 	success: function(loginRes) {
				// 		// 登录成功
				// 	},
				// 	fail: function(err) {
				// 		// 登录授权失败  
				// 		// err.code是错误码
				// 	}
				// });
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
									that.$store.commit('setAddress', data);
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

								}, 1200)
							}
							// console.log(uni.getStorageSync('url'), 'uni.getStorageSync();');
							this.getstoresstorelatelystore()
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
			// 获取最近门店
			getstoresstorelatelystore() {
				getNearestStoreList({
					latitude: this.latitude,
					longitude: this.longitude,
				}).then((res) => {
					this.latelystoreInfoAll = res.data;
					this.latelystoreInfo = res.data[0];
					this.storeId = res.data[0].storeId;
					uni.setStorageSync('storeId', res.data[0].storeId);
					uni.setStorageSync('nearbyStores', res.data);
					// this.shop_latitide = res.data.latitude;
					// this.shop_longtude = res.data.longitude;
				});
			},
			// 初始化链接
			load: function() {
				var that = this
				that.connect_socket();
			},
			// 地址重组器
			build_url: function(type = 'ws', res_path) {
				var that = this
				var protocol = Config.https_switch ? 'https://' : 'http://';
				// var token = that.tokenList.kefu_token ? '&token=' + that.tokenList.kefu_token : '';
				var token = uni.getStorageSync('token')
				var encryptionStr = new Buffer(token).toString('base64');
				var buildObj = {
					// + '/?modulename=index' + token +
					// 	kefu_tourists_token).replace(
					// 	/\|/g, '~');
					ws: () => {
						protocol = parseInt(that.config.wss_switch) == 1 ? 'wss://' : 'ws://';
						// console.log(protocol + '192.168.31.91:8080' + '/websocket/118');
						return (protocol + '192.168.31.91:8080' + '/websocket/' + encryptionStr)
					},
					initialize: () => {
						return protocol + Config.baseURL + '/addons/kefu/index/initialize?modulename=index';
					},
					upload: () => {
						// return that.config.upload.uploadurl + '?modulename=index' + token + kefu_tourists_token;
					},
					storage_notify: () => {
						// 云存储notify，未实现，能获取的文件信息太少。
						return protocol + Config.baseURL + '/addons/' + type + '/index/notify';
					},
					message_prompt: () => {
						if (that.config.upload.cdnurl) {
							return that.config.upload.cdnurl + that.config.ringing;
						}
						return protocol + Config.baseURL + that.config.ringing;
					},
					res: () => {
						if (that.config.__CDN__) {
							return that.config.__CDN__ + '/assets/addons/kefu' + res_path;
						}
						return protocol + Config.baseURL + '/assets/addons/kefu' + res_path;
					},
					default: () => {
						return protocol + Config.baseURL;
					}
				};

				let action = buildObj[type] || buildObj['default']
				return action.call(this)
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
					console.log('login')
					this.$socket.open()
				});
			},
			// 建立链接
			connect_socket: function() {
				var that = this

				if (this.ws.SocketTask && this.ws.socketOpen) {
					console.log('无需链接')
					return;
				}

				// console.log(encryptionStr, '123123');
				// 开始链接
				that.ws.SocketTask = uni.connectSocket({
					url: this.build_url('ws'),
					header: {
						'content-type': 'application/json',
						'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjlmZTE1MWI5LTA0MDctNGQwOS05YTk1LTlkYmI3ODlmOGMzMyJ9.mAGKWkPNl1et1XXgUxKiSx8y8NvnS7XYiCCzihYIGt1Y0miwTLIP7OdxOvgC_pvreGiYTG0EyGDj1BW7Y_RM_Q'
					},
					complete: res => {}
				});

				// 链接打开
				uni.onSocketOpen(function(res) {
					console.log('链接已打开')
					uni.setStorageSync('receiverId', null)
					that.ws.socketOpen = true
					that.ws.CurrentRetryCount = 0;
					// 重新发送所有出错的消息
					for (let i in that.ws.ErrorMsg) {
						that.ws_send(that.ws.ErrorMsg[i]);
					}
					that.ws.ErrorMsg = [];
					that.errorTips = '';

					if (that.ws.Timer != null) {
						clearInterval(that.ws.Timer);
					}

					that.ws.Timer = setInterval(that.ws_send, 28000); //定时发送心跳
				});

				// 收到消息
				uni.onSocketMessage(function(res) {
					let msg = JSON.parse(res.data)
					console.log(msg.code === 200)
					if (msg.code === 200) {
						if (msg.data && msg.data.messageType == 1) {
							uni.setStorageSync('receiverId', msg.data.senderId)
							const datas = {
								datetime: '刚刚',
								data: [{
									contextType: msg.data.contextType,
									message: msg.data.context,
									sender: 'you',
									senderName: msg.data.senderName
								}]
							}
							that.setMessageList(datas)
							that.messageList.push(datas)
							that.scrollToBottom()
						}
						if (msg.data && msg.data.messageType == 3) {
							// that.messageList.push(msg.data.pageHideCloseWs)
							let datas = {
								datetime: '',
								data: []
							}
							msg.data.historyList.map(item => {
								let items = {
									contextType: item.contextType,
									message: item.context,
									sender: uni.getStorageSync('userinfo').userId === item.senderId ? 'me' : 'you',
									senderName: item.senderName
								}
								datas.data.push(items);
							})
							that.messageList.push(datas);
							that.scrollToBottom()
						}
					}

					// let actions = that.domsg()
					// let action = actions[msg.msgtype] || actions['default']
					// action.call(this, msg)
				})

				// 出错
				uni.onSocketError(function(res) {
					that.ws.socketOpen = false;
					that.errorTips = 'WebSocket 发生错误!'
					console.log('链接出错', res)
				});

				// 链接关闭
				uni.onSocketClose(function(res) {
					// 工具上是1000，真机上测试是10000
					console.log('链接已关闭', res)
					that.ws.socketOpen = false;

					if (that.ws.Timer != null) {
						clearInterval(that.ws.Timer);
					}

					if (that.errorTips.indexOf('重连') === -1) {
						that.errorTips = '网络链接已断开!';
					}

					if (res.code == 1000 || res.code == 10000 || that.ws.unloadCloseWs) {
						return;
					}

					if (that.ws.MaxRetryCount) {
						that.ws.Timer = setInterval(that.retry_websocket, 3000); //每3秒重新连接一次
					}
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