<template>
	<view>
		<!--标题栏-->
		<!-- <bar-title bgColor="bg-white" isBack>
			<block slot="content">采购产品列表</block>
		</bar-title> -->
		
		<view class="bg-white">
			<view class="tips padding-sm bg-green">
				<text>单号:{{Tcode}}</text>
				<text>{{Tcreatetime}}</text>
			</view>
			<view class="cu-card article">
				<view class="cu-item shadow" v-for="(item,index) in dataList" :key="index">
					<view class="title"><view class="text-cut">{{item.title}}</view></view>
					<view class="content">
						<image :src="item.image"
						 mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">
								<view class="text">采购价:<text class="text-red">{{item.money}}</text>元</view>
								<view class="text">SN：{{item.sn}} <text class="margin-left-sm cuIcon-copy text-orange"  @tap="copy(item.sn)">复制</text></view>
								<view class="text">采购时间：{{item.createtime}}</view>
							</view>
							<view>
								<view class="cu-tag bg-red light sm round">手机</view>
								<view class="cu-tag bg-blue light sm round">苹果</view>
								<view class="cu-tag bg-pink light sm round">待检</view>
								<view class="cu-tag bg-green light sm round" @tap="baogao">验机报告</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		

	</view>
</template>

<script>
	import {
		erppurchasegetdata
	} from "@/api/erpapi.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				ifBottomRefresh:false,
				dataList: [],
				queryInfo: {
					page: 1,
					pagelist: 10,
					purchase_id: '',
				},
				Tcode:'',
				Tcreatetime:''
			}
		},
		onLoad(options) {
			this.queryInfo.purchase_id = options.purchaseId;
			this.Tcode = options.code;
			this.Tcreatetime = options.createtime;
			// 进入页面刷新
			this.$nextTick(() => {
				uni.startPullDownRefresh();
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.queryInfo.page = 1; //重置分页页码
			this.getDataList();
		},
		methods: {
			copy(text){
				uni.setClipboardData({data: text});
			},
			// 验机报告
			baogao(){
				console.log('点击验机报告');
			},
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				erppurchasegetdata(paramsData).then(res => {
						let data = res.data;
						if (data) {
							if (data) {
								that.dataList = data
							}
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	.tips{
	  justify-content: space-between;
	  display: flex;
	  text{
		  text-align: justify;
	  }
	}
	.cu-card.article>.cu-item {
		margin-top: 0;
		padding-bottom:0;
		.content{
			uni-image{
				width:6.8em;
				height:6.8em;
			}
			.text-content{
				height: 5.4em;
			}
		}
	}
	.border{
		height:2.4em;
		line-height:2.4em;
		border:1px solid #e1e1e1;
	}
</style>
