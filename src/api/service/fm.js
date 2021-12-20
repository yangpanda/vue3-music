import request from '../axios/index.js';

export const getFm = () =>
  request.get('/personal_fm', {
    params: {
      timestamp: Date.now(),
    },
  });
