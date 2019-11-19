import React, { PureComponent } from 'react'
import { StyleSheet, Easing, Dimensions, View, Animated } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

import { scaleWidth, fontScale } from '../../utils/scaleUtils'
import colors from '../../styles/colors'

const { height, width } = Dimensions.get('window')
const containerDiameter = scaleWidth(130)
const locationDiameter = scaleWidth(40)

export default class Scanner extends PureComponent {
  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = { spinValue: new Animated.Value(0) }
  }

  componentDidMount() {
    this.doSpin()
  }

  doSpin = () => {
    const { spinValue } = this.state

    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      spinValue.setValue(0)
      this.doSpin()
    })
  }

  render() {
    const { spinValue } = this.state
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const animatedStyle = { transform: [{ rotate: spin }] }

    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.location}>
          <FontAwesome
            style={{ color: 'white' }}
            name="location-arrow"
            size={fontScale(locationDiameter / 3)}
          />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(114,35,255,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: width / 2 - containerDiameter / 2,
    top: height / 2 - containerDiameter / 2,
    borderRadius: containerDiameter / 2,
    width: containerDiameter,
    height: containerDiameter
  },
  location: {
    backgroundColor: colors.buttonViolet,
    width: locationDiameter,
    height: locationDiameter,
    borderRadius: locationDiameter / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
