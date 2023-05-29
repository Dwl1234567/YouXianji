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
				'address', 'business'
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
			RECYCLE_PROCESSED: 0
		},
		address: {
			longitude: null,
			latitude: null,
			country: null,
			province: null,
			city: null
		}
	},
	mutations: {
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
			if (provider.businessType === 'RECYCLE_PENDING') {
				state.business.RECYCLE_PENDING = provider.number;
			} else if (provider.businessType === 'RECYCLE_PROCESSED') {
				state.business.RECYCLE_PROCESSED = provider.number;
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