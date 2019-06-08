/**
 * @format
 * @flow
 */

import React, { PureComponent } from 'react'
import { setCustomText } from 'react-native-global-props'
import AppContainer from './src/navigation'

// Set global font for text
setCustomText({ style: { fontFamily: 'Poppins' } })

export default class App extends PureComponent {
  render() {
    return <AppContainer />
  }
}
