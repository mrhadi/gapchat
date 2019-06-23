import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import PropTypes from 'prop-types'
import Popup from '../../../components/Popup/Popup'
import AvatarBrowser from '../../../components/AvatarBrowser/AvatarBrowser'

const AvatarBrowserModal = ({
  modalVisible,
  onReturnClick,
  onAvatarSelected
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalContainer}>
        <Popup
          style={styles.popupView}
          content={
            <AvatarBrowser onSelected={avatar => onAvatarSelected(avatar)} />
          }
          returnButtonTitle="Return"
          onReturnClick={onReturnClick}
        />
      </View>
    </Modal>
  )
}

AvatarBrowserModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  onReturnClick: PropTypes.func.isRequired,
  onAvatarSelected: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(83,85,114,0.75)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  popupView: {
    width: 280,
    height: 350
  }
})

export default AvatarBrowserModal
