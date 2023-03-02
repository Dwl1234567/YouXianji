//配置- 接口地址配置 

module.exports = {
	
	HTTP_REQUEST_URL: `https://www.youxianji.cc/api/v1`,
	// HTTP_REQUEST_URL: `http://localhost:8080/api`,
	
	KEFU_POST_URL:`www.youxianji.cc`,
	// KEFU_POST_URL:`www.youxianji.cc`,
	//上传图片地址
	UPLOAD_IMG_URL: `https://www.youxianji.cc/api/v1/upload`,
	
	// 小程序配置
	// #ifdef MP || APP-PLUS
	// 请求域名 格式： https://您的域名
	// HTTP_REQUEST_URL: `https://www.youxianji.cc/api/v1/login`,
	// 长连接 格式：wss://您的域名 
	// VUE_APP_WS_URL: `wss://`,
	// #endif
	// H5配置
	// #ifdef H5
	//H5接口是浏览器地址，非单独部署不用修改
	//HTTP_REQUEST_URL: window.location.protocol + "//" + window.location.host,
	// HTTP_REQUEST_URL:`https://www.youxianji.cc`,
	// 长连接地址，非单独部署不用修改
	// VUE_APP_WS_URL: `ws://${window.location.host}`,
	// #endif


	// 以下配置在不做二开的前提下,不需要做任何的修改
	HEADER: {
		//'content-type': 'application/json',
		'content-type': 'application/x-www-form-urlencoded',
		//#ifdef H5
		'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? 'wechat' : 'h5',
		'platform': 'H5'
		//#endif
		//#ifdef MP
		'Form-type': 'routine',
		//#endif
		//#ifdef APP-PLUS
		'Form-type': 'app',
		//#endif
	},
	// 回话密钥名称 请勿修改此配置
	TOKENNAME: 'token',
	// 缓存时间 0 永久
	EXPIRE: 0,
	//分页最多显示条数
	LIMIT: 10
}