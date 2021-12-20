import request from '../axios/index.js';

export const getBanners = (type) => request.get(`/banner?type=${type}`);
