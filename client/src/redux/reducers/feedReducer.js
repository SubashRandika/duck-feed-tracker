import { GET_USER_FEEDS } from '../constants/types';
const initialState = {
	records: {}
};

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_FEEDS:
			return {
				...state,
				records: action.payload
			};
		default:
			return state;
	}
};

export default feedReducer;
