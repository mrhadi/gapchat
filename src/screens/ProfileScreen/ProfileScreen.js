/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-navigation'
import { ImageBackground, StyleSheet, TouchableOpacity, CameraRoll, Alert } from 'react-native'
import IcoMoon from '../../../icomoon/IcoMoon'
import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import { fontScale, scaleWidth, scaleY} from '../../utils/scaleUtils'

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
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        Alert.alert(r.edges)
        //this.setState({ photos: r.edges });
      })
      .catch((err) => {
        //Error Loading Images
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
