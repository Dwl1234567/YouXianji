<template>
	<view>
		<uni-forms ref="customForm" :rules="customRules" labelWidth="80px" :modelValue="customFormData">
			<uni-forms-item label="供应商名称" labelWidth="120" required name="name" class="cu-form-group">
				<uni-easyinput v-model="customFormData.name" placeholder="请输入供应商名称" />
			</uni-forms-item>
			<uni-forms-item label="联系人" labelWidth="120" name="contact" class="cu-form-group">
				<uni-easyinput v-model="customFormData.contact" placeholder="请输入联系人" />
			</uni-forms-item>
			<uni-forms-item label="联系人手机号" labelWidth="120" name="phone" class="cu-form-group">
				<uni-easyinput v-model="customFormData.phone" placeholder="请输入联系人手机号" />
			</uni-forms-item>
			<uni-forms-item label="备注" class="cu-form-group">
				<uni-easyinput type="textarea" v-model="customFormData.description" placeholder="请输入备注" />
			</uni-forms-item>
		</uni-forms>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="submit('customForm')">确定</button>
		</view>
	</view>
</template>

<script>
	import {
		erpsupplieradd
	} from "@/api/erpapi.js"
	export default {
		components: {

		},
		data() {
			return {
				modalName: null,
				textareaAValue: '',
				radio: '0',
				// 单选数据源
				sexs: [{
					text: '男',
					value: 0
				}, {
					text: '女',
					value: 1
				}, {
					text: '保密',
					value: 2
				}],
				customFormData: {
					name: '',
					contact: '',
					phone: '',
					description: '',
				},
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '供应商名称不能为空'
						}]
					},
				}
			};
		},
		onLoad(options) {

		},
		onReady() {

		},
		methods: {
			RegionChange(e) {
				this.region = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			submit(ref) {
				console.log(this.customFormData);
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					erpsupplieradd({
						...this.customFormData
					}).then(res => {
						uni.showToast({
							title:'添加成功！',
							icon:"none"
						})
						uni.navigateBack({})
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
