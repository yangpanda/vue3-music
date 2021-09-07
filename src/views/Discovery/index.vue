<template>
	<div class="p-5 space-y-5">
		<div class="flex justify-center items-center gap-x-12 text-base">
			<router-link
				v-for="(value, key) in nav"
				:key="key"
				class="flex-shrink-0"
        exact-active-class="font-bold text-lg border-b-2 border-red-500"
				:to="'/discovery/' + key"
				>
        {{ value }}
      </router-link>
		</div>
		<div class="space-y-5 mx-auto w-auto max-w-screen-lg">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
const nav = {
  'personal': '个性推荐',
  'playlist': '歌单',
  'ranking': '排行榜',
  'new-song/top-song': '最新音乐'
}
</script>

<style scoped>
.content {
	min-width: 800px;
	max-width: 1000px;
}
</style>
