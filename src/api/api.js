const baseURL = 'http://localhost:3000'

let methods = ['get', 'post']
let api = {}
methods.map(method => {
  api[method] = (uri, config) => {
    return new Promise((resolve, reject) => {
      fetch(baseURL + uri, Object.assign(config, { method: `${method}` }))
        .then(response => {
          resolve(response.json())
        })
        .catch(error => {
          reject(`HTTP Error: ${error}`)
        })
    })
  }
})

export default api