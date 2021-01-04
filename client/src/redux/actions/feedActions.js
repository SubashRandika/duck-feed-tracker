import axios from 'axios';
import { showNotification } from '../../utils/showNotification';
import { GET_USER_FEEDS, LOADING_UI } from '../constants/types';

// get all the feeds of the signin user (authenticated user)
export const getFeedsByUser = (userId) => (dispatch) => {
	dispatch({
		type: LOADING_UI,
		payload: true
	});

	axios
		.get(`/api/feeds/${userId}`)
		.then(({ data }) => {
			dispatch({
				type: GET_USER_FEEDS,
				payload: data
			});

			dispatch({
				type: LOADING_UI,
				payload: false
			});
		})
		.catch((err) => {
			showNotification('Error', err.message, 'error');

			dispatch({
				type: GET_USER_FEEDS,
				payload: null
			});
		});
};
