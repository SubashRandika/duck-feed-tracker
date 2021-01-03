import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Card, Tooltip, Typography, Alert } from 'antd';
import {
	MailOutlined,
	LockOutlined,
	UserOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons';
import Logo from '../components/common/Logo';
import {
	requiredValidator,
	emailValidator,
	whitespaceValidator
} from '../validators/auth';
import { registerUser } from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorActions';
import { isErrorsEmpty } from '../utils/isEmpty';
import './SignUp.styles.css';

const { Text } = Typography;

function SignUp({ auth, errors, registerUser, clearErrors }) {
	const { message } = errors;
	let history = useHistory();
	const initialSignUpDetails = {
		name: '',
		username: '',
		email: '',
		password: ''
	};

	const handleSignUp = ({ name, username, email, password }) => {
		const newUserDetails = {
			name,
			username,
			email,
			password
		};

		registerUser(newUserDetails, history);
	};

	return (
		<div className='signup__container'>
			{isErrorsEmpty(errors) && (
				<Alert
					type='error'
					message={message}
					showIcon
					closable
					onClose={() => clearErrors()}
				/>
			)}
			<Text className='signup__title' type='secondary'>
				Sign Up
			</Text>
			<Card className='signup__card'>
				<Link to='/'>
					<Logo />
				</Link>
				<Form
					className='signup__form'
					name='signup_form'
					initialValues={initialSignUpDetails}
					onFinish={handleSignUp}
				>
					<Form.Item
						className='name_form_item'
						name='name'
						rules={[requiredValidator('name'), whitespaceValidator('name')]}
						hasFeedback
					>
						<Input
							size='large'
							placeholder='Name'
							prefix={<UserOutlined className='form_item_icon' />}
							suffix={
								<Tooltip title='Give us your first name and last name'>
									<QuestionCircleOutlined />
								</Tooltip>
							}
						/>
					</Form.Item>
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
							placeholder='Username'
							prefix={<UserOutlined className='form_item_icon' />}
							suffix={
								<Tooltip title='Give anything you always remember. We take this to signin'>
									<QuestionCircleOutlined />
								</Tooltip>
							}
						/>
					</Form.Item>
					<Form.Item
						className='email_form_item'
						name='email'
						rules={[requiredValidator('email'), emailValidator]}
						hasFeedback
					>
						<Input
							size='large'
							prefix={<MailOutlined className='form_item_icon' />}
							placeholder='Email'
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
							placeholder='Password'
							prefix={<LockOutlined className='form_item_icon' />}
						/>
					</Form.Item>
					<Form.Item className='signup_btn_form_item'>
						<Button className='signup_button' type='primary' htmlType='submit'>
							Register
						</Button>
					</Form.Item>
					<Form.Item className='signin_text_form_item'>
						<span>Already have an account?</span>
						<span>
							<Link className='signin_link' to='/signin'>
								Sign In
							</Link>
						</span>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
}

SignUp.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	registerUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
	registerUser: (newUserData, history) =>
		dispatch(registerUser(newUserData, history)),
	clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
