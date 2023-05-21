<template>
	<view class="contents">
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack @rightTap="rightTap">
			<block slot="content">我的足迹</block>
			<!-- <block slot="right" v-if="goods_checked">完成</block> -->
			<!-- <block slot="right" v-else>编辑</block> -->
		</bar-title>

		<scroll-view scroll-x class="text-929294 nav text-center">
			<view class="cu-item text-xl" :class="2==TabCur?'text-101010 cur':''" @tap="tabSelect" data-id="2">
				全新商城
				<view class="bottom-ul"></view>
			</view>
			<view class="cu-item text-xl" :class="0==TabCur?'text-101010 cur':''" @tap="tabSelect" data-id="0">
				二手商城
				<view class="bottom-ul"></view>
			</view>
			<view class="cu-item text-xl" :class="1==TabCur?'text-101010 cur':''" @tap="tabSelect" data-id="1">
				旧机回收
				<view class="bottom-ul"></view>
			</view>
		</scroll-view>
		<block class="content" v-if="TabCur == 0">
			<view class="padding-lr-sm padding-top-lg" style="background: #f0f0f0">
				<goods-mini-list :list_data="querydata[TabCur].dataList" @listTap="goodsSortListTap"></goods-mini-list>
			</view>
		</block>
		<block class="" v-else>
			<view class="margin-lr-sm margin-top-lg" style="background: #f0f0f0">
				<goods-mini-list :list_data="querydata[TabCur].dataList" @listTap="goodsSortListTap"></goods-mini-list>
			</view>
		</block>
		<!--
		<checkbox-group class="block" @change="checkboxChange">
			<view class="bg-white goods-list-view" v-for="(item,index) in querydata[TabCur].dataList" :class="goods_checked?'checked':''">
				<view class="goods-list-box" @tap="gogoodsdetail(item.id)">
					<checkbox class='round red checked' :class="checkbox_list[1].checked?'checked':''"
						:checked="checkbox_list[1].checked?true:false" :value="checkbox_list[1].id + ''" />
					<view class="cu-avatar radius" :style="[{backgroundImage:'url('+ item.image +')'}]" />
					<view class="goods-info-view">
						<view class="text-cut-2 text-black">{{item.title}}</view>
						<view class="goods-info-tools">
							<text class="text-price text-red text-lg">{{item.money}}</text>
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>
		-->

		<!--占位底部距离-->
		<view class="cu-tabbar-height" v-if="goods_checked" />

		<!--底部操作-->
		<view class="bg-white footer-fixed foot-padding-bottom" v-if="goods_checked">
			<view class="cu-bar padding-lr">
				<view class="checked-view" @tap="tapChecked">
					<checkbox class="round red sm checked" :class="checkbox_all?'checked':''" :checked="checkbox_all" />
					<text class="text-black text-lg">全选</text>
				</view>
				<view class="btn-view">
					<button class="cu-btn radius bg-red">删除(3)</button>
				</view>
			</view>
		</view>

		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<!--编辑-->
		<view class="add-btn-view-box" @tap="rightTap">
			<button class="cu-btn cuIcon-check bg-red" v-if="goods_checked" />
			<button class="cu-btn cuIcon-write bg-red" v-else />
		</view>
		<!-- #endif -->
		<!-- 下拉加载提示 -->
		<uni-load-more :status="querydata[TabCur].loadmore" :contentText="contentText"></uni-load-more>
	</view>
</template>

<script>
	import { secondGoodsFootprintList } from '@/api/malls.js';
	import barTitle from '@/components/common/basics/bar-title';
	import goodsMiniList from '@/components/common/list/goods-mini-list';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		components: {
			barTitle,
			goodsMiniList,
		},
		data() {
			return {
				TabCur: 0,
				goods_img: '/static/images/home/goods/1.png',
				goods_img_a: '/static/images/home/goods/2.png',
				checkbox_list: [],
				checkbox_all: false,
				goods_checked: false,
				querydata: [
					{
						page: 1,
						limit: 10,
						loadmore: 'more', //more 还有数据   noMore 无数据
						dataList: [],
					},
					{
						page: 1,
						limit: 10,
						loadmore: 'more', //more 还有数据   noMore 无数据
						dataList: [],
					},
					{
						page: 1,
						limit: 10,
						loadmore: 'more', //more 还有数据   noMore 无数据
						dataList: [],
					},
				],
				contentText: {
					contentdown: '加载更多数据',
					contentrefresh: '加载中...',
					contentnomore: '暂无更多数据。',
				},
			};
		},
		onLoad() {
			this.checkbox_list = [
				{
					id: 1,
					checked: true,
				},
				{
					id: 2,
					checked: false,
				},
				{
					id: 3,
					checked: false,
				},
				{
					id: 4,
					checked: false,
				},
				{
					id: 5,
					checked: false,
				},
				{
					id: 6,
					checked: false,
				},
			];
			this.getdataList();
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0,
			});
		},
		onPullDownRefresh() {
			this.querydata[this.TabCur].page = 1;
			this.getdataList();
		},
		onReachBottom() {
			console.log(123);
			// this.querydata[this.TabCur].page = this.querydata[this.TabCur].page + 1;
			if (this.querydata[this.TabCur].loadmore == 'noMore') {
				return;
			}
			this.getdataList();
		},
		methods: {
			// 获取列表
			getdataList() {
				let that = this;
				let paramsData = {
					pageNum: this.querydata[this.TabCur].page,
					pageSize: this.querydata[this.TabCur].limit,
				};
				secondGoodsFootprintList(paramsData)
					.then((res) => {
						let data = res.rows;
						if (data) {
							//判断是触底加载还是第一次进入页面的加载
							if (that.querydata[this.TabCur].page == 1) {
								that.querydata[this.TabCur].dataList = data;
							} else {
								that.querydata[this.TabCur].dataList.push(...data);
							}
							console.log(res.total, that.querydata[this.TabCur].dataList.length);
							if (res.total !== that.querydata[this.TabCur].dataList.length) {
								that.querydata[this.TabCur].page += 1;
							}
							that.querydata[this.TabCur].loadmore =
								res.total == that.querydata[this.TabCur].dataList.length ? 'noMore' : 'more';
						}
					})
					.finally(() => {
						uni.stopPullDownRefresh();
					});
			},
			//tab菜单被点击
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.TabCur = Number(index);
				this.$nextTick(() => {
					uni.startPullDownRefresh();
				});
				//滚动到顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100,
				});
			},
			//编辑
			rightTap() {
				if (this.goods_checked) {
					this.goods_checked = false;
				} else {
					this.goods_checked = true;
				}
			},
			//选择
			checkboxChange(e) {
				let items = this.checkbox_list,
					values = e.detail.value;
				for (let i = 0; i < items.length; i++) {
					//店铺处理
					let result = values.includes(items[i].id + '');
					if (result) {
						items[i].checked = true;
					} else {
						items[i].checked = false;
					}
				}
			},
			tapChecked() {
				if (this.checkbox_all) {
					this.checkbox_all = false;
				} else {
					this.checkbox_all = true;
				}
			},
			goodsSortListTap(e) {
				if (this.TabCur === 2) {
					uni.navigateTo({
						url: '/pages/goods/goodsNew?id=' + e.data.id,
					});
				} else {
					uni.navigateTo({
						url: '/pages/goods/goods?id=' + e.data.id,
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	/* #ifdef APP-PLUS */
	@import '@/uni_modules/colorui/main.css';
	@import '@/uni_modules/colorui/icon.css';
	@import '@/uni_modules/mpb-ui/shop/app.scss';
	/* #endif */
	@import '@/uni_modules/mpb-ui/shop/footmark.scss';
	.contents {
		background: #f0f0f0;
	}
	.nav {
		background: white;
	}
	page {
		background: #f0f0f0;
	}
</style>
