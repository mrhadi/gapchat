import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../../styles/colors'

const TwinButtonsDim = {
  buttonsWidth: 80,
  buttonsHeight: 46,
  buttonsOverlap: 15,
  buttonsBorderRadius: 10,
  width: 145,
  height: 46
}

class TwinButtons extends PureComponent {
  static defaultProps = {
    style: {}
  }

  static propTypes = {
    style: ViewPropTypes.style,
    onReturnClick: PropTypes.func.isRequired
  }

  render() {
    const { style, onReturnClick } = this.props
    return (
      <View style={[styles.container, style]}>
        <View style={[styles.buttonContainer, styles.buttonLeftContainer]}>
          <TouchableOpacity
            style={[styles.button, styles.buttonLeft]}
            onPress={onReturnClick}
          >
            <Text style={styles.buttonLeftText}>Return</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonContainer, styles.buttonRightContainer]}>
          <TouchableOpacity
            style={[styles.button, styles.buttonRight]}
            onPress={() => {}}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonRightText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export { TwinButtons, TwinButtonsDim }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: TwinButtonsDim.buttonsHeight,
    width: TwinButtonsDim.buttonsWidth * 2 - TwinButtonsDim.buttonsOverlap
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: TwinButtonsDim.buttonsWidth,
    height: TwinButtonsDim.buttonsHeight,
    borderRadius: TwinButtonsDim.buttonsBorderRadius
  },
  buttonLeft: {
    backgroundColor: Colors.buttonGrey
  },
  buttonRight: {
    backgroundColor: Colors.buttonViolet
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TwinButtonsDim.buttonsBorderRadius,
    borderWidth: 1,
    position: 'absolute',
    width: TwinButtonsDim.buttonsWidth,
    height: TwinButtonsDim.buttonsHeight
  },
  buttonLeftContainer: {
    backgroundColor: Colors.buttonGrey,
    borderColor: Colors.buttonGrey,
    left: 0,
    top: 0
  },
  buttonRightContainer: {
    backgroundColor: Colors.buttonViolet,
    borderColor: Colors.buttonViolet,
    left: TwinButtonsDim.buttonsWidth - TwinButtonsDim.buttonsOverlap
  },
  buttonLeftText: {
    color: Colors.textGrey,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 15
  },
  buttonRightText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 13
  }
})
