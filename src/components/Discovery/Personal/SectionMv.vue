<template>
  <the-section title="推荐MV" cols="3">
    <template #cards>
      <card-mv
        v-for="(item, index) in mvs"
        :key="index"
        :mv="item"
      />
    </template>
  </the-section>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardMv from "@/components/CardMv.vue"
import api from "@/api/index.js"
import { ref } from 'vue'

const mvs = ref([])

api.mv.getPersonalized().then(response => {
  if (response.code === 200) {
    mvs.value = response.result.slice(0, 3)
  }
})
</script>