
<template>
	<view>
		<view class="cu-chat">
			<view class="cu-item" v-for="(item,index) in dataList" :key="index"
				:class="item.sender_identity == '0'?'self':''">
				<view v-if="item.sender_identity == '1'" class="cu-avatar radius"
					:style="[{backgroundImage:'url('+item.avatar+')'}]"></view>
				<view class="main">
					<view class="content shadow" :class="item.sender_identity == '0'?' bg-red light ':''">
						<rich-text :nodes="item.message"></rich-text>
					</view>
				</view>
				<view v-if="item.sender_identity == '0'" class="cu-avatar radius"
					:style="[{backgroundImage:'url('+item.avatar+')'}]"></view>
				<view class="date">{{item.createtime}}</view>
			</view>

		</view>


	</view>
</template>

<script>
	import {
		erpchatview
	} from "@/api/erpapi.js"
	export default {
		data() {
			return {
				sessionId: '',
				dataList: []
			};
		},
		onLoad(options) {
			this.sessionId = options.id;
			this.geterpchatview();
		},
		methods: {
			geterpchatview() {
				erpchatview({
					session_id: this.sessionId
				}).then(res => {
					this.dataList = res.data;
				})
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}
	img {
		max-width:100rpx;
	}
</style>
