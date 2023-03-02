<template>
	<view class="mapbox">
		<map id="map" :longitude="longitude" :latitude="latitude" show-location
			style="width: 100%; height: 100vh;"></map>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			//获取当前位置的地图（不可以导航，出发点和目标点一致，因距离太短 无法导航）
			this.myLocation();  //要么注释这个
			//获取后台位置的地图（可以导航，出发点和目标点不一致）
			// this.tomap(117.26061, 31.8512, '安徽省合肥市蜀山区蜀山政务中心') //要么注释这个 
		},
		data() {
			return {
				longitude: '',
				latitude: ''
			}
		},
		methods: {
			myLocation() {
				let that = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						console.log(res);
						that.longitude = res.longitude;
						that.latitude = res.latitude;
						console.log(res.latitude);
						console.log(res.longitude);

						// uni.openLocation({
						// 	latitude: Number.parseFloat(res.latitude),
						// 	longitude: Number.parseFloat(res.longitude),
						// 	address: location,
						// 	success: function() {
						// 		// console.log('success');
						// 	}
						// });
					}
				})
			},
			tomap(longitude, latitude, location) {
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						console.log("latitude", Number.parseFloat(latitude));
						console.log("longitude", Number.parseFloat(longitude));
						uni.openLocation({

							latitude: Number.parseFloat(latitude),
							longitude: Number.parseFloat(longitude),
							address: location,
							success: function() {
								// console.log('success');
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
</style>
