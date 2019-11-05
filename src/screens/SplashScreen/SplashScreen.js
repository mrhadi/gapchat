/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Platform, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

export class SplashScreen extends Component {
  static navigationOptions = {
    title: 'Splash'
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    userLocation: PropTypes.object,
    user: PropTypes.object
  }

  static defaultProps = {
    userLocation: null,
    user: null
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
    if (Platform.OS !== 'ios') {
      await this.requestLocationPermission()
    }
  }

  componentDidUpdate() {
    const { user, navigation } = this.props

    if (user.userVerified) {
      navigation.navigate('Home')
    } else if (user.userVerified === false) {
      navigation.navigate('Onboarding')
    }
  }

  render() {
    const { user } = this.props
    const userData = user && user.data ? user.data : null

    return (
      <View style={styles.container}>{!userData && <LoadingSpinner />}</View>
    )
  }
}

export const mapStateToProps = ({ userLocation, user }) => ({
  userLocation,
  user
})

export const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
