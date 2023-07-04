<template>
	<view class="evaluate">
		<view class="rate" style="display:flex;align-items: center;">
			<text>评分</text>
			<u-rate count="5" v-model="rate" style="margin-left: 20rpx;"></u-rate>
		</view>
		<u--textarea v-model="value1" placeholder="请输入内容" class="textarea"
			style="background: #f0f0f0;margin-top: 20rpx;margin-bottom: 20rpx;"></u--textarea>
		<view class="upload">
			<text>添加图片</text>
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
				:maxCount="3"></u-upload>
		</view>

		<view class="button" @tap="shoppingOrderEvaluate">分享评价</view>
	</view>
</template>

<script>
	import {
		shoppingOrderEvaluate
	} from '@/api/malls.js';
	import Vue from 'vue';
	export default {
		data() {
			return {
				rate: 5,
				value1: '',
				shoppingOrderId: 0,
				fileList1: [],
			};
		},
		onLoad(option) {
			this.shoppingOrderId = option.shoppingOrderId;
		},
		methods: {
			// 评价
			shoppingOrderEvaluate() {
				const photo = this.fileList1.map((item) => {
					return item.url;
				});
				shoppingOrderEvaluate({
					photo: photo.join(','),
					context: this.value1,
					rate: this.rate,
					shoppingOrderId: Number(this.shoppingOrderId),
				}).then((res) => {
					if (res.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '评价成功',
						});
						uni.navigateTo({
							url: '/pages/order/goods/list?type=3',
						});
					}
				});
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			// 新增图片
			async afterRead(event) {
				console.log(123);
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				console.log(this[`fileList${event.name}`]);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中',
					});
				});
				for (let i = 0; i < lists.length; i++) {
					console.log(lists[i].url);
					const result = await this.uploadFilePromise(lists[i].url);
					console.log(result);
					let item = this[`fileList${event.name}`][fileListLen];
					this[`fileList${event.name}`].splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: 'success',
							message: '',
							url: result,
						})
					);
					fileListLen++;
				}
			},
			uploadFilePromise(urls) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://192.168.31.92:8080/common/upload', // 仅为示例，非真实的接口地址
						filePath: urls,
						name: 'file',
						header: {
							Authorization: Vue.prototype.$store.state.token,
						},
						success: (res) => {
							setTimeout(() => {
								const data = JSON.parse(res.data);
								resolve(data.fileName);
							}, 1000);
						},
					});
				});
			},
		},
	};
</script>

<style lang="scss">
	.evaluate {
		padding: 23rpx 28rpx 0rpx 28rpx;

		.textarea {
			height: 288rpx !important;
			padding: 0rpx !important;
		}

		.upload {
			text {
				font-size: 29rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #232323;
				line-height: 40rpx;
				margin-bottom: 21rpx;
			}

			.u-upload {
				margin-top: 21rpx;
			}
		}

		.button {
			margin: 55rpx auto;
			width: 622rpx;
			height: 84rpx;
			background: linear-gradient(90deg, #f3c81a 0%, #ffb629 100%);
			border-radius: 13rpx 13rpx 13rpx 11rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #4f4f50;
			line-height: 84rpx;
			text-align: center;
		}
	}
</style>