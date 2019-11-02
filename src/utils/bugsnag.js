import { Client } from 'bugsnag-react-native'
import { Platform } from 'react-native'
import moment from 'moment'

import { deviceUniqueID } from '../utils/deviceInfo'

const bugsnag = new Client('7ec042b92264f908f13f9f61b48bec9d')
bugsnag.setUser(deviceUniqueID, Platform.OS, '')

export const bugsnagLog = (context, message = '') => {
  bugsnag.notify(new Error(), report => {
    report.context = context
    report.errorClass = 'Log'
    report.errorMessage = message
    report.groupingHash =
      `${moment().unix()}-` + Math.floor(Math.random() * 10000)
  })
}

export const bugsnagError = error => {
  bugsnag.notify(error)
}
