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

import { getUser } from '../../services/userAPIs'
import { updateLocation, isAgentFree } from '../../utils/locationAgent'

let watchID

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
    longitude: 0
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

  async componentDidMount() {
    if (Platform.OS !== 'ios') {
      await this.requestLocationPermission()
    }

    watchID = Geolocation.watchPosition(
      position => {
        console.log(position)
        if (position.coords) {
          if (isAgentFree) {
            updateLocation({
              speed: position.coords.speed,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          }
          this.setState({ speed: position.coords.speed })
          this.setState({ latitude: position.coords.latitude })
          this.setState({ longitude: position.coords.longitude })
        }
      },
      error => {
        console.log(error)
      },
      { enableHighAccuracy: true, distanceFilter: 5 }
    )

    /*
    Geolocation.getCurrentPosition(
      position => {
        this.setState({ location: position })
      },
      error => {
        this.setState({ location: error })
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
    */

    getUser().then(response => {
      if (response.data) {
        this.setState({ user: response.data })
      } else {
        const { navigation } = this.props
        navigation.navigate('Onboarding')
      }
    })
  }

  componentWillUnmount() {
    watchID != null && Geolocation.clearWatch(watchID)
  }

  render() {
    const { user, speed, latitude, longitude } = this.state
    return (
      <View style={styles.container}>
        {user && (
          <View>
            <Text>{user.deviceId}</Text>
            <Text>{user.nickName}</Text>
            <Text>{user.nearest}</Text>
            <Text>{user.furthest}</Text>
          </View>
        )}
        <View>
          <Text>{speed}</Text>
          <Text>{latitude}</Text>
          <Text>{longitude}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  }
})
