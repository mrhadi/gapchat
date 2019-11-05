import axios from '../axios'

const create = () => {
  const getUser = async () => axios.get('/user')
  const addUser = async user => axios.post('/user', user)

  return { getUser, addUser }
}

export default create
