<template>
	<view>
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" content="名称/序列号"  @seachTap="searchTap">
			<block slot="right">
				<text class="cuIcon-scan"  @tap="snTap"/>
			</block>
		</bar-search-title>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item arrow" v-for="(item,index) in dataList" :key="index" @tap="statusTap(item.id)">
				<view class="cu-avatar lg" :style="[{backgroundImage:'url('+item.image+')'}]"></view>
				<view class="content">
					<view class="text-grey">{{item.title}}</view>
					<view class="text-gray text-sm">SN：{{item.sn}}</view>
				</view>
				<view class="action">
					<text class="text-grey text-xs">数量:{{item.surface_num}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import _tool from '@/utils/tools.js';	//工具函数
	import {
		erpcheckgetdata,
	} from "@/api/erpapi.js";
	export default {
		components: {
			barSearchTitle,
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				switchA: false,
				dataList: [],
				checkId:'',
				storeName:''
			}
		},
		onLoad(options) {
			this.checkId = options.checkId;
		},
		onShow() {
			this.getDataList();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			statusTap(id){
				uni.navigateTo({
					url: "/pages/erp/inventory/check/status?id="+id
				});
			},
			snTap(){
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: function(res) {
						console.log('获取到货品号，调用接口', res)
						// 微信小程序
						if (res.errMsg == "scanCode:ok") {
							// 扫描到的信息
							let code = res.result
							that.storeName = code;
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}
				
					}
				});
			},
			searchTap(e) {
				console.log('搜索结果',e)
				this.storeName = e;
				this.getDataList();
			},
			getDataList() {
				let that = this;
				let paramsData = {};
				paramsData['check_id'] = that.checkId;
				paramsData['keyword'] = that.storeName;
				erpcheckgetdata(paramsData).then(res => {
						let data = res.data;
						if (data) {
							that.dataList = data
						}
					})
					.finally(() => {
					})
			},
		}
	}
</script>

<style lang="scss">
	.cu-list.menu-avatar > .cu-item.arrow{
		padding-right:68rpx
	}
	.cu-list.menu-avatar>.cu-item.arrow:before{
		position: absolute;
		top: 0;
		right: 15px;
		bottom: 0;
		display: block;
		margin: auto;
		width: 15px;
		height: 15px;
		color: #8799a3;
		content: "\e6a3";
		text-align: center;
		font-size: 17px;
		font-family: cuIcon;
		line-height: 15px;
	}
</style>
