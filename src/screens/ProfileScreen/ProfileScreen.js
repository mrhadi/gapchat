/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-navigation'
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View
} from 'react-native'
import IcoMoon from '../../../icomoon/IcoMoon'
import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import { fontScale, scaleWidth, scaleY } from '../../utils/scaleUtils'
import Popup from '../../components/Popup/Popup'
import AvatarBrowser from '../../components/AvatarBrowser/AvatarBrowser'

export default class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    modalVisible: false
  }

  navigate = event => {
    const { navigation } = this.props
    navigation.navigate('Home', event)
  }

  showAvatarBrowser = () => {
    this.setState({ modalVisible: true })
  }

  hideAvatarBrowser = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    const { modalVisible } = this.state
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.addPhoto}
            onPress={this.showAvatarBrowser}
          >
            <IcoMoon
              name="add-profile-photo"
              size={fontScale(24)}
              color="white"
            />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => {}}
          >
            <View style={styles.modalContainer}>
              <Popup
                style={styles.popupView}
                content={<AvatarBrowser />}
                onReturnClick={this.hideAvatarBrowser}
              />
            </View>
          </Modal>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  addPhoto: {
    height: scaleWidth(80),
    width: scaleWidth(80),
    borderRadius: scaleWidth(180),
    backgroundColor: Colors.purple,
    borderWidth: 1,
    borderColor: Colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleY(80)
  },
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
