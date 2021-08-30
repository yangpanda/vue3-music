import request from "../axios/index.js";

export const login = (email, password) =>
  request.get(`/login?email=${email}&password=${password}`);

export const getLoginStatus = () =>
  request.get(`/login/status`, {
    params: {
      timestamp: Date.now()
    }
  })

// export const getLoginStatus = () =>
//   request.get(`/login/status`)


export const getLikedSongs = (uid) => {
  if (uid === undefined) {
    return request.get(`/likelist`)
  } else {
    return request.get(`/likelist?uid=${uid}`)
  }
}

export const logout = () =>
  request.get(`/logout`, {
    params: {
      timestamp: Date.now()
    }
  })
