<template>
	<!-- 选择城市页面组件 -->
	<view class="box">
		<view class="local-row">
			<view class="local-lable">
				定位/最近访问
			</view>
			<view class="local-item">
				<button class="cu-btn bg-white cu-btn-w80" @click="switchCity">{{city.name}}</button>
			</view>
		</view>
		<view class="hot-row">
			<view class="hot-lable">
				热门城市
			</view>
			<view class="hot-item">
				<view v-for="(item,index) in cityList" :key="index" :id="item.id" class="item-block">
					<button class="cu-btn bg-white cu-btn-w80" @click="switchCity($event, item)">{{item.cityName}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		selectStoreCityList,
	} from "@/api/commons.js"

	export default {
		data() {
			return {
				city: {
					id: 0,
					name: '三亚市',
					longitude: '109.508268',
					latitude: '18.247872',
				},
				cityList: []
			}
		},
		onLoad(query) {
			console.log(query)
			this.city.id = query.id
			this.city.name = query.name

			// 请求城市列表接口
			let params = {}
			selectStoreCityList(params).then((res) => {
				if (res.code === 200) {
					this.cityList = res.data
				}

				console.log(res);
			}).catch((err) => {
				console.log(err);
			})
		},
		methods: {
			// 切换城市
			switchCity(event, val) {
				uni.removeStorageSync('storeByCity')
				console.log(val)
				if (val !== undefined) {
					uni.setStorageSync('storeByCity', val)
				}
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.local-row {
		margin: 40rpx;
	}

	.local-item {
		margin-top: 20rpx;
	}

	.hot-row {
		margin: 40rpx;
		margin-top: 0rpx;
	}

	.hot-item {
		display: flex;
		margin-top: 20rpx;

		.item-block {
			margin-right: 20rpx;
		}
	}

	.cu-btn-w200 {
		width: 200rpx;
	}
</style>