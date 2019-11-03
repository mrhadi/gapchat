import { postLocation } from '../services/locationAPIs'
import { bugsnagError } from '../utils/bugsnag'

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
    longitude: location.longitude,
    metaData: location.metaData
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
      bugsnagError(error)
      console.log('postLocation:', error)
    })
}

export { updateLocation }
