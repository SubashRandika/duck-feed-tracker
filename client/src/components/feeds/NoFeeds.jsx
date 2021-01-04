import React from 'react';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';

function NoFeeds({ name }) {
	const handleNewFeedCreate = (e) => {
		e.preventDefault();
		//TODO: handle creation of new feed.

		console.log('New feed create action performed');
	};

	return (
		<Result
			status='success'
			title={`Welcome ${name}, It is time now to keep track of your feeds.`}
			subTitle='Please create your first feed using "Create new feed" button.'
			extra={
				<Button type='primary' size='large' onClick={handleNewFeedCreate}>
					Create new feed
				</Button>
			}
		/>
	);
}

NoFeeds.propTypes = {
	name: PropTypes.string.isRequired
};

export default NoFeeds;
