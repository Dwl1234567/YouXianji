//配置- 接口地址配置 

module.exports = {

	// HTTP_REQUEST_URL: `https://youxianji.zansuo.com/api/v1`,
	// HTTP_REQUEST_URL: `http://192.168.2.8:8080/api/`,
	HTTP_REQUEST_URL: `http://192.168.31.92:8080`,
	HTTP_REQUEST_IMAGEURL: `http://192.168.31.92:8080`,
	KEFU_POST_URL: `http://192.168.31.92:8080`,
	// KEFU_POST_URL:`youxianji.zansuo.com`,
	//上传图片地址http://192.168.2.8:8080/api//upload
	// UPLOAD_IMG_URL: `https://youxianji.zansuo.com/api/v1/upload`,
	UPLOAD_IMG_URL: `http://192.168.31.92:8080/common/upload`,

	// 小程序配置
	// #ifdef MP || APP-PLUS
	// 请求域名 格式： https://您的域名
	// HTTP_REQUEST_URL: `https://youxianji.zansuo.com/api/v1/login`,
	// 长连接 格式：wss://您的域名 
	// VUE_APP_WS_URL: `wss://`,
	// #endif
	// H5配置
	// #ifdef H5
	//H5接口是浏览器地址，非单独部署不用修改
	//HTTP_REQUEST_URL: window.location.protocol + "//" + window.location.host,
	// HTTP_REQUEST_URL:`https://youxianji.zansuo.com`,
	// 长连接地址，非单独部署不用修改
	// VUE_APP_WS_URL: `ws://${window.location.host}`,
	// #endif


	// 以下配置在不做二开的前提下,不需要做任何的修改
	HEADER: {
		'content-type': 'application/json',
		// 'content-type': 'application/x-www-form-urlencoded',
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