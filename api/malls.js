// 分销 模块  ---------------------------S
import request from '@/utils/request.js';

/**
 * 二手商品列表
 *
 */
export function secondGoodsList(data) {
	return request.get('/yxj/app/secondGoods/getRandomGoods', data, { noLogin: true });
}

/**
 * 二手商品详情
 *
 */
export function secondGoods(data) {
	return request.get('/yxj/app/secondGoods/' + data, { noLogin: true });
}

/**
 * 二手商品加入购物车
 *
 */
export function shoppingCart(data) {
	return request.post('/yxj/app/shoppingCart', data, { noLogin: true });
}

/**
 * 二手商品购物车列表
 *
 */
export function shoppingCartList(data) {
	return request.get('/yxj/app/shoppingCart/list', data, { noLogin: true });
}
/**
 * 查看默认地址
 *
 */
export function getDefaultAddress(data) {
	return request.get('/yxj/app/user/getDefaultAddress', data, { noLogin: true });
}

/**
 * 查看热销分销等列表
 *
 */
export function secondGoodsLists(data) {
	return request.get('/yxj/app/secondGoods/list', data, { noLogin: true });
}
