import { Dimensions, Platform } from 'react-native'

const dim = Dimensions.get('window')

const iPhoneXSize = () => dim.height === 812 || dim.width === 812
const iPhoneXrSize = () => dim.height === 896 || dim.width === 896
const iPhoneX = () =>
  Platform.OS === 'ios' && (iPhoneXSize(dim) || iPhoneXrSize(dim))

export default iPhoneX
