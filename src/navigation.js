/**
 * @format
 * @flow
 */

import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

import OnboardingScreen from './screens/Onboarding/Onboarding'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import SplashScreen from './screens/SplashScreen/SplashScreen'

import Colors from './styles/colors'
import IcoMoon from '../icomoon/IcoMoon'
import { fontScale, scaleX, scaleY } from './utils/scaleUtils'

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
    },
    Splash: {
      screen: SplashScreen,
      navigationOptions: () => ({
        header: null,
        title: null
      })
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    initialRouteName: 'Splash',
    headerLayoutPreset: 'center'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
