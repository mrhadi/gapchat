import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import PropTypes from 'prop-types'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import colors from '../../styles/colors'
import { fontScale } from '../../utils/scaleUtils'

const CircleButton = ({
  icon,
  tintColor,
  badgeContent,
  diameter,
  onClick,
  badgeBGColor,
  badgeTextColor,
  style,
  isVisible
}) => {
  if (!isVisible) return null
  const touchableOpacityStyle = styles.circle(diameter)
  const badgeStyle = [styles.badge(diameter), { backgroundColor: badgeBGColor }]
  const badgeTextStyle = [styles.badgeText(diameter), { color: badgeTextColor }]
  return (
    <View style={[style, styles.container]}>
      <TouchableOpacity style={touchableOpacityStyle} onPress={onClick}>
        <EvilIcons
          style={{ color: tintColor }}
          name={icon}
          size={fontScale(diameter * 0.7)}
        />
        {!!badgeContent && (
          <View style={badgeStyle}>
            <Text style={badgeTextStyle}>{badgeContent}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

CircleButton.defaultProps = {
  badgeContent: null,
  diameter: 40,
  badgeBGColor: colors.activeBlue,
  badgeTextColor: '#FFF',
  style: {},
  isVisible: true
}

CircleButton.propTypes = {
  icon: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
  badgeContent: PropTypes.number,
  badgeBGColor: PropTypes.string,
  badgeTextColor: PropTypes.string,
  diameter: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  isVisible: PropTypes.bool
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  circle: diameter => ({
    height: diameter,
    width: diameter,
    borderRadius: diameter * 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 2
      },
      android: {
        elevation: 3
      }
    })
  }),
  badge: diameter => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: diameter / 8,
    top: diameter / 8,
    borderRadius: diameter / 5,
    width: diameter / 2.5,
    height: diameter / 2.5
  }),
  badgeText: diameter => ({
    fontSize: diameter / 4,
    fontWeight: '500'
  })
})

export default CircleButton
