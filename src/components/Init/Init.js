import React from 'react'
import PropTypes from 'prop-types'
import { AppState, PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import BackgroundFetch from 'react-native-background-fetch'
import { showMessage } from 'react-native-flash-message'
import NetInfo from '@react-native-community/netinfo'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  updateUserLocation,
  setLocation
} from '../../services/userLocation/actions'
import { getUser } from '../../services/user/actions'

import colors from '../../styles/colors'
import logger from '../../utils/logger'

let watchID = null
// let UPDATE_LOCATION_TIMER = null
let netInfoUnsubscribe = null

class Init extends React.PureComponent {
  static propTypes = {
    userLocation: PropTypes.object,
    user: PropTypes.object,
    updateUserLocation: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
  }

  static defaultProps = {
    userLocation: null,
    user: null
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'I need your location mate!',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location')
      } else {
        console.log('Location permission denied')
      }
    } catch (err) {
      console.log(err)
    }
  }

  getCurrentLocation = requestedBy => {
    Geolocation.getCurrentPosition(
      position => {
        if (position.coords) {
          const { setLocation: dispatchSetLocation } = this.props
          dispatchSetLocation({ coords: position.coords, requestedBy })
        }
      },
      error => {
        logger.log('getCurrentLocation:', error)
      }
    )
  }

  setupBackgroundFetch = () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 30,
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
        logger.log('Received background-fetch event')
        this.getCurrentLocation('BackgroundFetch')
        BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
      },
      error => {
        logger.log('BackgroundFetch failed to start:', error)
      }
    )

    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          logger.log('BackgroundFetch restricted')
          break
        case BackgroundFetch.STATUS_DENIED:
          logger.log('BackgroundFetch denied')
          break
        case BackgroundFetch.STATUS_AVAILABLE:
          logger.log('BackgroundFetch is enabled')
          break
      }
    })
  }

  handleUpdateLocation = () => {
    const { userLocation, user } = this.props

    if (user.data === null) {
      logger.log('handleUpdateLocation: no user')
      return
    }
    if (!user.data.active) {
      logger.log('handleUpdateLocation: user is not active')
      return
    }
    if (userLocation.fetchingData) {
      logger.log('handleUpdateLocation: fetching data')
      return
    }
    if (!userLocation.currentLocation) {
      logger.log('handleUpdateLocation: no currentLocation')
      return
    }

    showMessage({
      message: 'Updating Location ...',
      type: 'info',
      backgroundColor: colors.textViolet
    })

    const locationData = {
      speed: userLocation.currentLocation.coords.speed,
      latitude: userLocation.currentLocation.coords.latitude,
      longitude: userLocation.currentLocation.coords.longitude,
      metaData: { requestedBy: userLocation.currentLocation.requestedBy }
    }
    logger.log(
      'handleUpdateLocation:',
      userLocation.currentLocation.requestedBy
    )

    const { updateUserLocation: dispatchUpdateUserLocation } = this.props
    dispatchUpdateUserLocation(locationData)
  }

  showConnectionMessage = message => {
    showMessage({
      message,
      type: 'info',
      backgroundColor: colors.textViolet
    })
  }

  async componentDidMount() {
    if (Platform.OS !== 'ios') {
      await this.requestLocationPermission()
    }

    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.showConnectionMessage('No internet connection!')
      }
    })

    netInfoUnsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.showConnectionMessage('Internet back online')
      } else {
        this.showConnectionMessage('No internet connection!')
      }
    })

    AppState.addEventListener('change', this.handleAppStateChange)

    const { getUser: dispatchGetUser } = this.props
    dispatchGetUser()

    watchID = Geolocation.watchPosition(
      position => {
        if (position.coords) {
          console.log('WatchPosition')
          const { setLocation: dispatchSetLocation } = this.props
          dispatchSetLocation({
            coords: position.coords,
            requestedBy: 'WatchPosition'
          })
        }
      },
      error => {
        logger.log('watchPosition:', error)
      },
      { distanceFilter: 20 }
    )

    /*
    UPDATE_LOCATION_TIMER = setInterval(
      () => this.getCurrentLocation('Interval'),
      1000 * 60
    )
    */

    this.setupBackgroundFetch()
  }

  componentDidUpdate(prevProps) {
    const { user, userLocation } = this.props
    logger.log('Init:', { user, userLocation })

    if (!user.data) return

    if (!prevProps.user.data && user.data) {
      logger.log('User is ready, update location ...')
      this.handleUpdateLocation()
      return
    }

    if (userLocation.getLocation && !prevProps.userLocation.getLocation) {
      logger.log('getLocation action, get the location now ...')
      this.handleUpdateLocation()
      this.getCurrentLocation('GetLocationAction')
      return
    }

    const currentLocation = userLocation.currentLocation
    const prevLocation = prevProps.userLocation.currentLocation

    if (currentLocation && !prevLocation) {
      this.handleUpdateLocation()
      return
    }

    if (
      currentLocation.coords.latitude !== prevLocation.coords.latitude ||
      currentLocation.coords.longitude !== prevLocation.coords.longitude
    ) {
      logger.log('currentLocation has changed, update location')
      this.handleUpdateLocation()
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
    watchID != null && Geolocation.clearWatch(watchID)
    // clearTimeout(UPDATE_LOCATION_TIMER)
    if (netInfoUnsubscribe) netInfoUnsubscribe()
  }

  handleAppStateChange = nextAppState => {
    logger.log('AppState:', nextAppState)

    if (nextAppState === 'active') {
      this.getCurrentLocation('AppState')
      this.handleUpdateLocation()
    }
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
  bindActionCreators({ updateUserLocation, getUser, setLocation }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init)
