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

/**
 * 查询建议库存统计数据
 *
 */
export function selectSuggestInventoryCount(data) {
	return request.get('/yxj/app/common/selectSuggestInventoryCount', data, {
		noLogin: true
	});
}

/**
 * 查询建议库存统计数据
 *
 */
export function selectModelSellRankCount(data) {
	return request.get('/yxj/app/common/selectModelSellRankCount', data, {
		noLogin: true
	});
}

/**
 * 新增门店盘点任务
 *
 */
export function storeCheckTask(data) {
	return request.post('/yxj/app/storeCheckTask', data, {
		noLogin: true
	});
}

/**
 * 查询门店员工
 *
 */
export function selectStoreUsers(data) {
	return request.get('/yxj/app/common/selectStoreUsers', data, {
		noLogin: true
	});
}

/**
 * 查询门店盘点任务列表
 *
 */
export function storeCheckTaskList(data) {
	return request.get('/yxj/app/storeCheckTask/list', data, {
		noLogin: true
	});
}

/**
 * 店长结束按钮
 *
 */
export function endTask(data) {
	return request.get('/yxj/app/storeCheckTask/endTask', data, {
		noLogin: true
	});
}

/**
 * 查询门店盘点任务明细列表
 *
 */
export function storeCheckItemList(data) {
	return request.get('/yxj/app/storeCheckItem/list', data, {
		noLogin: true
	});
}

/**
 * 上传盘点凭证
 *
 */
export function uploadCheckVoucher(data) {
	return request.post('/yxj/app/storeCheckItem/uploadCheckVoucher', data, {
		noLogin: true
	});
}

/**
 * 获取调拨门店列表
 *
 */
export function getAllotedStoreList(data) {
	return request.get('/yxj/app/storeAllot/getAllotedStoreList', data, {
		noLogin: true
	});
}

/**
 * 查询门店可调拨设备
 *
 */
export function getAllotedDeviceList(data) {
	return request.get('/yxj/app/storeAllot/getAllotedDeviceList', data, {
		noLogin: true
	});
}

/**
 * 新增门店调拨
 *
 */
export function storeAllot(data) {
	return request.post('/yxj/app/storeAllot', data, {
		noLogin: true
	});
}

/**
 * 查询门店调拨列表
 *
 */
export function storeAllotList(data) {
	return request.get('/yxj/app/storeAllot/list', data, {
		noLogin: true
	});
}

/**
 * 同意调拨申请
 *
 */
export function agreeAlloteApprove(data) {
	return request.post('/yxj/app/storeAllot/agreeAlloteApprove', data, {
		noLogin: true
	});
}

/**
 * 整备仓获取点点信息
 *
 */
export function getPutawayInfo(data) {
	return request.get('/yxj/app/reoragnize/getPutawayInfo/' + data, {
		noLogin: true
	});
}

/**
 * 修改
 *
 */
export function reoragnizePutaway(data) {
	return request.post('/yxj/app/reoragnize/putaway', data, {
		noLogin: true
	});
}

/**
 * 获取我的回收列表
 *
 */
export function getMyRecycleList(data) {
	return request.get('/yxj/app/recycleForm/getMyRecycleList', data, {
		noLogin: true
	});
}

/**
 * 查询我的销售单列表
 *
 */
export function selectMySellFormList(data) {
	return request.get('/yxj/app/fittingsForm/selectMySellFormList', data, {
		noLogin: true
	});
}

/**
 * 获取所有分类
 *
 */
export function getAllClassification(data) {
	return request.get('/yxj/app/common/getAllClassification', data, {
		noLogin: true
	});
}

/**
 * 查询门店商品管理列表
 *
 */
export function selectGoodsManageList(data) {
	return request.get('/yxj/app/secondGoods/selectGoodsManageList', data, {
		noLogin: true
	});
}

/**
 * 调到整备仓
 *
 */
export function toReoragnize(data) {
	return request.get('/yxj/app/secondGoods/toReoragnize', data, {
		noLogin: true
	});
}

/**
 * 获取员工业绩信息
 *
 */
export function getPerformance(data) {
	return request.get('/yxj/app/performance/getPerformance', data, {
		noLogin: true
	});
}

/**
 * 查询门店回收业绩
 *
 */
export function getStoreRecyclePerformance(data) {
	return request.get('/yxj/app/performance/getStoreRecyclePerformance', data, {
		noLogin: true
	});
}

/**
 * 获取门店销售业绩
 *
 */
export function getStoreSellPerformance(data) {
	return request.get('/yxj/app/performance/getStoreSellPerformance', data, {
		noLogin: true
	});
}


/**
 * 获取门店客户列表
 *
 */
export function selectStoreClientList(data) {
	return request.get('/yxj/app/employeeClient/selectStoreClientList', data, {
		noLogin: true
	});
}


/**
 * 查询员工工资
 *
 */
export function getEmployeeWage(data) {
	return request.get('/yxj/app/employeeCommission/getEmployeeWage', data, {
		noLogin: true
	});
}

/**
 * 改报价列表
 *
 */
export function selectUnderwayTaskList(data) {
	return request.get('/yxj/app/adjustPriceTask/selectUnderwayTaskList', data, {
		noLogin: true
	});
}

/**
 * 改报价列表
 *
 */
export function selectTaskItemList(data) {
	return request.get('/yxj/app/adjustPriceTask/selectTaskItemList', data, {
		noLogin: true
	});
}

/**
 * 保存报价列表
 *
 */
export function saveAdjustPrice(data) {
	return request.post('/yxj/app/adjustPriceTask/saveAdjustPrice', data, {
		noLogin: true
	});
}

/**
 * 提交调报价申请
 *
 */
export function submitAdjustPrice(data) {
	return request.get('/yxj/app/adjustPriceTask/submitAdjustPrice/' + data, {
		noLogin: true
	});
}

/**
 * 查询审报价列表
 *
 */
export function selectApproveAdjustPriceList(data) {
	return request.get('/yxj/app/adjustPriceTask/selectApproveAdjustPriceList', data, {
		noLogin: true
	});
}

/**
 * 审报价驳回
 *
 */
export function rejectAdjustPrice(data) {
	return request.get('/yxj/app/adjustPriceTask/rejectAdjustPrice', data, {
		noLogin: true
	});
}

/**
 * 同意调报价申请
 *
 */
export function agreeAdjustPrice(data) {
	return request.get('/yxj/app/adjustPriceTask/agreeAdjustPrice/' + data, {
		noLogin: true
	});
}

/**
 * 查询门店回收方列表
 *
 */
export function storeRecyclerList(data) {
	return request.get('/yxj/app/storeRecycler/list', data, {
		noLogin: true
	});
}

/**
 * 添加回收方
 *
 */
export function storeRecycler(data) {
	return request.post('/yxj/app/storeRecycler', data, {
		noLogin: true
	});
}

/**
 * 获取本店销售列表
 *
 */
export function selectUserSellFormList(data) {
	return request.get('/yxj/app/fittingsForm/selectUserSellFormList', data, {
		noLogin: true
	});
}

/**
 * 新增门店退款登记
 *
 */
export function returnRegistration(data) {
	return request.post('/yxj/app/returnRegistration', data, {
		noLogin: true
	});
}

/**
 * 查询门店设备收支财务列表
 *
 */
export function financeList(data) {
	return request.get('/yxj/app/finance/list', data, {
		noLogin: true
	});
}

/**
 * 查询门店退款登记列表
 *
 */
export function returnRegistrationList(data) {
	return request.get('/yxj/app/returnRegistration/list', data, {
		noLogin: true
	});
}

/**
 * 串码追踪
 *
 */
export function selectDeviceNoTrace(data) {
	return request.get('/yxj/app/common/selectDeviceNoTrace', data, {
		noLogin: true
	});
}

/**
 * 获取仓库树
 *
 */
export function selectWarehouseTree(data) {
	return request.get('/yxj/app/common/selectWarehouseTree', data, {
		noLogin: true
	});
}

/**
 * 查询库存商品列表
 *
 */
export function selectWarehouseGoodsList(data) {
	return request.get('/yxj/app/common/selectWarehouseGoodsList', data, {
		noLogin: true
	});
}

/**
 * 查找库存统计
 *
 */
export function selectWarehouseGoodsCount(data) {
	return request.get('/yxj/app/common/selectWarehouseGoodsCount', data, {
		noLogin: true
	});
}

/**
 * 获取回收单详情信息
 *
 */
export function selectRecycleFormDetail(data) {
	return request.get('/yxj/app/recycleForm/selectRecycleFormDetail/' + data, {
		noLogin: true
	});
}

/**
 * 获取门店默认仓库
 *
 */
export function selectDefaultWarehouse(data) {
	return request.get('/yxj/app/warehouse/selectDefaultWarehouse', data, {
		noLogin: true
	});
}

/**
 * 查询配件盘库明细列表
 *
 */
export function selectFittingsList(data) {
	return request.get('/yxj/app/storeCheckTask/selectFittingsList', data, {
		noLogin: true
	});
}

/**
 * 查询分拣物流信息
 *
 */
export function selectLogisticsInfo(data) {
	return request.get('/yxj/app/sorting/selectLogisticsInfo', data, {
		noLogin: true
	});
}

/**
 * 支付宝支付
 *
 */
export function testAliPay(data) {
	return request.get('/yxj/app/common/testAliPay', data, {
		noLogin: true
	});
}

/**
 * 支付宝支付
 *
 */
export function secondGoods(data) {
	return request.get('/yxj/app/secondGoods/' + data, {
		noLogin: true
	});
}

/**
 * 支付宝支付
 *
 */
export function printSellForm(data) {
	return request.get('/yxj/app/fittingsForm/printSellForm', data, {
		noLogin: true
	});
}

/**
 * 打印配件标签
 *
 */
export function printLabel(data) {
	return request.get('/yxj/app/fittingsOrder/printLabel', data, {
		noLogin: true
	});
}

/**
 * 打印机器标签
 *
 */
export function phoneprintLabel(data) {
	return request.get('/yxj/app/recycleForm/printLabel', data, {
		noLogin: true
	});
}