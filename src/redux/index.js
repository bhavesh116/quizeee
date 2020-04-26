/* eslint-disable import/no-cycle */
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  duration: true,
  timestamp: true,
  diff: true,
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;
