<template>
	<view class="Setpasskey_box">
		<!-- 输入 -->
		<view class="input" :style="styles">
			<view v-if="show || password">
				<view v-if="!isYan" style="font-size: 24rpx;"><text v-for="(item,idx) in password" :key="idx">●</text>
				</view>
				<view v-else>{{password}}</view>
			</view>
			<text class="on" v-else>{{placeholder}}</text>
			<view class="cursor" v-if="show">
				<image src="/static/Setpasskey/cursor.gif"></image>
			</view>
		</view>



		<!-- 自定义数字键盘 -->
		<view v-if="show" :class="['keyboard', show ? '' : 'active', isIphoneX ? 'isIphone' : '']">
			<view class="top_wxc" @tap.stop="finish()"> <text>完成</text></view>
			<block v-for="(item, index) in NumberArrs" :key="index">
				<view v-if="index != 0" class="keyboard-item" @tap.stop="Setkey(item)">{{item}}</view>
			</block>
			<view class="keyboard-item delte" @tap.stop="clear()">清空</view>
			<view class="keyboard-item" @tap.stop="Setkey(NumberArrs[0])"><text>{{NumberArrs[0]}}</text></view>
			<view class="keyboard-item delte" @tap.stop="del()">
				<image class="img" src="/static/Setpasskey/del.png" mode="aspectFill" :lazy-load="true"></image>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 show			{Boolean}	是否显示自定义键盘
	 isYan			{Boolean}	是否显示密码明文
	 IsUpset		{Boolean}	是否打乱输入键盘的数字
	 placeholder	{String}	提示文字
	 styles			{String}	提示文字的样式
	 maxLen			{Number}	输入的长度	 
	 
	 */
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			isIphoneX: {
				type: Boolean,
				default: false
			},
			isYan: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			styles: {
				type: String,
				default: ''
			},
			maxLen: {
				type: Number,
				default: 6
			},
			IsUpset:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				password: ''
			};
		},
		watch: {
			password(val) {
				let {
					password,
					maxLen
				} = this
				let len = val.length
				this.$emit('change', password);
				this.$emit('input', password);
				if (len >= maxLen) {
					this.finish()
				}

			}
		},
		computed: {
			NumberArrs() {
				let NumberArr = [ 0,1, 2, 3, 4, 5, 6, 7, 8, 9]
				if(this.IsUpset) return NumberArr.sort((a, b) => Math.random() > 0.5 ? -1 : 1);
				else return NumberArr;
			}
		},
		methods: {
			Setkey(key) { //设置
				let len = this.password.length
				if (len < this.maxLen) {
					this.password += key;
				} else {
					this.finish()
				}

			},
			clear() { //清空
				this.password = '';
			},
			finish() { //完成
				this.$emit('finish', false);
			},
			del() { //删除
				let {
					password
				} = this
				if (password.length > 0) {
					this.password = password.substring(0, password.length - 1);
				}
			}
		}
	}
</script>

<style lang="scss">
	.Setpasskey_box {
		input {
			display: none;
		}
		.input {
			display: flex;
			width: 100%;
			font-size: 28rpx;
			.on {
				color: #777777;
			}
			.cursor {
				margin-top: 6rpx;
				image {
					width: 4rpx;
					height: 30rpx;
				}
			}

		}
		.top_wxc {
			width: 100%;
			padding: 20rpx;
			color: #37416B;
		}
		image {
			width: 100%;
			height: 100%;
		}
		.keyboard {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #EBEBEB;
			display: flex;
			justify-content: center;
			z-index: 999;
			flex-wrap: wrap;
			transition: all 0.2s ease-in 0.2s;
		}
		.active {
			bottom: -400rpx;
		}
		.keyboard-item {
			box-sizing: border-box;
			width: 250rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: #fff;
			font-size: 40rpx;
			color: #333;
			height: 99rpx;
			border: 1rpx solid #EBEBEB;
			border-top: none;
			border-left: none;
		}
		.delte {
			background: none;
			box-shadow: none;
		}
		.delte image {
			width: 60rpx;
			height: 60rpx;
		}
		.isIphone {
			padding-bottom: 68rpx !important;
		}
	}
</style>
