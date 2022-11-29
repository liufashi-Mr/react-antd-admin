import { combineReducers } from 'redux';
import CommonReducer from './common';
import SettingReducer from './settings';
export default combineReducers({
  CommonReducer,
  SettingReducer,
});
