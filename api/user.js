//mycenter相关接口
import request from "@/utils/request.js";

/**
 * 获取用户信息 -- 新 518
 * 
 */
export function getRecycleUserinfo() {
	return request.post('/get_userinfo',{});
}

/**
 * 获取用户信息 --废弃
 * 
 */
export function getUserData() {
	return request.post('/get_user_data',{});
}

/**
 * 获取城市信息
 * 
 */
export function getarea() {
	return request.get('/get_area',{},{'noLogin':true});
}

/**
 * 用户收货地址添加
 * 
 */
export function addAddress(data) {
	return request.post('/add_address',data);
}

/**
 * 用户收货地址修改
 * 
 */
export function editAddress(data) {
	return request.post('/edit_address',data,{'noLogin':false});
}

/**
 * 用户收货地址列表
 * 
 */
export function addressList() {
	return request.get('/address',{},{'noLogin':false});
}

/**
 * 用户寄售记录
 * 
 */
export function getExchgoodsLog(data) {
	return request.get('/get_exchgoods_log',data,{'noLogin':false});
}

/**
 * 用户金钱记录
 * 
 */
export function getMoneyLog(data) {
	return request.get('/get_money_log',data,{'noLogin':false});
}


/**
 * 订单详情
 * 
 */
export function getOrderDetail() {
	return request.get('/get_order_detail',{},{'noLogin':false});
}


/**
 * 用户交易密码设置修改
 * 
 */
export function handlePayPassword(data) {
	return request.post('/handle_pay_password',data,{'noLogin':false});
}


/**
 * 签到领当日基础加速兑换金
 * 
 */
export function signExchMoney() {
	return request.post('/sign_exch_money',{},{'noLogin':false});
}

/**
 * 判断是否领取了今日基础兑换金
 * 
 */
export function checkGainExch() {
	return request.get('/check_gain_exch',{},{'noLogin':false});
}

/**
 * 我的团队加速
 * 
 */
export function getTeamData() {
	return request.get('/get_team_data',{},{'noLogin':false});
}



/**
 * 修改用户信息 -传不同的字段
 * 
 */
export function updateUserData(data) {
	return request.post('/update_user_data',data);
}


/**
 * 设置默认银行账户
 * 
 */
export function handleDefaultBank(data) {
	return request.post('/handle_default_bank',data);
}

/**
 * 用户银行列表
 * 
 */
export function getBankList() {
	return request.get('/get_bank_list',{},{'noLogin':false});
}

/**
 * 重设(找回)登录密码
 * 
 */
export function editPwd(data) {
	return request.post('/edit_pwd',data);
}

/**
 * 用户收货地址删除
 * 
 */
export function delAddress(data) {
	return request.post('/del_address',data);
}

/**
 * 用户收货地址设置默认
 * 
 */
export function setDefaultAddress(data) {
	return request.post('/set_default_address',data);
}


/**
 * 加速中心-用户本身数据
 * 
 */
export function userSpeedData() {
	return request.post('/user_speed_data',{},{'noLogin':false});
}

/**
 * 获取用户直推会员加速中心
 * 
 */
export function userSpeedList(data) {
	return request.post('/user_speed_list',data);
}



/**
 * 修改密码获取验证码
 * 
 */
export function pwdCode(data) {
	return request.post('/pwd_code',data);
}


/**
 * 用户银行卡删除
 * 
 */
export function deleteBank(data) {
	return request.post('/delete_bank',data);
}

/**
 * 用户银行卡添加
 * 
 */
export function addUserBank(data) {
	return request.post('/add_user_bank',data);
}

/**
 * 物流信息查询接口
 * 
 */
export function express(data) {
	return request.post('/express',data);
}


/**
 * 实名身份证设置
 * 
 */
export function addIddata(data) {
	return request.post('/add_iddata',data);
}

/**
 * 帮助中心
 * 列表 help_list
 * 详情 help_detail
 */
export function getHelpList(data) {
	return request.get('/help_list',data);
}
export function getHelpDetail(data) {
	return request.get('/help_detail',data);
}



/**
 * 用户之间转账
 * 
 */
export function userExchange(data) {
	return request.post('/user_exchange',data);
}


/**
 * 修改支付密码获取验证码
 * 
 */
export function payCode(data) {
	return request.post('/pay_code',data);
}


/**
 * 用户提现申请
 * 
 */
export function applyCash(data) {
	return request.post('/apply_cash',data);
}


// =========================  528

/**
 * 设置用户信息
 * 
 */
export function userset(data) {
	return request.post('/userset',data);
}

/**
 * 用户行为列表[足迹]
 * 
 */
export function userVisitlist(data) {
	return request.post('/user_visitlist',data);
}
/**
 * 添加用户行为[足迹]
 * 
 */
export function setuservisit(data) {
	return request.post('/setuservisit',data);
}

/**
 * 客服初始化
 * 
 */
export function kefuInitUser(data) {
	return request.post('/kefu_init_user',data);
}


/**
 * 获取客服内客户列表
 * 
 */
export function getKefuUserList(data) {
	return request.post('/kefu_user_list',data);
}

/**
 * 获取客服内客户列表
 * 
 */
export function kefuQiangdan(data) {
	return request.post('/kefu_qiangdan',data);
}



/**
 * 获取用户信息 -- uxj
 * 
 */
export function getUserInfo() {
	return request.get('/yxj/app/user/getUserInfo');
}
