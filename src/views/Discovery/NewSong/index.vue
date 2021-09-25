<template>
  <div class="flex flex-col justify-center">
    <div class="border rounded-full mx-auto">
      <router-link
        class="inline-block px-5 py-1 rounded-full"
        active-class="bg-gray-400 text-white"
        to="/discovery/new-song/top-song/"
      >新歌速递</router-link>
      <router-link
        class="inline-block px-5 py-1 rounded-full"
        active-class="bg-gray-400 text-white"
        to="/discovery/new-song/top-album"
      >新碟上架</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>