import axios from './axios'

const addUser = async user => {
  return axios.post('/user', user)
}

const getUser = async () => {
  return axios.get('/user')
}

export { addUser, getUser }
