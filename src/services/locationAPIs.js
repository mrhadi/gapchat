import axios from './axios'

const postLocation = async location => {
  return axios.post('/location', location)
}

export { postLocation }
