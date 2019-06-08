/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import globalStyles from '../../styles/global'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  navigate = event => {
    const { navigation } = this.props
    navigation.navigate('Details', event)
  }

  render() {
    return (
      <View style={globalStyles.mainContainer}>
        <Text>Home Screen</Text>
      </View>
    )
  }
}
