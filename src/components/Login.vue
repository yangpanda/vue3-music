<template>
  <div class="wrapper">
    <n-button
      text
      v-if="!loginStatus"
      @click="showLoginPanel = !showLoginPanel"
    >
      登录
    </n-button>
    <div v-else class="user-info">
      <n-avatar
        :size="30"
        round
        :src="userinfo.avatar"
        style="cursor: pointer"
      />
      <n-popover trigger="click" placement="bottom-end" style="width: 300px">
        <template #trigger>
          <n-button text icon-placement="right">
            <template #icon>
              <n-icon> </n-icon>
            </template>
            {{ userinfo.nickname }}
          </n-button>
        </template>
        <div class="dropdown">
          <div>个人信息设置</div>
          <div @click="logout">退出登录</div>
        </div>
      </n-popover>
    </div>
  </div>
  <n-modal class="login-panel" v-model:show="showLoginPanel">
    <n-card style="width: 400px; height: 600px;">
      <n-tabs default-value="email" type="line" justify-content="space-evenly">
        <n-tab-pane name="email" tab="邮箱">
          <n-form :model="model">
            <n-form-item-row path="email" label="邮箱">
              <n-input type="email" placeholder="邮箱" v-model:value="email" />
            </n-form-item-row>
            <n-form-item-row path="password" label="密码">
              <n-input
                type="password"
                show-password-toggle
                placeholder="密码"
                label="密码"
                v-model:value="password"
              />
            </n-form-item-row>
            <n-button type="primary" block @click="login(model)">登录</n-button>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="phone" tab="手机">
          <n-form :model="model">
            <n-form-item-row path="email" label="邮箱">
              <n-input type="email" placeholder="邮箱" v-model:value="email" />
            </n-form-item-row>
            <n-form-item-row path="password" label="密码">
              <n-input
                type="password"
                show-password-toggle
                placeholder="密码"
                label="密码"
                v-model:value="password"
              />
            </n-form-item-row>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="qr" tab="二维码"></n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>

<script>
import { useUserLogin } from "@/composables/useUser.js";
import {
  NModal,
  NForm,
  NFormItemRow,
  NInput,
  NMenu,
  NTabs,
  NTabPane,
  NCard,
} from "naive-ui";
import { ref } from "vue";

export default {
  name: "Login",
  components: {
    NModal,
    NForm,
    NFormItemRow,
    NInput,
    NMenu,
    NTabs,
    NTabPane,
    NCard,
  },
  setup() {
    const { showLoginPanel, userinfo, loginStatus, login, logout } =
      useUserLogin();

    const modelRef = ref({
      email: null,
      password: null,
    });

    return {
      model: modelRef,
      showLoginPanel,
      userinfo,
      loginStatus,
      login,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>
