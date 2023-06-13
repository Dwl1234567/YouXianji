<template>
	<view class="">
		<uni-section :title=title type="line" padding>
			<uni-data-picker placeholder="请选择" popup-title="请选择" :localdata="dataList" v-model="classes" @change="onchange"
				@nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
			</uni-data-picker>
		</uni-section>
	</view>
</template>

<script>
	import _tool from '@/utils/tools.js';
	export default {
		name: 'activity-list',
		data() {
			return {
				classes: '0',
				dataTree: [{
						text: "一年级",
						value: "1-0",
						children: [{
								text: "1.1班",
								value: "1-1"
							},
							{
								text: "1.2班",
								value: "1-2"
							}
						]
					},
					{
						text: "二年级",
						value: "2-0",
						children: [{
								text: "2.1班",
								value: "2-1"
							},
							{
								text: "2.2班",
								value: "2-2"
							}
						]
					},
					{
						text: "三年级",
						value: "3-0",
						disable: true
					}
				]
			}
		},
		props: {
			dataList: {
				type: Array,
				default: () => {
					return []
				}
			},
			title: {
				type: String,
				default: () => {
					''
				}
			}
		},
		methods: {
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
			},
			onchange(e) {
				console.log('onchange:', e);
				this.$emit('seachSelect', e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 14px;
		font-weight: bold;
		margin: 20px 0 5px 0;
	}

	.data-pickerview {
		height: 400px;
		border: 1px #e5e5e5 solid;
	}

	.popper__arrow {
		top: -6px;
		left: 50%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}

	.popper__arrow {
		top: -6px;
		left: 50%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #EBEEF5;
	}
</style>