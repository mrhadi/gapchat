export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

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
