<template>
  <div :class="$style.qr">
    <the-image :src="qr" size="200" />
  </div>
</template>

<script>
import api from '@/api/index.js'
import { onMounted, ref } from 'vue'
import useRouterMethods from '../../../composables/router-methods'

export default {
  setup() {
    const qr = ref('')
    const { toHome } = useRouterMethods()

    const qrLogin = (key) => {
      let timer
      timer = setInterval(() => {
        api.user.qrCheck(key).then(res => {
          console.log(res)
          switch (res.code) {
            case '800':
              console.log('二维码已过期')
              clearInterval(timer)
              break
            case '801':
              console.log('待扫码')
              break
            case '802':
              console.log('待确认')
              break
            case '803':
              clearInterval(timer)
              console.log('登录成功')
              toHome()
              break
            default:
              break
          }
        })
      }, 3000)
    }
    const createQr = (key) => {
      api.user.qrCreate(key)
        .then(res => {
          if (res.code === 200) {
            qr.value = res.data.qrimg
          }
        })
    }
    const getKey = () => {
      api.user.qrKey()
        .then(res => {
          if (res.code === 200) {
            // key.value = res.data.unikey
            createQr(res.data.unikey)
            qrLogin(res.data.unikey)
          }
        })
    }

    onMounted(() => {
      getKey()
    })

    return {
      qr
    }
  }
}
</script>

<style module>
.qr {
  display: flex;
  justify-content: center;
}
</style>