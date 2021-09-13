<template>
	<n-loading-bar-provider>
		<div class="relative w-screen h-screen z-0">
			<div class="absolute left-0 top-0 w-full border-b z-20">
				<app-header />
			</div>
			<div id="app-content" class="absolute top-14 bottom-0 w-full z-10">
				<router-view></router-view>
			</div>
			<div
				class="absolute left-0 bottom-20 w-full h-0 transition-all duration-500 z-30 bg-white"
				:class="{ 'h-full pt-20 border-b': showPlayingPage }"
			>
				<playing-page></playing-page>
			</div>
		</div>
	</n-loading-bar-provider>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
import { NLoadingBarProvider } from 'naive-ui'
import { mapState } from '@/lib/lib.js'
import PlayingPage from "@/components/PlayingPage/PlayingPage.vue"

export default {
	components: {
		AppHeader,
		PlayingPage,
		NLoadingBarProvider,
	},
	setup() {
		const { showPlayingPage } = mapState()

		return {
			showPlayingPage
		}
	},
};
</script>

<style scoped>
</style>
