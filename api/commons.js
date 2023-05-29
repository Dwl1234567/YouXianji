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

/**
 * 获取会员等级规则列表
 * 
 */
export function getDistributionIncomeInfo(data) {
	return request.get('/yxj/app/distributionIncome/getDistributionIncomeInfo', data, {
		'noLogin': true
	});
}

/**
 * 增分销佣金提现
 * 
 */
export function withdraw(data) {
	return request.post('/yxj/app/distributionIncome/withdraw', data, {
		'noLogin': true
	});
}


/**
 * 查询提现记录
 * 
 */
export function withdrawList(data) {
	return request.get('/yxj/app/distributionIncome/withdrawList', data, {
		'noLogin': true
	});
}
/**
 * 查询分销佣金收入列表
 * 
 */
export function distributionIncomeList(data) {
	return request.get('/yxj/app/distributionIncome/list', data, {
		'noLogin': true
	});
}

/**
 * 查询总佣金收入和支出
 * 
 */
export function selectTotal(data) {
	return request.get('/yxj/app/distributionIncome/selectTotal', data, {
		'noLogin': true
	});
}

/**
 * 查询浏览记录列表
 * 
 */
export function selectDistributionBrowseList(data) {
	return request.get('/yxj/app/distributionIncome/selectDistributionBrowseList', data, {
		'noLogin': true
	});
}

/**
 * 查询绑定关系列表
 * 
 */
export function selectDistributionRelationList(data) {
	return request.get('/yxj/app/distributionIncome/selectDistributionRelationList', data, {
		'noLogin': true
	});
}

/**
 * 查询收益排行
 * 
 */
export function selectDistributionIncomeRank(data) {
	return request.get('/yxj/app/distributionIncome/selectDistributionIncomeRank', data, {
		'noLogin': true
	});
}

/**
 * 查询我的排名信息
 * 
 */
export function selectMyRankInfo(data) {
	return request.get('/yxj/app/distributionIncome/selectMyRankInfo', data, {
		'noLogin': true
	});
}

/**
 * 查询订单列表
 * 
 */
export function shoppingOrderList(data) {
	return request.get('/yxj/app/shoppingOrder/list', data, {
		'noLogin': true
	});
}