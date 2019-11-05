export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

export const ADD_USER = 'ADD_USER'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const ADD_USER_FAIL = 'ADD_USER_FAIL'

export const getUser = payload => ({
  type: GET_USER,
  payload: payload
})
export const getUserSuccess = payload => ({
  type: GET_USER_SUCCESS,
  payload: payload
})
export const getUserFail = () => ({
  type: GET_USER_FAIL
})

export const addUser = payload => ({
  type: ADD_USER,
  payload: payload
})
export const addUserSuccess = payload => ({
  type: ADD_USER_SUCCESS,
  payload: payload
})
export const addUserFail = () => ({
  type: ADD_USER_FAIL
})
