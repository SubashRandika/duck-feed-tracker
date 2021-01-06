import { GET_USER_FEEDS, SET_FEEDS_LOADING } from '../constants/types';
const initialState = {
	records: {},
	feedsLoading: false
};

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_FEEDS:
			return {
				...state,
				records: action.payload
			};
		case SET_FEEDS_LOADING:
			return {
				...state,
				feedsLoading: action.payload
			};
		default:
			return state;
	}
};

export default feedReducer;
