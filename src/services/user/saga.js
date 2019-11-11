import { takeEvery, call, put } from 'redux-saga/effects'

import { isOkay } from '../../utils/responseUtils'
import * as actions from './actions'

export default api => {
  function* worker(action) {
    let response = null
    switch (action.type) {
      case actions.GET_USER:
        response = yield call(api.getUser)
        if (isOkay(response)) {
          yield put(actions.getUserSuccess(response.data))
        } else {
          yield put(actions.getUserFail())
        }
        break
      case actions.ADD_USER:
        response = yield call(api.addUser, action.payload)
        if (isOkay(response)) {
          yield put(actions.addUserSuccess(response.data))
        } else {
          yield put(actions.addUserFail())
        }
        break
      case actions.UPDATE_USER:
        response = yield call(api.updateUser, action.payload)
        if (isOkay(response)) {
          yield put(actions.updateUserSuccess(response.data))
        } else {
          yield put(actions.updateUserFail())
        }
        break
      default:
        break
    }
  }

  function* watcher() {
    yield takeEvery([actions.GET_USER], worker)
    yield takeEvery([actions.ADD_USER], worker)
    yield takeEvery([actions.UPDATE_USER], worker)
  }

  return { worker, watcher }
}
