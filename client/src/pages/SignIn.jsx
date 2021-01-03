import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { requiredValidator, whitespaceValidator } from '../validators/auth';
import { signinUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { isErrorsEmpty } from '../utils/isEmpty';
import Logo from '../components/common/Logo';
import './SignIn.styles.css';

const { Text } = Typography;

function SignIn({ auth, errors, signinUser, clearErrors }) {
	const { message } = errors;
	const history = useHistory();
	const initialCredentials = { username: '', password: '' };

	const handleSignIn = ({ username, password }) => {
		const userCredentials = {
			username,
			password
		};

		signinUser(userCredentials, history);
	};

	return (
		<div className='signin__container'>
			{isErrorsEmpty(errors) && (
				<Alert
					type='error'
					message={message}
					showIcon
					closable
					onClose={() => clearErrors()}
				/>
			)}
			<Text className='signin__title' type='secondary'>
				Sign In
			</Text>
			<Card className='signin__card'>
				<Link to='/'>
					<Logo />
				</Link>
				<Form
					className='signin__form'
					name='signin_form'
					initialValues={initialCredentials}
					onFinish={handleSignIn}
				>
					<Form.Item
						className='username_form_item'
						name='username'
						rules={[
							requiredValidator('username'),
							whitespaceValidator('username')
						]}
						hasFeedback
					>
						<Input
							size='large'
							prefix={<UserOutlined className='form_item_icon' />}
							placeholder='Username'
						/>
					</Form.Item>
					<Form.Item
						className='password_form_item'
						name='password'
						rules={[requiredValidator('password')]}
						hasFeedback
					>
						<Input.Password
							size='large'
							prefix={<LockOutlined className='form_item_icon' />}
							placeholder='Password'
						/>
					</Form.Item>
					<Form.Item className='signin_btn_form_item'>
						<Button
							className='signin_button'
							type='primary'
							size='large'
							htmlType='submit'
						>
							Sign In
						</Button>
					</Form.Item>
					<Form.Item className='signup_text_form_item'>
						<span>Do not have an account?</span>
						<span>
							<Link className='signup_link' to='/register'>
								Sign Up
							</Link>
						</span>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

SignIn.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	signinUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
	signinUser: (credentials, history) =>
		dispatch(signinUser(credentials, history)),
	clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
