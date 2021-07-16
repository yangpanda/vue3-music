<template>
  <video controls class="video" :src="data.url"></video>
</template>

<script>
import * as mv from '@/api/service/mv.js'
import { onMounted, ref } from 'vue'

export default {
  props: {
    id: null,
  },
  setup(props) {
    let data = ref({})

    const getMvData = async () => {
      const res = await mv.getMvDetail(props.id)
      console.log(res);
      if (res.code === 200) {
        data.value = res.data
      }
    }

    onMounted(getMvData)

    return {
      data
    }
  }
}
</script>

<style>
.video {
  width: 100%;
  height: 100%;
}
</style>
