import { fork } from 'redux-saga/effects'

import userLocationAPI from '../userLocation/api'
import userLocationSaga from '../userLocation/saga'

import userAPI from '../user/api'
import userSaga from '../user/saga'

export default function* root() {
  yield fork(userLocationSaga(userLocationAPI()).watcher)
  yield fork(userSaga(userAPI()).watcher)
}
