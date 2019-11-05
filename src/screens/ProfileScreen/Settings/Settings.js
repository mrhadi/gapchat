import React, { PureComponent } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../../../styles/colors'
import Slider from '@react-native-community/slider'
import { fontScale, scaleHeight, scaleWidth } from '../../../utils/scaleUtils'

const EARTH_CIRCUMFERENCE = 40075

export default class Settings extends PureComponent {
  static propTypes = {
    onSettingsChanged: PropTypes.func.isRequired,
    defaultSettings: PropTypes.object.isRequired
  }

  state = {
    userActive: true,
    userNearestDistance: 20,
    userFurthestDistance: 20000
  }

  componentDidMount() {
    const { defaultSettings } = this.props
    this.setState({
      userActive: defaultSettings.userActive,
      userNearestDistance: defaultSettings.userNearestDistance,
      userFurthestDistance: defaultSettings.userFurthestDistance
    })
  }

  handleNearestChanged = value => {
    this.setState({ userNearestDistance: value })
  }

  handleFurthestChanged = value => {
    this.setState({ userFurthestDistance: value })
  }

  handleActiveChanged = () => {
    const { userActive } = this.state
    this.setState({ userActive: !userActive })
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.defaultSettings) === JSON.stringify(this.state)
    )
      return
    const { userActive, userFurthestDistance, userNearestDistance } = this.state
    this.props.onSettingsChanged({
      userActive: userActive,
      userNearestDistance: userNearestDistance,
      userFurthestDistance: userFurthestDistance
    })
  }

  render() {
    const { userActive, userFurthestDistance, userNearestDistance } = this.state
    return (
      <View style={styles.settingsContainer}>
        <View style={styles.featureRow}>
          <Text style={styles.featureTitle}>Active</Text>
          <Switch
            trackColor={{
              true: Colors.purple,
              false: Colors.buttonGrey
            }}
            value={userActive}
            thumbColor={Colors.buttonGrey}
            onValueChange={this.handleActiveChanged}
          />
        </View>
        <Text style={styles.featureDescription}>
          Set if you are availabe for chatting or not.
        </Text>
        <View style={{ height: 15 }} />
        <View style={styles.featureRow}>
          <Text style={styles.featureTitle}>Nearest Distance</Text>
          <Text style={styles.km}>{userNearestDistance} m</Text>
        </View>
        <Text style={styles.featureDescription}>
          Choose the nearest distance you want us to find your potential
          friends.
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={20}
          step={20}
          onValueChange={value => this.handleNearestChanged(value)}
          value={userNearestDistance}
          maximumValue={10000}
          minimumTrackTintColor={Colors.errorRed}
          maximumTrackTintColor={Colors.sliderGrey}
          thumbTintColor={Colors.sliderViolet}
        />
        <View style={{ height: 15 }} />
        <View style={styles.featureRow}>
          <Text style={styles.featureTitle}>Furthest Distance</Text>
          <Text style={styles.km}>{userFurthestDistance} km</Text>
        </View>
        <Text style={styles.featureDescription}>
          Choose the furthest distance you want us to find your potential
          friends.
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={20}
          step={50}
          onValueChange={value => this.handleFurthestChanged(value)}
          value={userFurthestDistance}
          maximumValue={Math.round(EARTH_CIRCUMFERENCE / 2)}
          minimumTrackTintColor={Colors.textViolet}
          maximumTrackTintColor={Colors.sliderGrey}
          thumbTintColor={Colors.sliderViolet}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  settingsContainer: {
    marginTop: scaleHeight(30),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  featureRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  featureTitle: {
    color: Colors.textViolet,
    fontSize: fontScale(14),
    fontWeight: '500'
  },
  km: {
    color: Colors.textViolet,
    fontSize: fontScale(12),
    fontWeight: '500'
  },
  featureDescription: {
    color: Colors.textGrey,
    fontSize: fontScale(11),
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    width: scaleWidth(200)
  },
  slider: {
    width: '100%',
    height: scaleHeight(30),
    marginTop: 10
  }
})
