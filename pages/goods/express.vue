<template>
	<view>
		<lee-logistics ref="lee" :expresssn="expresssn" />
	</view>
</template>

<script>
	import LeeLogistics from '@/components/lee-logistics/lee-logistics.vue'
	export default {
	    components: { LeeLogistics },
		data() {
			return {
				expresssn : "",
			}
		},
		async onLoad(options) {
			this.expresssn = options.expresssn;
			var ref = await this.$refs;
			ref.lee.search(options.express, options.expresssn);
		}
	}
</script>

<style>
</style>
