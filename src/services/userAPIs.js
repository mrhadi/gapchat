import axios from './axios'

const addUser = async user => {
  return axios.post('/user', user)
}

export { addUser }
