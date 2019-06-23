import React, { PureComponent } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import IcoMoon from '../../../../icomoon/IcoMoon'
import {
  fontScale,
  scaleHeight,
  scaleWidth,
  scaleY
} from '../../../utils/scaleUtils'
import Colors from '../../../styles/colors'

export default class ProfilePhoto extends PureComponent {
  static propTypes = {
    userAvatar: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  }

  render() {
    const { userAvatar, onPress } = this.props
    return (
      <View style={styles.profilePhoto}>
        <TouchableOpacity style={styles.addPhoto} onPress={onPress}>
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
                source={{ uri: `${userAvatar}` }}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.addPhotoText}>Profile avatar</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profilePhoto: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addPhotoText: {
    marginTop: scaleHeight(10),
    fontSize: fontScale(12),
    color: Colors.textViolet
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
  }
})
