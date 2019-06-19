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
  FlatList,
  Text
} from 'react-native'
import IcoMoon from '../../../icomoon/IcoMoon'
import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import { fontScale, scaleWidth, scaleY } from '../../utils/scaleUtils'
import Popup from '../../components/Popup/Popup'

const AVATAR_COUNT = 110

export default class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    super(props)
    this.state = {
      modalVisible: false,
      avatarImages: Array.from(
        {
          length: AVATAR_COUNT
        },
        (_, i) =>
          'avatar_' + '0'.repeat(3 - (i + 1).toString().length) + (i + 1)
      )
    }
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

  renderAvatar = avatar => (
    <View style={styles.avatarContainer}>
      <Image key={avatar} source={{ uri: `${avatar}` }} style={styles.avatar} />
    </View>
  )

  popupContent = data => (
    <View style={styles.popupContent}>
      <Text style={styles.popupTitle}>Choose your Avatar</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => this.renderAvatar(item)}
        horizontal={false}
        numColumns={4}
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )

  render() {
    const { modalVisible, avatarImages } = this.state
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
                content={this.popupContent(avatarImages)}
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
    width: 250,
    height: 350
  },
  popupContent: {
    width: 230,
    height: 310
  },
  avatar: {
    width: 42,
    height: 42
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    margin: 5
  },
  popupTitle: {
    alignSelf: 'center',
    fontSize: fontScale(14),
    color: Colors.textViolet,
    marginVertical: 10
  }
})
