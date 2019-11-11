import { createReducer } from 'reduxsauce'
import * as actions from './actions'

const INITIAL_STATE = {
  data: null,
  fetchingData: null,
  error: null,
  userVerified: null,
  userUpdated: null
}

export const getUser = (state, action) => ({
  ...state,
  fetchingData: true
})
export const getUserSuccess = (state, action) => ({
  ...state,
  data: action.payload,
  fetchingData: false,
  error: false,
  userVerified: true
})
export const getUserFailure = state => ({
  ...state,
  error: true,
  fetchingData: false,
  userVerified: false
})

export const addUser = (state, action) => ({
  ...state,
  fetchingData: true
})
export const addUserSuccess = (state, action) => ({
  ...state,
  data: action.payload,
  fetchingData: false,
  error: false,
  userVerified: true
})
export const addUserFailure = state => ({
  ...state,
  error: true,
  fetchingData: false,
  userVerified: false
})

export const updateUser = (state, action) => ({
  ...state,
  fetchingData: true,
  userUpdated: null
})
export const updateUserSuccess = (state, action) => ({
  ...state,
  data: action.payload,
  fetchingData: false,
  error: false,
  userUpdated: true
})
export const updateUserFailure = state => ({
  ...state,
  error: true,
  fetchingData: false,
  userUpdated: false
})

export const ACTION_HANDLERS = {
  [actions.GET_USER]: getUser,
  [actions.GET_USER_SUCCESS]: getUserSuccess,
  [actions.GET_USER_FAIL]: getUserFailure,
  [actions.ADD_USER]: addUser,
  [actions.ADD_USER_SUCCESS]: addUserSuccess,
  [actions.ADD_USER_FAIL]: addUserFailure,
  [actions.UPDATE_USER]: updateUser,
  [actions.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [actions.UPDATE_USER_FAIL]: updateUserFailure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
