// 分销 模块  ---------------------------S
import request from '@/utils/request.js';

/**
 * 发送验证码
 *
 */
export function sendCaptcha(data) {
	return request.get('/sendCaptcha', data, {
		noLogin: true
	});
}

/**
 * 登录
 *
 */
export function login(data) {
	return request.post('/yxj/app/user/login', data, {
		noLogin: true
	});
}

/**
 * 获取用户信息
 *
 */
export function userInfo(data) {
	return request.post('/yxj/app/user/getUserInfo', data, {
		noLogin: true
	});
}