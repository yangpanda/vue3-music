<template>
  <div :class="$style.login">
    <div :class="$style.loginBox">
      <n-card hoverable>
        <n-tabs type="line" justify-content="space-evenly">
          <n-tab-pane name="email" tab="邮箱">
            <n-form>
              <n-form-item label="邮箱" label-placement="left">
                <n-input type="email" v-model:value="model.email" placeholder="请输入邮箱" />
              </n-form-item>
              <n-form-item label="密码" label-placement="left">
                <n-input type="password" v-model:value="model.password" placeholder="请输入密码" />
              </n-form-item>
            </n-form>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-tab-pane>
          <n-tab-pane name="qr" tab="二维码" display-directive="if">
            <the-qr></the-qr>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script>
import {
  NCard,
  NForm,
  NFormItem,
  NTabs,
  NTabPane,
  NButton,
  NInput,
} from 'naive-ui'
import TheQr from './components/TheQr.vue'
import api from '@/api/index.js'
import { ref, onBeforeMount } from 'vue'
import { mapState, mapMutations } from '@/lib/lib.js'
import useRouterMethods from '../../composables/router-methods'
import User from '@/model/User.js'

export default {
  components: {
    NCard,
    NForm,
    NFormItem,
    NTabs,
    NTabPane,
    NButton,
    NInput,
    TheQr,
  },
  setup() {
    const errMsg = ref('')
    const model = ref({
      email: null,
      password: null,
    })
    const { toHome } = useRouterMethods()
    const { logined, userinfo } = mapState()
    const { setUserinfo, setLogined } = mapMutations()

    const login = () => {
      api.user.login(model.value).then(res => {
        switch (res.code) {
          case 200:
            setUserinfo(new User(res.profile))
            setLogined(true)
            toHome()
            break
          case 502:
            errMsg.value = res.data.msg ?? res.data.message
            break
          default:
            break
        }
      })
    }

    onBeforeMount(() => {
      if (logined.value && userinfo.value) {
        toHome()
      } else {
        api.user.loginStatus().then(res => {
          if (res.data.profile && res.data.account) {
            setUserinfo(new User(res.data.profile))
            setLogined(true)
            toHome()
          }
        })
      }
    })

    return {
      model,
      login,
    }
  }
}
</script>

<style module>
.login {
  position: relative;
  height: 100%;
  background-image: linear-gradient(#e66465, #9198e5);
}
.loginBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 40rem;
  height: 50rem;
}
</style>