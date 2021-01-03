import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const configureStore = () => {
	const initialState = {};
	const middleware = [thunk];

	const store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware))
	);

	return store;
};

export default configureStore;
