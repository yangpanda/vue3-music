<template>
  <div class="grid lg:grid-cols-3 xl:grid-cols-5 gap-5 mx-auto">
    <card-mv v-for="item in mvs" :mv="item"></card-mv>
  </div>
</template>

<script>
import CardMv from '@/components/CardMv.vue'
import api from '@/api/index.js'
import { ref } from 'vue'

export default {
  props: {
    id: ''
  },
  components: {
    CardMv,
  },
  setup(props) {
    const mvs = ref([])
    api.artist.getMv(props.id)
      .then(response => {
        if (response.code === 200) {
          mvs.value = response.mvs
          console.log(response.mvs)
        }
      })

    return {
      mvs
    }
  }
}
</script>