<template>
  <n-scrollbar>
    <div class="mv-detail-container flex-col-gap-20">
      <div class="mv-detail-left">
        <video controls class="video" :src="data.url"></video>
      </div>
      <div class="mv-detail-recommend"></div>
    </div>
  </n-scrollbar>
</template>

<script>
import * as mv from '@/api/service/mv.js';
import { onMounted, ref } from 'vue';

export default {
  props: {
    id: null,
  },
  setup(props) {
    let data = ref({});

    const getMvData = async () => {
      const res = await mv.getMvDetail(props.id);
      console.log(res);
      if (res.code === 200) {
        data.value = res.data;
      }
    };

    onMounted(getMvData);

    return {
      data,
    };
  },
};
</script>

<style scoped>
.mv-detail-container {
  margin: 0 auto;
  width: 1000px;
  padding: 20px;
}
.mv-detail-left {
  flex-basis: 650px;
}
.mv-detail-recommend {
  flex-grow: 1;
}
.video {
  width: 100%;
}
</style>
