<template>
	<view class="container">
		<!-- 页面主体 -->
		<view class="detail">
			<!-- <view class="detail-title">{{type == 1 ?'奖章说明':type == 2 ?'平台规则':''}}</view> -->
			<view class="detail-content">
				<!-- <u-parse :html="content"></u-parse> -->
				<rich-text :nodes="content"></rich-text>
			</view>
			
			<view class="flex" v-if="type == 4">
				<view class="">
					<text class="btn bg-deepblue padding-tb-xs padding-lr-lg radius-4">分销赚钱</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getGlobalInfo
	} from "@/api/common.js";
	export default {
		data() {
			return {
				Id: '',
				type: 0,
				titlevalue:'',
				content:'',
				configInfo:''
			}
		},
		onLoad(option) {
			// type 1 = 奖章 2 = 平台规则 
			let that = this;
			that.type = option.type;
			let titlevalue  = '奖章说明'
			if(this.type ==2){
				titlevalue  = '平台规则'
			}
			if(this.type ==3){
				titlevalue  = '余额说明'
			}
			if(this.type ==4){
				titlevalue  = '佣金说明'
			}
			uni.setNavigationBarTitle({
				title : titlevalue
				//title:this.type == 1 ?'奖章说明':this.type == 2 ?'平台规则':this.type == 3 ?'余额说明':''
			})
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数
			//console.log(option); //打印出上个页面传递的参数。
			this.getGlobalInfoFuc();
		},
		methods: {
			getGlobalInfoFuc(){
				let that = this;
				getGlobalInfo({}).then(res=>{
					that.configInfo = res.data;
					if(that.type == 1){
						that.content = res.data.medal_rules
					}else if(that.type == 2){
						that.content = res.data.platform_rules
					}else if(that.type == 3){
						that.content = res.data.money_rules
					}else if(that.type == 4){
						that.content = res.data.fee_rules
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}
.detail {
	background-color: #ffffff;
	padding-top: 30rpx;
	.detail-title {
		padding: 0 30rpx;
		font-size: $uni-font-size-title;
		font-weight: bold;
		color: $uni-color-title;
		line-height: 1.5;
	}

	.detail-extra {
		padding: 20rpx 30rpx;
		font-size: 24rpx;
		color: $uni-text-color-grey;
	}

	.detail-content {
		padding: 30rpx 30rpx;
		font-size: $uni-font-size-paragraph;
		color: $uni-color-paragraph;
		line-height: 2;
	}
}
</style>
