<template>
	<div class="space-y-3">
		<nav class="nav">
			<span class="nav-title">语种：</span>
			<span
				class="nav-item"
				:class="{ 'nav-item-selected': area === item[0] }"
				v-for="(item, index) in languages.entries()"
				:key="index"
				@click="area = item[0]"
			>{{ item[1] }}</span>
		</nav>
		<nav class="nav">
			<span class="nav-title">分类：</span>
			<span
				class="nav-item"
				:class="{ 'nav-item-selected': type === item[0] }"
				v-for="(item, index) in categories.entries()"
				:key="index"
				@click="type = item[0]"
			>{{ item[1] }}</span>
		</nav>
		<nav class="nav">
			<span class="nav-title">筛选：</span>
			<div class="flex flex-wrap gap-y-2">
				<span class="nav-item" @click="initial = -1" :class="{ selected: initial === -1 }">热门</span>
				<span
					class="nav-item"
					:class="{ 'nav-item-selected': initial === item }"
					v-for="(item, index) in alphabet"
					:key="index"
					@click="initial = item"
				>{{ item }}</span>
				<span class="nav-item" @click="initial = 0" :class="{ selected: initial === 0 }">#</span>
			</div>
		</nav>
		<div class="grid grid-cols-6 gap-5">
			<card-artist 
				v-for="(item, index) in artists"
				:key="index"
				:artist="item"
			></card-artist>
		</div>
	</div>
</template>

<script>
import api from "@/api/index.js";
import { shallowReactive, ref, watchEffect, toRefs } from "vue";
import Artist from "../../model/Artist";
import CardArtist from '@/components/CardArtist.vue'

const languages = new Map([
	[-1, "全部"],
	[7, "华语"],
	[96, "欧美"],
	[16, "韩国"],
	[0, "其他"],
]);

const categories = new Map([
	[-1, "全部"],
	[1, "男歌手"],
	[2, "女歌手"],
	[3, "乐队"],
]);

function generateBigAlphabet() {
	var str = [];
	for (var i = 65; i < 91; i++) {
		str.push(String.fromCharCode(i));
	}
	return str;
}
const alphabet = generateBigAlphabet();

export default {
	name: "Artist",
	components: {
		CardArtist
	},
	setup() {
		const paramsReac = shallowReactive({
			initial: -1,
			area: -1,
			type: -1,
			limit: 30,
			offset: 0,
		});

		const artists = ref([]);

		const getArtist = async (param) => {
			api.artist.getArtist(param).then((response) => {
				if (response.code === 200) {
					console.log(response.artists)
					artists.value.push(...response.artists.map(item => new Artist(item)));
					console.log(artists.value)
				}
			});
		};

		watchEffect(() => {
			getArtist({
				initial: paramsReac.initial,
				area: paramsReac.area,
				type: paramsReac.type,
				limit: paramsReac.limit,
				offset: paramsReac.offset,
			});
		});

		return {
			languages,
			categories,
			alphabet,
			artists,
			...toRefs(paramsReac),
		};
	},
};
</script>

<style scoped>
.nav {
	@apply flex gap-x-3;
}
.nav-title {
	@apply whitespace-nowrap;
}
.nav-item {
	@apply cursor-pointer px-3;
}
.nav-item-selected {
	@apply border border-red-400 bg-red-400 rounded-full;
}
</style>
