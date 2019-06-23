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
  View,
  Image,
  Text,
  Switch,
  ScrollView,
  Dimensions
} from 'react-native'
import Slider from '@react-native-community/slider'
import LinearGradient from 'react-native-linear-gradient'
import IcoMoon from '../../../icomoon/IcoMoon'
import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import iPhoneX from '../../utils/iPhoneX'
import {
  fontScale,
  scaleHeight,
  scaleWidth,
  scaleY
} from '../../utils/scaleUtils'
import AvatarBrowserModal from './AvatarBrowserModal/AvatarBrowserModal'
import Nickname from './Nickname/Nickname'
import AntDesign from 'react-native-vector-icons/AntDesign'

const { height } = Dimensions.get('window')
const EARTH_CIRCUMFERENCE = 40075

export default class ProfileScreen extends Component {
  static navigationOptions = {
    headerLeft: null
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    modalVisible: false,
    errorMessage: '',
    userAvatar: '',
    userNickname: '',
    userActive: true,
    userNearestDistance: 10,
    userFurthestDistance: 20000
  }

  showAvatarBrowser = () => {
    this.setState({ modalVisible: true })
  }

  hideAvatarBrowser = () => {
    this.setState({ modalVisible: false })
  }

  handleAvatarSelected = avatar => {
    this.setState({ userAvatar: avatar, errorMessage: '' })
    this.hideAvatarBrowser()
  }

  handleNearestChange = value => {
    this.setState({ userNearestDistance: value })
  }

  handleFurthestChange = value => {
    this.setState({ userFurthestDistance: value })
  }

  renderProfilePhoto = () => {
    const { userAvatar } = this.state
    return (
      <View style={styles.profilePhoto}>
        <TouchableOpacity
          style={styles.addPhoto}
          onPress={this.showAvatarBrowser}
        >
          {userAvatar === '' ? (
            <IcoMoon
              name="add-profile-photo"
              size={fontScale(24)}
              color="white"
            />
          ) : (
            <View style={styles.avatarContainer}>
              <Image
                style={styles.userAvatar}
                source={{ uri: `${userAvatar.name}` }}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.addPhotoText}>Profile avatar</Text>
      </View>
    )
  }

  renderError = errorMessage => (
    <View style={styles.errorContainer}>
      <AntDesign
        style={{ color: Colors.errorRed }}
        name="exclamationcircle"
        size={fontScale(18)}
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  )

  renderSettings = () => {
    const { userActive, userNearestDistance, userFurthestDistance } = this.state
    return (
      <View style={styles.settingsContainer}>
        <View style={styles.featureRow}>
          <Text style={styles.featureTitle}>Active</Text>
          <Switch
            trackColor={{
              true: Colors.purple,
              false: Colors.buttonGrey
            }}
            value={userActive}
            thumbColor={Colors.buttonGrey}
            onValueChange={() => this.setState({ userActive: !userActive })}
          />
        </View>
        <Text style={styles.featureDescription}>
          Set if you are availabe for chatting or not.
        </Text>
        <View style={{ height: 15 }} />
        <View style={styles.featureRow}>
          <Text style={styles.featureTitle}>Nearest Distance</Text>
          <Text style={styles.km}>{userNearestDistance} m</Text>
        </View>
        <Text style={styles.featureDescription}>
          Choose the nearest distance you want us fo find your potential
          friends.
        </Text>
        <Slider
          style={{ width: '100%', height: scaleHeight(40) }}
          minimumValue={10}
          step={10}
          onValueChange={value => this.handleNearestChange(value)}
          value={userNearestDistance}
          maximumValue={1000}
          minimumTrackTintColor={Colors.errorRed}
          maximumTrackTintColor={Colors.sliderGrey}
          thumbTintColor={Colors.sliderViolet}
        />
        <View style={{ height: 15 }} />
        <View style={styles.featureRow}>
          <Text style={styles.featureTitle}>Furthest Distance</Text>
          <Text style={styles.km}>{userFurthestDistance} km</Text>
        </View>
        <Text style={styles.featureDescription}>
          Choose the furthest distance you want us fo find your potential
          friends.
        </Text>
        <Slider
          style={{ width: '100%', height: scaleHeight(30) }}
          minimumValue={10}
          step={10}
          onValueChange={value => this.handleFurthestChange(value)}
          value={userFurthestDistance}
          maximumValue={Math.round(EARTH_CIRCUMFERENCE / 2)}
          minimumTrackTintColor={Colors.textViolet}
          maximumTrackTintColor={Colors.sliderGrey}
          thumbTintColor={Colors.sliderViolet}
        />
      </View>
    )
  }

  handleNicknameBlur = nickname => {
    this.setState({ errorMessage: '', userNickname: nickname })
  }

  handleOnSave = () => {
    const { userAvatar, userNickname } = this.state

    if (userAvatar === '') {
      this.setState({ errorMessage: 'Add a profile avatar' })
      return
    }

    if (userNickname === '') {
      this.setState({ errorMessage: 'Enter your nickname' })
      return
    }

    const { navigation } = this.props
    navigation.navigate('Home')
  }

  render() {
    const { modalVisible, errorMessage, userNickname } = this.state
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView>
          <ScrollView
            keyboardDismissMode="on-drag"
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 45 }}
          >
            <View style={styles.container}>
              {this.renderProfilePhoto()}
              <Nickname
                nickname={userNickname}
                onBlur={nickname => this.handleNicknameBlur(nickname)}
              />
              {this.renderSettings()}
            </View>
          </ScrollView>
        </SafeAreaView>
        <LinearGradient
          colors={['#F4F4F4', 'rgba(244,244,244,0.2)']}
          style={[
            styles.saveContainer,
            {
              height: errorMessage
                ? styles.saveContainer.height + 35
                : styles.saveContainer.height
            }
          ]}
        >
          {errorMessage !== '' && this.renderError(errorMessage)}
          <TouchableOpacity style={styles.button} onPress={this.handleOnSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
        {modalVisible && (
          <AvatarBrowserModal
            modalVisible={modalVisible}
            onReturnClick={this.hideAvatarBrowser}
            onAvatarSelected={this.handleAvatarSelected}
          />
        )}
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
    height: height,
    alignItems: 'center',
    marginHorizontal: 20
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
    marginTop: scaleY(20)
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center',
    backgroundColor: Colors.buttonViolet,
    borderColor: Colors.buttonViolet,
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: iPhoneX() ? 20 : 10
  },
  buttonText: {
    color: Colors.textWhite,
    fontSize: fontScale(14),
    fontWeight: '500',
    flex: 1,
    textAlign: 'center'
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaleHeight(20)
  },
  errorText: {
    color: Colors.errorRed,
    fontSize: fontScale(12),
    fontWeight: '500',
    marginLeft: scaleWidth(10)
  },
  settingsContainer: {
    marginTop: scaleHeight(30),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  featureRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  featureTitle: {
    color: Colors.textViolet,
    fontSize: fontScale(14),
    fontWeight: '500'
  },
  km: {
    color: Colors.textViolet,
    fontSize: fontScale(12),
    fontWeight: '500'
  },
  featureDescription: {
    color: Colors.textGrey,
    fontSize: fontScale(11),
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    width: scaleWidth(200)
  },
  saveContainer: {
    width: '100%',
    position: 'absolute',
    marginTop: scaleHeight(20),
    bottom: 0,
    alignItems: 'center',
    height: iPhoneX() ? 85 : 65
  }
})
