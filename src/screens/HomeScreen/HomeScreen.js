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
import { bugsnagError } from '../../utils/bugsnag'

import { getUser } from '../../services/userAPIs'
import { updateLocation } from '../../utils/locationAgent'

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
    lastUpdate: '',
    lastSeen: ''
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
    let lastSeen = ''

    if (response && response.nearestUser) {
      nearestUser = response.nearestUser.nickName
      lastSeen = moment(response.nearestUser.updatedAt).format(
        'YYYY-MM-DD h:mm:ss a'
      )
      distance = response.distance
    }
    if (response && response.nearest) {
      lastSeen = moment(response.nearest.updatedAt).format(
        'YYYY-MM-DD h:mm:ss a'
      )
    }
    if (response && response.userLocation) {
      lastUpdate = moment(response.userLocation.updatedAt).format(
        'YYYY-MM-DD h:mm:ss a'
      )
    }

    this.setState({
      nearestUser,
      distance,
      lastUpdate,
      lastSeen
    })
  }

  handleUpdateLocation = (coords, handleResponse = true) => {
    console.log('handleUpdateLocation:', coords)
    updateLocation(
      {
        speed: coords.speed,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      handleResponse ? this.handleUpdateLocationResponse : null
    )
    this.setState({ speed: coords.speed })
    this.setState({ latitude: coords.latitude })
    this.setState({ longitude: coords.longitude })
  }

  getCurrentLocation = (handleResponse = true) => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('getCurrentLocation:', position)
        if (position.coords) {
          this.handleUpdateLocation(position.coords, handleResponse)
        }
      },
      error => {
        bugsnagError(error)
        console.log('getCurrentLocation:', error)
      }
    )
  }

  async componentDidMount() {
    if (Platform.OS !== 'ios') {
      await this.requestLocationPermission()
    }

    getUser().then(response => {
      if (response.data) {
        this.setState({ user: response.data })
      } else {
        const { navigation } = this.props
        navigation.navigate('Onboarding')
      }
    })

    this.getCurrentLocation()

    UPDATE_LOCATION_TIMER = setInterval(
      () => this.getCurrentLocation(),
      1000 * 30
    )
  }

  componentWillUnmount() {
    clearTimeout(UPDATE_LOCATION_TIMER)
  }

  render() {
    const {
      user,
      speed,
      latitude,
      longitude,
      nearestUser,
      distance,
      lastUpdate,
      lastSeen
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
          <Text>{'Last seen: ' + lastSeen}</Text>
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
