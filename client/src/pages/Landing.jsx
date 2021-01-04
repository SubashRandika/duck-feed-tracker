import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Layout, Typography, Button, Image } from 'antd';
import './Landing.styles.css';
import Logo from '../components/common/Logo';
import FooterSection from '../components/layout/FooterSection';
import HomeImage from '../assets/home.png';
import { ReactComponent as BackgroundBlob } from '../assets/blob.svg';

const { Header, Content } = Layout;
const { Title } = Typography;

function Landing() {
	return (
		<Layout className='landing'>
			<Header className='header__nav'>
				<Logo />
				<RouterLink to='/signin'>
					<Button
						className='signin__button'
						type='primary'
						shape='round'
						size='large'
					>
						Sign In
					</Button>
				</RouterLink>
			</Header>
			<Content className='landing__content'>
				<div className='content__left'>
					<Title className='main__title'>Do you feed ducks?</Title>
					<Title className='sub__text' level={4}>
						Keep track of your duck feeding pattern
					</Title>
					<Title className='sub__text' level={4}>
						You can schedule your regular feeds
					</Title>
					<Title className='sub__text' level={4}>
						We care and keep secure your data
					</Title>
					<Title className='sub__text' level={4}>
						Join with us today
					</Title>
					<RouterLink to='/register'>
						<Button
							className='signup__button'
							danger
							shape='round'
							size='large'
						>
							Create an account
						</Button>
					</RouterLink>
				</div>
				<div className='image__container'>
					<Image width={650} src={HomeImage} />
					<BackgroundBlob className='bg__blob' />
				</div>
			</Content>
			<FooterSection />
		</Layout>
	);
}

export default Landing;
