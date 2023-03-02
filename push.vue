<template>
	<view class="push-box" :class="show?'show':''">
		
		<view class="zaiui-bar-view-box">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center text-black zaiui-small-routine-title">快速开单</view>
			<!-- #endif -->
			
			<!--标题栏-->
			<view class="text-gray zaiui-bar-box">
				<text class="text-black text-lg">快速开单</text>
				<text class="margin-left-sm">选择开单类型</text>
				<text class="cuIcon-close text-right close" @tap="closeTap"></text>
			</view>
		</view>
		
		<!--占位的-->
		<view class="zaiui-seat-height"></view>
		
		<!--中间内容区域-->
		<view class="zaiui-view-content">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in typeListData" :key="index" @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<view class="padding" v-if="TabCur == 0">
				<form>
					<view class="cu-form-group">
						<view class="title">客户</view>
						<picker @change="CustomerChange" :value="index" :range="customer">
							<view class="picker">
								{{index>-1?store[index]:'请选择客户'}}
							</view>
						</picker>
					</view>
					<!-- 商户 门店 不可手动选择
					<view class="cu-form-group">
						<view class="title">开单门店</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'请选择门店'}}
							</view>
						</picker>
					</view>
					-->
					
					<view class="cu-form-group">
						<view class="title">货品</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'请选择货品'}}
							</view>
						</picker>
					</view>
					<!--现金 微信 支付宝 银行转账之类-->
					<view class="cu-form-group">
						<view class="title">收款方式(可多选)</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'请选择收款方式'}}
							</view>
						</picker>
					</view>
					<!--制单人不可手选-->
					<!--
					<view class="cu-form-group">
						<view class="title">销售员</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'请选择货品'}}
							</view>
						</picker>
					</view>
					-->
					<view class="cu-form-group">
						<view class="title">收款凭证</view>
						<input placeholder="拍多图" name="input"></input>
					</view>
					<view class="cu-form-group" style="height:10000px">
						<view class="title">备注</view>
						<input placeholder="统一标题的宽度" name="input"></input>
					</view>
				</form>
			</view>
			<view class="padding" v-if="TabCur == 1">
				<form>
					<view class="cu-form-group margin-top">
						<view class="title">开单类型</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'请选择开单类型'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">客户/供货商</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'请选择客户/供货商'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">货品</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'点点收货'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">收款账户图</view>
						<input placeholder="三字标题" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">收款账户信息</view>
						<input placeholder="三字标题" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">备注</view>
						<input placeholder="统一标题的宽度" name="input"></input>
					</view>
				</form>
			</view>
			<view class="padding" v-if="TabCur == 2">
				<form>
					<view class="cu-form-group">
						<view class="title">仓库</view>
						<picker @change="PickerChange" :value="index" :range="store">
							<view class="picker">
								{{index>-1?store[index]:'请选择盘点的仓库'}}
							</view>
						</picker>
					</view>
					<view class="cu-card article no-card">
						<view class="cu-item shadow">
							<view class="content">
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
								 mode="aspectFill"></image>
								<view class="desc">
									<view class="text-content"> 
										<view class="" style="font-weight: bold;">标题产品12345</view>
										<view class="">系列：iPhone 13</view>
										<view class="">机型：iPhone 13 Pro</view>
									</view>
									<view>
										<view class="cu-tag bg-red light sm round">手机</view>
										<view class="cu-tag bg-green light sm round">苹果</view>
										<view class="cu-tag bg-blue light sm round">销售中</view>
									</view>
								</view>
							</view>
						</view>
						<view class="cu-item shadow">
							<view class="content">
								<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
								 mode="aspectFill"></image>
								<view class="desc">
									<view class="text-content"> 
										<view class="" style="font-weight: bold;">标题产品12345</view>
										<view class="">系列：iPhone 13</view>
										<view class="">机型：iPhone 13 Pro</view>
									</view>
									<view>
										<view class="cu-tag bg-red light sm round">手机</view>
										<view class="cu-tag bg-green light sm round">苹果</view>
										<view class="cu-tag bg-blue light sm round">销售中</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	//import typeList from '@/components/common/list/type-list';
	
	//import _sell_data from '@/static/data/sell.js';	//虚拟数据
	import _tool from '@/utils/tools.js';	//工具函数
	
	export default {
		name: 'push',
		components: { 
			//typeList
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				typeListData: [],
				index: -1,
				store: ['强子店', '快修店', '美华店'],
				customer: [],
			}
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			scrollY: {
				type: Number,
				default: 0
			},
			scrollBottom: {
				type: Number,
				default: 0
			}
		},
		watch: {
			scrollY() {
				//通知他妈的滚动了。
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if(this.scrollBottom != 0) {
					//通知他妈的触底了
					this.setReachBottom();
				}
			},
		}, 
		created() {
			//加载虚拟数据
			//this.typeListData();
			let typeListData = [{}];
			typeListData = [{
				id: 0,
				name: '销售'
			},{
				id: 1,
				name: '回收'
			},{
				id: 2,
				name: '盘点'
			}];
			this.typeListData = typeListData;
			//this.TabCur = typeListData[0];
			this.typeListData = typeListData;
			//console.log(typeListData);
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			//页面被滚动
			setPageScroll(scrollTop) {
				console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			closeTap() {
				this.$emit('closeTap');
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log(this.TabCur);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			typeListTap(e) {
				console.log(e);
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			CustomerChange(e){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.push-box {
		background: #FAFAFA;
		position: relative;
		min-height: 50vh;
		z-index: 998;
		width: 100%;
		display: none;
		.zaiui-bar-view-box {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 999999;
			background: #FAFAFA;
			
			/* #ifndef MP */
			height: calc(var(--status-bar-height) + 99.99rpx);
			/* #endif */
			
			/* #ifdef MP */
			height: calc(var(--status-bar-height) + 189.99rpx);
			/* #endif */
			
			padding: var(--status-bar-height) 27.27rpx 0 27.27rpx;
			align-items: center;
			.zaiui-bar-box {
				position: relative;
				width: 100%;
				align-items: center;
				line-height: 99.99rpx;
				.close {
					position: absolute;
					right: 27.27rpx;
					font-size: 40rpx;
					bottom: 9.09rpx;
				}
			}
		}
		
		.zaiui-seat-height {
			width: 100%;
			
			/* #ifndef MP */
			height: calc(var(--status-bar-height) + 99.99rpx);
			/* #endif */
			
			/* #ifdef MP */
			height: calc(var(--status-bar-height) + 199.99rpx);
			/* #endif */
		}
		.zaiui-view-content {
			padding: 0 27.27rpx 27.27rpx;
			.img-goods {
				font-variant: small-caps;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				-webkit-box-pack: center;
				justify-content: center;
				-webkit-box-align: center;
				align-items: center;
				white-space: nowrap;
				position: relative;
				width: 137rpx;
				height: 137rpx;
				background-size: cover;
				background-position: center;
				vertical-align: middle;
				border-radius: 12%;
			}
		}
	}
	.push-box.show {
		display: block;
	}
</style>
