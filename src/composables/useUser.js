import * as user from "@/api/service/user.js";
import { useStore } from "vuex";
import { computed, onMounted, watch, ref } from "vue";
import User from '@/model/User.js'

export function useUserLogin() {
  const showLoginPanel = ref(false);

  const store = useStore();

  const loginStatus = computed(() => store.getters.isLogined)
  const userinfo = computed(() => store.getters.getUserinfo)

  const setLoginStatus = (status) => store.commit('setLoginStatus', status)
  const setUserinfo = (user) => store.commit('setUserinfo', user)
  const setLikedSongList = (set) => store.commit('setLikedSongList', set)

  const getLoginStatus = async () => {
    const res = await user.getLoginStatus()
    if (res.data.code === 200) {
      if (res.data.profile) {
        setUserinfo(new User(res.data.profile))
        setLoginStatus(true)
      } else {
        console.log('未登录');
      }
    }
  }

  const login = async (model) => {
    const res = await user.login(model.email, model.password)
    if (res.code === 200) {
      setUserinfo(new User(res.profile))
      setLoginStatus(true)
      showLoginPanel.value = false
    }
  }

  const logout = async () => {
    const res = await user.logout()
    if (res.code === 200) {
      setUserinfo(null)
      setLoginStatus(false)
    }
  }

  const getLikedSongs = async () => {
    const res = await user.getLikedSongs()
    if (res.code === 200) {
      setLikedSongList(new Set(res.ids))
    }
  }

  onMounted(getLoginStatus)

  watch(() => loginStatus.value, () => {
    if (loginStatus.value) {
      getLikedSongs()
    } else {
      setLoginStatus(false)
    }
  })

  return {
    showLoginPanel,
    userinfo,
    loginStatus,
    login,
    logout,
  }
}
