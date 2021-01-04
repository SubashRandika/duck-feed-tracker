import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Tabs, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import { getFeedsByUser } from '../redux/actions/feedActions';
import Navbar from '../components/layout/Navbar';
import FooterSection from '../components/layout/FooterSection';
import Container from '../components/layout/Container';
import './Home.styles.css';
import NoFeeds from '../components/feeds/NoFeeds';
import FeedsTable from '../components/feeds/FeedsTable';

const { TabPane } = Tabs;

function Home({ auth, feeds, ui, getFeedsByUser }) {
	const { id, name } = auth.user;
	const { feeds: feedData } = feeds.records;
	let feedsTabContent;

	const handleNewFeedCreate = (e) => {
		e.preventDefault();
		//TODO: handle creation of new feed.

		console.log('New feed create action performed');
	};

	if (ui.loading) {
		feedsTabContent = (
			<div className='spin__container'>
				<Spin size='large' />
			</div>
		);
	} else {
		if (feedData && feedData.length > 0) {
			feedsTabContent = (
				<div>
					<Button
						className='new__feedBtn'
						type='primary'
						size='large'
						onClick={handleNewFeedCreate}
					>
						New Feed
					</Button>
					<FeedsTable feeds={feedData} />
				</div>
			);
		} else {
			feedsTabContent = <NoFeeds name={name} />;
		}
	}

	useEffect(() => {
		getFeedsByUser(id);
	}, [getFeedsByUser, id]);

	return (
		<Layout className='home__layout'>
			<Navbar />
			<Container>
				<Tabs defaultActiveKey='1' size='large'>
					<TabPane tab='Feeds' key='1'>
						{feedsTabContent}
					</TabPane>
					<TabPane tab='Schedules' key='2'>
						{`Schedule Records of ${name}`}
					</TabPane>
				</Tabs>
			</Container>
			<FooterSection />
		</Layout>
	);
}

Home.propTypes = {
	auth: PropTypes.object.isRequired,
	feeds: PropTypes.object.isRequired,
	ui: PropTypes.object.isRequired,
	getFeedsByUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	feeds: state.feeds,
	ui: state.ui
});

const mapDispatchToProps = (dispatch) => ({
	getFeedsByUser: (userId) => dispatch(getFeedsByUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
