<template>
  <div class="wrapper">
    <span
      v-if="!logined"
      class="login-button"
      @click="showLoginPanel = !showLoginPanel"
    >
      登录
    </span>
    <div v-if="logined" class="user-info">
      <n-avatar
        :size="30"
        round
        :src="profile.avatarUrl"
        style="cursor: pointer"
      />
      <div class="user-info-drop-button">
        <span style="margin-right: 4px; color: #fff">
          {{ profile.nickname }}
        </span>
        <svg-icon iconName="#icon-triangle-down" size="16" iconColor="#fff" />
      </div>
      <div class="user-info-drop-list shadow">
        <div class="personal">
          <div>
            <div><span>动态</span></div>
            <div><span>关注</span></div>
            <div><span>粉丝</span></div>
          </div>
          <div><span>签到</span></div>
        </div>
        <div class="info-setting list-item">
          <svg-icon iconName="#icon-user-info" size="20"/>
          <span>个人信息设置</span>
        </div>
        <div class="logo-out list-item">
          <svg-icon iconName="#icon-log-out" size="20"/>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showLoginPanel" class="login-panel shadow">
    <form class="form">
      <input type="email" placeholder="邮箱" v-model="email" />
      <input type="password" placeholder="请输入密码" v-model="password" />
      <input type="button" value="登录" @click="login" />
    </form>
  </div>
</template>

<script>
import { login, fetchLoginStatus } from "api/methods.js";

export default {
  name: "Login",
  data() {
    return {
      logined: false,
      showLoginPanel: false,
      email: "",
      password: "",
      profile: {},
    };
  },
  created() {
    this.getLoginStatus();
  },
  watch: {
    logined: "handleLogined",
  },
  methods: {
    async login() {
      const res = await login(this.email, this.password);
      console.log(res);
      if (res.code === 200) {
        this.profile = res.profile;
        this.$store.commit("setAccountId", res.account.id);
        this.logined = true;
      }
    },
    async getLoginStatus() {
      const res = await fetchLoginStatus();
      if (res.data.code === 200) {
        if (res.data.account) {
          this.logined = true;
          this.profile = res.data.profile;
          this.$store.commit("setAccountId", res.data.account.id);
        } else {
          console.log("未登录");
        }
      }
    },
    handleLogined() {
      this.showLoginPanel = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .login-button {
    cursor: pointer;
  }

  .user-info {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 10px;
    align-items: center;
    position: relative;
    height: var(--header-height);

    .user-info-drop-button {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .user-info-drop-list {
      position: absolute;
      top: var(--header-height);
      right: 0;
      background-color: #fff;
      z-index: var(--max-z-index);
      border-radius: 4px;

      .list-item {
        display: flex;
        align-items: center;
        width: 260px;
        height: 42px;
        padding: 0 20px;
        cursor: pointer;
        position: relative;
        margin-top: 5px;
        margin-bottom: 5px;

        span {
          margin-left: 10px;
        }

        &::before {
          content: "";
          position: absolute;
          z-index: auto;
          top: 0;
          bottom: 0;
          left: 5px;
          right: 5px;
          border-radius: 4px;
          background-color: #0000;
          transition: background-color 0.3s;
        }
        &:hover::before {
          background-color: rgba(0, 0, 0, 0.06);
        }
      }
    }
  }
}

.login-panel {
  position: fixed;
  z-index: var(--max-z-index);
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;

  .form {
    display: flex;
    flex-direction: column;
  }
}
</style>