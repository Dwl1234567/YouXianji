<template>
	<view>
		
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-red cur':''" @tap="tabSelect" data-id="0">
				待审核
			</view>
			<view class="cu-item" :class="1==TabCur?'text-red cur':''" @tap="tabSelect" data-id="1">
				未完成
			</view>
		</scroll-view>
		<view class="cu-card article" v-if="0==TabCur">
			<view class="cu-item shadow" v-for="(item,index) in dataList[TabCur].list" :key="index">
				<view class="content">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content">
							<view class="text-lg">{{item.title}}</view>
							<view class="text-sm">属性维度:<text class="text-red">{{item.project}}</text></view>
						</view>
					</view>
					<view class="action">
						<view class="margin-bottom-sm">
							<button class="cu-btn bg-green sm" @tap="showModal(item)" data-target="Modal">查看</button>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="dataList[TabCur].loadmore" :contentText="contentText"></uni-load-more>
		</view>
		
		<view class="cu-card article" v-if="1==TabCur">
			<view class="cu-item shadow" v-for="(item,index) in dataList[TabCur].list" :key="index">
				<view class="content">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content">
							<view class="text-lg">{{item.title}}</view>
							<view class="text-sm">属性维度:<text class="text-red">{{item.project}}</text></view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="dataList[TabCur].loadmore" :contentText="contentText"></uni-load-more>
		</view>
		
		<!--弹窗-->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">属性详情</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-sm">
					<scroll-view scroll-y class="bg-white nav text-center" style="height: 800rpx;">
						<view class="h-table margin-bottom-sm" v-for="(item,index) in selectInfo" :key="index">
							<view class="name">{{item.name}}</view>
							<view class="h-tr h-tr-2 h-thead">
								<view class="h-td">属性</view>
								<view class="h-td">价格</view>
							</view>
							<view class="h-tr h-tr-2" v-for="(item1,index1) in item.child" :key="index1">
								<view class="h-td">{{item1.name}}</view>
								<view class="h-td">{{item1.price}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub " @tap="actionTop(2)">拒绝</view>
					<view class="action margin-0 flex-sub text-green solid-left"  @tap="actionTop(1)">同意</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		erprecycleattrpriceaction,
		erprecycleattrpricelist
	} from "@/api/erpapi.js";
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
		},
		data() {
			return {
				TabCur: 0,
				modalName: null,
				dataList: [{
					list:[],
					page: 1,
					pagesize: 10,
					loadmore: 'more'
				},{
					list:[],
					page: 1,
					pagesize: 10,
					loadmore: 'more'
				},],
				queryInfo: {
					page: 1,
					pagesize: 10,
				},
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
				ifBottomRefresh:false,
				selectInfo:'',
				selectgoodsid:''
			}
		},
		onLoad() {
			//加载虚拟数据
			this.$nextTick(()=>{
				uni.startPullDownRefresh({})
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		onPullDownRefresh() {
			this.dataList[this.TabCur].page = 1; //重置分页页码
			this.getDataList();
		},
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.dataList[this.TabCur].page += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		methods: {
			actionTop(type){
				erprecycleattrpriceaction({
					id:this.selectInfo.id,
					auditstatus:type
				}).then(res=>{
					this.hideModal();
					uni.startPullDownRefresh({})
				})
			},
			// 获取列表
			getDataList() {
				let that = this;
				
				let paramsData = {
					page:this.dataList[this.TabCur].page,
					pagesize:this.dataList[this.TabCur].pagesize,
					status:this.TabCur
				}
				erprecycleattrpricelist(paramsData).then(res => {
						let data = res.data.list;
						
						// console.log(data[0].new_json);
						if (data) {
							data.map((item,index)=>{
								item.new_json = JSON.parse(item.new_json);
								// item.old_json = JSON.parse(item.old_json);
							})
							//判断是触底加载还是第一次进入页面的加载
							if (that.ifBottomRefresh) {
								that.dataList[this.TabCur].list = that.dataList.concat(data)
							} else {
								that.dataList[this.TabCur].list = data
							}
							that.ifBottomRefresh = false
							that.dataList[this.TabCur].loadmore = res.data.total == that.dataList[this.TabCur].list.length ? 'noMore' : 'more'
			
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				uni.startPullDownRefresh({})
				
			},
			showModal(e) {
				this.modalName = 'Modal';
				this.selectInfo = e.new_json;
				// console.log(this.selectInfo);
				this.selectgoodsid = e.id;
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style lang="scss">
	.cu-card.article>.cu-item {
		margin-top:0;
		margin-bottom: 0;
		padding-bottom:0;
		.content{
			uni-image{
				width:3.8em;
				height:3.8em;
			}
			.text-content{
				height: 3.8em;
			}
		}
	}
	.border{
		height:2.4em;
		line-height:2.4em;
		border:1px solid #e1e1e1;
	}
	.cu-modal{
		z-index: 99;
	}
</style>