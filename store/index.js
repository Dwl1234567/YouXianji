import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
	plugins: [
		// 可以有多个持久化实例
		createPersistedState({
			key: 'app_config_data', // 状态保存到本地的 key
			paths: ['hasLogin', 'userInfo', 'cookie', 'token', 'roles',
				'address', 'business', 'ws'
			], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c
			storage: {
				// 存储方式定义
				getItem: (key) => uni.getStorageSync(key), // 获取
				setItem: (key, value) => uni.setStorageSync(key, value), // 存储
				removeItem: (key) => uni.removeStorageSync(key), // 删除
			},
		}),
	],
	state: {
		hasLogin: false,
		userInfo: {
			token: '',
		},
		lang: 'zh-cn',
		cookie: '',
		token: '',
		roles: {
			consumer: false,
			store_admin: false,
			store_employee: false,
			company_admin: false,
			platform_admin: false,
			sorting_leader: false,
			sorting_people: false,
		},
		business: {
			RECYCLE_PENDING: 0,
			RECYCLE_PROCESSED: 0,
			RECYCLE_RETURNING: 0,
			RECYCLE_RETURNED: 0,
			SHOP_PAYING: 0,
			SHOP_SHIPMENTS: 0,
			SHOP_RECEIVING: 0,
			SHOP_AFTERMARKET: 0,
			TODO_ADJUST_PRICE: 0,
			TODO_ALLOT: 0,
			TODO_APPROVE_PUTAWAY: 0,
			TODO_SORTING: 0,
			TODO_APPROVE_OFFER: 0,
			TODO_UPDATE_OFFER: 0,
			TODO_REORGANIZE: 0,
			TODO_ALL: 0,
			TODO_PRE_FORM: 0,
			TODO_PENDING_ORDER: 0,
		},
		address: {
			longitude: null,
			latitude: null,
			country: null,
			province: null,
			city: null
		},
		ws: {}
	},
	mutations: {
		setWs(state, provider) {
			state.ws = provider;
		},
		login(state, provider) {
			state.hasLogin = true;
		},
		logout(state) {
			state.hasLogin = false;
		},
		setUserInfo(state, provider) {
			state.userInfo = provider;
			uni.setStorage({
				//缓存用户信息
				key: 'userinfo',
				data: provider,
			});
		},
		setCookie(state, provider) {
			state.cookie = provider;
			uni.setStorage({
				key: 'cookieKey',
				data: provider,
			});
		},
		setToken(state, provider) {
			state.token = provider;
			uni.setStorage({
				key: 'token',
				data: provider,
			});
		},
		setAddress(state, provider) {
			state.address.longitude = provider.longitude;
			state.address.latitude = provider.latitude;
			state.address.country = provider.address.country;
			state.address.province = provider.address.province;
			state.address.city = provider.address.city;
		},
		setBusiness(state, provider) {
			if (provider.totalNumber) {
				state.business.TODO_ALL = provider.totalNumber
			}
			if (provider.businessType === 'TODO_PRE_FORM') {
				state.business.TODO_PRE_FORM = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '预开单消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_PENDING_ORDER') {
				state.business.TODO_PENDING_ORDER = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '挂单待处理消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'RECYCLE_PENDING') {
				state.business.RECYCLE_PENDING = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '回收待处理消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'RECYCLE_PROCESSED') {
				state.business.RECYCLE_PROCESSED = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '回收已处理消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'RECYCLE_RETURNING') {
				state.business.RECYCLE_RETURNING = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '回收待退回消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'RECYCLE_RETURNED') {
				state.business.RECYCLE_RETURNED = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '回收已退回消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'SHOP_PAYING') {
				state.business.SHOP_PAYING = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '商城待付款消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'SHOP_SHIPMENTS') {
				state.business.SHOP_SHIPMENTS = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '商城待发货消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'SHOP_RECEIVING') {
				state.business.SHOP_RECEIVING = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '商城待收货消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'SHOP_AFTERMARKET') {
				state.business.SHOP_AFTERMARKET = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '商城待售后消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_ADJUST_PRICE') {
				state.business.TODO_ADJUST_PRICE = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '待调价消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_ALLOT') {
				state.business.TODO_ALLOT = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '待调拨消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_APPROVE_PUTAWAY') {
				state.business.TODO_APPROVE_PUTAWAY = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '审上架消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_SORTING') {
				state.business.TODO_SORTING = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '待分拣消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_APPROVE_OFFER') {
				state.business.TODO_APPROVE_OFFER = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '审报价消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_UPDATE_OFFER') {
				state.business.TODO_UPDATE_OFFER = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '改报价消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}
			if (provider.businessType === 'TODO_REORGANIZE') {
				state.business.TODO_REORGANIZE = provider.number;
				uni.createPushMessage({
					title: '优闲集消息',
					content: '整备仓消息',
					sound: 'system',
					success: (res => {
						console.log('成功创建', res);
					}),
					fail: (res => {
						console.log('成功失败', res)
					}),
				})
			}

		},
		setRoles(state, provider) {
			if (provider === 'consumer') {
				state.roles.consumer = true;
			} else if (provider === 'store_admin') {
				state.roles.store_admin = true;
			} else if (provider === 'store_employee') {
				state.roles.store_employee = true;
			} else if (provider === 'sorting_leader') {
				state.roles.sorting_leader = true;
			} else if (provider === 'sorting_people') {
				state.roles.sorting_people = true;
			} else if (provider === 'clear') {
				state.roles = {
					consumer: false,
					store_admin: false,
					store_employee: false,
					company_admin: false,
					platform_admin: false,
					sorting_leader: false,
					sorting_people: false,
				};
			}
			uni.setStorage({
				key: 'roles',
				data: state.roles,
			});
		},
	},
	actions: {},
});

export default store;