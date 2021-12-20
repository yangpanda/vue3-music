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
      phone: model.email,
      password: model.password,
    },
  });

export const getLoginStatus = () => request.get(`/login/status`, { params: { timestamp: Date.now() } });

export const loginStatus = () =>
  request.get(`/login/status`, {
    params: { timestamp: Date.now() },
  });

export const getLikedSongs = (uid) => {
  if (uid === undefined) {
    return request.get(`/likelist`);
  } else {
    return request.get(`/likelist?uid=${uid}`);
  }
};

export const logout = () =>
  request.get(`/logout`, {
    params: {
      timestamp: Date.now(),
    },
  });

export const qrKey = () => {
  return request.get(`/login/qr/key`, {
    params: {
      timestamp: Date.now(),
    },
  });
};

export const qrCreate = (key) =>
  request.get('/login/qr/create', {
    params: {
      key,
      timestamp: Date.now(),
      qrimg: true,
    },
  });

export const qrCheck = (key) => {
  return request.get('/login/qr/check', {
    params: {
      key,
      timestamp: Date.now(),
    },
  });
};

export const getPlayHistory = (uid) =>
  request.get('/user/record', {
    params: {
      uid,
      type: 1,
    },
  });
