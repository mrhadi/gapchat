import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'
import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(createReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export default store
