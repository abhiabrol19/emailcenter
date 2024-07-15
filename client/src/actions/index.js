import axios from 'axios';
import {
  FETCH_USER,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  RESET_PAGE,
  FETCH_SURVEYS,
} from './types';
//import { PAYMENT_INTENT } from './types';

export function fetchUser() {
  return async function (dispatch) {
    const res = await axios.get('/api/current_user', { withCredentials: true });
    dispatch({ type: FETCH_USER, payload: res.data });
  };
}

export function initiateCheckout() {
  return async function () {
    try {
      const res = await axios.post(
        '/api/create-checkout-session',
        {},
        { withCredentials: true }
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Error creating checkout session', error);
    }
  };
}

export const nextPage = () => ({ type: NEXT_PAGE });
export const previousPage = () => ({ type: PREVIOUS_PAGE });

export function submitSurvey(values) {
  return async function (dispatch) {
    try {
      const res = await axios.post('/api/surveys', values, {
        withCredentials: true,
      });
      const { user, survey } = res.data;
      dispatch({ type: FETCH_USER, payload: user });
      dispatch({ type: RESET_PAGE });
      return res.data; // Return the response data
    } catch (error) {
      console.error('Error submitting survey', error);
      throw error; // Throw the error so it can be caught in onSubmit
    }
  };
}

export function fetchSurveys() {
  return async function (dispatch) {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  };
}
