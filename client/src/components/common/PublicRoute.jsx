import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PublicRoute({ component: Component, auth, ...restProps }) {
	return (
		<Route
			{...restProps}
			render={({ location }) =>
				!auth.isAuthenticated ? (
					<Component />
				) : (
					<Redirect
						to={{
							pathname: '/home',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

PublicRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	rest: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(PublicRoute);
