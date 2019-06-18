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
  ScrollView,
  Image,
  Text
} from 'react-native'
import IcoMoon from '../../../icomoon/IcoMoon'
import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import { fontScale, scaleWidth, scaleY } from '../../utils/scaleUtils'

const AVATAR_COUNT = 110

export default class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
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

  openAvatarBrowser = () => {
    this.setState({ modalVisible: true })
  }

  render() {
    const { modalVisible, avatarImages } = this.state
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.addPhoto}
            onPress={this.openAvatarBrowser}
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
              <View style={styles.popupView}>
                <ScrollView
                  keyboardDismissMode="on-drag"
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                  }}
                >
                  {avatarImages.map(image => (
                    <View style={styles.avatarContainer}>
                      <Image
                        key={image}
                        source={{ uri: `${image}` }}
                        style={styles.avatar}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
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
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 1,
    width: '75%',
    height: '60%',
    padding: 10
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
    margin: 5
  }
})
