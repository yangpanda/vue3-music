import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import '@/styles/index.scss';

import 'virtual:svg-icons-register';

const app = createApp(App);

app.use(router).mount('#app');
