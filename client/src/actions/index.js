import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3000';

// redux-thunk allows us to return a function from action creator
// this funciton is automatically called wiht dispatch method
// this allows us to dispatch multiple actions in an action creator
// this is great for handling complex logic with a single action creator
// https://github.com/gaearon/redux-thunk

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      // update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      // save the jwt token
      localStorage.setItem('token', response.data.token);
      // redirect to the route /feature
      browserHistory.push('/feature');
    })
    .catch(() => {
      // show an error to the user)
      dispatch(authError('Bad login info'));
    });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    })
    // .catch(response => dispatch(authError(response.error)));
    .catch(error => {
      // show an error to the user)
      dispatch(authError(error.response.data.error));
    });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  // remove JWT token from local storage on signout
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage() {
  return function(dispatch) {
    // test authenticated response to protected server route
    axios.get(`${ROOT_URL}/`, {
      // include JWT token inside header to make auth request
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      // dispatch action to add data to app state
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      });
    });
  };
}
