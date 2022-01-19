<template>
  <div :class="$style.container">
    <the-scrollbar>
      <div :class="$style.wrap">
        <div :class="$style.left">
          <video controls :class="$style.video" :src="url"></video>
        </div>
      </div>
    </the-scrollbar>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import http from '@/api/http';

export default {
  props: {
    id: null,
  },
  setup(props) {
    let url = ref('');

    const getMvUrl = () => {
      http.getMvDetail(props.id).then((res) => (url.value = res));
    };

    onMounted(getMvUrl);

    return {
      url,
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
