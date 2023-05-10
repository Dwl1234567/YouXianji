<template>
	<view>
		<uni-forms ref="customForm" :rules="customRules" labelWidth="80px" :modelValue="customFormData">
			<uni-forms-item label="供应商名称" labelWidth="120" required name="name" class="cu-form-group">
				<uni-easyinput v-model="customFormData.supplierName" placeholder="请输入供应商名称" />
			</uni-forms-item>
			<uni-forms-item label="联系人" labelWidth="120" name="contact" class="cu-form-group">
				<uni-easyinput v-model="customFormData.supplierLinkname" placeholder="请输入联系人" />
			</uni-forms-item>
			<uni-forms-item label="联系人手机号" labelWidth="120" name="phone" class="cu-form-group">
				<uni-easyinput v-model="customFormData.supplierPhone" placeholder="请输入联系人手机号" />
			</uni-forms-item>
			<uni-forms-item label="备注" class="cu-form-group">
				<uni-easyinput type="textarea" v-model="customFormData.supplierRemark" placeholder="请输入备注" />
			</uni-forms-item>
		</uni-forms>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="submit('customForm')">确定</button>
		</view>
	</view>
</template>

<script>
	import { addsupplier } from '@/api/erp.js';
	export default {
		components: {},
		data() {
			return {
				modalName: null,
				textareaAValue: '',
				radio: '0',
				// 单选数据源
				sexs: [
					{
						text: '男',
						value: 0,
					},
					{
						text: '女',
						value: 1,
					},
					{
						text: '保密',
						value: 2,
					},
				],
				customFormData: {
					supplierName: '',
					supplierLinkname: '',
					supplierPhone: '',
					supplierRemark: '',
				},
				// 自定义表单校验规则
				customRules: {
					supplierName: {
						rules: [
							{
								required: true,
								errorMessage: '供应商名称不能为空',
							},
						],
					},
				},
			};
		},
		onLoad(options) {},
		onReady() {},
		methods: {
			RegionChange(e) {
				this.region = e.detail.value;
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value;
			},
			submit(ref) {
				let storeId = uni.getStorageSync('userinfo').storeId;
				this.customFormData.storeId = storeId;
				this.$refs[ref]
					.validate()
					.then((res) => {
						addsupplier({
							...this.customFormData,
						}).then((res) => {
							uni.showToast({
								title: '添加成功！',
								icon: 'none',
							});
							uni.navigateBack({});
						});
					})
					.catch((err) => {
						console.log('err', err);
					});
			},
		},
	};
</script>

<style scoped>
	.cu-form-group {
		margin-top: 20rpx;
		margin-bottom: 0rpx;
		padding: 20rpx;
	}
</style>
