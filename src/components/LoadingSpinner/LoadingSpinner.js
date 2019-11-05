import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Colors from '../../styles/colors'

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.bgWhite} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(83,85,114,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
})

export default LoadingSpinner
