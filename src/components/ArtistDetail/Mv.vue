<template>
  <div :class="$style.mvCardBox">
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

<style module>
.mvCardBox {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: var(--gap-lg);
  column-gap: var(--gap-lg);
}
</style>