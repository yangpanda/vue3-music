<template>
  <div class="flex justify-between items-center h-14 px-5" style="background-color: #F5F5F5;">
    <div class="flex items-center gap-x-1.5 text-lg cursor-pointer" @click="router.push('/')">
      <svg-icon name="logo" color="#ec4141" />
      <div>网易云音乐</div>
    </div>
    <search-bar />
    <login />
  </div>
</template>

<script setup>
import Login from "@/components/Login.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useRouter } from 'vue-router'

const router = useRouter()
</script>