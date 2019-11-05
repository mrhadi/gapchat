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
      screen: ProfileScreen,
      navigationOptions: () => ({
        title: 'Profile Settings',
        headerTransparent: true,
        headerBackTitle: 'Back',
        headerBackImage: (
          <IcoMoon
            name="back"
            size={fontScale(12)}
            color={Colors.textViolet}
            style={{
              paddingLeft: Platform.OS === 'ios' ? scaleX(35) : scaleX(10),
              paddingRight: scaleX(10),
              paddingVertical: scaleY(10)
            }}
          />
        ),
        headerTitleStyle: {
          fontSize: fontScale(14),
          color: Colors.textViolet
        },
        headerBackground: (
          <LinearGradient
            colors={['#F4F4F4', 'rgba(244,244,244,0.2)']}
            style={{ flex: 1 }}
          />
        )
      })
    }
  },
  {
    initialRouteName: 'Splash',
    headerLayoutPreset: 'center'
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
