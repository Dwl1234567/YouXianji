<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">添加盘点任务</block>
		</bar-title>
		
		<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-red text-bold cur':''" v-for="(item,index) in warehouseData" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<form>
			<checkbox-group class="block"  @change="CheckboxChange" v-if="warehouseData[0]">
				<view class="cu-form-group margin-lr-sm margin-tb-xs radius-2" v-for="(item1,index1) in warehouseData[TabCur].partition_list">
					<view class="title text-red">{{item1.name}}</view>
					<checkbox class='round' :class="item1.checked?'checked':''"  :checked="item1.checked?true:false"  :value="item1.id.toString()"></checkbox>
				</view>
			</checkbox-group>
			<view class="cu-form-group margin-lr-sm margin-tb-xs radius-2">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请输入备注"></textarea>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg radius-4" @click="erpCheckAddFuc">确定</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		warehousegetList,
		erpCheckAdd
	} from "@/api/erpapi.js";
	import barTitle from '@/components/common/basics/bar-title';
	import _tool from '@/utils/tools.js';	//工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				warehouseData:[],
				checkboxArr: [],
				modalName: null,
				textareaAValue: '',
			}
		},
		onLoad() {
			warehousegetList({}).then(res=>{
				let data = res.data;
				if(data){
					data.map((item,index)=>{
						item.partition_list.map((item1,index1)=>{
							item1.checked = false;
						})
					})
					console.log(data);
					this.warehouseData = data;
				}
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			CheckboxChange(e) {
				console.log(e);
				this.checkboxArr = e.detail.value;
				this.warehouseData[this.TabCur].partition_list.map((item,index)=>{
					if(item.id == e.detail.value[0]){
						item.checked = !item.checked;
					}else{
						item.checked = false;
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			erpCheckAddFuc(){
				if(this.checkboxArr.length == 0){
					return uni.showToast({
						icon:"none",
						title:"请选择分仓"
					})
				}
				if(!this.textareaAValue){
					return uni.showToast({
						icon:"none",
						title:"请输入备注"
					})
				}
				
				let paramsData = {
					remark:this.textareaAValue,
					warehouse_id:this.warehouseData[this.TabCur].id,
					partition_ids:this.checkboxArr,
				}
				erpCheckAdd(paramsData).then(res=>{
					uni.showToast({
						icon:"none",
						title:"添加成功!"
					})
					uni.redirectTo({
						url: "/pages/erp/inventory/check/goods?checkId="+res.data
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
