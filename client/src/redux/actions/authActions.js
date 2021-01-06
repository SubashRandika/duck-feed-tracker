import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
	GET_ERRORS,
	SET_CURRENT_USER,
	SET_USER_LOADING
} from '../constants/types';
import { showNotification } from '../../utils/showNotification';
import setAuthToken from '../../utils/setAuthToken';
import { clearErrors } from './errorActions';

// register a new user (Sign up a user)
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register-user', userData)
		.then(({ data }) => {
			showNotification('Success', data.message, 'success');

			// navigate to signin route with page reload
			history.push('/signin');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// login user with credentials (Sign in user with registered user)
export const signinUser = (credentials, history) => (dispatch) => {
	dispatch(setUserLoading(true));

	axios
		.post('/api/users/login-user', credentials)
		.then(({ data }) => {
			const { token } = data;

			// save to token to browser local storage
			localStorage.setItem('jwtToken', token);

			// set authorization header with jwt token
			setAuthToken(token);

			// decode jwt token to extract login user data
			const decodedUserData = jwt_decode(token);

			// set current login user
			dispatch(setCurrentUser(decodedUserData));

			showNotification(
				'Welcome',
				'Thank you for join with us. We value your feedback for consistent improvement of the system',
				'success'
			);

			// navigate to user's home route
			history.push('/home');

			dispatch(setUserLoading(false));
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});

			dispatch(setUserLoading(false));
		});
};

// logout currently signin user
export const logoutUser = () => (dispatch) => {
	// remove token from localStorage
	localStorage.removeItem('jwtToken');

	// remove authorization header from future requests
	setAuthToken(false);

	// set current signin user to {} which sets isAuthenticated to be false
	dispatch(setCurrentUser({}));

	// clear errors state
	dispatch(clearErrors());
};

// set the currently signed in user details into redux store
export const setCurrentUser = (userData) => ({
	type: SET_CURRENT_USER,
	payload: userData
});

// set loading state when sign in and sign up user
export const setUserLoading = (loading) => ({
	type: SET_USER_LOADING,
	payload: loading
});
