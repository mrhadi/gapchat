import { postLocation } from '../services/locationAPIs'

const agent = { isBusy: false }

const updateLocation = location => {
  if (agent.isBusy) {
    console.log('isBusy')
    return
  }
  agent.isBusy = true

  postLocation({
    speed: location.speed,
    latitude: location.latitude,
    longitude: location.longitude
  }).then(response => {
    agent.isBusy = false

    if (response && response.data) {
      console.log(response.data)
    }
  })
}

const isAgentFree = () => !agent.isBusy

export { updateLocation, isAgentFree }
