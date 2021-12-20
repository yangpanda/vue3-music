<template>
  <router-view></router-view>
  <the-statement></the-statement>
</template>

<script>
import TheStatement from './components/TheStatement.vue';

export default {
  name: 'App',
  components: {
    TheStatement,
  },
};
</script>
