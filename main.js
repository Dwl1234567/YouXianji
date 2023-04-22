import App from './App'
import {
	HTTP_REQUEST_IMAGEURL
} from '@/config/app';
import uView from '@/uni_modules/uview-ui';
Vue.use(uView);

// #ifndef VUE3
import Vue from 'vue'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'

// 引入全局方法
import $mGraceChecker from '@/utils/graceChecker';
Vue.prototype.$mGraceChecker = $mGraceChecker;
Vue.prototype.$httpImage = HTTP_REQUEST_IMAGEURL;
//全局引入悬浮球
import dragButton from '@/components/drag-button';
Vue.component('drag-button',dragButton)

// 平台号
// #ifdef APP-PLUS
Vue.prototype.$platform = 'APP-PLUS';
// #endif
// #ifdef H5
Vue.prototype.$platform = 'H5';
// #endif
// #ifdef MP-WEIXIN
Vue.prototype.$platform = 'MP-WEIXIN';
// #endif
// #ifdef MP-ALIPAY
Vue.prototype.$platform = 'MP-ALIPAY';
// #endif
// #ifdef MP-BAIDU
Vue.prototype.$platform = 'MP-BAIDU';
// #endif
// #ifdef MP-TOUTIAO
Vue.prototype.$platform = 'MP-TOUTIAO';
// #endif

// H5页面刷新后返回失效，页面栈清空问题，navigateBack失效问题
const navigateBack = (params) => {
	const pages = getCurrentPages()
	if (pages.length === 1) {
		if (typeof params === 'number') {
			history.go(-params)
		} else {
			history.back()
		}
	} else {
		uni.navigateBack()
	}
}


// 提示
const msg = (title, duration = 3000, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
	setTimeout(function() {
		uni.hideToast();
	}, duration)
}
// 判断是否为空值
const isEmpty = (obj) =>{
    try{
        if(obj == null || obj == undefined) {
            return true;
        }
        //判断数字是否是NaN
        if(typeof obj === "number") {
            if(isNaN(obj)) {
                return true;
            } else {
                return false;
            }
        }
        //判断参数是否是布尔、函数、日期、正则，是则返回false
        if(typeof obj === "boolean" || typeof obj === "function" || obj instanceof Date || obj instanceof RegExp) {
            return false;
        }
        //判断参数是否是字符串，去空，如果长度为0则返回true
        if(typeof obj === "string") {
            if(obj.trim().length == 0) {
                return true;
            } else {
                return false;
            }
        }
 
        if(typeof obj === 'object') {
            //判断参数是否是数组，数组为空则返回true
            if(obj instanceof Array) {
                if(obj.length == 0) {
                    return true;
                } else {
                    return false;
                }
            }
 
            //判断参数是否是对象，判断是否是空对象，是则返回true
            if(obj instanceof Object) {
                //判断对象属性个数
                if(Object.getOwnPropertyNames(obj).length == 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } catch(e) {
        console.log(e);
        return false;
    }
}
 
// 判断是否不为空值
 
const isNotEmpty = (obj) => {
    try{
        if(obj == null || obj == undefined) {
            return false;
        }
        //判断数字是否是NaN
        if(typeof obj === "number") {
            if(isNaN(obj)) {
                return false;
            } else {
                return true;
            }
        }
        //判断参数是否是布尔、函数、日期、正则，是则返回true
        if(typeof obj === "boolean" || typeof obj === "function" || obj instanceof Date || obj instanceof RegExp) {
            return true;
        }
        //判断参数是否是字符串，去空，如果长度为0则返回false
        if(typeof obj === "string") {
            if(obj.trim().length == 0) {
                return false;
            } else {
                return true;
            }
        }
 
        if(typeof obj === 'object') {
            //判断参数是否是数组，数组为空则返回false
            if(obj instanceof Array) {
                if(obj.length == 0) {
                    return false;
                } else {
                    return true;
                }
            }
 
            //判断参数是否是对象，判断是否是空对象，是则返回false
            if(obj instanceof Object) {
                //判断对象属性个数
                if(Object.getOwnPropertyNames(obj).length == 0) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    } catch(e) {
        console.log(e);
        return false;
    }
}

// 返回上一页
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
// 检查有没有登录
const checkLogin = (item) => {
	return new Promise(resolve => {
		if (Vue.prototype.$store.state.hasLogin == false) {
			uni.showModal({
				title: '温馨提示',
				content: '你还没登陆，请先登录',
				success(res) {
					if (res.confirm) {
						// 账户秘密登录
						let url = `/pages/common/login/login`;
						uni.navigateTo({
							url: url
						});
					}
					resolve(false);
				}
			})
		} else {
			resolve(true);
		}
	});
}
// 后端api地址
Vue.prototype.$unishow = "https://youxianji.zansuo.com/api/v1/thirdstore";
// 同步网络请求
const request = async (url, method = 'GET', data = {}, showMsg = true) => {
	let header = {
		'content-type': 'application/x-www-form-urlencoded',
		'lang': Vue.prototype.$store.state.lang,
		'platform': Vue.prototype.$platform
	};
	if (Vue.prototype.$store.state.userInfo.token) {
		header.token = Vue.prototype.$store.state.userInfo.token;
	}
	if (Vue.prototype.$store.state.cookie) {
		header.cookie = Vue.prototype.$store.state.cookie;
	}
	var [error, res] = await uni.request({
		url: Vue.prototype.$unishow + url,
		method: method,
		header: header,
		data: data,
		timeout: 5000
	});
	if (url == '/pay/submit'){
		console.log(res);
	}
	return new Promise(function(revolve){
		if (error) {
			showMsg && msg(JSON.stringify(res));
			revolve(false);
		}
		
		if (res) {
			if (res.header.hasOwnProperty('Set-Cookie')) {
				let cookie = res.header['Set-Cookie'].replace("; path=/", "");
				Vue.prototype.$store.commit('setCookie', cookie);
			}
			if (res.hasOwnProperty('data')) {
				if (res.data.hasOwnProperty('code') && res.data.code == 401) {
					// 未登录 或 登录失效
					Vue.prototype.$store.commit('logout');
				}
				if (res.data.hasOwnProperty('code') && res.data.code == 1) {
					if (res.data.msg) {
						showMsg && msg(res.data.msg);
					} else {
						uni.hideToast();
					}
					
					revolve(res.data.data);
				} else {
					if (res.data.hasOwnProperty('msg')) {
						showMsg && msg(res.data.msg);
					} else {
						showMsg && msg('返回参数错误');
					}
					revolve(false);
				}
			} else {
				showMsg && msg('不能识别数据');
				revolve(false);
			}
		}
	});
	
}
// 跳转判断是否登录
const navTo = (url, check = true) => {
	if (check && !Vue.prototype.$store.state.hasLogin) {
		url = '/pages/public/login';
	}
	uni.navigateTo({
		url: url
	});
}
Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	prePage,
	checkLogin,
	request,
	navTo,
	navigateBack,
	isEmpty,
	isNotEmpty
};

const app = new Vue({
    ...App,
	store
})

app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif