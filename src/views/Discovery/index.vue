<template>
	<n-scrollbar ref="scrollbarRef">
		<div ref="contentRef" class="p-5 space-y-5">
			<div class="flex justify-center items-start gap-x-12 text-base">
				<router-link
					v-for="(value, key) in nav"
					:key="key"
					class="flex-shrink-0"
					exact-active-class="font-bold text-lg border-b-2 border-red-500"
					:to="'/discovery/' + key"
				>{{ value }}</router-link>
			</div>
			<div class="space-y-5 mx-auto w-auto max-w-screen-lg">
				<router-view></router-view>
			</div>
		</div>
		<n-back-top v-if="scrollbarRef" :right="20" :bottom="100" :to="contentRef"></n-back-top>
	</n-scrollbar>
</template>

<script setup>
import { provide, ref } from '@vue/runtime-core'
import { NScrollbar, NBackTop } from 'naive-ui'

const nav = {
	'personal': '个性推荐',
	'playlist': '歌单',
	'ranking': '排行榜',
	'artist': '歌手',
	'new-song/top-song': '最新音乐'
}
const scrollbarRef = ref(null)
const contentRef = ref(null)

provide(
	'backToTop',
	(behavior = 'auto') =>
		scrollbarRef.value.scrollTo({
			top: 0,
			bahavior: `${behavior}`
		})
)
</script>