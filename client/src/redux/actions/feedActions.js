import axios from 'axios';
import { FEEDS_LOADING, GET_ERRORS, GET_USER_FEEDS } from '../constants/types';

// set feeds are still loading
export const setFeedsLoading = () => {
	return {
		type: FEEDS_LOADING
	};
};

// get all the feeds of the signin user (authenticated user)
export const getFeedsByUser = (userId) => (dispatch) => {
	dispatch(setFeedsLoading);

	axios
		.get(`/api/feeds/${userId}`)
		.then(({ data }) => {
			dispatch({
				type: GET_USER_FEEDS,
				payload: data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});

			dispatch({
				type: GET_USER_FEEDS,
				payload: null
			});
		});
};
