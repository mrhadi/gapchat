/**
 * @format
 * @flow
 */

import React, { PureComponent } from 'react'
import { setCustomText } from 'react-native-global-props'
import { View } from 'react-native'
import AppContainer from './src/navigation'
import Init from './src/components/Init/Init'

setCustomText({ style: { fontFamily: 'Poppins' } })

export default class App extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Init />
        <AppContainer />
      </View>
    )
  }
}
