import React from 'react';
import { Layout, Tabs } from 'antd';
import Navbar from '../components/layout/Navbar';
import FooterSection from '../components/layout/FooterSection';
import Container from '../components/layout/Container';
import './Home.styles.css';

const { TabPane } = Tabs;

function Home() {
	return (
		<Layout className='home__layout'>
			<Navbar />
			<Container>
				<h1>Feed Details of the User</h1>
			</Container>
			<FooterSection />
		</Layout>
	);
}

export default Home;
