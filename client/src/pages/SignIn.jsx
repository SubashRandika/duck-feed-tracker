import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { requiredValidator, emailValidator } from '../validators/auth';
import Logo from '../components/common/Logo';
import './SignIn.styles.css';

const { Text } = Typography;

function SignIn() {
	const initialCredentials = { email: '', password: '' };

	const handleSignIn = (credentials) => {
		const userCredentials = {
			email: credentials.email,
			password: credentials.password
		};

		console.log(userCredentials);
	};

	return (
		<div className='signin__container'>
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

export default SignIn;
