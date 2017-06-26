import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

const API_URL = "http://localhost:3090";

export const signInUser = ({ email, password }) => {
	// With reduxThunk, our actionCreators can return a 
	// function that will be immediately called by the 
	// reduxThunk middleware.
	return (dispatch) => {
		// Submit email and password to server
		return axios.post(`${API_URL}/signin`, { email, password })
		// If req is successful (200+-), we hit the .then case
		.then((res) => {
			console.log(res);
			// 1. Dispatch action to update state
			dispatch({ type: AUTH_USER });
			// 2. Save the JWT token
			localStorage.setItem('token', res.data.token);
			// 3. Using browserHist to redirect to /feature
			browserHistory.push('/');
		})
		// If request is negative,	
		.catch(() => {
			// 1. Show an error to the user
			dispatch(createAuthError('Bad login information.'));
		});
	}
}

export const createAuthError = (error) => {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}