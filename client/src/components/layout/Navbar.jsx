import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Layout, Space, Button, Avatar } from 'antd';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import Logo from '../common/Logo';
import './Navbar.styles.css';

const { Header } = Layout;

function Navbar({ auth, logoutUser }) {
	const history = useHistory();
	const { user } = auth;

	const handleLogout = (e) => {
		e.preventDefault();

		logoutUser();

		history.push('/signin');
	};

	// generate user's initials for avatar from name field of authenticated user
	const getUserNameInitials = ({ name }) => {
		return name
			.split(' ')
			.map((namePart) => namePart.charAt(0))
			.join('');
	};

	return (
		<Header className='navbar'>
			<Logo />
			<Space>
				<Avatar className='navbar__avatar' size={40}>
					{getUserNameInitials(user)}
				</Avatar>
				<Button
					className='logout__button'
					danger
					shape='round'
					size='large'
					onClick={handleLogout}
				>
					Logout
				</Button>
			</Space>
		</Header>
	);
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
	logoutUser: (credentials, history) =>
		dispatch(logoutUser(credentials, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
