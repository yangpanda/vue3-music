import request from '../axios/index.js';

export const getBanners = async (type) => {
  const res = await request.get('/banner', { params: { type } });
  if (res.code === 200) {
    return Promise.resolve(res.banners);
  }
};
