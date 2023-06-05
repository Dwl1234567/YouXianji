<template>
	<view class="home-box">
		<!--标题栏-->
		<!--
		<bar-title bgColor="bg-white" :isBack="false">
			<block slot="content">方物云</block>
			<block slot="right">
				<button class="cu-btn sm bg-deepblue" @tap="goToShop">
					<text class="cuIcon-forwardfill margin-right-xs"></text>
					用户模式
				</button>
			</block>
		</bar-title>
		-->



		<!--统计数据-->
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item text-bold" :class="index==TabCur?'text-red cur':''" v-for="(item,index) in daylist"
				:key="index" @tap="tabSelect" :data-id="index">
				{{item.key}}
			</view>
		</scroll-view>
		<view class="margin-sm padding-sm bg-deepblue radius-2">
			<view class="h-table">
				<view class="h-tr h-tr-3 h-thead">
					<view class="h-td">项目</view>
					<view class="h-td">业绩</view>
					<view class="h-td">成本</view>
					<view class="h-td">毛利</view>
				</view>
				<view class="h-tr h-tr-3" v-for="(item,index) in dataList" :key="index">
					<view class="h-td text-red">{{item.name}}</view>
					<view class="h-td">{{item.yeji}}</view>
					<view class="h-td">{{item.chengben}}</view>
					<view class="h-td">{{item.maoli}}</view>
				</view>
			</view>
		</view>

		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!-- 日期选择控件 -->
		<u-calendar :show="showdate" mode="range" minDate="2022-01-01" :maxDate="daylist[0].value[0]" defaultDate="[]"
			:allowSameDay="true" :closeOnClicOverlay="true" @confirm="confirmDate" @close="closeDate"></u-calendar>

	</view>
</template>

<script>
	import {
		getPerformance,
	} from "@/api/erp.js";
	import {
		addNowDay,
		gethoursInfo
	} from "@/utils/pub.js"
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		name: 'home',
		components: {
			//barTitle
		},
		data() {
			return {
				TitleBar: this.CustomBar,
				modalName: null,
				TabCur: 0,
				scrollLeft: 0,
				daylist: [{
						'key': '今天',
						'value': this.getDay(0)
					},
					{
						'key': '昨天',
						'value': this.getDay(-1)
					},
					{
						'key': '本月',
						'value': this.getthismonth()
					},
					{
						'key': '上月',
						'value': this.getlastmonth()
					},
					{
						'key': '选择日期',
						'value': []
					},
				],
				dataList: [],
				showdate: false,
				loginfo: ''
			}
		},
		onLoad() {
			this.getAccountData();
			console.log(this.daylist);

			//console.log(this.daylist);
			//console.log("昨天：", this.getDay(-1))
			//console.log("今天：", this.getDay(0))
			//console.log("明天：", this.getDay(1))
			//console.log("1000年以后：", this.getDay(1000 * 365))
			//console.log(this.CustomBar);
			//加载统计数据


		},
		onPullDownRefresh() {
			this.getAccountData();
		},
		onShow() {
			// this.erpuserbacklogFuc();
		},
		methods: {
			// 获取待办数据
			erpuserbacklogFuc() {
				erpuserbacklog({}).then(res => {
					this.loginfo = res.data;
				})
			},
			getAccountData() {
				console.log(this.TabCur)
				let queryparams = {
					queryType: this.TabCur,
					starttime: this.daylist[this.TabCur].value[0],
					endtime: this.daylist[this.TabCur].value[1]
				}
				getPerformance(queryparams).then(res => {
						this.dataList = [{
								name: '销售',
								yeji: res.data.sellPerformance,
								chengben: res.data.sellCost,
								maoli: res.data.totallirun_price
							},
							{
								name: '回收',
								yeji: res.data.recyclePerformance,
								chengben: res.data.recycleCost,
								maoli: res.data.total_recycle_lirun_price
							}
						];
					})
					.finally(() => {
						uni.stopPullDownRefresh()
					})
			},
			confirmDate(e) {
				console.log(e);

				this.daylist[4].value = [];
				this.daylist[4].value.push(e[0]);
				this.daylist[4].value.push(e.pop());

				this.daylist[4].key = e[0] + '~' + e.pop();
				this.showdate = false;
				this.getAccountData();
			},
			closeDate() {
				this.showdate = false;
			},
			// 获取权限
			erpUserAuth() {
				erpUserAuth({}).then(res => {
					uni.setStorageSync('store_info', JSON.stringify(res.data.store_info));
				})
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				if (this.TabCur == 4) {
					//弹出日期选择
					console.log('弹出日期选择');
					this.showdate = true;
				} else {
					this.getAccountData();
				}

				//console.log(this.TabCur);
				//console.log(this.scrollLeft);
			},
			// 初始化时间
			// 获取当前时间，day为number，getDay(-1):昨天的日期;getDay(0):今天的日期;getDay(1):明天的日期;【以此类推】
			getDay(day) {
				let today = new Date();
				let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码

				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				let dataList = [];
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				return dataList;
			},
			getthismonth() {
				let today = new Date();

				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
				let dataList = [];
				dataList.push(tYear + "-" + tMonth + "-" + '01');
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				return dataList;
			},
			getlastmonth() {
				// let today = new Date('2020-01-01');
				let today = new Date();
				let tYear = today.getFullYear();
				let tMonth = today.getMonth();
				let tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth);
				tDate = this.doHandleMonth(tDate);
				if (tMonth == '00') {
					tMonth = '12'
					tYear = tYear - 1;
				}
				// console.log(this.getMonthDays(tYear,tMonth));
				tDate = this.getMonthDays(tYear, tMonth);
				let dataList = [];
				dataList.push(tYear + "-" + tMonth + "-" + '01');
				dataList.push(tYear + "-" + tMonth + "-" + tDate);
				return dataList;
			},
			getMonthDays(year, month) {
				// 本月第一天 1-31
				const relativeDate = new Date(year, month, 1);
				// 获得当前月份0-11
				let relativeMonth = relativeDate.getMonth();
				// 获得当前年份4位年
				let relativeYear = relativeDate.getFullYear();

				// 当为12月的时候年份需要加1 月份需要更新为0 也就是下一年的第一个月
				if (relativeMonth === 11) {
					relativeYear += 1;
					relativeMonth = 0;
				} else {
					// 否则只是月份增加,以便求的下一月的第一天
					relativeMonth += 1;
				}
				// 一天的毫秒数
				const millisecond = 1000 * 60 * 60 * 24;
				// 下月的第一天
				const nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
				// 返回得到上月的最后一天,也就是本月总天数
				return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
			},
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},
			showModal(e) {
				console.log('1');
				this.modalName = e;
			},
			hideModal(e) {
				console.log('2');
				this.modalName = null
			},
			ChooseCheckbox(e) {
				console.log('3');
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-box {
		// display: none;
	}

	.home-box.show {
		display: block;
	}

	.grid.col-6>uni-view {
		width: 16.666%;
	}

	.flex-wrap {
		.cu-item {
			width: auto;
			margin-left: 20rpx;
		}
	}
</style>