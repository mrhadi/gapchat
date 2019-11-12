import axios from 'axios'
import { API } from '../constants'
import { deviceUniqueID } from '../utils/deviceInfo'

const instance = axios.create({
  baseURL: API,
  timeout: 10000
})

instance.defaults.headers.common['device-id'] = deviceUniqueID

instance.interceptors.request.use(config => config, error => error)

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      console.log('axios:', error.response.data)
    } else {
      console.log('axios:', error)
    }

    return error
  }
)

export default instance
