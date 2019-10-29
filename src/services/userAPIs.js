import axios from './axios'

const addUser = async user => {
  return axios.post('/user', user)
}

const getUser = async user => {
  return axios.get('/user', user)
}

export { addUser, getUser }
