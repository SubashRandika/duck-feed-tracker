import { LOADING_UI } from '../constants/types';

const initialState = {
	loading: false
};

const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_UI:
			return {
				...state,
				loading: action.payload
			};
		default:
			return state;
	}
};

export default loadingReducer;
