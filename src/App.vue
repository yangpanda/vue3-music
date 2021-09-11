<template>
	<n-loading-bar-provider>
		<div class="relative w-screen h-screen z-0">
			<div class="absolute left-0 top-0 w-full border-b z-20">
				<app-header />
			</div>
			<div id="app-content" class="absolute top-14 bottom-0 w-full z-10">
				<router-view></router-view>
			</div>
		</div>
	</n-loading-bar-provider>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"
import TheSidebar from "@/components/TheSidebar.vue";
import ThePlayer from "@/components/ThePlayer.vue";

import { NLoadingBarProvider } from 'naive-ui'
import { mapState } from '@/lib/lib.js'

import {
	NLayout,
	NLayoutHeader,
	NLayoutSider,
	NLayoutContent,
	NLayoutFooter,
	NBackTop,
} from "naive-ui";
import { ref, computed, provide, onMounted } from "@vue/runtime-core";


export default {
	components: {
		TheSidebar,
		ThePlayer,
		NLayout,
		NLayoutHeader,
		NLayoutSider,
		NLayoutContent,
		NLayoutFooter,
		NBackTop,
		NLoadingBarProvider,
		AppHeader
	},
	setup() {
		const { showPlayingPage } = mapState()

		const content = ref(null)
		onMounted(() => {
			provide('scrollTop', computed(() => content.value.scrollTop))
			provide('clientHeight', computed(() => content.value.clientHeight))
		})

		return {
			content,
			showPlayingPage
		}
	},
	provide() {
		return {
			scrollToTop: this.scrollToTop,
			scrollTop: this.scrollTop,
			clientHeight: this.clientHeight
		};
	},
	methods: {
		scrollToTop() {
			this.$refs.content.scrollTo({ top: 0, behavior: "auto" });
		},
	},
};
</script>

<style scoped>
</style>
