import { combineReducers } from 'redux';

import appReducer from './containers/App/reducer';

const app = (state={}, action) => state;

export default combineReducers({
    appReducer,
})