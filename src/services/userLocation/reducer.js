import { createReducer } from 'reduxsauce'
import * as actions from './actions'

const INITIAL_STATE = {
  data: null,
  fetchingData: null,
  error: null,
  getLocation: null
}

export const updateUserLocation = (state, action) => ({
  ...state,
  fetchingData: true,
  getLocation: null
})
export const updateUserLocationSuccess = (state, action) => ({
  ...state,
  data: action.payload,
  fetchingData: false,
  error: false,
  getLocation: null
})
export const updateUserLocationFailure = state => ({
  ...state,
  error: true,
  fetchingData: false,
  getLocation: null
})

export const getLocation = (state, action) => ({
  ...state,
  getLocation: true
})

export const ACTION_HANDLERS = {
  [actions.UPDATE_USER_LOCATION]: updateUserLocation,
  [actions.UPDATE_USER_LOCATION_FAIL]: updateUserLocationFailure,
  [actions.UPDATE_USER_LOCATION_SUCCESS]: updateUserLocationSuccess,
  [actions.GET_LOCATION]: getLocation
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
