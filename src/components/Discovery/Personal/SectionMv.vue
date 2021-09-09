<template>
  <the-section title="推荐MV" cols="3">
    <template #cards v-if="loading">
      <skeleton v-for="index in 3">
        <div class="space-y-2">
          <div class="bg-gray-200 pt-9/16 rounded"></div>
          <div class="bg-gray-200 h-4 w-3/4 rounded-sm"></div>
        </div>
      </skeleton>
    </template>
    <template #cards v-else>
      <card-mv v-for="(item, index) in mvs" :key="index" :mv="item" />
    </template>
  </the-section>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardMv from "@/components/CardMv.vue"
import api from "@/api/index.js"
import { ref, watch } from 'vue'

const mvs = ref([])
const loading = ref(true)
watch(
  () => mvs.value,
  () => loading.value = false
)

api.mv.getPersonalized().then(response => {
  if (response.code === 200) {
    mvs.value = response.result.slice(0, 3)
  }
})
</script>