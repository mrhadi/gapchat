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
  Text
} from 'react-native'
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import numeral from 'numeral'

import { getLocation } from '../../services/userLocation/actions'

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import CircleButton from '../../components/CircleButton/CircleButton'
import bg from '../../assets/images/home/bg.png'
import colors from '../../styles/colors'
import { scaleWidth } from '../../utils/scaleUtils'

export class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    userLocation: PropTypes.object,
    user: PropTypes.object,
    getLocation: PropTypes.func.isRequired
  }

  static defaultProps = {
    userLocation: null,
    user: null
  }

  state = {
    user: null
  }

  navigateToProfile = () => {
    const { navigation } = this.props
    navigation.navigate('Profile', 'edit')
  }

  handleScreenWillFocus = payload => {
    console.log('handleScreenWillFocus')
    const { getLocation: dispatchGetLocation } = this.props
    dispatchGetLocation()
  }

  render() {
    const { userLocation } = this.props

    let userNear = null
    let userFar = null
    let distanceNear = null
    let distanceFar = null
    let nearestWeather = null
    let furthestWeather = null

    if (userLocation.data) {
      if (
        userLocation.data.nearestLocation &&
        userLocation.data.nearestLocation.fromUser &&
        userLocation.data.nearestLocation.fromUser.length > 0
      ) {
        userNear = userLocation.data.nearestLocation.fromUser[0]
      }
      if (
        userLocation.data.furthestLocation &&
        userLocation.data.furthestLocation.fromUser &&
        userLocation.data.furthestLocation.fromUser.length > 0
      ) {
        userFar = userLocation.data.furthestLocation.fromUser[0]
      }

      if (
        userLocation.data.nearestLocation &&
        userLocation.data.nearestLocation.distance
      ) {
        distanceNear = userLocation.data.nearestLocation.distance
        if (distanceNear > 1000) {
          distanceNear = distanceNear / 1000
          distanceNear = numeral(distanceNear).format('0.0') + ' km'
        } else {
          distanceNear = numeral(distanceNear).format('0') + ' m'
        }
      }
      if (
        userLocation.data.furthestLocation &&
        userLocation.data.furthestLocation.distance
      ) {
        distanceFar = userLocation.data.furthestLocation.distance / 1000
        distanceFar = numeral(distanceFar).format('0,0')
      }

      if (
        userLocation.data.nearestLocation &&
        userLocation.data.nearestLocation.weather
      ) {
        nearestWeather = JSON.parse(userLocation.data.nearestLocation.weather)
      }
      if (
        userLocation.data.furthestLocation &&
        userLocation.data.furthestLocation.weather
      ) {
        furthestWeather = JSON.parse(userLocation.data.furthestLocation.weather)
      }
    }

    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <NavigationEvents
          onWillFocus={payload => this.handleScreenWillFocus(payload)}
        />
        <SafeAreaView>
          <View style={styles.headerRow}>
            <CircleButton
              style={{ alignSelf: 'flex-end', marginRight: 10 }}
              onClick={this.navigateToProfile}
              icon="gear"
              tintColor={colors.textViolet}
              diameter={scaleWidth(30)}
            />
          </View>
          <View style={{ margin: 20, marginTop: 100, alignItems: 'center' }}>
            {userNear && distanceNear && (
              <View style={{ alignItems: 'center' }}>
                <Text>{userNear.nickName}</Text>
                {userNear.cityName && userNear.countryName && (
                  <Text>
                    {userNear.cityName + ' / ' + userNear.countryName}
                  </Text>
                )}
                <Text>{' { ' + distanceNear + ' away }'}</Text>
                {nearestWeather && (
                  <View style={{ alignItems: 'center' }}>
                    <Text selectable={true}>{`{ ${
                      nearestWeather.location.name
                    }, ${nearestWeather.location.country}, ${
                      nearestWeather.location.region
                    } }`}</Text>
                    <Text>{`${
                      nearestWeather.current.temperature
                    } / ${nearestWeather.current.weather_descriptions.toString()}`}</Text>
                    <Text>{`${nearestWeather.location.localtime}`}</Text>
                  </View>
                )}
              </View>
            )}
            <View
              style={{
                margin: 10,
                height: 1,
                width: 200,
                backgroundColor: colors.textViolet
              }}
            />
            {userFar && distanceFar && (
              <View style={{ alignItems: 'center' }}>
                <Text>{userFar.nickName}</Text>
                {userFar.cityName && userFar.countryName && (
                  <Text>{userFar.cityName + ' / ' + userFar.countryName}</Text>
                )}
                <Text>{' { ' + distanceFar + ' km away }'}</Text>
                {furthestWeather && (
                  <View style={{ alignItems: 'center' }}>
                    <Text selectable={true}>{`{ ${
                      furthestWeather.location.name
                    }, ${furthestWeather.location.country}, ${
                      furthestWeather.location.region
                    } }`}</Text>
                    <Text>{`${
                      furthestWeather.current.temperature
                    } / ${furthestWeather.current.weather_descriptions.toString()}`}</Text>
                    <Text>{`${furthestWeather.location.localtime}`}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
        {userLocation.fetchingData && <LoadingSpinner />}
      </ImageBackground>
    )
  }
}

export const mapStateToProps = ({ userLocation, user }) => ({
  userLocation,
  user
})

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ getLocation }, dispatch)

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
  },
  headerRow: {
    margin: 10
  }
})
