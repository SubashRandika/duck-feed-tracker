import { SET_CURRENT_USER, SET_USER_LOADING } from '../constants/types';
import { isEmpty } from '../../utils/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {},
	userLoading: false
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case SET_USER_LOADING:
			return {
				...state,
				userLoading: action.payload
			};
		default:
			return state;
	}
};

export default authReducer;
