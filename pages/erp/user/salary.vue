<template>
	<view>
		<!--接入查找商品列表接口-->
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">工资条</block>
		</bar-title>

		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in daylist" :key="index"
				@tap="tabSelect" :data-id="index">
				{{index == 2 ? time ? time : '请选择日期' : item.key}}
			</view>
		</scroll-view>
		<view class="padding">
			<view class="h-table">
				<view class="h-tr h-tr-2 h-thead">
					<view class="h-td">项目</view>
					<view class="h-td">金额</view>
				</view>
				<view class="h-tr h-tr-2">
					<view class="h-td">基本工资</view>
					<view class="h-td">{{dataList.baseWageTotal}}</view>
				</view>
				<view class="h-tr h-tr-2">
					<view class="h-td">线上回收提成</view>
					<view class="h-td">{{dataList.onlineRecycleConmission}}</view>
				</view>
				<view class="h-tr h-tr-2">
					<view class="h-td">线下回收提成</view>
					<view class="h-td">{{dataList.offlineRecycleConmission}}</view>
				</view>
				<view class="h-tr h-tr-2">
					<view class="h-td">线上销售提成</view>
					<view class="h-td">{{dataList.onlineSellConmission}}</view>
				</view>
				<view class="h-tr h-tr-2">
					<view class="h-td">线下销售提成</view>
					<view class="h-td">{{dataList.offlineSellConmission}}</view>
				</view>
				<!-- <view class="h-tr h-tr-2">
					<view class="h-td">客服接待</view>
					<view class="h-td">{{dataList.kefu}}</view>
				</view> -->
				<!-- <view class="h-tr h-tr-2">
					<view class="h-td">机器分拣</view>
					<view class="h-td">{{dataList.fenjian}}</view>
				</view> -->
				<!-- <view class="h-tr h-tr-2">
					<view class="h-td">社保</view>
					<view class="h-td">-{{dataList.shebao}}</view>
				</view> -->
				<!-- <view class="h-tr h-tr-2">
					<view class="h-td">扣款项</view>
					<view class="h-td">-{{dataList.koukuan}}</view>
				</view>
				<view class="h-tr h-tr-2">
					<view class="h-td">奖金</view>
					<view class="h-td">{{dataList.jiangjin}}</view>
				</view> -->

				<view class="h-tr h-tr-2">
					<view class="h-td">总计</view>
					<view class="h-td text-red">{{dataList.totalWage}}</view>
				</view>
			</view>
		</view>



		<u-datetime-picker ref="datetimePicker" :show="showdate" v-model="value1" mode="year-month" :formatter="formatter"
			@confirm="aaa(1)" @cancel="close"></u-datetime-picker>
		<!--占位底部距离-->
		<view class="cu-tabbar-height" />
		<!-- 日期选择控件 -->
		<!-- <u-calendar :show="showdate" mode="range" minDate="2022-01-01" :maxDate="daylist[0].value[0]" defaultDate="[]"
			:allowSameDay="true" :closeOnClicOverlay="true" @confirm="confirmDate" @close="closeDate"></u-calendar> -->
	</view>
</template>

<script>
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		getEmployeeWage
	} from "@/api/erp.js";
	export default {
		//name: 'sales',
		components: {
			barTitle
		},
		data() {
			return {
				time: '',
				value1: '',
				TabCur: 0,
				dataList: '',
				showdate: false,
				daylist: [{
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
			}
		},
		created() {
			//加载虚拟数据
			this.getAccountData();
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			day(e) {
				var today = new Date(e);

				//日期
				var DD = String(today.getDate()).padStart(2, '0'); // 获取日
				var MM = String(today.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
				var yyyy = today.getFullYear(); // 获取年

				// 时间
				var hh = String(today.getHours()).padStart(2, '0'); //获取当前小时数(0-23)
				var mm = String(today.getMinutes()).padStart(2, '0'); //获取当前分钟数(0-59)
				var ss = String(today.getSeconds()).padStart(2, '0'); //获取当前秒数(0-59)
				today = yyyy + '-' + MM;
				return today;
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`;
				}
				if (type === 'month') {
					return `${value}月`;
				}
				if (type === 'day') {
					return `${value}日`;
				}
				return value;
			},
			close() {
				this.showdate = false;
			},
			aaa(value) {
				// this.TabCur = '';
				setTimeout(() => {
					this.time = this.day(this.value1);
					this.showdate = false;
					this.getAccountData();
				}, 100);
			},
			getAccountData() {
				console.log(this.time)
				let queryparams = {
					queryType: this.TabCur + 2,
					starttime: this.time,
					// endtime: this.daylist[this.TabCur].value[1]
				}
				getEmployeeWage(queryparams).then(res => {
					this.dataList = res.data ? res.data : {};
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				if (this.TabCur == 2) {
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
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	@import "@/uni_modules/mpb-ui/shop/sort_list.scss";

	.cu-card.article>.cu-item .content {
		uni-image {
			width: 6.8em;
			height: 6.8em;
		}

		.text-content {
			height: 5.4em;
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}
</style>