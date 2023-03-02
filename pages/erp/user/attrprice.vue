<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">{{title}}</block>
		</bar-title>
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in dataList"
				:key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="padding" v-for="(item,index) in dataList" v-if="index==TabCur" :key="index">
			<view class="h-table margin-bottom-sm" v-for="(item1,index1) in item.attr" :key="index1">
				<view class="name">{{item1.name}}</view>
				<view class="h-tr h-tr-2 h-thead">
					<view class="h-td">属性</view>
					<view class="h-td">上上次</view>
					<view class="h-td">上次</view>
					<view class="h-td">新价格</view>
				</view>
				<view class="h-tr h-tr-2" v-for="(item2,index2) in item1.child" :key="index2">
					<view class="h-td">{{item2.name}}</view>
					<view class="h-td">{{item2.price2}}</view>
					<view class="h-td">{{item2.price1}}</view>
					<view class="h-td">
						<input v-model="item2.new_price" @blur="changenewprice(item2)" placeholder="输入价格" name="input"></input>
					</view>
				</view>
			</view>
		</view>
		<view class="hight-view" />
		<view class="bg-white view-footer-fixed">
			<view class="flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" @click="erprecycletaskattredit(0)">草稿</button>
			</view>
			<view class="flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @click="erprecycletaskattredit(1)">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		erprecycletaskattrview,
		erprecycletaskattredit
	} from "@/api/erpapi.js"
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js'; //工具函数
	export default {
		//name: 'sales',
		components: {
			barTitle
		},
		data() {
			return {
				TabCur: 1,
				scrollLeft: 0,
				navlist: ['基础SKU', '物品信息', '成色情况', '功能情况'], //非固定数组
				title: 'iPhone 13 Pro Max',
				dataList: [],
				floatmoney:''
			}
		},
		onLoad(options) {
			//加载虚拟数据
			this.goodsid = options.id;
			this.erprecycletaskattrview();
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			changenewprice(row){
				if(!row.new_price || this.floatmoney == '0'){
					return;
				}
				let press = Number(this.floatmoney) * 100;
				let maxnum = Number(row.price1) *  (1 + Number(this.floatmoney));
				let minnum = Number(row.price1) *  (1 - Number(this.floatmoney));
				
				if(Number(row.new_price)>maxnum || Number(row.new_price) <minnum ){
					row.new_price = '';
					return this.$u.toast(`新价格浮动不能相差${press}%`);
				} 
			},
			erprecycletaskattrview() {
				erprecycletaskattrview({
					goods_id: this.goodsid
				}).then(res => {
					if(res.data.list.length == 0){
						uni.navigateBack();
					}
					this.dataList = res.data.list;
					this.floatmoney = res.data.floatmoney;
				})
			},
			erprecycletaskattredit(type) {
				let checkstatus = false;
				this.dataList[this.TabCur].attr.map((item, index) => {
					item.child.map((item2, index2) => {
						if (!item2.new_price) {
							checkstatus = true;
						}
					})

				})
				if (checkstatus) {
					return this.$u.toast('请输入所有项的新价格！');
				}
				let paramsdata = {
					type: type,
					goods_id: this.goodsid,
					project: this.TabCur,
					json: JSON.stringify(this.dataList[this.TabCur])
				}
				// console.log('paramsdata', paramsdata)
				// console.log('paramsdata', this.dataList)
				// return;
				erprecycletaskattredit(paramsdata).then(res => {
					this.erprecycletaskattrview();
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
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

	.view-footer-fixed {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		box-shadow: 0 -3.63rpx 10.9rpx 0 #eaeaea;
		padding: 18.18rpx 27.27rpx;
		text-align: right;

		.cu-btn {
			margin-left: 10px;
		}
	}
	.hight-view{
		height:300rpx;
	}
</style>
