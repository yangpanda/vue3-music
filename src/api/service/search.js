import request from "../axios/index.js";

export const hotDetail = () =>
    request.get('/search/hot/detail')