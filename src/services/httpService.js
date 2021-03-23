import axios from 'axios'
import { auth } from './utils/config.json'

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500

  if (!expectedError) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return Promise.reject(error)
})

function setAuth() {
  axios.defaults.headers.common.Authorization = auth
}

setAuth()

export default {
  get: axios.get,
  delete: axios.delete,
  put: axios.put,
  post: axios.post,
}
