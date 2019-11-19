/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, View, StatusBar } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import appIcon from '../../assets/images/splash/icon.png'
import colors from '../../styles/colors'
import { scaleWidth, scaleHeight } from '../../utils/scaleUtils'

export class SplashScreen extends Component {
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

  componentDidUpdate() {
    const { user, navigation } = this.props

    if (user.userVerified) {
      navigation.replace('Home')
    } else if (user.userVerified === false) {
      navigation.replace('Onboarding')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image style={styles.appIcon} source={appIcon} />
      </View>
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
    flex: 1,
    backgroundColor: colors.splashBG,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appIcon: {
    width: scaleWidth(200),
    height: scaleWidth(200),
    marginBottom: scaleHeight(40)
  }
})
