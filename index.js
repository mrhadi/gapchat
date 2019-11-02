/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { bugsnagLog } from './src/utils/bugsnag'

bugsnagLog('AppRegistry')

AppRegistry.registerComponent(appName, () => App)
