// 分销 模块  ---------------------------S
import request from '@/utils/request.js';

/**
 * 二手商品列表
 *
 */
export function secondGoodsList(data) {
	return request.get('/yxj/app/secondGoods/getRandomGoods', data, {
		noLogin: true
	});
}

/**
 * 二手商品详情
 *
 */
export function secondGoods(data) {
	return request.get('/yxj/app/secondGoods/' + data, {
		noLogin: true
	});
}

/**
 * 二手商品加入购物车
 *
 */
export function shoppingCart(data) {
	return request.post('/yxj/app/shoppingCart', data, {
		noLogin: true
	});
}

/**
 * 二手商品购物车列表
 *
 */
export function shoppingCartList(data) {
	return request.get('/yxj/app/shoppingCart/list', data, {
		noLogin: true
	});
}
/**
 * 查看默认地址
 *
 */
export function getDefaultAddress(data) {
	return request.get('/yxj/app/user/getDefaultAddress', data, {
		noLogin: true
	});
}

/**
 * 查看热销分销等列表
 *
 */
export function secondGoodsLists(data) {
	return request.get('/yxj/app/secondGoods/list', data, {
		noLogin: true
	});
}

/**
 * 创建购物订单
 *
 */
export function shoppingOrder(data) {
	return request.post('/yxj/app/shoppingOrder', data, {
		noLogin: true
	});
}

/**
 * 查询订单列表接口
 *
 */
export function shoppingOrderList(data) {
	return request.get('/yxj/app/shoppingOrder/list', data, {
		noLogin: true
	});
}

/**
 * 发起支付接口
 *
 */
export function initiatePayment(data) {
	return request.post('/yxj/app/shoppingOrder/initiatePayment', data, {
		noLogin: true
	});
}

/**
 * 新增二手商品足迹接口
 *
 */
export function secondGoodsFootprint(data) {
	return request.post('/yxj/app/secondGoodsFootprint', data, {
		noLogin: true
	});
}

/**
 * 查询二手商品足迹列表
 *
 */
export function secondGoodsFootprintList(data) {
	return request.get('/yxj/app/secondGoodsFootprint/list', data, {
		noLogin: true
	});
}

/**
 * 取消订单接口
 *
 */
export function cancelOrder(data) {
	return request.get('/yxj/app/shoppingOrder/cancelOrder', data, {
		noLogin: true
	});
}

/**
 * 取消订单接口
 *
 */
export function continuePayment(data) {
	return request.post('/yxj/app/shoppingOrder/continuePayment', data, {
		noLogin: true
	});
}

/**
 * 用户确认收货接口
 *
 */
export function clientConfirm(data) {
	return request.get('/yxj/app/shoppingOrder/clientConfirm', data, {
		noLogin: true
	});
}

/**
 * 新增二手订单评价
 *
 */
export function shoppingOrderEvaluate(data) {
	return request.post('/yxj/app/shoppingOrderEvaluate', data, {
		noLogin: true
	});
}

/**
 * 申请售后
 *
 */
export function secondGoodsReturn(data) {
	return request.post('/yxj/app/secondGoodsReturn', data, {
		noLogin: true
	});
}

/**
 * 买家退货接口
 *
 */
export function clientReturn(data) {
	return request.post('/yxj/app/shoppingOrder/clientReturn', data, {
		noLogin: true
	});
}

/**
 * 买家发货前退款接口
 *
 */
export function clientRefund(data) {
	return request.get('/yxj/app/shoppingOrder/clientRefund', data, {
		noLogin: true
	});
}

/**
 * 查看最新的售后记录
 *
 */
export function selectNewest(data) {
	return request.get('/yxj/app/secondGoodsReturn/selectNewest', data, {
		noLogin: true
	});
}

/**
 * 新增二手商品收藏
 *
 */
export function secondGoodsFavorite(data) {
	return request.post('/yxj/app/secondGoodsFavorite', data, {
		noLogin: true
	});
}

/**
 * 查询二手商品收藏列
 *
 */
export function secondGoodsFavoriteList(data) {
	return request.get('/yxj/app/secondGoodsFavorite/list', data, {
		noLogin: true
	});
}

/**
 * 绑定分销关系接口
 *
 */
export function bindDistributionRelation(data) {
	return request.post('/yxj/app/distributionIncome/bindDistributionRelation', data, {
		noLogin: true
	});
}

/**
 * 绑定分销产品浏览关系
 *
 */
export function bindDistributionBrowse(data) {
	return request.get('/yxj/app/distributionIncome/bindDistributionBrowse', data, {
		noLogin: true
	});
}

/**
 * 根据机型查询最近5条好评
 *
 */
export function selectByModelId(data) {
	return request.get('/yxj/app/shoppingOrderEvaluate/selectByModelId', data, {
		noLogin: true
	});
}

/**
 * 获取所有品牌
 *
 */
export function getAllBrand(data) {
	return request.get('/yxj/app/common/getAllBrand', data, {
		noLogin: true
	});
}

/**
 * 获取系列列表
 *
 */
export function getSeriesList(data) {
	return request.get('/yxj/app/common/getSeriesList', data, {
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
 * 获取系列机型树
 *
 */
export function selectModelTree(data) {
	return request.get('/yxj/app/common/selectModelTree', data, {
		noLogin: true
	});
}

/**
 * 获取随机商品列表
 *
 */
export function selectStoreGoods(data) {
	return request.get('/yxj/app/secondGoods/selectStoreGoods', data, {
		noLogin: true
	});
}

/**
 * 根据条件查询商品列表
 *
 */
export function getQueryGoodsList(data) {
	return request.get('/yxj/app/secondGoods/getQueryGoodsList', data, {
		noLogin: true
	});
}

/**
 * 支付宝支付
 *
 */
export function testAliPay(data) {
	return request.get('/yxj/app/shoppingOrder/createZfbPayment', data, {
		noLogin: true
	});
}

/**
 * 支付宝支付成功回掉
 *
 */
export function paymentReturn(data) {
	return request.post('/yxj/app/shoppingOrder/paymentReturn', data, {
		noLogin: true
	});
}

/**
 * 发起支付宝支付接口
 *
 */
export function zfbContinuePayment(data) {
	return request.get('/yxj/app/shoppingOrder/zfbContinuePayment', data, {
		noLogin: true
	});
}

/**
 * 立即付款接口
 *
 */
export function immediatelyPayment(data) {
	return request.get('/yxj/app/shoppingOrder/immediatelyPayment', data, {
		noLogin: true
	});
}

/**
 * 用户确认退回收货接口
 *
 */
export function confirmReturnReceive(data) {
	return request.get('/yxj/app/recycle/confirmReturnReceive/' + data, {
		noLogin: true
	});
}