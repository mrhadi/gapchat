import axios from 'axios'
import { API } from '../constants'
import { deviceUniqueID } from '../utils/deviceInfo'
import { bugsnagError } from '../utils/bugsnag'

const instance = axios.create({
  baseURL: API,
  timeout: 3000
})

instance.defaults.headers.common['device-id'] = deviceUniqueID

instance.interceptors.response.use(
  response => response,
  error => {
    bugsnagError(error)
    if (error.response && error.response.data) {
      console.log('Error:', error.response.data)
    } else {
      console.log('Error:', error)
    }

    return error
  }
)

export default instance
