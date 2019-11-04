export const UPDATE_USER_LOCATION = 'UPDATE_USER_LOCATION'
export const UPDATE_USER_LOCATION_SUCCESS = 'UPDATE_USER_LOCATION_SUCCESS'
export const UPDATE_USER_LOCATION_FAIL = 'UPDATE_USER_LOCATION_FAIL'

export const updateUserLocation = payload => ({
  type: UPDATE_USER_LOCATION,
  payload: payload
})

export const updateUserLocationSuccess = payload => ({
  type: UPDATE_USER_LOCATION_SUCCESS,
  payload: payload
})

export const updateUserLocationFail = () => ({
  type: UPDATE_USER_LOCATION_FAIL
})
