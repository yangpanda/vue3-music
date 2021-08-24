import axios from "axios"

const config = {
  baseURL: '/api',
  // baseURL: 'http://127.0.0.1:3000',
  withCredentials: true,
}

const instance = axios.create(config)

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    alert('请求超时');
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else if (response.status === 301) {
      alert('请先登录')
      return
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log('response error', error);
    return Promise.reject(error)
  }
)

export default {
  get: function (url, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, config)
        .then(response => {
          // 接口不一致 login/status 返回数据最外层是 data，code 在 data 中
          if (response.code === 200 || response.data.code === 200) {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  post: function (url, data, config) {
    return new Promise((resolve, reject) => {
      instance.post(url + `&timestamp=${Date.now()}`, data, config)
        .then(response => {
          if (response.code === 200) {
            resolve(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
