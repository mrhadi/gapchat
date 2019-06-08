/**
 * @format
 * @flow
 */

import React, { PureComponent } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { setCustomText } from 'react-native-global-props'
import OnboardingScreen from './src/screens/Onboarding/Onboarding'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'

// Set global font for text
setCustomText({ style: { fontFamily: 'Poppins' } })

const AppNavigator = createStackNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: () => ({
        header: null,
        title: null
      })
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null,
        title: null
      })
    }
  },
  {
    initialRouteName: 'Onboarding'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default class App extends PureComponent {
  render() {
    return <AppContainer />
  }
}
