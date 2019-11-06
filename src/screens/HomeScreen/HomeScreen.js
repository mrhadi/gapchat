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
  Text,
  PermissionsAndroid
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import numeral from 'numeral'

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

    let fromUserNear
    let fromUserFar
    let distanceNear
    let distanceFar

    if (userLocation.data) {
      fromUserNear = userLocation.data.nearestLocation.fromUser[0]
      fromUserFar = userLocation.data.furthestLocation.fromUser[0]

      distanceNear = userLocation.data.nearestLocation.distance
      distanceFar = userLocation.data.furthestLocation.distance / 1000

      distanceFar = numeral(distanceFar).format('0,0.0')

      if (distanceNear > 1000) {
        distanceNear = distanceNear / 1000
        distanceNear = numeral(distanceNear).format('0,0.0') + ' Km'
      } else {
        distanceNear = distanceNear + ' m'
      }
    }

    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView>
          {userLocation.data && (
            <View style={{ margin: 20, marginTop: 100, alignItems: 'center' }}>
              <Text>
                {fromUserNear.nickName + ' {' + distanceNear + ' away }'}
              </Text>
              <View style={{ margin: 3 }} />
              <Text>
                {fromUserFar.nickName + ' {' + distanceFar + ' Km away }'}
              </Text>
            </View>
          )}
        </SafeAreaView>
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
