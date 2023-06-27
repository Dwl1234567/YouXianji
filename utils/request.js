//请求通用方法
/* 
 HTTP_REQUEST_URL - 请求地址
 HEADER - 请求头
 TOKENNAME - 会话密匙
 */
import Vue from 'vue'
import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME
} from '@/config/app';

//登陆
import {
	toLogin,
	checkLogin
} from '../libs/login';
//pub
import {
	getNowtimestamp,
	randomNum,
	getClientId
} from './pub.js';

// 缓存
import store from '../store';
import md5 from "./md5.js";


/**
 * 发送请求
 * noAuth : 未认证
 * noVerify : 未验证
 * noLogin : 无需登录
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false,
	noLogin = false,
	noStore = false
}) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER;

	// if (!noAuth) {
	// 	// 未登陆进入这里
	// 	//登录过期自动登录
	// 	if (!store.state.app.token && !checkLogin()) {
	// 		toLogin();
	// 		return Promise.reject({
	// 			msg: '未登录'
	// 		});
	// 	}
	// }
	let token = Vue.prototype.$store.state.token;
	let cookie = Vue.prototype.$store.state.cookie;
	let storeInfo = uni.getStorageSync('store_info');

	// if(storeInfo){
	// 	storeInfo = JSON.parse(storeInfo);
	// 	if(!noStore){
	// 		data['store_id'] = storeInfo.store_id;
	// 	}
	// }
	if (token) {
		header['Authorization'] = token;
	}

	if (cookie) {
		header['cookie'] = cookie;
	}
	return new Promise((reslove, reject) => {
		uni.showLoading({
			title: '加载中'
		});
		uni.request({
			// #ifndef H5
			url: Url + url,
			// #endif
			// #ifdef H5
			url: '/api' + url,
			// #endif
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				// #ifdef APP-PLUS
				console.log("接口地址->", Url + url);
				console.log("请求参数->", data);
				console.log("成功返回->", res);
				// #endif
				uni.hideLoading();
				let code = res.data.code; //code 200 成功 0 失败
				if (noVerify)
					reslove(res.data, res);
				else if (code == 200)
					reslove(res.data, res);
				else if (code == 4001) {
					reslove(res.data, res);
					// uni.showToast({
					// 	icon:'none',
					// 	title: res.data.msg
					// });
					toLogin();
				} else if (code == 402) {
					reslove(res.data, res);
					store.commit('setRoles', 'clear');
					uni.navigateTo({
						url: '/pages/common/login/login',
					});
				} else
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					});
				reject(res.data.msg || '系统错误');
			},
			fail: (err) => {
				uni.hideLoading();
				console.log("接口地址->", Url + url);
				console.log("失败返回->", err);
				let data = {
					mag: '请求失败',
					status: 1 //1没网
				}
				// #ifdef APP-PLUS
				reject(data);
				// #endif
				// #ifndef APP-PLUS
				reject('请求失败');
				// #endif

				if (err.errMsg && err.errMsg.search('似乎已断开与互联网的连接') > -1) {
					uni.showToast({
						icon: 'error',
						title: '网络异常',
						duration: 3000
					})
				}
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});

export default request;