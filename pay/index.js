import store from './../store/index.js'
import {
	paymentReturn
} from '@/api/malls.js';
const pay = {
	pay(e, provider, orderPaymentId) {
		// #ifdef APP-PLUS
		uni.requestPayment({
			provider: provider,
			orderInfo: e,
			success: function(ress) {
				console.log('success:' + JSON.stringify(res));
				return true
			},
			fail: function(err) {
				if (err.code == -100) {
					uni.showToast({
						icon: 'none',
						title: '支付失败',
					});
				}
				console.log('fail:' + JSON.stringify(err));
				return false
			}
		})
		// #endif
	}

}

export default pay;