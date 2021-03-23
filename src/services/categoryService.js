import { baseUrl } from './utils/config.json'
import http from './httpService'

export default () => http.get(`${baseUrl}/categories`)
