/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-navigation'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import IcoMoon from '../../../icomoon/IcoMoon'
import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import { fontScale, scaleWidth, scaleY } from '../../utils/scaleUtils'

const options = {
  title: 'Select Your Profile Photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  navigate = event => {
    const { navigation } = this.props
    navigation.navigate('Home', event)
  }

  _handleButtonPress = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    })
  }

  render() {
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.addPhoto} onPress={this._handleButtonPress}>
            <IcoMoon
              name="add-profile-photo"
              size={fontScale(24)}
              color="white"
            />
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleY(80)
  }
})
