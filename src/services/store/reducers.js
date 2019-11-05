import { combineReducers } from 'redux'

import userLocation from '../userLocation/reducer'
import user from '../user/reducer'

const createReducer = combineReducers({ userLocation, user })

export default createReducer
