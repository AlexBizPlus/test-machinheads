import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeEnhancers } from './utils';
import rootReducer from './root-reducer';
import { rootWatcher } from './root-watcher';

const sagaMiddleware = createSagaMiddleware();

// configure middlewares
export const history = createBrowserHistory();
const middlewares = [routerMiddleware(history), sagaMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
export const store = createStore(rootReducer(history), initialState, enhancer);

sagaMiddleware.run(rootWatcher);
