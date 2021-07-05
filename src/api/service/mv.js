import request from "./request";

export const getPrivatecontent = (limit = 60, offset = 0) => {
  if (limit === undefined || offset === undefined) {
    return request.get(`/personalized/privatecontent`);
  } else {
    return request.get(`/personalized/privatecontent/list?limit=${limit}&offset=${offset}`);
  }
}

export const getPersonalizedMv = () =>
  request.get(`/personalized/mv`)

export const getNewMv = (limit) => {
  if (limit === undefined) {
    return request.get(`/mv/first`);
  } else {
    return request.get(`/mv/first?limit=${limit}`);
  }
}

export const getNeteaseMv = (limit, offset = 0) => {
  if (limit === undefined) {
    return request.get(`/mv/exclusive/rcmd`)
  } else {
    return request.get(`/mv/exclusive/rcmd?limit=${limit}&offset=${offset}`)
  }
}
