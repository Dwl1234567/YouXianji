<template>
	<view class="">
		<!--连接客服-->
		<!--
		<view class="kefu">
			<button class="cu-btn iconfont icon-bigcus text-sl text-red" @tap="callKefu"></button>
		</view>
		-->
		<!--底部菜单-->
		<view class="cu-bar tabbar bg-white footer-fixed">
			<view class="action" :class="TabID == 0?'text-red':'text-black'" @tap="tabTap(0)">
				<view class="iconfont" :class="TabID == 0?'icon-home':'icon-homegray'"></view>
				<text>首页</text>
			</view>
			<view class="action" :class="TabID == 1?'text-red':'text-black'" @tap="tabTap(1)">
				<view class="iconfont" :class="TabID == 1?'icon-storeorange':'icon-storegray'"></view>
				<text>门店</text>
			</view>
			<view class="action text-red" :class="TabID == 2?'text-red':'text-red'" @tap="tabTap(2)">
				<!--<view class="push">
					<image class="img" src="/static/images/push.png" mode="widthFix"></image>
				</view>-->
				<!--<button class="cu-btn cuIcon-add bg-red shadow"></button>-->
				<view class="iconfont icon-xian"></view>
				<text>卖闲置</text>
			</view>
			<view class="action" :class="TabID == 3?'text-red':'text-black'" @tap="tabTap(3)">
				<view class="iconfont" :class="TabID == 3?'icon-shoppingcartorange':'icon-shoppingcart'">
					<!--<view class="cu-tag badge" v-if="MsgDot"></view>-->
				</view>
				<text>购物车</text>
			</view>
			<view class="action" :class="TabID == 4?'text-red':'text-black'" @tap="tabTap(4)">
				<view class="iconfont" :class="TabID == 4?'icon-meorange':'icon-megray'"></view>
				<text>我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'footer-tabbar',
		data() {
			return {
				TabID: 0, MsgDot: false,
			};
		},
		props: {
			tabID: {
				type: [String,Number],
				default: 0
			},
			msgDot: {
				type: Boolean,
				default: false
			},
		},
		created() {
			this.TabID = this.tabID;
			this.MsgDot = this.msgDot;
		},
		watch: {
			tabID() {
				if(this.tabID != 2) {
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
				switch(index){
					case 0: 
					path = `/pages/tabbar/home`
					break;
					case 1: 
					path = `/pages/tabbar/stores`
					break;
					case 2: 
					path = `/pages/tabbar/sell`
					break;
					case 3: 
					path = `/pages/tabbar/cart`
					break;
					case 4: 
					path = `/pages/tabbar/my`
					break;
				}
				uni.switchTab({
					url: path
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.push{
		margin: 0 auto 10rpx;
		.img{
			width: 40rpx;
			height: 40rpx;
		}
	}
</style>
