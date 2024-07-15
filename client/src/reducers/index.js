import authReducer from './authReducer';
import { pageReducer } from './pageReducer';
import { surveyReducer } from './surveyReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  page: pageReducer,
  surveys: surveyReducer,
});
