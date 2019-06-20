import React, { PureComponent } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { fontScale } from '../../utils/scaleUtils'
import Colors from '../../styles/colors'
import AvatarIcon from '../AvatarIcon/AvatarIcon'

const AVATAR_COUNT = 110

export default class AvatarBrowser extends PureComponent {
  static defaultProps = {
    onClick: () => {}
  }

  static propTypes = {
    onClick: PropTypes.func
  }

  state = {
    avatarImages: []
  }

  componentDidMount() {
    this.setState({
      avatarImages: Array.from(
        {
          length: AVATAR_COUNT
        },
        (_, i) => ({
          name: 'avatar_' + (i + 1).toString().padStart(3, '0'),
          isSelected: false
        })
      )
    })
  }

  handleOnClick = avatar => {
    const { avatarImages } = this.state

    const updatedObjects = avatarImages.map(obj =>
      obj.name === avatar.name
        ? { ...obj, isSelected: true }
        : { ...obj, isSelected: false }
    )

    this.setState({ avatarImages: updatedObjects })
  }

  renderAvatar = avatar => (
    <AvatarIcon
      avatar={avatar.name}
      isSelected={avatar.isSelected}
      onClick={() => this.handleOnClick(avatar)}
    />
  )

  render() {
    const { avatarImages } = this.state
    return (
      <View style={styles.popupContent}>
        <Text style={styles.popupTitle}>Choose your Avatar</Text>
        <FlatList
          data={avatarImages}
          renderItem={({ item }) => this.renderAvatar(item)}
          horizontal={false}
          numColumns={5}
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={25}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  popupContent: {
    width: 265,
    height: 310
  },
  popupTitle: {
    alignSelf: 'center',
    fontSize: fontScale(14),
    color: Colors.textViolet,
    marginVertical: 10
  }
})
