import { Dimensions } from 'react-native'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export const scaleWidth = width => (width * screenWidth) / 375
export const scaleHeight = height => (height * screenHeight) / 812
export const scaleY = y => (screenHeight / 812) * y
export const scaleX = x => (screenWidth / 375) * x
export const fontScale = size => (screenWidth / 375) * size
