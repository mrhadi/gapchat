import React from 'react'
import PropTypes from 'prop-types'
import { AppState } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import BackgroundFetch from 'react-native-background-fetch'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { bugsnagError } from '../../utils/bugsnag'

import { updateUserLocation } from '../../services/userLocation/actions'
import { getUser } from '../../services/user/actions'

let watchID = null
let UPDATE_LOCATION_TIMER = null

class Init extends React.PureComponent {
  static propTypes = {
    userLocation: PropTypes.object,
    user: PropTypes.object,
    updateUserLocation: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
  }

  static defaultProps = {
    userLocation: null,
    user: null
  }

  getCurrentLocation = requestedBy => {
    Geolocation.getCurrentPosition(
      position => {
        if (position.coords) {
          this.handleUpdateLocation(position.coords, requestedBy)
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
        this.getCurrentLocation('BackgroundFetch')
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
    const { userLocation, user } = this.props

    if (user === null || user.data === null) {
      console.log('handleUpdateLocation: no user')
      return
    }
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
    console.log('handleUpdateLocation:', requestedBy)

    const { updateUserLocation: dispatchUpdateUserLocation } = this.props
    dispatchUpdateUserLocation(locationData)
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)

    const { getUser: dispatchGetUser } = this.props
    dispatchGetUser()

    watchID = Geolocation.watchPosition(
      position => {
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
      () => this.getCurrentLocation('Interval'),
      1000 * 30
    )

    this.setupBackgroundFetch()
  }

  componentDidUpdate(prevProps) {
    const { user, userLocation } = this.props
    console.log('Init:', { user: user.data, userLocation: userLocation.data })

    if (!prevProps.user.userVerified && user.userVerified) {
      console.log('User is ready, get the location now ...')
      this.getCurrentLocation('Interval')
    }
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

export const mapStateToProps = ({ userLocation, user }) => ({
  userLocation,
  user
})

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateUserLocation, getUser }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init)
