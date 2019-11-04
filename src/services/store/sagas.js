import { fork } from 'redux-saga/effects'

import userLocationAPI from '../userLocation/api'
import userLocationSaga from '../userLocation/saga'

export default function* root() {
  yield fork(userLocationSaga(userLocationAPI()).watcher)
}
