import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import Colors from '../../styles/colors'

export default class AvatarIcon extends PureComponent {
  static defaultProps = {
    isSelected: false,
    onClick: () => {}
  }

  static propTypes = {
    avatar: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func
  }

  state = {
    selected: false
  }

  componentDidMount() {
    const { isSelected } = this.props
    this.setState({ selected: isSelected })
  }

  handleOnPress = () => {
    this.setState({ selected: true })
    this.props.onClick()
  }

  render() {
    const { avatar } = this.props
    const { selected } = this.state
    return (
      <TouchableOpacity
        style={
          selected
            ? [styles.avatarContainer, styles.avatarContainerSelected]
            : styles.avatarContainer
        }
        onPress={this.handleOnPress}
      >
        <Image
          key={avatar}
          source={{ uri: `${avatar}` }}
          style={selected ? styles.avatarSelected : styles.avatar}
        />
        {selected && (
          <Icon
            name="arrow-down-left"
            size={20}
            color={Colors.checkGreen}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 38,
    height: 38
  },
  avatarSelected: {
    width: 42,
    height: 42
  },
  avatarContainer: {
    backgroundColor: 'white',
    width: 38,
    height: 38,
    borderRadius: 76,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarContainerSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5
  },
  checkIcon: {
    position: 'absolute',
    right: -13,
    top: -13
  }
})
