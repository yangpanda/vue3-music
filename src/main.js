import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store';
import naive from 'naive-ui';

import VueLazyload from '@jambonn/vue-lazyload';
import 'virtual:svg-icons-register';

import '@/styles/index.css';
import '@/styles/common.css';

import SvgIcon from '@/components/SvgIcon.vue';
import TheImage from '@/components/TheImage.vue';
import SvgButton from '@/components/SvgButton.vue';
import TheLink from '@/components/TheLink.vue';
import TheScrollbar from '@/components/TheScrollbar.vue';

const app = createApp(App);

const myComponents = {
  SvgIcon: SvgIcon,
  TheImage: TheImage,
  SvgButton: SvgButton,
  TheLink: TheLink,
  TheScrollbar: TheScrollbar,
};

for (let key in myComponents) {
  app.component(key, myComponents[key]);
}

app
  .use(VueLazyload, {
    preLoad: 1.3,
    attempt: 3,
  })
  .use(naive)
  .use(store)
  .use(router)
  .mount('#app');
