import React from 'react'
import PropTypes from 'prop-types'
import { AppState } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import BackgroundFetch from 'react-native-background-fetch'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { bugsnagError } from '../../utils/bugsnag'
import { updateUserLocation } from '../../services/userLocation/actions'

let watchID = null
let UPDATE_LOCATION_TIMER = null

class Init extends React.PureComponent {
  static propTypes = {
    userLocation: PropTypes.object,
    updateUserLocation: PropTypes.func.isRequired
  }

  static defaultProps = {
    userLocation: null
  }

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('getCurrentLocation')
        if (position.coords) {
          this.handleUpdateLocation(position.coords, 'BackgroundFetch')
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
        console.log('Received background-fetch event')
        this.getCurrentLocation()
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
          console.log('BackgroundFetch restricted')
          break
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied')
          break
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled')
          break
      }
    })
  }

  handleUpdateLocation = (coords, requestedBy) => {
    const { userLocation } = this.props
    if (userLocation.fetchingData) {
      console.log('handleUpdateLocation: fetching data')
      return
    }

    const locationData = {
      speed: coords.speed,
      latitude: coords.latitude,
      longitude: coords.longitude,
      metaData: { requestedBy }
    }
    console.log('handleUpdateLocation')

    const { updateUserLocation: dispatchUpdateUserLocation } = this.props
    dispatchUpdateUserLocation(locationData)
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)

    watchID = Geolocation.watchPosition(
      position => {
        console.log('watchPosition')
        if (position.coords) {
          this.handleUpdateLocation(position.coords, 'WatchPosition')
        }
      },
      error => {
        bugsnagError(error)
        console.log('watchPosition:', error)
      },
      { distanceFilter: 10 }
    )

    UPDATE_LOCATION_TIMER = setInterval(
      () => this.getCurrentLocation(),
      1000 * 30
    )

    this.setupBackgroundFetch()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    watchID != null && Geolocation.clearWatch(watchID)
    clearTimeout(UPDATE_LOCATION_TIMER)
  }

  handleAppStateChange = nextAppState => {
    console.log('AppState:', nextAppState)
  }

  render() {
    return null
  }
}

export const mapStateToProps = ({ userLocation }) => ({
  userLocation
})

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUserLocation }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init)
