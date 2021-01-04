import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text, Link } = Typography;

function FooterSection() {
	return (
		<Footer className='footer'>
			<Text type='secondary'>DuckFeed Tracker ©2021 Created by &nbsp;</Text>
			<Link href='https://github.com/SubashRandika' target='_blank'>
				Randika Rodrigo
			</Link>
		</Footer>
	);
}

export default FooterSection;
