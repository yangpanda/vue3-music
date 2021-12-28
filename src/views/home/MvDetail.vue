<template>
  <div :class="$style.container">
    <the-scrollbar>
      <div :class="$style.wrap">
        <div :class="$style.left">
          <video controls :class="$style.video" :src="data.url"></video>
        </div>
      </div>
    </the-scrollbar>
  </div>
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

<style module>
.container {
  padding-top: 50px;
  height: 100%;
}
.wrap {
  margin: 0 auto;
  width: 1000px;
  padding: 20px;
  display: flex;
}
.video {
  width: 650px;
  height: 350px;
}
</style>
