<template>
	<div :class="$style.discovery">
		<div :class="$style.tabBox">
			<n-tag
				checkable
				v-for="tab in tabs"
				@click="currentTab = tab"
				:checked="currentTab === tab"
			>{{ tab.name }}</n-tag>
		</div>
		<div :class="$style.content">
			<n-scrollbar ref="scrollbarRef">
				<div :class="$style.componentBox">
					<component :is="currentTab.component"></component>
				</div>
				<n-back-top v-if="scrollbarRef" :right="20" :bottom="100" :to="backtopRef"></n-back-top>
			</n-scrollbar>
		</div>
		<div :class="$style.backtopContainer" ref="backtopRef"></div>
	</div>
</template>

<script>
import { NScrollbar, NBackTop, NTag } from 'naive-ui'
import TabPersonal from './TabPersonal.vue'
import TabPlaylist from './TabPlaylist.vue'
import TabArtist from './TabArtist.vue'
import TabRank from './TabRank.vue'
import TabNewsong from './TabNewsong/index.vue'
import { ref, provide, shallowRef } from 'vue'

const tabs = [
	{
		name: '个性推荐',
		component: shallowRef(TabPersonal),
	},
	{
		name: '歌单',
		component: TabPlaylist,
	},
	{
		name: '排行榜',
		component: TabRank,
	},
	{
		name: '歌手',
		component: TabArtist,
	},
	{
		name: '最新音乐',
		component: TabNewsong,
	}
]

export default {
	components: {
		NScrollbar,
		NBackTop,
		NTag,
	},
	data() {
		return {
			tabs,
			currentTab: tabs[0],
		}
	},
	setup() {
		const scrollbarRef = ref(null)
		const backtopRef = ref(null)

		provide(
			'backToTop',
			(behavior = 'auto') =>
				scrollbarRef.value.scrollTo({
					top: 0,
					bahavior: `${behavior}`
				})
		)

		return {
			scrollbarRef,
			backtopRef,
		}
	}
}
</script>

<style module>
.discovery {
	width: 100%;
	height: 100%;
	padding: 2rem 0;
}
.tabBox {
	display: flex;
	justify-content: center;
	column-gap: var(--gap-lg);
	height: 3rem;
	margin-bottom: 2rem;
}
.content {
	height: calc(100% - 3rem);
}
.componentBox {
	max-width: 110rem;
	margin: 0 auto;
	padding: 0 2rem 2rem;
}
.backtopContainer {
	width: 0;
	height: 0;
}
</style>