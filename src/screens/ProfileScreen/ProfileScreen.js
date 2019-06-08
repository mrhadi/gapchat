/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ImageBackground, StyleSheet } from 'react-native'
import bg from '../../assets/images/profile/bg.png'

export default class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  navigate = event => {
    const { navigation } = this.props
    navigation.navigate('Home', event)
  }

  render() {
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%'
  }
})
