import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueLazyload from '@jambonn/vue-lazyload'

import "@/styles/variables.scss"
import "@/styles/index.scss";
import "@/styles/common.scss";

import 'virtual:svg-icons-register'

const app = createApp(App);

import SvgIcon from "@/components/SvgIcon.vue";
import TheImage from "@/components/TheImage.vue"
import TheButton from "@/components/TheButton.vue"

app.component("SvgIcon", SvgIcon);
app.component("TheImage", TheImage);
app.component("TheButton", TheButton)

import {
  create,
  NTag,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NSpace,
  NAvatar,
  NFormItemRow,
} from 'naive-ui'

const naive = create({
  components: [
    NTag,
    NLayout,
    NLayoutContent,
    NLayoutHeader,
    NSpace,
    NAvatar,
    NFormItemRow,
  ]
})

app
  .use(VueLazyload)
  .use(naive)
  .use(store)
  .use(router)
  .mount("#app");
