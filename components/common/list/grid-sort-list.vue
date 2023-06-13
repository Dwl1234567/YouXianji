<template>
	<view class="grid-sort-view">
		<view class="bg-white cu-list grid col-5 no-border">
			<block v-for="(item,index) in list_data" :key="index" v-if="index < 10">
				<view class="cu-item" @tap="listTap(item,index)">
					<view class="grid-icon">
						<image :src=" $httpImage + item.photo" mode="widthFix" />
					</view>
					<text>{{item.seriesName}}</text>
				</view>
			</block>
			<view class="cu-item" @tap="moreTap()">
				<view class="grid-icon">
					<image src="/static/img/more.png" mode="widthFix" />
				</view>
				<text>更多</text>
			</view>
		</view>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'grid-sort-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			moreTap() {
				let index = this.list_data.length;
				this.listTap({
					type: 'more'
				}, index);
			},
			listTap(data, index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid-sort-view {
		.grid-icon {
			margin: 0 30rpx;
		}
	}
</style>