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
  Text,
  ScrollView,
  Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addUser } from '../../services/user/actions'

import bg from '../../assets/images/profile/bg.png'
import Colors from '../../styles/colors'
import iPhoneX from '../../utils/iPhoneX'
import { fontScale, scaleHeight, scaleWidth } from '../../utils/scaleUtils'

import AvatarBrowserModal from './AvatarBrowserModal/AvatarBrowserModal'
import Settings from './Settings/Settings'
import Nickname from './Nickname/Nickname'
import ProfilePhoto from './ProfilePhoto/ProfilePhoto'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const { height } = Dimensions.get('window')

class ProfileScreen extends Component {
  static navigationOptions = {
    headerLeft: null
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object,
    addUser: PropTypes.func.isRequired
  }

  state = {
    modalVisible: false,
    showLoading: false,
    errorMessage: '',
    userAvatar: '',
    userNickname: '',
    userActive: true,
    userNearestDistance: 20,
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

  handleNicknameBlur = nickname => {
    this.setState({ errorMessage: '', userNickname: nickname })
  }

  handleOnSave = () => {
    const {
      userAvatar,
      userNickname,
      userNearestDistance,
      userFurthestDistance
    } = this.state

    if (userAvatar === '') {
      this.setState({ errorMessage: 'Add a profile avatar' })
      return
    }

    if (userNickname === '') {
      this.setState({ errorMessage: 'Enter your nickname' })
      return
    }

    this.setState({ showLoading: true })

    const userData = {
      nickName: userNickname,
      avatar: userAvatar,
      nearest: userNearestDistance,
      furthest: userFurthestDistance
    }

    const { addUser: dispatchAddUser } = this.props
    dispatchAddUser(userData)
  }

  handleSettingsChanged = settings => {
    this.setState({
      userActive: settings.userActive,
      userNearestDistance: settings.userNearestDistance,
      userFurthestDistance: settings.userFurthestDistance
    })
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

  componentDidUpdate() {
    console.log('componentDidUpdate: Profile')
    const { user, navigation } = this.props

    if (user.userVerified) {
      navigation.replace('Home')
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount: Profile')
  }

  render() {
    const {
      modalVisible,
      showLoading,
      errorMessage,
      userNickname,
      userAvatar,
      userActive,
      userNearestDistance,
      userFurthestDistance
    } = this.state
    const defaultSettings = {
      userActive: userActive,
      userNearestDistance: userNearestDistance,
      userFurthestDistance: userFurthestDistance
    }
    const { user } = this.props
    console.log('User:', user)
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView>
          <ScrollView
            keyboardDismissMode="on-drag"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 45 }}
          >
            <View style={styles.container}>
              <ProfilePhoto
                onPress={this.showAvatarBrowser}
                userAvatar={userAvatar}
              />
              <Nickname
                nickname={userNickname}
                onBlur={nickname => this.handleNicknameBlur(nickname)}
              />
              <Settings
                onSettingsChanged={settings =>
                  this.handleSettingsChanged(settings)
                }
                defaultSettings={defaultSettings}
              />
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
        {showLoading && <LoadingSpinner />}
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

export const mapStateToProps = ({ user }) => ({
  user
})

export const mapDispatchToProps = dispatch =>
  bindActionCreators({ addUser }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)

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
  saveContainer: {
    width: '100%',
    position: 'absolute',
    marginTop: scaleHeight(20),
    bottom: 0,
    alignItems: 'center',
    height: iPhoneX() ? 85 : 65
  }
})
