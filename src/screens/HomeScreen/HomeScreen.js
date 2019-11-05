/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ImageBackground,
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid
} from 'react-native'
import { SafeAreaView } from 'react-navigation'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import bg from '../../assets/images/profile/bg.png'

export class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
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
    this.props.navigation.setParams({ screen: 'Home' })
    if (Platform.OS !== 'ios') {
      await this.requestLocationPermission()
    }
  }

  render() {
    const { userLocation } = this.props
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView />
        {userLocation.data == null && <LoadingSpinner />}
      </ImageBackground>
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
)(HomeScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    margin: 10
  },
  bgImage: {
    width: '100%',
    height: '100%'
  }
})
