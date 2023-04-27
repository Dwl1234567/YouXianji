import {
	UPLOAD_IMG_URL
} from '@/config/app';
import Vue from 'vue'
export function upload(filePath) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '上传中'
		})
		uni.uploadFile({
			// url: `${UPLOAD_IMG_URL}file/upload`,
			url: `${UPLOAD_IMG_URL}`,
			filePath: filePath[0],
			name: 'file',
			header: {
			    'content-type': 'multipart/form-data',
				'Authorization':Vue.prototype.$store.state.token
			},
			formData: {
				// 'file': filePath[0]
			},
			success: (uploadFileRes) => {
				let data = JSON.parse(uploadFileRes.data);
				return resolve(data);
			},
			fail: (err) => {
				uni.showToast({
					icon: 'none',
					title: err,
					mask: true,
					duration: 2000
				});
			},
			complete() {
				uni.hideLoading()
			}
		})
	})

}


export function raiseUpload(filePath) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '上传中'
		})
		uni.uploadFile({
			url: `${UPLOAD_IMG_URL}`,
			filePath: filePath,
			name: 'file',
			header: {
			    // 'content-type': 'multipart/form-data',
				'Authorization':Vue.prototype.$store.state.token
			},
			// formData: {
			// 	'file': filePath
			// },
			success: (uploadFileRes) => {
				let data = JSON.parse(uploadFileRes.data);
				return resolve(data);
			},
			fail: (err) => {
				uni.showToast({
					icon: 'none',
					title: err,
					mask: true,
					duration: 2000
				});
			},
			complete() {
				uni.hideLoading()
			}
		})
	})

}
