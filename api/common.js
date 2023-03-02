//common相关接口
import request from "@/utils/request.js";
// import { resolve } from "dns";

/**
 * 微信登录
 * 
 */
export function Wxlogin(data) {
	return request.post('/token/user',data,{'noLogin':true});
}

/**
 * 微信获取phone
 * 
 */
export function getUserMobile(data) {
	return request.post('/token/get_user_mobile',data,{'noLogin':true});
}


/**
 * 分类
 * 
 */
export function Godscategory() {
	return request.get('/category',{},{'noLogin':true});
}

/**
 * 一级分类所有商品
 * 
 */
export function GodsgoodsList(data) {
	return request.get('/goods_list',data,{'noLogin':true});
}

/**
 * 获取商品报价步骤-分两种情况
 * 
 */
export function GodsgoodsDetail(data) {
	return request.get('/goods_detail',data,{'noLogin':true});
}

/**
 * 获取商品报价详细信息
 * 
 */
export function GodsgoodsDetailPrice(data) {
	return request.get('/goods_detail_price',data,{'noLogin':true});
}

/**
 * 获取微信用户信息
 * 
 */
export function GodsgetUserInfo(data) {
	return request.post('/token/get_user_info',data,{'noLogin':true});
}

/**
 * 根据手机型号获得最高报价-已完成苹果新机
 * 
 */
export function GodsgoodsPrice(data) {
	return request.post('/goods_price',data,{'noLogin':true});
}


/**
 * 分享列表
 * 
 */
export function showList(data) {
	return request.get('/show_list',data,{'noLogin':true});
}

/**
 * 首页获取新机每日报价
 * 
 */
export function dayPrice() {
	return request.get('/day_price',{},{'noLogin':true});
}


/**
 * 首页分享秀
 * 
 */
export function showIndex() {
	return request.get('/showindex',{},{'noLogin':true});
}
/**
 * 根据型号首页获取报价
 * 
 */
export function getIndexPrice(data) {
	return request.get('/get_index_price',data,{'noLogin':true});
}
/**
 * 删除用户收货地址
 * 
 */
export function deleteUserAddress(data) {
	return request.get('/delete_user_address',data,{'noLogin':true});
}
/**
 * 设置默认地址属性
 * 
 */
export function setUserDefaultAddress(data) {
	return request.post('/set_user_default_address',data,{'noLogin':true});
}
/**
 * 编辑用户地址
 * 
 */
export function editUserAddress(data) {
	return request.post('/edit_user_address',data,{'noLogin':true});
}
/**
 * 添加用户收货地址
 * 
 */
export function addUserAddress(data) {
	return request.post('/add_user_address',data,{'noLogin':true});
}
/**
 * 获取用户收货地址
 * 
 */
export function getUserAddress() {
	return request.post('/get_user_address',{},{'noLogin':true});
}
/**
 * 获取用户收获地址信息-单条
 * 
 */
export function getUserAddressData(data) {
	return request.get('/get_user_address_data',data,{'noLogin':true});
}

/**
 * 获取地区信息
 * 
 */
export function getaddressArea(data) {
	return request.get('/address/area',data,{'noLogin':true});
}

// =============================================旧======================================================

/**
 * 项目全局配置信息
 * 
 */
export function getAppConfig() {
	return request.get('/get_app_config',{},{'noLogin':true});
}


/**
 * 账号密码登录
 * 
 */
export function login(data) {
	return request.post('/login',data,{'noLogin':false});
}


/**
 * 手机验证码登录
 * 
 */
export function smslogin(data) {
	return request.post('/smslogin',data,{'noLogin':true});
}

/**
 * 获取登录验证码
 * 
 */
export function loginCode(data) {
	return request.post('/login_code',data,{'noLogin':false});
}

/**
 * 手机+验证码注册登录
 * 
 */
export function register(data) {
	return request.post('/register',data,{'noLogin':false});
}

/**
 * 	获取注册验证码
 * 
 */
export function regCode(data) {
	return request.post('/reg_code',data,{'noLogin':false});
}

/**
 * 	退出登录
 * 
 */
export function loginout(data) {
	return request.post('/loginout',data,{'noLogin':false});
}


// 商城

/**
 * 	商品详情
 * 
 */
export function goodsdetail(data) {
	return request.get('/store/goodsdetail',data,{'noLogin':false});
}

/**
 * 	客服登录
 * 
 */
export function kefulogin(data) {
	return request.post('/api/user/login',data,{'noLogin':false});
}

/**
 * 	客服注册
 * 
 */
export function kefureg(data) {
	return request.post('/api/user/reg',data,{'noLogin':false});
}

// ============================================================================================================news
/**
 * 	门店列表
 * 
 */
export function storelist(data) {
	return request.get('/storelist',data,{'noLogin':false,'noStore':true});
}
/**
 * 	门店详情
 * 
 */
export function storeDetail(data) {
	return request.post('/store',data,{'noLogin':false,'noStore':true});
}

/**
 * 	门店的全部商品列表
 * 
 */
export function storegoodsAll(data) {
	return request.get('/storegoods',data,{'noLogin':false,'noStore':true});
}
/**
 * 	获取全局变量信息
 * 
 */
export function getGlobalInfo(data) {
	return request.get('/get_global_info',data,{'noLogin':false});
}

/**
 * 	视频列表
 * 
 */
export function videoListapi(data) {
	return request.get('/video_list',data,{'noLogin':false});
}

// ==========================回收==================================================================================news

/**
 * 回收系统订单创建
 * 
 */
export function insertBasicOrder(data) {
	return request.post('/insert_basic_order',data,{'noLogin':true});
}

/**
 * 银行账号设置默认
 * 
 */
export function handleDefaultBank(data) {
	return request.post('/handle_default_bank',data,{'noLogin':true});
}
/**
 * 银行账号删除
 * 
 */
export function deleteBank(data) {
	return request.post('/delete_bank',data,{'noLogin':true});
}
/**
 * 银行账号添加
 * 
 */
export function addUserBank(data) {
	return request.post('/add_user_bank',data,{'noLogin':true});
}
/**
 * 银行账号列表
 * 
 */
export function getBankList() {
	return request.get('/get_bank_list',{},{'noLogin':true});
}

/**
 * 用户身份证验证
 * 
 */
export function checkUserIdcard(data) {
	return request.post('/check_user_idcard',data,{'noLogin':true});
}

/**
 * 回收自定义订单创建
 * 
 */
export function insertCustomOrder(data) {
	return request.post('/insert_custom_order',data,{'noLogin':true});
}


/**
 * 分享秀点击赞或删除赞
 * 
 */
export function addUserClickShow(data) {
	return request.post('/add_user_click_show',data,{'noLogin':true});
}

/**
 * 搜索联想
 * 
 */
export function searchRecycleData(data) {
	return request.get('/search_recycle_data',data,{'noLogin':true});
}

/**
 * 回收订单列表
 * 
 */
export function getOrderList(data) {
	return request.post('/get_order_list',data,{'noLogin':true});
}
/**
 * 顺丰快递查询
 * 
 */
export function querySfData(data) {
	return request.post('/query_sf_data',data,{'noLogin':true});
}

/**
 * 轮播图
 * 
 */
export function lunboList(data) {
	return request.get('/lunbo_list',data,{'noLogin':true});
}



/**
 * 获取系统报价提交订单基础信息
 * 
 */
export function addBasicOrder(data) {
	return request.get('/add_basic_order',data,{'noLogin':true});
}


/**
 * 回收订单详情
 * 
 */
export function recycleOrderDetail(data) {
	return request.post('/recycle_order_detail',data,{'noLogin':true,'noStore':true});
}



/**
 * 用户去发货
 * 
 */
export function recycleSendExpress(data) {
	return request.post('/recycle_send_express',data,{'noLogin':true});
}

/**
 * 用户去发货
 * 
 */
export function userSet(data) {
	return request.post('/userset',data,{'noLogin':true});
}

/**
 * 站内信列表
 * 
 */
export function msgList(data) {
	return request.get('/msglist',data,{'noLogin':true});
}

/**
 * 站内信详情
 * 
 */
export function msgDetail(data) {
	return request.get('/msgdetail',data,{'noLogin':true});
}

/**
 * 最近的门店
 * 
 */
export function storesstorelatelystore(data) {
	return request.get('/stores/store/latelystore',data,{'noLogin':true});
}

export function cityList(data) {
	// return new Promise((resolve, reject) => {
	// 	resolve([
	// 		{
	// 			id: 1,
	// 			name: '三亚',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: '上海',
	// 		},
	// 	])
	// })
	return request.get('/area/open',data,{'noLogin':true});
}

//未上架机型 -- 机型选择 、属性
export function getOtherMachine(data) {
	return request.get('/recycle/index/get_other_machine',data,{'noLogin':true});
}
//未上架机型 -- 机型属性
export function getOtherShuxing(data) {
	return request.get('/recycle/index/get_other_shuxing',data,{'noLogin':true});
}
//未上架机型 -- 提交属性
export function addOtherAttr(data) {
	return request.post('/erp/purchase/addotherattr',data,{'noLogin':true});
}
//未上架机型 -- 提交属性
export function getOtherAttr(data) {
	return request.get('/erp/purchase/getotherattr',data,{'noLogin':true});
}

/**
 * 微信获取phone
 * 
 */
export function bindingUser(data) {
	return request.post('/thirdstore/User/binding',data,{'noLogin':true});
}