/**
 * @format
 * @flow
 */

import React, { PureComponent } from 'react'
import { setCustomText } from 'react-native-global-props'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import FlashMessage from 'react-native-flash-message'

import AppContainer from './src/navigation'
import Init from './src/components/Init/Init'
import store from './src/services/store/store'

setCustomText({ style: { fontFamily: 'Poppins' } })

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Init />
        <View style={{ flex: 1 }}>
          <AppContainer />
        </View>
        <FlashMessage position="top" />
      </Provider>
    )
  }
}
