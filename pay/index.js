import store from './../store/index.js'
import {
	paymentReturn
} from '@/api/malls.js';
const pay = {
	pay(e, provider, orderPaymentId) {
		// let orderInfos = e
		// if (provider == 'weixin') {
		// 	orderInfos = {

		// 	}
		// }
		uni.requestPayment({
			provider: provider,
			orderInfo: e,
			success: function(ress) {
				paymentReturn({
					orderPaymentId: orderPaymentId,
					tradeno: ress.tradeno
				}).then(resss => {
					if (resss.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '支付成功',
						});
					}
				})
				console.log('success:' + JSON.stringify(res));
			},
			fail: function(err) {
				if (err.code == -100) {
					uni.showToast({
						icon: 'none',
						title: '支付失败',
					});
				}
				console.log('fail:' + JSON.stringify(err));
			}
		})

	}

}

export default pay;