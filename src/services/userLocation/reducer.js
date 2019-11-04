import { createReducer } from 'reduxsauce'
import * as actions from './actions'

const INITIAL_STATE = {
  data: null,
  fetchingData: null,
  error: null
}

export const updateUserLocation = (state, action) => ({
  ...state,
  fetchingData: true
})

export const updateUserLocationSuccess = (state, action) => ({
  ...state,
  data: action.payload,
  fetchingData: false,
  error: false
})

export const updateUserLocationFailure = state => ({
  ...state,
  error: true,
  fetchingData: false
})

export const ACTION_HANDLERS = {
  [actions.UPDATE_USER_LOCATION]: updateUserLocation,
  [actions.UPDATE_USER_LOCATION_FAIL]: updateUserLocationFailure,
  [actions.UPDATE_USER_LOCATION_SUCCESS]: updateUserLocationSuccess
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
