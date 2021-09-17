import axios from "axios"
import qs from 'qs'

const config = {
  baseURL: '/api',
  withCredentials: true,
  transformRequest: [
    data => qs.stringify(data)
  ]
}

const instance = axios.create(config)

instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(`请求拦截器：${error}`)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    } else if (response.status === 301) {
      console.log('出错了，可能是没登录')
      return
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log('响应拦截器： ', error);
    return Promise.reject(error)
  }
)

export default instance
