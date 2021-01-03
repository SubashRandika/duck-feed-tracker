import { CLEAR_ERRORS, GET_ERRORS } from '../constants/types';

const initialState = {};

const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		case CLEAR_ERRORS:
			return initialState;
		default:
			return state;
	}
};

export default errorReducer;
