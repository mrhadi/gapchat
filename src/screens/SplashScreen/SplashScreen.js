/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

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
