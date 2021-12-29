<template>
  <n-message-provider>
    <router-view></router-view>
    <the-statement></the-statement>
  </n-message-provider>
</template>

<script>
import TheStatement from './components/TheStatement.vue';
import { NMessageProvider } from 'naive-ui';

export default {
  name: 'App',
  components: {
    TheStatement,
    NMessageProvider,
  },
};
</script>
