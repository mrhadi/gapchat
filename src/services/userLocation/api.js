import axios from '../axios'

const create = () => {
  const updateUserLocation = async userLocation =>
    axios.post('/location', userLocation)

  return { updateUserLocation }
}

export default create
