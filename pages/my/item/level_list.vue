<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-242730" isBack >
			<block slot="content">等级列表</block>
		</bar-title>
		<view class="agent cu-card opbox">
			<view style="margin-top:-80rpx;height: 468rpx; position: relative;margin-bottom: 80rpx; background-color: #242730;">
			</view>
			<image src="/static/guang.png"class="guang"></image>
			<swiper class="card-swiper round-dot" previous-margin="1rpx" :indicator-dots="false" :circular="true" :autoplay="true" interval="15000"
			  duration="500" @change="cardSwiper" indicator-color="#ffffff" indicator-active-color="#ffffff" style="margin-top: -440upx;">
			  <swiper-item v-for="(item,index) in dataList" :key="index" >
			    <view class="swiper-item shadow-shop" style="border-radius: 20rpx 20rpx 22rpx 22rpx;">
			      <image :src="item.image" mode="aspectFit" class="image" style="height: 164px;"></image>
			    </view>
			  </swiper-item>
			</swiper>
			
			<view class="agent margin-lr-sm">
				<view class="cu-bar solid-bottom margin-top-xl">
					<view class="text-xl text-500">
						任务要求
					</view>
				</view>
				<view class="bg-white radius-2">	
					<view class="padding">
						<!-- <view class="flex justify-between">
							<view class="">
								<text class="margin-right-xs" v-if="dataInfo.buy">付费升级到{{dataInfo.buy.explain}}-</text>
								<text class="text-red" v-if="dataInfo.buy">{{dataInfo.buy.money}}元</text>
							</view>
						</view> -->
						<view class="flex justify-between" v-for="(item,index) in dataInfo.list" :key="index">
							<view class="text-lg margin-bottom-sm">{{item.name}}</view>
							<!-- <view class="">务必达成</view> -->
						</view>
					</view>
				</view>
				<view class="cu-bar solid-bottom margin-top">
					<view class="text-xl text-500">
						完成情况
					</view>
				</view>
				<view class="bg-white radius-2">
					<view class="padding">
						<block  v-for="(item1,index1) in dataInfo.list" :key="index1">
							<view class="text-center text-lg text-400">
								<view class="">{{item1.real_name}}</view>
								<!-- <view class="">{{item1.yesnum}}/{{item1.number}}人</view> -->
							</view>
							<view class="flex margin-top-xxs">
								<view class="cu-progress round">
									<view class="bg-red" :style="{width: loading ? item1.finish_rate :''}"></view>
								</view>
								<!-- <text class="margin-left-sm cuIcon-roundcheckfill" :class="item1.finish_rate=='100%'?'text-red':'text-lightgrey'"></text> -->
							</view>
							<view class="flex justify-between text-lg">
								<view>{{item1.yesnum}}</view>
								<view>{{item1.number}}</view>
							</view>
						</block>
					</view>
				</view>
				<view class="text-center margin-top">
					<button class="cu-btn sm round bg-orange" @click="upTap(dataInfo.buy.grade)">立即升级</button>
				</view>
				<view class="cu-bar solid-bottom margin-top text-xl text-500">
					等级特权
				</view>
				<view class="bg-white radius-2">
					<view class="padding bg-white">
						<block  v-for="(item2,index2) in dataInfo.tequan" :key="index2">
							<view class="flex justify-between text-lg margin-bottom-sm">
								<view class="">{{item2.name}}</view>
								<view class="">{{(item2.money * 100).toFixed(2)}}%</view>
							</view>
						</block>
					</view>
				</view>
				
				
			</view>
			<!--
			<view class="cu-list menu-avatar" v-for="(item,index) in dataList" :key="index">
				<view class="bg-img flex align-center radius-3" style="position: relative;" :style="{backgroundImage: 'url('+item.image+')',height: '428upx'}">
					<view class="padding-sm text-white " style="width: 100%;position:absolute; bottom:0;">
						<view class="flex justify-between">
							<view class="" @click="upTap(item.grade)">
								<text class="cuIcon-card"></text> 购买
							</view>
							<view class="">
								<view class=""  @click="viewTap(item.grade)">
									<text>详细</text>
									<text class="lg text-white cuIcon-right"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			-->
			
		</view>
	</view>
</template>

<script>
	import {
		agentUserLevellist,
		agentusermyleveltaskyes
	} from "@/api/agent.js"
	import barTitle from '@/components/common/basics/bar-title';
	
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				user_level:0, //当前的等级
				next_level:0,//我的下个等级|默认展示等级
				cardCur: 0,//选中的键
				dataInfo:'',
				dataList:[]
			}
		},
		onLoad: function(options) {
			this.next_level = options.next_level;
			//this.agentusermyleveltaskyesFuc(this.next_level);
		},
		onShow() {
			this.agentUserLevellistFuc();
			this.agentusermyleveltaskyesFuc(this.next_level);
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			cardSwiper(e) {
			  this.cardCur = e.detail.current;
			  this.level_id = this.next_level*1+this.cardCur;
			  //console.log(this.level_id);
			  this.agentusermyleveltaskyesFuc(this.level_id);
			},
			// 等级列表
			agentUserLevellistFuc(){
				agentUserLevellist({}).then(res=>{
					this.dataList = res.data.list;
					//this.user_level = res.data.user_level;
				});
			},
			upTap(id){
				uni.navigateTo({
					url: '/pages/my/item/level_up?id='+id
				})
			},
			viewTap(id){
				uni.navigateTo({
					url: '/pages/my/item/leveltask_list?id='+id
				})
			},
			// 获取信息
			agentusermyleveltaskyesFuc(id){
				agentusermyleveltaskyes({level_id:id}).then(res=>{
					this.dataInfo = res.data;
					this.loading = true;
				})
			},
		},
		
	}
</script>

<style lang="scss">
	.card-swiper {
	  height: 310upx !important;
	}
	page{
		background: #F0F0F0;
	}
	.guang{
		z-index: 1025 !important;
		position: fixed;
		top: 0px;
		right: 0px;
		pointer-events: none;
	}
	.opbox{
		position: relative;
	}
	.card-swiper swiper-item {
	  width: 460upx !important;
	  left: 125upx;	
	  box-sizing: border-box;
	  padding: 0upx 0upx 0upx 0upx;
	  overflow: initial;
	  /* margin: 100rpx 0; */
	}
	.cu-btn{
		background: #FFC784;
		border-radius: 7px 7px 7px 6px;
		width: 80vw;
		height: 88rpx !important;
		margin: 0 auto;
	}
	.card-swiper swiper-item .swiper-item {
	  width: 100%;
	  display: block;
	  height: 100%;
	  border-radius: 10upx;
	  transform: scale(0.8);
	  transition: all 0.2s ease-in 0s;
	  overflow: hidden;
	}
	
	.card-swiper swiper-item.cur .swiper-item {
	  transform: none;
	  transition: all 0.2s ease-in 0s;
	}
	
	.cu-item {
	  position: relative;
	  display: flex;
	  padding: 0 15px;
	  min-height: 50px;
	  justify-content: space-between;
	  align-items: center;
	  .content {
	    font-size: 15px;
	    line-height: 1.6em;
	    flex: 1;
	  }
	}
</style>
