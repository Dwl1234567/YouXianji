<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">机型选择</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					{{index>-1?picker[index]:'请选择机型'}}
				</view>
			</picker>
		</view>
		<!--选项-->
		<view class="bg-white nav-tab-view">
			<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="tab_scroll">
				<block v-for="(tabitem,tabindex) in nav_list" :key="tabindex">
					<view class="cu-item" :class="tabindex == tab_cur?'select':''" @tap="tabSelect"
						:data-id="tabindex">
						<view :class="tabindex == tab_cur?'text-black':''">{{tabitem}}</view>
						<view class="tab-dot bg-red" />
					</view>
				</block>
			</scroll-view>
		</view>
		<!--选项列表-->
		<block v-for="(item,index) in nav_list" :key="index">
			<view class="process-box margin-top" v-show="tab_cur == index">
				<scroll-view v-for="(recyitem,recyindex) in retrieveList[index]" :key="recyindex" scroll-y="true"
					class="scroll-Y">
					<SelectData :title="recyitem.name" :checklist="recyitem.child" @itemclick="moneyFuc">
					</SelectData>
		
				</scroll-view>
			</view>
		</block>
		
		<view class="bg-white orderview-footer-fixed">
			<view class="flex flex-direction" @tap="insertCustomOrderFuc">
				<button class="cu-btn bg-red margin-tb-sm lg">提交属性</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		upload
	} from "@/api/upload.js";
	import {
		getUserAddress,
		insertCustomOrder,
		getOtherMachine,getOtherShuxing,addOtherAttr
	} from "@/api/common.js";
	import SelectData from '@/components/RecyclingList/SelectData.vue';
	export default {
		components: {
			SelectData,
		},
		data() {
			return {
				checkimgshow: false,
				pImgDeleteStatus: false,
				upimgtype: '',
				tab_scroll: 0,
				tab_cur: 0,
				nav_list: [
					'物品信息',
					'成色情况',
					'功能情况',
					'维修情况'
				],
				retrieveList: [],
				index: -1,
				picker: [],
				basicList : [],
				addParams: {},
				otherspecID:0,
			}
		},
		onLoad(option) {
			this.getOtherShuxingData();
			this.getOtherBasicData();
		},
		methods: {
			getOtherBasicData(){
				let that = this;
				getOtherMachine({}).then(res => {
					if (res.code == 1) {
						that.basicList = res.data;
						that.basicList.forEach((item, index) => {
							that.picker.push(item.name);
						})
					}
				})
			},
			getOtherShuxingData(){
				let that = this;
				getOtherShuxing({}).then(res => {
					if (res.code == 1) {
						that.retrieveList = res.data;
						setTimeout(() => {
							this.gainSelectedAttr();
						}, 500)
					}
				})
			},
			//获取选中的值
			gainSelectedAttr(){
				let that = this;
				that.retrieveList.forEach((item, index) => {
					item.forEach((iitem, indexx) => {
						iitem.child.forEach((iiitem, indexxx) => {
							if (iiitem.checked) {
								that.addParams[iitem.key] = indexxx;
							}
						})
					})
				})
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.tab_cur = index;
				// console.log(this.tab_cur);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			moneyFuc(e) { //属性值选中
				console.log(e);
				setTimeout(() => {
					this.gainSelectedAttr();
				}, 500)
			},
			PickerChange(e) {
				this.index = e.detail.value;
				let that = this;
				let params = {};
				params.type = this.basicList[this.index]['id'];
				that.otherspecID = this.basicList[this.index]['id'];
				getOtherShuxing(params).then(res => {
					if (res.code == 1) {
						that.retrieveList = res.data;
						setTimeout(() => {
							this.gainSelectedAttr();
						}, 500)
					}
				})
			},
			confirm() {
				setTimeout(() => {
					this.tipshow = false;
				}, 10);
				if (this.status == 1) {
					console.log('跳转到详情？订单列表');
				} else {
					console.log('关闭不跳转');
				}
			},
			close() {
				this.tipshow = false;
				this.checkimgshow = false;
			},
			insertCustomOrderFuc(){
				//属性值提交并返回attrid
				let that = this;
				if(that.otherspecID<1){
					that.$u.toast('请选择机型');
					return false;
				}
				that.addParams.spec_id = that.otherspecID;
				console.log('that.addParams',that.addParams);
				addOtherAttr(that.addParams).then(res => {
					that.$u.toast('提交订单成功');
					uni.navigateTo({
						url: '/pages/erp/purchase/add/select_diyform?attrid=' + res.data
					})
				})
				.catch(err => {
				
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.radio-group {
		flex: 1;
		padding: 10rpx 0;

		.flex-sub {
			width: 50%;
			margin: 5rpx 0;

			.round {
				margin-right: 10rpx;
				margin-left: 10rpx;
			}
		}
	}

	.orderview-footer-fixed {
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
	.process-box {
		width: 100%;
		padding: 0 20rpx;
	
		.big-box {
			font-size: 30rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
	}
</style>
