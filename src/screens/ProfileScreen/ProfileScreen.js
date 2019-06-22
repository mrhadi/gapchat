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
  View,
  Image,
  Text,
  TextInput
} from 'react-native'
import IcoMoon from '../../../icomoon/IcoMoon'
import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import {
  fontScale,
  scaleHeight,
  scaleWidth,
  scaleY
} from '../../utils/scaleUtils'
import Popup from '../../components/Popup/Popup'
import AvatarBrowser from '../../components/AvatarBrowser/AvatarBrowser'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    modalVisible: false,
    userAvatar: ''
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

  handleAvatarSelected = avatar => {
    this.setState({ userAvatar: avatar })
    this.hideAvatarBrowser()
  }

  renderProfilePhoto = avatar => (
    <View style={styles.profilePhoto}>
      <TouchableOpacity
        style={styles.addPhoto}
        onPress={this.showAvatarBrowser}
      >
        {avatar === '' ? (
          <IcoMoon
            name="add-profile-photo"
            size={fontScale(24)}
            color="white"
          />
        ) : (
          <View style={styles.avatarContainer}>
            <Image
              style={styles.userAvatar}
              source={{ uri: `${avatar.name}` }}
            />
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.addPhotoText}>
        {avatar === '' ? 'Add profile photo' : 'Edit profile photo'}
      </Text>
    </View>
  )

  renderAvatarBrowser = modalVisible => (
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
            <AvatarBrowser
              onSelected={avatar => this.handleAvatarSelected(avatar)}
            />
          }
          returnButtonTitle="Return"
          onReturnClick={this.hideAvatarBrowser}
        />
      </View>
    </Modal>
  )

  renderNickName = () => (
    <View style={styles.nickNameContainer}>
      <EvilIcons style={{ color: Colors.textViolet }} name="user" size={26} />
      <TextInput
        onChangeText={() => {}}
        style={styles.nickNameTextInput}
        placeholder="Add your nickname"
        returnKeyLabel="Done"
        returnKeyType="go"
        spellCheck={false}
        autoCapitalize="none"
        maxLength={20}
      />
    </View>
  )

  render() {
    const { modalVisible, userAvatar } = this.state
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView style={styles.container}>
          {this.renderProfilePhoto(userAvatar)}
          {modalVisible && this.renderAvatarBrowser(modalVisible)}
          {this.renderNickName()}
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
    borderRadius: scaleWidth(160),
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
  },
  userAvatar: {
    width: scaleWidth(70),
    height: scaleWidth(70)
  },
  avatarContainer: {
    height: scaleWidth(82),
    width: scaleWidth(82),
    borderRadius: scaleWidth(164),
    borderWidth: 1,
    borderColor: Colors.inactiveGrey,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePhoto: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addPhotoText: {
    marginTop: scaleHeight(10),
    fontSize: fontScale(12),
    color: Colors.textViolet
  },
  nickNameContainer: {
    flexDirection: 'row',
    marginTop: scaleHeight(40),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: scaleWidth(220),
    height: scaleWidth(50),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    padding: 10
  },
  nickNameTextInput: {
    flex: 1,
    height: scaleWidth(40),
    fontSize: fontScale(14),
    color: Colors.textViolet,
    marginLeft: scaleWidth(10)
  }
})
