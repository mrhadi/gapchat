/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import SplashView from 'react-native-splash-screen'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
      SplashView.hide()
    } else if (user.userVerified === false) {
      navigation.replace('Onboarding')
      SplashView.hide()
    }
  }

  render() {
    return <View />
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
