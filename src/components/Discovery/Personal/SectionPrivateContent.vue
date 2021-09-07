<template>
  <the-section title="独家放送" cols="3">
    <template #cards>
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
import { ref } from 'vue'

const contents = ref([])

api.mv.getPrivatecontent(3).then(response => {
    if (response.code === 200) {
      contents.value = response.result;
    }
})
</script>