import React from 'react'
import { AppState } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import BackgroundFetch from 'react-native-background-fetch'

import { bugsnagLog, bugsnagError } from '../../utils/bugsnag'
import { updateLocation } from '../../utils/locationAgent'

let watchID = null

class Init extends React.PureComponent {
  getCurrentLocation = () => {
    bugsnagLog('getCurrentLocation', 'AppInit')
    Geolocation.getCurrentPosition(
      position => {
        console.log('getCurrentLocation:', position)
        if (position.coords) {
          this.handleUpdateLocation(position.coords)
        }
      },
      error => {
        bugsnagError(error)
        console.log('getCurrentLocation:', error)
      }
    )
  }

  setupBackgroundFetch = () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        // Android options
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        requiresCharging: false,
        requiresDeviceIdle: false,
        requiresBatteryNotLow: false,
        requiresStorageNotLow: false
      },
      () => {
        bugsnagLog('BackgroundFetch', 'Received BackgroundFetch event')
        console.log('Received background-fetch event')
        this.getCurrentLocation(false)
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
      },
      error => {
        bugsnagError(error)
        console.log('BackgroundFetch failed to start:', error)
      }
    )

    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          bugsnagLog('BackgroundFetch', 'STATUS_RESTRICTED')
          console.log('BackgroundFetch restricted')
          break
        case BackgroundFetch.STATUS_DENIED:
          bugsnagLog('BackgroundFetch', 'STATUS_DENIED')
          console.log('BackgroundFetch denied')
          break
        case BackgroundFetch.STATUS_AVAILABLE:
          bugsnagLog('BackgroundFetch', 'STATUS_AVAILABLE')
          console.log('BackgroundFetch is enabled')
          break
      }
    })
  }

  handleUpdateLocation = coords => {
    console.log('handleUpdateLocation:', coords)
    updateLocation(
      {
        speed: coords.speed,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      null
    )
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)

    watchID = Geolocation.watchPosition(
      position => {
        bugsnagLog('watchPosition')
        console.log('watchPosition:', position)
        if (position.coords) {
          this.handleUpdateLocation(position.coords)
        }
      },
      error => {
        bugsnagError(error)
        console.log('watchPosition:', error)
      },
      { distanceFilter: 10 }
    )

    this.setupBackgroundFetch()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    watchID != null && Geolocation.clearWatch(watchID)
  }

  handleAppStateChange = nextAppState => {
    bugsnagLog('AppState', nextAppState)
    console.log('AppState:', nextAppState)
  }

  render() {
    return null
  }
}

export default Init
