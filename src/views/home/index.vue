<template>
	<n-loading-bar-provider>
		<div :class="$style.wrap">
			<div :class="$style.header">
				<app-header />
			</div>
			<router-view></router-view>
		</div>
	</n-loading-bar-provider>
</template>

<script>
import AppHeader from "./components/AppHeader.vue"
import { NLoadingBarProvider } from 'naive-ui'

export default {
	components: {
		AppHeader,
		NLoadingBarProvider,
	},
};
</script>

<style module>
.wrap {
	position: relative;
	z-index: 0;
	height: 100%;
}

.header {
	position: absolute;
	z-index: 10;
	left: 0;
	top: 0;
	width: 100%;
	height: 5rem;
	border-bottom: 1px solid lightgray;
}
</style>
