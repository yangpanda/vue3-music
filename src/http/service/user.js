import request from '../axios/index.js';
import md5 from 'md5';

export const login = (model) =>
  request.get('/login', {
    params: {
      email: model.email,
      md5_password: md5(model.password),
    },
  });

export const phoneLogin = (model) =>
  request.get('/login/cellphone', {
    params: {
      phone: model.phone,
      password: model.password,
    },
  });

export const getLoginStatus = async () => {
  const res = await request.get(`/login/status`, {
    params: { timestamp: Date.now() },
  });

  return {
    loginStatus: res.data.profile != null,
    profile: res.data.profile,
  };
};

export const getLikedSongs = (uid) => {
  if (uid === undefined) {
    return request.get(`/likelist`);
  } else {
    return request.get(`/likelist?uid=${uid}`);
  }
};

export const logout = async () => {
  const res = await request.get(`/logout`, {
    params: {
      timestamp: Date.now(),
    },
  });

  return res.code === 200;
};

export const getPlayHistory = (uid) =>
  request.get('/user/record', {
    params: {
      uid,
      type: 1,
    },
  });
