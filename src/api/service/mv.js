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
