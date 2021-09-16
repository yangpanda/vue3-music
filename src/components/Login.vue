<template>
  <div class="wrapper">
    <n-button text v-if="!logined" @click="showLoginPanel = !showLoginPanel">登录</n-button>
    <div v-else class="user-info">
      <n-avatar :size="30" round :src="userinfo.avatar" style="cursor: pointer" />
      <n-popover trigger="click" placement="bottom-end" style="width: 300px">
        <template #trigger>
          <div class="flex items-center gap-x-1 cursor-pointer">
            {{ userinfo.nickname }}
            <svg-icon name="arrow-down" size="14" />
          </div>
        </template>
        <div class="dropdown">
          <div>
            <div></div>
            <n-button>签到</n-button>
          </div>
          <div>个人信息设置</div>
          <div @click="logout">退出登录</div>
        </div>
      </n-popover>
    </div>
  </div>
  <n-modal class="login-panel" v-model:show="showLoginPanel">
    <n-card style="width: 400px; height: 600px">
      <n-tabs default-value="email" type="line" justify-content="space-evenly">
        <n-tab-pane name="email" tab="邮箱">
          <n-form :model="model">
            <n-form-item-row path="email" label="邮箱">
              <n-input type="email" placeholder="邮箱" v-model:value="model.email" />
            </n-form-item-row>
            <n-form-item-row path="password" label="密码">
              <n-input
                type="password"
                show-password-toggle
                placeholder="密码"
                label="密码"
                v-model:value="model.password"
              />
            </n-form-item-row>
            <n-button type="primary" block @click="login(model)">登录</n-button>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="phone" tab="手机">
          <n-form :model="model">
            <n-form-item-row path="email" label="邮箱">
              <n-input type="email" placeholder="邮箱" v-model:value="model.email" />
            </n-form-item-row>
            <n-form-item-row path="password" label="密码">
              <n-input
                type="password"
                show-password-toggle
                placeholder="密码"
                label="密码"
                v-model:value="model.password"
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

<script setup>
import {
  NModal,
  NForm,
  NFormItemRow,
  NInput,
  NTabs,
  NTabPane,
  NCard,
} from "naive-ui";
import { ref, watch, onMounted } from "vue";
import { mapState, mapMutations } from "@/lib/lib.js"
import api from "@/api/index.js"
import User from "@/model/User.js"
import Playlist from "../model/Playlist";

const showLoginPanel = ref(false)
const { userinfo, logined } = mapState()
const { setUserinfo, setLogined, setLikedSongs, setUserPlaylists } = mapMutations()

const login = async (model) => {
  const res = await api.user.login(model.email, model.password)
  if (res.code === 200) {
    console.log(res)
    setUserinfo(new User(res.profile))
    setLogined(true)
    showLoginPanel.value = false
  }
}

const logout = async () => {
  const res = await api.user.logout()
  if (res.code === 200) {
    setUserinfo(null)
    setLogined(false)
    setUserPlaylists(null)
  }
}

const getLikedSongs = async () => {
  const res = await api.user.getLikedSongs()
  if (res.code === 200) {
    setLikedSongs(new Set(res.ids))
  }
}

const getUserPlaylists = () => {
  api.playlist.getUserPlaylists(userinfo.value.id).then(response => {
    if (response.code === 200) {
      setUserPlaylists(response.playlist.map(item => new Playlist(item)))
    }
  })
}

watch(
  () => logined.value,
  () => {
  if (logined.value) {
    getLikedSongs()
    getUserPlaylists()
  } else {
    setLogined(false)
  }
})

const getLoginStatus = async () => {
  const res = await api.user.getLoginStatus()
  if (res.data.code === 200) {
    if (res.data.profile) {
      setUserinfo(new User(res.data.profile))
      setLogined(true)
    } else {
      console.log('未登录');
    }
  }
}

onMounted(getLoginStatus)

const model = ref({
  email: null,
  password: null,
});
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>
