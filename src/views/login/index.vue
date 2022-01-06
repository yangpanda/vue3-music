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
          <n-tab-pane name="phone" tab="手机">
            <n-form>
              <n-form-item label="手机" label-placement="left">
                <n-input type="tel" v-model:value="phoneModel.phone" placeholder="请输入手机号" />
              </n-form-item>
              <n-form-item label="密码" label-placement="left">
                <n-input type="password" v-model:value="phoneModel.password" placeholder="请输入密码" />
              </n-form-item>
            </n-form>
            <n-button type="primary" block @click="phoneLogin">登录</n-button>
          </n-tab-pane>
        </n-tabs>
        <template #footer>请使用网易云音乐账号登录</template>
      </n-card>
    </div>
  </div>
</template>

<script>
import { NCard, NForm, NFormItem, NTabs, NTabPane, NButton, NInput, useMessage } from 'naive-ui';
import api from '@/api/index.js';
import { ref, onBeforeMount } from 'vue';
import useRouterMethods from '../../composables/router-methods';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  components: {
    NCard,
    NForm,
    NFormItem,
    NTabs,
    NTabPane,
    NButton,
    NInput,
  },
  setup() {
    const message = useMessage();
    const errMsg = ref('');
    const model = ref({
      email: null,
      password: null,
    });
    const phoneModel = ref({
      phone: null,
      password: null,
    });
    const { toHome } = useRouterMethods();

    const store = useStore();
    const loginStatus = computed(() => store.state.user.loginStatus);

    const login = () => {
      api.user.login(model.value).then((res) => {
        switch (res.code) {
          case 200:
            toHome();
            break;
          case 502:
            errMsg.value = res.msg ?? res.message;
            message.error(errMsg.value);
            break;
          default:
            break;
        }
      });
    };

    const phoneLogin = () => {
      api.user.phoneLogin(phoneModel.value).then((res) => {
        switch (res.code) {
          case 200:
            toHome();
            break;
          case 502:
            errMsg.value = res.msg ?? res.message;
            message.error(errMsg.value);
            break;
          default:
            break;
        }
      });
    };

    onBeforeMount(() => {
      if (loginStatus.value) {
        toHome();
      } else {
        api.user.getLoginStatus().then((res) => {
          if (res.loginStatus) {
            toHome();
          }
        });
      }
    });

    return {
      model,
      phoneModel,
      login,
      phoneLogin,
    };
  },
};
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
