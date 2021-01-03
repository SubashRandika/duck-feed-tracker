import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import configureStore from './redux/configureStore';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import './App.css';
import PublicRoute from './components/common/PublicRoute';
import PrivateRoute from './components/common/PrivateRoute';

const store = configureStore();

// check availability of auth token
const { jwtToken } = localStorage;

if (jwtToken) {
	// sets token in the authorization header
	setAuthToken(jwtToken);

	// decode token and extract signin user info and expiration time
	const decoded = jwt_decode(jwtToken);

	// sets whether user is authenticated or not
	store.dispatch(setCurrentUser(decoded));

	// check whether token has expired
	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		// logout currently login users
		store.dispatch(logoutUser());
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<PublicRoute exact path='/' component={Landing} />
					<PublicRoute exact path='/signin' component={SignIn} />
					<PublicRoute exact path='/register' component={SignUp} />
					<PrivateRoute exact path='/home' component={Home} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
