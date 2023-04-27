<template>
	<view>
		<uni-forms ref="customForm" :rules="customRules" labelWidth="80px" :modelValue="customFormData">
			<uni-forms-item label="父仓库" name="parentId" class="cu-form-group">
				<uni-data-select
				        v-model="customFormData.parentId"
				        :localdata="range"
				        @change="change"
				      ></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="仓库名称" required name="warehouseName" class="cu-form-group">
				<uni-easyinput v-model="customFormData.warehouseName" placeholder="请输入仓库名称" />
			</uni-forms-item>
		</uni-forms>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="submit('customForm')">确定</button>
		</view>
	</view>
</template>

<script>
	import {
		warehouseList,
		addWarehouse
	} from "@/api/erp.js"
	export default {
		components: {

		},
		data() {
			return {
				storeId: 0,
				range: [],
				modalName: null,
				textareaAValue: '',
				radio: '0',
				// 单选数据源
				sexs: [{
					text: '男',
					value: '1'
				}, {
					text: '女',
					value: '0'
				}, {
					text: '保密',
					value: '2'
				}],
				customFormData: {
					warehouseName: '',
					parentId: ''
				},
				queryInfo: {},
				// 自定义表单校验规则
				customRules: {
					warehouseName: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
				}
			};
		},
		onLoad(options) {
			this.storeId = uni.getStorageSync('userinfo').storeId
			this.getFaterList();
		},
		onReady() {

		},
		methods: {
			getFaterList() {
				warehouseList({
					storeId: this.storeId,
					parentId: 0
				}).then(res => {
					console.log(res.rows)
					res.rows.map(item => {
						this.range.push({
							value: item.warehouseId,
							text: item.warehouseName
						})
					})
				})
			},
			 change(e) {
			        console.log("e:", e);
			      },
			RegionChange(e) {
				this.region = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			submit(ref) {
				this.customFormData.storeId = this.storeId;
				this.$refs[ref].validate().then(res => {
					addWarehouse({
						...this.customFormData
					}).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title:'添加成功！',
								icon:"none"
							})
							uni.navigateTo({
								url:'/pages/erp/warehouse/quality'
							})
						}
						
					})
				}).catch(err => {
					console.log('err', err);
				})
			},
		}
	}
</script>

<style scoped>
	.cu-form-group {
		margin-top: 20rpx;
		margin-bottom: 0rpx;
		padding: 20rpx;
	}
</style>
