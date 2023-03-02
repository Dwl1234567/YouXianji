<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">推广人订单</block>
		</bar-title>
		<view class="">
			推广人订单主页
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
		},
		
	}
</script>

<style lang="scss">
</style>
