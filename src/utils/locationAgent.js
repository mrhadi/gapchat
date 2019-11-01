import { postLocation } from '../services/locationAPIs'

const agent = { isBusy: false }

const updateLocation = (location, callBack) => {
  /*
  if (agent.isBusy) {
    console.log('isBusy')
    return
  }
  agent.isBusy = true
  */

  postLocation({
    speed: location.speed,
    latitude: location.latitude,
    longitude: location.longitude
  })
    .then(response => {
      // agent.isBusy = false
      if (response && response.data) {
        console.log('postLocation:', response.data)
        if (callBack) callBack(response.data)
      }
    })
    .catch(error => {
      // agent.isBusy = false
      callBack(null)
      console.log('postLocation:', error)
    })
}

export { updateLocation }
