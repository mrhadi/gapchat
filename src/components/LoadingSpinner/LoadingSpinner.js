import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'
import Colors from '../../styles/colors'

const LoadingSpinner = () => {
  return (
    <Modal animationType="fade" transparent onRequestClose={() => {}}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color={Colors.bgWhite} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(83,85,114,0.75)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LoadingSpinner
