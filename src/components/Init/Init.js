import React from 'react'
import { AppState } from 'react-native'

class Init extends React.PureComponent {
  componentDidMount() {
    // bugfenderLog('componentDidMount', 'AppStage')
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = nextAppState => {
    // bugfenderLog(nextAppState, 'AppStage')
    console.log('AppState:', nextAppState)
  }

  render() {
    return null
  }
}

export default Init
