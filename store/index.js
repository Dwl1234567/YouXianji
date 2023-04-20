import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
	plugins: [
		// 可以有多个持久化实例  
		createPersistedState({
			key: 'app_config_data', // 状态保存到本地的 key   
			paths: ['hasLogin', 'userInfo', 'cookie', 'token', 'roles'], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c   
			storage: { // 存储方式定义  
				getItem: (key) => uni.getStorageSync(key), // 获取  
				setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
				removeItem: (key) => uni.removeStorageSync(key) // 删除  
			}
		})
	],
	state: {
		hasLogin: false,
		userInfo: {
			token: ''
		},
		lang: 'zh-cn',
		cookie: '',
		token: '',
		roles:{
			consumer: false,
			store_admin: false,
			store_employee: false,
			company_admin: false,
			platform_admin: false
		}
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户信息
				key: 'userInfo',
				data: provider
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			});
		},
		setUserInfo(state, provider) {
			state.userInfo = provider;
			uni.setStorage({ //缓存用户信息
				key: 'userInfo',
				data: provider
			});
		},
		setCookie(state, provider) {
			state.cookie = provider;
			uni.setStorage({
				key: 'cookieKey',
				data: provider
			});
		},
		setToken(state, provider) {
			state.token = provider;
			uni.setStorage({
				key: 'token',
				data: provider
			});
		},
		setRoles(state, provider) {
			if (provider === 'consumer'){
				state.roles.consumer = true;
			} else if (provider === 'store_admin'){
				state.roles.store_admin = true;
			} else if (provider === 'store_employee'){
				state.roles.store_employee = true;
			}
			
		}
	},
	actions: {

	}
})

export default store
