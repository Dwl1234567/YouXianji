<template>
	<view class="cu-bar tabbar bg-white footer-fixed">
		<view class="cu-bar tabbar bg-white footer-fixed" style="height: 224rpx;">
			<view class="action" :class="TabID == 0?'text-red':'text-black'" @tap="tabTap(0)">
				<view :class="TabID == 0?'icon-gongzuowodeweidianji':'icon-gongzuowodedianji'" class="iconfont"></view>
				<text>首页</text>
			</view>
			<view class="action add-action" @tap="tabTap(2)" v-if="roles.store_admin || roles.store_employee">
				<button class="cu-btn cuIcon-add bg-red shadow"></button>
				<text>开单</text>
			</view>
			<view class="action" :class="TabID == 4?'text-red':'text-black'" @tap="tabTap(4)">
				<view :class="TabID == 4?'icon-gongzuoshouyeweidianji':'icon-gongzuoshouyedianji'" class="iconfont"></view>
				<text>设置</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: 'footer-erptabbar',
		data() {
			return {
				TabID: 0,
				MsgDot: false,
				roles: {}
			};
		},
		props: {
			tabID: {
				type: [String, Number],
				default: 0
			},
			msgDot: {
				type: Boolean,
				default: false
			},
		},
		created() {
			this.roles = Vue.prototype.$store.state.roles;
			console.log(this.roles)
			this.TabID = this.tabID;
			this.MsgDot = this.msgDot;
		},
		watch: {
			tabID() {
				if (this.tabID != 2) {
					this.TabID = this.tabID;
				}
			},
			msgDot() {
				this.MsgDot = this.msgDot;
			}
		},
		methods: {
			tabTap(index) {
				console.log(index);
				let path = ''
				switch (index) {
					case 0:
						path = `/pages/tabbarerp/home`
						break;
					case 1:
						path = ``
						break;
					case 2:
						path = `/pages/tabbarerp/push`
						break;
					case 3:
						path = ``
						break;
					case 4:
						path = `/pages/tabbarerp/my`
						break;
				}
				uni.redirectTo({
					url: path
				});
			}
		}
	}
</script>

<style>

</style>