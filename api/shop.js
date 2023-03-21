//mycenter相关接口
import request from "@/utils/request.js";


/**
 * 广告
 * 
 */
export function AdsIndex(data) {
	return request.get('/shop/ads/index',data,{'noLogin':true});
}

/**
 *  全部分类数据
 * 
export function CategoryAll(data) {
	return request.get('/shop/category/all',data,{'noLogin':true});
}
*/
export function CategoryAlls(data) {
	return request.get('/shop/category/index',data,{'noLogin':true});
}
/**
 *  首页广告下面的分类
 * 调整为首页广告下面的品牌分类

export function CategoryMenu(data) {
	return request.get('/shop/category/menu',data,{'noLogin':true});
}
 */
export function CategoryMenu(data) {
	return request.get('/shop/category/nav',data,{'noLogin':true});
}
/**
 *  首页品牌
 * 
 */
export function BrandList(data) {
	return request.get('/shop/category/brandlist',data,{'noLogin':true});
}

/**
 *  首页秒杀信息
 * 
 */
export function FlashIndex(data) {
	return request.post('/shop/flash/index',data,{'noLogin':true});
}
/**
 *  获取秒杀时间段
 * 
 */
export function FlashNavbar(data) {
	return request.post('/shop/flash/navbar',data,{'noLogin':true});
}
/**
 * 获取秒杀的产品列表
 * 
 */
export function FlashProduct(data) {
	return request.post('/shop/flash/product',data,{'noLogin':true});
}
/**
 *  获取秒杀产品
 * 
 */
export function FlashProductDetail(data) {
	return request.get('/shop/flash/productDetail',data,{'noLogin':true});
}
/**
 * 创建订单
 * 
 */
export function FlashCreateOrder(data) {
	return request.post('/shop/flash/createOrder',data,{'noLogin':true});
}
/**
 *  提交订单
 * 
 */
export function FlashSubmitOrder(data) {
	return request.post('/shop/flash/submitOrder',data,{'noLogin':true});
}
/**
 *  发送验证码
 * 
 */
export function SmsSend(data) {
	return request.post('/shop/sms/send',data,{'noLogin':true});
}
/**
 * 购物车-列表
 * 
 */
export function CartIndex(data) {
	return request.get('/shop/cart/index',data,{'noLogin':true});
}
/**
 * 购物车-添加
 * 
 */
export function CartAdd(data) {
	return request.get('/shop/cart/add',data,{'noLogin':true});
}
/**
 * 购物车-删除
 * 
 */
export function CartDelete(data) {
	return request.post('/shop/cart/delete',data,{'noLogin':true});
}
/**
 * 购物车- 修改购物车数量
 * 
 */
export function CartNumberChange(data) {
	return request.get('/shop/cart/number_change',data,{'noLogin':true});
}
/**
 * 修改购物车选中状态
 * 
 */
export function CartChooseChange(data) {
	return request.post('/shop/cart/choose_change',data,{'noLogin':true});
}
/**
 * 商品- 产品详情
 * 
 */
export function ProductDetail(data) {
	return request.get('/shop/product/detail',data,{'noLogin':true});
}
/**
 *  商品-产品列表 
 * 
 */
export function ProductLists(data) {
	return request.get('/shop/product/lists',data,{'noLogin':true});
}
/**
 * 商品-收藏/取消
 * 
 */
export function ProductFavorite(data) {
	return request.get('/shop/product/favorite',data,{'noLogin':true});
}
/**
 *  商品-收藏列表 
 * 
 */
export function ProductFavoriteList(data) {
	return request.get('/shop/product/favoriteList',data,{'noLogin':true});
}
/**
 *  商品-商品评论
 * 
 */
export function ProductEvaluate(data) {
	return request.get('/shop/product/evaluate',data,{'noLogin':true});
}
/**
 * 订单-创建订单
 * 
 */
export function OrderCreate(data) {
	return request.post('/shop/order/create',data,{'noLogin':true});
}
/**
 *  提交订单
 * 
 */
export function OrderSubmit(data) {
	return request.post('/shop/order/submit',data,{'noLogin':true});
}
/**
 *  获取运费模板
 * 
 */
export function OrderGetDelivery(data) {
	return request.post('/shop/order/getDelivery',data,{'noLogin':true});
}
/**
 *  获取订单列表
 * 
 */
export function OrderGetOrders(data) {
	return request.post('/shop/order/getOrders',data,{'noLogin':true});
}
/**
 *  取消订单
 * 
 */
export function OrderCancel(data) {
	return request.get('/shop/order/cancel',data,{'noLogin':true});
}
/**
 * 删除订单
 * 
 */
export function OrderDelete(data) {
	return request.get('/shop/order/delete',data,{'noLogin':true});
}
/**
 * 确认收货
 * 
 */
export function OrderReceived(data) {
	return request.get('/shop/order/received',data,{'noLogin':true});
}
/**
 * 发表评论/评价 
 * 
 */
export function OrderComment(data) {
	return request.post('/shop/order/comment',data,{'noLogin':true});
}
/**
 * 获取订单数量 
 * 
 */
export function OrderCount(data) {
	return request.post('/shop/order/count',data,{'noLogin':true});
}
/**
 *  订单详情细节
 * 
 */
export function OrderDetail(data) {
	return request.get('/shop/order/detail',data,{'noLogin':true});
}
/**
 *  申请售后信息
 * 
 */
export function OrderRefundInfo(data) {
	return request.post('/shop/order/refundInfo',data,{'noLogin':true});
}
/**
 *  提交申请售后
 * 
 */
export function OrderRefund(data) {
	return request.post('/shop/order/refund',data,{'noLogin':true});
}
/**
 * 售后发货
 * 
 */
export function OrderRefundDelivery(data) {
	return request.post('/shop/order/refundDelivery',data,{'noLogin':true});
}
/**
 *  全部收货地址
 * 
 */
export function AddressAll(data) {
	return request.post('/shop/address/all',data,{'noLogin':true});
}
/**
 *  添加收货地址
 * 
 */
export function AddressAdd(data) {
	return request.post('/shop/address/add',data,{'noLogin':true});
}
/**
 * 修改收货地址 
 * 
 */
export function AddressEdit(data) {
	return request.post('/shop/address/edit',data,{'noLogin':true});
}
/**
 *  删除收货地址
 * 
 */
export function AddressDelete(data) {
	return request.get('/shop/address/delete',data,{'noLogin':true});
}
/**
 *  获取地区信息
 * 
 */
export function AddressArea(data) {
	return request.get('/shop/address/area',data,{'noLogin':true});
}
/**
 *  获取单个收货地址
 * 
 */
export function AddressInfo(data) {
	return request.get('/shop/address/info',data,{'noLogin':true});
}
/**
 * 用户-会员登录
 * 
 */
export function UserLogin(data) {
	return request.post('/shop/user/login',data,{'noLogin':true});
}
/**
 *  重置密码 
 * 
 */
export function UserResetpwd(data) {
	return request.post('/shop/user/resetpwd',data,{'noLogin':true});
}
/**
 * 注册会员
 * 
 */
export function UserRegister(data) {
	return request.post('/shop/user/register',data,{'noLogin':true});
}
/**
 * 更改用户信息 
 * 
 */
export function UserEdit(data) {
	return request.post('/shop/user/edit',data,{'noLogin':true});
}
/**
 * 微信小程序登录
 * 
 */
export function UserAuthSession(data) {
	return request.get('/shop/user/authSession',data,{'noLogin':true});
}
/**
 *  微信小程序消息解密
 * 
 */
export function UserDecryptData(data) {
	return request.post('/shop/user/decryptData',data,{'noLogin':true});
}
/**
 *  微信小程序通过授权手机号登录
 * 
 */
export function UserLoginForWechatMini(data) {
	return request.post('/shop/user/loginForWechatMini',data,{'noLogin':true});
}
/**
 * 支付-获取支付类型
 * 
 */
export function PayGetPayType(data) {
	return request.post('/shop/pay/getPayType',data,{'noLogin':true});
}
/**
 * 微信统一下单接口
 * 
 */
export function PayUnify(data) {
	return request.get('/shop/pay/unify',data,{'noLogin':true});
}

/**
 * 支付成功后返佣接口
 * 
 */
export function moneyScale(data) {
	return request.get('/shop/Product/moneyScale',data,{'noLogin':true});
}
/**
 * 货到付款
 * 
 */
export function PayOffline(data) {
	return request.get('/shop/pay/offline',data,{'noLogin':true});
}
/**
 * 获取JSAPI配置
 * 
 */
export function PayJssdkBuildConfig(data) {
	return request.get('/shop/pay/jssdkBuildConfig',data,{'noLogin':true});
}
/**
 * 支付宝支付
 * 
 */
export function PayAlipay(data) {
	return request.get('/shop/pay/alipay',data,{'noLogin':true});
}
// ---------------------------新
/**
 * 商品筛选条件
 * 商品下拉筛选列表数据
 */
export function ProductFuscreen(data) {
	return request.get('/shop/product/fuscreen',data,{'noLogin':true});
}

/**
 * 商品下拉筛选列表，获取下级分类数据
 * @param {Object} data
 */
export function ProductFilterchilren(data) {
	return request.get('/shop/product/filterchilren',data,{'noLogin':true});
}
/**
 * 商品筛选条件
 * 
 */
export function ProductFulists(data) {
	return request.get('/shop/product/fulists',data,{'noLogin':true});
}

/**
 * 商城商品搜索
 * 
 */
export function ProductSearch(data) {
	return request.post('/shop/product/search',data,{'noLogin':true});
}

/**
 * 我的评论
 * 
 */
export function userevaluate(data) {
	return request.get('/shop/user/evaluate',data,{'noLogin':true});
}

/**
 * 我的评论-删除
 * 
 */
export function userdelevaluate(data) {
	return request.get('/shop/user/delevaluate',data,{'noLogin':true});
}

/**
 * 优惠券列表-
 * 
 */
export function usercouponlist(data) {
	return request.post('/shop/coupon/list',data,{'noLogin':true});
}


/**
 * 优惠券领取-
 * 
 */
export function usercouponadd(data) {
	return request.post('/shop/coupon/add',data,{'noLogin':true});
}

/**
 * 我的优惠券列表-
 * 
 */
export function usercouponmylist(data) {
	return request.post('/shop/coupon/mylist',data,{'noLogin':true});
}
