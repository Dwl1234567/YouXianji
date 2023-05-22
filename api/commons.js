import request from "@/utils/request.js";

/**
 * 获取地区信息
 * 
 */
export function getProvinceList() {
	return request.get('/yxj/app/common/getProvinceList', {
		'noLogin': true
	});
}

/**
 * 获取下级地区信息
 * 
 */
export function getAreaByPid(data) {
	return request.get('/yxj/app/common/getAreaByPid/' + data, {
		'noLogin': true
	});
}

/**
 * 保存地址
 * 
 */
export function saveUserAddress(data) {
	return request.post('/yxj/app/user/saveUserAddress', data, {
		'noLogin': true
	});
}

/**
 * 查询所有地址
 * 
 */
export function selectUserAddressList(data) {
	return request.get('/yxj/app/user/selectUserAddressList', {
		'noLogin': true
	});
}

/**
 * 删除地址
 * 
 */
export function deleteUserAddress(data) {
	return request.get('/yxj/app/user/deleteUserAddress/' + data, {
		'noLogin': true
	});
}

/**
 * 根据位置获取门店
 * 
 */
export function getNearestStoreList(data) {
	return request.get('/yxj/app/common/getNearestStoreList', data, {
		'noLogin': true
	});
}

/**
 * 获取银行卡list
 * 
 */
export function userAccountList(data) {
	return request.get('/yxj/app/userAccount/list', {
		'noLogin': true
	});
}

/**
 * 添加银行卡
 * 
 */
export function addUserAccount(data) {
	return request.post('/yxj/app/userAccount', data, {
		'noLogin': true
	});
}

/**
 * 获取银行卡详情
 * 
 */
export function userAccountDetail(data) {
	return request.get('/yxj/app/userAccount/' + data, {
		'noLogin': true
	});
}

/**
 * 获取银行卡详情
 * 
 */
export function editUserAccount(data) {
	return request.put('/yxj/app/userAccount', data, {
		'noLogin': true
	});
}

/**
 * 删除银行卡
 * 
 */
export function delectUserAccount(data) {
	return request.delete('/yxj/app/userAccount/' + data, {
		'noLogin': true
	});
}

/**
 * 设置默认银行卡
 * 
 */
export function defaltUserAccount(data) {
	return request.get('/yxj/app/userAccount/setDefault?accountId=' + data, {
		'noLogin': true
	});
}

/**
 * 身份证绑定
 * 
 */
export function idCardVerification(data) {
	return request.post('/yxj/app/common/idCardVerification', data, {
		'noLogin': true
	});
}

/**
 * 用户运输中查看列表
 * 
 */
export function selectRecycleOrderList(data) {
	return request.get('/yxj/app/recycle/selectRecycleOrderList', data, {
		'noLogin': true
	});
}

/**
 * 用户质检查看列表
 * 
 */
export function selectReceiptList(data) {
	return request.get('/yxj/app/recycle/selectReceiptList', data, {
		'noLogin': true
	});
}

/**
 * 用户查看回执单
 * 
 */
export function selectReceiptDetail(data) {
	return request.get('/yxj/app/recycle/selectReceiptDetail/' + data, {
		'noLogin': true
	});
}

/**
 * 用户同意并打款
 * 
 */
export function agreeReceipt(data) {
	return request.get('/yxj/app/recycle/agreeReceipt/' + data, {
		'noLogin': true
	});
}

/**
 * 用户拒绝并退回
 * 
 */
export function refuseReceipt(data) {
	return request.get('/yxj/app/recycle/refuseReceipt/' + data, {
		'noLogin': true
	});
}

/**
 * 用户查看结算列表
 * 
 */
export function selectRecycleOrderSellList(data) {
	return request.post('/yxj/app/recycle/selectRecycleOrderSellList', data, {
		'noLogin': true
	});
}

/**
 * 获取会员等级规则列表
 * 
 */
export function selectMemberLevelRuleList(data) {
	return request.get('/yxj/app/userMemberInfo/selectMemberLevelRuleList', data, {
		'noLogin': true
	});
}