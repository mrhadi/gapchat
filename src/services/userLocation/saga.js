import { takeEvery, call, put } from 'redux-saga/effects'

import { isOkay } from '../../utils/responseUtils'
import * as actions from './actions'

export default api => {
  function* worker(action) {
    let response = null
    switch (action.type) {
      case actions.UPDATE_USER_LOCATION:
        response = yield call(api.updateUserLocation, action.payload)
        if (isOkay(response)) {
          yield put(actions.updateUserLocationSuccess(response.data))
        } else {
          yield put(actions.updateUserLocationFail())
        }
        break
      case actions.SET_LOCATION:
        console.log('SET_LOCATION:', action.payload)
        break
      case actions.GET_LOCATION:
        console.log('GET_LOCATION')
        break
      default:
        break
    }
  }

  function* watcher() {
    yield takeEvery([actions.UPDATE_USER_LOCATION], worker)
    yield takeEvery([actions.SET_LOCATION], worker)
    yield takeEvery([actions.GET_LOCATION], worker)
  }

  return { worker, watcher }
}
