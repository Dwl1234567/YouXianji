<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">收入列表</block>
		</bar-title>
		<view class="cu-list menu">
			<view class="cu-item" v-for="(item,index) in dataList" :key="index">
				<view class="content padding-tb-sm">
					<view class="margin-bottom-sm">{{item.subjects_id|FbilltypeInfo}}[{{item.type == 'income'?'收入':'支出'}}]{{item.amount}}元</view>
					<view class="text-gray text-sm">
						<view class="cu-tag round bg-blue light">{{item.type == 'income'?'应收款':'应付款'}}</view>
						<view class="cu-tag round bg-olive light">{{item.subjects_id|FbilltypeInfo}}</view>
						<view class="cu-tag round bg-red light">{{item.status == 'unaudited'?'待审批':'已审批'}}</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey">
						<view class="text-right margin-bottom-sm" >{{item.desc}}</view>
						<view class="text-grey text-sm" style="text-align: right;">{{item.audittime}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下拉加载提示 -->
		<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import {
		erpfinancewastebook
	} from "@/api/erpapi.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	// 科目类别
	const billtypeInfo = [
		{
			value:1,
			lable:'工资'
		},{
			value:2,
			lable:'采购'
		},{
			value:3,
			lable:'差旅'
		},{
			value:4,
			lable:'交通'
		},{
			value:5,
			lable:'招待'
		},{
			value:6,
			lable:'运营'
		},{
			value:7,
			lable:'租赁'
		},{
			value:8,
			lable:'办公'
		},{
			value:9,
			lable:'销售'
		},{
			value:10,
			lable:'快递'
		}
	]
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				ifBottomRefresh: false,
				dataList: [],
				queryInfo: {
					page: 1,
					pagelist: 10,
					type:'income'
				},
				loadmore: 'more', //more 还有数据   noMore 无数据
				contentText: {
					"contentdown": "加载更多数据",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多数据。"
				},
			}
		},
		onLoad() {
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
		onReachBottom() {
			if (this.loadmore == 'noMore') return
			this.queryInfo.page += 1;
			this.ifBottomRefresh = true
			this.getDataList();
		},
		filters:{
			FbilltypeInfo(value){
				if (!value) return ''
				let text = ''
				billtypeInfo.map((item,index)=>{
					if(item.value == value){
						text = item.lable;
					}
				})
				return text;
			}
		},
		methods: {
			getDataList() {
				let that = this;
				let paramsData = that.queryInfo;
				erpfinancewastebook(paramsData).then(res => {
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
			}
		}
	}
</script>

<style lang="scss">

</style>
