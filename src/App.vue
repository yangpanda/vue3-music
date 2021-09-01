<template>
	<n-loading-bar-provider>
		<n-layout position="absolute">
			<n-layout-header bordered class="header">
				<div class="ui-logo">
					<svg-icon
						iconName="#icon-logo"
						iconColor="#ec4141"
						container
						style="margin-right: 5px"
					/>
					<span class="title">网易云音乐</span>
				</div>
				<search-bar />
				<login />
			</n-layout-header>
			<n-layout
				class="center"
				has-sider
				position="absolute"
				style="top: 56px; bottom: 70px"
			>
				<n-layout-sider
					class="sidebar"
					bordered
					:native-scrollbar="false"
					width="fit-content"
				>
					<the-sidebar />
				</n-layout-sider>
				<n-layout-content :native-scrollbar="false" ref="content">
					<router-view :key="$route.fullPath"></router-view>
					<n-back-top :right="40" :bottom="90"></n-back-top>
				</n-layout-content>
			</n-layout>
			<n-layout-footer position="absolute">
				<the-player />
			</n-layout-footer>
		</n-layout>
	</n-loading-bar-provider>
</template>

<script>
import Login from "@/components/Login.vue";
import SearchBar from "@/components/SearchBar.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import ThePlayer from "@/components/ThePlayer.vue";
import { NLoadingBarProvider } from 'naive-ui'

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
    Login,
    SearchBar,
    NLoadingBarProvider,
  },
  setup() {
    const content = ref(null)
    onMounted(() => {
      provide('scrollTop', computed(() => content.value.scrollTop))
      provide('clientHeight', computed(() => content.value.clientHeight))
    })

    return {
      content
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

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	height: 56px;

	.ui-logo {
		display: flex;
		align-items: center;
		font-size: 18px;
		cursor: pointer;
	}
}
</style>
