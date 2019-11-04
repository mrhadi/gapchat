import { combineReducers } from 'redux'

import userLocation from '../userLocation/reducer'

const createReducer = combineReducers({ userLocation })

export default createReducer
