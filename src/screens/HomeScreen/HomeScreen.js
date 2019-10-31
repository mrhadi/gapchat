/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  PermissionsAndroid
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import moment from 'moment'

import { getUser } from '../../services/userAPIs'
import { updateLocation } from '../../utils/locationAgent'

let watchID = null
let UPDATE_LOCATION_TIMER = null

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    user: null,
    speed: 0,
    latitude: 0,
    longitude: 0,
    nearestUser: '',
    distance: 0,
    lastUpdate: ''
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
        console.log('You can use the camera')
      } else {
        console.log('Camera permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  handleUpdateLocationResponse = response => {
    console.log('handleUpdateLocationResponse:', response)
    if (!response) return

    let nearestUser = ''
    let distance = 0
    let lastUpdate = ''

    if (response && response.nearestUser) {
      nearestUser = response.nearestUser.nickName
      distance = response.distance
    }
    if (response && response.userLocation) {
      lastUpdate = moment(response.userLocation.updatedAt).format(
        'YYYY-MM-DD h:mm:ss a'
      )
    }

    this.setState({
      nearestUser,
      distance,
      lastUpdate
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
      this.handleUpdateLocationResponse
    )
    this.setState({ speed: coords.speed })
    this.setState({ latitude: coords.latitude })
    this.setState({ longitude: coords.longitude })
  }

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('getCurrentLocation:', position)
        if (position.coords) {
          this.handleUpdateLocation(position.coords)
        }
      },
      error => {
        console.log('getCurrentLocation:', error)
      },
      { timeout: 5000, maximumAge: 1000 * 60 * 5, distanceFilter: 1 }
    )
  }

  async componentDidMount() {
    if (Platform.OS !== 'ios') {
      await this.requestLocationPermission()
    }

    this.getCurrentLocation()

    watchID = Geolocation.watchPosition(
      position => {
        console.log('watchPosition:', position)
        if (position.coords) {
          this.handleUpdateLocation(position.coords)
        }
      },
      error => {
        console.log('watchPosition:', error)
      },
      { distanceFilter: 1 }
    )

    getUser().then(response => {
      if (response.data) {
        this.setState({ user: response.data })
      } else {
        const { navigation } = this.props
        navigation.navigate('Onboarding')
      }
    })

    UPDATE_LOCATION_TIMER = setInterval(
      () => this.getCurrentLocation(),
      1000 * 60
    )
  }

  componentWillUnmount() {
    clearTimeout(UPDATE_LOCATION_TIMER)
    watchID != null && Geolocation.clearWatch(watchID)
  }

  render() {
    const {
      user,
      speed,
      latitude,
      longitude,
      nearestUser,
      distance,
      lastUpdate
    } = this.state
    return (
      <View style={styles.container}>
        {user && (
          <View>
            <Text>{user.deviceId}</Text>
            <Text>{user.nickName}</Text>
            <Text>{'Min: ' + user.nearest}</Text>
            <Text>{'Max: ' + user.furthest}</Text>
          </View>
        )}
        <View>
          <Text>{'Speed: ' + speed}</Text>
          <Text>{'Lat: ' + latitude}</Text>
          <Text>{'Lng: ' + longitude}</Text>
          <Text>{'When: ' + lastUpdate}</Text>
        </View>
        <View>
          <Text>{'Nearby: ' + nearestUser}</Text>
          <Text>{'Distance: ' + distance}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    margin: 10
  }
})
