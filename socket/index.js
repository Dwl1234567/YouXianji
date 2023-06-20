import Config from "./config.js"; // 本地配置数据
import store from './../store/index.js'
const socket = {
	data: {
		ws: {
			time: null,
			open: false,
			SocketTask: null,
			ErrorMsg: []
		},
	},
	open() {
		// 建立链接
		const that = this
		this.data.ws.SocketTask = uni.connectSocket({
			url: this.build_url('ws'),
			header: {
				'content-type': 'application/json',
				'Authorization': uni.getStorageSync('token')
			},
			success: res => {
				that.sendFirst()
			},
			complete: res => {}
		});
		uni.onSocketOpen(function(res) {
			that.data.ws.open = true;
			store.commit('setWs', that.data.ws);
			console.log('WebSocket连接已打开！');
			that.data.ws.time = setInterval(that.ws_send, 10000); //定时发送心跳
		});
		uni.onSocketError(function(res) {
			console.log('WebSocket连接打开失败，请检查！');
			that.data.ws.open = false
			store.commit('setWs', that.data.ws);
			if (!that.data.ws.open) {
				that.connect_socket()
			}
		});
		uni.onSocketClose(function(res) {
			console.log('WebSocket连接打开失败，请检查！');
			that.data.ws.open = false
			store.commit('setWs', that.data.ws);
			if (!that.data.ws.open) {
				that.connect_socket()
			}
		});
		uni.onSocketMessage(function(res) {
			let msg = JSON.parse(res.data)
			if (msg.code === 200) {
				if (!msg.data) {
					that.sendFirst()
				} else if (msg.data.messageType == 6 || msg.data.messageType == 7) {
					store.commit('setBusiness', msg.data);
					msg.data.businessCornerMarkList.map(item => {
						store.commit('setBusiness', item);
					})
				}
			}
		});
	},
	// 发送ws消息
	ws_sends(message) {
		var that = this
		if (that.data.ws.open) {
			uni.sendSocketMessage({
				data: JSON.stringify(message)
			});
		} else {
			console.log('消息发送出错', message, )
			that.data.ws.ErrorMsg.push(message);
		}
	},
	// 建立链接
	connect_socket: function() {
		console.log(this)
		uni.connectSocket({
			url: this.build_url('ws'),
			header: {
				'content-type': 'application/json',
				'Authorization': uni.getStorageSync('token')
			},
			success: res => {
				console.log(2222222)
				this.sendFirst()
			},
			complete: res => {}
		});
	},

	// 心跳
	ws_send() {
		console.log(3333)
		const message = {
			messageType: '0'
		}
		uni.sendSocketMessage({
			data: JSON.stringify(message)
		});
	},
	// 初始化获取消息
	sendFirst() {
		const message = {
			messageType: '6',
			storeId: uni.getStorageSync('userinfo').storeId,
			senderId: uni.getStorageSync('userinfo').userId
		}
		uni.sendSocketMessage({
			data: JSON.stringify(message)
		});
	},
	// 地址重组器
	build_url: function(type = 'ws', res_path) {
		var that = this
		var protocol = Config.https_switch ? 'https://' : 'http://';
		// var token = that.tokenList.kefu_token ? '&token=' + that.tokenList.kefu_token : '';
		var token = uni.getStorageSync('token')
		console.log(token)
		var encryptionStr = new Buffer(token).toString('base64');
		console.log(encryptionStr)
		var buildObj = {
			// + '/?modulename=index' + token +
			// 	kefu_tourists_token).replace(
			// 	/\|/g, '~');
			ws: () => {
				protocol = 'ws://';
				// console.log(protocol + '192.168.2.36:8080' + '/websocket/118');
				return (protocol + '192.168.2.36:8080' + '/websocket/' + encryptionStr)
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

}

export default socket;