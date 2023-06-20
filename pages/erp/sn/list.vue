<template>
	<view>
		<!--接入查找商品列表接口(此接口为该公司所有门店以及仓库)-->
		<!--标题栏-->
		<bar-search-title bgColor="bg-white" :seachkey="storeName" content="名称/序列号" @seachTap="searchTap">
			<block slot="right">
				<text class="iconfont icon-saomiao" @tap="snTap" />
			</block>
		</bar-search-title>
		<dataList :dataList="goodsInfo"></dataList>
	</view>

</template>

<script>
	import barSearchTitle from '@/components/common/basics/bar-search-title';
	import dataList from '@/components/common/dataList/dataList.vue';
	import _tool from '@/utils/tools.js'; //工具函数
	import {
		selectDeviceNoTrace
	} from "@/api/erp.js";

	export default {
		components: {
			barSearchTitle,
			dataList
		},
		data() {
			return {
				deviceId: null,
				goodsInfo: [],
				financeList: [],
				qualityList: [],
				purchaseList: [],
				sellList: [],
				dispalyClass: 'display-none',
				showData: false,
				storeName: '',
			}
		},
		onLoad(e) {},
		onReady() {
			//_tool.setBarColor(true);
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		methods: {
			erpproductSnDataFuc() {
				let that = this;

				// if (!that.storeName) {
				// 	uni.$u.toast('请填写商品序列号')
				// }
				let paramsData = {
					'deviceNo': that.storeName,
					'deviceId': that.deviceId
				}
				selectDeviceNoTrace(paramsData).then(res => {
					if (res.code == 200) {
						that.showData = true;
						that.goodsInfo = res.data
						if (that.goodsInfo) {
							that.dispalyClass = 'display-block';
						}
					}
					console.log(that.goodsInfo);
					//let data = res.data.data;

				})

			},

			searchTap(e) {
				console.log('搜索结果', e)
				this.storeName = e;
				this.erpproductSnDataFuc();
			},
			snTap() {
				console.log('扫描二维码获取序列号筛选结果')
				let that = this;
				// 允许从相机和相册扫码
				uni.scanCode({
					scanType: ['qrCode'], //条形码
					success: function(res) {
						console.log('获取到货品号，调用接口', res)
						// 微信小程序
						if (res.errMsg == "scanCode:ok") {
							// 扫描到的信息
							const data = JSON.parse(res.result)
							console.log(data.a)
							that.deviceId = data.a
							that.erpproductSnDataFuc();
						} else {
							console.log("未识别到二维码，请重新尝试！")
							uni.$u.toast('未识别到二维码，请重新尝试！')
						}

					}
				});
			},

			copy(sn) {
				//拷贝
				uni.setClipboardData({
					data: sn
				});

			},
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "/uni_modules/colorui/main.css";
	@import "/uni_modules/colorui/icon.css";
	@import "@/uni_modules/mpb-ui/shop/app.scss";
	/* #endif */
	@import "@/uni_modules/mpb-ui/shop/sort_list.scss";

	.display-none {
		display: none;
	}

	.display-block {
		display: block;
	}

	.cu-card,
	.cu-card>.cu-item {
		overflow: unset;
	}

	.cu-card.article>.cu-item {

		.content {
			uni-image {
				width: 6.8em;
				height: 6.8em;
			}

			.text-content {
				height: 5.4em;
			}
		}
	}

	.border {
		height: 2.4em;
		line-height: 2.4em;
		border: 1px solid #e1e1e1;
	}

	.cu-card.article>.cu-item .content .text-content {
		height: auto;
	}

	.cu-card.article>.cu-item {
		padding-bottom: 0;
	}

	.cu-timeline {
		background-color: unset;
	}

	.cu-timeline>.cu-item {
		padding: 0 0 15px 25px;
	}

	.cu-timeline .cu-time {
		width: 100%;
		text-align: left;
		padding: 5px 10px 10px 0;
	}

	.cu-timeline>.cu-item::before {
		top: 0;
		left: 0;
		background-color: unset;
	}

	.cu-timeline>.cu-item::after {
		left: 10px;
		width: 5px;
		background-color: #fff;
	}

	.cu-timeline>.cu-item>.content {
		padding: 5px;
		border-radius: 10px;
	}
</style>