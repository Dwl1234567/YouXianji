//常用方法库

/**
 * 获取当前时间戳 
 * 
 */
export function getNowtimestamp() {
	let milliseconds = Date.now();
	return parseInt(milliseconds / 1000);
}

/**
 *	随机数 
 *  {Object} max
 */

export function randomNum(max) {
	if (!max) {
		max = 999999;
	}
	return Math.floor(Math.random() * (max + 1));
}

/* 
	 银行卡星号隐藏
	 */
export function bankNumHide(num) {
	// return num.substring(0,4) + ' **** **** **** **';
	return "**** **** **** " + num.substring(num.length - 4, num.length);
}

//显示字符串中间加星号
/* 
 str :字符串
 frontLen : 前置长度
 endLen : 后置长度
 */
export function plusXing(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for (var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
}

export function getClientId() {
	//获取客户端ID和版本号
	var clientid = '';
	// #ifdef APP-PLUS
	// 苹果系统
	plus.device.getInfo({
		success: function(e) {
			clientid = e.uuid;
			uni.setStorageSync('clientid', clientid);
		},
		fail: function(e) {
			console.log(e);
		}
	});
	// 安卓系统
	plus.device.getAAID({
		success: function(e) {
			clientid = e.aaid;
			console.log(clientid);
			uni.setStorageSync('clientid', clientid);
		},
		fail: function(e) {
			console.log(e);
		}
	});
	//⽼版本、安卓模拟器
	if (clientid == '') {
		clientid = plus.device.uuid;
		uni.setStorageSync('clientid', clientid);
	}
	// #endif
	return clientid;
}
//一键复制
export function uniCopy({
	content,
	success,
	error
}) {
	if (!content) return error('复制的内容不能为空 !')
	content = typeof content === 'string' ? content : content.toString() // 复制内容，必须字符串，数字需要转换为字符串
	/**
	 * 小程序端 和 app端的复制逻辑
	 */
	//#ifndef H5
	uni.setClipboardData({
		data: content,
		success: function() {
			success("复制成功~")
			console.log('success');
		},
		fail: function() {
			success("复制失败~")
		}
	});
	//#endif

	/**
	 * H5端的复制逻辑
	 */
	// #ifdef H5
	if (!document.queryCommandSupported('copy')) { //为了兼容有些浏览器 queryCommandSupported 的判断
		// 不支持
		error('浏览器不支持')
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	if (result) {
		success("复制成功~")
	} else {
		error("复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！")
	}
	textarea.remove()
	// #endif
}

// 防止处理多次点击
export function noMultipleClicks(methods, info) {
	// methods是需要点击后需要执行的函数， info是点击需要传的参数
	let that = this;
	if (that.noClick) {
		// 第一次点击
		that.noClick = false;
		if (info && info !== '') {
			// info是执行函数需要传的参数
			methods(info);
		} else {
			methods();
		}
		setTimeout(() => {
			that.noClick = true;
		}, 2000)
	} else {
		// 这里是重复点击的判断
	}
}
// 获取当前日期
export function getNowDay(split='-'){
	let date = new Date();
	let year = date.getFullYear(); 
	let month = date.getMonth() + 1;
	let day = date.getDate();
	month = (month > 9) ? month : ("0" + month);
	day = (day < 10) ? ("0" + day) : day;
	return year + split + month + split + day;
}
// 获取当前时间+n天
export function addNowDay(datetime, days) {
	let myDate = new Date();
	if (datetime == 0) {
		datetime = myDate.getFullYear() + '/' + (Number(myDate.getMonth()) + 1) + '/' + myDate.getDate()
	}
	// console.log(datetime);
	let old_time = new Date(datetime.replace(/-/g, "/")); //替换字符，js不认2013-01-31,只认2013/01/31
	let fd = new Date(old_time.valueOf() + days * 24 * 60 * 60 * 1000); //日期加上指定的天数
	let new_time = fd.getFullYear() + "-";
	let month = fd.getMonth() + 1;
	if (month >= 10) {
		new_time += month + "-";
	} else {
		//在小于10的月份上补0
		new_time += "0" + month + "-";
	}
	if (fd.getDate() >= 10) {
		new_time += fd.getDate();
	} else {
		//在小于10的日期上补0
		new_time += "0" + fd.getDate();
	}
	return new_time; //输出格式：2013-01-02
}

// 获取时间段
export function gethoursInfo(hours) {
	let dataList = [];
	let myDate = new Date();
	if(hours == 0){
		hours = myDate.getHours();
	}
	
	if (hours >= 18) {
		dataList.push({value:'请预约明天的时间吧～'});
		return dataList;
	}
	for (let ii = 8; ii <= 17; ii++) {
		if (ii >= 8 && ii >= hours) {
			if (ii < 9) {
				dataList.push({value:'0' + ii + ':00' + '~' + '0' + (ii + 1) + ':00'});
			} else if (ii == 9) {
				dataList.push({value:'0' + ii + ':00' + '~' + (ii + 1) + ':00'});
			} else {
				dataList.push({value:ii + ':00' + '~' + (ii + 1) + ':00'});
			}
		}
	}
	return dataList;
}
