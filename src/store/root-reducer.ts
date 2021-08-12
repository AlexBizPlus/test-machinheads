import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import checkedReducer from './checked/reducer';
import toastifyReducer from './toastify/reducer';

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    CHECKED: checkedReducer,
    TOASTIFY: toastifyReducer,
  });

export default rootReducer;
