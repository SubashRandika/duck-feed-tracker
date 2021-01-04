import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PrivateRoute({ children, auth, ...restProps }) {
	return (
		<Route
			{...restProps}
			render={({ location }) =>
				auth.isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/signin',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	rest: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
