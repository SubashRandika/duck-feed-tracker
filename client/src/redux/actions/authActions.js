import axios from 'axios';
import { GET_ERRORS } from '../constants/types';

// register a new user (Sign up a user)
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register-user', userData)
		.then(() => {
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
