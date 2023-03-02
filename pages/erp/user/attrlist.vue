<template>
	<view>
		<view class="margin">
			<u-grid :border="false">
				<u-grid-item  :customStyle="{padding:20+'rpx'}"
					v-for="(item,index) in dataList"
					:key="index" @click="goodsclick(item.id)">
					<view class="item">
						<image class="img" :src="item.image" mode="aspectFill"></image>
						<view class="text" :style="{height:item.name.length > 20 ? '80rpx':'50rpx'}">{{item.name}}</view>
					</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';	//工具函数
	import {
		erprecycletaskattrlist
	} from "@/api/erpapi.js"
	export default {
		//name: 'sales',
		components: { 
		},
		data() {
			return {
				dataList: [],
				queryInfo: {
					page: 1,
					pagesize: 10,
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				ifBottomRefresh:false,
			}
		},
		onLoad() {
			//加载虚拟数据
			this.$nextTick(()=>{
				uni.startPullDownRefresh({})
			})
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		onPullDownRefresh() {
			this.queryInfo.page = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.page += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			// 获取列表
			getDataList() {
				let that = this;
				
				let paramsData = {
					...that.queryInfo,
				}
				erprecycletaskattrlist(paramsData).then(res => {
						let data = res.data.data;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
			
							if (that.ifBottomRefresh) {
								that.dataList = that.dataList.concat(data)
							} else {
								that.dataList = data
							}
							that.ifBottomRefresh = false
							that.loadmore = res.data.total == that.dataList.length ? 'noMore' : 'more'
			
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			goodsclick(id) {
				uni.navigateTo({
					url: '/pages/erp/user/attrprice?id=' + id
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
	
	.item {
		text-align: center;
	
		.img {
			width: 166rpx;
			height: 166rpx;
		}
	
		.text {
			color: #999999;
			font-size: 24rpx;
			// height: 50rpx;
		}
	}
</style>
