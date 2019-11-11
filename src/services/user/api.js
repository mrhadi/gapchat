import axios from '../axios'

const create = () => {
  const getUser = async () => axios.get('/user')
  const addUser = async user => axios.post('/user', user)
  const updateUser = async user => axios.put('/user', user)

  return { getUser, addUser, updateUser }
}

export default create
