/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import Colors from './colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center',
    backgroundColor: Colors.buttonBlue,
    borderColor: Colors.buttonBlue,
    borderRadius: 4,
    borderWidth: 1,
    marginHorizontal: 20
  },
  buttonText: {
    color: Colors.textWhite,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center'
  }
})
