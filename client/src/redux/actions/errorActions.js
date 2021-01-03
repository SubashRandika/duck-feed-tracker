import { CLEAR_ERRORS } from '../constants/types';

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
