import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import RoundButton from '../RoundButton/RoundButton'

export default class Popup extends PureComponent {
  static defaultProps = {
    style: { width: 200, height: 100 },
    returnButtonTitle: 'Cancel'
  }

  static propTypes = {
    style: PropTypes.object,
    content: PropTypes.object.isRequired,
    onReturnClick: PropTypes.func.isRequired,
    returnButtonTitle: PropTypes.string
  }

  render() {
    const { style, content, onReturnClick, returnButtonTitle } = this.props
    return (
      <View style={[styles.container, style]}>
        <View style={styles.content}>{content}</View>
        <View style={[styles.buttonContainer, { width: style.width }]}>
          <RoundButton
            title={returnButtonTitle}
            onPress={onReturnClick}
            showBackground={true}
          />
        </View>
      </View>
    )
  }
}

/*
<TwinButtons
  style={[
    styles.twinButtons,
    { left: (style.width - TwinButtonsDim.width) / 2 }
  ]}
  onReturnClick={onReturnClick}
/>

  twinButtons: {
    position: 'absolute',
    bottom: -TwinButtonsDim.buttonsHeight / 2
  },
*/

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 1
  },
  content: {
    flex: 1,
    margin: 2,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 46,
    position: 'absolute',
    bottom: -23,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
