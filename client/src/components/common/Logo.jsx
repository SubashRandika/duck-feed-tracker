import React from 'react';
import { Typography } from 'antd';
import './Logo.styles.css';

const { Title } = Typography;

function Logo() {
	return (
		<div className='logo__container'>
			<Title className='logo__text__left'>Duck</Title>
			<Title className='logo__text__right'>Feed</Title>
		</div>
	);
}

export default Logo;
