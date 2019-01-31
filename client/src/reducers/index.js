import login_Reducer from './login';
import register_Reducer from './Register';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  login_Reducer,
  register_Reducer
});

export default rootReducer;
