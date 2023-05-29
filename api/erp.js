// 分销 模块  ---------------------------S
import request from '@/utils/request.js';

/**
 * 回收列表获取
 *
 */
export function selectRecycleOrderList(data) {
	return request.post('/yxj/app/recycle/empSelectRecycleOrderList', data, {
		noLogin: true
	});
}

/**
 * 员工抢单
 *
 */
export function empRobRecycleOrder(data) {
	return request.get('/yxj/app/recycle/empRobRecycleOrder/' + data, {
		noLogin: true
	});
}

/**
 * 回收列表详情
 *
 */
export function empSelectRecycleOrderDetail(data) {
	return request.get('/yxj/app/recycle/empSelectRecycleOrderDetail/' + data, {
		noLogin: true
	});
}

/**
 * 确认付款
 *
 */
export function empConfirmPayment(data) {
	return request.post('/yxj/app/recycle/empConfirmPayment', data, {
		noLogin: true
	});
}

/**
 * 确认退回
 *
 */
export function empConfirmReturn(data) {
	return request.post('/yxj/app/recycle/empConfirmReturn', data, {
		noLogin: true
	});
}

/**
 * 添加用户开单
 *
 */
export function employeeClient(data) {
	return request.post('/yxj/app/employeeClient', data, {
		noLogin: true
	});
}

/**
 * 用户开单查询
 *
 */
export function employeeClientList(data) {
	return request.get('/yxj/app/employeeClient/list', data, {
		noLogin: true
	});
}

/**
 * 用户仓库列表
 *
 */
export function warehouseList(data) {
	return request.get('/yxj/app/warehouse/list', data, {
		noLogin: true
	});
}

/**
 * 添加仓库列表
 *
 */
export function addWarehouse(data) {
	return request.post('/yxj/app/warehouse', data, {
		noLogin: true
	});
}

/**
 * 订单同意
 *
 */
export function empAgreeOrder(data) {
	return request.get('/yxj/app/recycle/empAgreeOrder/' + data, {
		noLogin: true
	});
}

/**
 * 点击用户跳转开单页面
 *
 */
export function getInfoByRecycleOrderId(data) {
	return request.get('/yxj/app/recycleForm/getInfoByRecycleOrderId/' + data, {
		noLogin: true
	});
}

/**
 * 修改序列号
 *
 */
export function updateDeviceNo(data) {
	return request.post('/yxj/app/recycle/updateDeviceNo', data, {
		noLogin: true
	});
}

/**
 * 创建回收订单
 *
 */
export function empCreateRecycleForm(data) {
	return request.post('/yxj/app/recycleForm/empCreateRecycleForm', data, {
		noLogin: true
	});
}

/**
 * 审上架列表
 *
 */
export function leaderSelectRecycleForm(data) {
	return request.get('/yxj/app/recycleForm/leaderSelectRecycleForm', data, {
		noLogin: true
	});
}

/**
 * 员工回收单
 *
 */
export function empSelectRecycleForm(data) {
	return request.get('/yxj/app/recycleForm/empSelectRecycleForm', data, {
		noLogin: true
	});
}

/**
 * 分拣列表
 *
 */
export function sortingList(data) {
	return request.post('/yxj/app/sorting/list', data, {
		noLogin: true
	});
}

/**
 * 获取运营中心
 *
 */
export function getOperatingCenter(data) {
	return request.get('/yxj/app/common/getOperatingCenter/' + data, {
		noLogin: true
	});
}

/**
 * 确认送检
 *
 */
export function addInspectDevice(data) {
	return request.post('/yxj/app/sorting/inspectDevice', data, {
		noLogin: true
	});
}

/**
 * 送检确认收货
 *
 */
export function receiveInspectDevice(data) {
	return request.get('/yxj/app/sorting/receiveInspectDevice/' + data, {
		noLogin: true
	});
}

/**
 * 获取分拣员列表
 *
 */
export function getSortingPeoples(data) {
	return request.get('/yxj/app/common/getSortingPeoples', data, {
		noLogin: true
	});
}

/**
 * 分配分拣员
 *
 */
export function distributionSortingTask(data) {
	return request.post('/yxj/app/sorting/distributionSortingTask', data, {
		noLogin: true
	});
}

/**
 * 分拣员点点上传
 *
 */
export function empGetDeviceQuality(data) {
	return request.get('/yxj/app/sorting/empGetDeviceQuality/' + data, {
		noLogin: true
	});
}

/**
 * 分拣员提交分拣订单
 *
 */
export function empUpdateDeviceQuality(data) {
	return request.post('/yxj/app/sorting/empUpdateDeviceQuality', data, {
		noLogin: true
	});
}

/**
 * 分拣员获取门店名称和地址
 *
 */
export function empGetStoreInfo(data) {
	return request.get('/yxj/app/sorting/empGetStoreInfo/' + data, {
		noLogin: true
	});
}

/**
 * 分拣员返回门店接口
 *
 */
export function empReturnStore(data) {
	return request.post('/yxj/app/sorting/empReturnStore', data, {
		noLogin: true
	});
}

/**
 * 店长确认收货接口
 *
 */
export function storeAdminConfirm(data) {
	return request.get('/yxj/app/sorting/storeAdminConfirm/' + data, {
		noLogin: true
	});
}

/**
 * 店长审批抛售申请
 *
 */
export function storeAdminUndersellApprove(data) {
	return request.post('/yxj/app/sorting/storeAdminUndersellApprove', data, {
		noLogin: true
	});
}

/**
 * 分拣员上传抛售凭证和收款凭证
 *
 */
export function empUploadUndersellVoucher(data) {
	return request.post('/yxj/app/sorting/empUploadUndersellVoucher', data, {
		noLogin: true
	});
}

/**
 * 店长审批维修申请
 *
 */
export function storeAdminMaintainApprove(data) {
	return request.post('/yxj/app/sorting/storeAdminMaintainApprove', data, {
		noLogin: true
	});
}
/**
 * 分拣员上传维修凭证
 *
 */
export function empUploadMaintainVoucher(data) {
	return request.post('/yxj/app/sorting/empUploadMaintainVoucher', data, {
		noLogin: true
	});
}

/**
 * 店长选择维修单的处理类型
 *
 */
export function storeAdminSelectHandleType(data) {
	return request.post('/yxj/app/sorting/storeAdminSelectHandleType', data, {
		noLogin: true
	});
}

/**
 * 维修失败接口
 *
 */
export function empMaintainFail(data) {
	return request.post('/yxj/app/sorting/empMaintainFail', data, {
		noLogin: true
	});
}

/**
 * 整备仓列表
 *
 */
export function selectReoragnizeList(data) {
	return request.get('/yxj/app/reoragnize/selectReoragnizeList/' + data, {
		noLogin: true
	});
}

/**
 * 整备仓上架接口
 *
 */
export function putaway(data) {
	return request.get('/yxj/app/reoragnize/putaway/' + data, {
		noLogin: true
	});
}

/**
 * 整备仓抛售接口
 *
 */
export function undersell(data) {
	return request.get('/yxj/app/reoragnize/undersell/' + data, {
		noLogin: true
	});
}

/**
 * 整备仓抛售接口
 *
 */
export function storeAdminApproveList(data) {
	return request.get('/yxj/app/recycleForm/storeAdminApproveList', data, {
		noLogin: true
	});
}

/**
 * 店长审批回收单接口
 *
 */
export function empApproveRecycleForm(data) {
	return request.post('/yxj/app/recycleForm/empApproveRecycleForm', data, {
		noLogin: true
	});
}

/**
 * 获取供应商列表
 *
 */
export function supplierList(data) {
	return request.get('/yxj/app/supplier/list', data, {
		noLogin: true
	});
}

/**
 * 获取供应商列表
 *
 */
export function addsupplier(data) {
	return request.post('/yxj/app/supplier', data, {
		noLogin: true
	});
}

/**
 * 查询门店配件订单列表
 *
 */
export function fittingsOrderList(data) {
	return request.get('/yxj/app/fittingsOrder/list', data, {
		noLogin: true
	});
}

/**
 * 查询配件配置列表
 *
 */
export function fittingsConfigList(data) {
	return request.get('/yxj/platform/fittingsConfig/list', data, {
		noLogin: true
	});
}
/**
 * 新增门店配件订单
 *
 */
export function fittingsOrder(data) {
	return request.post('/yxj/app/fittingsOrder', data, {
		noLogin: true
	});
}

/**
 * 修改门店配件订单
 *
 */
export function fittingsOrders(data) {
	return request.put('/yxj/app/fittingsOrder', data, {
		noLogin: true
	});
}

/**
 * 上传配件凭证
 *
 */
export function confirmWarehousing(data) {
	return request.post('/yxj/app/fittingsOrder/confirmWarehousing', data, {
		noLogin: true
	});
}

/**
 * 获取顶级配件仓列表
 *
 */
export function selectTopWarehouseList(data) {
	return request.get('/yxj/app/fittings/selectTopWarehouseList', data, {
		noLogin: true
	});
}

/**
 * 获取顶级配件仓列表
 *
 */
export function fittingsList(data) {
	return request.get('/yxj/app/fittings/list', data, {
		noLogin: true
	});
}

/**
 * 新增销售开单
 *
 */
export function fittingsForm(data) {
	return request.post('/yxj/app/fittingsForm', data, {
		noLogin: true
	});
}

/**
 * 获取devsId
 *
 */
export function selectReoragnizeSellInfo(data) {
	return request.get('/yxj/app/fittingsForm/selectReoragnizeSellInfo/' + data, {
		noLogin: true
	});
}

/**
 * 获取销售开单商品列表
 *
 */
export function selectStaySellFormList(data) {
	return request.get('/yxj/app/fittingsForm/selectStaySellFormList', data, {
		noLogin: true
	});
}

/**
 * 查询已开销售单列表
 *
 */
export function selectSellFormList(data) {
	return request.get('/yxj/app/fittingsForm/selectSellFormList', data, {
		noLogin: true
	});
}

/**
 * 查询销售单详情
 *
 */
export function selectSellFormDetail(data) {
	return request.get('/yxj/app/fittingsForm/selectSellFormDetail', data, {
		noLogin: true
	});
}

/**
 * 获取待调价列表
 *
 */
export function getAdjustPriceList(data) {
	return request.get('/yxj/app/adjustPrice/getAdjustPriceList', data, {
		noLogin: true
	});
}

/**
 * 确定调价
 *
 */
export function adjustPrice(data) {
	return request.post('/yxj/app/adjustPrice/adjustPrice', data, {
		noLogin: true
	});
}

/**
 * 获取已调价的记录列表
 *
 */
export function adjustPriceList(data) {
	return request.get('/yxj/app/adjustPrice/list', data, {
		noLogin: true
	});
}

/**
 * 员工查询购物订单列表
 *
 */
export function empSelectList(data) {
	return request.get('/yxj/app/shoppingOrder/empSelectList', data, {
		noLogin: true
	});
}

/**
 * 员工填写运单号
 *
 */
export function sellerShipments(data) {
	return request.post('/yxj/app/shoppingOrder/sellerShipments', data, {
		noLogin: true
	});
}

/**
 * 审批时获取拒绝理由的接口
 *
 */
export function refuseReasonList(data) {
	return request.get('/yxj/app/secondGoodsReturn/refuseReasonList', data, {
		noLogin: true
	});
}

/**
 * 同意退款接口
 *
 */
export function agreeReturn(data) {
	return request.get('/yxj/app/secondGoodsReturn/agreeReturn', data, {
		noLogin: true
	});
}

/**
 * 查看退货原因接口
 *
 */
export function selectReturnReason(data) {
	return request.get('/yxj/app/secondGoodsReturn/selectReturnReason', data, {
		noLogin: true
	});
}

/**
 * 上传售后凭证接口
 *
 */
export function uploadAfterSaleVoucher(data) {
	return request.post('/yxj/app/secondGoodsReturn/uploadAfterSaleVoucher', data, {
		noLogin: true
	});
}

/**
 * 店员抢销售单
 *
 */
export function empRobShoppingOrder(data) {
	return request.get('/yxj/app/shoppingOrder/empRobShoppingOrder', data, {
		noLogin: true
	});
}

/**
 * 获取门店杂费，回收佣金配置信息
 *
 */
export function getStoreOnlineCostConfig(data) {
	return request.get('/yxj/app/recycleForm/getStoreOnlineCostConfig', data, {
		noLogin: true
	});
}

/**
 * 获取门店商品列表
 *
 */
export function selectStoreGoods(data) {
	return request.get('/yxj/app/secondGoods/selectStoreGoods', data, {
		noLogin: true
	});
}