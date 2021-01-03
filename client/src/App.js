import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';

const store = configureStore();

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/signin' component={SignIn} />
					<Route exact path='/register' component={SignUp} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
