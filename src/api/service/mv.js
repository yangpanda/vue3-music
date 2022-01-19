import request from '../axios/index.js';
import Mv from '@/model/Mv';
import { RankMv } from '@/model/Mv.js';

export const getPersonalizedMvs = async () => {
  const res = await request.get(`/personalized/mv`);
  if (res.code === 200) {
    return Promise.resolve(res.result.slice(0, 3).map((item) => new Mv(item)));
  }
};

export const getNewMvs = async (params) => {
  const res = await request.get('/mv/first', { params });
  if (res.code === 200) {
    return Promise.resolve(res.data.map((item) => new Mv(item)));
  }
};

export const getNeteaseMvs = async (params) => {
  const res = await request.get(`/mv/exclusive/rcmd`, { params });
  if (res.code === 200) {
    return Promise.resolve(res.data.map((item) => new Mv(item)));
  }
};

export const getTopMvs = async (params) => {
  const res = await request.get(`/top/mv`, { params });
  if (res.code === 200) {
    return Promise.resolve(res.data.map((item) => new RankMv(item)));
  }
};

export const getMvDetail = async (id) => {
  const res = await request.get(`/mv/url?id=${id}`);
  if (res.code === 200) {
    return Promise.resolve(res.data.url);
  }
};

export const getAllMv = async (params) => {
  const res = await request.get('/mv/all', { params });
  console.log(res);
  if (res.code === 200) {
    return Promise.resolve({
      hasMore: res.hasMore,
      mvs: res.data.map((item) => new Mv(item)),
    });
  }
};
