import axios from 'axios';

const setAuthToken = (token) => {
	// if empty token is passed will remove authorization header
	if (token) {
		// apply for every request
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		// remove authorization header from request
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
