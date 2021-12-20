import axios from 'axios';
import qs from 'qs';

const config = {
  baseURL: import.meta.env.VITE_API_SERVER,
  withCredentials: true,
  transformRequest: [(data) => qs.stringify(data)],
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 301) {
      alert('请先登录');
      return;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log('response error', error);
    return Promise.reject(error);
  },
);

export default {
  get: function (url, config) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, config)
        .then((response) => {
          // 接口不一致 login/status 返回数据最外层是 data，code 在 data 中
          if (response.code === 200 || response.data.code === 200) {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post: function (url, data, config) {
    return new Promise((resolve, reject) => {
      instance
        .post(url + `&timestamp=${Date.now()}`, data, config)
        .then((response) => {
          if (response.code === 200) {
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
