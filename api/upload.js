import {
	UPLOAD_IMG_URL
} from '@/config/app';
export function upload(filePath) {
	console.log(filePath[0],111111111111);
	return new Promise((resolve, reject) => {
		// console.log(filePath);
		uni.showLoading({
			title: '上传中'
		})
		uni.uploadFile({
			// url: `${UPLOAD_IMG_URL}file/upload`,
			url: `${UPLOAD_IMG_URL}`,
			filePath: filePath[0],
			name: 'file',
			formData: {
				'file': filePath[0]
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes, 'upload');
				// console.log(uploadFileRes.data);
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
		// console.log(filePath);
		uni.showLoading({
			title: '上传中'
		})
		uni.uploadFile({
			url: `${UPLOAD_IMG_URL}`,
			filePath: filePath,
			name: 'file',
			formData: {
				'file': filePath
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes.data);
				let data = JSON.parse(uploadFileRes.data);
				return resolve(data);
			},
			fail: (err) => {
				console.log(err);
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
