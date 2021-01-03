import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Tooltip, Typography } from 'antd';
import {
	MailOutlined,
	LockOutlined,
	UserOutlined,
	QuestionCircleOutlined
} from '@ant-design/icons';
import Logo from '../components/common/Logo';
import './SignUp.styles.css';

const { Text } = Typography;

function SignUp() {
	const initialSignUpDetails = {
		name: '',
		username: '',
		email: '',
		password: ''
	};

	const handleSignUp = (userData) => {
		const newUserDetails = {
			name: userData.name,
			username: userData.username,
			email: userData.email,
			password: userData.password
		};

		console.log(newUserDetails);
	};

	return (
		<div className='signup__container'>
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
					<Form.Item className='name_form_item' name='name' hasFeedback>
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
					<Form.Item className='username_form_item' name='username' hasFeedback>
						<Input
							size='large'
							placeholder='Username'
							prefix={<UserOutlined className='form_item_icon' />}
							suffix={
								<Tooltip title='What do you want us to call when you signed in?'>
									<QuestionCircleOutlined />
								</Tooltip>
							}
						/>
					</Form.Item>
					<Form.Item className='email_form_item' name='email' hasFeedback>
						<Input
							size='large'
							prefix={<MailOutlined className='form_item_icon' />}
							placeholder='Email'
						/>
					</Form.Item>
					<Form.Item className='password_form_item' name='password' hasFeedback>
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

export default SignUp;
