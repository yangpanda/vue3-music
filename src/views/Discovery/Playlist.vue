<template>
	<div class="nav">
		<n-popover
			display-directive="show"
			trigger="focus"
			placement="bottom-start"
			style="width: 800px"
		>
			<template #trigger>
				<n-button>{{ cat.name }}</n-button>
			</template>
			<n-space vertical>
				<n-thing @mousedown="cat = all" style="cursor: pointer">
					<template #header>{{ all.name }}</template>
				</n-thing>
				<n-thing v-for="(item, index) in categories" :key="index">
					<template #header>{{ item.cat }}</template>
					<n-space>
						<n-badge
							v-for="(subitem, subindex) in item.sub"
							:key="subindex"
							value="火"
							:show="subitem.hot"
						>
							<n-tag
								style="cursor: pointer"
								@mousedown="
									cat = subitem;
									page = 1;
								"
								round
							>
								{{ subitem.name }}
							</n-tag>
						</n-badge>
					</n-space>
				</n-thing>
			</n-space>
		</n-popover>
		<div class="hot-tags">
			<span style="white-space: nowrap">热门标签：</span>
			<n-tag
				v-for="(item, index) in hotTags"
				:key="index"
				checkable
				:checked="cat.name === item"
				@click="changeCat(item)"
			>
				{{ item }}
			</n-tag>
		</div>
	</div>
	<n-grid :class="{ overlay: loading }" :x-gap="20" :y-gap="15" :cols="5">
		<n-grid-item v-for="(item, index) in playlists" :key="index">
			<card-playlist :playlist="item" />
		</n-grid-item>
	</n-grid>
	<n-pagination
		v-model:page="page"
		:page-count="pageCount"
		@update:page="scroll"
		style="justify-content: center"
	/>
</template>

<script setup>
import api from '@/api/index.js'
import { ref, watchPostEffect } from "vue";

import CardPlaylist from "@/components/CardPlaylist.vue";
import { NGrid, NGridItem, NThing, NPagination, NBadge, NSpin, useLoadingBar } from "naive-ui";

const loadingBar = useLoadingBar()
const hotTags = ref([])
const playlists = ref([])
const categories = ref([])
const cat = ref({
  name: "全部歌单",
  hot: false,
  count: "1000",
});
const page = ref(1)
const pageCount = ref(0);

function generateHotTags(data) {

}

function generateCategories(data) {

}

onMounted(() => {
	loadingBar.start()

	axios.all([
		api.playlist.getPlaylistHotTags(),
		api.playlist.getPlaylistCat(),
	]).then(axios.spread((hotgs, cats) => {
		hotTags.value = generateHotTags(hotgs.tags)
		categories.value = generateCategories(cats.categories)

    watchPostEffect(() => {
      const judge = cat.value.count % 50;
      const count = Math.floor(cat.value.count / 50);
      pageCount.value = judge === 0 ? count : count + 1;

      getPlaylist({
        order: "hot",
        cat: cat.value.name,
        offset: page.value * 50,
      });
    });

		loadingBar.finish()
	}))
})


export default {
  name: "Playlist",
  inject: ["scrollToTop"],
  methods: {
    scroll() {
        this.scrollToTop();
    },
    changeCat(name) {
      this.page = 1
      let catArr = [];
      this.categories.forEach((item) => {
        catArr = catArr.concat(item.sub);
      });

      const cat = catArr.find((item) => item.name == name);
      if (cat) {
        this.cat = cat;
      }
    },
  },
};
</script>

<style scoped>
.nav {
	display: flex;
	align-items: center;
	column-gap: 20px;
}

.hot-tags {
	display: flex;
	align-items: center;
	column-gap: 20px;
}
</style>
