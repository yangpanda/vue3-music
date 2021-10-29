import request from "../axios/index.js";

export const hotDetail = () =>
    request.get('/search/hot/detail')

export const search = (type, keywords) =>
    request.get('/search/', {
        params: {
            keywords,
            type,
            limit: 30,
        }
    })