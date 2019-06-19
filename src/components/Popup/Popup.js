import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { TwinButtons, TwinButtonsDim } from '../TwinButtons/TwinButtons'

export default class Popup extends PureComponent {
  static defaultProps = {
    style: { width: 200, height: 100 }
  }

  static propTypes = {
    style: PropTypes.object,
    content: PropTypes.object.isRequired,
    onReturnClick: PropTypes.func.isRequired
  }

  render() {
    const { style, content, onReturnClick } = this.props
    return (
      <View style={[styles.container, style]}>
        <View style={styles.content}>{content}</View>
        <TwinButtons
          style={[
            styles.twinButtons,
            { left: (style.width - TwinButtonsDim.width) / 2 }
          ]}
          onReturnClick={onReturnClick}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 1
  },
  twinButtons: {
    position: 'absolute',
    bottom: -TwinButtonsDim.buttonsHeight / 2
  },
  content: {
    flex: 1,
    margin: 2,
    alignItems: 'center'
  }
})
