import React, { PureComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../../styles/colors'

export default class RoundButton extends PureComponent {
  static defaultProps = {
    onPress: () => {},
    title: 'Button',
    isPurple: true,
    showBackground: false
  }

  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    isPurple: PropTypes.bool,
    showBackground: PropTypes.bool
  }

  render() {
    const { onPress, title, isPurple } = this.props
    return (
      <View style={styles.bg}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            isPurple ? styles.buttonPurple : styles.buttonGrey
          ]}
          onPress={onPress}
        >
          <Text
            style={isPurple ? styles.buttonWhiteText : styles.buttonGreyText}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    width: 80,
    height: 46
  },
  buttonGrey: {
    backgroundColor: Colors.buttonGrey,
    borderColor: Colors.buttonGrey
  },
  buttonPurple: {
    backgroundColor: Colors.buttonViolet,
    borderColor: Colors.buttonViolet
  },
  buttonGreyText: {
    color: Colors.textGrey,
    fontSize: 12,
    fontWeight: '500'
  },
  buttonWhiteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500'
  },
  bg: {
    borderRadius: 10,
    width: 80,
    height: 46,
    backgroundColor: 'white'
  }
})
