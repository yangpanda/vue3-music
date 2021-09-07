<template>
	<div class="flex justify-between items-center">
    <div>全部歌单</div>
		<the-nav>
			<nav-item v-for="(tag, index) in hotTags" :key="index" isActive>{{ tag.name }}</nav-item>
		</the-nav>
	</div>
</template>

<script setup>
import TheNav from '@/components/Common/Nav/TheNav.vue'
import NavItem from '@/components/Common/Nav/NavItem.vue'

import { ref } from "vue";
import api from "@/api/index.js";

const hotTags = ref([]);

api.playlist.getHotTags().then((response) => {
  if (response.code === 200) {
    hotTags.value = response.tags;
  }
});

</script>