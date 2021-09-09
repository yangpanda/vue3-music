<template>
  <the-section title="独家放送" cols="3">
    <template #cards v-if="loading">
      <skeleton v-for="index in 3">
        <div class="space-y-2">
          <div class="bg-gray-200 pt-9/16 rounded-lg"></div>
          <div class="bg-gray-200 h-4 w-3/4 rounded"></div>
        </div>
      </skeleton>
    </template>
    <template #cards v-else>
      <card-private-content
        v-for="(item, index) in contents"
        :key="index"
        :content="item"
      />
    </template>
  </the-section>
</template>

<script setup>
import TheSection from "@/components/TheSection.vue";
import CardPrivateContent from './CardPrivateContent.vue'
import api from '@/api/index.js'
import { ref, watch } from 'vue'
import Skeleton from "../../Common/Skeleton.vue";

const contents = ref([])
const loading = ref(true)
watch(
  () => contents.value,
  () => loading.value = false
)

api.mv.getPrivatecontent(3).then(response => {
    if (response.code === 200) {
      contents.value = response.result;
    }
})
</script>