import axios from 'axios'

axios.defaults.baseURL = 'https://result.eolinker.com/5lGQ5q58bc83eeba743beda75530bd3665cb7ade7e8c9d6?'
const ERR_OK = 200

export function get (url) {
  return function (params = {}) {
    return axios.get(url, { params })
      .then(res => {
        const data = res.data
        if (res.status === ERR_OK) {
          return data
        }
      }).catch(err => {
      })
  }
}
