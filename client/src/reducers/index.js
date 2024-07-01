import authReducer from './authReducer';
//import paymentReducer from './paymentReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  //payment: paymentReducer,
});
