/**
 * @format
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import bg from '../../assets/images/onboarding/bg.png'
import intro from '../../assets/images/onboarding/intro.png'
import location from '../../assets/images/onboarding/location.png'
import notification from '../../assets/images/onboarding/notification.png'
import {
  fontScale,
  scaleWidth,
  scaleHeight,
  scaleY
} from '../../utils/scaleUtils'
import Colors from '../../styles/colors'

const onboardingContents = [
  {
    image: intro,
    title: "Far or Near, let's Chat!",
    description:
      'One to one chat. There is no registration, no chat history, no personal details, no groups, just pick a nick name and set the profile photo or avatar and you are ready to go.'
  },
  {
    image: location,
    title: 'Enable your Location',
    description:
      'Any time you open the app, there is only two other users to chat with, only two! One of these two is the nearest to you and the other one is the furthest to you.'
  },
  {
    image: notification,
    title: 'Push Notifications',
    description:
      'Do not worry! We will let you know immediately after someone requests to have a chat with you or vice-versa. Do not forget to have fun!'
  }
]

export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { indexContent: 0 }
  }

  navigate = event => {
    const { navigation } = this.props
    navigation.replace('Profile', event)
  }

  goNext = () => {
    const { indexContent } = this.state
    indexContent === onboardingContents.length - 1
      ? this.navigate()
      : this.setState({ indexContent: indexContent + 1 })
  }

  render() {
    const { indexContent } = this.state
    return (
      <ImageBackground style={styles.bgImage} source={bg}>
        <SafeAreaView style={styles.container}>
          <Image
            style={styles.contentImage}
            source={onboardingContents[indexContent].image}
          />
          <Text style={styles.contentTitle}>
            {onboardingContents[indexContent].title}
          </Text>
          <View style={styles.divider} />
          <Text style={styles.contentDescription}>
            {onboardingContents[indexContent].description}
          </Text>
          <View style={styles.pagerDots}>
            {onboardingContents.map((content, index) => (
              <View
                key={content.title}
                style={[
                  {
                    backgroundColor:
                      index === indexContent
                        ? Colors.buttonViolet
                        : Colors.inactiveGrey
                  },
                  styles.pageDot
                ]}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={this.goNext}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center',
    backgroundColor: Colors.buttonViolet,
    borderColor: Colors.buttonViolet,
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: scaleY(30)
  },
  buttonText: {
    color: Colors.textWhite,
    fontSize: fontScale(14),
    fontWeight: '500',
    flex: 1,
    textAlign: 'center'
  },
  contentImage: {
    width: scaleWidth(217),
    height: scaleHeight(224),
    marginTop: scaleY(150),
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  contentTitle: {
    alignSelf: 'center',
    marginTop: scaleHeight(80),
    fontSize: fontScale(16),
    color: Colors.textViolet
  },
  contentDescription: {
    alignSelf: 'center',
    marginTop: scaleHeight(20),
    fontSize: fontScale(14),
    color: Colors.textViolet,
    marginHorizontal: scaleWidth(30),
    textAlign: 'center'
  },
  divider: {
    backgroundColor: Colors.textViolet,
    height: 2,
    alignSelf: 'center',
    width: scaleWidth(110),
    marginTop: scaleHeight(20)
  },
  pagerDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(20)
  },
  pageDot: {
    height: 8,
    width: 8,
    marginHorizontal: 5,
    borderRadius: 4
  }
})
