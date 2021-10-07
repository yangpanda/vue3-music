<template>
	<div :class="$style.tabArtist">
		<div :class="$style.header">
			<nav :class="$style.nav">
				<span :class="$style.navTitle">语种：</span>
				<span
					v-for="(item, index) in languages.entries()"
					:key="index"
					:class="[$style.navItem, area === item[0] ? $style.selected : '']"
					@click="area = item[0]"
				>{{ item[1] }}</span>
			</nav>
			<nav :class="$style.nav">
				<span :class="$style.navTitle">分类：</span>
				<span
					:class="[$style.navItem, type === item[0] ? $style.selected : '']"
					v-for="(item, index) in categories.entries()"
					:key="index"
					@click="type = item[0]"
				>{{ item[1] }}</span>
			</nav>
			<nav :class="$style.nav">
				<span :class="$style.navTitle">筛选：</span>
				<div :class="$style.navItemBox">
					<span :class="[$style.navItem, 'initial == -1' ? $style.selected : '']" @click="initial = -1">热门</span>
					<span
						:class="[$style.navItem, initial === item[0] ? $style.selected : '']"
						v-for="(item, index) in alphabet"
						:key="index"
						@click="initial = item"
					>{{ item }}</span>
					<span :class="[$style.navItem, 'initial == -1' ? $style.selected : '']" @click="initial = 0">#</span>
				</div>
			</nav>
		</div>
		<div :class="$style.content">
			<card-artist v-for="(item, index) in artists" :key="index" :artist="item" />
		</div>
	</div>
</template>

<script>
import api from "@/api/index.js";
import { shallowReactive, ref, watchEffect, toRefs } from "vue";
import Artist from "@/model/Artist.js";
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

<style module>
.tabArtist {
	display: flex;
	flex-direction: column;
	row-gap: var(--gap-lg);
}
.header {
	display: flex;
	flex-direction: column;
	row-gap: var(--gap-sm);
}
.nav {
	display: flex;
	column-gap: var(--gap-sm);
}
.navTitle {
	white-space: nowrap;
}
.navItem {
	cursor: pointer;
	width: 3em;
	text-align: center;
	padding: 0 10px;
}
.navItemBox {
	display: flex;
	flex-wrap: wrap;
	column-gap: var(--gap-sm);
	row-gap: var(--gap-sm);
}
.selected {
	border: 1px solid rgb(16, 107, 16);
	background-color: rgb(16, 107, 16);
	color: white;
	border-radius: 9999rem;
}
.content {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	row-gap: var(--gap-lg);
	column-gap: var(--gap-lg);
}
</style>
