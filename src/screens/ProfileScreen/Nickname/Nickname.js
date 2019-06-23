import React, { PureComponent } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Colors from '../../../styles/colors'
import { fontScale, scaleHeight, scaleWidth } from '../../../utils/scaleUtils'

export default class Nickname extends PureComponent {
  static propTypes = {
    nickname: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  state = {
    userNickname: ''
  }

  componentDidMount() {
    const { nickname } = this.props
    this.setState({ userNickname: nickname })
  }

  handleTextBlur = () => {
    const { userNickname } = this.state
    this.props.onBlur(userNickname)
  }

  render() {
    const { userNickname } = this.state
    return (
      <View style={styles.nickNameContainer}>
        <EvilIcons
          style={{ color: Colors.textViolet }}
          name="user"
          size={fontScale(26)}
        />
        <TextInput
          style={styles.nickNameTextInput}
          placeholder="Enter your nickname"
          returnKeyLabel="Done"
          returnKeyType="go"
          spellCheck={false}
          autoCapitalize="words"
          maxLength={20}
          onChangeText={userNickname => this.setState({ userNickname })}
          onBlur={this.handleTextBlur}
          value={userNickname}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nickNameContainer: {
    flexDirection: 'row',
    marginTop: scaleHeight(30),
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
