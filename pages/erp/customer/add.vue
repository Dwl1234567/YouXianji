<template>
	<view>
		<uni-forms ref="customForm" :rules="customRules" labelWidth="80px" :modelValue="customFormData">
			<uni-forms-item label="姓名" required name="username" class="cu-form-group">
				<uni-easyinput v-model="customFormData.username" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="手机" required name="tel" class="cu-form-group">
				<uni-easyinput v-model="customFormData.tel" placeholder="请输入手机" />
			</uni-forms-item>
			<uni-forms-item label="身份证" name="idcard" class="cu-form-group">
				<uni-easyinput v-model="customFormData.idcard" placeholder="请输入身份证" />
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
		erpclientadd
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
					username: '',
					tel: '',
					idcard: '',
					sex: '',
					remark: '',
				},
				// 自定义表单校验规则
				customRules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					tel: {
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
					console.log('success', res);
					erpclientadd({
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
