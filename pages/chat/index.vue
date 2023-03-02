<!-- 本客服系统客户端，依赖FastAdmin插件：`workerman在线客服系统`无法单独使用，插件介绍/官网地址：https://www.fastadmin.net/store/kefu.html -->
<template>
	<view class="main">
		<view>
			<navigator url="/pages/common/login/login">登录为Mpbsaas会员</navigator>
			<navigator url="/pages/chat/chat">打开客服会话窗口-默认为游客</navigator>
			<button @click="clearStorage" class="clear-storage" type="default">清理缓存</button>
		</view>

		<!-- 可选参数，FastAdmin会员的 `token` 和 固定客服ID `fixed_csr` -->
		
		<!-- 不传递 `token` 则自动建立游客身份，传递FastAdmin会员token可自动识别为会员，token的生成传递请参考登录页面 -->
		<!-- 后台转移过客服代表的客户，不支持指定 `fixed_csr`-->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			clearStorage: function () {
				uni.showModal({
					title: '温馨提示',
					content: '游客身份将会丢失，已登录的用户需要重新登录，您确认清理缓存吗？',
					success: res => {
						if (res.confirm) {
							uni.clearStorageSync()
							uni.showToast({
								title: '缓存已清理~',
								icon: 'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
.main{
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
.main navigator {
	border: 1px solid #F2F2F2;
	padding: 20rpx;
	border-radius: 12rpx;
	width: 100%;
	margin-top: 40rpx;
	width: 500rpx;
}
.clear-storage {
	width: 541rpx;
	height: 80rpx;
	font-size: 30rpx;
	line-height: 80rpx;
	margin: 0;
	margin-top: 100rpx;
	padding: 0;
}
</style>
