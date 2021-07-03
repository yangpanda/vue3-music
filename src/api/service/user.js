import request from "./request";

export const login = (email, password) =>
  request.get(`/login/email?email=${email}&password=${password}`);

export const getLoginStatus = () =>
  request.get(`/login/status`, {
    params: {
      timestamp: Date.now()
    }
  })
