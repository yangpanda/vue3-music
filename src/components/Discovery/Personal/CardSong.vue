<template>
		<div class="flex items-center col-gap-10 hover:bg-gray-100 rounded cursor-default p-1">
			<div class="relative z-0">
				<div
					class="flex items-center justify-center absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full w-7 h-7"
				>
					<svg-icon
						iconName="#icon-play-triangle"
						iconColor="#ec4141"
						size="18"
						class="transform translate-x-0.5"
						@click="play(song)"
					/>
				</div>
				<the-image class="pic" :src="song.image + '?param=50y50'" size="50" round="normal" />
			</div>
			<div class="w-0 flex flex-col flex-grow space-y-1">
				<div class="overflow-ellipsis overflow-hidden whitespace-nowrap">{{ song.name }}</div>
				<div
					class="overflow-hidden overflow-ellipsis whitespace-nowrap text-xs cursor-pointer text-gray-400 hover:text-gray-500"
				>{{ song.singer.join(" & ") }}</div>
			</div>
		</div>
</template>

<script setup>
import { mapMutations } from "@/lib/lib.js"

const props = defineProps({
	song: Object
})

const {
	setCurrentSong,
	insertSong
} = mapMutations()

function play(song) {
	setCurrentSong(song)
	insertSong(song)
}
</script>