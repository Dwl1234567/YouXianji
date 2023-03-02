<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">等级任务</block>
		</bar-title>
		<view class="agent">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>任务要求
				</view>
			</view>
			
			<view class="padding bg-white">
				<view class="flex justify-between">
					<view class="">
						<text class="margin-right-xs" v-if="dataInfo.buy">付费升级到{{dataInfo.buy.explain}}-</text>
						<text class="text-red" v-if="dataInfo.buy">{{dataInfo.buy.money}}元</text>
					</view>
					<view class="">
						<button class="cu-btn sm round bg-orange" @click="upTap">立即升级</button>
					</view>
				</view>
				<view class="flex justify-between" v-for="(item,index) in dataInfo.list" :key="index">
					<view class="">{{item.name}}</view>
					<view class="">务必达成</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>完成情况
				</view>
			</view>
			<view class="padding bg-white">
				<block  v-for="(item1,index1) in dataInfo.list" :key="index1">
					<view class="flex justify-between">
						<view class="">{{item1.real_name}}</view>
						<view class="">{{item1.number}}人</view>
					</view>
					<view class="flex">
						<view class="cu-progress round">
							<view class="bg-green" :style="{width: loading ? item1.finish_rate :''}"></view>
						</view>
						<text class="cuIcon-roundcheckfill text-green margin-left-sm"></text>
					</view>
				</block>
				
			</view>
			
			
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>等级特权
				</view>
			</view>
			<view class="padding bg-white">
				<block  v-for="(item2,index2) in dataInfo.tequan" :key="index2">
				<view class="flex justify-between">
					<view class="">{{item2.name}}</view>
					<view class="">{{(item2.money * 100).toFixed(2)}}%</view>
				</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
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
				loading: false,
				dataInfo:'',
				id:''
			}
		},
		onLoad: function(options) {
			this.id = options.id;
			this.agentusermyleveltaskyesFuc(options.id);
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			// 获取信息
			agentusermyleveltaskyesFuc(id){
				agentusermyleveltaskyes({level_id:id}).then(res=>{
					this.dataInfo = res.data;
					this.loading = true;
				})
			},
			upTap(){
				uni.navigateTo({
					url: '/pages/my/item/level_up?id='+this.id
				})
			},
		},
		
	}
</script>

<style lang="scss">
	
</style>
