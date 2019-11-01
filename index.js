/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { bugfenderLog } from './src/utils/bugfender'

bugfenderLog('', 'AppRegistry')
AppRegistry.registerComponent(appName, () => App)
