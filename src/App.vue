<template>
  <n-message-provider>
    <router-view></router-view>
    <the-statement></the-statement>
  </n-message-provider>
</template>

<script>
export default {
  name: 'App',
};
</script>

<script setup>
import TheStatement from '@/components/TheStatement.vue';
import { NMessageProvider } from 'naive-ui';
</script>
