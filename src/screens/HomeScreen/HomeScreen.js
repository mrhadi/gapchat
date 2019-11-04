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
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../../services/userAPIs'

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    userLocation: PropTypes.object
  }

  static defaultProps = {
    userLocation: null
  }

  state = {
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

  async componentDidMount() {
    getUser().then(response => {
      if (response.data) {
        this.setState({ user: response.data })
      } else {
        const { navigation } = this.props
        navigation.navigate('Onboarding')
      }
    })

    if (Platform.OS !== 'ios') {
      await this.requestLocationPermission()
    }
  }

  render() {
    const { user } = this.state
    const { userLocation } = this.props
    console.log('userLocation:', userLocation.data)
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
          <Text>{'Nearby: '}</Text>
          <Text>{'Distance: '}</Text>
          <Text>{'Last seen: '}</Text>
        </View>
      </View>
    )
  }
}

export const mapStateToProps = ({ userLocation }) => ({
  userLocation
})

export const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    margin: 10
  }
})
