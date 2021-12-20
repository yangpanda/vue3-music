<template>
  <n-modal v-model:show="showModal">
    <n-card style="width: 400px" content-style="padding: 10;">
      <div :class="$style.container">
        <h2 :class="$style.title">声明</h2>
        <div :class="$style.content">
          {{ statement }}
        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script>
import { NModal } from 'naive-ui';
import { ref } from 'vue';

export default {
  name: 'TheStatement',
  components: {
    NModal,
  },
  setup() {
    const showModal = ref(false);
    const statement = '本站只用于学习交流，不用于任何牟利活动。';

    setTimeout(() => {
      showModal.value = true;
    }, 2000);

    // const isPc = () => {
    //   const platformRegx = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    //   const useragent = navigator.userAgent
    //   if (useragent.match(platformRegx)) {
    //     return false
    //   } else {
    //     return true
    //   }
    // }

    return {
      showModal,
      statement,
      // isPc
    };
  },
};
</script>

<style module>
.title {
  text-align: center;
  margin: 0;
  margin-bottom: 10px;
}
.content {
  text-align: center;
  font-size: 16px;
}
</style>
