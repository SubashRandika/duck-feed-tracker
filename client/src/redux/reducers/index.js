import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import feedReducer from './feedReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
	auth: authReducer,
	feeds: feedReducer,
	errors: errorReducer,
	ui: loadingReducer
});
