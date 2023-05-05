// 分销 模块  ---------------------------S
import request from '@/utils/request.js';

/**
 * 回收列表获取
 *
 */
export function selectRecycleOrderList(data) {
	return request.post('/yxj/app/recycle/empSelectRecycleOrderList', data, { noLogin: true });
}

/**
 * 员工抢单
 *
 */
export function empRobRecycleOrder(data) {
	return request.get('/yxj/app/recycle/empRobRecycleOrder/' + data, { noLogin: true });
}

/**
 * 回收列表详情
 *
 */
export function empSelectRecycleOrderDetail(data) {
	return request.get('/yxj/app/recycle/empSelectRecycleOrderDetail/' + data, { noLogin: true });
}

/**
 * 确认付款
 *
 */
export function empConfirmPayment(data) {
	return request.post('/yxj/app/recycle/empConfirmPayment', data, { noLogin: true });
}

/**
 * 确认退回
 *
 */
export function empConfirmReturn(data) {
	return request.post('/yxj/app/recycle/empConfirmReturn', data, { noLogin: true });
}

/**
 * 添加用户开单
 *
 */
export function employeeClient(data) {
	return request.post('/yxj/app/employeeClient', data, { noLogin: true });
}

/**
 * 用户开单查询
 *
 */
export function employeeClientList(data) {
	return request.get('/yxj/app/employeeClient/list', data, { noLogin: true });
}

/**
 * 用户仓库列表
 *
 */
export function warehouseList(data) {
	return request.get('/yxj/app/warehouse/list', data, { noLogin: true });
}

/**
 * 添加仓库列表
 *
 */
export function addWarehouse(data) {
	return request.post('/yxj/app/warehouse', data, { noLogin: true });
}

/**
 * 订单同意
 *
 */
export function empAgreeOrder(data) {
	return request.get('/yxj/app/recycle/empAgreeOrder/' + data, { noLogin: true });
}

/**
 * 点击用户跳转开单页面
 *
 */
export function getInfoByRecycleOrderId(data) {
	return request.get('/yxj/app/recycleForm/getInfoByRecycleOrderId/' + data, { noLogin: true });
}

/**
 * 修改序列号
 *
 */
export function updateDeviceNo(data) {
	return request.post('/yxj/app/recycle/updateDeviceNo', data, { noLogin: true });
}

/**
 * 创建回收订单
 *
 */
export function empCreateRecycleForm(data) {
	return request.post('/yxj/app/recycleForm/empCreateRecycleForm', data, { noLogin: true });
}

/**
 * 审上架列表
 *
 */
export function leaderSelectRecycleForm(data) {
	return request.get('/yxj/app/recycleForm/leaderSelectRecycleForm', data, { noLogin: true });
}

/**
 * 员工回收单
 *
 */
export function empSelectRecycleForm(data) {
	return request.get('/yxj/app/recycleForm/empSelectRecycleForm', data, { noLogin: true });
}

/**
 * 分拣列表
 *
 */
export function sortingList(data) {
	return request.post('/yxj/app/sorting/list', data, { noLogin: true });
}
