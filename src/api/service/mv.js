import request from "../axios/index.js";

export const getPrivatecontent = (limit = 60, offset = 0) => {
  if (limit === undefined || offset === undefined) {
    return request.get(`/personalized/privatecontent`);
  } else {
    return request.get(`/personalized/privatecontent/list?limit=${limit}&offset=${offset}`);
  }
}

export const getPersonalizedMv = () =>
  request.get(`/personalized/mv`)

export const getPersonalized = () =>
  request.get(`/personalized/mv`)

export const getNew = (params) => request.get(`/mv/first`, {params});

export const getNetease = (params) => request.get(`/mv/exclusive/rcmd`, {params})

export const getMvDetail = (id) => {
  return request.get(`/mv/url?id=${id}`)
}

export const getTop = (params) => request.get(`/top/mv`, {params})
