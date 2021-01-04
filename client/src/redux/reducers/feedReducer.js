import { FEEDS_LOADING, GET_USER_FEEDS } from '../constants/types';
const initialState = {
	data: null,
	loading: false
};

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case FEEDS_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_USER_FEEDS:
			return {
				...state,
				data: action.payload,
				loading: false
			};
		default:
			return state;
	}
};

export default feedReducer;
