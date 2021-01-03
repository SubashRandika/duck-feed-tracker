import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/layout/Navbar';
import './Home.styles.css';

function Home() {
	return (
		<Layout className='home__layout'>
			<Navbar />
		</Layout>
	);
}

export default Home;
