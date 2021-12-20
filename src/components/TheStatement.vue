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
import { ref, onMounted } from 'vue';
import cookie from '@/utils/cookie';

export default {
  name: 'TheStatement',
  components: {
    NModal,
  },
  setup() {
    const showModal = ref(false);
    const statement = '本站只用于学习交流，不用于任何牟利活动。';

    const setShowModal = () => {
      const date = new Date(Date.now());
      date.setDate(date.getDate() + 1);

      const name = 'statement';
      if (!cookie.get(name)) {
        cookie.set(name, 'showed', { expires: date });
        setTimeout(() => (showModal.value = true), 2500);
      }
    };

    onMounted(() => setShowModal());

    return {
      showModal,
      statement,
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
