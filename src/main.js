import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";

import VueLazyload from '@jambonn/vue-lazyload'
import 'virtual:svg-icons-register'

import "@/styles/index.css";
import "@/styles/common.css";

const app = createApp(App);

import SvgIcon from "@/components/SvgIcon.vue";
import TheImage from "@/components/TheImage.vue"
import Skeleton from "@/components/Common/Skeleton.vue"
import SkeletonItem from "@/components/Common/SkeletonItem.vue"
import TheButton from "@/components/Common/Button/TheButton.vue"
import SvgButton from "@/components/SvgButton.vue"

const myComponents = {
  'SvgIcon': SvgIcon,
  'TheButton': TheButton,
  'TheImage': TheImage,
  'Skeleton': Skeleton,
  'SkeletonItem': SkeletonItem,
  'SvgButton': SvgButton,
}

for (let key in myComponents) {
  app.component(key, myComponents[key])
}

import {
  create,
  NTag,
  NSpace,
  NAvatar,
  NFormItemRow,
  NElement,
  NButton,
  NPopover,
  NIcon,
  NGrid,
  NGridItem,
  NBackTop,
  NScrollbar
} from 'naive-ui'

const naive = create({
  components: [
    NElement,
    NTag,
    NSpace,
    NAvatar,
    NFormItemRow,
    NButton,
    NPopover,
    NIcon,
    NGrid,
    NGridItem,
    NBackTop,
    NScrollbar
  ]
})

app.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 3,
})
  .use(naive)
  .use(store)
  .use(router)
  .mount("#app");
