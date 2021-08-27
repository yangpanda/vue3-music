<template>
	<div class="container">
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
	</div>
</template>

<script>
import { nextTick, ref, watchPostEffect } from "vue";

import {
  usePlaylistHotTags,
  usePlaylistCat,
  usePlaylistGet,
} from "@/composables/usePlaylist.js";

import CardPlaylist from "@/components/CardPlaylist.vue";
import { NGrid, NGridItem, NMenu, NThing, NPagination, NBadge, NSpin } from "naive-ui";

export default {
  name: "Playlist",
  components: {
    CardPlaylist,
    NGrid,
    NGridItem,
    NMenu,
    NThing,
    NPagination,
    NBadge,
    NSpin,
  },
  inject: ["scrollToTop"],
  setup() {
    const { hotTags, hotTagsMenuOption } = usePlaylistHotTags();
    const { loading, playlists, getPlaylist } = usePlaylistGet();
    const { all, categories } = usePlaylistCat();
    const cat = ref({
      name: "全部歌单",
      hot: false,
      count: "1000",
    });

    const page = ref(1);
    const pageCount = ref(0);
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

    return {
      playlists,
      hotTags,
      hotTagsMenuOption,
      categories,
      all,
      cat,
      page,
      pageCount,
      loading,
    };
  },
  methods: {
    scroll() {
      nextTick(() => {
        this.scrollToTop();
      });
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

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	row-gap: 20px;
}

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
