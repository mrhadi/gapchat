/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import globalStyles from '../../styles/global'

import { getUser } from '../../services/userAPIs'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    user: null
  }

  componentDidMount() {
    getUser().then(response => {
      if (response.data) {
        this.setState({ user: response.data })
      } else {
        const { navigation } = this.props
        navigation.navigate('Onboarding')
      }
    })
  }

  render() {
    const { user } = this.state
    return (
      <View style={globalStyles.mainContainer}>
        {user && (
          <View>
            <Text>{user.active}</Text>
            <Text>{user.avatar}</Text>
            <Text>{user.deviceId}</Text>
            <Text>{user.nickName}</Text>
            <Text>{user.nearest}</Text>
            <Text>{user.furthest}</Text>
          </View>
        )}
      </View>
    )
  }
}
