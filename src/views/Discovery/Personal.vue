<template>
  <swipper></swipper>
  <section-playlist />
  <section-private-content />
  <section-song />
  <section-mv />
</template>

<script setup>
import Swipper from "@/components/Swipper.vue";
import SectionPlaylist from "@/components/Discovery/Personal/SectionPlaylist.vue"
import SectionPrivateContent from "@/components/Discovery/Personal/SectionPrivateContent.vue"
import SectionSong from "@/components/Discovery/Personal/SectionSong.vue"
import SectionMv from "@/components/Discovery/Personal/SectionMv.vue"
</script>
