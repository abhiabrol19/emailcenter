import axios from 'axios';
import { FETCH_USER } from './types';
//import { PAYMENT_INTENT } from './types';

export function fetchUser() {
  return async function (dispatch) {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  };
}

export function initiateCheckout() {
  return async function () {
    try {
      const res = await axios.post('/api/create-checkout-session');
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Error creating checkout session', error);
    }
  };
}
