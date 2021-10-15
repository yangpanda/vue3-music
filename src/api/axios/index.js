import instance from './instance.js'

export default {
  get: function (url, config) {
    return new Promise((resolve, reject) => {
      instance.get(url, config)
        .then(response => {
          // 接口不一致 login/status 返回数据最外层是 data，code 在 data 中
          // if (response.code === 200) {
            // if (response.code === 200 || response.data.code === 200) {
            resolve(response)
          // }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  post: function ({url, data, config} = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, data, config)
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