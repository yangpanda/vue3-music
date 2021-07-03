import request from "./request"

export const getBanners =  type =>
  request.get(`/banner?type=${type}`);
