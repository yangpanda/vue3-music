<template>
  <div :class="$style.headerWrap">
    <div :class="$style.homeBtn" @click="toHome">
      <svg width="32" height="32">
        <use xlink:href="#icon-logo" />
      </svg>
      <div>蜗牛音乐</div>
    </div>
    <search-bar />
    <div>
      <n-button text v-if="!logined" @click="toLogin">登录</n-button>
      <div v-else :class="$style.userInfo">
        <n-avatar :size="30" round :src="userinfo.avatar" />
        <n-popover trigger="click" placement="bottom-end" style="width: 300px">
          <template #trigger>
            <div :class="$style.userName">
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
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import SearchBar from "@/components/SearchBar.vue";
import useRouterMethods from '@/composables/router-methods.js'
import { mapState, mapMutations } from "@/lib/lib.js"
import { onMounted } from "vue";
import api from '@/api/index.js'
import User from '@/model/User.js'

export default {
  name: 'AppHeader',
  components: {
    Login,
    SearchBar,
  },
  setup() {
    const { userinfo, logined } = mapState()
    const { setUserinfo, setLogined } = mapMutations()
    const {
      toHome,
      toLogin,
    } = useRouterMethods();

    const checkLoginStatus = () => {
      api.user.loginStatus().then(res => {
        if (res.data.profile && res.data.account) {
          setUserinfo(new User(res.data.profile))
          setLogined(true)
        }
      })
    }

    const logout = async () => {
      const res = await api.user.logout()
      if (res.code === 200) {
        setUserinfo(null)
        setLogined(false)
      }
    }

    onMounted(() => {
      if (!logined.value) {
        checkLoginStatus()
      }
    })

    return {
      userinfo,
      logined,
      toHome,
      toLogin,
      logout,
    }
  }
}
</script>

<style module>
.headerWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
  background-color: #f5f5f5;
}
.homeBtn {
  display: flex;
  align-items: center;
  column-gap: 0.6rem;
  cursor: pointer;
  font-size: 1.8rem;
}
.userInfo {
  display: flex;
  align-items: center;
  column-gap: var(--gap-sm);
}
.userName {
  display: flex;
  align-items: center;
  column-gap: var(--gap-sm);
  cursor: pointer;
}
</style>