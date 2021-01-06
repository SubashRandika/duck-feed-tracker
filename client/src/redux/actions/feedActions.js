import axios from 'axios';
import { showNotification } from '../../utils/showNotification';
import { GET_USER_FEEDS, SET_FEEDS_LOADING } from '../constants/types';

// get all the feeds of the signin user (authenticated user)
export const getFeedsByUser = (userId) => (dispatch) => {
	dispatch(setFeedsLoading(true));

	axios
		.get(`/api/feeds/${userId}`)
		.then(({ data }) => {
			dispatch({
				type: GET_USER_FEEDS,
				payload: data
			});

			dispatch(setFeedsLoading(false));
		})
		.catch((err) => {
			showNotification('Error', err.message, 'error');

			dispatch({
				type: GET_USER_FEEDS,
				payload: null
			});

			dispatch(setFeedsLoading(false));
		});
};

// set loading redux state until user feeds are loading
export const setFeedsLoading = (loading) => ({
	type: SET_FEEDS_LOADING,
	payload: loading
});
