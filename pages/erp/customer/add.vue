<template>
	<view>
		<uni-forms ref="customForm" :rules="customRules" labelWidth="80px" :modelValue="customFormData">
			<uni-forms-item label="姓名" required name="clientName" class="cu-form-group">
				<uni-easyinput v-model="customFormData.clientName" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="手机" required name="phonenumber" class="cu-form-group">
				<uni-easyinput v-model="customFormData.phonenumber" placeholder="请输入手机" />
			</uni-forms-item>
			<uni-forms-item label="身份证" name="idCard" class="cu-form-group">
				<uni-easyinput v-model="customFormData.idCard" placeholder="请输入身份证" />
			</uni-forms-item>
			<uni-forms-item label="性别" class="cu-form-group">
				<uni-data-checkbox v-model="customFormData.sex" :localdata="sexs" />
			</uni-forms-item>
			<uni-forms-item label="备注" class="cu-form-group">
				<uni-easyinput type="textarea" v-model="customFormData.remark" placeholder="请输入备注" />
			</uni-forms-item>
		</uni-forms>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @click="submit('customForm')">确定</button>
		</view>
	</view>
</template>

<script>
	import {
		employeeClient
	} from "@/api/erp.js"
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
					value: '1'
				}, {
					text: '女',
					value: '0'
				}, {
					text: '保密',
					value: '2'
				}],
				customFormData: {
					clientName: '',
					phonenumber: '',
					idCard: '',
					sex: '',
					remark: '',
				},
				// 自定义表单校验规则
				customRules: {
					clientName: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					phonenumber: {
						rules: [{
							required: true,
							errorMessage: '手机不能为空'
						},{
							validateFunction: function(rule, value, data, callback) {
								if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)) {
									callback('请输入正确的手机号!')
								}
								return true
							}	
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
					employeeClient({
						...this.customFormData
					}).then(res => {
						uni.showToast({
							title:'添加成功！',
							icon:"none"
						})
						uni.navigateTo({
							url:'/pages/erp/customer/customer'
						})
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
