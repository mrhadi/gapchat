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
      default:
        break
    }
  }

  function* watcher() {
    yield takeEvery([actions.GET_USER], worker)
  }

  return { worker, watcher }
}
