<template>
  <n-modal :show="showModal">
    <n-card style="width: 400px" content-style="padding: 10;">
      <div :class="$style.container">
        <h2 :class="$style.title">声明</h2>
        <div :class="$style.content" v-html="statement"></div>
      </div>
      <template #action>
        <div :class="$style.btn">
          <n-button @click="() => (showModal = false)">关闭</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script>
import { NModal, NCard, NButton } from 'naive-ui';
import { ref, onMounted } from 'vue';
import cookie from '@/utils/cookie';

export default {
  name: 'TheStatement',
  components: {
    NModal,
    NCard,
    NButton,
  },
  setup() {
    const showModal = ref(false);
    const statement =
      '本站只用于学习交流，不用于任何牟利活动。</br></br>本站未适配移动端和老旧浏览器，如果您看到的界面比较混乱，请使用最新版 chrome、microsoft edge、firefox 等 PC 端浏览器访问。';

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
.btn {
  display: flex;
  justify-content: center;
}
</style>
